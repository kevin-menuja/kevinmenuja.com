"use client";
import {useEffect,useRef,useState} from "react";

const playedKey="km-introduction-played-v1";
let playedThisDocument=false;
function alreadyPlayed(){
 if(playedThisDocument)return true;
 try{return sessionStorage.getItem(playedKey)==="yes";}catch{return false;}
}
function rememberPlayback(){
 playedThisDocument=true;
 try{sessionStorage.setItem(playedKey,"yes");}catch{}
}

export function RecordedIntro({src}:{src:string}){
 const audio=useRef<HTMLAudioElement>(null);
 const [playing,setPlaying]=useState(false);
 const [finished,setFinished]=useState(false);
 const [failed,setFailed]=useState(false);
 useEffect(()=>{
  const player=audio.current;
  if(!player)return;
  let attempted=false;
  const attempt=()=>{
   if(attempted||alreadyPlayed()||document.hidden)return;
   attempted=true;
   // Browser policies may reject audible autoplay. The manual control stays available.
   void player.play().catch(()=>{});
  };
  const visibility=()=>{if(document.hidden)player.pause();else attempt();};
  attempt();
  document.addEventListener("visibilitychange",visibility);
  return()=>{player.pause();document.removeEventListener("visibilitychange",visibility);};
 },[]);
 function toggle(){
  const player=audio.current;
  if(!player)return;
  if(!player.paused){player.pause();return;}
  if(player.ended){player.currentTime=0;setFinished(false);}
  void player.play().catch(()=>{});
 }
 return <div className="recorded-intro">
  <audio ref={audio} src={src} preload="metadata"
   onPlaying={()=>{rememberPlayback();setPlaying(true);setFinished(false);}}
   onPause={()=>setPlaying(false)}
   onEnded={()=>{setPlaying(false);setFinished(true);}}
   onError={()=>{setPlaying(false);setFailed(true);}}/>
  {!failed&&<button type="button" className="portrait-control" onClick={toggle}>{playing?"Pause introduction":finished?"Replay introduction":"Enable introduction audio"}</button>}
  {failed&&<p role="status">Introduction audio unavailable.</p>}
  <details className="intro-transcript"><summary>Introduction script</summary><p>Hello, I’m Kevin Menuja, an AI Powered Full-Stack Software Engineer and technology entrepreneur from Sri Lanka.</p><p>I’m passionate about building intelligent software solutions that solve real-world business problems.</p><p>My work combines full-stack development, modern technologies and AI-powered engineering.</p><p>Welcome to my portfolio. Explore my projects, discover my experience, and let’s build something meaningful together.</p></details>
 </div>;
}
