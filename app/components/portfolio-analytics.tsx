"use client";
import {useSyncExternalStore} from "react";
import dynamic from "next/dynamic";
const Telemetry=dynamic(()=>import("./portfolio-telemetry").then(m=>m.PortfolioTelemetry),{ssr:false});
const key="km-analytics";
const eventName="km-analytics-change";
function read(){try{return localStorage.getItem(key)==="on";}catch{return false;}}
function subscribe(fn:()=>void){window.addEventListener(eventName,fn);window.addEventListener("storage",fn);return()=>{window.removeEventListener(eventName,fn);window.removeEventListener("storage",fn);};}
const off=()=>false;
export function AnalyticsPreference({available}:{available:boolean}){
 const enabled=useSyncExternalStore(subscribe,read,off);
 return <div className="analytics-preference"><p>{available?"Optional site usage and performance measurement via Vercel.":"Analytics collection is not enabled in this environment."} Contact fields are never sent as analytics events.</p>{available&&<button className="button secondary" type="button" aria-pressed={enabled} onClick={()=>{try{localStorage.setItem(key,enabled?"off":"on");window.dispatchEvent(new Event(eventName));window.location.reload();}catch{}}}>{enabled?"Turn analytics off":"Allow optional analytics"}</button>}</div>;
}
export function PortfolioAnalytics(){
 const enabled=useSyncExternalStore(subscribe,read,off);
 return enabled?<Telemetry/>:null;
}
