import {chromium,firefox,webkit} from "playwright";
import {spawn} from "node:child_process";
import assert from "node:assert/strict";
const url="http://127.0.0.1:43872";
const proc=spawn(process.execPath,["node_modules/next/dist/bin/next","start","-p","43872","-H","127.0.0.1"],{stdio:"ignore"});
const slugs=["rice-and-kottu-hut-pos","serviceops-group-project","startek-print-hub-pos","nwsdb-smart-water-billing-system","printxpress","swiftdrive-rentals"];
try{
 let ready=false;
 for(let i=0;i<50;i++){try{if((await fetch(url)).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,200));}
 assert(ready,"Local production server did not start");
 for(const [name,type] of [["Chromium",chromium],["Firefox",firefox],["WebKit",webkit]]){
  let browser;
  try{
   browser=await type.launch({headless:true});
   const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:"reduce"});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   await page.goto(url,{waitUntil:"load"});
   await page.evaluate(()=>document.fonts.ready);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),"Homepage overflow");
   assert.equal(await page.locator(".project").count(),6);
   assert.equal(await page.locator(".hero-side,#lab,.motion-toggle").count(),0);
   await page.getByRole("button",{name:"Switch to light mode"}).click();
   assert.equal(await page.locator("html").getAttribute("data-theme"),"light");
   await page.reload();
   assert.equal(await page.locator("html").getAttribute("data-theme"),"light");
   await page.getByRole("button",{name:"Switch to dark mode"}).click();
   for(const slug of slugs){
    assert.equal((await page.goto(url+"/projects/"+slug)).status(),200);
    await page.locator(".case-figure img").scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>{const img=document.querySelector(".case-figure img");return img.complete&&img.naturalWidth>0});
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),slug+" overflow");
    await page.locator(".architecture-nodes button").nth(2).click();
    assert.equal(await page.locator(".architecture-nodes button").nth(2).getAttribute("aria-pressed"),"true");
   }
   await page.goto(url+"/projects/serviceops-group-project");
   await page.getByRole("button",{name:"View full screenshot"}).click();
   assert(await page.getByRole("dialog").isVisible());
   await page.getByRole("button",{name:"Next full screenshot"}).click();
   assert.equal(await page.getByRole("dialog").locator("img").getAttribute("src"),"/images/gallery/serviceops-inventory.webp");
   await page.getByRole("dialog").getByRole("button",{name:"Close"}).click();
   assert.equal(await page.getByRole("dialog").isVisible(),false);
   for(const route of ["/insights","/insights/reliable-pos-checkout","/insights/service-oriented-architecture","/insights/preserving-financial-history","/insights/ai-assisted-engineering","/privacy","/resume"]){
    assert.equal((await page.goto(url+route)).status(),200);
    assert.equal(await page.locator("h1").count(),1);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+" overflow");
   }
   await page.goto(url+"/#contact");
   await page.locator(".contact-composer").getByRole("button",{name:"Copy draft"}).click();
   assert(await page.locator(".contact-composer input:invalid").count()>0);
   assert.deepEqual(errors,[]);
   console.log(name+": PASS (homepage, six project pages, mobile layout, portrait, themes, architecture, gallery, insights, contact, privacy and CV)");
  }finally{await browser?.close();}
 }
}finally{proc.kill("SIGTERM");}
