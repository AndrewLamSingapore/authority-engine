import React from 'react';
import { ArrowRight, Activity, ShieldCheck, BarChart3, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const metrics = [
    { label: 'Container Unloading Efficiency', value: '10–20%', note: 'Reduction in turn-around time' },
    { label: 'Cold-Chain Value Handled', value: 'S$500k+', note: 'Per high-risk consignment' },
    { label: 'SKU Inventory Scale', value: '800–2,000', note: 'Managed across multi-zone facilities' },
    { label: 'Market Footprint', value: '5–10', note: 'Regional forwarding destinations' }
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
            <span>Operations & Supply Chain Leadership</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Building Resilient Operations through <span className="text-rose-500">Data & Execution</span>.
          </h1>
          <p className="mt-6 text-xl text-slate-400 leading-relaxed max-w-3xl">
            Executive leadership in cold-chain logistics, warehouse management systems, and workflow optimization across high-volume environments.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Executive Profile <ArrowRight className="w-4 h-4" />
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
          <h2 className="text-3xl font-bold text-white">Strategic Operational Capabilities</h2>
          <p className="text-slate-400 mt-4">Focused on systemic reliability, floor safety, and measurable throughput.</p>
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to optimize operational workflows?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Let us connect to discuss supply chain resilience, warehouse management systems, or continuous improvement initiatives.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-8 py-3.5 rounded-lg transition-colors"
          >
            Initiate Contact <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}