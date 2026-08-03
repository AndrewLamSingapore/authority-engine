export default function Hero() {
  return (
    <section className="w-full bg-botanical border-b border-botanical-border py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Subtitle */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-botanical-card border border-singapore-teal/30 text-xs font-medium text-singapore-teal">
              <span className="w-2 h-2 rounded-full bg-singapore-teal animate-pulse"></span>
              <span>BCG RISE Data Analytics | 20+ Years Supply Chain & Logistics</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Driving <span className="text-singapore-crimson">Operational Excellence</span> Through Data-Enabled Improvement
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
              Bridging two decades of frontline cold-chain, warehousing, and logistics execution with modern Power BI, SQL, and Python analytics.
            </p>
          </div>

          {/* Right Column: Core Capabilities Card Container */}
          <div className="lg:col-span-5 bg-botanical-card border border-botanical-border p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-slate-100 mb-6">
              Core Operational Capabilities
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-botanical/60 border border-botanical-border">
                <h4 className="font-semibold text-slate-100 text-sm">Root-Cause Diagnosis</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Tracing recurring warehouse and cold-chain bottlenecks to underlying processes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-botanical/60 border border-botanical-border">
                <h4 className="font-semibold text-slate-100 text-sm">Early-Warning Risk Systems</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Flagging inventory and supplier risks before conventional RAG KPIs fail.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-botanical/60 border border-botanical-border">
                <h4 className="font-semibold text-slate-100 text-sm">Workflow & KPI Optimization</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Eliminating delay, rework, and manpower conflicts in high-volume environments.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}