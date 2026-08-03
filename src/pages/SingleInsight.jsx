import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, CheckCircle2, ShieldAlert, Thermometer, TrendingUp, BookOpen } from 'lucide-react';

export default function SingleInsight() {
  const { id } = useParams();

  const insightData = {
    'control-tower': {
      title: 'Supply Chain Control Tower: Early-Warning Operational Analytics',
      category: 'Case Studies',
      date: 'August 2026',
      readTime: '6 min read',
      author: 'Lam Teck Sing Andrew',
      icon: ShieldAlert,
      overview: 'In high-volume supply chains, relying solely on standard Red/Amber/Green (RAG) threshold alerts leaves management reacting after the damage is done. This case study details an operational early-warning model that identifies risks up to 24 days in advance.',
      keyTakeaways: [
        'Weighted risk scoring: Inventory cover (35%), Supplier performance trajectory (25%), Backlog velocity (25%), Lead time volatility (15%).',
        'Built using SQL diagnostic views, Python statistical profiling, and interactive Power BI drill-down cards.',
        'Proven lead-time improvement: 24 days early warning prior to order fulfillment failures.'
      ,
      content: `
        ### The Operational Challenge
        Conventional dashboards show when an inventory line has already breached zero or when a shipment is already late. For operations teams, that is a post-mortem, not a control system.

        ### The Analytical Architecture
        By aggregating daily transaction logs across warehouse management systems (WMS) and supplier freight manifests, we constructed a unified composite risk index. 

        Rather than waiting for stock levels to hit minimum reorder points, the model tracks slope degradation in inventory velocity alongside supplier lead-time variance.

        ### Business Outcome
        The resulting Power BI control tower provides leadership with instant visibility into hidden operational bottlenecks, allowing proactive reallocation of manpower and stock prior to customer SLA impacts.
      `
    },
    'cold-chain-dashboard': {
      title: 'Cold Chain Risk Intelligence Dashboard',
      category: 'Case Studies',
      date: 'July 2026',
      readTime: '5 min read',
      author: 'Lam Teck Sing Andrew',
      icon: Thermometer,
      overview: 'In cold storage and perishables, temperature compliance failures directly mean inventory destruction. This project analyzes 1,800 operational sensor and workflow logs to catch compliance vulnerabilities.',
      keyTakeaways: [
        'Analyzed 1,800 operational records across six warehouse cold zones.',
        'Isolated door-open duration breaches during peak shift transitions.',
        'Implemented preventive maintenance triggers and adjusted shift loading schedules.'
      ,
      content: `
        ### The Operational Challenge
        Temperature excursions in pharmaceutical and cold-chain logistics often stem not from compressor failures, but from operational habits—such as loading dock doors left open during shift changes.

        ### Root-Cause Breakdown
        By querying temporal sensor data in SQL, we correlated temperature spikes directly with shift changeover timestamps. 

        ### Systemic Solution
        We established automated door-open duration thresholds in Power BI and redesigned dock staging protocols, reducing excursions without requiring capital expenditure on new refrigeration hardware.
      `
    }
  };

  const article = insightData[id || {
    title: 'Operational Excellence Insight Article',
    category: 'Article',
    date: '2026',
    readTime: '5 min read',
    author: 'Lam Teck Sing Andrew',
    icon: BookOpen,
    overview: 'In-depth analysis and execution notes from frontline supply chain operations.',
    keyTakeaways: ['Root-cause diagnosis over surface fixes', 'Actionable metrics over decorative vanity KPIs',
    content: 'Detailed content breakdown for this article is being updated.'
  };

  const IconComponent = article.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Top Navigation */}
      <Link
        to="/insights"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-brand-accent transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Insights Hub</span>
      </Link>

      {/* Article Header */}
      <div className="space-y-6 pb-8 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="font-semibold text-brand-accent px-3 py-1 rounded bg-brand-accent/10 border border-brand-accent/20">
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            {article.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {article.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-brand-accent font-bold text-sm">
              LA
            </div>
            <div>
              <div className="text-sm font-bold text-white">{article.author}</div>
              <div className="text-xs text-slate-400">Continuous Improvement & Analytics Leader</div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Highlight Box */}
      <div className="bg-brand-slate border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-sm font-bold text-brand-gold uppercase tracking-wider flex items-center gap-2">
          <IconComponent className="w-4 h-4" />
          <span>Executive Summary</span>
        </h2>
        <p className="text-slate-200 text-sm leading-relaxed font-medium">
          {article.overview}
        </p>

        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">Key Operational Metrics & Takeaways</div>
          {article.keyTakeaways.map((takeaway, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
              <span>{takeaway}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Body Text Layout */}
      <div className="prose prose-invert max-w-none space-y-6 text-slate-300 text-sm leading-relaxed">
        {article.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.trim().startsWith('###')) {
            return (
              <h3 key={idx} className="text-xl font-bold text-white pt-4 pb-1 border-b border-slate-800">
                {paragraph.replace('###', '').trim()}
              </h3>
            );
          }
          return <p key={idx}>{paragraph.trim()}</p>;
        })}
      </div>

      {/* Footer Navigation */}
      <div className="pt-8 border-t border-slate-800 flex justify-between items-center">
        <Link
          to="/insights"
          className="text-xs font-semibold text-brand-accent hover:underline flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Explore all case studies & insights</span>
        </Link>
      </div>

    </div>
  );
}