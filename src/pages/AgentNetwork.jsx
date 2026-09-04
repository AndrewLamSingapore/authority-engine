import React, { useEffect, useMemo, useState } from 'react';
import SEO from '../components/SEO';

const MODES = ['Hierarchy', 'Network', 'Execution'];
const EMPTY_SUMMARY = {
  registered_agents: 29,
  active_agents: 0,
  executions_today: 0,
  withheld_executions_today: 0,
  denied_handoffs_today: 0,
  average_latency_ms: null,
  active_window_seconds: 300,
};

export default function AgentNetwork() {
  const [registry, setRegistry] = useState(null);
  const [selected, setSelected] = useState(null);
  const [division, setDivision] = useState('All');
  const [mode, setMode] = useState('Hierarchy');
  const [trace, setTrace] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/data/jarvis-agent-registry.json')
      .then((response) => {
        if (!response.ok) throw new Error('Registry unavailable');
        return response.json();
      })
      .then((data) => {
        setRegistry(data);
        setSelected(data.orchestrator);
      })
      .catch((reason) => setError(reason.message));
  }, []);

  useEffect(() => {
    if (mode !== 'Execution') return undefined;
    let active = true;
    const load = () => fetch('/api/jarvis-agent-trace', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => {
        if (active) setTrace(data);
      })
      .catch(() => {
        if (active) setTrace({ state: 'source_unavailable', summary: EMPTY_SUMMARY, events: [] });
      });
    load();
    const timer = setInterval(load, 30000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [mode]);

  const divisions = useMemo(
    () => (registry ? ['All', ...new Set(registry.agents.map((agent) => agent.division))] : ['All']),
    [registry],
  );
  const visible = useMemo(
    () => (!registry ? [] : registry.agents.filter((agent) => division === 'All' || agent.division === division)),
    [registry, division],
  );
  const relationships = useMemo(() => {
    if (!registry) return [];
    if (Array.isArray(registry.relationships)) return registry.relationships;
    return registry.agents.map((agent) => ({ source: agent.reports_to, target: agent.id, type: 'reports_to' }));
  }, [registry]);

  if (error) {
    return <Shell><h1 className="text-4xl font-black">Agent registry unavailable</h1><p className="text-slate-400 mt-4">{error}</p></Shell>;
  }
  if (!registry) {
    return <div className="min-h-[70vh] flex items-center justify-center text-slate-500 uppercase tracking-[.25em] text-xs">Loading canonical registry…</div>;
  }

  return <>
    <SEO title="JARVIS Agent Network — Governed Runtime Proof" description="Inspect the public-safe JARVIS hierarchy, relationship policy and runtime-derived governed execution proof." />
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="eyebrow">J CONSOLE / AGENT NETWORK</div>
      <div className="mt-5 grid lg:grid-cols-[1fr_auto] gap-8 items-end">
        <div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight">29 registered agents.<br /><span className="text-emerald-400">One governed hierarchy.</span></h1>
          <p className="mt-5 text-slate-400 max-w-3xl text-lg">Registered roles are not simultaneous inference jobs. Execution View publishes only sanitized evidence emitted by the governed runtime.</p>
        </div>
        <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-2xl p-4 text-sm">
          <div className="text-slate-500 uppercase tracking-widest text-[10px]">Canonical registry</div>
          <div className="font-bold mt-1">Schema v{registry.schema_version}</div>
          <div className="text-slate-400 mt-1">Updated {new Date(registry.last_updated).toLocaleString()}</div>
        </div>
      </div>
      <div className="mt-10 flex gap-2 flex-wrap">
        {MODES.map((item) => <button key={item} onClick={() => setMode(item)} className={`px-5 py-2.5 rounded-full border text-sm font-semibold transition ${mode === item ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300' : 'border-white/10 text-slate-400 hover:border-white/30'}`}>{item}</button>)}
      </div>
      {mode === 'Hierarchy' && <Hierarchy registry={registry} divisions={divisions} division={division} setDivision={setDivision} visible={visible} selected={selected} setSelected={setSelected} />}
      {mode === 'Network' && <Network registry={registry} relationships={relationships} setSelected={setSelected} />}
      {mode === 'Execution' && <Execution trace={trace} />}
      <div className="mt-10 border border-white/10 rounded-3xl p-6">
        <div className="text-[10px] tracking-[.2em] uppercase text-slate-500">Disclosure boundary</div>
        <h3 className="font-black text-xl mt-3">Public projection only</h3>
        <p className="text-slate-400 mt-3 leading-relaxed">{registry.disclosure}</p>
        <p className="text-slate-500 text-sm mt-4">No prompts, answers, evaluator rationale, claim text, evidence text, credentials, private endpoints, filesystem paths or internal instructions are rendered. Missing proof is shown as missing; synthetic runtime activity is never substituted.</p>
      </div>
    </section>
  </>;
}

function Shell({ children }) {
  return <div className="min-h-[70vh] px-6 py-24 max-w-6xl mx-auto">{children}</div>;
}

function Hierarchy({ registry, divisions, division, setDivision, visible, selected, setSelected }) {
  const leads = visible.filter((agent) => agent.role === 'Lead');
  const details = selected || registry.orchestrator;
  return <>
    <div className="mt-8 flex gap-2 flex-wrap">
      {divisions.map((item) => <button key={item} onClick={() => setDivision(item)} className={`px-4 py-2 rounded-full border text-sm transition ${division === item ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300' : 'border-white/10 text-slate-400 hover:border-white/30'}`}>{item}</button>)}
    </div>
    <button onClick={() => setSelected(registry.orchestrator)} className="mt-10 w-full max-w-xl mx-auto block text-left border border-emerald-400/40 bg-emerald-400/[.06] rounded-3xl p-6 shadow-[0_0_50px_rgba(16,185,129,.08)]">
      <div className="text-[10px] tracking-[.25em] text-emerald-400 uppercase">Orchestrator</div>
      <div className="text-2xl font-black mt-2">{registry.orchestrator.name}</div>
      <div className="text-slate-400 mt-1">{registry.orchestrator.role}</div>
    </button>
    <div className="h-10 w-px bg-gradient-to-b from-emerald-400/60 to-white/10 mx-auto" />
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      {leads.map((lead) => <div key={lead.id} className="border border-white/10 bg-white/[.025] rounded-3xl p-5">
        <Node agent={lead} onClick={() => setSelected(lead)} />
        <div className="mt-3 grid gap-2">
          {visible.filter((agent) => agent.reports_to === lead.id).map((agent) => <Node key={agent.id} agent={agent} onClick={() => setSelected(agent)} />)}
        </div>
      </div>)}
    </div>
    <div className="mt-10 border border-white/10 rounded-3xl p-6 bg-white/[.02]">
      <div className="text-[10px] tracking-[.2em] uppercase text-slate-500">Selected node</div>
      <div className="flex items-start justify-between gap-4 mt-3">
        <div><h2 className="text-3xl font-black">{details.name}</h2><p className="text-emerald-400 mt-1">{details.role}</p></div>
        {details.id && <span className="font-mono text-xs text-slate-500">{details.id}</span>}
      </div>
      <p className="text-slate-300 mt-5 leading-relaxed">{details.public_description}</p>
      {details.division && <div className="grid sm:grid-cols-3 gap-3 mt-6 text-sm"><Info label="Division" value={details.division} /><Info label="Authority" value={details.authority} /><Info label="State" value={details.status} /></div>}
    </div>
  </>;
}

function Node({ agent, onClick }) {
  return <button onClick={onClick} className="w-full text-left rounded-xl border border-white/[.07] p-3 hover:border-emerald-400/30 transition">
    <div className="flex justify-between gap-3"><span className="font-semibold">{agent.name}</span><span className="text-[10px] text-slate-600">{agent.id}</span></div>
    <div className="text-xs text-slate-500 mt-1">{agent.role}</div>
  </button>;
}

function Network({ registry, relationships, setSelected }) {
  const agents = [registry.orchestrator, ...registry.agents];
  const names = Object.fromEntries(agents.map((agent) => [agent.id, agent.name]));
  const delegation = relationships.filter((edge) => edge.type === 'may_delegate');
  const consult = relationships.filter((edge) => edge.type === 'may_consult');
  return <div className="mt-10 grid lg:grid-cols-[.8fr_1.2fr] gap-6">
    <div className="border border-emerald-500/20 bg-emerald-500/[.04] rounded-3xl p-6">
      <div className="text-[10px] tracking-[.2em] uppercase text-emerald-400">Enforced relationship policy</div>
      <h2 className="text-2xl font-black mt-3">Bounded hand-offs, not a free mesh.</h2>
      <p className="text-slate-400 mt-3">PRIME delegates to registered leads; leads delegate only to direct children. Agents may consult their own lead; leads may consult peer leads. Consequential external action still requires owner approval.</p>
      <div className="grid grid-cols-2 gap-3 mt-6"><Info label="Delegation edges" value={String(delegation.length)} /><Info label="Consult edges" value={String(consult.length)} /></div>
    </div>
    <div className="border border-white/10 rounded-3xl p-5 max-h-[620px] overflow-auto">
      <div className="grid gap-2">
        {relationships.filter((edge) => edge.type !== 'reports_to').map((edge, index) => <button key={`${edge.type}-${edge.source}-${edge.target}-${index}`} onClick={() => setSelected(registry.agents.find((agent) => agent.id === edge.target) || registry.orchestrator)} className="text-left border border-white/[.07] rounded-xl p-3 hover:border-emerald-400/30 transition">
          <span className="text-[10px] uppercase tracking-widest text-slate-500">{String(edge.type).replaceAll('_', ' ')}</span>
          <div className="mt-1 text-sm"><strong>{names[edge.source] || edge.source}</strong><span className="text-slate-600 mx-2">→</span>{names[edge.target] || edge.target}</div>
        </button>)}
      </div>
    </div>
  </div>;
}

function Execution({ trace }) {
  const [selectedId, setSelectedId] = useState(null);
  if (!trace) return <div className="mt-10 border border-white/10 rounded-3xl p-8 text-slate-500">Checking sanitized execution boundary…</div>;
  const events = trace.events || [];
  const summary = trace.summary || EMPTY_SUMMARY;
  const groups = groupTraces(events);
  const selected = groups.find((group) => group.trace_id === selectedId) || groups[0] || null;
  const healthy = ['verified_events', 'connected_idle'].includes(trace.state);
  return <div className="mt-10 space-y-6">
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
      <Metric label="Registered" value={summary.registered_agents ?? 29} />
      <Metric label="Active" value={summary.active_agents ?? 0} />
      <Metric label="Executions today" value={summary.executions_today ?? 0} />
      <Metric label="Withheld" value={summary.withheld_executions_today ?? 0} />
      <Metric label="Denied hand-offs" value={summary.denied_handoffs_today ?? 0} />
      <Metric label="Avg latency" value={summary.average_latency_ms == null ? '—' : `${Math.round(summary.average_latency_ms)} ms`} />
    </div>
    <div className="border border-white/10 rounded-3xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[.2em] text-slate-500">Runtime-derived public proof</div>
          <h2 className="text-2xl font-black mt-2">{trace.state === 'verified_events' ? 'Verified governed execution' : trace.state === 'connected_idle' ? 'Relay connected · runtime idle' : 'No current verified execution'}</h2>
          {trace.source_generated_at && <div className="text-xs text-slate-500 mt-2">PRIME heartbeat {new Date(trace.source_generated_at).toLocaleString()}</div>}
        </div>
        <span className={`text-xs px-3 py-1.5 rounded-full border ${healthy ? 'border-emerald-500/30 text-emerald-300' : 'border-white/10 text-slate-500'}`}>{trace.state}</span>
      </div>
      {groups.length ? <div className="mt-6 grid lg:grid-cols-[.38fr_.62fr] gap-5">
        <div className="space-y-2">
          {groups.map((group) => <button key={group.trace_id} onClick={() => setSelectedId(group.trace_id)} className={`w-full text-left rounded-xl border p-3 ${selected?.trace_id === group.trace_id ? 'border-emerald-400/40 bg-emerald-400/[.05]' : 'border-white/[.07]'}`}>
            <div className="font-mono text-xs truncate">{group.trace_id}</div>
            <div className="text-xs text-slate-500 mt-1">{group.events.length} sanitized event{group.events.length === 1 ? '' : 's'} · {group.decision || 'in progress'}</div>
          </button>)}
        </div>
        {selected && <TraceProof group={selected} />}
      </div> : <p className="text-slate-400 mt-5">{trace.boundary || 'No sanitized runtime events are available. Zero activity is shown rather than invented.'}</p>}
    </div>
  </div>;
}

function groupTraces(events) {
  const grouped = new Map();
  for (const event of events) {
    if (!grouped.has(event.trace_id)) grouped.set(event.trace_id, []);
    grouped.get(event.trace_id).push(event);
  }
  return [...grouped.entries()].map(([traceId, list]) => {
    const sorted = [...list].sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0));
    const gate = [...sorted].reverse().find((event) => event.gate)?.gate || null;
    const proof = [...sorted].reverse().find((event) => event.proof)?.proof || null;
    return { trace_id: traceId, events: sorted, gate, proof, decision: gate?.decision || null };
  }).reverse();
}

