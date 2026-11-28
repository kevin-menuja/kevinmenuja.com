"use client";
import {useSyncExternalStore} from "react";
const event="km-theme-change";
let current:"dark"|"light"="dark";
function read(){return document.documentElement.dataset.theme==="light"?"light":"dark";}
function subscribe(fn:()=>void){
 const update=()=>{try{current=localStorage.getItem("km-theme")==="light"?"light":"dark";}catch{}document.documentElement.dataset.theme=current;fn();};
 window.addEventListener("storage",update);window.addEventListener(event,fn);
 return()=>{window.removeEventListener("storage",update);window.removeEventListener(event,fn);};
}
export function ThemeToggle(){
 const theme=useSyncExternalStore(subscribe,read,()=>"dark");
 return <button type="button" className="theme-toggle" aria-label={theme==="dark"?"Switch to light mode":"Switch to dark mode"} onClick={()=>{current=theme==="dark"?"light":"dark";document.documentElement.dataset.theme=current;try{localStorage.setItem("km-theme",current);}catch{}window.dispatchEvent(new Event(event));}}>
 <span aria-hidden="true">{theme==="dark"?"☀":"☾"}</span><span>{theme==="dark"?"Light":"Dark"}</span></button>;
}
