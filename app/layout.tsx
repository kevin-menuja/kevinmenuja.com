import type { Metadata } from "next";
import "@fontsource-variable/manrope/index.css";
import "@fontsource-variable/inter/index.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "./globals.css";
import {MotionSystem} from "./components/motion-system";
import {profile} from "./profile";
import {PortfolioAnalytics} from "./components/portfolio-analytics";
const production = process.env.VERCEL_ENV === "production";
const host = (production ? process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.VERCEL_URL) || "localhost:3000";
export const metadata: Metadata = {
 metadataBase: new URL(host === "localhost:3000" ? "http://" + host : "https://" + host),
 title: profile.name+" — "+profile.title,
 description: profile.title+" based in Sri Lanka. Explore business software projects, technical case studies, completed computing qualifications and applied AI specialization.",
 openGraph: { title: profile.name+" — "+profile.title, description: "Full-stack engineering, real-world business systems and applied AI learning.", type: "website", images: [{url:"/images/kevin.webp",alt:"Kevin Menuja portrait"}] },
 twitter: {card:"summary",title:profile.name+" — "+profile.title},
 robots: {index:production,follow:production},
 icons:{icon:"/icon.svg"}
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:"try{document.documentElement.dataset.theme=localStorage.getItem(\"km-theme\")==\"light\"?\"light\":\"dark\"}catch{}"}}/></head><body>{children}<MotionSystem/>{production&&process.env.NEXT_PUBLIC_ENABLE_ANALYTICS==="1"&&<PortfolioAnalytics/>}</body></html>;
}
