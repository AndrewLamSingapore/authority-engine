import React from 'react';
import {
  Activity,
  ArrowRight,
  BarChart3,
  Building2,
  ExternalLink,
  GitBranch,
  ShieldCheck,
  Sparkles,
  Warehouse,
  Workflow,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const githubUrl = 'https://github.com/AndrewLamSingapore';
const linkedinEvidenceUrl = 'https://www.linkedin.com/in/lam-teck-sing-andrew-79886719/details/featured/';

const proof = [
  ['20+', 'Years in operations', 'Supply chain · warehousing · logistics'],
  ['391', 'Anonymised jobs analysed', 'Real container-operating evidence'],
  ['Power BI + SQL', 'Analytical capability', 'Decision support grounded in operations'],
  ['Clear labels', 'Evidence boundaries', 'Real · synthetic · hypothesis'],
];

const evidence = [
  {
    Icon: Warehouse,
    tag: 'REAL OPERATING EVIDENCE',
    title: 'Live Container Operations',
    text: 'An anonymised, seven-period operating dataset showing how job volume, service mix and recorded revenue can be inspected without inventing savings or impact claims.',
    label: 'Inspect featured evidence',
    href: linkedinEvidenceUrl,
  },
  {
    Icon: GitBranch,
    tag: 'TECHNICAL VERIFICATION',
    title: 'Public GitHub Builds',
    text: 'Code, prototypes and governed experiments that make the method inspectable instead of asking the reader to trust a résumé claim.',
    label: 'View GitHub',
    href: githubUrl,
  },
  {
    Icon: ShieldCheck,
    tag: 'CONTROLLED CASE STUDIES',
    title: 'Evidence Hub',
    text: 'Operating analyses and AI-assisted synthetic demonstrations with explicit maturity labels, limits and decision relevance.',
    label: 'Explore evidence',
    to: '/insights',
  },
];

const capabilities = [
  {
    Icon: Workflow,
    title: 'Operational Excellence',
    text: 'Understand the real workflow, expose constraints and improve how people, process and information move together.',
  },
  {
    Icon: Warehouse,
    title: 'Supply Chain & Warehousing',
    text: 'More than two decades across logistics, distribution, container operations and frontline execution.',
  },
  {
    Icon: BarChart3,
    title: 'Data-Driven Improvement',
    text: 'Use Power BI, SQL and business analytics to turn operating records into clearer decisions and targeted action.',
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#050807] text-slate-100">
      <section className="relative min-h-[92vh] flex items-center pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 right-[-10%] h-[620px] w-[620px] rounded-full bg-emerald-500/[0.09] blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-10%] h-[520px] w-[520px] rounded-full bg-amber-400/[0.06] blur-[130px]" />
          <div className="hero-grid absolute inset-0 opacity-30" />
        </div>
        <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-[1.2fr_.8fr] gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-2 text-xs font-semibold tracking-[.16em] text-emerald-300 uppercase">
              <Activity className="w-3.5 h-3.5" /> Operations Excellence · Supply Chain · Analytics
            </div>
            <h1 className="mt-7 text-[clamp(3.4rem,8vw,7.2rem)] font-black tracking-[-0.065em] leading-[.87] text-white">
              REAL OPERATIONS.<br />
              BETTER DECISIONS.<br />
              <span className="text-gradient">MEASURABLE ACTION.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-400">
              I combine 20+ years in supply chain, warehousing and logistics with process improvement, Power BI, SQL and business analytics to make operational risk visible and execution stronger.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/insights" className="premium-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">
                Inspect the evidence <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="ghost-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">
                Start a conversation
              </Link>
            </div>
          </div>
          <div className="relative lg:pl-8">
            <div className="signal-card rounded-[2rem] p-7 sm:p-9">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <div className="text-[11px] tracking-[.2em] uppercase text-slate-500">Operating method</div>
                  <div className="mt-2 text-xl font-bold text-white">Evidence before claims.</div>
                </div>
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>
              <div className="space-y-6">
                {['Observe how work actually happens', 'Find the constraint or weak signal', 'Test the explanation against evidence', 'Turn insight into owned action'].map((item, index) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="h-9 w-9 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] flex items-center justify-center text-xs font-bold text-emerald-300">0{index + 1}</div>
                    <div className="flex-1 border-b border-white/[0.07] pb-4 text-slate-200">{item}</div>
                  </div>
                ))}
              </div>
              <div className="mt-9 rounded-2xl border border-amber-300/15 bg-amber-300/[0.04] p-5">
                <div className="text-xs uppercase tracking-[.18em] text-amber-300">Career direction</div>
                <p className="mt-2 text-lg leading-snug text-white">Operations Excellence roles where operating depth and analytical leverage improve real decisions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4">
          {proof.map((metric) => (
            <div key={metric[1]} className="px-6 py-8 lg:py-10 border-b sm:border-b-0 border-white/[0.07] lg:border-r last:border-r-0">
              <div className="text-2xl sm:text-3xl font-black text-white">{metric[0]}</div>
              <div className="mt-2 text-sm font-semibold text-emerald-300">{metric[1]}</div>
              <div className="mt-1 text-xs text-slate-500">{metric[2]}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="max-w-3xl">
          <div className="eyebrow">Employer-relevant proof first</div>
          <h2 className="mt-4 text-4xl sm:text-6xl font-black tracking-[-0.045em] leading-[.95] text-white">Do not trust the headline.<br />Inspect the work.</h2>
          <p className="mt-5 text-lg text-slate-400">Real operating evidence, controlled demonstrations and public builds are kept distinct.</p>
        </div>
        <div className="mt-14 grid lg:grid-cols-3 gap-4">
          {evidence.map(({ Icon, tag, title, text, label, href, to }) => {
            const content = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <Icon className="w-7 h-7 text-emerald-300" />
                  <span className="text-[9px] leading-relaxed text-right font-bold tracking-[.12em] text-amber-300">{tag}</span>
                </div>
                <h3 className="mt-12 text-2xl font-black text-white">{title}</h3>
                <p className="mt-3 min-h-[120px] text-slate-400 leading-relaxed">{text}</p>
                <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
                  {label} {href ? <ExternalLink className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </div>
              </>
            );
            return href ? (
              <a key={title} href={href} target="_blank" rel="noreferrer" className="system-card rounded-3xl p-7">{content}</a>
            ) : (
              <Link key={title} to={to} className="system-card rounded-3xl p-7">{content}</Link>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="max-w-3xl">
          <div className="eyebrow">Strategic operational capabilities</div>
          <h2 className="mt-4 text-4xl sm:text-6xl font-black tracking-[-0.045em] leading-[.95] text-white">Operating depth, strengthened by data.</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {capabilities.map(({ Icon, title, text }) => (
            <div key={title} className="system-card rounded-3xl p-7">
              <Icon className="w-7 h-7 text-emerald-300" />
              <h3 className="mt-12 text-2xl font-black text-white">{title}</h3>
              <p className="mt-3 text-slate-400 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="rounded-[2.2rem] border border-white/[0.08] bg-gradient-to-br from-emerald-400/[0.08] via-white/[0.025] to-amber-300/[0.05] p-8 sm:p-12 lg:p-16 grid lg:grid-cols-[1fr_auto] gap-10 items-end">
          <div>
            <div className="eyebrow">Disciplined innovation evidence</div>
            <h2 className="mt-4 text-4xl sm:text-5xl font-black text-white">Open Aqua</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">A working digital-twin prototype and governed experiment exploring whether low-cost continuous signals can support more useful aquarium-care decisions. The physical hypothesis is not yet scientifically validated.</p>
          </div>
          <a href="https://github.com/AndrewLamSingapore/open-aqua" target="_blank" rel="noreferrer" className="ghost-button inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold">
            View prototype <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="rounded-[2.2rem] border border-white/[0.09] bg-white/[0.025] p-8 sm:p-12 lg:p-16 grid lg:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-16 items-center">
          <div className="rounded-[1.7rem] border border-emerald-300/15 bg-emerald-300/[0.045] p-7">
            <Building2 className="w-8 h-8 text-emerald-300" />
            <div className="mt-12 text-xs font-bold tracking-[.16em] text-amber-300">REAL OPERATING COMPANY</div>
            <div className="mt-3 text-3xl font-black text-white">Maxwell Excel Service</div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4"><div className="text-2xl font-black text-white">391</div><div className="mt-1 text-slate-500">anonymised job records</div></div>
              <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4"><div className="text-2xl font-black text-white">7</div><div className="mt-1 text-slate-500">reporting periods</div></div>
            </div>
          </div>
          <div>
            <div className="eyebrow">Real operating leadership</div>
            <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-[-0.04em] text-white">Evidence from the real economy.</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-400">As Partner & Director of Maxwell Excel Service Pte. Ltd., I help govern a Singapore container-handling operation covering 20ft and 40ft stuffing and unstuffing work. Its evidence is presented as real operating data—not as an AI demonstration.</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">The operating dataset is verified and anonymised. No unverified profit, savings or expansion claim is made.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/maxwell-excel" className="premium-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">View operating case <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/contact" className="ghost-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">Request container service</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-28">
        <div className="max-w-5xl mx-auto text-center">
          <div className="eyebrow">Operations Excellence · Supply Chain · Analytics</div>
          <h2 className="mt-5 text-4xl sm:text-6xl font-black tracking-[-0.05em] text-white">The next conversation should begin with <span className="text-gradient">the real problem.</span></h2>
          <p className="mt-5 text-lg text-slate-400">Career opportunities, operating collaboration and Maxwell service enquiries follow separate paths.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/about" className="ghost-button px-6 py-3.5 rounded-full font-semibold inline-flex items-center gap-2">See my operating story <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/contact" className="premium-button px-6 py-3.5 rounded-full font-semibold">Start a conversation</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
