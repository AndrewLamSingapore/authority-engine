import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ShieldAlert, 
  Thermometer,
  BookOpen
} from 'lucide-react';

const insightData = {
  'control-tower': {
    title: 'Supply Chain Control Tower: Early-Warning Operational Analytics',
    category: 'Case Studies',
    date: 'August 2026',
    readTime: '6 min read',
    author: 'Lam Teck Sing Andrew',
    icon: ShieldAlert,
    overview: 'In high-volume supply chains, relying solely on standard Red/Amber/Green (RAG) threshold alerts leaves operational leaders blind to compounded risks.',
    keyTakeaways: [
      'Weighted risk scoring: Inventory cover (35%), Supplier performance trajectory (25%), Backlog velocity (20%).',
      'Built using SQL diagnostic views, Python statistical profiling, and interactive Power BI drill-down cards.',
      'Proven lead-time improvement: 24 days early warning prior to order fulfillment failures.'
    ],
    content: `Standard supply chain dashboards often fail because they trigger alerts only after critical thresholds are breached. To shift from reactive firefighting to predictive intervention, we designed a multi-echelon control tower architecture that evaluates lead-time variance, supplier reliability, and order backlog trends in real time.\n\nBy aggregating telemetry across warehouse management systems (WMS) and ERP databases, the system generates automated risk scores prior to inventory stockouts.`
  },
  'hidden-economics': {
    title: 'The Hidden Economics of Cold-Chain Operations',
    category: 'Analysis',
    date: 'July 2026',
    readTime: '8 min read',
    author: 'Lam Teck Sing Andrew',
    icon: Thermometer,
    overview: 'Cold-chain management is often treated purely as a temperature compliance function, but micro-fluctuations directly impact gross margins.',
    keyTakeaways: [
      'Temperature drift analytics to reduce perishable write-offs by up to 18%.',
      'Integration of IoT sensor streams with real-time route optimization.',
      'Dynamic thermal staging for high-density cold storage hubs.'
    ],
    content: `Maintaining temperature integrity requires balancing energy expenditure with strict storage thresholds. Slight temperature deviations during loading transitions can dramatically reduce product shelf life without triggering immediate quality control rejections.\n\nImplementing predictive thermal monitoring enables automated airflow adjustments and proactive staging before product integrity is compromised.`
  },
  'sop-automation': {
    title: 'Building Standardized Workflows in High-Turnover Logistics Environments',
    category: 'Building in Public',
    date: 'June 2026',
    readTime: '4 min read',
    author: 'Lam Teck Sing Andrew',
    icon: BookOpen,
    overview: 'High warehouse staff turnover creates operational variability. Standardized digital SOPs eliminate tribal knowledge dependencies.',
    keyTakeaways: [
      'Interactive visual SOP micro-modules embedded directly into scanning hardware.',
      'Onboarding acceleration: Reduced frontline staff ramp-up time by 35%.',
      'Cross-shift auditing checklists to maintain uniform execution across multi-zone facilities.'
    ],
    content: `In rapid-throughput distribution hubs, operational consistency often degrades during shift handovers or seasonal staffing surges. Relying on static binder documentation fails to enforce operational standards on the active warehouse floor.\n\nBy converting paper procedures into step-by-step digital workflows integrated into handheld terminals, staff execute tasks with uniform precision. Automated compliance checkpoints prevent order progression until safety and handling verification steps are confirmed.`
  }
};

export default function SingleInsight() {
  const { slug, id } = useParams();
  const currentKey = slug || id || 'control-tower';
  const insight = insightData[currentKey] || insightData['control-tower'];
  const IconComponent = insight.icon || ShieldAlert;

  return (
    <div className="bg-[#080F0E] text-white min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/insights" 
          className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-8 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Insights
        </Link>

        <header className="mb-10 border-b border-gray-800 pb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span className="bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full flex items-center gap-1.5">
              <IconComponent className="w-3.5 h-3.5" />
              {insight.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-gray-400">
              <Calendar className="w-3.5 h-3.5" /> {insight.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-gray-400">
              <Clock className="w-3.5 h-3.5" /> {insight.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            {insight.title}
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            {insight.overview}
          </p>
        </header>

        <div className="bg-[#0D1816] border border-emerald-900/40 rounded-xl p-6 sm:p-8 mb-10">
          <h2 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Key Takeaways
          </h2>
          <ul className="space-y-3">
            {insight.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start text-gray-300 text-sm leading-relaxed">
                <span className="text-emerald-500 mr-2 font-bold">•</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
          {insight.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-base sm:text-lg text-gray-300">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}