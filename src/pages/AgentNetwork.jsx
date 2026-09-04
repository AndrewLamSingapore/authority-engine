import React, { useEffect, useMemo, useState } from 'react';
import SEO from '../components/SEO';

const MODES = ['Hierarchy','Network','Execution'];

export default function AgentNetwork(){
  const [registry,setRegistry]=useState(null); const [selected,setSelected]=useState(null); const [division,setDivision]=useState('All'); const [mode,setMode]=useState('Hierarchy'); const [trace,setTrace]=useState(null); const [error,setError]=useState('');
  useEffect(()=>{fetch('/data/jarvis-agent-registry.json').then(r=>{if(!r.ok) throw new Error('Registry unavailable');return r.json()}).then(d=>{setRegistry(d);setSelected(d.orchestrator)}).catch(e=>setError(e.message))},[]);
  useEffect(()=>{if(mode!=='Execution') return; let active=true; const load=()=>fetch('/api/jarvis-agent-trace',{cache:'no-store'}).then(r=>r.json()).then(d=>{if(active)setTrace(d)}).catch(()=>{if(active)setTrace({state:'source_unavailable',summary:{registered_agents:29,active_agents:0,executions_today:0,withheld_executions_today:0,denied_handoffs_today:0,average_latency_ms:null,active_window_seconds:300},events:[]})}); load(); const timer=setInterval(load,30000); return()=>{active=false;clearInterval(timer)}},[mode]);
  const divisions=useMemo(()=>registry?['All',...new Set(registry.agents.map(a=>a.division))]:['All'],[registry]);
  const visible=useMemo(()=>!registry?[]:registry.agents.filter(a=>division==='All'||a.division===division),[registry,division]);
  const leads=visible.filter(a=>a.role==='Lead');
  const relationships=useMemo(()=>{
    if(!registry) return [];
    if(Array.isArray(registry.relationships)) return registry.relationships;
    return registry.agents.map(a=>({source:a.reports_to,target:a.id,type:'reports_to'}));
  },[registry]);
  if(error) return <div className="min-h-[70vh] px-6 py-24 max-w-6xl mx-auto"><h1 className="text-4xl font-black">Agent registry unavailable</h1><p className="text-slate-400 mt-4">{error}</p></div>;
  if(!registry) return <div className="min-h-[70vh] flex items-center justify-center text-slate-500 uppercase tracking-[.25em] text-xs">Loading canonical registry…</div>;
  const details=selected||registry.orchestrator;
  return <><SEO title="JARVIS Agent Network — 29 Registered Agents" description="Inspect the public-safe JARVIS hierarchy, enforced relationship network and verified execution boundary."/>
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="eyebrow">J CONSOLE / AGENT NETWORK</div>
      <div className="mt-5 grid lg:grid-cols-[1fr_auto] gap-8 items-end"><div><h1 className="text-4xl sm:text-6xl font-black tracking-tight">29 registered agents.<br/><span className="text-emerald-400">One governed hierarchy.</span></h1><p className="mt-5 text-slate-400 max-w-3xl text-lg">The public view reports registered roles and governed relationships. It does not imply 29 simultaneous inference jobs.</p></div><div className="border border-emerald-500/20 bg-emerald-500/5 rounded-2xl p-4 text-sm"><div className="text-slate-500 uppercase tracking-widest text-[10px]">Canonical registry</div><div className="font-bold mt-1">Schema v{registry.schema_version}</div><div className="text-slate-400 mt-1">Updated {new Date(registry.last_updated).toLocaleString()}</div></div></div>
      <div className="mt-10 flex gap-2 flex-wrap">{MODES.map(m=><button key={m} onClick={()=>setMode(m)} className={`px-5 py-2.5 rounded-full border text-sm font-semibold transition ${mode===m?'border-emerald-400 bg-emerald-400/10 text-emerald-300':'border-white/10 text-slate-400 hover:border-white/30'}`}>{m}</button>)}</div>
      {mode==='Hierarchy'&&<Hierarchy registry={registry} divisions={divisions} division={division} setDivision={setDivision} visible={visible} leads={leads} setSelected={setSelected} details={details}/>} 
      {mode==='Network'&&<Network registry={registry} relationships={relationships} setSelected={setSelected}/>} 
      {mode==='Execution'&&<Execution trace={trace}/>} 
      <div className="mt-10 border border-white/10 rounded-3xl p-6"><div className="text-[10px] tracking-[.2em] uppercase text-slate-500">Disclosure boundary</div><h3 className="font-black text-xl mt-3">Public projection only</h3><p className="text-slate-400 mt-3 leading-relaxed">{registry.disclosure}</p><p className="text-slate-500 text-sm mt-4">No system prompts, model answers, evaluator rationale, claim text, evidence text, credentials, private endpoints, filesystem paths or internal instructions are rendered. Execution View refuses to substitute simulated activity when no verified public trace exists.</p></div>
    </section></>;
}

