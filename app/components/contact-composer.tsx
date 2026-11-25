"use client";
import {useState} from "react";
const address="kevinmenuja11@gmail.com";
const topics=["Remote engineering opportunity","Freelance project","Technical collaboration","Other"];
export function ContactComposer(){
 const [name,setName]=useState("");const [email,setEmail]=useState("");const [topic,setTopic]=useState(topics[0]);const [message,setMessage]=useState("");const [notice,setNotice]=useState("");
 const body=()=>["Hello Kevin,","",message.trim(),"","From: "+name.trim(),"Reply email: "+email.trim()].join("\r\n");
 function valid(form:HTMLFormElement){if(!form.reportValidity())return false;if(!name.trim()||message.trim().length<10){setNotice("Enter your name and a message containing at least 10 non-whitespace characters.");return false;}return true;}
 const mail=()=>"mailto:"+address+"?subject="+encodeURIComponent(topic)+"&body="+encodeURIComponent(body());
 return <form className="contact-composer" onSubmit={e=>{e.preventDefault();if(!valid(e.currentTarget))return;setNotice("Your email draft is ready. Send it from your email application; this website has not sent a message.");window.location.href=mail();}}>
 <h3>Prepare an inquiry</h3><p>Compose a message here and send it using your email application. No form submissions are stored by this site.</p>
 <div className="contact-fields"><label>Your name<input required autoComplete="name" maxLength={100} value={name} onChange={e=>{setName(e.target.value);setNotice("");}}/></label><label>Email address<input type="email" required autoComplete="email" maxLength={254} value={email} onChange={e=>{setEmail(e.target.value);setNotice("");}}/></label></div>
 <label>Inquiry type<select value={topic} onChange={e=>{setTopic(e.target.value);setNotice("");}}>{topics.map(t=><option key={t}>{t}</option>)}</select></label>
 <label>Message<textarea required minLength={10} maxLength={1200} rows={5} value={message} onChange={e=>{setMessage(e.target.value);setNotice("");}}/></label>
 <p className="contact-hint">{message.length}/1200 characters · Please do not include confidential data.</p>
 <div className="actions"><button type="submit" className="button primary">Open email draft <span aria-hidden="true">↗</span></button><button type="button" className="button secondary" onClick={async e=>{if(!e.currentTarget.form||!valid(e.currentTarget.form))return;try{await navigator.clipboard.writeText("To: "+address+"\nSubject: "+topic+"\n\n"+body());setNotice("Draft copied. Paste it into your email application and send.");}catch{setNotice("Clipboard unavailable. Select and copy your message manually or use Open email draft.");}}}>Copy draft</button></div>
 <p className="contact-hint" role="status">{notice}</p>
 </form>;
}
