import type {MetadataRoute} from "next";
export default function robots():MetadataRoute.Robots {
 const production=process.env.VERCEL_ENV==="production";
 const host=process.env.VERCEL_PROJECT_PRODUCTION_URL;
 return {rules:{userAgent:"*",allow:production?"/":undefined,disallow:production?undefined:"/"},...(production&&host?{sitemap:"https://"+host+"/sitemap.xml"}:{})};
}
