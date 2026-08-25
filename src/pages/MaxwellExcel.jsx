import React from 'react';
import { ArrowRight, Boxes, Building2, CheckCircle2, ClipboardCheck, Container, MapPin, ShieldCheck, TimerReset } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    Icon: Container,
    title: '20ft and 40ft containers',
    text: 'Job-based stuffing and unstuffing scoped around the container, load characteristics and required completion.',
  },
  {
    Icon: Boxes,
    title: 'SKU-sensitive handling',
    text: 'Quotations account for service complexity rather than treating every container as identical work.',
  },
  {
    Icon: ClipboardCheck,
    title: 'Clear job accountability',
    text: 'Each enquiry is defined by operation, location, timing and relevant handling conditions before confirmation.',
  },
];

const quoteDrivers = [
  'Stuffing or unstuffing operation',
  '20ft or 40ft container size',
  'Number of containers',
  'SKU count and handling complexity',
  'Work location and required date',
  'Waiting, access or special operating conditions',
];

export default function MaxwellExcel() {
  return (
    <div className="bg-[#050807] min-h-screen pt-28 pb-24 text-slate-100 overflow-hidden">
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-12%] h-[520px] w-[520px] rounded-full bg-emerald-500/[0.08] blur-[130px]" />
          <div className="hero-grid absolute inset-0 opacity-25" />
        </div>
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.15fr_.85fr] gap-12 items-center">
          <div>
            <div className="eyebrow">Maxwell Excel Service Pte. Ltd.</div>
            <h1 className="mt-5 text-5xl sm:text-7xl font-black tracking-[-0.06em] leading-[.9] text-white">Container work.<br /><span className="text-gradient">Clearly scoped.</span></h1>
            <p className="mt-7 max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-400">Stuffing and unstuffing services for 20ft and 40ft containers in Singapore, structured around the actual job rather than generic manpower supply.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" className="premium-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">Request container service <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/about" className="ghost-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">View operating leadership</Link>
            </div>
          </div>
          <div className="signal-card rounded-[2rem] p-7 sm:p-9">
            <Building2 className="w-8 h-8 text-emerald-300" />
            <div className="mt-10 text-xs tracking-[.18em] text-amber-300 font-bold">VERIFIED OPERATING EVIDENCE</div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-5"><div className="text-3xl font-black text-white">391</div><div className="mt-2 text-sm text-slate-500">anonymised job records</div></div>
              <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-5"><div className="text-3xl font-black text-white">7</div><div className="mt-2 text-sm text-slate-500">reporting periods</div></div>
              <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-5"><div className="text-3xl font-black text-white">20ft</div><div className="mt-2 text-sm text-slate-500">container service</div></div>
              <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-5"><div className="text-3xl font-black text-white">40ft</div><div className="mt-2 text-sm text-slate-500">container service</div></div>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-slate-600">Records are verified and anonymised. Customer identity, negotiated prices and worker information are not published.</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/[0.07]">
        <div className="max-w-3xl"><div className="eyebrow">Service scope</div><h2 className="mt-4 text-4xl sm:text-5xl font-black text-white">The job defines the service.</h2><p className="mt-5 text-lg text-slate-400">The quotation begins with the real operating conditions so expectations are clear before deployment.</p></div>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {services.map(({ Icon, title, text }) => (
            <div key={title} className="system-card rounded-3xl p-7">
              <Icon className="w-7 h-7 text-emerald-300" />
              <h3 className="mt-12 text-2xl font-black text-white">{title}</h3>
              <p className="mt-3 text-slate-400 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-12 lg:gap-20 items-start">
          <div>
            <div className="eyebrow">Quotation inputs</div>
            <h2 className="mt-4 text-4xl sm:text-5xl font-black text-white">Tell us what the work actually requires.</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-400">Complete information produces a faster, clearer quotation and reduces avoidable exceptions on the day of work.</p>
          </div>
          <div className="signal-card rounded-[2rem] p-7 sm:p-9">
            <div className="grid sm:grid-cols-2 gap-4">
              {quoteDrivers.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-black/15 p-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-[2rem] border border-amber-300/15 bg-amber-300/[0.035] p-8 sm:p-12 grid md:grid-cols-3 gap-8">
          <div><ShieldCheck className="w-7 h-7 text-amber-300" /><h3 className="mt-6 text-xl font-black text-white">Evidence boundary</h3><p className="mt-3 text-sm leading-relaxed text-slate-400">No unverified profit, savings, productivity or expansion claim is presented.</p></div>
          <div><TimerReset className="w-7 h-7 text-amber-300" /><h3 className="mt-6 text-xl font-black text-white">Scope before confirmation</h3><p className="mt-3 text-sm leading-relaxed text-slate-400">Timing, access and special conditions should be disclosed before the service is confirmed.</p></div>
          <div><MapPin className="w-7 h-7 text-amber-300" /><h3 className="mt-6 text-xl font-black text-white">Singapore operations</h3><p className="mt-3 text-sm leading-relaxed text-slate-400">Service availability depends on the requested location, date and operating requirements.</p></div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-5xl mx-auto text-center rounded-[2.2rem] border border-white/[0.08] bg-gradient-to-br from-emerald-400/[0.08] to-white/[0.02] p-10 sm:p-16">
          <div className="eyebrow">Request a quotation</div>
          <h2 className="mt-5 text-4xl sm:text-6xl font-black tracking-[-0.05em] text-white">Start with the container job.</h2>
          <p className="mt-5 text-lg text-slate-400">Provide the operation, container size, quantity, location, required date and handling conditions.</p>
          <Link to="/contact" className="mt-9 premium-button inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold">Request container service <ArrowRight className="w-4 h-4" /></Link>
          <div className="mt-8 text-xs text-slate-600">Maxwell Excel Service Pte. Ltd. · Singapore UEN 202441264C</div>
        </div>
      </section>
    </div>
  );
}
