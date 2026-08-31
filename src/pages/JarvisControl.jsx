import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  CircleOff,
  Database,
  FileSearch,
  Fingerprint,
  GitPullRequestArrow,
  HardDrive,
  LockKeyhole,
  MessageSquareText,
  Network,
  Radar,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import SEO from '../components/SEO';

const JARVIS_LOCAL_URL = 'http://127.0.0.1:8000/control';
const JARVIS_PUBLIC_URL = 'https://lam-public-jarvis.five12345.chatgpt.site';
const RELATIONSHIP_CONSOLE_URL = 'https://lam-relationship-console.five12345.chatgpt.site';
const LINKEDIN_URL = 'https://www.linkedin.com/in/lam-teck-sing-andrew-79886719';

const publicViews = [
  {
    id: 'conversation',
    label: 'Conversation',
    Icon: MessageSquareText,
    signal: 'Intent framed',
    title: 'Start with the decision, not the model.',
    text: 'JARVIS separates the question, operating context and requested outcome before any answer is treated as a proposal.',
    evidence: ['Question clarified', 'Memory writes off', 'No action implied'],
  },
  {
    id: 'evidence',
    label: 'Evidence',
    Icon: FileSearch,
    signal: 'Sources visible',
    title: 'Claims earn their confidence.',
    text: 'Evidence, provenance and uncertainty stay visible so a polished answer cannot quietly become an unsupported fact.',
    evidence: ['Source path shown', 'Confidence bounded', 'Gaps retained'],
  },
  {
    id: 'memory',
    label: 'Memory',
    Icon: Database,
    signal: 'Boundaries explicit',
    title: 'Memory is separated by purpose.',
    text: 'Session, episodic, durable and evidence layers remain distinct. The public walkthrough reads no private memory.',
    evidence: ['Layer identified', 'Retention visible', 'Protected reads only'],
  },
  {
    id: 'system',
    label: 'System',
    Icon: Activity,
    signal: 'Route inspectable',
    title: 'The reasoning route stays legible.',
    text: 'Local-first reasoning, confidence gates and frontier escalation are treated as governed routes—not invisible magic.',
    evidence: ['Local-first default', 'Escalation bounded', 'Integrity observed'],
  },
  {
    id: 'actions',
    label: 'Actions',
    Icon: GitPullRequestArrow,
    signal: 'Proposal only',
    title: 'A proposal is not permission.',
    text: 'Risk, reversibility and expected effect can be inspected while approval, execution and automation remain unavailable.',
    evidence: ['Risk stated', 'Authority withheld', 'No actuation'],
  },
  {
    id: 'audit',
    label: 'Audit',
    Icon: ScanSearch,
    signal: 'Trace preserved',
    title: 'Every decision should leave a trail.',
    text: 'The audit view connects the request, evidence, reasoning route, policy and result so decisions can be challenged later.',
    evidence: ['Request linked', 'Route recorded', 'Review possible'],
  },
];

const states = [
  {
    Icon: HardDrive,
    label: 'Availability',
    value: 'Available locally',
    detail: 'Verified on the Dell host. Open it from that device while PRIME is running.',
    tone: 'emerald',
  },
  {
    Icon: CircleOff,
    label: 'Off-host state',
    value: 'Unavailable',
    detail: 'Expected from phones and other computers. The private interface is not internet-exposed.',
    tone: 'slate',
  },
  {
    Icon: LockKeyhole,
    label: 'Operating mode',
    value: 'Read-only',
    detail: 'The surface presents state and proposals. Memory writes and approval mutations are disabled.',
    tone: 'emerald',
  },
  {
    Icon: ShieldCheck,
    label: 'Safety boundary',
    value: 'No actuation',
    detail: 'No automation, orchestration, physical control or VELYQUA action is available here.',
    tone: 'amber',
  },
];

const trustPrinciples = [
  {
    Icon: FileSearch,
    number: '01',
    title: 'Evidence before confidence',
    text: 'The interface keeps sources, uncertainty and evidence gaps close to every consequential claim.',
  },
  {
    Icon: Fingerprint,
    number: '02',
    title: 'Authority stays human',
    text: 'JARVIS can frame and propose. It does not quietly convert a recommendation into permission.',
  },
  {
    Icon: ScanSearch,
    number: '03',
    title: 'Review after the moment',
    text: 'Reasoning routes and decisions remain inspectable when the outcome needs to be explained or challenged.',
  },
];

