// Deployed build update
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Clock } from 'lucide-react';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'h3pl1rfx',
  dataset: 'production',
  useCdn: false, // Set to false to bypass CDN caching
  apiVersion: '2024-01-01',
});

export default function Insights() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Case Studies',
    'The Hidden Economics of Business',
    'Building in Public',
  ];

  useEffect(() => {
    const query = `*[_type == "post"] | order(publishedAt desc){
      _id,
      title,
      "slug": slug.current,
      category,
      publishedAt,
      readTime,
      excerpt
    }`;

    client
      .fetch(query)
      .then((sanityData) => {
        // Strictly set Sanity CMS data; no hardcoded fallbacks or array merging
        setArticles(sanityData || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Sanity fetch error:', err);
        setArticles([]);
        setLoading(false);
      });
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-6 py-12 max-w-7xl mx-auto pt-24">
      {/* Header */}
      <div className="mb-10">
        <span className="text-amber-500 font-semibold tracking-wider text-sm uppercase">
          Thought Leadership
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
          Insights & Frameworks
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Operational breakdowns, logistics analytics, and continuous improvement methodologies written from the warehouse floor.
        </p>
      </div>

      {/* Controls: Categories & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500 w-full md:w-64"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="text-gray-400">Loading articles...</div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-gray-400 py-8">No articles found.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <div
              key={article._id || article.slug || index}
              className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 flex flex-col justify-between hover:border-gray-700 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime || '5 min read'}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white hover:text-rose-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <Link
                to={`/insights/${article.slug}`}
                className="inline-flex items-center gap-2 text-rose-500 text-sm font-semibold hover:gap-3 transition-all"
              >
                Read Article <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}