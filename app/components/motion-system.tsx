"use client";

import {useEffect,useRef,useSyncExternalStore} from "react";
import {usePathname} from "next/navigation";

function prefersReduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches;}
function readMotion(){if(prefersReduced())return false;try{return localStorage.getItem("km-motion")!=="off";}catch{return true;}}
function subscribeMotion(listener:()=>void){
  const mq=window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change",listener);window.addEventListener("storage",listener);window.addEventListener("km-motion-change",listener);
  return()=>{mq.removeEventListener("change",listener);window.removeEventListener("storage",listener);window.removeEventListener("km-motion-change",listener);};
}
const serverFalse=()=>false;

/** Progressive enhancement: content remains visible and native scrolling works without JS. */
export function MotionSystem(){
  const pathname=usePathname();
  const progress=useRef<HTMLDivElement>(null);
  const preference=useSyncExternalStore(subscribeMotion,prefersReduced,serverFalse);
  const active=useSyncExternalStore(subscribeMotion,readMotion,serverFalse);
  useEffect(()=>{
    document.documentElement.classList.toggle("motion-disabled",!active);
    return()=>document.documentElement.classList.remove("motion-disabled");
  },[active]);
  useEffect(()=>{
    if(!active)return;
    let disposed=false;
    let teardown:()=>void=()=>{};
    const start=async()=>{
      const [{gsap},{ScrollTrigger},{default:Lenis}]=await Promise.all([import("gsap"),import("gsap/ScrollTrigger"),import("lenis")]);
      if(disposed)return;
      gsap.registerPlugin(ScrollTrigger);
      // Lenis handles wheel input only. Native keyboard, touch, hash navigation and focus remain available.
      const wheel=window.matchMedia("(pointer:fine)").matches;
      const lenis=new Lenis({autoRaf:false,smoothWheel:wheel,syncTouch:false,anchors:false,stopInertiaOnNavigate:true});
      const tick=(time:number)=>lenis.raf(time*1000);
      gsap.ticker.add(tick);lenis.on("scroll",ScrollTrigger.update);
      document.documentElement.classList.add("motion-active");
      const ctx=gsap.context(()=>{
        const main=document.querySelector("main");
        if(main&&!window.location.hash)gsap.fromTo(main,{opacity:.86,y:6},{opacity:1,y:0,duration:.36,ease:"power2.out",clearProps:"opacity,transform"});
        // Only animate in-view entry, never make text inaccessible or dependent on JS.
        gsap.utils.toArray<HTMLElement>(".section-head,.project,.education,.matrix,.contact,.case-details section").forEach(el=>{
          gsap.fromTo(el,{y:14,opacity:.94},{y:0,opacity:1,duration:.55,ease:"power2.out",clearProps:"opacity,transform",scrollTrigger:{trigger:el,start:"top 92%",once:true}});
        });
        if(progress.current)gsap.to(progress.current,{scaleX:1,ease:"none",scrollTrigger:{start:0,end:()=>Math.max(1,document.documentElement.scrollHeight-window.innerHeight),scrub:true}});
      });
      const hero=document.querySelector<HTMLElement>(".cinematic-hero");
      let frame=0;
      const move=(e:PointerEvent)=>{
        if(!hero||e.pointerType!=="mouse")return;
        cancelAnimationFrame(frame);
        frame=requestAnimationFrame(()=>{
          const r=hero.getBoundingClientRect();
          hero.style.setProperty("--light-x",((e.clientX-r.left)/r.width*100).toFixed(1)+"%");
          hero.style.setProperty("--light-y",((e.clientY-r.top)/r.height*100).toFixed(1)+"%");
        });
      };
      hero?.addEventListener("pointermove",move);
      teardown=()=>{cancelAnimationFrame(frame);hero?.removeEventListener("pointermove",move);hero?.style.removeProperty("--light-x");hero?.style.removeProperty("--light-y");ctx.revert();gsap.ticker.remove(tick);lenis.destroy();document.documentElement.classList.remove("motion-active");};
    };
    start().catch(()=>{ /* native scroll and static content are the safe fallback */ });
    return()=>{disposed=true;teardown();};
  },[active,pathname]);
  function toggle(){
    try{localStorage.setItem("km-motion",active?"off":"on");}catch{}
    window.dispatchEvent(new Event("km-motion-change"));
  }
  return <>
    {active&&<div className="reading-progress" aria-hidden="true"><div ref={progress}/></div>}
    <button className="motion-toggle" type="button" aria-pressed={active} disabled={preference} onClick={toggle} title={preference?"Reduced motion is enabled in your system settings":"Toggle portfolio motion"}><span aria-hidden="true">{active?"◉":"○"}</span> {active?"Motion on":"Motion off"}</button>
  </>;
}
