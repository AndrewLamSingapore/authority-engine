import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BrainCircuit, Check, FileSearch, Network, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

const CANONICAL_URL = '/data/jarvis-public-state.json';
const CONTACT_URL = '/contact?source=jarvis&intent=collaboration';
const scenarios = [
  { id: 'operations', label: 'An operating decision', question: 'The handover is unclear. What needs attention first?', context: 'A shift note mentions a late delivery. The plan still shows the original arrival time.', evidence: 'Compare the dated handover note with the latest carrier update. An old plan cannot confirm a new arrival time.', gap: 'The current arrival time and the person responsible for the next update are missing.', next: 'Confirm those two facts, then write a short handover with an owner and next checkpoint.', message: 'I explored the JARVIS handover example. I’d like to discuss an operating decision or handover challenge.' },
  { id: 'research', label: 'A research question', question: 'Two sources disagree. Which claim can you use?', context: 'A polished summary states a finding with certainty. The underlying source describes a limited experiment.', evidence: 'Follow the claim back to the original source. Compare its methods, date and stated limits.', gap: 'The result has not been shown to apply to your setting.', next: 'Keep the finding and its limits together. Identify what additional evidence would justify the decision.', message: 'I explored the JARVIS research example. I’d like to discuss evidence handling or a research collaboration.' },
  { id: 'build', label: 'A project idea', question: 'A useful idea. What would make it testable?', context: 'A team wants an AI assistant to reduce time spent preparing routine updates.', evidence: 'Map one real workflow, its inputs, who uses the output and how they judge whether it is useful.', gap: 'There is no measured baseline or agreed acceptance criterion yet.', next: 'Choose one bounded prototype. Measure the existing process and compare reviewed outputs before expanding.', message: 'I explored the JARVIS project example. I’d like to discuss a practical AI prototype or collaboration.' },
];
const principles = [
  [FileSearch, 'Evidence you can inspect', 'Follow a claim back to its source. Keep missing information visible.'],
  [BrainCircuit, 'Work shaped around the task', 'The intended architecture routes bounded work through deterministic, qualified local and cloud paths.'],
  [ShieldCheck, 'Actions with accountability', 'Keep permissions, task results and review evidence connected. Consequential actions retain specific controls.'],
];
const projects = [
  ['Authority Engine', 'Meet Andrew and inspect the operating evidence.', '/'],
  ['The Portal', 'Explore connections, sources and ideas.', '/portal'],
  ['VELYQUA', 'Explore evidence-led living-water software.', '/velyqua'],
  ['Living Worlds', 'Experience choices inside an interactive world.', '/game-platform'],
  ['Sky Tablet', 'Explore an ancient city beneath a living sky.', '/sky-tablet'],
];

