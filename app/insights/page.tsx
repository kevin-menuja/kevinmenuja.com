import Link from "next/link";
import type {Metadata} from "next";
import {articles} from "../insights-data";
import {SiteNav} from "../components/site-nav";
import {SiteFooter,Arrow} from "../components/ui";
export const metadata:Metadata={title:"Engineering Insights — Kevin Menuja",description:"Technical notes on reliable software, application architecture, data integrity and applied AI learning.",alternates:{canonical:"/insights"}};
export default function Insights(){return <><a className="skip" href="#main">Skip to content</a><SiteNav/><main id="main" className="shell case-page"><header className="case-head"><p className="eyebrow">ENGINEERING NOTES / 2026</p><h1>Technical insights.</h1><p className="lead">Practical engineering principles grounded in documented projects and current learning. These are portfolio learning notes, not new independent audits.</p></header><div className="insight-grid">{articles.map(a=><article className="case-block" key={a.slug}><p className="eyebrow">{a.category}</p><h2><Link href={"/insights/"+a.slug} prefetch={false}>{a.title}</Link></h2><p>{a.description}</p><Link className="inline-link" href={"/insights/"+a.slug} prefetch={false}>Read article <Arrow/></Link></article>)}</div></main><SiteFooter/></>}