function TraceProof({ group }) {
  const path = [...new Set(group.events.map((event) => event.agent_id))];
  return <div className="rounded-2xl border border-emerald-500/20 bg-black/20 p-5">
    <div className="text-[10px] uppercase tracking-[.2em] text-emerald-400">Verified governed execution</div>
    <div className="font-mono text-sm mt-2 break-all">{group.trace_id}</div>
    <div className="mt-5">
      <div className="text-[10px] uppercase tracking-widest text-slate-600">Observed governed path</div>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {path.map((id, index) => <React.Fragment key={id}><span className="px-3 py-1.5 rounded-full border border-emerald-500/25 text-emerald-300 text-xs">{id}</span>{index < path.length - 1 && <span className="text-slate-600">→</span>}</React.Fragment>)}
        {group.gate && <><span className="text-slate-600">→</span><span className="px-3 py-1.5 rounded-full border border-amber-500/25 text-amber-300 text-xs">Stable Spine</span><span className="text-slate-600">→</span><span className="px-3 py-1.5 rounded-full border border-white/10 text-slate-300 text-xs">Authority Engine</span></>}
      </div>
    </div>
    {group.proof && <div className="grid sm:grid-cols-3 gap-2 mt-5">
      <Info label="PRIME commit" value={group.proof.prime_commit ? group.proof.prime_commit.slice(0, 12) : '—'} />
      <Info label="Trace schema" value={group.proof.schema_version || '—'} />
      <Info label="External action" value={group.proof.external_action === false ? 'False · none executed' : group.proof.external_action === true ? 'True' : '—'} />
    </div>}
    <div className="mt-5 space-y-2">
      {group.events.map((event, index) => <div key={`${event.sequence ?? index}-${event.stage}`} className="rounded-xl border border-white/[.06] p-3">
        <div className="flex justify-between gap-3 text-xs"><span><strong>{event.agent_id}</strong> · {event.stage}</span><span className="text-slate-500">{event.status}</span></div>
        <div className="text-[10px] text-slate-600 mt-1">{new Date(event.timestamp).toLocaleString()}</div>
        {event.gate && <ReleaseGate gate={event.gate} />}
      </div>)}
    </div>
    <p className="text-[11px] text-slate-600 mt-4">This card is assembled only from sanitized runtime events returned by the public trace boundary. Absence of a field is rendered as absence, never inferred.</p>
  </div>;
}

