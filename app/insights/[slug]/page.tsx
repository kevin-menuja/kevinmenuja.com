import Link from "next/link";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
import {articles} from "../../insights-data";
import {caseStudies,sourceUrl} from "../../case-studies";
import {SiteNav} from "../../components/site-nav";
import {SiteFooter,Arrow} from "../../components/ui";
export function generateStaticParams(){return articles.map(a=>({slug:a.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const a=articles.find(x=>x.slug===slug);
 return a?{title:a.title+" — Kevin Menuja",description:a.description,alternates:{canonical:"/insights/"+slug},openGraph:{type:"article",title:a.title,description:a.description}}:{};
}
export default async function Article({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const a=articles.find(x=>x.slug===slug);if(!a)notFound();
 const study=caseStudies[a.project];
 return <><a className="skip" href="#main">Skip to content</a><SiteNav/><main id="main" className="shell case-page"><nav className="case-nav" aria-label="Breadcrumb"><Link prefetch={false} href="/insights">← All insights</Link><span>{a.category}</span></nav><article className="insight-article"><header className="case-head"><p className="eyebrow">{a.category} / ENGINEERING NOTE</p><h1>{a.title}</h1><p className="lead">{a.description}</p><p className="eyebrow">PORTFOLIO LEARNING NOTES</p></header><div className="insight-toc"><p className="eyebrow">IN THIS ARTICLE</p><ol>{a.sections.map((s,i)=><li key={s.title}><a href={"#section-"+(i+1)}>{s.title}</a></li>)}</ol></div>{a.sections.map((s,i)=><section key={s.title} id={"section-"+(i+1)} className="case-block insight-section"><h2>{s.title}</h2>{s.paragraphs.map(p=><p key={p}>{p}</p>)}</section>)}<section className="case-block"><h2>Related evidence</h2><p>Project documentation reviewed against a fixed source revision. General recommendations are distinguished from implemented project behavior.</p><div className="actions"><Link prefetch={false} className="button primary" href={"/projects/"+a.project}>Project case study <Arrow/></Link><a className="button secondary" href={sourceUrl(a.project,study.revision,a.source)}>Source documentation <Arrow/></a></div></section></article></main><SiteFooter/></>;
}
