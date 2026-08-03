import { ArrowRight, FileText, Activity, CheckCircle2, ShieldAlert, Thermometer, ExternalLink, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const featuredProjects = [
    {
      id: 'control-tower',
      title: 'Supply Chain Control Tower: Early-Warning Analytics',
      badge: '24-Day Lead Time Warning',
      icon: ShieldAlert,
      category: 'Early Warning & Risk Analytics',
      description: 'An operational risk detection engine that flags supplier deterioration, inventory depletion, and backlog velocity before conventional red/amber/green KPIs breach thresholds.',
      impacts: [
        'Surfaced operational risks 24 days before conventional critical threshold[cite: 2.',
        'Weighted risk scoring: Inventory cover (35%), Supplier performance (25%), Backlog & Trajectory[cite: 2.',
        'Built with Python, SQL, and Power BI decomposition trees for instant management drill-down.'
      ,
      tech: ['Power BI', 'Python', 'SQL', 'Risk Modeling',
      link: '/insights/control-tower'
    },
    {
      id: 'cold-chain-dashboard',
      title: 'Cold Chain Risk Intelligence Dashboard',
      badge: '1,800 Operational Records',
      icon: Thermometer,
      category: 'Temperature Compliance & Quality Control',
      description: 'Analysed 1,800 operational records across six warehouse zones to surface temperature compliance breaches and processing bottlenecks grounded in frontline cold-chain experience.',
      impacts: [
        'Automated door-open duration alerts for high-risk temperature zones[cite: 1.',
        'Optimised peak-shift manpower deployment and preventive maintenance triggers[cite: 1.',
        'Integrated diagnostic SQL queries with interactive Power BI executive reporting.'
      ,
      tech: ['Power BI', 'SQL', 'Python', 'Logistics Ops',
      link: '/insights/cold-chain-dashboard'
    }
  ;

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-brand-accent/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Executive Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>BCG RISE Data Analytics | 20+ Years Supply Chain & Logistics[cite: 1</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Driving <span className="text-brand-accent">Operational Excellence</span> Through Data-Enabled Improvement
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                Bridging two decades of frontline cold-chain, warehousing, and logistics execution with modern Power BI, SQL, and Python analytics to eliminate friction and catch operational risks before standard KPIs fail[cite: 1, 2.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/insights"
                  className="px-6 py-3.5 bg-brand-accent hover:bg-blue-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
                >
                  <span>Explore Case Studies</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/about"
                  className="px-6 py-3.5 bg-brand-slate hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold rounded-lg transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span>Read Career Story</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Operational Capabilities */}
            <div className="lg:col-span-5">
              <div className="bg-brand-slate/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-accent/10 rounded-full blur-2xl" />
                
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2.5">
                  <Activity className="w-5 h-5 text-brand-accent" />
                  <span>Core Operational Capabilities</span>
                </h2>

                <div className="space-y-4">
                  {[
                    { title: "Root-Cause Diagnosis", desc: "Tracing recurring warehouse and cold-chain bottlenecks to underlying processes[cite: 1." },
                    { title: "Early-Warning Risk Systems", desc: "Flagging inventory and supplier risks before conventional RAG KPIs fail[cite: 1." },
                    { title: "Workflow & KPI Optimization", desc: "Eliminating delay, rework, and manpower conflicts in high-volume environments[cite: 1, 2." },
                    { title: "Data Integrity & Analytics", desc: "Ensuring clean source data before building decision-ready executive dashboards[cite: 1." }
                  .map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
                      <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PROVEN IMPACT METRICS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: "Operations Leadership", value: "20+ Yrs", sub: "Cold Chain, Logistics & Freight[cite: 1" },
            { label: "Inventory Accuracy", value: "98–99.5%", sub: "Sustained across high-volume SKUs[cite: 1, 2" },
            { label: "Early Risk Lead Time", value: "24 Days", sub: "Control Tower warning detection[cite: 2" },
            { label: "Bottleneck Reduction", value: "10–20%", sub: "Reduced container waiting times[cite: 1, 2" },
          .map((metric, idx) => (
            <div key={idx} className="bg-brand-slate border border-slate-800 rounded-xl p-5 sm:p-6 text-center hover:border-slate-700 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-accent tracking-tight mb-1">
                {metric.value}
              </div>
              <div className="text-sm font-bold text-white mb-1">{metric.label}</div>
              <div className="text-xs text-slate-400">{metric.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PORTFOLIO PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-800">
          <div>
            <div className="text-brand-accent text-xs font-bold tracking-widest uppercase mb-2">Applied Decision Systems</div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Featured Operational Analytics Projects</h2>
          </div>
          <Link
            to="/insights"
            className="mt-4 md:mt-0 text-sm font-semibold text-brand-accent hover:text-blue-400 flex items-center gap-1.5 transition-colors"
          >
            <span>View All Insights & Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {featuredProjects.map((project) => {
            const IconComponent = project.icon;
            return (
              <div
                key={project.id}
                className="bg-brand-slate/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all hover:shadow-xl group"
              >
                <div>
                  {/* Card Top Row */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-brand-accent/10 border border-brand-accent/30 text-brand-accent">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/30">
                      {project.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-accent transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Impact Bullets */}
                  <div className="space-y-2.5 mb-6 bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
                    {project.impacts.map((impact, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0" />
                        <span>{impact}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Pills & CTA */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700/60">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={project.link}
                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                  >
                    <span>View Case Study Breakdown</span>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}