import {expect,test} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const slugs=["rice-and-kottu-hut-pos","serviceops-group-project","startek-print-hub-pos","nwsdb-smart-water-billing-system","printxpress","swiftdrive-rentals"];

for(const width of [1440,768,390,320]){
  test("homepage at "+width+"px",async({page})=>{
    await page.setViewportSize({width,height:900});
    const errors:string[]=[];
    page.on("pageerror",e=>errors.push(e.message));
    await page.goto("/");
    await page.evaluate(()=>document.fonts.ready);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator(".project")).toHaveCount(6);
    await expect(page.locator(".portrait")).toBeVisible();
    for(const img of await page.locator(".project-img").all()){
      await img.scrollIntoViewIfNeeded();
      await expect.poll(()=>img.evaluate((node:HTMLImageElement)=>node.complete&&node.naturalWidth>0)).toBe(true);
    }
    const layout=await page.evaluate(()=>({
      overflow:document.documentElement.scrollWidth>innerWidth,
      background:getComputedStyle(document.body).backgroundColor,
      fonts:["Manrope Variable","Inter Variable","JetBrains Mono Variable"].every(f=>document.fonts.check('500 14px "'+f+'"'))
    }));
    expect(layout).toEqual({overflow:false,background:"rgb(11, 13, 16)",fonts:true});
    expect(errors).toEqual([]);
    await page.evaluate(()=>window.scrollTo(0,0));
    if(width===1440||width===390)await page.screenshot({path:"test-results/home-"+width+".png",fullPage:false,animations:"disabled"});
  });
}
test("mobile navigation is keyboard operable and closes after selecting a section",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto("/");
  const menu=page.getByRole("button",{name:"Open navigation"});
  await menu.click();
  await expect(page.getByRole("navigation",{name:"Mobile navigation"})).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded","false");
  await menu.press("Enter");
  await page.getByRole("navigation",{name:"Mobile navigation"}).getByRole("link",{name:"Work"}).click();
  await expect(menu).toHaveAttribute("aria-expanded","false");
  await expect(page).toHaveURL(/#work$/);
});
for(const slug of slugs){
  test("case study "+slug,async({page})=>{
    await page.setViewportSize({width:390,height:844});
    const response=await page.goto("/projects/"+slug);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("link",{name:"View repository"})).toHaveAttribute("href","https://github.com/kevin-menuja/"+slug);
    await page.locator(".case-figure img").scrollIntoViewIfNeeded();
    await expect.poll(()=>page.locator(".case-figure img").evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await expect(page.locator(".next-project")).toBeVisible();
  });
}
test("accessibility baseline: home and representative case study",async({page})=>{
  for(const path of ["/","/projects/startek-print-hub-pos"]){
    await page.goto(path);
    const result=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
    expect(result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
  }
});

test("technology matrix filters the learning focus distinctly",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto("/");
  const filter=page.getByRole("group",{name:"Filter technologies"});
  await filter.getByRole("button",{name:"Applied AI",exact:true}).click();
  await expect(page.locator(".matrix-group")).toHaveCount(1);
  await expect(page.locator(".matrix-group")).toContainText("Current learning focus");
  await expect(page.locator(".matrix-tiles li")).toHaveCount(7);
  await filter.getByRole("button",{name:"All",exact:true}).click();
  await expect(page.locator(".matrix-group")).toHaveCount(4);
});

test("system reduced-motion setting disables animated scrolling",async({page})=>{
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/");
  await expect(page.locator(".motion-toggle")).toHaveCount(0);
  await expect(page.locator("html")).toHaveClass(/motion-disabled/);
  await expect(page.locator(".hero-wordmark")).toBeVisible();
});

test("living portrait responds to pointer",async({page})=>{
  await page.setViewportSize({width:1440,height:900});await page.emulateMedia({reducedMotion:"no-preference"});
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/motion-active/);
  const portrait=page.locator(".living-portrait");
  await portrait.hover({position:{x:60,y:65}});
  await expect.poll(()=>portrait.evaluate(el=>el.style.getPropertyValue("--portrait-x"))).not.toBe("");
});

