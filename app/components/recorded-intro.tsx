"use client";
import {useEffect,useRef,useState} from "react";
import {profile} from "../profile";
let played=false;
export function RecordedIntro({src}:{src:string}){
 const audio=useRef<HTMLAudioElement>(null);
 const [blocked,setBlocked]=useState(false);
 const [playing,setPlaying]=useState(false);
 const [finished,setFinished]=useState(false);
 useEffect(()=>{
  const player=audio.current;
  if(!player)return;
  let disposed=false;
  const attempt=()=>{if(played||document.hidden)return;player.play().then(()=>{if(!disposed){played=true;setBlocked(false);}}).catch(()=>{if(!disposed)setBlocked(true);});};
  const visibility=()=>{if(document.hidden)player.pause();else attempt();};
  attempt();document.addEventListener("visibilitychange",visibility);
  return()=>{disposed=true;player.pause();document.removeEventListener("visibilitychange",visibility);};
 },[]);
 return <div className="recorded-intro">
  <audio ref={audio} src={src} preload="metadata" onPlay={()=>{played=true;setPlaying(true);setBlocked(false);}} onPause={()=>{setPlaying(false);if(audio.current&&!audio.current.ended)setBlocked(true);}} onEnded={()=>{setPlaying(false);setFinished(true);}} onError={()=>{setBlocked(false);setPlaying(false);setFinished(true);}}/>
  {!finished&&(blocked||playing)&&<button type="button" className="portrait-control" onClick={()=>{const player=audio.current;if(!player)return;if(playing)player.pause();else player.play().catch(()=>setBlocked(true));}}>{playing?"Pause introduction":"Enable introduction audio"}</button>}
  <details className="intro-transcript"><summary>Introduction transcript</summary><p>{profile.introduction}</p></details>
 </div>;
}
