import { useState } from 'react';
import { MapPin, ExternalLink, Send, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';

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

  // Your Formspree Form ID
  const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || 'xeeybkjp';

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
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.error || 'Failed to send inquiry. Please try again or connect via LinkedIn.');
      }
    } catch (err) {
      setError('Network error. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* 1. HEADER SECTION */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-xs font-semibold text-brand-accent uppercase tracking-wider">
          Direct Engagement
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Connect with Andrew
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          Open to discussions on operational excellence leadership, cold-chain and supply chain transformation, or high-impact process analytics consulting.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        
        {/* 2. LEFT COLUMN: DIRECT CONTACT CARDS */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-brand-slate border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-brand-accent" />
              <span>Contact & Channels</span>
            </h2>

            <div className="space-y-4 text-sm">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-brand-gold uppercase tracking-wider">Professional Profile</div>
                <div className="text-white font-medium">LinkedIn Network</div>
                <a
                  href="https://www.linkedin.com/in/lam-teck-sing-andrew-79886719?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent hover:text-blue-400 transition-colors pt-1"
                >
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-brand-accent" />
                  <span>Base Location</span>
                </div>
                <div className="text-white font-semibold text-base pt-1">Singapore</div>
                <div className="text-xs text-slate-400">Available for regional and global remote engagement</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Engagement Areas</div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                    <span>Supply Chain & Cold-Chain Leadership</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                    <span>Process & Workflow Optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                    <span>Business Intelligence & Dashboard Architecture</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 3. RIGHT COLUMN: EXECUTIVE INQUIRY FORM */}
        <div className="lg:col-span-7">
          <div className="bg-brand-slate border border-slate-800 rounded-2xl p-6 sm:p-8">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Received</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Your inquiry has been logged and sent directly to Andrew.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg border border-slate-700 transition-colors mt-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Send an Executive Inquiry</h2>
                  <p className="text-xs text-slate-400">Fill out the details below to initiate a direct inquiry.</p>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                    {error}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Your Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Tan"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. sarah@organization.com"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Company / Organization</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Global Cold Chain Logistics"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Inquiry Nature</label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-accent transition-colors"
                    >
                      <option value="Operational Leadership Role">Operational Leadership Role</option>
                      <option value="Continuous Improvement Consulting">Continuous Improvement Consulting</option>
                      <option value="Analytics & BI Dashboard Project">Analytics & BI Dashboard Project</option>
                      <option value="General Professional Networking">General Professional Networking</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Message / Opportunity Overview *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your team's operational context, mandate, or inquiry..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-brand-accent hover:bg-blue-600 disabled:bg-slate-700 text-white font-semibold text-xs rounded-lg transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}