import type {Metadata} from "next";
import Link from "next/link";
import {SiteNav} from "../components/site-nav";
import {SiteFooter,Arrow} from "../components/ui";
import cv from "../resume-data.json";
import {profile} from "../profile";
export const metadata:Metadata={title:"CV & Recruitment — "+profile.name,description:"Recruiter-friendly profile and downloadable CV for "+profile.title+" Kevin Menuja.",alternates:{canonical:"/resume"}};
export default function Resume(){return <><a className="skip" href="#main">Skip to content</a><SiteNav/><main id="main" className="shell case-page recruitment-page">
 <header className="case-head recruitment-head"><p className="eyebrow">RECRUITMENT / PROFESSIONAL PROFILE</p><h1>{profile.name}</h1><p className="recruitment-title">{profile.title}</p><p className="lead">{cv.opportunities}</p>
 <div className="actions"><a className="button primary" href="/downloads/Kevin-Menuja-CV.pdf" download>Download CV (PDF) <span aria-hidden="true">↓</span></a><a className="button secondary" href={"mailto:"+cv.email+"?subject="+encodeURIComponent("Remote engineering opportunity")}>Contact for recruitment <Arrow/></a></div>
 </header>
 <section className="case-block"><h2>Professional summary</h2><p>{cv.summary}</p><div className="recruitment-links"><a href={cv.github}>GitHub <Arrow/></a><a href={cv.linkedin}>LinkedIn <Arrow/></a><a href={"mailto:"+cv.email}>{cv.email}</a></div></section>
 <section className="case-block"><h2>Technical skills</h2><dl className="recruitment-skills">{cv.skills.map(s=><div key={s.label}><dt>{s.label}</dt><dd>{s.text}</dd></div>)}</dl></section>
 <section className="case-block"><h2>Selected engineering work</h2><div className="recruitment-projects">{cv.projects.map(p=><article key={p.slug}><p className="eyebrow">{p.role}</p><h3>{p.name}</h3><p>{p.text}</p><p className="recruitment-stack">{p.stack}</p><div className="recruitment-links"><Link prefetch={false} href={"/projects/"+p.slug}>Case study <Arrow/></Link><a href={cv.github+"/"+p.slug}>Source code <Arrow/></a></div></article>)}</div><Link className="inline-link" prefetch={false} href="/#work">Explore all six projects <Arrow/></Link></section>
 <section className="case-block"><h2>Experience</h2><h3>{cv.experience.heading}</h3><p>{cv.experience.text}</p></section>
 <section className="case-block"><h2>Education</h2><div className="recruitment-projects">{cv.education.map(e=><article key={e.title}><h3>{e.title}</h3><p>{e.detail}</p></article>)}</div></section>
 <section className="case-block"><h2>Discuss an opportunity</h2><p>Based in {cv.location}. Available for discussions about remote roles, freelance projects and technical collaborations.</p><div className="actions"><Link className="button primary" prefetch={false} href="/#contact">Prepare an inquiry <Arrow/></Link><a className="button secondary" href="/downloads/Kevin-Menuja-CV.pdf" download>Download résumé <span aria-hidden="true">↓</span></a></div></section>
 </main><SiteFooter/></>}