test("gallery cycles authentic evidence and restores focus on close",async({page})=>{
  await page.goto("/projects/serviceops-group-project");
  const gallery=page.locator(".evidence-gallery");
  await expect(gallery.locator(".case-figure img")).toHaveAttribute("src","/images/serviceops.webp");
  await gallery.getByRole("button",{name:"Next screenshot",exact:true}).click();
  await expect(gallery.locator(".case-figure img")).toHaveAttribute("src","/images/gallery/serviceops-inventory.webp");
  const open=gallery.getByRole("button",{name:"View full screenshot"});
  await open.click();
  const modal=page.getByRole("dialog");
  await expect(modal).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(modal.locator("img")).toHaveAttribute("src","/images/gallery/serviceops-history.webp");
  await page.keyboard.press("Escape");
  await expect(modal).not.toBeVisible();
  await expect(open).toBeFocused();
  await expect(gallery.locator(".case-figure img")).toHaveAttribute("src","/images/gallery/serviceops-history.webp");
});

test("all architecture overviews expose the selected layer",async({page})=>{
  for(const slug of ["rice-and-kottu-hut-pos","serviceops-group-project","startek-print-hub-pos","nwsdb-smart-water-billing-system","printxpress","swiftdrive-rentals"]){
    await page.goto("/projects/"+slug);
    const section=page.locator(".architecture-explorer");
    const buttons=section.locator(".architecture-nodes button");
    await expect(buttons).toHaveCount(3);
    await buttons.nth(2).click();
    await expect(buttons.nth(2)).toHaveAttribute("aria-pressed","true");
    await expect(section.locator(".architecture-detail p")).not.toBeEmpty();
  }
});

test("all gallery assets are real local images that load",async({page})=>{
  for(const slug of ["rice-and-kottu-hut-pos","serviceops-group-project","nwsdb-smart-water-billing-system","printxpress"]){
    await page.goto("/projects/"+slug);
    const gallery=page.locator(".evidence-gallery"),img=gallery.locator(".case-figure img");
    const count=slug==="serviceops-group-project"||slug==="printxpress"?3:2;
    for(let i=0;i<count;i++){
      await img.scrollIntoViewIfNeeded();
      await expect.poll(()=>img.evaluate((n:HTMLImageElement)=>n.complete&&n.naturalWidth>0)).toBe(true);
      if(i<count-1)await gallery.getByRole("button",{name:"Next screenshot",exact:true}).click();
    }
  }
});

