import React from 'react';
import { Activity, ArrowRight, Database, ExternalLink, ShieldCheck, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';

const openAquaUrl = 'https://open-aqua.vercel.app/';
const repositoryUrl = 'https://github.com/AndrewLamSingapore/open-aqua';

const principles = [
  {
    Icon: Activity,
    title: 'Decision before dashboard',
    text: 'Open Aqua turns observations and water tests into one calm next action instead of flooding the owner with metrics.',
  },
  {
    Icon: ShieldCheck,
    title: 'Uncertainty stays visible',
    text: 'Observed facts, measurements, possible causes and unknowns remain separate. The system will not invent an all-clear.',
  },
  {
    Icon: Database,
    title: 'Memory that compounds',
    text: 'Tank history, concerns and outcomes accumulate into a durable operating record while the public preview remains browser-local.',
  },
];

export default function OpenAqua() {
  return (
    <div className="min-h-screen bg-[#050807] pt-28 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="grid lg:grid-cols-[1.05fr_.95fr] gap-10 lg:gap-16 items-center">
          <div>
            <div className="eyebrow">Controlled public exploration · Open Aqua 0.6</div>
            <h1 className="mt-5 text-5xl sm:text-7xl font-black tracking-[-0.055em] leading-[.92]">
              Aquarium care,<br /><span className="text-gradient">without the noise.</span>
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-slate-300">
              An iPhone-first browser concept exploring how imperfect observations could become safer, explainable decisions—and how a tank could remember what happened next.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={openAquaUrl} target="_blank" rel="noreferrer" className="premium-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">
                Explore Open Aqua <ExternalLink className="w-4 h-4" />
              </a>
              <a href={repositoryUrl} target="_blank" rel="noreferrer" className="ghost-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">
                Inspect the source <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="signal-card rounded-[2rem] p-7 sm:p-9">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-[10px] tracking-[.2em] uppercase text-emerald-300">Inspectable concept evidence</div>
                <h2 className="mt-3 text-2xl font-black">A working governed browser prototype</h2>
              </div>
              <Waves className="w-8 h-8 text-emerald-300" />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
              {[
                ['Live', 'Public browser build'],
                ['63', 'Automated tests'],
                ['Local', 'Preview data boundary'],
                ['Explicit', 'Evidence + uncertainty'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                  <div className="text-xl font-black text-white">{value}</div>
                  <div className="mt-1 text-xs text-slate-500">{label}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-slate-500">The browser concept can be inspected. Physical sensor integration, implementation and market claims remain hypotheses until independently validated.</p>
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-white/[0.1] bg-white/[0.025] overflow-hidden shadow-2xl shadow-black/30" aria-label="Interactive Open Aqua preview">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] px-5 sm:px-7 py-4">
            <div>
              <div className="text-sm font-bold text-white">Interactive Open Aqua</div>
              <div className="mt-1 text-xs text-slate-500">Complete onboarding, explore Aqua Now, Tank Memory, Quiet Plan and Quick Update.</div>
            </div>
            <a href={openAquaUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-emerald-300 inline-flex items-center gap-2">
              Open full screen <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <iframe
            src={openAquaUrl}
            title="Interactive Open Aqua browser concept"
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

        <section className="mt-14 rounded-[2rem] border border-amber-300/15 bg-amber-300/[0.035] p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="text-[10px] tracking-[.2em] uppercase text-amber-300">Public-preview boundary</div>
            <p className="mt-3 max-w-3xl leading-relaxed text-slate-300">Preview records stay in the visitor’s browser. Private accounts and cloud synchronisation activate only after production identity and cloud configuration are completed.</p>
          </div>
          <Link to="/insights" className="shrink-0 text-sm font-bold text-emerald-300 inline-flex items-center gap-2">
            Inspect the evidence <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
