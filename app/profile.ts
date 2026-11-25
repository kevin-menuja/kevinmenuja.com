/** Owner-approved professional identity and factual public profile. */
export const profile = {
  name: "Kevin Menuja",
  title: "AI Powered Full-Stack Software Engineer",
  titleLines: ["AI Powered", "Full-Stack", "Software Engineer"],
  location: "Sri Lanka",
  tagline: "Building reliable software for real business problems, with AI-powered development and a focus on applied AI engineering.",
  biography: [
    "I’m a Sri Lankan software engineer, freelancer and technology entrepreneur. My work connects responsive interfaces, backend services, relational databases and business workflows. I completed my Higher Diploma in Computing & Software Engineering at ICBT Campus Colombo, affiliated with Cardiff Metropolitan University (UK).",
    "I have practical experience with AI-assisted development, prompt engineering and AI agent workflows. I’m developing deeper expertise in integrating LLM APIs, retrieval-augmented generation and secure agent systems into maintainable applications.",
    "My long-term goal is to build intelligent SaaS products and contribute to international engineering teams. I value independent problem-solving, security, testing and evidence-backed delivery."
  ],
  introduction: "Hello, I’m Kevin Menuja, an AI Powered Full-Stack Software Engineer and technology entrepreneur based in Sri Lanka. I build software for real business operations, and I use AI-assisted development while developing deeper expertise in applied AI engineering. Explore my projects to see the applications, architecture and engineering evidence behind my work.",
  education: [
    {title:"Higher Diploma in Computing & Software Engineering",detail:"ICBT Campus Colombo · Cardiff Metropolitan University (UK) affiliation",note:"Full-stack application development, service-oriented computing, mobile development and a collaborative final computing project.",status:"Completed"},
    {title:"OTHM Level 3 Foundation Diploma in Higher Studies",detail:"ICBT Campus Colombo · UK-affiliated qualification",note:"Foundation computing, mathematics, academic English, business and economics.",status:"Completed"},
    {title:"G.C.E. Ordinary Level",detail:"Christ King College, Pannipitiya",note:"School education.",status:"Completed"}
  ],
  experience: [
    {label:"INDEPENDENT ENGINEERING",title:"Business software & freelance development",description:"Developing practical applications for business operations, including the independently developed Rice & Kottu Hut POS and work on print-shop operational software. My portfolio documents the implementation and scope of these projects.",link:"/projects/rice-and-kottu-hut-pos",linkLabel:"Restaurant POS case study"},
    {label:"COLLABORATIVE ENGINEERING",title:"ServiceOps — higher diploma final project",description:"Worked in a five-person group with allocated responsibilities in project management, solution architecture and backend integration. The completed system covers service operations; AI Copilot capabilities are a future direction, not part of the completed group application.",link:"/projects/serviceops-group-project",linkLabel:"ServiceOps case study"},
    {label:"TECHNOLOGY ENTREPRENEURSHIP",title:"Startek (PVT) LTD",description:"My entrepreneurial work connects digital marketing, web development and printing services through Startek Digital, Startek Web Hub and Startek Print Hub. These business contexts inform my interest in workflow automation and practical SaaS products."}
  ],
  principles: [
    {title:"End-to-end engineering",description:"Connect frontend interfaces, backend contracts and reliable data models."},
    {title:"AI-powered development",description:"Use AI-assisted tools thoughtfully, validate their output and develop independent engineering judgment."},
    {title:"Quality and ownership",description:"Prioritize maintainability, security, testing, clear documentation and responsible delivery."}
  ],
  opportunities: "Open to international remote software engineering roles, freelance development and technology collaborations. Interested in full-stack applications, applied AI integration and practical SaaS products."
} as const;