const conversationPaths = [
  {
    Icon: Radar,
    label: 'Operations leaders',
    title: 'Apply governed AI to a real operating decision.',
    text: 'Explore where evidence-grounded reasoning could improve visibility without creating hidden authority.',
    message: 'I would like to discuss how governed AI could support a real operations or supply-chain decision.',
  },
  {
    Icon: BrainCircuit,
    label: 'Hiring & collaboration',
    title: 'Discuss the thinking behind the system.',
    text: 'Start a focused conversation about operations intelligence, applied AI and decision-system design.',
    message: 'I would like to discuss JARVIS, your operations-intelligence work and a possible role or collaboration.',
  },
  {
    Icon: Sparkles,
    label: 'Builders & researchers',
    title: 'Exchange approaches to trustworthy AI.',
    text: 'Compare local-first reasoning, memory boundaries, confidence gates and auditability without the hype.',
    message: 'I would like to exchange ideas about local-first reasoning, evidence handling and auditable AI systems.',
  },
];

export default function JarvisControl() {
  const [activeView, setActiveView] = useState(publicViews[0].id);
  const view = publicViews.find((item) => item.id === activeView) || publicViews[0];
  const ActiveIcon = view.Icon;

  return <>
    <SEO
      title="JARVIS — Governed AI Decision System"
      description="Explore Andrew Lam's public-safe JARVIS walkthrough: evidence-grounded reasoning, explicit memory boundaries, human authority and an inspectable audit trail."
    />

    <div className="jarvis-public overflow-hidden">
      <section className="jarvis-hero relative min-h-[calc(100svh-5rem)] pt-28 pb-16 flex items-center">
        <div className="jarvis-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="jarvis-orb jarvis-orb-one" aria-hidden="true" />
        <div className="jarvis-orb jarvis-orb-two" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid xl:grid-cols-[.88fr_1.12fr] gap-12 xl:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-emerald-300/20 bg-emerald-300/[.055] px-4 py-2 text-[10px] font-black uppercase tracking-[.17em] text-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,.9)]" />
                Public-safe view · E2 working prototype
              </div>
              <h1 className="mt-7 text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.065em] leading-[.92] text-white">
                AI should not only look powerful.
                <span className="block mt-3 text-gradient">It should look accountable.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-300">
                JARVIS is a private, local-first control surface for governed reasoning. This public walkthrough shows how it separates evidence, memory, proposals and authority—without exposing the system behind it.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  state={{ inquiryType: 'JARVIS / Governed AI Conversation', message: 'I would like to discuss JARVIS and how governed AI could support a real decision or opportunity.' }}
                  className="premium-button signal-cta inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold"
                >
                  Discuss a real use case <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#public-walkthrough" className="ghost-button inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold">
                  See how it thinks <ArrowDown className="w-4 h-4" />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-[.12em] text-slate-500">
                {['Local-first', 'Read-only', 'No actuation'].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-300" /> {item}</span>)}
              </div>
            </div>

            <div id="public-walkthrough" className="jarvis-console relative rounded-[2rem] border border-white/10 bg-[#07100f]/90 p-3 sm:p-4 shadow-[0_40px_120px_rgba(0,0,0,.58)]" data-tilt>
              <div className="signal-border-trace" aria-hidden="true" />
              <div className="rounded-[1.55rem] border border-white/[.08] bg-[#07100f] overflow-hidden">
                <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/[.07] bg-white/[.018]">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-300/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[.16em] text-slate-500">Public-safe · redacted · no live JARVIS data</div>
                </div>

                <div className="grid lg:grid-cols-[150px_1fr] min-h-[470px]">
                  <div className="border-b lg:border-b-0 lg:border-r border-white/[.07] p-3">
                    <div className="flex lg:grid gap-1 overflow-x-auto" role="tablist" aria-label="Public JARVIS views">
                      {publicViews.map(({ id, label, Icon }) => {
                        const selected = id === activeView;
                        return <button
                          key={id}
                          type="button"
                          role="tab"
                          id={`jarvis-tab-${id}`}
                          aria-selected={selected}
                          aria-controls="jarvis-public-panel"
                          onClick={() => setActiveView(id)}
                          className={`jarvis-view-tab shrink-0 lg:w-full flex items-center gap-2.5 rounded-xl px-3 py-3 text-left text-xs font-bold ${selected ? 'is-active' : ''}`}
                        >
                          <Icon className="w-4 h-4" /> {label}
                        </button>;
                      })}
                    </div>
                  </div>

                  <div
                    key={view.id}
                    id="jarvis-public-panel"
                    role="tabpanel"
                    aria-labelledby={`jarvis-tab-${view.id}`}
                    className="jarvis-view-panel p-6 sm:p-8 flex flex-col"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div className="h-12 w-12 rounded-2xl border border-emerald-300/20 bg-emerald-300/[.07] flex items-center justify-center text-emerald-300">
                        <ActiveIcon className="w-6 h-6" />
                      </div>
                      <span className="rounded-full border border-emerald-300/15 bg-emerald-300/[.04] px-3 py-1.5 text-[9px] font-black uppercase tracking-[.14em] text-emerald-300">{view.signal}</span>
                    </div>
                    <div className="mt-10 text-[10px] font-black uppercase tracking-[.18em] text-slate-600">{view.label} / public model</div>
                    <h2 className="mt-3 max-w-xl text-2xl sm:text-3xl font-black tracking-[-0.035em] leading-tight text-white">{view.title}</h2>
                    <p className="mt-4 max-w-xl leading-relaxed text-slate-400">{view.text}</p>
                    <div className="mt-auto pt-8 grid sm:grid-cols-3 gap-2">
                      {view.evidence.map((item) => <div key={item} className="rounded-xl border border-white/[.07] bg-white/[.02] px-3 py-3 text-[10px] font-bold uppercase tracking-[.08em] text-slate-400"><Check className="inline w-3.5 h-3.5 mr-1.5 text-emerald-300" />{item}</div>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
        <div className="grid lg:grid-cols-[.65fr_1.35fr] gap-12 lg:gap-20 items-start">
          <div>
            <div className="eyebrow">Why it earns attention</div>
            <h2 className="mt-5 text-4xl sm:text-5xl font-black tracking-[-0.05em] leading-[.98] text-white">Trust is part of the interface.</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-400">The most valuable AI decision is not always the fastest one. It is the one a person can inspect, challenge and own.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {trustPrinciples.map(({ Icon, number, title, text }) => <article key={title} className="system-card rounded-3xl p-6 sm:p-7" data-tilt>
              <div className="flex items-center justify-between"><Icon className="w-6 h-6 text-emerald-300" /><span className="font-mono text-xs text-slate-600">{number}</span></div>
              <h3 className="mt-12 text-xl font-black text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{text}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[.07] bg-white/[.012]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
          <div className="max-w-3xl">
            <div className="eyebrow">Evidence boundary</div>
            <h2 className="mt-5 text-4xl sm:text-5xl font-black tracking-[-0.05em] text-white">What the current evidence supports.</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-400">JARVIS is stronger when the claims are narrower than the ambition.</p>
          </div>
          <div className="mt-12 grid lg:grid-cols-2 gap-5">
            <article className="rounded-[2rem] border border-emerald-300/15 bg-emerald-300/[.035] p-7 sm:p-9">
              <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[.13em] text-emerald-300"><ShieldCheck className="w-5 h-5" /> Supported</div>
              <ul className="mt-7 space-y-4 text-slate-300">
                {[
                  'A six-view Control Surface is implemented and verified on the local PRIME runtime.',
                  'Evidence, memory, system state, proposals and audit records are presented as read-only views.',
                  'The public walkthrough explains the interaction model without reading private runtime data.',
                  'Authority Engine remains a public evidence and launch surface—not a second control plane.',
                ].map((item) => <li key={item} className="flex gap-3"><Check className="w-5 h-5 shrink-0 text-emerald-300" /><span>{item}</span></li>)}
              </ul>
            </article>
            <article className="rounded-[2rem] border border-amber-300/15 bg-amber-300/[.025] p-7 sm:p-9">
              <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[.13em] text-amber-300"><LockKeyhole className="w-5 h-5" /> Not claimed</div>
              <ul className="mt-7 space-y-4 text-slate-400">
                {[
                  'No public access to the private JARVIS Control Surface or its protected APIs.',
                  'No autonomous approval, execution, scheduling, physical control or hidden actuation.',
                  'No dependency on VELYQUA and no authority over aquarium, livestock or mains-power actions.',
                  'No claim that a working prototype proves adoption, commercial impact or decision quality at scale.',
                ].map((item) => <li key={item} className="flex gap-3"><CircleOff className="w-5 h-5 shrink-0 text-amber-300" /><span>{item}</span></li>)}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <div className="eyebrow">From attention to relationship</div>
          <h2 className="mt-5 text-4xl sm:text-5xl font-black tracking-[-0.05em] leading-[.98] text-white">Choose the conversation worth having.</h2>
          <p className="mt-5 text-lg text-slate-400">Start with a real decision, opportunity or technical question. The contact page will carry your chosen context forward.</p>
        </div>
        <div className="mt-12 grid lg:grid-cols-3 gap-5">
          {conversationPaths.map(({ Icon, label, title, text, message }) => <Link
            key={label}
            to="/contact"
            state={{ inquiryType: 'JARVIS / Governed AI Conversation', message }}
            className="system-card group rounded-[2rem] p-7 sm:p-8"
            data-tilt
          >
            <div className="flex items-center justify-between gap-4"><Icon className="w-7 h-7 text-emerald-300" /><ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-300 transition-colors" /></div>
            <div className="mt-12 text-[10px] font-black uppercase tracking-[.16em] text-amber-300">{label}</div>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-white">{title}</h3>
            <p className="mt-4 leading-relaxed text-slate-400">{text}</p>
            <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-emerald-300">Start with this <ArrowRight className="w-4 h-4" /></div>
          </Link>)}
        </div>
        <div className="mt-8 text-center">
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="ghost-button inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold">
            <Network className="w-4 h-4" /> Connect on LinkedIn
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-28">
        <div className="rounded-[2.2rem] border border-white/10 bg-gradient-to-br from-emerald-400/[.075] via-white/[.02] to-amber-300/[.045] p-7 sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <div className="eyebrow">JARVIS launch surfaces</div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-[-0.04em] text-white">One authority layer, three explicit boundaries.</h2>
            <p className="mt-4 leading-relaxed text-slate-400">Authority Engine launches each surface and states its role. It never proxies private JARVIS data or becomes a second control plane.</p>
          </div>
          <div className="mt-9 grid lg:grid-cols-3 gap-4">
            <a href={JARVIS_PUBLIC_URL} target="_blank" rel="noopener noreferrer" className="system-card group rounded-3xl p-6 sm:p-7">
              <div className="flex items-center justify-between"><Network className="w-6 h-6 text-emerald-300" /><span className="rounded-full border border-emerald-300/20 px-3 py-1 text-[9px] font-black uppercase tracking-[.13em] text-emerald-300">Public</span></div>
              <h3 className="mt-10 text-xl font-black text-white">Lam Public JARVIS</h3><p className="mt-3 text-sm leading-relaxed text-slate-400">Public positioning, approved knowledge, evidence and qualified enquiries. No private PRIME access.</p>
              <div className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-emerald-300">Open public surface <ArrowUpRight className="w-4 h-4" /></div>
            </a>
            <a href={RELATIONSHIP_CONSOLE_URL} target="_blank" rel="noopener noreferrer" className="system-card group rounded-3xl p-6 sm:p-7">
              <div className="flex items-center justify-between"><Radar className="w-6 h-6 text-amber-300" /><span className="rounded-full border border-amber-300/20 px-3 py-1 text-[9px] font-black uppercase tracking-[.13em] text-amber-300">Owner only</span></div>
              <h3 className="mt-10 text-xl font-black text-white">Relationship Console</h3><p className="mt-3 text-sm leading-relaxed text-slate-400">Review enquiries, qualify relationships, record follow-up notes and monitor conversion signals.</p>
              <div className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-amber-300">Open owner console <ArrowUpRight className="w-4 h-4" /></div>
            </a>
            <a href={JARVIS_LOCAL_URL} target="_blank" rel="noopener noreferrer" className="system-card group rounded-3xl p-6 sm:p-7">
              <div className="flex items-center justify-between"><HardDrive className="w-6 h-6 text-slate-300" /><span className="rounded-full border border-white/10 px-3 py-1 text-[9px] font-black uppercase tracking-[.13em] text-slate-400">Local only</span></div>
              <h3 className="mt-10 text-xl font-black text-white">Private JARVIS Control</h3><p className="mt-3 text-sm leading-relaxed text-slate-400">Read-only PRIME operating picture on the Dell. No internet exposure and no actuation.</p>
              <div className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-slate-300">Open local control <ArrowUpRight className="w-4 h-4" /></div>
            </a>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {states.map(({ Icon, label, value, detail, tone }) => <article key={label} className="rounded-2xl border border-white/[.08] bg-black/15 p-5">
              <div className="flex items-start justify-between gap-3"><Icon className={`w-5 h-5 ${tone === 'amber' ? 'text-amber-300' : tone === 'emerald' ? 'text-emerald-300' : 'text-slate-500'}`} /><span className="text-[9px] font-black tracking-[.14em] uppercase text-slate-600">{label}</span></div>
              <h3 className="mt-6 text-lg font-black text-white">{value}</h3><p className="mt-2 text-xs leading-relaxed text-slate-500">{detail}</p>
            </article>)}
          </div>
        </div>
      </section>
    </div>
  </>;
}
