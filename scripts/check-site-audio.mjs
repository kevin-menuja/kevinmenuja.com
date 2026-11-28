import {chromium,firefox,webkit} from "playwright";
import {spawn} from "node:child_process";
import assert from "node:assert/strict";
const url="http://127.0.0.1:43876";
const proc=spawn(process.execPath,["node_modules/next/dist/bin/next","start","-p","43876","-H","127.0.0.1"],{stdio:"ignore"});
try{
 let ready=false;
 for(let i=0;i<50;i++){try{if((await fetch(url)).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,200));}
 assert(ready);
 for(const [name,type] of [["Chromium",chromium],["Firefox",firefox],["WebKit",webkit]]){
  let browser;
  try{
   // Isolated Chromium test explicitly permits autoplay; no visitor browser setting is changed.
   browser=await type.launch({headless:true,...(name==="Chromium"?{args:["--autoplay-policy=no-user-gesture-required"]}:{})});
   const page=await browser.newPage({viewport:{width:1440,height:900}});
   await page.goto(url);
   const audio=page.locator("#site-audio");
   await page.waitForFunction(()=>document.querySelector("#site-audio")?.duration>26,{},{timeout:10000});
   if(name==="Chromium"){
    await page.waitForFunction(()=>document.querySelector("#site-audio")?.currentTime>0,{},{timeout:10000});
    console.log("Chromium: actual audible-autoplay-permitted playback starts without click");
   }else if(await audio.evaluate(a=>a.paused)){
    await page.getByRole("button",{name:"Enable website audio"}).click();
   }
   await page.waitForFunction(()=>document.querySelector("#site-audio")?.currentTime>0,{},{timeout:10000});
   await audio.evaluate(a=>{a.currentTime=a.duration-.3;});
   await page.waitForFunction(()=>{const a=document.querySelector("#site-audio");return a?.src.endsWith("ambient.m4a")&&a.duration>59;},{},{timeout:10000});
   await page.waitForFunction(()=>{const a=document.querySelector("#site-audio");return a?.loop&&a.currentTime>0&&!a.paused;},{},{timeout:10000});
   await audio.evaluate(a=>{a.currentTime=a.duration-.3;});
   await page.waitForFunction(()=>{const a=document.querySelector("#site-audio");return a?.currentTime<3&&!a.paused;},{},{timeout:10000});
   await page.getByRole("button",{name:"Mute website audio"}).click();
   assert(await audio.evaluate(a=>a.paused));
   console.log(name+": voice, transition, actual music loop, mute PASS");
  }finally{await browser?.close();}
 }
}finally{proc.kill("SIGTERM");}
