"use client";

import {useState} from "react";

const groups=[
  {id:"frontend",index:"01",name:"Frontend",status:"Hands-on experience",skills:[["TS","TypeScript"],["Re","React"],["Nx","Next.js"],["Ht","HTML"],["Cs","CSS"]],detail:"Typed interfaces, responsive applications and component-based frontend development."},
  {id:"backend",index:"02",name:"Backend",status:"Hands-on experience",skills:[["C#","C#"],[".N","ASP.NET Core"],["Nd","Node.js"],["Ph","PHP"],["AP","REST APIs"]],detail:"Service-oriented APIs, application logic and server-rendered systems."},
  {id:"data",index:"03",name:"Data & delivery",status:"Hands-on experience",skills:[["Pg","PostgreSQL"],["My","MySQL"],["Pr","Prisma"],["Ef","EF Core"],["Gt","Git"],["Dk","Docker"]],detail:"Relational persistence, ORM integration, version control and container-based workflows."},
  {id:"ai",index:"04",name:"Applied AI",status:"Current learning focus",skills:[["Py","Python"],["Fa","FastAPI"],["LM","LLM APIs"],["Rg","RAG"],["Tc","Tool calling"],["Ev","Evaluations"],["Ag","Secure agents"]],detail:"Active learning direction. These topics are not presented as completed AI deployments."}
];

export function SkillMatrix(){
  const [filter,setFilter]=useState("all");
  const visible=groups.filter(g=>filter==="all"||g.id===filter);
  return <div className="matrix">
    <div className="matrix-toolbar">
      <div className="matrix-filters" role="group" aria-label="Filter technologies">
        {[{id:"all",name:"All"},...groups].map(g=><button type="button" key={g.id} aria-pressed={filter===g.id} onClick={()=>setFilter(g.id)}>{g.name}</button>)}
      </div>
      <p className="eyebrow" aria-live="polite">{visible.reduce((n,g)=>n+g.skills.length,0)} TECHNOLOGIES &amp; TOPICS</p>
    </div>
    <div className="matrix-groups">
      {visible.map(g=><article className={"matrix-group "+(g.id==="ai"?"matrix-learning":"")} key={g.id}>
        <header><span className="eyebrow">{g.index} / {g.status}</span><h3>{g.name}</h3><p>{g.detail}</p></header>
        <ul className="matrix-tiles">{g.skills.map(([symbol,name])=><li key={name}><span aria-hidden="true">{symbol}</span><strong>{name}</strong></li>)}</ul>
      </article>)}
    </div>
  </div>;
}
