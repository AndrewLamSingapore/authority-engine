import React from 'react';
import { ArrowRight, Activity, ShieldCheck, BarChart3, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const metrics = [
    { label: 'Operations Experience', value: '20+ years', note: 'Logistics, warehousing and supply chain' },
    { label: 'Live Container Jobs', value: '391', note: 'Across seven reporting periods' },
    { label: 'Recorded Revenue Analysed', value: 'S$75,720', note: 'Anonymised operational dataset' },
    { label: 'Cold-Chain Records', value: '1,800', note: 'Synthetic risk-intelligence dataset' }
  ];

  const coreFocus = [
    {
      title: 'Operational Excellence',
      desc: 'Eliminating bottleneck congestion through standardized operational procedures and real-time floor monitoring.'
    },
    {
      title: 'Cold-Chain Integrity',
      desc: 'Enforcing strict thermal compliance thresholds to safeguard high-value temperature-sensitive cargo.'
    },
    {
      title: 'Data-Driven Optimization',
      desc: 'Translating warehouse activity logs into actionable Power BI dashboards to drive continuous improvement.'
    }
  ];

  return (
    <div className="bg-[#080F0E] text-slate-100 min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/50 text-emerald-400 text-xs font-medium mb-6">
            <Activity className="w-3.5 h-3.5 text-rose-500" />
            <span>Operations Excellence · Supply Chain · Analytics</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Turning operational experience into <span className="text-rose-500">measurable decisions</span>.
          </h1>
          <p className="mt-6 text-xl text-slate-400 leading-relaxed max-w-3xl">
            I combine more than 20 years of hands-on logistics and warehouse experience with Power BI and business analytics to improve execution, visibility and decision-making.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View Professional Profile <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 bg-[#0D1816] hover:bg-slate-800 text-slate-200 border border-slate-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View Insights Hub
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 bg-[#0B1412] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((m, idx) => (
              <div key={idx} className="bg-[#0D1816] p-6 rounded-xl border border-emerald-900/30">
                <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 mb-2">{m.value}</div>
                <div className="text-white font-semibold text-base">{m.label}</div>
                <div className="text-slate-400 text-xs mt-1">{m.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Focus Areas */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white">Operational Capabilities</h2>
          <p className="text-slate-400 mt-4">Practical execution, process improvement and evidence-based management reporting.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreFocus.map((item, idx) => (
            <div key={idx} className="bg-[#0D1816] border border-slate-800 p-8 rounded-xl hover:border-rose-900/50 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-950/40 via-[#0D1816] to-rose-950/30 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Looking for operations experience that works with data?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Let us connect about Operations Excellence, Process Improvement, Supply Chain Analytics, Operations Analysis, or Warehouse and Logistics Operations opportunities in Singapore.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-8 py-3.5 rounded-lg transition-colors"
          >
            Discuss an Opportunity <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