function ReleaseGate({ gate }) {
  const withheld = gate.decision === 'withheld';
  const blocked = gate.blocking_metrics || [];
  return <div className={`mt-4 rounded-xl border p-4 ${withheld ? 'border-amber-500/20 bg-amber-500/[.04]' : 'border-emerald-500/20 bg-emerald-500/[.04]'}`}>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><div className="text-[10px] uppercase tracking-[.2em] text-slate-500">Stable Spine release gate</div><div className={`font-black mt-1 ${withheld ? 'text-amber-300' : 'text-emerald-300'}`}>{withheld ? 'Withheld' : 'Released'} · {Math.round((gate.score || 0) * 100)}%</div></div>
      <span className="text-[10px] uppercase tracking-widest text-slate-500">Evaluator v{gate.evaluation_version || 'unknown'} · {gate.evaluator_valid ? 'valid' : 'invalid'}</span>
    </div>
    {blocked.length > 0 && <div className="mt-3"><div className="text-[10px] uppercase tracking-widest text-slate-600">Blocking checks</div><div className="mt-2 flex flex-wrap gap-2">{blocked.map((item) => <span key={item} className="text-xs px-2.5 py-1 rounded-full border border-amber-500/20 text-amber-200">{prettyMetric(item)}</span>)}</div></div>}
    <div className="grid grid-cols-3 gap-2 mt-4 text-center"><GateCount label="Evidence gaps" value={gate.evidence_gap_count} /><GateCount label="Unsupported" value={gate.unsupported_claim_count} /><GateCount label="Contradictions" value={gate.contradiction_count} /></div>
    <p className="text-[11px] text-slate-600 mt-3">Only aggregate gate classifications are public. Evaluator rationale, evidence text, claims, prompts and model output remain private.</p>
  </div>;
}

function prettyMetric(value) { return String(value || '').replaceAll('_', ' ').replace(/\b\w/g, (character) => character.toUpperCase()); }
function GateCount({ label, value }) { return <div className="rounded-lg border border-white/[.06] bg-black/10 px-2 py-2"><div className="text-lg font-black">{value ?? 0}</div><div className="text-[9px] uppercase tracking-wider text-slate-600">{label}</div></div>; }
function Metric({ label, value }) { return <div className="border border-white/10 bg-white/[.025] rounded-2xl p-4"><div className="text-[10px] uppercase tracking-widest text-slate-600">{label}</div><div className="text-2xl font-black mt-2">{value}</div></div>; }
function Info({ label, value }) { return <div className="rounded-xl bg-black/20 border border-white/[.06] p-3"><div className="text-[10px] uppercase tracking-widest text-slate-600">{label}</div><div className="mt-1 capitalize">{value}</div></div>; }