function Hierarchy({registry,divisions,division,setDivision,visible,leads,setSelected,details}){return <>
  <div className="mt-8 flex gap-2 flex-wrap">{divisions.map(d=><button key={d} onClick={()=>setDivision(d)} className={`px-4 py-2 rounded-full border text-sm transition ${division===d?'border-emerald-400 bg-emerald-400/10 text-emerald-300':'border-white/10 text-slate-400 hover:border-white/30'}`}>{d}</button>)}</div>
  <button onClick={()=>setSelected(registry.orchestrator)} className="mt-10 w-full max-w-xl mx-auto block text-left border border-emerald-400/40 bg-emerald-400/[.06] rounded-3xl p-6 shadow-[0_0_50px_rgba(16,185,129,.08)]"><div className="text-[10px] tracking-[.25em] text-emerald-400 uppercase">Orchestrator</div><div className="text-2xl font-black mt-2">{registry.orchestrator.name}</div><div className="text-slate-400 mt-1">{registry.orchestrator.role}</div></button><div className="h-10 w-px bg-gradient-to-b from-emerald-400/60 to-white/10 mx-auto"/>
  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">{leads.map(lead=>{const children=visible.filter(a=>a.reports_to===lead.id);return <div key={lead.id} className="border border-white/10 bg-white/[.025] rounded-3xl p-5"><button onClick={()=>setSelected(lead)} className="w-full text-left rounded-2xl border border-white/10 bg-black/20 p-4 hover:border-emerald-400/40 transition"><div className="flex justify-between gap-3"><span className="font-black">{lead.name}</span><span className="text-[10px] text-slate-500">{lead.id}</span></div><div className="text-xs text-emerald-400 mt-1">{lead.division} lead</div></button><div className="mt-3 grid gap-2">{children.map(a=><button key={a.id} onClick={()=>setSelected(a)} className="text-left rounded-xl border border-white/[.07] p-3 hover:bg-white/[.04] hover:border-white/20 transition"><div className="flex justify-between gap-3"><span className="text-sm font-semibold">{a.name}</span><span className="text-[10px] text-slate-600">{a.id}</span></div><div className="text-xs text-slate-500 mt-1">{a.role}</div></button>)}</div></div>})}</div>
  <div className="mt-10 border border-white/10 rounded-3xl p-6 bg-white/[.02]"><div className="text-[10px] tracking-[.2em] uppercase text-slate-500">Selected node</div><div className="flex items-start justify-between gap-4 mt-3"><div><h2 className="text-3xl font-black">{details.name}</h2><p className="text-emerald-400 mt-1">{details.role}</p></div>{details.id&&<span className="font-mono text-xs text-slate-500">{details.id}</span>}</div><p className="text-slate-300 mt-5 leading-relaxed">{details.public_description}</p>{details.division&&<div className="grid sm:grid-cols-3 gap-3 mt-6 text-sm"><Info label="Division" value={details.division}/><Info label="Authority" value={details.authority}/><Info label="State" value={details.status}/></div>}</div>
</>}

