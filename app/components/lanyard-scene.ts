import * as THREE from "three";
import {profile} from "../profile";

type SceneControls={flip:()=>void;reset:()=>void;dispose:()=>void};
type Options={onLost:()=>void;reduced:()=>boolean};

function cardTexture(back:boolean){
  const canvas=document.createElement("canvas");canvas.width=640;canvas.height=880;
  const g=canvas.getContext("2d")!;
  const gradient=g.createLinearGradient(0,0,640,880);gradient.addColorStop(0,"#34413a");gradient.addColorStop(.5,"#171a1f");gradient.addColorStop(1,"#0b0d10");
  g.fillStyle=gradient;g.fillRect(0,0,640,880);g.strokeStyle="#7fa36b";g.lineWidth=5;g.strokeRect(14,14,612,852);
  g.fillStyle="#cfe8b0";g.font="bold 60px Arial";g.fillText("KM.",40,84);
  g.fillStyle="#a7b0b8";g.font="24px Arial";g.fillText("ENGINEERING / PROFILE",40,128);
  if(back){
    const rows=[["LOCATION","Sri Lanka"],["QUALIFICATION","Higher Diploma"],["DISCIPLINE","Computing & Software"],["CURRENT FOCUS","Applied AI engineering"]];
    rows.forEach(([label,value],i)=>{g.fillStyle="#a7b0b8";g.font="24px Arial";g.fillText(label,42,218+i*138);g.fillStyle="#f5f7fa";g.font="bold 34px Arial";g.fillText(value,42,258+i*138);});
  }else{
    g.fillStyle="#000";g.fillRect(40,160,560,460);
    g.fillStyle="#f5f7fa";g.font="bold 46px Arial";g.fillText("Kevin Menuja",40,696);
    g.fillStyle="#cfe8b0";g.font="30px Arial";g.font="28px Arial";g.fillText(profile.titleLines.slice(0,2).join(" "),40,736);g.fillText(profile.titleLines[2],40,770);
    for(let i=0;i<46;i++){g.fillStyle=i%3?"#a7b0b8":"#cfe8b0";g.fillRect(43+i*12,789,2+i%4,38);}
  }
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  return {texture,canvas,g};
}

