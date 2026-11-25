"use client";

import {useEffect,useRef,useState} from "react";
import {DeveloperPass} from "./developer-pass";
import type {createLanyard} from "./lanyard-scene";

export function LanyardExperience(){
  const [mode,setMode]=useState<"static"|"loading"|"3d"|"unavailable">("static");
  const host=useRef<HTMLDivElement>(null);
  const controls=useRef<ReturnType<typeof createLanyard>|null>(null);
  const [back,setBack]=useState(false);
  const active=mode==="loading"||mode==="3d";
  useEffect(()=>{
    if(!active)return;
    let cancelled=false;
    async function load(){
      try{
        // Do not request the 3D bundle until the visitor explicitly chooses it.
        const {createLanyard}=await import("./lanyard-scene");
        if(cancelled||!host.current)return;
        controls.current=createLanyard(host.current,{onLost:()=>setMode("unavailable"),reduced:()=>matchMedia("(prefers-reduced-motion: reduce)").matches||document.documentElement.classList.contains("motion-disabled")});
        setMode("3d");
      }catch{if(!cancelled)setMode("unavailable");}
    }
    void load();
    return()=>{cancelled=true;controls.current?.dispose();controls.current=null;};
  },[active]);
  function open(){
    setBack(false);setMode("loading");
  }
  return <div className="lanyard-experience">
    {!active?<><DeveloperPass/><button className="lanyard-open" type="button" onClick={open}>{mode==="unavailable"?"Retry 3D pass":"Explore 3D pass"} <span aria-hidden="true">◇</span></button>{mode==="unavailable"&&<p className="lanyard-status" role="status">3D rendering unavailable. Your standard developer pass is still accessible.</p>}</>:<>
      <div className="lanyard-viewport" ref={host} data-state={mode}>{mode==="loading"&&<p className="lanyard-status" role="status">Preparing 3D pass…</p>}</div>
      <p className="lanyard-hint">Drag and release · Flip to explore</p>
      <div className="lanyard-controls">
        <button type="button" disabled={mode!=="3d"} aria-pressed={back} onClick={()=>{controls.current?.flip();setBack(v=>!v);}}>Flip pass</button>
        <button type="button" disabled={mode!=="3d"} onClick={()=>{controls.current?.reset();setBack(false);}}>Reset</button>
        <button type="button" onClick={()=>setMode("static")}>Standard view</button>
      </div>
      <p className="sr-only" aria-live="polite">{back?"Reverse: Sri Lanka; Higher Diploma in Computing and Software Engineering; current focus applied AI engineering.":"Front: Kevin Menuja, full-stack developer."}</p>
    </>}
  </div>;
}
