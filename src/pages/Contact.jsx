import React, { useState } from 'react';
import { MapPin, Send, ShieldCheck, CheckCircle2, Loader2, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', inquiryType: 'Operations Opportunity', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || 'xljrreep';
  const linkedinUrl = 'https://www.linkedin.com/in/lam-teck-sing-andrew-79886719';

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...formData, _subject: `Authority Engine: ${formData.inquiryType}` })
      });
      if (!response.ok) {
        let message = 'Your message could not be sent. Please try again.';
        try {
          const data = await response.json();
          message = data?.errors?.map((item) => item.message).filter(Boolean).join(' ') || data?.error || message;
        } catch { /* keep safe fallback */ }
        throw new Error(message);
      }
      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', inquiryType: 'Operations Opportunity', message: '' });
    } catch (err) {
      setError(err.message || 'A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#050807] text-slate-100 min-h-screen pt-28 pb-24 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none"><div className="absolute top-24 right-[-12%] h-[520px] w-[520px] rounded-full bg-emerald-500/[0.07] blur-[130px]"/><div className="absolute bottom-0 left-[-10%] h-[420px] w-[420px] rounded-full bg-amber-400/[0.05] blur-[130px]"/></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[.85fr_1.15fr] gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-32">
            <div className="eyebrow">Start a conversation</div>
            <h1 className="mt-5 text-5xl sm:text-6xl font-black tracking-[-0.055em] leading-[.94] text-white">Turn an operational problem into a <span className="text-gradient">better decision.</span></h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-400 max-w-xl">Open to operations excellence, process improvement, supply chain analytics, operations analysis, warehouse and logistics opportunities in Singapore.</p>
            <div className="mt-9 grid gap-3">
              <div className="signal-card rounded-2xl p-5 flex gap-4"><MapPin className="w-5 h-5 text-amber-300 shrink-0 mt-0.5"/><div><div className="font-semibold text-white">Singapore</div><div className="text-sm text-slate-500 mt-1">On-site, hybrid and remote opportunities</div></div></div>
              <div className="signal-card rounded-2xl p-5 flex gap-4"><ShieldCheck className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5"/><div><div className="font-semibold text-white">20+ years in operations</div><div className="text-sm text-slate-500 mt-1">Frontline experience combined with analytics and AI</div></div></div>
            </div>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200 transition-colors">Connect on LinkedIn <ArrowUpRight className="w-4 h-4"/></a>
          </div>

          <div className="signal-card rounded-[2rem] p-6 sm:p-9 lg:p-10">
            {submitted ? (
              <div className="min-h-[480px] flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] flex items-center justify-center"><CheckCircle2 className="w-8 h-8 text-emerald-300"/></div>
                <h2 className="mt-7 text-3xl font-black text-white">Message received.</h2>
                <p className="mt-3 text-slate-400 max-w-md">Thank you. Your inquiry has been submitted successfully through Authority Engine.</p>
                <button onClick={() => setSubmitted(false)} className="ghost-button mt-8 px-6 py-3 rounded-full font-semibold">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div><div className="text-xs uppercase tracking-[.18em] text-slate-500">Direct inquiry</div><h2 className="mt-2 text-3xl font-black text-white">What are you trying to improve?</h2><p className="mt-2 text-sm leading-relaxed text-slate-500">Share enough context to make the first conversation useful.</p></div>
                <div><label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Full name *</label><input type="text" id="name" name="name" autoComplete="name" required value={formData.name} onChange={handleChange} className="w-full bg-[#080F0E] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-400/60" placeholder="Your name"/></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Email *</label><input type="email" id="email" name="email" autoComplete="email" required value={formData.email} onChange={handleChange} className="w-full bg-[#080F0E] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-400/60" placeholder="name@company.com"/></div>
                  <div><label htmlFor="company" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Company</label><input type="text" id="company" name="company" autoComplete="organization" value={formData.company} onChange={handleChange} className="w-full bg-[#080F0E] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-400/60" placeholder="Organisation"/></div>
                </div>
                <div><label htmlFor="inquiryType" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Inquiry</label><select id="inquiryType" name="inquiryType" value={formData.inquiryType} onChange={handleChange} className="w-full bg-[#080F0E] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-400/60"><option>Operations Opportunity</option><option>Analytics Opportunity</option><option>Professional Inquiry</option></select></div>
                <div><label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Message *</label><textarea id="message" name="message" required rows="6" maxLength="4000" value={formData.message} onChange={handleChange} className="w-full bg-[#080F0E] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-400/60 resize-y" placeholder="The situation, challenge, opportunity or decision you are working through..."/></div>
                {error && <div role="alert" className="text-rose-300 text-sm bg-rose-950/30 p-4 rounded-xl border border-rose-900/60">{error}</div>}
                <button type="submit" disabled={isSubmitting} className="premium-button w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50">{isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin"/> Sending…</> : <><Send className="w-4 h-4"/> Send inquiry</>}</button>
                <p className="text-center text-xs text-slate-600">Your details are used only to respond to your inquiry.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
