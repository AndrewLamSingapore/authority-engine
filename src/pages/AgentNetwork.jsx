import React, { useEffect, useMemo, useState } from 'react';
import SEO from '../components/SEO';

export default function AgentNetwork(){
  const [registry,setRegistry]=useState(null); const [selected,setSelected]=useState(null); const [division,setDivision]=useState('All'); const [error,setError]=useState('');
  useEffect(()=>{fetch('/data/jarvis-agent-registry.json').then(r=>{if(!r.ok) throw new Error('Registry unavailable');return r.json()}).then(d=>{setRegistry(d);setSelected(d.orchestrator)}).catch(e=>setError(e.message))},[]);
  const divisions=useMemo(()=>registry?['All',...new Set(registry.agents.map(a=>a.division))]:['All'],[registry]);
  const visible=useMemo(()=>!registry?[]:registry.agents.filter(a=>division==='All'||a.division===division),[registry,division]);
  const leads=visible.filter(a=>a.role==='Lead');
  if(error) return <div className="min-h-[70vh] px-6 py-24 max-w-6xl mx-auto"><h1 className="text-4xl font-black">Agent registry unavailable</h1><p className="text-slate-400 mt-4">{error}</p></div>;
  if(!registry) return <div className="min-h-[70vh] flex items-center justify-center text-slate-500 uppercase tracking-[.25em] text-xs">Loading canonical registry…</div>;
  const details=selected||registry.orchestrator;
  return <>
    <SEO title="JARVIS Agent Network — 29 Registered Agents" description="Inspect the public-safe hierarchy of JARVIS PRIME's 29 registered specialist roles."/>
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="eyebrow">J CONSOLE / AGENT NETWORK</div>
      <div className="mt-5 grid lg:grid-cols-[1fr_auto] gap-8 items-end"><div><h1 className="text-4xl sm:text-6xl font-black tracking-tight">29 registered agents.<br/><span className="text-emerald-400">One governed hierarchy.</span></h1><p className="mt-5 text-slate-400 max-w-3xl text-lg">A public-safe projection of the JARVIS architecture. Registered roles are not a claim that 29 inference jobs run concurrently.</p></div><div className="border border-emerald-500/20 bg-emerald-500/5 rounded-2xl p-4 text-sm"><div className="text-slate-500 uppercase tracking-widest text-[10px]">Canonical registry</div><div className="font-bold mt-1">Schema v{registry.schema_version}</div><div className="text-slate-400 mt-1">Updated {new Date(registry.last_updated).toLocaleString()}</div></div></div>

      <div className="mt-10 flex gap-2 flex-wrap">{divisions.map(d=><button key={d} onClick={()=>setDivision(d)} className={`px-4 py-2 rounded-full border text-sm transition ${division===d?'border-emerald-400 bg-emerald-400/10 text-emerald-300':'border-white/10 text-slate-400 hover:border-white/30'}`}>{d}</button>)}</div>

      <button onClick={()=>setSelected(registry.orchestrator)} className="mt-10 w-full max-w-xl mx-auto block text-left border border-emerald-400/40 bg-emerald-400/[.06] rounded-3xl p-6 shadow-[0_0_50px_rgba(16,185,129,.08)]"><div className="text-[10px] tracking-[.25em] text-emerald-400 uppercase">Orchestrator</div><div className="text-2xl font-black mt-2">{registry.orchestrator.name}</div><div className="text-slate-400 mt-1">{registry.orchestrator.role}</div></button>
      <div className="h-10 w-px bg-gradient-to-b from-emerald-400/60 to-white/10 mx-auto"/>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">{leads.map(lead=>{const children=visible.filter(a=>a.reports_to===lead.id);return <div key={lead.id} className="border border-white/10 bg-white/[.025] rounded-3xl p-5"><button onClick={()=>setSelected(lead)} className="w-full text-left rounded-2xl border border-white/10 bg-black/20 p-4 hover:border-emerald-400/40 transition"><div className="flex justify-between gap-3"><span className="font-black">{lead.name}</span><span className="text-[10px] text-slate-500">{lead.id}</span></div><div className="text-xs text-emerald-400 mt-1">{lead.division} lead</div></button><div className="mt-3 grid gap-2">{children.map(a=><button key={a.id} onClick={()=>setSelected(a)} className="text-left rounded-xl border border-white/[.07] p-3 hover:bg-white/[.04] hover:border-white/20 transition"><div className="flex justify-between gap-3"><span className="text-sm font-semibold">{a.name}</span><span className="text-[10px] text-slate-600">{a.id}</span></div><div className="text-xs text-slate-500 mt-1">{a.role}</div></button>)}</div></div>})}</div>

      <div className="mt-10 grid lg:grid-cols-[1.2fr_.8fr] gap-6"><div className="border border-white/10 rounded-3xl p-6 bg-white/[.02]"><div className="text-[10px] tracking-[.2em] uppercase text-slate-500">Selected node</div><div className="flex items-start justify-between gap-4 mt-3"><div><h2 className="text-3xl font-black">{details.name}</h2><p className="text-emerald-400 mt-1">{details.role}</p></div>{details.id&&<span className="font-mono text-xs text-slate-500">{details.id}</span>}</div><p className="text-slate-300 mt-5 leading-relaxed">{details.public_description}</p>{details.division&&<div className="grid sm:grid-cols-3 gap-3 mt-6 text-sm"><Info label="Division" value={details.division}/><Info label="Authority" value={details.authority}/><Info label="State" value={details.status}/></div>}</div><div className="border border-white/10 rounded-3xl p-6"><div className="text-[10px] tracking-[.2em] uppercase text-slate-500">Disclosure boundary</div><h3 className="font-black text-xl mt-3">Public projection only</h3><p className="text-slate-400 mt-3 leading-relaxed">{registry.disclosure}</p><p className="text-slate-500 text-sm mt-4">Hierarchy describes registered responsibility. It does not expose prompts, credentials, private endpoints, filesystem paths or internal instructions.</p></div></div>
    </section>
  </>;
}
function Info({label,value}){return <div className="rounded-xl bg-black/20 border border-white/[.06] p-3"><div className="text-[10px] uppercase tracking-widest text-slate-600">{label}</div><div className="mt-1 capitalize">{value}</div></div>}
