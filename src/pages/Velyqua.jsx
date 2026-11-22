import React from 'react';
import { Activity, ArrowRight, Database, ExternalLink, ShieldCheck, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';
import velyquaLogo from '../assets/velyqua-logo.svg';

const velyquaUrl = 'https://velyqua.vercel.app/';
const repositoryUrl = 'https://github.com/AndrewLamSingapore/velyqua';

const principles = [
  {
    Icon: Activity,
    title: 'Decision before dashboard',
    text: 'Bring manual water tests, observations and care actions into one useful record. Begin with the decision an owner needs to make.',
  },
  {
    Icon: ShieldCheck,
    title: 'Uncertainty stays visible',
    text: 'Observed facts, measurements, possible causes and unknowns remain separate. The system will not invent an all-clear.',
  },
  {
    Icon: Database,
    title: 'Memory that compounds',
    text: 'Review care history and follow up on outcomes. Guest records stay on the current device; account-based workflows are documented in the source.',
  },
];

export default function Velyqua() {
  return (
    <div className="min-h-screen bg-[#050807] pt-28 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="grid lg:grid-cols-[1.05fr_.95fr] gap-10 lg:gap-16 items-center">
          <div>
            <img
              src={velyquaLogo}
              alt="VELYQUA 维澜 logo"
              className="mb-7 h-24 w-24 rounded-[1.45rem] shadow-2xl shadow-cyan-950/50 ring-1 ring-cyan-200/20 sm:h-28 sm:w-28"
            />
            <div className="eyebrow">Flagship project · VELYQUA 维澜 · In development</div>
            <h1 className="mt-5 text-5xl sm:text-7xl font-black tracking-[-0.055em] leading-[.92]">
              Living water.<br /><span className="text-gradient">Clearer decisions.</span>
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-slate-300">
              A working freshwater aquarium prototype for manual water tests, observations and care history. I am developing it toward AI-assisted monitoring and decision support, beginning with real aquatic care problems.
            </p>
            <p className="mt-4 text-base font-semibold tracking-wide text-emerald-300">洞察微澜，守护水境。</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={velyquaUrl} target="_blank" rel="noreferrer" className="premium-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">
                Explore VELYQUA 维澜 <ExternalLink className="w-4 h-4" />
              </a>
              <a href={repositoryUrl} target="_blank" rel="noreferrer" className="ghost-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">
                Inspect the source <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="signal-card rounded-[2rem] p-7 sm:p-9">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-sm tracking-[.2em] uppercase text-emerald-300">Current stage</div>
                <h2 className="mt-3 text-2xl font-black">Working software. A product hypothesis to test.</h2>
              </div>
              <Waves className="w-8 h-8 text-emerald-300" />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
              {[
                ['Live', 'Public browser build'],
                ['Manual', 'Water tests + observations'],
                ['History', 'Care records + follow-up'],
                ['Pilot', 'Next validation goal'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                  <div className="text-xl font-black text-white">{value}</div>
                  <div className="mt-1 text-sm text-slate-500">{label}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-slate-500">AI monitoring, physical sensor performance, early-warning outcomes and commercial demand still require development and validation. The fictional walkthrough uses synthetic educational readings.</p>
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-white/[0.1] bg-white/[0.025] overflow-hidden shadow-2xl shadow-black/30" aria-label="Interactive VELYQUA preview">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] px-5 sm:px-7 py-4">
            <div>
              <div className="text-sm font-bold text-white">Interactive VELYQUA</div>
              <div className="mt-1 text-sm text-slate-500">Explore the software. Guest records stay on this device; walkthrough readings are illustrative.</div>
            </div>
            <a href={velyquaUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-emerald-300 inline-flex items-center gap-2">
              Open full screen <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <iframe
            src={velyquaUrl}
            title="Interactive VELYQUA aquarium prototype"
            className="block w-full h-[760px] bg-[#f4f8f8]"
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="clipboard-write"
          />
        </section>

        <section className="mt-14 grid md:grid-cols-3 gap-4">
          {principles.map(({ Icon, title, text }) => (
            <div key={title} className="system-card rounded-3xl p-7">
              <Icon className="w-7 h-7 text-emerald-300" />
              <h2 className="mt-10 text-xl font-black">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{text}</p>
            </div>
          ))}
        </section>

        <section className="mt-16" aria-labelledby="velyqua-validation-title">
          <div className="eyebrow">From prototype to a measurable pilot</div>
          <h2 id="velyqua-validation-title" className="mt-4 text-3xl sm:text-4xl font-bold">Build the evidence for the next step.</h2>
          <p className="mt-5 max-w-3xl text-slate-300">The goal is to discover whether AI-assisted monitoring improves a useful operational outcome. Customer interviews and a bounded pilot should guide investment and product scope.</p>
          <ol className="mt-8 grid md:grid-cols-2 gap-4">
            {[
              ['Reliable data', 'Make ingestion, cloud monitoring and data quality dependable.'],
              ['Traceable recommendations', 'Show the observations and uncertainty behind each suggestion.'],
              ['Human intervention records', 'Record what a person chose to do and why.'],
              ['Outcome measurement', 'Compare a meaningful baseline with follow-up results in a real pilot.'],
            ].map(([title, text], index) => <li key={title} className="system-card p-7"><p className="text-sm text-emerald-300">0{index + 1} / Development goal</p><h3 className="mt-4 text-xl">{title}</h3><p className="mt-3 text-sm text-slate-300">{text}</p></li>)}
          </ol>
        </section>

        <section className="mt-14 signal-card p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="eyebrow">Aquarium or aquaculture monitoring problem?</div>
            <h2 className="mt-4 text-2xl font-bold">Help define a useful pilot.</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-slate-300">I welcome discovery conversations with owners and operators. We can start with the problem, available data and an outcome worth measuring. Expansion to other industrial applications will need its own customer and technical validation.</p>
          </div>
          <Link to="/contact?source=velyqua&intent=collaboration" className="premium-button shrink-0 text-sm font-bold inline-flex items-center gap-2 px-6 py-3.5">
            Discuss a potential pilot <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