test("expanded accessibility scan on interactive states",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto("/#work");
  await page.getByRole("button",{name:"Business applications"}).click();
  const home=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
  expect(home.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
  await page.goto("/projects/serviceops-group-project");
  await page.getByRole("button",{name:"View full screenshot"}).click();
  const modal=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
  expect(modal.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
});

test("professional identity is consistent and supported by public content",async({page})=>{
  const title="AI Powered Full-Stack Software Engineer";
  await page.setViewportSize({width:1440,height:900});
  await page.goto("/");
  await expect(page).toHaveTitle(new RegExp(title));
  await expect(page.locator(".hero-role")).toHaveText(title);
  await expect(page.locator(".brand-role")).toHaveText(title);
  await expect(page.locator("#experience .experience-grid article")).toHaveCount(3);
  await expect(page.locator("#about .education article")).toHaveCount(3);
  await expect(page.locator("#experience")).toContainText("not part of the completed group application");
});

test("project discovery supports category, technology and empty-state reset",async({page})=>{
 await page.goto("/#work");
 const filter=page.getByRole("group",{name:"Filter projects"});
 await filter.getByRole("button",{name:"Business applications"}).click();
 await expect(page.locator(".project")).toHaveCount(2);
 await filter.getByRole("button",{name:"Academic projects"}).click();
 await expect(page.locator(".project")).toHaveCount(3);
 await filter.getByRole("button",{name:"All projects"}).click();
 await page.getByRole("textbox",{name:"Search projects"}).fill("PostgreSQL");
 await expect(page.locator(".project")).toHaveCount(3);
 await page.getByRole("textbox",{name:"Search projects"}).fill("no matching thing");
 await expect(page.locator(".project")).toHaveCount(0);
 await page.getByRole("button",{name:"Clear filters"}).click();
 await expect(page.locator(".project")).toHaveCount(6);
});

test("all case studies present contribution, decisions and pinned evidence",async({page})=>{
 for(const slug of ["rice-and-kottu-hut-pos","serviceops-group-project","startek-print-hub-pos","nwsdb-smart-water-billing-system","printxpress","swiftdrive-rentals"]){
  await page.goto("/projects/"+slug);
  await expect(page.locator(".decision-grid article")).toHaveCount(3);
  await expect(page.locator(".capability-grid li")).toHaveCount(6);
  await expect(page.locator(".source-evidence article")).toHaveCount(4);
  await expect(page.locator(".scope-block")).toBeVisible();
  for(const link of await page.locator(".source-evidence a").all())expect(await link.getAttribute("href")).toMatch(new RegExp("github.com/kevin-menuja/"+slug+"/(blob|tree)/[a-f0-9]{40}/"));
 }
});

test("technical insight pages are discoverable and contain source-backed content",async({page})=>{
 await page.goto("/#insights");
 await expect(page.locator("#insights article")).toHaveCount(4);
 await page.getByRole("link",{name:"All technical insights"}).click();
 await expect(page).toHaveURL(/\/insights$/);
 await expect(page.locator(".insight-grid article")).toHaveCount(4);
 for(const slug of ["reliable-pos-checkout","service-oriented-architecture","preserving-financial-history","ai-assisted-engineering"]){
  const response=await page.goto("/insights/"+slug);
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator(".insight-section")).toHaveCount(4);
  await expect(page.locator(".insight-toc a")).toHaveCount(4);
  await expect(page.getByRole("link",{name:"Source documentation"})).toHaveAttribute("href",/github\.com\/kevin-menuja\/.+\/blob\/[a-f0-9]{40}\//);
  await page.locator(".insight-toc a").first().click();
  await expect(page).toHaveURL(/#section-1$/);
 }
});

test("contact composer validates input and copies a synthetic draft using a test double",async({page})=>{
 await page.addInitScript(()=>{
   const output=document.createElement("textarea");
   output.id="test-copy-output";
   Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async(s:string)=>{output.value=s;}}});
   document.addEventListener("DOMContentLoaded",()=>{output.hidden=true;document.body.append(output);});
 });
 await page.goto("/#contact");
 const form=page.locator(".contact-composer");
 await expect(form).toBeVisible();
 await form.getByRole("button",{name:"Copy draft"}).click();
 expect(await form.locator("input:invalid").count()).toBeGreaterThan(0);
 await form.getByLabel("Your name").fill("Example Recruiter");
 await form.getByLabel("Email address").fill("invalid-address");
 expect(await form.getByLabel("Email address").evaluate((el:HTMLInputElement)=>el.validity.typeMismatch)).toBe(true);
 await form.getByLabel("Email address").fill("recruiter@example.test");
 await form.getByLabel("Inquiry type").selectOption("Technical collaboration");
 await form.getByLabel("Message",{exact:true}).fill("Hello, I would like to discuss a technical collaboration.");
 await form.getByRole("button",{name:"Copy draft"}).click();
 await expect(form.getByRole("status")).toContainText("Draft copied");
 await expect(page.locator("#test-copy-output")).toHaveValue(/Subject: Technical collaboration/);
 await expect(page.locator("#test-copy-output")).toHaveValue(/Reply email: recruiter@example.test/);
 await form.getByLabel("Your name").fill("   ");
 await form.getByRole("button",{name:"Copy draft"}).click();
 await expect(form.getByRole("status")).toContainText("Enter your name");
});

test("preview privacy settings prevent measurement and preserve robots restrictions",async({page,request})=>{
 await page.addInitScript(()=>localStorage.setItem("km-analytics","on"));
 const requests:string[]=[];
 page.on("request",r=>requests.push(r.url()));
 await page.goto("/privacy");
 await expect(page.locator(".analytics-preference")).toContainText("not enabled in this environment");
 await expect(page.getByRole("button",{name:"Allow optional analytics"})).toHaveCount(0);
 expect(requests.filter(url=>url.includes("/_vercel/insights/")||url.includes("/_vercel/speed-insights/"))).toEqual([]);
 const home=await request.get("/");
 const headers=home.headers();
 expect(headers["x-content-type-options"]).toBe("nosniff");
 expect(headers["x-frame-options"]).toBe("DENY");
 expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
 expect(await home.text()).toContain("noindex");
 expect(await (await request.get("/robots.txt")).text()).toContain("Disallow: /");
 const sitemap=await (await request.get("/sitemap.xml")).text();
 expect(sitemap).not.toContain("<loc>");
});

test("new pages pass accessibility and responsive layout checks",async({page})=>{
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:844});
  for(const route of ["/insights","/insights/reliable-pos-checkout","/privacy","/#contact"]){
   await page.goto(route);
   await page.evaluate(()=>document.fonts.ready);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+" at "+width).toBe(true);
  }
 }
 await page.setViewportSize({width:390,height:844});
 for(const route of ["/insights","/insights/reliable-pos-checkout","/privacy","/#contact"]){
  await page.goto(route);
  const result=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
  expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),route).toEqual([]);
 }
});

