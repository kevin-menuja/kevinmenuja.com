import manifest from "../responsive-images.json";
import type {ImgHTMLAttributes} from "react";

type Props=Omit<ImgHTMLAttributes<HTMLImageElement>,"src"|"srcSet"> & {src:string;alt:string;width:number;height:number;sizes:string};
const variants:Record<string,{url:string;width:number}[]>=manifest;

/** Static responsive assets keep image delivery independent of a paid optimizer. */
export function ResponsiveImage({src,alt,width,height,sizes,loading="lazy",...props}:Props){
  const srcSet=variants[src]?.map(({url,width})=>url+" "+width+"w").join(", ");
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} src={src} srcSet={srcSet} sizes={sizes} alt={alt} width={width} height={height} loading={loading} decoding={loading==="eager"?"sync":"async"}/>;
}
