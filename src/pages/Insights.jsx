import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, ShieldAlert, Thermometer, TrendingUp, BookOpen, Clock } from 'lucide-react';

export default function Insights() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Case Studies',
    'The Hidden Economics of Business',
    'Building in Public'
  ];

  const articles = [
    {
      id: 'control-tower',
      title: 'Supply Chain Control Tower: Early-Warning Operational Analytics',
      category: 'Case Studies',
      date: 'Aug 2026',
      readTime: '6 min read',
      excerpt: 'How real-time monitoring and threshold analytics reduce container bottleneck times and thermal risk in cold-chain logistics.'
    },
    {
      id: 'hidden-economics',
      title: 'The Unseen Costs of Micro-Delays in Warehouse Operations',
      category: 'The Hidden Economics of Business',
      date: 'Jul 2026',
      readTime: '5 min read',
      excerpt: 'Analyzing how cumulative 5-minute floor delays compound into significant annual revenue leaks and labor overruns.'
    },
    {
      id: 'sop-automation',
      title: 'Building Standardized Workflows in High-Turnover Logistics Environments',
      category: 'Building in Public',
      date: 'Jun 2026',
      readTime: '4 min read',
      excerpt: 'Practical approaches to crafting digital SOPs that ensure operational compliance and rapid staff onboarding.'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#080F0E] text-slate-100 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-amber-500 font-semibold tracking-wider text-sm uppercase">Thought Leadership</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 text-white">Insights & Frameworks</h1>
          <p className="text-slate-400 mt-4 text-lg">
            Operational breakdowns, logistics analytics, and continuous improvement methodologies written from the warehouse floor.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center mb-12">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-rose-600 text-white'
                    : 'bg-[#0D1816] text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search insights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0D1816] border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-[#0D1816] border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-emerald-800/60 transition-colors">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="text-amber-500 font-medium">{article.category}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 hover:text-rose-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-500">{article.date}</span>
                <Link
                  to={`/insights/${article.id}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-rose-500 hover:text-rose-400 transition-colors"
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}