test("unknown project and article return not found",async({request})=>{
 for(const route of ["/projects/nonexistent","/insights/nonexistent"]){
  expect((await request.get(route)).status()).toBe(404);
 }
});

test("recruiter profile and PDF download preserve the approved identity",async({page,request})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto("/");
 await page.getByRole("link",{name:"View CV",exact:true}).click();
 await expect(page).toHaveURL(/\/resume$/);
 await expect(page.locator("h1")).toHaveText("Kevin Menuja");
 await expect(page.locator(".recruitment-title")).toHaveText("AI Powered Full-Stack Software Engineer");
 await expect(page.locator(".recruitment-projects").first().locator("article")).toHaveCount(4);
 await expect(page.locator(".recruitment-projects").last().locator("article")).toHaveCount(3);
 await expect(page.locator(".recruitment-page")).toContainText("AI Copilot remains a future direction");
 await expect(page.getByRole("link",{name:"Contact for recruitment"})).toHaveAttribute("href",/^mailto:kevinmenuja11@gmail\.com\?subject=/);
 const response=await request.get("/downloads/Kevin-Menuja-CV.pdf");
 expect(response.status()).toBe(200);
 expect(response.headers()["content-type"]).toContain("application/pdf");
 expect((await response.body()).subarray(0,5).toString()).toBe("%PDF-");
 const downloadPromise=page.waitForEvent("download");
 await page.getByRole("link",{name:"Download CV (PDF)"}).click();
 const download=await downloadPromise;
 expect(download.suggestedFilename()).toBe("Kevin-Menuja-CV.pdf");
 expect(await download.failure()).toBeNull();
});

test("recruitment page fits supported widths and passes accessibility scan",async({page})=>{
 for(const width of [320,390,768,1024,1280,1440]){
  await page.setViewportSize({width,height:900});
  await page.goto("/resume");
  await page.evaluate(()=>document.fonts.ready);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),"CV at "+width).toBe(true);
  await expect(page.getByRole("link",{name:"Download CV (PDF)"})).toBeVisible();
 }
 await page.setViewportSize({width:390,height:844});
 await page.goto("/resume");
 const result=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
 expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
 await page.getByRole("button",{name:"Open navigation menu"}).click();
 await expect(page.getByRole("navigation",{name:"Mobile navigation"}).getByRole("link",{name:"CV",exact:true})).toBeVisible();
});

test("pre-launch feature removals and social links",async({page})=>{
 await page.goto("/");
 await expect(page.locator("#lab,.hero-side,.developer-pass,.motion-toggle")).toHaveCount(0);
 await expect(page.locator(".brand-role")).toHaveText("AI Powered Full-Stack Software Engineer");
 await expect(page.getByRole("button",{name:"Listen to introduction"})).toHaveCount(0);
 for(const [label,url] of [["YouTube","https://youtube.com/@kevinmenuja"],["Facebook","https://www.facebook.com/share/18S9foYUWq/?mibextid=wwXIfr"],["Instagram","https://www.instagram.com/kevsss_11"],["TikTok","https://www.tiktok.com/@kevsss_410"]]){
  await expect(page.locator("footer").getByRole("link",{name:label})).toHaveAttribute("href",url);
 }
});

test("theme defaults dark, persists light and returns to dark",async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto("/");
 await expect(page.locator("html")).toHaveAttribute("data-theme","dark");
 await page.getByRole("button",{name:"Switch to light mode"}).click();
 await expect(page.locator("html")).toHaveAttribute("data-theme","light");
 await page.reload();
 await expect(page.locator("html")).toHaveAttribute("data-theme","light");
 for(const route of ["/","/projects/serviceops-group-project","/resume","/privacy","/insights"]){
  await page.goto(route);
  await expect(page.locator("html")).toHaveAttribute("data-theme","light");
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route).toBe(true);
  const axe=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
  expect(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),route).toEqual([]);
 }
 await page.getByRole("button",{name:"Switch to dark mode"}).click();
 await expect(page.locator("html")).toHaveAttribute("data-theme","dark");
});

test("motion is enabled on mobile and desktop, respecting system preference",async({page})=>{
 await page.emulateMedia({reducedMotion:"no-preference"});
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:900});
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/motion-active/);
  await expect(page.locator(".motion-toggle")).toHaveCount(0);
 }
});