function Network({registry,relationships,setSelected}){const agents=[registry.orchestrator,...registry.agents]; const names=Object.fromEntries(agents.map(a=>[a.id,a.name])); const delegation=relationships.filter(e=>e.type==='may_delegate'); const consult=relationships.filter(e=>e.type==='may_consult'); return <div className="mt-10 grid lg:grid-cols-[.8fr_1.2fr] gap-6"><div className="border border-emerald-500/20 bg-emerald-500/[.04] rounded-3xl p-6"><div className="text-[10px] tracking-[.2em] uppercase text-emerald-400">Enforced relationship policy</div><h2 className="text-2xl font-black mt-3">Bounded hand-offs, not a free mesh.</h2><p className="text-slate-400 mt-3">PRIME delegates to registered leads; leads delegate only to direct children. Agents may consult their own lead; leads may consult peer leads. Consequential external action still requires owner approval.</p><div className="grid grid-cols-2 gap-3 mt-6"><Info label="Delegation edges" value={String(delegation.length)}/><Info label="Consult edges" value={String(consult.length)}/></div></div><div className="border border-white/10 rounded-3xl p-5 max-h-[620px] overflow-auto"><div className="grid gap-2">{relationships.filter(e=>e.type!=='reports_to').map((e,i)=><button key={`${e.type}-${e.source}-${e.target}-${i}`} onClick={()=>setSelected(registry.agents.find(a=>a.id===e.target)||registry.orchestrator)} className="text-left border border-white/[.07] rounded-xl p-3 hover:border-emerald-400/30 transition"><span className="text-[10px] uppercase tracking-widest text-slate-500">{e.type.replaceAll('_',' ')}</span><div className="mt-1 text-sm"><strong>{names[e.source]||e.source}</strong><span className="text-slate-600 mx-2">→</span>{names[e.target]||e.target}</div></button>)}</div></div></div>}

function Execution({trace}){
  if(!trace)return <div className="mt-10 border border-white/10 rounded-3xl p-8 text-slate-500">Checking sanitized execution boundary…</div>;
  const events=trace.events||[];
  const summary=trace.summary||{registered_agents:29,active_agents:0,executions_today:0,withheld_executions_today:0,denied_handoffs_today:0,average_latency_ms:null,active_window_seconds:300};
  const titles={verified_events:'Published runtime events',connected_idle:'Relay connected · runtime idle',stale:'Trace relay stale',disabled:'Public trace disabled',source_unavailable:'Trace source unavailable',no_public_trace:'No verified public runtime activity'};
  const healthy=trace.state==='verified_events'||trace.state==='connected_idle';
  const stale=trace.state==='stale';
  return <div className="mt-10 space-y-6">
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
      <Metric label="Registered" value={summary.registered_agents??29}/>
      <Metric label="Active" value={summary.active_agents??0}/>
      <Metric label="Executions today" value={summary.executions_today??0}/>
      <Metric label="Withheld" value={summary.withheld_executions_today??0}/>
      <Metric label="Denied hand-offs" value={summary.denied_handoffs_today??0}/>
      <Metric label="Avg latency" value={summary.average_latency_ms==null?'—':`${Math.round(summary.average_latency_ms)} ms`}/>
    </div>
    <div className="border border-white/10 rounded-3xl p-6"><div className="flex items-center justify-between gap-4"><div><div className="text-[10px] uppercase tracking-[.2em] text-slate-500">Verified execution trace</div><h2 className="text-2xl font-black mt-2">{titles[trace.state]||'Execution boundary status'}</h2>{trace.source_generated_at&&<div className="text-xs text-slate-500 mt-2">Last PRIME heartbeat {new Date(trace.source_generated_at).toLocaleString()}</div>}</div><span className={`text-xs px-3 py-1.5 rounded-full border ${healthy?'border-emerald-500/30 text-emerald-300':stale?'border-amber-500/30 text-amber-300':'border-white/10 text-slate-500'}`}>{trace.state}</span></div>
      <p className="text-slate-500 text-xs mt-3">Active means a sanitized started event within the last {Math.round((summary.active_window_seconds||300)/60)} minutes that has not yet reached a terminal state.</p>
      {events.length?<div className="mt-6 grid gap-3">{events.map((e,i)=><div key={`${e.trace_id}-${e.sequence??i}`} className="border border-white/[.07] rounded-xl p-4"><div className="flex justify-between gap-4 text-xs text-slate-500"><span>{e.trace_id}</span><span>{new Date(e.timestamp).toLocaleString()}</span></div><div className="mt-2 font-semibold">{e.agent_id} · {e.stage}</div><div className="text-sm text-slate-400 mt-1">{e.status}</div>{e.gate&&<ReleaseGate gate={e.gate}/>}</div>)}</div>:<p className="text-slate-400 mt-5 max-w-3xl">{trace.state==='connected_idle'?'PRIME is publishing a verified heartbeat, but no sanitized execution event is currently available.':trace.boundary||'JARVIS has not published sanitized runtime events. The interface intentionally shows zero activity rather than inventing it.'}</p>}
    </div>
  </div>
}

