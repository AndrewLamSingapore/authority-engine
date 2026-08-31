import React,{useState} from 'react';
import {Link,useLocation} from 'react-router-dom';
import {Menu,X,ArrowUpRight} from 'lucide-react';
import SoundControl from './SoundControl';

export default function Navbar(){
 const [open,setOpen]=useState(false); const loc=useLocation();
 const links=[['Home','/'],['About','/about'],['Work','/insights'],['The Portal','/portal'],['JARVIS','/jarvis'],['VELYQUA','/velyqua'],['Game Platform','/game-platform'],['Contact','/contact']];
 return <nav className="fixed top-0 inset-x-0 z-50 bg-[#050807]/75 backdrop-blur-xl border-b border-white/[0.07]" aria-label="Main Navigation">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
   <Link to="/" className="group flex items-center gap-3"><div className="w-9 h-9 rounded-xl border border-emerald-300/20 bg-emerald-300/[0.07] flex items-center justify-center text-emerald-300 font-black">A</div><div><div className="text-sm font-extrabold tracking-[.13em] text-white">ANDREW LAM</div><div className="text-[9px] tracking-[.19em] uppercase text-slate-500">Authority Engine</div></div></Link>
   <div className="hidden md:flex items-center gap-5">{links.map(([n,p])=><Link key={p} to={p} className={`text-sm font-medium transition-colors ${(p==='/'?loc.pathname==='/':loc.pathname.startsWith(p))?'text-emerald-300':'text-slate-400 hover:text-white'}`}>{n}</Link>)}<a href="https://github.com/AndrewLamSingapore" target="_blank" rel="noreferrer" className="text-sm text-slate-400 hover:text-white inline-flex items-center gap-1">GitHub <ArrowUpRight className="w-3.5 h-3.5"/></a><a href="https://www.linkedin.com/in/lam-teck-sing-andrew-79886719" target="_blank" rel="noreferrer" className="premium-button px-5 py-2.5 rounded-full text-sm font-bold">LinkedIn</a></div>
   <div className="flex items-center gap-1 sm:gap-2">
    <SoundControl />
    <button className="md:hidden text-slate-300 p-2" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
   </div>
  </div>
  {open&&<div className="md:hidden px-5 pb-6 bg-[#050807] border-t border-white/[0.06]">{links.map(([n,p])=><Link key={p} to={p} onClick={()=>setOpen(false)} className="block py-4 border-b border-white/[0.06] text-slate-300">{n}</Link>)}<a href="https://github.com/AndrewLamSingapore" target="_blank" rel="noreferrer" className="block py-4 text-slate-300">GitHub</a><a href="https://www.linkedin.com/in/lam-teck-sing-andrew-79886719" target="_blank" rel="noreferrer" className="block mt-2 text-center premium-button py-3 rounded-full font-bold">LinkedIn</a></div>}
 </nav>
}
