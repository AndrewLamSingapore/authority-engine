import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Clock } from 'lucide-react';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'h3pl1rfx',
  dataset: 'production',
  useCdn: true,
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
    const query = `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc){
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
    <div className="bg-[#080F0E] text-white min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="text-rose-500 font-semibold tracking-wider text-sm uppercase">
            Thought Leadership
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-4 text-white">
            Insights & Frameworks
          </h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
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
                    ? 'bg-rose-600 text-white font-semibold'
                    : 'bg-[#0D1816] text-gray-300 border border-emerald-900/40 hover:border-emerald-700/60 hover:text-white'
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
              aria-label="Search insights"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-[#0D1816] border border-emerald-900/40 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 w-full md:w-64 transition-colors"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="text-emerald-400 font-medium text-sm py-12 text-center">
            Loading insights...
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="bg-[#0D1816] border border-emerald-900/40 rounded-xl p-8 text-center text-gray-400 py-12">
            <p className="text-lg font-semibold text-white mb-1">No articles found</p>
            <p className="text-sm text-gray-400">
              Try adjusting your category filter or search query.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <div
                key={article._id || article.slug || index}
                className="bg-[#0D1816] border border-emerald-900/40 rounded-xl p-6 flex flex-col justify-between hover:border-emerald-700/60 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                    {article.category ? (
                      <span className="text-emerald-400 font-semibold uppercase text-[10px] tracking-wider bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-0.5 rounded-full">
                        {article.category}
                      </span>
                    ) : (
                      <div />
                    )}
                    <span className="flex items-center gap-1 text-gray-400 ml-auto">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime || '5 min read'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white hover:text-rose-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <Link
                  to={`/insights/${article.slug}`}
                  aria-label={`Read article: ${article.title}`}
                  className="inline-flex items-center gap-2 text-rose-500 text-sm font-semibold hover:gap-3 transition-all mt-auto"
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}