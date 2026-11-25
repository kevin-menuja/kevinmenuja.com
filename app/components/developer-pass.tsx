"use client";

import {ResponsiveImage} from "./responsive-image";
import {useState} from "react";

export function DeveloperPass(){
  const [details,setDetails]=useState(false);
  return <div className="pass-wrap">
    <div className="pass-lanyard" aria-hidden="true"><span>KM / ENGINEERING</span></div>
    <div className="developer-pass">
      <div className="pass-head"><span>KM<span className="accent-text">.</span></span><span>DEVELOPER<br/>PROFILE</span></div>
      <div id="pass-content" className="pass-content">
        {details?<div className="pass-details">
          <p className="eyebrow">PROFILE / DETAILS</p>
          <dl><div><dt>Based in</dt><dd>Sri Lanka</dd></div><div><dt>Qualification</dt><dd>Higher Diploma in Computing &amp; Software Engineering</dd></div><div><dt>Current focus</dt><dd>Applied AI engineering</dd></div></dl>
        </div>:<><div className="pass-photo"><ResponsiveImage src="/images/kevin.webp" alt="" width={1024} height={1106} sizes="180px"/></div><p className="pass-name">Kevin Menuja</p><p className="pass-role">Full-stack developer</p><div className="pass-code" aria-hidden="true"/></>}
      </div>
      <button className="pass-toggle" type="button" aria-expanded={details} aria-controls="pass-content" onClick={()=>setDetails(v=>!v)}>{details?"Back to portrait":"View profile details"} <span aria-hidden="true">↻</span></button>
    </div>
  </div>;
}
