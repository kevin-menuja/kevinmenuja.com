import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
import {projects,github} from "../../projects";
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=projects.find(x=>x.slug===slug);return p?{title:p.name+" — Kevin Menuja",description:p.summary}:{}}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const p=projects.find(x=>x.slug===slug);if(!p)notFound();
 return <main className="shell case-page"><nav className="case-nav"><Link href="/#work">← All projects</Link><Link href="/">KM.</Link></nav><div className="case-head"><p className="eyebrow">{p.number} / {p.kind}</p><h1>{p.name}</h1><p className="lead">{p.summary}</p><div className="tags">{p.stack.map(t=><span key={t}>{t}</span>)}</div><div className="actions"><a className="button primary" href={github+"/"+p.slug}>View repository ↗</a>{p.doc&&<a className="button secondary" href={github+"/"+p.slug+"/blob/main/"+p.doc}>Source documentation ↗</a>}{p.live&&<a className="button secondary" href={p.live}>Evaluation deployment ↗</a>}</div></div>{p.image&&<figure className="case-figure"><Image src={p.image} alt={p.imageAlt!} width={1000} height={720} className={p.slug==="printxpress"?"phone-img":""}/><figcaption>{p.imageNote}</figcaption></figure>}<div className="case-details">{[["Problem",p.problem],["Implementation",p.implementation],["Engineering evidence",p.evidence],["Scope & limitations",p.limitations]].map(([title,body])=><section key={title}><h2>{title}</h2><p>{body}</p></section>)}</div><footer className="footer"><Link href="/#work">← Explore more projects</Link><span>Kevin Menuja · Project case study</span></footer></main>
}
