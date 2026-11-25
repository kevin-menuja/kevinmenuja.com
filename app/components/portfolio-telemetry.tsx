"use client";
import {Analytics} from "@vercel/analytics/next";
import {SpeedInsights} from "@vercel/speed-insights/next";
function sanitize<T extends {url:string}>(event:T):T|null{
 try{if(localStorage.getItem("km-analytics")!=="on")return null;}catch{return null;}
 try{const url=new URL(event.url,window.location.origin);url.search="";url.hash="";return {...event,url:url.toString()};}catch{return null;}
}
export function PortfolioTelemetry(){return <><Analytics beforeSend={sanitize}/><SpeedInsights sampleRate={0.5} beforeSend={sanitize}/></>;}
