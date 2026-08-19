import React, { useState } from 'react';

export default function GatedDemo() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [isFormLocked, setIsFormLocked] = useState(true);
  const [showError, setShowError] = useState(false);

  const technicalArchitectureData = {
    model: 'Supply Chain Multi-Vector Risk Engine (SCMVRE) v4.1',
    sensitiveDataPoints: [
      { key: 'Target Supplier OTIF Baseline', baseline: '95%', raw: 'Redacted (92.3%)', justification: 'Requires Operational context' },
      { key: 'Weighted Trajectory Decay Rate', equation: 'λ = redacted * (1 + dt)', raw: '0.045 / day', justification: 'Core predictive IP' },
      { key: 'Singapore Cold Storage Zone Thermal Integrity Data (Redacted Raw Records)', justification: 'Frontline operational records' }
    ],
    infrastructure: 'Vercel Edge Functions, Sanity CMS API v2.0, Next.js App Router (Gated on /locked-demo route)'
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitLead = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.company) {
      setShowError(false);
      setIsFormLocked(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-6 flex items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Prototype 2 of 2
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Recruiter Gated Content & Lead Capture System
            </h1>
            <p className="text-slate-400 mt-2 text-sm md:text-base">
              Functional demonstration of active lead generation: Converting platform traffic into validated recruiter contact records.
            </p>
          </div>
          <button 
            onClick={() => setIsFormLocked(true)} 
            className="text-emerald-400 hover:text-emerald-300 text-xs flex items-center gap-1.5 whitespace-nowrap bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg"
          >
            Reset Demo
          </button>
        </div>

        {/* Form & Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Left Column: The Form */}
          <div className="md:col-span-1 space-y-6">
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
              <h3 className="text-lg font-semibold text-white mb-2">Recruiter Access Request</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                To view technical architecture models and unredacted operational data, hiring managers and partners must submit professional contact information.
              </p>

              {isFormLocked ? (
                <form onSubmit={handleSubmitLead} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Full Name</label>
                    <input type="text" name="name" placeholder="E.g., John Smith" value={formData.name} onChange={handleInputChange} required className="w-full px-3.5 py-2.5 bg-slate-800 rounded-lg border border-slate-700 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"/>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Professional Email Address</label>
                    <input type="email" name="email" placeholder="john.smith@company.com" value={formData.email} onChange={handleInputChange} required className="w-full px-3.5 py-2.5 bg-slate-800 rounded-lg border border-slate-700 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"/>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Company / Recruiting Firm</label>
                    <input type="text" name="company" placeholder="E.g., Global Logistics Partners" value={formData.company} onChange={handleInputChange} required className="w-full px-3.5 py-2.5 bg-slate-800 rounded-lg border border-slate-700 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"/>
                  </div>
                  {showError && <p className="text-rose-400 text-xs">Please complete all fields to proceed.</p>}
                  
                  <button type="submit" className="w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-3 rounded-lg transition duration-200">
                    Submit Access Request & View Content
                  </button>
                  <p className="text-[11px] text-slate-600 text-center px-4">
                    Data handling protocol: Information collected here will simulate triggering automated CRM / Lead notifications.
                  </p>
                </form>
              ) : (
                <div className="p-6 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-2xl font-bold">✓</div>
                  <h4 className="font-semibold text-emerald-300">Lead Simulation Complete</h4>
                  <p className="text-sm text-emerald-400/90 leading-relaxed px-1">
                    Contact data validated for <strong>{formData.name || 'John Smith'}</strong> ({formData.email || 'john@company.com'}) at <strong>{formData.company || 'Logistics Co'}</strong>.
                  </p>
                  <p className="text-xs text-slate-500 pt-2 border-t border-emerald-800">
                    In production, this triggers automated SendGrid & CRM notifications directly to your email.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: The Content Area */}
          <div className="md:col-span-2 space-y-6">
            <div className={`p-6 rounded-xl border relative transition-all duration-300 ${
              isFormLocked ? 'bg-slate-900 border-rose-800/60' : 'bg-slate-900 border-slate-800'
            }`}>
              
              <div className={isFormLocked ? 'opacity-20 blur-sm pointer-events-none' : ''}>
                <div className="flex items-center gap-3 mb-5 border-b border-slate-800 pb-4">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded">Locked Operational Excellence Assets</span>
                  <span className="text-sm text-slate-300 font-semibold">{technicalArchitectureData.model}</span>
                </div>
                
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-3">Unredacted Data Points & Specifications</h4>
                <div className="space-y-3">
                  {technicalArchitectureData.sensitiveDataPoints.map((item, index) => (
                    <div key={index} className="p-4 rounded-lg bg-slate-800 border border-slate-700/50 space-y-1">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-semibold text-white">{item.key}</span>
                        {item.baseline && <span className="text-xs text-slate-400 font-mono">Baseline: {item.baseline}</span>}
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-700">
                        <span className="font-mono text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded">{item.raw || item.equation}</span>
                        <span className="text-slate-500 italic">{item.justification}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-5 border-t border-slate-800 text-xs text-slate-500 font-mono leading-relaxed">
                  [Technical Stack Overview]: {technicalArchitectureData.infrastructure}
                </div>
              </div>

              {/* Locked Overlay */}
              {isFormLocked && (
                <div className="absolute inset-0 bg-slate-950/80 rounded-xl flex items-center justify-center backdrop-blur-xs">
                  <div className="text-center p-8 bg-slate-900 rounded-xl border border-rose-500/30 shadow-2xl shadow-rose-950/30 space-y-3">
                    <div className="text-rose-400 text-4xl">🔒</div>
                    <h3 className="font-bold text-white">Confidential Technical Data Restricted</h3>
                    <p className="text-slate-400 text-sm max-w-sm">
                      Detailed risk models, Singapore Cold Storage data, and core predictive analytics require confirmed recruiter validation via the form.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Value Proposition Box */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 space-y-2">
          <div className="font-semibold text-slate-300 uppercase tracking-wider mb-1">
            Lead Capture System Proposition (Phase 2 Development)
          </div>
          <p>
            The gated area demonstrated here automatically captures and validates high-intent hiring managers. By integrating professional email validation APIs and automated SendGrid notifications, this model proactively converts platform traffic into real-time leads delivered directly to your inbox.
          </p>
        </div>

      </div>
    </div>
  );
}