export default function JarvisControl() {
  const [selected, setSelected] = useState('operations');
  const [showReasoning, setShowReasoning] = useState(false);
  const [systemSignal, setSystemSignal] = useState(null);
  const scenario = scenarios.find(item => item.id === selected);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/jarvis-status', { headers: { accept: 'application/json' }, signal: controller.signal })
      .then(response => response.ok ? response.json() : null)
      .then(value => { if (!controller.signal.aborted) setSystemSignal(value); })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  return <>
    <SEO title="JARVIS PRIME — See the reasoning. Find your next move." description="Explore Andrew Lam’s JARVIS PRIME: try an illustrative decision walkthrough, inspect the approach and discuss your own AI or operations use case." />
    <div className="jarvis-public overflow-hidden pb-20 sm:pb-0">
      <section className="jarvis-hero relative pt-28 sm:pt-36 pb-20">
        <div className="jarvis-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="jarvis-orb jarvis-orb-one" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid xl:grid-cols-[.9fr_1.1fr] gap-12 xl:gap-16 items-center">
          <div>
            <div className="eyebrow">JARVIS PRIME · By Andrew Lam</div>
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-.065em] leading-[.98] text-white">A clearer next move.<span className="block mt-3 text-gradient">With the reasoning in view.</span></h1>
            <p className="mt-7 max-w-xl text-lg sm:text-xl leading-relaxed text-slate-300">What would you ask an AI system you could actually inspect? I’m building JARVIS PRIME to connect questions, evidence and accountable work. Start with a familiar decision.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#try-jarvis" className="premium-button inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold">Try a decision walkthrough <ArrowRight className="w-4 h-4" /></a>
              <Link to={CONTACT_URL} className="ghost-button inline-flex items-center justify-center px-6 py-3.5 rounded-full font-bold">Discuss your use case</Link>
            </div>
            <p className="mt-5 text-sm text-slate-400">No account needed · Interactive examples · No private data</p>
            <Link to="/jarvis/agents" className="mt-7 inline-flex items-center gap-2 text-sm text-emerald-300 font-semibold"><Network className="w-4 h-4" /> Explore the 21-role agent registry <ArrowUpRight className="w-4 h-4" /></Link>
          </div>
          <section id="try-jarvis" aria-label="Try a JARVIS decision walkthrough" className="scroll-mt-28 rounded-[2rem] border border-emerald-300/25 bg-[#081613]/95 p-5 sm:p-8 shadow-[0_35px_110px_#0008]">
            <div className="flex justify-between gap-3 items-center"><span className="text-xs font-bold tracking-[.15em] text-emerald-300">QUESTION → EVIDENCE → NEXT STEP</span><BrainCircuit className="w-7 h-7 shrink-0 text-emerald-300" /></div>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">Illustrative walkthrough · Curated examples, not live AI output.</p>
            <div className="flex flex-wrap gap-2 mt-6" role="group" aria-label="Choose a decision example">
              {scenarios.map(item => <button type="button" key={item.id} aria-pressed={selected === item.id} onClick={() => { setSelected(item.id); setShowReasoning(false); }} className={`rounded-full border px-3 py-2.5 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 ${selected === item.id ? 'bg-emerald-200 text-[#07110f] border-emerald-200' : 'border-white/15 text-slate-300 hover:border-emerald-300/60'}`}>{item.label}</button>)}
            </div>
            <div className="mt-7" aria-live="polite" aria-atomic="true">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{scenario.question}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{scenario.context}</p>
            </div>
            <button type="button" aria-expanded={showReasoning} aria-controls="decision-reasoning" onClick={() => setShowReasoning(!showReasoning)} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-300 py-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">{showReasoning ? 'Hide the reasoning' : 'See how to approach it'} <ArrowRight className={`w-4 h-4 transition-transform ${showReasoning ? 'rotate-90' : ''}`} /></button>
            <div id="decision-reasoning" hidden={!showReasoning} className="mt-3 space-y-4 border-t border-white/10 pt-5">
              {[["01 · Check the evidence", scenario.evidence], ["02 · Name what is missing", scenario.gap], ["03 · Define a next step", scenario.next]].map(([label, text]) => <div key={label}><h3 className="text-xs uppercase tracking-wide font-bold text-emerald-200">{label}</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">{text}</p></div>)}
              <Link to={CONTACT_URL} state={{ inquiryType: 'JARVIS / Governed AI Conversation', message: scenario.message }} className="inline-flex gap-2 items-center rounded-xl bg-emerald-200 px-4 py-3 text-sm font-bold text-[#07110f]">Explore a challenge like this with Andrew <ArrowUpRight className="w-4 h-4" /></Link>
            </div>
          </section>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-2xl"><div className="eyebrow">The approach</div><h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-[-.04em] text-white">From a good question to work you can inspect.</h2><p className="mt-5 text-lg leading-relaxed text-slate-400">My operations background shapes the questions: what changed, what can we trust, who owns the next step, and how will we know it helped?</p></div>
        <div className="mt-10 grid md:grid-cols-3 gap-4">{principles.map(([Icon, title, text]) => <article key={title} className="system-card rounded-3xl p-7"><Icon className="w-7 h-7 text-emerald-300" /><h3 className="mt-8 text-xl font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-400">{text}</p></article>)}</div>
      </section>

      <section className="border-y border-white/10 bg-white/[.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-12">
          <div><div className="eyebrow">One connected body of work</div><h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-[-.04em] text-white">Different worlds.<br />A shared curiosity.</h2><p className="mt-5 text-lg leading-relaxed text-slate-400">Each project explores a different question. JARVIS PRIME is the intended coordination layer; each app keeps its own product purpose and data. Explore a project, then bring me the connection you see.</p><Link to={CONTACT_URL} className="mt-7 inline-flex items-center gap-2 font-bold text-emerald-300">What could we build together? <ArrowRight className="w-4 h-4" /></Link></div>
          <nav aria-label="Explore Andrew’s connected work" className="divide-y divide-white/10">{projects.map(([name, text, to]) => <Link key={name} to={to} className="group flex justify-between gap-5 py-5 first:pt-0"><div><h3 className="font-bold text-xl text-white group-hover:text-emerald-200">{name}</h3><p className="mt-1 text-sm text-slate-400">{text}</p></div><ArrowUpRight className="w-5 h-5 shrink-0 text-emerald-300" /></Link>)}</nav>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="rounded-3xl border border-white/10 p-6 sm:p-9">
          <div className="eyebrow">Inspect the evidence</div><h2 className="mt-4 text-3xl font-bold tracking-tight text-white">Ambition, source and runtime are different things.</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-400">The published architecture names ABEX as PRIME’s intended host, with Dell, mobile PWA and voice as clients. The canonical record does not yet verify the current ABEX deployment. The 21 registered roles describe the design, not 21 confirmed concurrent workers.</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm"><span className="rounded-full border border-emerald-300/20 px-4 py-2 text-emerald-200">Public walkthrough available</span><span className="rounded-full border border-amber-300/20 px-4 py-2 text-amber-200">PRIME runtime: unverified</span></div>
          <p className="mt-5 text-xs leading-relaxed text-slate-500">No live JARVIS data. This page reads no private memory and provides no public execution or physical control. Live public-service availability: Authority {systemSignal?.self?.state || 'unavailable'} · Portal {systemSignal?.portal?.state || 'unavailable'}. These signals do not establish PRIME runtime acceptance.</p>
          <a href={CANONICAL_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-300">Read the source record used here <ArrowUpRight className="w-4 h-4" /></a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-[2rem] border border-emerald-300/20 bg-gradient-to-br from-emerald-400/10 to-transparent p-7 sm:p-12 text-center">
          <div className="eyebrow">Start with your question</div><h2 className="mt-5 text-4xl sm:text-5xl font-black tracking-[-.04em] text-white">What would you like to make clearer?</h2><p className="mt-5 max-w-2xl mx-auto text-lg leading-relaxed text-slate-300">An operating challenge, a role, a research question or something you want to build. Tell me where you are starting. We can explore the next step together.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3"><Link to={CONTACT_URL} className="premium-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold">Talk with Andrew <ArrowRight className="w-4 h-4" /></Link><a href="https://www.linkedin.com/in/lam-teck-sing-andrew-79886719" target="_blank" rel="noopener noreferrer" className="ghost-button inline-flex items-center px-6 py-3.5 rounded-full font-bold">Connect on LinkedIn</a></div>
        </div>
      </section>
      <aside aria-label="Discuss JARVIS with Andrew" className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-emerald-300/20 bg-[#07110f]/95 backdrop-blur-xl px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] flex items-center justify-between gap-3"><span className="text-xs text-slate-300">A question worth exploring?</span><Link to={CONTACT_URL} className="rounded-full bg-emerald-200 text-[#07110f] text-sm font-bold px-4 py-3">Talk with Andrew ↗</Link></aside>
    </div>
  </>;
}
