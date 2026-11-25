import {caseStudies,sourceUrl} from "../case-studies";
import {Arrow} from "./ui";

export function CaseStudyDetail({slug}:{slug:string}){
 const study=caseStudies[slug];
 if(!study)return null;
 return <div className="extended-case">
  <section className="case-block" aria-labelledby="role-heading">
   <p className="eyebrow">CONTRIBUTION / SCOPE</p><h2 id="role-heading">My role &amp; project status</h2>
   <p className="case-status">{study.status}</p><p>{study.role}</p>
  </section>
  <section className="case-block" aria-labelledby="capabilities-heading">
   <p className="eyebrow">IMPLEMENTED CAPABILITIES</p><h2 id="capabilities-heading">What the system does</h2>
   <ul className="capability-grid">{study.features.map((f,i)=><li key={f}><span aria-hidden="true">0{i+1}</span>{f}</li>)}</ul>
  </section>
  <section className="case-block" aria-labelledby="decisions-heading">
   <p className="eyebrow">TECHNICAL DECISIONS</p><h2 id="decisions-heading">Challenges, approaches &amp; trade-offs</h2>
   <div className="decision-grid">{study.decisions.map((d,i)=><article key={d.challenge}><p className="eyebrow">DECISION / 0{i+1}</p><h3>{d.challenge}</h3><dl><dt>Approach</dt><dd>{d.approach}</dd><dt>Trade-off / boundary</dt><dd>{d.tradeoff}</dd></dl></article>)}</div>
  </section>
  <section className="case-block" aria-labelledby="evidence-heading">
   <p className="eyebrow">VERIFIABLE ENGINEERING EVIDENCE</p><h2 id="evidence-heading">Inspect the source</h2>
   <p>Historical documentation and implementation evidence reviewed against a fixed repository revision on November 26, 2026. These are not newly executed tests of the six source applications.</p>
   <div className="source-evidence">{study.evidence.map(e=><article key={e.path}><h3><a href={sourceUrl(slug,study.revision,e.path)}>{e.label} <Arrow/></a></h3><p>{e.detail}</p><small>{e.path}</small></article>)}</div>
   <p className="revision-note">Source revision: <a href={"https://github.com/kevin-menuja/"+slug+"/commit/"+study.revision}>{study.revision.slice(0,12)} <Arrow/></a></p>
  </section>
  <section className="case-block scope-block" aria-labelledby="scope-heading"><p className="eyebrow">HONEST SCOPE</p><h2 id="scope-heading">What is not claimed</h2><p>{study.scope}</p></section>
 </div>;
}