function ReleaseGate({gate}){
  const withheld=gate.decision==='withheld';
  const blocked=gate.blocking_metrics||[];
  return <div className={`mt-4 rounded-xl border p-4 ${withheld?'border-amber-500/20 bg-amber-500/[.04]':'border-emerald-500/20 bg-emerald-500/[.04]'}`}>
    <div className="flex flex-wrap items-center justify-between gap-3"><div><div className="text-[10px] uppercase tracking-[.2em] text-slate-500">Stable Spine release gate</div><div className={`font-black mt-1 ${withheld?'text-amber-300':'text-emerald-300'}`}>{withheld?'Withheld':'Released'} · {Math.round((gate.score||0)*100)}%</div></div><span className="text-[10px] uppercase tracking-widest text-slate-500">Evaluator v{gate.evaluation_version||'unknown'} · {gate.evaluator_valid?'valid':'invalid'}</span></div>
    {blocked.length>0&&<div className="mt-3"><div className="text-[10px] uppercase tracking-widest text-slate-600">Blocking checks</div><div className="mt-2 flex flex-wrap gap-2">{blocked.map(item=><span key={item} className="text-xs px-2.5 py-1 rounded-full border border-amber-500/20 text-amber-200">{prettyMetric(item)}</span>)}</div></div>}
    <div className="grid grid-cols-3 gap-2 mt-4 text-center"><GateCount label="Evidence gaps" value={gate.evidence_gap_count}/><GateCount label="Unsupported" value={gate.unsupported_claim_count}/><GateCount label="Contradictions" value={gate.contradiction_count}/></div>
    <p className="text-[11px] text-slate-600 mt-3">Only aggregate gate classifications are public. Evaluator rationale, evidence text, claims, prompts and model output remain private.</p>
  </div>
}

function prettyMetric(value){return String(value||'').replaceAll('_',' ').replace(/\b\w/g,c=>c.toUpperCase())}
function GateCount({label,value}){return <div className="rounded-lg border border-white/[.06] bg-black/10 px-2 py-2"><div className="text-lg font-black">{value??0}</div><div className="text-[9px] uppercase tracking-wider text-slate-600">{label}</div></div>}
function Metric({label,value}){return <div className="border border-white/10 bg-white/[.025] rounded-2xl p-4"><div className="text-[10px] uppercase tracking-widest text-slate-600">{label}</div><div className="text-2xl font-black mt-2">{value}</div></div>}
function Info({label,value}){return <div className="rounded-xl bg-black/20 border border-white/[.06] p-3"><div className="text-[10px] uppercase tracking-widest text-slate-600">{label}</div><div className="mt-1 capitalize">{value}</div></div>}
