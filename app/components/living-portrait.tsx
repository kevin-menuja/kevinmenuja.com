"use client";
import {ResponsiveImage} from "./responsive-image";
import {useEffect,useRef} from "react";
import {RecordedIntro} from "./recorded-intro";
export function LivingPortrait({audioSrc}:{audioSrc?:string}){
 const figure=useRef<HTMLElement>(null);
 const frame=useRef(0);
  function reset(){
    cancelAnimationFrame(frame.current);
    figure.current?.style.removeProperty("--portrait-x");
    figure.current?.style.removeProperty("--portrait-y");
  }
  useEffect(()=>()=>cancelAnimationFrame(frame.current),[]);
  function move(e:React.PointerEvent<HTMLElement>){
    if(e.pointerType!=="mouse"||document.documentElement.classList.contains("motion-disabled")||matchMedia("(prefers-reduced-motion: reduce)").matches){reset();return;}
    const r=e.currentTarget.getBoundingClientRect();
    const x=Math.max(-1,Math.min(1,(e.clientX-r.left)/r.width*2-1));
    const y=Math.max(-1,Math.min(1,(e.clientY-r.top)/r.height*2-1));
    cancelAnimationFrame(frame.current);
    frame.current=requestAnimationFrame(()=>{
      figure.current?.style.setProperty("--portrait-x",(x*5).toFixed(2)+"px");
      figure.current?.style.setProperty("--portrait-y",(y*4).toFixed(2)+"px");
    });
  }
 return <figure ref={figure} className="cinematic-portrait living-portrait" onPointerMove={move} onPointerLeave={reset}>
 <div className="portrait-glow" aria-hidden="true"/>
 <ResponsiveImage src="/images/kevin.webp" alt="Black-and-white studio portrait of Kevin Menuja" width={1024} height={1106} loading="eager" fetchPriority="high" className="portrait" sizes="(max-width: 760px) 90vw, 480px"/>
 {audioSrc&&<figcaption className="living-caption"><RecordedIntro src={audioSrc}/></figcaption>}
 </figure>;
}
