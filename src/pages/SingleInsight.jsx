import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ShieldAlert
} from 'lucide-react';
import SEO from '../components/SEO';
import { articleQuery, fetchPublishedContent, normalizeArticle } from '../lib/insights';

export default function SingleInsight() {
  const { slug } = useParams();
  const [result, setResult] = useState({ slug: null, insight: null, error: false });
  const [attempt, setAttempt] = useState(0);
  const loading = result.slug !== slug;
  const { insight, error } = result;

  useEffect(() => {
    const controller = new AbortController();
    fetchPublishedContent(articleQuery, { slug }, { signal: controller.signal })
      .then((data) => {
        if (!controller.signal.aborted) setResult({ slug, insight: normalizeArticle(data, slug), error: false });
      })
      .catch(() => {
        if (!controller.signal.aborted) setResult({ slug, insight: null, error: true });
      });
    return () => controller.abort();
  }, [slug, attempt]);

  const retry = () => {
    setResult({ slug: null, insight: null, error: false });
    setAttempt((value) => value + 1);
  };

  if (loading) {
    return (
      <div className="bg-[#080F0E] text-white min-h-screen pt-28 pb-20 px-4 flex justify-center items-center">
        <SEO title="Loading insight" description="Loading the selected article." />
        <p role="status" className="text-emerald-400 font-medium text-sm">Loading insight...</p>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <SEO title="Insight temporarily unavailable" description="Please try loading this article again." noindex />
        <div className="bg-[#080F0E] text-white min-h-[70vh] pt-28 pb-20 px-4 flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl font-bold">This article could not load.</h1>
          <p role="alert" className="text-gray-400 mt-4 mb-6 max-w-md">The content service is temporarily unavailable. Try again, or explore the other evidence.</p>
          <button type="button" onClick={retry} className="premium-button rounded-full px-6 py-3">Try again</button>
          <Link to="/insights" className="mt-6 text-emerald-300">Back to Insights</Link>
        </div>
      </>
    );
  }

  if (!insight) {
    return (
      <>
        <SEO title="404 - Article Not Found" description="The requested article could not be located." noindex />
        <div className="bg-[#080F0E] text-white min-h-[70vh] pt-28 pb-20 px-4 flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-extrabold text-rose-500 mb-3">404</h1>
          <h2 className="text-2xl font-bold mb-2">Article Not Found</h2>
          <p className="text-gray-400 mb-6 max-w-md">
            This article may have moved or is no longer published.
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
      <SEO title={insight.title} description={insight.overview} type="article" />
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
          <aside className="mt-12 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white">What would this change in your operation?</h2>
            <p className="mt-3 text-gray-400">Bring a bottleneck, a decision or an idea. We can explore which part of this approach fits your situation.</p>
            <Link to="/contact?source=authority-engine&intent=collaboration" state={{ message: `I read “${insight.title}” and would like to discuss how the approach could apply to my situation.` }} className="premium-button mt-5 inline-flex rounded-full px-6 py-3 font-semibold">Discuss this idea</Link>
          </aside>
        </div>
      </div>
    </>
  );
}
