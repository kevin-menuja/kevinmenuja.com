"use client";

import {ResponsiveImage} from "./responsive-image";
import {useEffect,useRef,useState} from "react";

import {profile} from "../profile";
const introduction=profile.introduction;

export function LivingPortrait(){
  const figure=useRef<HTMLElement>(null);
  const frame=useRef(0);
  const utterance=useRef<SpeechSynthesisUtterance|null>(null);
  const [speaking,setSpeaking]=useState(false);
  const [message,setMessage]=useState("");
  const [transcript,setTranscript]=useState(false);
  function reset(){
    cancelAnimationFrame(frame.current);
    figure.current?.style.removeProperty("--portrait-x");
    figure.current?.style.removeProperty("--portrait-y");
  }
  useEffect(()=>{
    function stop(){
      if(utterance.current){
        utterance.current.onend=null;utterance.current.onerror=null;
        window.speechSynthesis?.cancel();utterance.current=null;
      }
    }
    const hide=()=>{if(document.hidden){stop();setSpeaking(false);}};
    document.addEventListener("visibilitychange",hide);
    return()=>{cancelAnimationFrame(frame.current);stop();document.removeEventListener("visibilitychange",hide);};
  },[]);
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
  function listen(){
    if(!("speechSynthesis" in window)||!("SpeechSynthesisUtterance" in window)){setMessage("Spoken introduction is unavailable in this browser. Read the transcript below.");setTranscript(true);return;}
    if(speaking){if(utterance.current){utterance.current.onend=null;utterance.current.onerror=null;}window.speechSynthesis.cancel();utterance.current=null;setSpeaking(false);setMessage("Introduction stopped.");return;}
    setMessage("");const u=new SpeechSynthesisUtterance(introduction);u.lang="en";u.rate=.95;
    utterance.current=u;
    u.onend=()=>{if(utterance.current===u){utterance.current=null;setSpeaking(false);}};
    u.onerror=()=>{if(utterance.current===u){utterance.current=null;setSpeaking(false);setTranscript(true);setMessage("Audio unavailable. The written introduction is available below.");}};
    try{setSpeaking(true);window.speechSynthesis.speak(u);}catch{utterance.current=null;setSpeaking(false);setTranscript(true);setMessage("Audio unavailable. Read the transcript below.");}
  }
  return <figure ref={figure} className="cinematic-portrait living-portrait" onPointerMove={move} onPointerLeave={reset}>
    <div className="portrait-glow" aria-hidden="true"/>
    <ResponsiveImage src="/images/kevin.webp" alt="Black-and-white studio portrait of Kevin Menuja" width={1024} height={1106} loading="eager" fetchPriority="high" className="portrait" sizes="(max-width: 760px) 90vw, 480px"/>
    <figcaption className="living-caption">
      <div className="portrait-caption-line"><span>KM / PROFILE</span><span>ENGINEER · ENTREPRENEUR</span></div>
      <div className="portrait-actions">
        <button type="button" className="portrait-control" onClick={listen}>{speaking?"Stop introduction":"Listen to introduction"} <span aria-hidden="true">{speaking?"■":"▶"}</span></button>
        <button type="button" className="portrait-control" aria-expanded={transcript} aria-controls="portrait-transcript" onClick={()=>setTranscript(v=>!v)}>{transcript?"Hide transcript":"Read transcript"}</button>
      </div>
      <p className="voice-note">Optional device-generated narration · not a voice clone</p>
      <p role="status" className="voice-note">{message}</p>
      <div id="portrait-transcript" hidden={!transcript} className="portrait-transcript">{introduction}</div>
    </figcaption>
  </figure>;
}
