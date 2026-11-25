import type { Metadata } from "next";
import "./globals.css";
const production = process.env.VERCEL_ENV === "production";
const host = (production ? process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.VERCEL_URL) || "localhost:3000";
export const metadata: Metadata = {
 metadataBase: new URL(host === "localhost:3000" ? "http://" + host : "https://" + host),
 title: "Kevin Menuja — Full-stack developer & technology entrepreneur",
 description: "Explore Kevin Menuja's full-stack software engineering projects, technical case studies, completed computing qualifications and applied AI learning focus.",
 openGraph: { title: "Kevin Menuja — Software for real-world operations", description: "Full-stack engineering, real-world business systems and applied AI learning.", type: "website", images: [{url:"/images/kevin.webp",alt:"Kevin Menuja portrait"}] },
 twitter: {card:"summary",title:"Kevin Menuja — Full-stack developer"},
 robots: {index:production,follow:production},
 icons:{icon:"/icon.svg"}
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="en"><body>{children}</body></html>;
}
