// Run against a locally built production-mode site with a fictional hostname.
// The telemetry scripts are intercepted; no events are sent to a real provider.
import {chromium} from "playwright";
import {spawn} from "node:child_process";
import assert from "node:assert/strict";
const url="http://127.0.0.1:43875";
const proc=spawn(process.execPath,["node_modules/next/dist/bin/next","start","-p","43875","-H","127.0.0.1"],{stdio:"ignore",env:{...process.env,VERCEL_ENV:"production",VERCEL_PROJECT_PRODUCTION_URL:"portfolio.example.test",NEXT_PUBLIC_ENABLE_ANALYTICS:"1"}});
let browser;
try{
 let ready=false;
 for(let i=0;i<60;i++){try{if((await fetch(url)).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,200));}
 assert(ready,"Server not ready");
 const home=await (await fetch(url)).text();
 assert(!home.includes('content="noindex'),"Unexpected production noindex");
 assert(home.includes("https://portfolio.example.test"));
 const sitemap=await (await fetch(url+"/sitemap.xml")).text();
 assert.equal((sitemap.match(/<loc>/g)||[]).length,14);
 assert(sitemap.includes("https://portfolio.example.test/insights/ai-assisted-engineering"));
 assert(sitemap.includes("https://portfolio.example.test/resume"));
 const robots=await (await fetch(url+"/robots.txt")).text();
 assert(robots.includes("Allow: /"));
 assert(robots.includes("https://portfolio.example.test/sitemap.xml"));
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({reducedMotion:"reduce"});
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 const telemetry=[];
 await page.route("**/*",async route=>{
  const u=new URL(route.request().url());
  if(u.pathname.includes("/_vercel/")||u.hostname==="va.vercel-scripts.com"||u.hostname==="vitals.vercel-insights.com"){
    telemetry.push(u.pathname);
    await route.fulfill({status:200,contentType:"application/javascript",body:"/* simulated provider */"});
  }else if(u.origin===url)await route.continue();
  else await route.abort();
 });
 await page.goto(url+"/privacy");
 assert.equal(telemetry.length,0);
 await page.getByRole("button",{name:"Allow optional analytics"}).click();
 await page.getByRole("button",{name:"Turn analytics off"}).waitFor();
 await page.waitForFunction(()=>Array.from(document.scripts).some(s=>s.src.includes("/_vercel/insights/")||s.src.includes("vercel-scripts.com")));
 assert(telemetry.length>0,"Expected intercepted provider scripts");
 await page.getByRole("button",{name:"Turn analytics off"}).click();
 await page.getByRole("button",{name:"Allow optional analytics"}).waitFor();
 assert.equal(await page.evaluate(()=>localStorage.getItem("km-analytics")),"off");
 assert.deepEqual(errors,[]);
 console.log("PRODUCTION_MODE_PASS: indexing, 14 sitemap URLs, consent opt-in and withdrawal; telemetry intercepted");
}finally{await browser?.close();proc.kill("SIGTERM");}
