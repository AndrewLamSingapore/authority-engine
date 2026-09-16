import React from 'react';
import { ArrowLeft, ExternalLink, Orbit, Star, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';

const liveUrl='https://sky-tablet.vercel.app/';
const repoUrl='https://github.com/AndrewLamSingapore/sky-tablet';

export default function SkyTablet(){
 return <div className="min-h-screen bg-[#050807] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-6xl mx-auto">
   <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft className="w-4 h-4"/>Back to Authority Engine</Link>
   <div className="mt-10 grid lg:grid-cols-[1.05fr_.95fr] gap-10 items-start">
    <div>
     <div className="eyebrow">PUBLIC BUILD · E2 WORKING PROTOTYPE</div>
     <h1 className="mt-4 text-5xl sm:text-7xl font-black tracking-[-0.055em] leading-[.94]">The Sky Tablet</h1>
     <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">Enter an ancient city at dusk. Follow a cinematic journey through its gate, encounter a clay tablet and look up into the night sky. This is my exploration of how technology can make history and ideas tangible.</p>
     <div className="mt-8 flex flex-wrap gap-3">
      <a href={liveUrl} target="_blank" rel="noreferrer" className="premium-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">Open live experience <ExternalLink className="w-4 h-4"/></a>
      <a href={repoUrl} target="_blank" rel="noreferrer" className="ghost-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold"><ExternalLink className="w-4 h-4"/>Inspect source</a>
     </div>
    </div>
    <div className="rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-7 sm:p-9">
     <div className="text-[10px] font-bold tracking-[.18em] text-amber-300">WHAT IS INSPECTABLE</div>
     <div className="mt-7 space-y-6">
      <div className="flex gap-4"><Orbit className="w-6 h-6 shrink-0 text-emerald-300"/><div><h2 className="font-bold">A city you can explore</h2><p className="mt-1 text-sm text-slate-400">A guided camera journey and free exploration through an interpreted Mesopotamian setting.</p></div></div>
      <div className="flex gap-4"><Star className="w-6 h-6 shrink-0 text-emerald-300"/><div><h2 className="font-bold">The night sky</h2><p className="mt-1 text-sm text-slate-400">A naturalistic star field and an educational Three Paths reveal. The sky is artistic, not a dated astronomical reconstruction.</p></div></div>
      <div className="flex gap-4"><Languages className="w-6 h-6 shrink-0 text-emerald-300"/><div><h2 className="font-bold">A tablet encounter</h2><p className="mt-1 text-sm text-slate-400">A spatial introduction to cuneiform, with interpretation and historical evidence clearly distinguished.</p></div></div>
     </div>
    </div>
   </div>
   <section className="mt-12 rounded-[2rem] border border-amber-300/25 bg-amber-300/[0.04] p-7 sm:p-10">
    <div className="eyebrow">A conversation beyond the screen</div><h2 className="mt-3 text-3xl font-black">What would you like to bring to life?</h2><p className="mt-4 max-w-2xl text-slate-300 leading-relaxed">A research question, a learning experience or an idea for a useful tool. Tell me what caught your interest and what you have in mind.</p><Link to="/contact?source=sky-tablet&intent=collaboration" className="premium-button mt-6 inline-flex rounded-full px-6 py-3 font-semibold">Discuss an idea with Andrew ↗</Link>
   </section>
   <section className="mt-16 rounded-[2rem] border border-emerald-300/15 bg-emerald-300/[0.035] p-7 sm:p-10">
    <div className="text-[10px] font-bold tracking-[.18em] text-amber-300">EVIDENCE BOUNDARY</div>
    <h2 className="mt-3 text-2xl sm:text-3xl font-black">A working interface is not automatically a scholarly source.</h2>
    <p className="mt-4 max-w-4xl text-slate-400 leading-relaxed">The prototype is public and functional, so the software itself is E2 evidence. Historical mappings and astronomical simplifications remain educational until individually verified against credible editions and scholarship. The live experience keeps that limitation visible.</p>
   </section>
  </div>
 </div>
}
