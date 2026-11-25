import {ResponsiveImage} from "./responsive-image";
import Link from "next/link";
import {github,type Project} from "../projects";
import {primaryDimensions} from "../project-evidence";
import {profile} from "../profile";

export function Arrow(){return <span aria-hidden="true">↗</span>}

export function SectionHeading({index,label,title,description}:{index:string;label:string;title:React.ReactNode;description?:string}){
  return <div className="section-head">
    <div><p className="eyebrow"><span className="section-number">{index}</span> {label}</p><h2>{title}</h2></div>
    {description&&<p className="section-description">{description}</p>}
  </div>;
}

export function TechTags({items}:{items:string[]}){
  return <ul className="tags" aria-label="Technologies">{items.map(t=><li key={t}>{t}</li>)}</ul>;
}

// Dimensions are shared with the screenshot gallery.

export function ProjectScreenshot({project:p,detail=false}:{project:Project;detail?:boolean}){
  if(!p.image)return null;
  const [width,height]=primaryDimensions[p.slug]??[1000,720];
  return <figure className={detail?"case-figure":"project-figure"}>
    <div className={"image-stage"+(height>width?" image-stage-phone":"")}>
      <ResponsiveImage src={p.image} alt={p.imageAlt??p.name+" application screenshot"} width={width} height={height} className="project-img" sizes={detail?"(max-width: 800px) 90vw, 1000px":height>width?"(max-width: 720px) 100px, 190px":"(max-width: 720px) 82vw, (max-width: 1100px) 46vw, 650px"}/>
    </div>
    <figcaption>{p.imageNote}</figcaption>
  </figure>;
}

export function ProjectCard({project:p}:{project:Project}){
  return <article className="project">
    <div className="project-top"><span className="project-number">{p.number}</span><span className="project-kind">{p.kind}</span></div>
    <Link prefetch={false} href={"/projects/"+p.slug} className="project-visual" aria-label={(p.imageNote??"Application screenshot")+" — read "+p.name+" case study"}>
      <ProjectScreenshot project={p}/>
    </Link>
    <div className="project-info">
      <h3><Link prefetch={false} href={"/projects/"+p.slug}>{p.name}</Link></h3>
      <p>{p.summary}</p>
      <TechTags items={p.stack}/>
      <div className="project-links">
        <Link prefetch={false} href={"/projects/"+p.slug} className="case-link">Case study <span aria-hidden="true">→</span></Link>
        <a href={github+"/"+p.slug} aria-label={"GitHub — source code for "+p.name}>GitHub <Arrow/></a>
      </div>
    </div>
  </article>;
}

export function SiteFooter(){
  return <footer className="shell footer">
    <div><Link href="/" className="footer-brand">Kevin Menuja<span>.</span></Link><p>{profile.title} · {profile.location}</p></div>
    <div className="footer-links"><a href={github}>GitHub <Arrow/></a><a href="https://www.linkedin.com/in/kevin-menuja-st20345403">LinkedIn <Arrow/></a><a href="#main">Back to top ↑</a></div>
    <span className="copyright">© 2026 Kevin Menuja</span>
  </footer>;
}
