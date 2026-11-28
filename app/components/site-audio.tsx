"use client";
import {createContext,useContext,useEffect,useRef,useState,type ReactNode} from "react";
type Track="intro"|"music";
type AudioState={playing:boolean;track:Track;toggle:()=>void};
const AudioContext=createContext<AudioState>({playing:false,track:"intro",toggle:()=>{}});
const preference="km-site-audio";
const completed="km-intro-completed-v2";
const sources={intro:"/audio/introduction.mp3",music:"/audio/ambient.m4a"};
function read(storage:"localStorage"|"sessionStorage",key:string){try{return window[storage].getItem(key);}catch{return null;}}
function write(storage:"localStorage"|"sessionStorage",key:string,value:string){try{window[storage].setItem(key,value);}catch{}}
export function SiteAudio({children}:{children:ReactNode}){
 const player=useRef<HTMLAudioElement>(null);
 const activeTrack=useRef<Track>("intro");
 const permitted=useRef(true);
 const [playing,setPlaying]=useState(false);
 const [track,setTrack]=useState<Track>("intro");
 function play(){const a=player.current;if(a&&permitted.current)void a.play().catch(()=>{});}
 function changeTrack(next:Track){
  const a=player.current;if(!a)return;
  activeTrack.current=next;setTrack(next);
  a.loop=next==="music";a.src=sources[next];a.load();
 }
 useEffect(()=>{
  const a=player.current;
  if(!a)return;
  permitted.current=read("localStorage",preference)!=="off";
  if(read("sessionStorage",completed)==="yes"){
   activeTrack.current="music";a.loop=true;a.src=sources.music;a.load();
  }
  // Defer React state synchronization to the media events.
  if(permitted.current)void a.play().catch(()=>{});
  const sync=(event:StorageEvent)=>{
   if(event.key!==preference)return;
   permitted.current=event.newValue!=="off";
   if(!permitted.current)a.pause();
  };
  window.addEventListener("storage",sync);
  return()=>{a.pause();window.removeEventListener("storage",sync);};
 },[]);
 function toggle(){
  const a=player.current;if(!a)return;
  if(!a.paused){permitted.current=false;write("localStorage",preference,"off");a.pause();return;}
  permitted.current=true;write("localStorage",preference,"on");play();
 }
 return <AudioContext.Provider value={{playing,track,toggle}}>
  {children}
  <audio id="site-audio" ref={player} src={sources.intro} preload="auto"
   onPlaying={()=>{setPlaying(true);setTrack(activeTrack.current);}}
   onPause={()=>setPlaying(false)}
   onEnded={()=>{if(activeTrack.current==="intro"){write("sessionStorage",completed,"yes");changeTrack("music");play();}}}
   onError={()=>{setPlaying(false);if(activeTrack.current==="intro"){changeTrack("music");play();}}}/>
 </AudioContext.Provider>;
}
export function SoundToggle(){
 const {playing,toggle}=useContext(AudioContext);
 return <button type="button" className="sound-toggle" aria-label={playing?"Mute website audio":"Enable website audio"} title={playing?"Mute website audio":"Enable website audio"} onClick={toggle}>
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/>{playing?<><path d="M15 9a4 4 0 0 1 0 6"/><path d="M18 6a8 8 0 0 1 0 12"/></>:<><path d="m16 9 6 6"/><path d="m22 9-6 6"/></>}</svg>
 </button>;
}
