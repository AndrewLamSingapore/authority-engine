import React, { useState } from 'react';
import { MapPin, Send, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'Operational Leadership Role',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || 'xljrreep';
  const linkedinUrl = "https://www.linkedin.com/in/lam-teck-sing-andrew-79886719?utm_source=share_via&utm_content=profile&utm_medium=member_android";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', company: '', inquiryType: 'Operational Leadership Role', message: '' });
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to submit form. Please verify Formspree activation.');
      }
    } catch (err) {
      setError('A network error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#080F0E] text-slate-100 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Direct Info & LinkedIn */}
          <div>
            <span className="text-rose-500 font-semibold tracking-wider text-sm uppercase">Get In Touch</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-2 text-white">Direct Executive Inquiry</h1>
            <p className="text-slate-400 mt-4 leading-relaxed">
              Open for operational leadership roles, supply chain optimization consultations, and strategic advisory.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="text-amber-500 w-5 h-5 shrink-0" />
                <span>Singapore | Open to Regional Operations</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <ShieldCheck className="text-emerald-500 w-5 h-5 shrink-0" />
                <span>Verified Executive Profile</span>
              </div>
            </div>

            {/* Direct LinkedIn Link with Inline SVG */}
            <div className="mt-8 pt-8 border-t border-slate-800">
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">Professional Network</p>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#0D1816] hover:bg-slate-800 text-white border border-slate-700 px-5 py-3 rounded-lg font-medium text-sm transition-colors"
              >
                <svg className="w-5 h-5 text-rose-500 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.49 1.49 0 1 0 0 2.98 1.49 1.49 0 0 0 0-2.98z"/>
                </svg>
                <span>View LinkedIn Profile</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-[#0D1816] border border-slate-800 p-8 rounded-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Message Sent Successfully</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  Thank you for your inquiry. Future submissions will route to Andrew's inbox once the Formspree activation link is confirmed.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#080F0E] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rose-500 text-sm"
                    placeholder="e.g. Sarah Jenkins"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#080F0E] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rose-500 text-sm"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-[#080F0E] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rose-500 text-sm"
                      placeholder="Organization Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Inquiry Nature
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full bg-[#080F0E] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rose-500 text-sm"
                  >
                    <option value="Operational Leadership Role">Operational Leadership Role</option>
                    <option value="Consulting / Advisory">Consulting / Advisory</option>
                    <option value="General Executive Inquiry">General Executive Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#080F0E] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rose-500 text-sm"
                    placeholder="Detail your inquiry or project requirements..."
                  ></textarea>
                </div>

                {error && <p className="text-rose-400 text-xs bg-rose-950/50 p-3 rounded border border-rose-900">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Send Executive Inquiry</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}