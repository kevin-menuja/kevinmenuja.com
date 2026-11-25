import Image from "next/image";
import {github,projects} from "./projects";
import {SiteNav} from "./components/site-nav";
import {Arrow,ProjectCard,SectionHeading,SiteFooter} from "./components/ui";

const skills=[
  {number:"01",name:"Frontend",items:"TypeScript · React · Next.js · HTML · CSS"},
  {number:"02",name:"Backend",items:"C# · ASP.NET Core · Node.js · PHP · REST APIs"},
  {number:"03",name:"Data & delivery",items:"PostgreSQL · MySQL · Prisma · EF Core · Git · Docker"}
];
const education=[
  {title:"Higher Diploma in Computing & Software Engineering",detail:"ICBT Campus Colombo · Cardiff Metropolitan University affiliation"},
  {title:"OTHM Level 3 Foundation Diploma in Higher Studies",detail:"ICBT Campus Colombo"},
  {title:"G.C.E. Ordinary Level",detail:"Christ King College, Pannipitiya"}
];

export default function Home(){
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <SiteNav/>
    <main id="main" className="shell">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow hero-kicker"><span className="dot"/> FULL-STACK DEVELOPER / SRI LANKA</p>
          <p className="intro-name">Hi, I’m Kevin Menuja.</p>
          <h1 id="hero-title">Software for<br className="desktop-break"/> real-world<br className="desktop-break"/> <em>operations.</em></h1>
          <p className="lead">I build maintainable applications for practical business needs. Full-stack developer, technology entrepreneur and aspiring applied AI engineer.</p>
          <div className="actions">
            <a className="button primary" href="#work">Explore my work <span aria-hidden="true">↓</span></a>
            <a className="button secondary" href={github}>View GitHub <Arrow/></a>
          </div>
          <div className="hero-status"><span className="status-dot" aria-hidden="true"/> Open to remote engineering opportunities</div>
        </div>
        <figure className="hero-photo">
          <div className="photo-label"><span>PERSONAL PROFILE</span><span>LK / 2026</span></div>
          <div className="portrait-frame"><Image src="/images/kevin.webp" alt="Black-and-white studio portrait of Kevin Menuja" width={1024} height={1106} priority className="portrait" sizes="(max-width: 720px) 90vw, 480px"/></div>
          <figcaption className="photo-caption"><strong>Kevin Menuja</strong><span>Developer · Founder</span></figcaption>
        </figure>
      </section>
      <div className="strip" aria-label="Portfolio at a glance">
        <div><b>06</b><span>Featured projects<small>Real application evidence</small></span></div>
        <div><b>02</b><span>Completed diplomas<small>Computing and software</small></span></div>
        <div><b>AI</b><span>Current learning focus<small>Applied AI engineering</small></span></div>
      </div>
      <section id="work" className="section" aria-label="Selected work">
        <SectionHeading index="01" label="SELECTED WORK" title={<>Built to solve.<br/><em>Engineered to work.</em></>} description="Business applications, backend systems and academic collaborations. Explore the implementation, documented evidence and scope of each project."/>
        <div className="project-grid">{projects.map(p=><ProjectCard key={p.slug} project={p}/>)}</div>
        <div className="section-end"><a className="button secondary" href={github+"?tab=repositories"}>All repositories <Arrow/></a><span className="eyebrow">SOURCE CODE / DOCUMENTATION / REAL INTERFACES</span></div>
      </section>
      <section id="about" className="section about" aria-label="Professional background">
        <div className="about-copy">
          <p className="eyebrow"><span className="section-number">02</span> BACKGROUND</p>
          <h2>Developer mindset.<br/><em>Founder ownership.</em></h2>
          <p className="lead">I’m a Sri Lankan developer with a completed Higher Diploma and hands-on experience across frontend, backend, relational databases and deployment. Through Startek, I work on practical digital and business systems.</p>
          <p className="lead">My goal is to build reliable software and grow into an applied AI engineer.</p>
          <a className="inline-link" href="https://www.linkedin.com/in/kevin-menuja-st20345403">Professional profile <Arrow/></a>
        </div>
        <div className="education">
          <p className="eyebrow">EDUCATION / COMPLETED</p>
          {education.map((e,i)=><article key={e.title}><span className="timeline-index">0{i+1}</span><div><h3>{e.title}</h3><p>{e.detail}</p></div></article>)}
        </div>
      </section>
      <section id="skills" className="section" aria-label="Technical expertise">
        <SectionHeading index="03" label="ENGINEERING TOOLKIT" title={<>From interface<br/><em>to infrastructure.</em></>} description="Technologies I’ve worked with, alongside the next areas of my engineering development."/>
        <div className="skill-grid">
          {skills.map(s=><article key={s.name}><div className="skill-top"><span className="eyebrow">HANDS-ON EXPERIENCE</span><span className="project-number">{s.number}</span></div><h3>{s.name}</h3><p>{s.items}</p></article>)}
          <article className="learning"><div className="skill-top"><span className="eyebrow">CURRENT LEARNING FOCUS</span><span className="project-number">04</span></div><h3>Applied AI engineering</h3><p>Python · FastAPI · LLM APIs · RAG · tool calling · evaluations · secure agent workflows</p><small>Current learning direction, distinct from completed project work.</small></article>
        </div>
      </section>
      <section id="contact" className="contact" aria-label="Contact">
        <p className="eyebrow"><span className="section-number">04</span> CONTACT</p>
        <div className="contact-layout">
          <div><h2>Let’s build<br/><em>something useful.</em></h2><p>Open to international remote engineering opportunities, software collaborations and freelance projects.</p></div>
          <div className="contact-links"><a className="button primary" href="mailto:kevinmenuja11@gmail.com">Email me <Arrow/></a><a className="button secondary" href="https://www.linkedin.com/in/kevin-menuja-st20345403">LinkedIn <Arrow/></a><a className="button secondary" href={github}>GitHub <Arrow/></a></div>
        </div>
      </section>
    </main>
    <SiteFooter/>
  </>;
}
