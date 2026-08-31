import React from 'react';
import { ArrowUpRight, CircleOff, HardDrive, LockKeyhole, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

const JARVIS_LOCAL_URL = 'http://127.0.0.1:8000/control';

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

export default function JarvisControl() {
  return <>
    <SEO title="JARVIS Control — Local Read-only Launcher" description="Open the Dell-local JARVIS Control Surface without exposing, proxying or hosting it through Authority Engine." noindex />
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="eyebrow">LOCAL CONTROL BOUNDARY</div>
      <div className="mt-5 grid lg:grid-cols-[1fr_.7fr] gap-10 items-end">
        <div>
          <h1 className="text-5xl md:text-7xl font-black tracking-[-0.055em] text-white">JARVIS Control</h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-300">A safe launch point for the Dell-local JARVIS Control Surface. Authority Engine records the boundary and opens the address; it never receives JARVIS data or becomes a second control plane.</p>
        </div>
        <div className="rounded-3xl border border-emerald-300/20 bg-emerald-300/[.05] p-6">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-300"><span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,.8)]" /> Verified deployment state</div>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">PRIME was verified healthy with local Control HTTP 200. This public page deliberately performs no localhost probe, so no private status or credential crosses the boundary.</p>
        </div>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 gap-4">
        {states.map(({ Icon, label, value, detail, tone }) => <article key={label} className="rounded-3xl border border-white/10 bg-white/[.03] p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <Icon className={`w-6 h-6 ${tone === 'amber' ? 'text-amber-300' : tone === 'emerald' ? 'text-emerald-300' : 'text-slate-400'}`} />
            <span className="text-[10px] font-bold tracking-[.16em] uppercase text-slate-500">{label}</span>
          </div>
          <h2 className="mt-8 text-2xl font-black text-white">{value}</h2>
          <p className="mt-3 leading-relaxed text-slate-400">{detail}</p>
        </article>)}
      </div>

      <div className="mt-12 rounded-[2rem] border border-emerald-300/20 bg-gradient-to-br from-emerald-400/[.10] via-white/[.025] to-amber-300/[.06] p-8 sm:p-10">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <div className="eyebrow">Dell host only</div>
            <h2 className="mt-3 text-3xl font-black text-white">Open the private control surface.</h2>
            <p className="mt-3 text-slate-400">If the Dell is not running PRIME, the browser will show that the local address is unavailable. Nothing falls back to a public endpoint.</p>
          </div>
          <a href={JARVIS_LOCAL_URL} target="_blank" rel="noopener noreferrer" className="premium-button inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-bold">
            Open JARVIS Control <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <div className="mt-7 pt-6 border-t border-white/10 font-mono text-xs text-slate-500 break-all">{JARVIS_LOCAL_URL}</div>
      </div>
    </section>
  </>;
}
