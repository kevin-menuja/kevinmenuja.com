"use client";

import {useState,type ReactNode} from "react";

const categories=[{id:"all",label:"All projects"},{id:"business",label:"Business applications"},{id:"academic",label:"Academic projects"},{id:"portfolio",label:"Portfolio demos"}];

export function ProjectFilter({items}:{items:{slug:string;category:string;searchText:string;card:ReactNode}[]}){
 const [category,setCategory]=useState("all");
 const [query,setQuery]=useState("");
 const words=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
 const visible=items.filter(p=>(category==="all"||category===p.category)&&words.every(w=>p.searchText.toLowerCase().includes(w)));
 return <>
  <div className="project-filter">
   <div className="matrix-filters" role="group" aria-label="Filter projects">{categories.map(c=><button type="button" key={c.id} aria-pressed={category===c.id} onClick={()=>setCategory(c.id)}>{c.label}</button>)}</div>
   <div className="project-search"><label htmlFor="project-search">Search projects</label><input id="project-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="e.g. PostgreSQL" maxLength={100}/></div>
   <p className="eyebrow" role="status">{visible.length} of {items.length} projects</p>
  </div>
  <div className="project-grid">{visible.map(p=><div className="project-result" key={p.slug}>{p.card}</div>)}</div>
  {!visible.length&&<div className="project-empty"><p>No matching projects.</p><button type="button" className="button secondary" onClick={()=>{setQuery("");setCategory("all");}}>Clear filters</button></div>}
 </>;
}