test("site audio plays voice then loops music, persists across client navigation",async({page,request})=>{
 const voice=await request.get("/audio/introduction.mp3");
 expect(voice.status()).toBe(200);
 expect((await voice.body()).length).toBe(316268);
 const music=await request.get("/audio/ambient.m4a");
 expect(music.status()).toBe(200);
 expect((await music.body()).length).toBeGreaterThan(200000);
 await page.addInitScript(()=>{
  const original=HTMLMediaElement.prototype.play;
  let calls=0;
  Object.defineProperty(HTMLMediaElement.prototype,"play",{configurable:true,value:function(this:HTMLMediaElement){calls++;if(calls===1)return Promise.reject(new DOMException("Autoplay blocked","NotAllowedError"));return original.call(this);}});
 });
 await page.setViewportSize({width:1440,height:900});
 await page.goto("/");
 const audio=page.locator("#site-audio");
 await expect(audio).toHaveAttribute("src","/audio/introduction.mp3");
 await expect.poll(()=>audio.evaluate((a:HTMLAudioElement)=>a.duration)).toBeGreaterThan(26);
 await page.getByRole("button",{name:"Enable website audio"}).click();
 await expect(page.getByRole("button",{name:"Mute website audio"})).toBeVisible();
 await expect.poll(()=>audio.evaluate((a:HTMLAudioElement)=>a.currentTime)).toBeGreaterThan(0);
 await audio.evaluate((a:HTMLAudioElement)=>{a.currentTime=a.duration-.25;});
 await expect(audio).toHaveAttribute("src","/audio/ambient.m4a",{timeout:10000});
 await expect.poll(()=>audio.evaluate((a:HTMLAudioElement)=>a.duration)).toBeGreaterThan(59);
 expect(await audio.evaluate((a:HTMLAudioElement)=>a.loop)).toBe(true);
 await expect.poll(()=>audio.evaluate((a:HTMLAudioElement)=>a.currentTime)).toBeGreaterThan(0);
 await audio.evaluate((a:HTMLAudioElement)=>{a.currentTime=a.duration-.3;});
 await expect.poll(()=>audio.evaluate((a:HTMLAudioElement)=>a.currentTime)).toBeLessThan(3);
 expect(await audio.evaluate((a:HTMLAudioElement)=>a.paused)).toBe(false);
 await audio.evaluate((a:HTMLAudioElement)=>{a.dataset.persistence="yes";});
 await page.locator(".navlinks").getByRole("link",{name:"Insights",exact:true}).click();
 await expect(page).toHaveURL(/\/insights$/);
 await expect(audio).toHaveAttribute("data-persistence","yes");
 await expect(page.getByRole("button",{name:"Mute website audio"})).toBeVisible();
 await page.getByRole("button",{name:"Mute website audio"}).click();
 await expect.poll(()=>audio.evaluate((a:HTMLAudioElement)=>a.paused)).toBe(true);
 await page.locator(".navlinks").getByRole("link",{name:"CV",exact:true}).click();
 await expect(page).toHaveURL(/\/resume$/);
 await expect(audio).toHaveAttribute("data-persistence","yes");
 expect(await audio.evaluate((a:HTMLAudioElement)=>a.paused)).toBe(true);
 await page.reload();
 await expect(audio).toHaveAttribute("src","/audio/ambient.m4a");
 expect(await audio.evaluate((a:HTMLAudioElement)=>a.muted)).toBe(false);
});

test("site audio attempts autoplay on arrival without a click",async({page})=>{
 await page.addInitScript(()=>{
  localStorage.setItem("km-site-audio","off");
  const original=HTMLMediaElement.prototype.play;
  Object.defineProperty(HTMLMediaElement.prototype,"play",{configurable:true,value:function(this:HTMLMediaElement){this.dataset.autoplayAttempt="yes";this.dataset.autoplayMuted=String(this.muted);return original.call(this);}});
 });
 await page.goto("/resume");
 const audio=page.locator("#site-audio");
 await expect(audio).toHaveAttribute("data-autoplay-attempt","yes");
 await expect(audio).toHaveAttribute("data-autoplay-muted","false");
 await expect(audio).toHaveAttribute("src","/audio/introduction.mp3");
 await page.reload();
 await expect(audio).toHaveAttribute("data-autoplay-attempt","yes");
 await expect(audio).toHaveAttribute("data-autoplay-muted","false");
});
