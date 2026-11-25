import Link from "next/link";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
import {projects,github} from "../../projects";
import {SiteNav} from "../../components/site-nav";
import {Arrow,TechTags,SiteFooter} from "../../components/ui";
import {ProjectGallery,ArchitectureExplorer} from "../../components/project-gallery";
import {CaseStudyDetail} from "../../components/case-study-detail";

export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;const p=projects.find(x=>x.slug===slug);
  return p?{title:p.name+" — Kevin Menuja",description:p.summary}:{};
}

export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const index=projects.findIndex(x=>x.slug===slug);
  const p=projects[index];
  if(!p)notFound();
  const next=projects[(index+1)%projects.length];
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <SiteNav/>
    <main id="main" className="shell case-page">
      <nav className="case-nav" aria-label="Breadcrumb"><Link href="/#work">← Selected work</Link><span>PROJECT / {p.number}</span></nav>
      <header className="case-head">
        <p className="eyebrow">{p.kind}</p>
        <h1>{p.name}</h1>
        <p className="lead">{p.summary}</p>
        <TechTags items={p.stack}/>
        <div className="actions"><a className="button primary" href={github+"/"+p.slug}>View repository <Arrow/></a>{p.doc&&<a className="button secondary" href={github+"/"+p.slug+"/blob/main/"+p.doc}>Source documentation <Arrow/></a>}{p.live&&<a className="button secondary" href={p.live}>{p.slug==="rice-and-kottu-hut-pos"?"Evaluation deployment":"Application"} <Arrow/></a>}</div>
      </header>
      <ProjectGallery project={p}/>
      <ArchitectureExplorer slug={p.slug}/>
      <div className="case-details">{[["Problem",p.problem],["Implementation",p.implementation],["Engineering evidence",p.evidence],["Scope & limitations",p.limitations]].map(([title,body],i)=><section key={title}><span className="eyebrow">0{i+1}</span><h2>{title}</h2><p>{body}</p></section>)}</div>
      <CaseStudyDetail slug={p.slug}/>
      <Link className="next-project" href={"/projects/"+next.slug}><div><p className="eyebrow">NEXT PROJECT / {next.number}</p><h2>{next.name}</h2></div><span aria-hidden="true">↗</span></Link>
    </main>
    <SiteFooter/>
  </>;
}
