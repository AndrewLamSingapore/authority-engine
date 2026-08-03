import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, ShieldAlert, Thermometer, TrendingUp, BookOpen, Clock } from 'lucide-react';

export default function Insights() {
  const [selectedCategory, setSelectedCategory = useState('All');
  const [searchQuery, setSearchQuery = useState('');

  const categories = [
    'All',
    'Case Studies',
    'The Hidden Economics of Business',
    'Building in Public'
  ;

  const articles = [
    {
      id: 'control-tower',
      title: 'Supply Chain Control Tower: Early-Warning Operational Analytics',
      category: 'Case Studies',
      date: 'Aug 2026',
      readTime: '6 min read',
      excerpt: 'How a weighted operational risk scoring model flagged supplier deterioration 24 days before conventional critical threshold failures.',
      tags: ['Power BI', 'Python', 'SQL', 'Early Warning Systems',
      icon: ShieldAlert,
      featured: true
    },
    {
      id: 'cold-chain-dashboard',
      title: 'Cold Chain Risk Intelligence Dashboard',
      category: 'Case Studies',
      date: 'Jul 2026',
      readTime: '5 min read',
      excerpt: 'Analyzing 1,800 operational records across temperature-controlled warehouse zones to eliminate door-open duration breaches and optimize shift loading.',
      tags: ['Power BI', 'Cold Chain', 'Process Optimization',
      icon: Thermometer,
      featured: true
    },
    {
      id: 'hidden-economics-process',
      title: 'Why Operational Friction Costs More Than Software Solutions',
      category: 'The Hidden Economics of Business',
      date: 'Jul 2026',
      readTime: '8 min read',
      excerpt: 'Most organizations jump to buy new software before fixing broken floor workflows. Here is how root-cause diagnosis saves hundreds of wasted hours.',
      tags: ['Operations Strategy', 'Root Cause Diagnosis', 'OpEx',
      icon: TrendingUp,
      featured: false
    },
    {
      id: 'building-in-public-bcg',
      title: 'Bridging 20 Years of Frontline Logistics with BCG RISE Analytics',
      category: 'Building in Public',
      date: 'Jun 2026',
      readTime: '4 min read',
      excerpt: 'Reflections on combining two decades of cold-chain execution with advanced Power BI, SQL, and Python data modeling.',
      tags: ['BCG RISE', 'Upskilling', 'Career Journey',
      icon: BookOpen,
      featured: false
    }
  ;

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* 1. HEADER SECTION */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-xs font-semibold text-brand-accent uppercase tracking-wider">
          Thought Leadership & Applied Analytics
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Insights Hub
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          Operational breakdowns, analytical frameworks, case studies, and reflections from 20+ years on the frontline of supply chain and logistics.
        </p>
      </div>

      {/* 2. SEARCH & FILTER CONTROLS */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-brand-slate/80 p-4 rounded-xl border border-slate-800 backdrop-blur-sm">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-accent text-white shadow-md shadow-blue-900/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar Input */}
        <div className="relative min-w-[260px">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search insights or tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent transition-colors"
          />
        </div>
      </div>

      {/* 3. INSIGHTS GRID */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-brand-slate/40 border border-slate-800 rounded-2xl">
          <Filter className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No matching insights found</h3>
          <p className="text-slate-400 text-xs">Try clearing your search query or selecting a different category filter.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => {
            const IconComponent = article.icon;
            return (
              <div
                key={article.id}
                className="bg-brand-slate border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-xl group"
              >
                <div>
                  {/* Category & Meta Header */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800/80">
                    <span className="font-semibold text-brand-accent px-2.5 py-1 rounded bg-brand-accent/10 border border-brand-accent/20">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-3">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2.5 rounded-lg bg-slate-800 text-brand-accent shrink-0 mt-1">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-white group-hover:text-brand-accent transition-colors">
                      {article.title}
                    </h2>
                  </div>

                  <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                {/* Footer Tag Pills & Link */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {article.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 rounded bg-slate-900/80 text-slate-400 border border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/insights/${article.id}`}
                    className="w-full py-2.5 bg-slate-800/80 hover:bg-brand-accent text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 border border-slate-700/80 hover:border-brand-accent transition-all"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}