import React from 'react';
import { ArrowRight, ShieldCheck, ChevronRight, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const coreCompetencies = [
    { 
      title: 'Cold-Chain & Thermal Logistics', 
      desc: 'Enforcing strict compliance protocols for temperature-sensitive cargo, perishable goods, and high-value consignments.' 
    },
    { 
      title: 'WMS & Systems Implementation', 
      desc: 'Improving inventory control, verification routines and management visibility across operational workflows.'
    },
    { 
      title: 'Logistics Process Optimization', 
      desc: 'Using root-cause analysis, manpower planning and workflow redesign to reduce avoidable delays and operating conflict.'
    },
    { 
      title: 'Business Intelligence & Analytics', 
      desc: 'Transforming floor execution logs into actionable Power BI dashboards and early-warning operational risk metrics.' 
    }
  ];

  return (
    <div className="bg-[#080F0E] text-slate-100 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Professional Profile Summary */}
        <div className="max-w-4xl mb-16">
          <span className="text-rose-500 font-semibold tracking-wider text-sm uppercase">Professional Profile</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 text-white leading-tight">
            Lam Teck Sing Andrew
          </h1>
          <p className="text-xl text-emerald-400 font-medium mt-2">
            Operations Excellence · Supply Chain · Business Analytics
          </p>
          <p className="mt-6 text-slate-300 text-lg leading-relaxed">
            Andrew brings more than 20 years of hands-on experience across cold-chain warehousing, grocery distribution, container operations and international freight forwarding in Singapore. He combines that operational depth with business and data analytics to turn real workflows into measurable decisions.
          </p>
        </div>

        {/* Core Competencies Grid */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-4">
            Core Professional Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreCompetencies.map((comp, idx) => (
              <div key={idx} className="bg-[#0D1816] border border-slate-800 p-6 rounded-xl hover:border-emerald-800/50 transition-colors">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-rose-500 shrink-0" />
                  {comp.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed pl-7">
                  {comp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Philosophy */}
        <div className="bg-[#0D1816] border border-slate-800 rounded-2xl p-8 sm:p-12 mb-20">
          <h2 className="text-2xl font-bold text-white mb-4">Operational Execution Philosophy</h2>
          <p className="text-slate-300 leading-relaxed mb-6">
            High-performing supply chains depend on clear processes, disciplined execution and early visibility of risk. Andrew's approach is to understand how work happens, identify root causes, improve the workflow and measure the result—using analytics to support operations, not as an end in itself.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-[#080F0E] border border-slate-700/60 px-4 py-3 rounded-lg flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-sm font-medium text-slate-200">Thermal Compliance Governance</span>
            </div>
            <div className="bg-[#080F0E] border border-slate-700/60 px-4 py-3 rounded-lg flex items-center gap-3">
              <BarChart2 className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-sm font-medium text-slate-200">Data-Informed Continuous Improvement</span>
            </div>
          </div>
        </div>

        {/* Navigation CTA */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-slate-800 pt-10">
          <div>
            <h3 className="text-xl font-bold text-white">Explore Operational Insights</h3>
            <p className="text-slate-400 text-sm mt-1">Review tactical case studies and analytical supply chain breakdowns.</p>
          </div>
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View Insights Hub <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
