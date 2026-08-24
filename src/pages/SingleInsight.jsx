import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ShieldAlert
} from 'lucide-react';
import { createClient } from '@sanity/client';
import SEO from '../components/SEO';

const client = createClient({
  projectId: 'h3pl1rfx',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

const controlledArticles = {
  'the-hidden-cost-of-inefficient-warehouse-logistics': {
    overview: 'Experience-based operational ranges drawn from anonymised career records. They are not independently audited benchmarks and remain subject to source-led verification.',
    keyTakeaways: [
      'Grocery logistics: experience-based ranges of 20–40 daily deliveries and 800–2,000 SKUs',
      'International freight: experience-based ranges of 15–30 weekly shipments and 95–99% on-time performance',
      'Maxwell Excel: current container operations are supported by an anonymised 391-job operating dataset',
    ],
    content: 'Evidence boundary\n\nThe figures in this article are experience-based operational ranges reconstructed from anonymised career records. They are not independently audited benchmarks. Use them as structured evidence for discussion, not as guaranteed or universally applicable performance claims.\n\nOperational context\n\nHigh-volume distribution requires close coordination of container scheduling, manpower deployment, shipment documentation and stock accuracy. The ranges illustrate the scale and decision environment across grocery distribution, international freight and container operations.\n\nVerification rule\n\nAny range used in a résumé, interview or commercial claim must be supported by the strongest available source record. Where that source is unavailable, the range remains experience-based rather than verified.'
  },
  'supply-chain-control-tower-early-warning-system': {
    overview: 'AI-assisted synthetic demonstration of a weighted-rule early-warning method. The 24-day result comes from an engineered scenario, not a trained predictive model or measured production outcome.',
    keyTakeaways: [
      'Synthetic weighting: 35% inventory cover, 25% supplier performance, 20% backlog and 20% trajectory risk',
      'Scenario lead time: the engineered test surfaced a warning 24 days before its configured threshold breach',
      'Method demonstration: Python, SQL and Power BI-ready decision reporting',
    ],
    content: 'Evidence boundary\n\nThis is an AI-assisted synthetic demonstration. Its inputs and deterioration path were engineered to test an inspectable weighted-rule method. The 24-day warning is a scenario result; it is not a trained or validated predictive model, an employer deployment or a measured production outcome.\n\nMethod\n\nThe demonstration combines four synthetic vectors: inventory cover at 35%, supplier performance at 25%, backlog risk at 20% and trajectory risk at 20%. The rule set is designed to make each contribution inspectable and to show how weak signals can be combined before a conventional red, amber or green threshold changes.\n\nDecision use\n\nPower BI-ready decomposition and drill-through views illustrate how a manager could inspect the score and choose an intervention. Real deployment would require governed source data, back-testing, calibration, monitoring and documented decision ownership.'
  },
  'cold-chain-risk-intelligence-and-performance-analytics': {
    overview: 'AI-assisted synthetic demonstration using 1,800 generated records across six warehouse zones. It illustrates analysis and decision-support design, not employer deployment or measured production impact.',
    keyTakeaways: [
      'Synthetic dataset: 1,800 generated records across six warehouse zones',
      'Illustrated triggers: door-open duration, thermal integrity, processing delay and shift review',
      'Demonstration stack: SQL, Python and Power BI-ready reporting',
    ],
    content: 'Evidence boundary\n\nThis is an AI-assisted synthetic demonstration built from 1,800 generated records across six warehouse zones. The records are not employer data. The alerts, staffing reviews and maintenance triggers illustrate an analytical method; they are not deployed controls or measured production outcomes.\n\nAnalytical method\n\nThe demonstration checks data quality and explores temperature compliance, processing duration and shift-level patterns. It shows how door-open duration, thermal integrity and processing delay could be organised into inspectable management signals.\n\nDeployment boundary\n\nA real cold-chain implementation would require validated sensors and source systems, site-specific thresholds, quality and safety ownership, change control, false-alert monitoring and evidence that interventions improve outcomes without creating new risk.'
  }
};

export default function SingleInsight() {
  const { slug, id } = useParams();
  const currentKey = slug || id;

  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentKey) {
      Promise.resolve().then(() => setLoading(false));
      return;
    }

    const query = `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      category,
      publishedAt,
      readTime,
      excerpt,
      keyTakeaways,
      content,
      body
    }`;

    client
      .fetch(query, { slug: currentKey })
      .then((data) => {
        if (data && data.title) {
          const formattedDate = data.publishedAt
            ? new Date(data.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })
            : 'Recent';

          let extractedContent = '';
          if (typeof data.content === 'string') {
            extractedContent = data.content;
          } else if (typeof data.body === 'string') {
            extractedContent = data.body;
          } else if (Array.isArray(data.body)) {
            extractedContent = data.body
              .map((block) => block.children?.map((child) => child.text).join('') || '')
              .filter(Boolean)
              .join('\n\n');
          } else {
            extractedContent = data.excerpt || '';
          }

          const controlled = controlledArticles[currentKey];
          setInsight({
            title: data.title,
            category: data.category || 'Case Studies',
            date: formattedDate,
            readTime: data.readTime || '5 min read',
            author: 'Lam Teck Sing Andrew',
            overview: controlled?.overview || data.excerpt || '',
            keyTakeaways: controlled?.keyTakeaways || data.keyTakeaways || [],
            content: controlled?.content || extractedContent,
            controlled: Boolean(controlled),
          });
        } else {
          setInsight(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Sanity single post fetch error:', err);
        setInsight(null);
        setLoading(false);
      });
  }, [currentKey]);

  if (loading) {
    return (
      <div className="bg-[#080F0E] text-white min-h-screen pt-28 pb-20 px-4 flex justify-center items-center">
        <p className="text-emerald-400 font-medium text-sm">Loading insight...</p>
      </div>
    );
  }

  if (!insight) {
    return (
      <>
        <SEO title="404 - Article Not Found" description="The requested article could not be located." />
        <div className="bg-[#080F0E] text-white min-h-[70vh] pt-28 pb-20 px-4 flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-extrabold text-rose-500 mb-3">404</h1>
          <h2 className="text-2xl font-bold mb-2">Article Not Found</h2>
          <p className="text-gray-400 mb-6 max-w-md">
            The requested article standard could not be located on Sanity CMS.
          </p>
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors focus:ring-2 focus:ring-emerald-400 focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title={insight.title} description={insight.overview} />
      <div className="bg-[#080F0E] text-white min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/insights" 
            className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-8 transition-colors text-sm font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Insights
          </Link>

          <header className="mb-10 border-b border-gray-800 pb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span className="bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
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

          {insight.controlled && (
            <div className="bg-amber-300/[0.06] border border-amber-300/25 rounded-xl p-5 sm:p-6 mb-8 text-sm leading-relaxed text-amber-100">
              <strong className="text-amber-300">Evidence boundary:</strong> This page uses controlled, disclosure-first copy so synthetic demonstrations and experience-based ranges cannot be mistaken for audited production results.
            </div>
          )}

          {insight.keyTakeaways && insight.keyTakeaways.length > 0 && (
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
          )}

          <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
            {insight.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-base sm:text-lg text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