export function createLanyard(host:HTMLElement,options:Options):SceneControls{
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:"low-power"});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.65));renderer.setClearColor(0,0);
  const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(34,1,.1,40);camera.position.set(0,.1,9.2);camera.lookAt(0,0,0);
  scene.add(new THREE.HemisphereLight(0xe7f2dd,0x28302d,2.2));
  const key=new THREE.DirectionalLight(0xffffff,2.5);key.position.set(-3,5,6);scene.add(key);
  const rim=new THREE.DirectionalLight(0xcfe8b0,2);rim.position.set(3,0,-4);scene.add(rim);
  const front=cardTexture(false),back=cardTexture(true);
  const img=new Image();let disposed=false;
  img.onload=()=>{if(disposed)return;const ratio=Math.min(560/img.width,460/img.height),w=img.width*ratio,h=img.height*ratio;front.g.drawImage(img,40+(560-w)/2,160+(460-h)/2,w,h);front.texture.needsUpdate=true;wake();};
  img.src="/images/kevin.webp";
  const pivot=new THREE.Group();pivot.position.set(0,2.02,0);scene.add(pivot);
  const card=new THREE.Group();card.position.set(0,-2.04,0);pivot.add(card);
  const side=new THREE.MeshStandardMaterial({color:0x687b65,metalness:.45,roughness:.38});
  const frontMat=new THREE.MeshStandardMaterial({map:front.texture,roughness:.75,metalness:.05});
  const backMat=new THREE.MeshStandardMaterial({map:back.texture,roughness:.75,metalness:.05});
  const bodyGeo=new THREE.BoxGeometry(1.68,2.31,.085);card.add(new THREE.Mesh(bodyGeo,[side,side,side,side,frontMat,backMat]));
  const clipGeo=new THREE.TorusGeometry(.105,.034,12,24);const clip=new THREE.Mesh(clipGeo,side);clip.position.y=1.22;card.add(clip);
  const strapMat=new THREE.MeshStandardMaterial({color:0x657b5b,roughness:.93,side:THREE.DoubleSide});
  const strapGeo=new THREE.BoxGeometry(.13,.83,.035);const strap=new THREE.Mesh(strapGeo,strapMat);strap.position.y=-.42;pivot.add(strap);
  const pinGeo=new THREE.SphereGeometry(.075,12,12);const pin=new THREE.Mesh(pinGeo,side);pin.position.copy(pivot.position);scene.add(pin);
  const canvas=renderer.domElement;canvas.setAttribute("aria-hidden","true");canvas.style.touchAction="none";host.appendChild(canvas);
  let width=0,height=0,frame=0,last=0,visible=true,drag=false,angle=options.reduced()?0:.10,velocity=0,target=0,yaw=.14,yawVelocity=0,face=0;
  let startX=0,startY=0,startAngle=0,startYaw=0;
  const clamp=(x:number,a:number,b:number)=>Math.max(a,Math.min(b,x));
  function resize(){
    if(disposed)return;const r=host.getBoundingClientRect();if(r.width<2||r.height<2)return;
    width=r.width;height=r.height;renderer.setSize(width,height,false);camera.aspect=width/height;camera.position.z=Math.max(9.2,7.8/camera.aspect*.66);camera.updateProjectionMatrix();wake();
  }
  function draw(t:number){
    frame=0;if(disposed||!visible||document.hidden)return;
    const dt=last?Math.min((t-last)/1000,.032):1/60;last=t;
    if(!drag&&options.reduced()){angle=0;velocity=0;yaw=target;yawVelocity=0;}
    else if(!drag){
      // Damped pendulum restoring torque + angular damping, semi-implicit integration.
      velocity+=(-17*Math.sin(angle)-5.8*velocity)*dt;angle+=velocity*dt;
      yawVelocity+=((target-yaw)*23-8*yawVelocity)*dt;yaw+=yawVelocity*dt;
      if(Math.abs(angle)<.001&&Math.abs(velocity)<.002){angle=0;velocity=0;}
      if(Math.abs(target-yaw)<.001&&Math.abs(yawVelocity)<.002){yaw=target;yawVelocity=0;}
    }
    pivot.rotation.z=angle;card.rotation.y=yaw;card.rotation.x=drag?-.07:0;renderer.render(scene,camera);
    if(drag||Math.abs(angle)+Math.abs(velocity)+Math.abs(target-yaw)+Math.abs(yawVelocity)>.004)wake();else last=0;
  }
  function wake(){if(!frame&&!disposed&&visible&&!document.hidden)frame=requestAnimationFrame(draw);}
  function down(e:PointerEvent){if(e.button!==0)return;drag=true;startX=e.clientX;startY=e.clientY;startAngle=angle;startYaw=yaw;velocity=0;yawVelocity=0;canvas.setPointerCapture(e.pointerId);canvas.style.cursor="grabbing";wake();}
  function move(e:PointerEvent){if(!drag)return;const next=clamp(startAngle+(e.clientX-startX)/Math.max(width,1)*1.3,-.58,.58);velocity=clamp((next-angle)*24,-4,4);angle=next;yaw=clamp(startYaw+(e.clientY-startY)/Math.max(height,1),face*Math.PI-.6,face*Math.PI+.6);wake();}
  function up(){if(!drag)return;drag=false;canvas.style.cursor="grab";wake();}
  function lost(e:Event){e.preventDefault();options.onLost();}
  function visibility(){if(document.hidden){cancelAnimationFrame(frame);frame=0;last=0;up();}else wake();}
  canvas.style.cursor="grab";canvas.addEventListener("pointerdown",down);canvas.addEventListener("pointermove",move);canvas.addEventListener("pointerup",up);canvas.addEventListener("pointercancel",up);canvas.addEventListener("lostpointercapture",up);canvas.addEventListener("webglcontextlost",lost);
  const ro=new ResizeObserver(resize);ro.observe(host);
  const io=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false;if(visible)wake();else{cancelAnimationFrame(frame);frame=0;last=0;}},{rootMargin:"80px"});io.observe(host);
  document.addEventListener("visibilitychange",visibility);resize();
  return {
    flip(){face=1-face;target=face*Math.PI;if(options.reduced()){yaw=target;angle=0;}wake();},
    reset(){face=0;target=0;angle=0;velocity=0;yaw=0;yawVelocity=0;wake();},
    dispose(){
      disposed=true;img.onload=null;cancelAnimationFrame(frame);ro.disconnect();io.disconnect();document.removeEventListener("visibilitychange",visibility);
      canvas.removeEventListener("pointerdown",down);canvas.removeEventListener("pointermove",move);canvas.removeEventListener("pointerup",up);canvas.removeEventListener("pointercancel",up);canvas.removeEventListener("lostpointercapture",up);canvas.removeEventListener("webglcontextlost",lost);
      [bodyGeo,clipGeo,strapGeo,pinGeo].forEach(g=>g.dispose());[side,frontMat,backMat,strapMat].forEach(m=>m.dispose());front.texture.dispose();back.texture.dispose();renderer.dispose();canvas.remove();
    }
  };
}
