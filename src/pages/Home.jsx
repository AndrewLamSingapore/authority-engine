import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Compass,
  Database,
  ExternalLink,
  GitBranch,
  Layers3,
  Network,
  Share2,
  ShieldCheck,
  Sparkles,
  Users,
  Warehouse,
  Workflow,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import signalVisual from '../assets/authority-signal.webp';

const githubUrl = 'https://github.com/AndrewLamSingapore';
const linkedinEvidenceUrl = 'https://www.linkedin.com/in/lam-teck-sing-andrew-79886719/details/featured/';
const openAquaUrl = 'https://open-aqua.vercel.app/';
const playWebsiteTheme = () => window.dispatchEvent(new Event('authority-theme:play'));

const audiencePaths = [
  {
    id: 'employer',
    Icon: BriefcaseBusiness,
    label: 'Employer',
    eyebrow: 'Hiring or assessing',
    title: 'See the evidence behind the career story.',
    text: 'Start with operating depth, analytical capability and public work that can be inspected—not a list of unsupported claims.',
    action: 'Inspect career proof',
    to: '/insights',
  },
  {
    id: 'collaborator',
    Icon: Users,
    label: 'Collaborator',
    eyebrow: 'Building or improving',
    title: 'Bring a real operating problem.',
    text: 'Explore how operations knowledge, process discipline and analytics can be combined around a practical decision or workflow.',
    action: 'Start with the problem',
    to: '/contact',
  },
  {
    id: 'explorer',
    Icon: Compass,
    label: 'Explorer',
    eyebrow: 'Following the frontier',
    title: 'Enter the ideas still being tested.',
    text: 'Explore governed experiments in operational memory, AI authority, machine systems and connected aquaculture—with maturity labels kept visible.',
    action: 'Enter The Portal',
    to: '/portal',
  },
];

const authoritySignals = [
  {
    id: 'operations',
    label: 'Operations',
    Icon: Warehouse,
    tag: 'VERIFIED FOUNDATION',
    title: 'Operations that actually move.',
    text: 'More than 20 years across logistics, grocery distribution, cold chain, warehousing and frontline execution. This is the base layer: real constraints, real handovers and real accountability.',
    proof: 'Career history and operating evidence are separated from prototypes and hypotheses.',
    action: 'See the operating story',
    to: '/about',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    Icon: Database,
    tag: 'CAPABILITY IN PROGRESS',
    title: 'Analytics grounded in operating context.',
    text: 'Power BI, SQL, Excel and business analytics are being added to decades of operating experience—so the analysis begins with how work really happens.',
    proof: 'BCG RISE Business & Data Analytics is in progress; completed capability is stated separately from current learning.',
    action: 'Inspect the evidence hub',
    to: '/insights',
  },
  {
    id: 'systems',
    label: 'Systems',
    Icon: Network,
    tag: 'PUBLIC BUILD',
    title: 'Context that compounds instead of disappearing.',
    text: 'The Portal connects encounters, evidence, questions and ideas into a living knowledge graph designed to make useful context easier to recover and act on.',
    proof: 'The interactive experience is public; its claims remain bounded to what visitors can inspect.',
    action: 'Explore The Portal',
    to: '/portal',
  },
  {
    id: 'frontier',
    label: 'Frontier',
    Icon: Layers3,
    tag: 'CONTROLLED EXPLORATION',
    title: 'Where machines begin to observe, decide and act.',
    text: 'Open Aqua 0.6 explores explainable aquarium decisions, memory and future sensor integration. Machine-economy work examines the authority and evidence machines may need before acting.',
    proof: 'Browser concepts are inspectable. Physical implementation and market claims remain unvalidated.',
    action: 'Open the Aqua exploration',
    to: '/open-aqua',
  },
];

