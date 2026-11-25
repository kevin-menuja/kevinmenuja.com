"use client";

import {useEffect,useState} from "react";
import {github,projects} from "../projects";
import {profile} from "../profile";

const scenarios=[
  {id:"ticket",name:"Service ticket workflow",steps:[
    {role:"Architect",action:"Define ticket inputs, roles and a safe workflow boundary.",output:"Plan: typed request → validation → assignment."},
    {role:"Developer",action:"Model the application workflow and service contract.",output:"Implementation plan: validate input, persist ticket, assign role."},
    {role:"QA",action:"Check empty input, invalid roles and assignment failures.",output:"Test plan: happy path, authorization and failure handling."},
    {role:"DevOps",action:"Prepare an isolated review deployment.",output:"Release checklist: CI, migration check, smoke tests and rollback."}]},
  {id:"pos",name:"Restaurant POS change",steps:[
    {role:"Architect",action:"Define an order-total change and financial invariants.",output:"Plan: validate quantities, calculate totals, preserve transaction history."},
    {role:"Developer",action:"Prepare a change to the order pricing service.",output:"Implementation plan: pure calculation, server-side validation, atomic writes."},
    {role:"QA",action:"Check rounding, discounts and rejected payments.",output:"Test plan: boundary values, duplicates and error handling."},
    {role:"DevOps",action:"Prepare a controlled release and recovery plan.",output:"Release checklist: isolated database, preview, acceptance and rollback."}]}
];

const commands=["help","projects","stack","about","contact","clear"] as const;
function terminalResponse(command:string):string[]{
  switch(command){
    case "help":return ["Available commands: "+commands.join(", "),"This is a read-only portfolio terminal. No shell or external execution."];
    case "projects":return projects.map(p=>p.name+" — "+github+"/"+p.slug);
    case "stack":return ["Frontend: TypeScript, React, Next.js","Backend: ASP.NET Core, Node.js, PHP","Data & delivery: PostgreSQL, MySQL, Prisma, EF Core, Git, Docker","Current learning: applied AI, Python, FastAPI, RAG and agents"];
    case "about":return [profile.name+" — "+profile.title+" and technology entrepreneur.","Completed Higher Diploma in Computing & Software Engineering and OTHM Level 3 Foundation Diploma."];
    case "contact":return ["Use the Contact section for email, LinkedIn and GitHub links."];
    default:return ["Unknown command. Type help to see the available commands."];
  }
}

export function EngineeringLab(){
  const [selected,setSelected]=useState(0);
  const [completed,setCompleted]=useState(0);
  const [running,setRunning]=useState(false);
  const [input,setInput]=useState("");
  const [history,setHistory]=useState<{command:string;output:string[]}[]>([]);
  const scenario=scenarios[selected];
  const done=completed===scenario.steps.length;
  useEffect(()=>{
    if(!running||done)return;
    const timer=window.setTimeout(()=>{
      setCompleted(n=>Math.min(n+1,scenario.steps.length));
      if(completed+1>=scenario.steps.length)setRunning(false);
    },950);
    const visibility=()=>{if(document.hidden)setRunning(false);};
    document.addEventListener("visibilitychange",visibility);
    return()=>{clearTimeout(timer);document.removeEventListener("visibilitychange",visibility);};
  },[running,completed,done,scenario.steps.length]);
  function choose(index:number){setRunning(false);setCompleted(0);setSelected(index);}
  function runCommand(value:string){
    const command=value.trim().toLowerCase().slice(0,80);
    if(!command)return;
    setInput("");
    if(command==="clear"){setHistory([]);return;}
    setHistory(old=>[...old.slice(-7),{command,output:terminalResponse(command)}]);
  }
  return <div className="lab-grid">
    <div className="lab-panel workflow-panel">
      <header className="lab-head"><div><p className="eyebrow">01 / ENGINEERING WORKFLOW</p><h3>Agentic workflow lab</h3></div><span className="lab-indicator">SIMULATION</span></header>
      <p className="lab-disclosure">Deterministic, interactive demonstration. No AI agents, API calls or deployments are running.</p>
      <label className="lab-label" htmlFor="lab-scenario">Workflow scenario</label>
      <select id="lab-scenario" value={selected} onChange={e=>choose(Number(e.target.value))}>{scenarios.map((s,i)=><option key={s.id} value={i}>{s.name}</option>)}</select>
      <div className="lab-progress" role="progressbar" aria-label="Workflow completion" aria-valuemin={0} aria-valuemax={scenario.steps.length} aria-valuenow={completed}><span style={{width:(completed/scenario.steps.length*100)+"%"}}/></div>
      <ol className="workflow-steps">{scenario.steps.map((step,i)=><li key={step.role} data-state={i<completed?"done":running&&i===completed?"active":"waiting"}>
        <span className="workflow-index">0{i+1}</span><div><strong>{step.role}</strong><p>{step.action}</p>{i<completed&&<p className="workflow-output">{step.output}</p>}</div><span className="step-state">{i<completed?"Complete":running&&i===completed?"Running":"Ready"}</span>
      </li>)}</ol>
      <div className="lab-controls"><button className="button primary" type="button" disabled={done} onClick={()=>setRunning(v=>!v)}>{running?"Pause workflow":done?"Workflow complete":"Run workflow"}</button><button className="button secondary" type="button" disabled={done||running} onClick={()=>setCompleted(v=>Math.min(v+1,scenario.steps.length))}>Next step</button><button className="button secondary" type="button" onClick={()=>{setRunning(false);setCompleted(0);}}>Reset workflow</button></div>
      <p role="status" className="lab-disclosure">{done?"Simulation finished. No actual changes were made.":completed+" of "+scenario.steps.length+" steps completed."}</p>
    </div>
    <div className="lab-panel terminal-panel">
      <header className="lab-head"><div><p className="eyebrow">02 / INTERACTIVE TERMINAL</p><h3>Explore my work</h3></div><span className="lab-indicator">READ ONLY</span></header>
      <p className="lab-disclosure">A safe command-driven interface to portfolio information. Not a real shell.</p>
      <div className="terminal-screen" data-lenis-prevent role="log" aria-label="Portfolio terminal output" aria-live="polite" tabIndex={0}>
        <p><span className="terminal-prompt">kevin@portfolio:~$</span> help</p><p>Choose a command below, or type one in the input.</p>
        {history.map((entry,i)=><div key={i}><p><span className="terminal-prompt">kevin@portfolio:~$</span> {entry.command}</p>{entry.output.map((line,j)=><p key={j}>{line}</p>)}</div>)}
      </div>
      <form className="terminal-form" onSubmit={e=>{e.preventDefault();runCommand(input);}}><label className="sr-only" htmlFor="terminal-command">Portfolio command</label><input id="terminal-command" autoComplete="off" maxLength={80} value={input} onChange={e=>setInput(e.target.value)} placeholder="Type help"/><button type="submit">Run <span aria-hidden="true">↵</span></button></form>
      <div className="terminal-commands" role="group" aria-label="Available terminal commands">{commands.map(c=><button type="button" key={c} onClick={()=>runCommand(c)}>{c}</button>)}</div>
    </div>
  </div>;
}
