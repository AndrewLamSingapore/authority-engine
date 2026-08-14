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

// Sanity Client Setup
const client = createClient({
  projectId: 'h3pl1rfx',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

export default function SingleInsight() {
  const { slug, id } = useParams();
  const currentKey = slug || id;

  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentKey) {
      setLoading(false);
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

          setInsight({
            title: data.title,
            category: data.category || 'Case Studies',
            date: formattedDate,
            readTime: data.readTime || '5 min read',
            author: 'Lam Teck Sing Andrew',
            overview: data.excerpt || '',
            keyTakeaways: data.keyTakeaways || [],
            content: extractedContent,
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
      <div className="bg-[#080F0E] text-white min-h-[70vh] pt-28 pb-20 px-4 flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-extrabold text-rose-500 mb-3">404</h1>
        <h2 className="text-2xl font-bold mb-2">Article Not Found</h2>
        <p className="text-gray-400 mb-6 max-w-md">
          The requested article standard could not be located on Sanity CMS.
        </p>
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Insights
        </Link>
      </div>
    );
  }

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
  );
}