const openQuestions = [
  'Where is the weakest handover in your operation?',
  'Which decision still depends on spreadsheet archaeology?',
  'What must remain human when AI agents begin acting?',
];

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
  const [activeAudience, setActiveAudience] = useState('employer');
  const [activeSignal, setActiveSignal] = useState('operations');
  const [selectedQuestion, setSelectedQuestion] = useState(openQuestions[0]);
  const [shareStatus, setShareStatus] = useState('');

  const audience = audiencePaths.find((item) => item.id === activeAudience) || audiencePaths[0];
  const signal = authoritySignals.find((item) => item.id === activeSignal) || authoritySignals[0];
  const SignalIcon = signal.Icon;

  const handleShare = async () => {
    const shareData = {
      title: 'Andrew Lam — Authority Engine',
      text: 'A public evidence system for operations excellence, analytics and applied AI.',
      url: window.location.origin,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus('Shared.');
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setShareStatus('Link copied.');
      }
    } catch (error) {
      if (error?.name !== 'AbortError') setShareStatus('Copy the address from your browser to share.');
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden bg-[#050807] text-slate-100">
      <section className="relative min-h-[calc(100svh-5rem)] flex items-center pt-28 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="ambient-orb ambient-orb-one absolute -top-40 right-[-10%] h-[620px] w-[620px] rounded-full bg-emerald-500/[0.1] blur-[120px]" />
          <div className="ambient-orb ambient-orb-two absolute bottom-[-20%] left-[-10%] h-[520px] w-[520px] rounded-full bg-amber-400/[0.065] blur-[130px]" />
          <div className="hero-grid absolute inset-0 opacity-35" />
          <div className="signal-beam absolute left-0 right-0 top-[42%] h-px" />
        </div>
        <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-[1.08fr_.92fr] gap-10 xl:gap-16 items-center">
          <div className="hero-enter hero-enter-one">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-2 text-[11px] sm:text-xs font-semibold tracking-[.14em] text-emerald-300 uppercase">
              <span className="signal-wave" aria-hidden="true">
                <span /><span /><span /><span />
              </span>
              Operations Leadership · Analytics · Applied AI
            </div>
            <h1 className="mt-7 text-[clamp(2.8rem,5.5vw,5.1rem)] font-black tracking-[-0.055em] leading-[.93] text-white">
              <span className="hero-line"><span>I TURN COMPLEX</span></span>
              <span className="hero-line"><span>OPERATIONS INTO</span></span>
              <span className="hero-line"><span className="text-gradient">DECISIONS THAT MOVE.</span></span>
            </h1>
            <p className="mt-7 max-w-2xl text-[15px] sm:text-base leading-relaxed text-slate-300/80">
              I combine 20+ years across supply chain, warehousing, cold chain and logistics with Power BI, SQL, business analytics and applied AI—building resilient operations through data and execution.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/insights" onClick={playWebsiteTheme} className="premium-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">
                Explore the work <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="ghost-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">
                Bring me a problem
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
              <span className="h-px w-8 bg-emerald-300/40" aria-hidden="true" />
              Singapore · Open to operations excellence and operational-analytics opportunities
            </div>
          </div>
          <div className="relative lg:pl-4 hero-enter hero-enter-two">
            <div className="signal-card signal-card-live relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
              <div className="signal-sweep" aria-hidden="true" />
              <div className="flex items-start justify-between gap-6 mb-6">
                <div>
                  <div className="text-[10px] tracking-[.22em] uppercase text-emerald-300/70">Choose your route</div>
                  <div className="mt-2 text-xl font-bold tracking-tight text-white">What brought you here?</div>
                </div>
                <div className="method-orbit flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/[0.055]">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2" role="tablist" aria-label="Choose a visitor route">
                {audiencePaths.map(({ id, Icon, label }) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={activeAudience === id}
                    aria-controls="audience-panel"
                    onClick={() => setActiveAudience(id)}
                    className={`audience-tab rounded-2xl px-2 py-3 text-center ${activeAudience === id ? 'is-active' : ''}`}
                  >
                    <Icon className="w-4 h-4 mx-auto" />
                    <span className="mt-2 block text-[10px] sm:text-xs font-bold">{label}</span>
                  </button>
                ))}
              </div>
              <div id="audience-panel" role="tabpanel" className="audience-panel mt-4 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.045] p-5" key={audience.id}>
                <div className="text-[10px] uppercase tracking-[.2em] text-amber-300">{audience.eyebrow}</div>
                <h2 className="mt-2 text-xl font-black leading-tight text-white">{audience.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{audience.text}</p>
                <Link to={audience.to} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-300 hover:text-emerald-200">
                  {audience.action} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-reveal className="reveal-section border-y border-white/[0.07] bg-white/[0.018]">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4">
          {proof.map((metric) => (
            <div key={metric[1]} className="proof-cell px-6 py-7 lg:py-9 border-b sm:border-b-0 border-white/[0.07] lg:border-r last:border-r-0">
              <div className="metric-value text-2xl sm:text-3xl font-black text-white">{metric[0]}</div>
              <div className="mt-2 text-sm font-semibold text-emerald-300">{metric[1]}</div>
              <div className="mt-1 text-xs text-slate-500">{metric[2]}</div>
            </div>
          ))}
        </div>
      </section>

      <section data-reveal className="reveal-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
        <div className="grid lg:grid-cols-[.94fr_1.06fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="eyebrow">Explore the Authority Engine</div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-[-0.045em] leading-[.98] text-white">Follow the signal that matters to you.</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">The career story has four connected layers. Choose one to see what is verified, what is being built and where the boundary of evidence sits.</p>
            <div className="authority-visual relative mt-9 overflow-hidden rounded-[2rem] border border-white/[0.09]">
              <img src={signalVisual} alt="Abstract operational signal routes converging into a clear decision point" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050807] via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-4">
                <div className="text-[10px] font-bold tracking-[.18em] text-emerald-200 uppercase">Complexity → evidence → action</div>
                <div className="h-8 w-8 rounded-full border border-amber-300/30 bg-black/40 flex items-center justify-center"><Sparkles className="w-3.5 h-3.5 text-amber-300" /></div>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="tablist" aria-label="Explore Authority Engine topics">
              {authoritySignals.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={activeSignal === id}
                  aria-controls="authority-signal-panel"
                  onClick={() => setActiveSignal(id)}
                  className={`signal-tab rounded-2xl px-3 py-4 ${activeSignal === id ? 'is-active' : ''}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="mt-2 block text-xs font-bold">{label}</span>
                </button>
              ))}
            </div>
            <div id="authority-signal-panel" role="tabpanel" key={signal.id} className="signal-detail mt-3 rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-7 sm:p-9">
              <div className="flex items-center justify-between gap-5">
                <div className="text-[10px] font-bold tracking-[.18em] text-amber-300">{signal.tag}</div>
                <SignalIcon className="w-6 h-6 text-emerald-300" />
              </div>
              <h3 className="mt-10 text-3xl sm:text-4xl font-black tracking-[-0.035em] text-white">{signal.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-slate-300">{signal.text}</p>
              <div className="mt-7 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.04] p-5 flex gap-3">
                <CheckCircle2 className="mt-0.5 w-5 h-5 shrink-0 text-emerald-300" />
                <p className="text-sm leading-relaxed text-slate-400">{signal.proof}</p>
              </div>
              <Link to={signal.to} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-emerald-300 hover:text-emerald-200">
                {signal.action} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section data-reveal className="reveal-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
        <div className="max-w-3xl">
          <div className="eyebrow">Employer-relevant proof first</div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-[-0.04em] leading-[.98] text-white">Do not trust the headline.<br />Inspect the work.</h2>
          <p className="mt-5 text-base text-slate-400">Real operating evidence, controlled demonstrations and public builds are kept distinct.</p>
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

      <section data-reveal className="reveal-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-28">
        <div className="max-w-3xl">
          <div className="eyebrow">Strategic operational capabilities</div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-[-0.04em] leading-[.98] text-white">Operating depth, strengthened by data.</h2>
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

      <section data-reveal className="reveal-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-28">
        <div className="relative overflow-hidden rounded-[2.2rem] border border-emerald-300/20 bg-gradient-to-br from-emerald-400/[0.11] via-white/[0.025] to-amber-300/[0.07] p-8 sm:p-12 lg:p-16">
          <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-emerald-400/10 blur-[90px]" aria-hidden="true" />
          <div className="relative grid lg:grid-cols-[1fr_.9fr] gap-10 lg:gap-16 items-center">
            <div>
              <div className="eyebrow">Flagship interactive system · Portal 4.1</div>
              <h2 className="mt-4 text-4xl sm:text-6xl font-black tracking-[-0.055em] text-white">The Portal</h2>
              <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300">A living knowledge graph built to connect encounters, evidence, questions and ideas—so useful context compounds instead of disappearing.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/portal" className="premium-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">Explore it here <ArrowRight className="w-4 h-4" /></Link>
                <a href="https://the-portal-ten.vercel.app/" target="_blank" rel="noreferrer" className="ghost-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">Open full experience <ExternalLink className="w-4 h-4" /></a>
              </div>
            </div>
            <Link to="/portal" className="group rounded-[1.7rem] border border-white/[0.1] bg-black/25 p-6 sm:p-8 transition-colors hover:border-emerald-300/35">
              <div className="flex items-center justify-between">
                <Network className="w-8 h-8 text-emerald-300" />
                <span className="text-[10px] tracking-[.18em] uppercase text-amber-300">Live constellation</span>
              </div>
              <div className="relative mt-8 h-44">
                <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/40 bg-emerald-300/10 flex items-center justify-center text-xs font-black text-emerald-200">OPERATIONS</div>
                {[['EVIDENCE','left-0 top-0'],['ANALYTICS','right-0 top-2'],['AI','right-4 bottom-0'],['MEMORY','left-3 bottom-1']].map(([label,pos]) => <div key={label} className={`absolute ${pos} h-14 w-14 rounded-full border border-white/10 bg-white/[0.035] flex items-center justify-center text-[8px] font-bold text-slate-400 group-hover:border-emerald-300/25`}>{label}</div>)}
              </div>
              <div className="mt-5 text-sm font-semibold text-emerald-300 inline-flex items-center gap-2">Enter interactive preview <ArrowRight className="w-4 h-4" /></div>
            </Link>
          </div>
        </div>
      </section>

      <section data-reveal className="reveal-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-28">
        <div className="overflow-hidden rounded-[2.2rem] border border-white/[0.08] bg-gradient-to-br from-emerald-400/[0.08] via-white/[0.025] to-amber-300/[0.05] grid lg:grid-cols-[.82fr_1.18fr]">
          <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
            <div>
              <div className="eyebrow">Controlled exploration · Open Aqua 0.6</div>
              <h2 className="mt-4 text-4xl sm:text-5xl font-black text-white">Open Aqua</h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">A browser concept exploring how incomplete aquarium observations could become explainable next actions—while preserving uncertainty and tank memory.</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">The interactive concept is inspectable. Physical sensor integration, implementation and market claims remain unvalidated.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/open-aqua" className="premium-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">Explore it here <ArrowRight className="w-4 h-4" /></Link>
                <a href={openAquaUrl} target="_blank" rel="noreferrer" className="ghost-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">Open full experience <ExternalLink className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
          <div className="min-h-[620px] border-t lg:border-t-0 lg:border-l border-white/[0.08] bg-[#f4f8f8]">
            <div className="h-12 px-5 flex items-center justify-between bg-[#08100e] border-b border-white/[0.08]">
              <span className="text-[10px] tracking-[.18em] uppercase text-emerald-300">Interactive browser concept</span>
              <span className="text-[10px] text-slate-500">Browser-local data</span>
            </div>
            <iframe src={openAquaUrl} title="Open Aqua interactive homepage preview" className="block w-full h-[568px]" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="clipboard-write" />
          </div>
        </div>
      </section>

      <section data-reveal className="reveal-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-28">
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
            <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-[-0.035em] text-white">Evidence from the real economy.</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-400">As Partner & Director of Maxwell Excel Service Pte. Ltd., I help govern a Singapore container-handling operation covering 20ft and 40ft stuffing and unstuffing work. Its evidence is presented as real operating data—not as an AI demonstration.</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">The operating dataset is verified and anonymised. No unverified profit, savings or expansion claim is made.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/maxwell-excel" className="premium-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">View operating case <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/contact" className="ghost-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">Request container service</Link>
            </div>
          </div>
        </div>
      </section>

      <section data-reveal className="reveal-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-28">
        <div className="open-question-shell relative overflow-hidden rounded-[2.2rem] p-8 sm:p-12 lg:p-16">
          <div className="relative grid lg:grid-cols-[.72fr_1.28fr] gap-10 lg:gap-16 items-start">
            <div>
              <div className="eyebrow">The open question</div>
              <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-[-0.045em] leading-[.98] text-white">Authority should create a conversation.</h2>
              <p className="mt-5 text-base leading-relaxed text-slate-400">Choose the question closest to your world. It becomes the starting point—not another generic contact form.</p>
            </div>
            <div>
              <div className="space-y-3" role="radiogroup" aria-label="Choose a question to discuss">
                {openQuestions.map((question, index) => {
                  const selected = selectedQuestion === question;
                  return (
                    <button
                      key={question}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setSelectedQuestion(question)}
                      className={`question-choice w-full rounded-2xl p-5 text-left flex items-start gap-4 ${selected ? 'is-selected' : ''}`}
                    >
                      <span className="question-number shrink-0">0{index + 1}</span>
                      <span className="font-bold leading-snug text-slate-200">{question}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  state={{ inquiryType: 'Professional Inquiry', message: `I want to explore this question: ${selectedQuestion}` }}
                  className="premium-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold"
                >
                  Explore this with Andrew <ArrowRight className="w-4 h-4" />
                </Link>
                <button type="button" onClick={handleShare} className="ghost-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">
                  <Share2 className="w-4 h-4" /> Share the engine
                </button>
                <span className="text-xs text-emerald-300" role="status" aria-live="polite">{shareStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-reveal className="reveal-section px-4 sm:px-6 lg:px-8 pb-24 sm:pb-28">
        <div className="max-w-5xl mx-auto text-center">
          <div className="eyebrow">Operations Leadership · Analytics · Applied AI</div>
          <h2 className="mt-5 text-3xl sm:text-5xl font-black tracking-[-0.045em] text-white">See the evidence. Challenge the thinking. <span className="text-gradient">Bring the real problem.</span></h2>
          <p className="mt-5 text-base text-slate-400">Career opportunities, operating collaboration and service enquiries follow clear, separate paths.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/about" className="ghost-button px-6 py-3.5 rounded-full font-semibold inline-flex items-center gap-2">See my operating story <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/contact" className="premium-button px-6 py-3.5 rounded-full font-semibold">Start a conversation</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
