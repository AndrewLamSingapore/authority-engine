import React from 'react';
import { ArrowRight, Network, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function JarvisNetworkSpotlight() {
  const { pathname } = useLocation();
  if (pathname !== '/') return null;

  return (
    <section aria-label="JARVIS Agent Network spotlight" className="relative z-20 -mt-10 px-4 sm:px-6 lg:px-8 pb-6">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/jarvis/agents"
          className="group relative block overflow-hidden rounded-[1.75rem] border border-emerald-300/20 bg-[#07100d]/95 p-[1px] shadow-[0_28px_90px_rgba(0,0,0,.42)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-emerald-300/40 hover:shadow-[0_32px_110px_rgba(16,185,129,.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(52,211,153,.16),transparent_34%),radial-gradient(circle_at_90%_100%,rgba(251,191,36,.09),transparent_30%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/80 to-transparent" />
          <div className="relative grid gap-6 rounded-[calc(1.75rem-1px)] bg-black/20 p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
            <div className="flex gap-4 sm:gap-5">
              <div className="relative mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-300/[.08] sm:h-14 sm:w-14">
                <span className="absolute inset-1 animate-ping rounded-xl border border-emerald-300/20 motion-reduce:animate-none" aria-hidden="true" />
                <Network className="relative h-6 w-6 text-emerald-300" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[.2em] text-emerald-300">J Console · Live public system map</span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[.04] px-2 py-1 text-[9px] font-bold uppercase tracking-[.14em] text-slate-400">
                    <ShieldCheck className="h-3 w-3 text-emerald-300" /> governed
                  </span>
                </div>
                <h2 className="mt-2 text-xl font-black tracking-[-.025em] text-white sm:text-2xl lg:text-3xl">
                  29 registered agents. <span className="text-emerald-300">One governed hierarchy.</span>
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                  Inspect how JARVIS PRIME coordinates strategy, research, data, engineering, economic and quality roles—with the canonical registry kept separate from simultaneous inference capacity.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-white/[.07] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="hidden xl:block">
                <div className="text-[9px] font-bold uppercase tracking-[.18em] text-slate-600">Canonical registry</div>
                <div className="mt-1 flex items-center gap-2 text-xs font-bold text-slate-300"><Sparkles className="h-3.5 w-3.5 text-amber-300" /> Schema v1.0.0</div>
              </div>
              <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-emerald-300 px-5 py-3 text-sm font-black text-[#04100b] transition group-hover:bg-emerald-200">
                Explore network <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
