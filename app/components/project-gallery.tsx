"use client";

import Image from "next/image";
import {useEffect,useRef,useState} from "react";
import type {Project} from "../projects";
import {additionalScreenshots,primaryDimensions,projectArchitecture} from "../project-evidence";

export function ProjectGallery({project:p}:{project:Project}){
  const dims=primaryDimensions[p.slug]??[1000,720];
  const slides=[...(p.image?[{src:p.image,alt:p.imageAlt??p.name+" screenshot",note:p.imageNote??"Application screenshot",width:dims[0],height:dims[1]}]:[]),...(additionalScreenshots[p.slug]??[])];
  const [index,setIndex]=useState(0);
  const dialog=useRef<HTMLDialogElement>(null);
  const openButton=useRef<HTMLButtonElement>(null);
  const slide=slides[index];
  useEffect(()=>{
    const d=dialog.current;
    if(!d)return;
    const close=()=>openButton.current?.focus();
    d.addEventListener("close",close);
    return()=>{d.removeEventListener("close",close);if(d.open)d.close();};
  },[]);
  if(!slide)return null;
  function change(direction:number){setIndex(i=>(i+direction+slides.length)%slides.length);}
  return <section className="evidence-gallery" aria-label="Application screenshots">
    <div className="gallery-heading"><p className="eyebrow">APPLICATION EVIDENCE / {String(slides.length).padStart(2,"0")} {slides.length===1?"VIEW":"VIEWS"}</p><button type="button" ref={openButton} className="gallery-open" onClick={()=>dialog.current?.showModal()}>View full screenshot <span aria-hidden="true">⤢</span></button></div>
    <figure className="case-figure">
      <div className={"image-stage"+(slide.height>slide.width?" image-stage-phone":"")}><Image src={slide.src} alt={slide.alt} width={slide.width} height={slide.height} className="project-img" sizes="(max-width: 800px) 92vw, 1000px"/></div>
      <figcaption>{slide.note}</figcaption>
    </figure>
    {slides.length>1&&<div className="gallery-nav"><button type="button" aria-label="Previous screenshot" onClick={()=>change(-1)}>←</button><p aria-live="polite">Screenshot {index+1} of {slides.length}</p><button type="button" aria-label="Next screenshot" onClick={()=>change(1)}>→</button></div>}
    <dialog ref={dialog} className="screenshot-dialog" data-lenis-prevent aria-label={p.name+" full screenshot"} onKeyDown={e=>{if(slides.length>1&&e.key==="ArrowRight"){e.preventDefault();change(1);}if(slides.length>1&&e.key==="ArrowLeft"){e.preventDefault();change(-1);}}} onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close();}}>
      <div className="dialog-inner"><div className="dialog-head"><p>{p.name} · {index+1}/{slides.length}</p><button type="button" onClick={()=>dialog.current?.close()}>Close <span aria-hidden="true">×</span></button></div>
        <div className="dialog-image"><Image src={slide.src} alt={slide.alt} width={slide.width} height={slide.height} sizes="90vw"/></div>
        <p className="dialog-caption">{slide.note}</p>
        {slides.length>1&&<div className="gallery-nav"><button type="button" aria-label="Previous full screenshot" onClick={()=>change(-1)}>←</button><span>Use ← / → arrow keys</span><button type="button" aria-label="Next full screenshot" onClick={()=>change(1)}>→</button></div>}
      </div>
    </dialog>
  </section>;
}

export function ArchitectureExplorer({slug}:{slug:string}){
  const nodes=projectArchitecture[slug]??[];
  const [selected,setSelected]=useState(0);
  if(!nodes.length)return null;
  return <section className="architecture-explorer" aria-labelledby="architecture-title"><p className="eyebrow">SYSTEM OVERVIEW</p><h2 id="architecture-title">Explore the architecture.</h2><p className="architecture-note">Conceptual overview of the documented technology layers, not an exhaustive runtime topology.</p>
    <ol className="architecture-nodes">{nodes.map((node,i)=><li key={node.title}><button type="button" aria-pressed={selected===i} onClick={()=>setSelected(i)}><span className="eyebrow">0{i+1}</span><strong>{node.title}</strong><span>{node.tech}</span></button></li>)}</ol>
    <div className="architecture-detail" aria-live="polite"><h3>{nodes[selected].title}</h3><p>{nodes[selected].detail}</p></div>
  </section>;
}
