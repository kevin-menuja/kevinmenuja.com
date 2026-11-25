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

test("developer pass exposes real profile details and returns to portrait",async({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto("/");
  const toggle=page.getByRole("button",{name:"View profile details"});
  await toggle.click();
  await expect(page.getByRole("button",{name:"Back to portrait"})).toHaveAttribute("aria-expanded","true");
  await expect(page.locator(".pass-details")).toContainText("Higher Diploma");
  await page.getByRole("button",{name:"Back to portrait"}).press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded","false");
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
