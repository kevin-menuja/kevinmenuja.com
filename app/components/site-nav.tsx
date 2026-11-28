"use client";

import Link from "next/link";
import {profile} from "../profile";
import {ThemeToggle} from "./theme-toggle";
import {useEffect, useRef, useState} from "react";

const links = [
  {label:"Work", href:"/#work"},
  {label:"About", href:"/#about"},
  {label:"Experience", href:"/#experience"},
  {label:"Expertise", href:"/#skills"},
  {label:"Insights", href:"/insights"},
  {label:"CV", href:"/resume"}
];

export function SiteNav(){
  const [open,setOpen]=useState(false);
  const toggle=useRef<HTMLButtonElement>(null);
  const header=useRef<HTMLElement>(null);

  useEffect(()=>{
    if(!open)return;
    const key=(event:KeyboardEvent)=>{
      if(event.key==="Escape"){setOpen(false);toggle.current?.focus();}
    };
    const pointer=(event:PointerEvent)=>{
      if(!header.current?.contains(event.target as Node))setOpen(false);
    };
    const media=window.matchMedia("(min-width: 1281px)");
    const resize=()=>{if(media.matches)setOpen(false);};
    document.addEventListener("keydown",key);
    document.addEventListener("pointerdown",pointer);
    media.addEventListener("change",resize);
    return ()=>{
      document.removeEventListener("keydown",key);
      document.removeEventListener("pointerdown",pointer);
      media.removeEventListener("change",resize);
    };
  },[open]);

  return <header className="header" ref={header}>
    <nav className="shell nav" aria-label="Main navigation">
      <Link prefetch={false} href="/" className="brand" onClick={()=>setOpen(false)}>
        <span className="mark" aria-hidden="true">KM<span>.</span></span>
        <span className="brand-name">Kevin Menuja<span className="brand-role" title={profile.title}>{profile.title}</span></span>
      </Link>
      <div className="navlinks">
        {links.map(l=><Link prefetch={false} key={l.href} href={l.href}>{l.label}</Link>)}
      </div>
      <Link prefetch={false} className="contact-nav" href="/#contact">Let’s connect <span aria-hidden="true">↗</span></Link>
      <ThemeToggle/>
      <button className="nav-toggle" ref={toggle} type="button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open?"Close navigation":"Open navigation menu"} onClick={()=>setOpen(v=>!v)}>
        <span aria-hidden="true">{open?"×":"☰"}</span><span>{open?"Close":"Menu"}</span>
      </button>
    </nav>
    <nav id="mobile-nav" className="mobile-nav shell" aria-label="Mobile navigation" hidden={!open}>
      {links.map(l=><Link prefetch={false} key={l.href} href={l.href} onClick={()=>setOpen(false)}>{l.label}<span aria-hidden="true">↗</span></Link>)}
      <Link prefetch={false} href="/#contact" onClick={()=>setOpen(false)}>Contact<span aria-hidden="true">↗</span></Link>
    </nav>
  </header>;
}
