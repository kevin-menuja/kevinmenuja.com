import type {MetadataRoute} from "next";
import {projects} from "./projects";
import {articles} from "./insights-data";
export default function sitemap():MetadataRoute.Sitemap{
 if(process.env.VERCEL_ENV!=="production"||!process.env.VERCEL_PROJECT_PRODUCTION_URL)return [];
 const base="https://"+process.env.VERCEL_PROJECT_PRODUCTION_URL;
 return ["","/insights","/privacy",...projects.map(p=>"/projects/"+p.slug),...articles.map(a=>"/insights/"+a.slug)].map(path=>({url:base+path}));
}
