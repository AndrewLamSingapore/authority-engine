import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Clock } from 'lucide-react';
import { createClient } from '@sanity/client';

// Sanity Client Setup
const client = createClient({
  projectId: 'h3pl1rfx',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

// Default Static Articles (Only used if Sanity returns no documents)
const defaultArticles = [
  {
    _id: 'default-1',
    title: 'Scaling Our Enterprise Architecture',
    slug: 'scaling-our-enterprise-architecture',
    category: 'Case Studies',
    publishedAt: '2026-08-01',
    readTime: '6 min read',
    excerpt: 'An in-depth look at how modern enterprise systems decouple monolithic backends into resilient, microservices-driven architectures.'
  },
  {
    _id: 'default-2',
    title: 'Supply Chain Control Tower',
    slug: 'supply-chain-control-tower',
    category: 'Case Studies',
    publishedAt: '2026-08-02',
    readTime: '5 min read',
    excerpt: 'How end-to-end visibility and real-time data integration transform global supply chain decision-making.'
  },
  {
    _id: 'default-3',
    title: 'The Hidden Cost of Inefficient Warehouse Logistics',
    slug: 'the-hidden-cost-of-inefficient-warehouse-logistics',
    category: 'The Hidden Economics of Business',
    publishedAt: '2026-08-03',
    readTime: '7 min read',
    excerpt: 'Uncovering operational friction, labor downtime, and inventory inaccuracies that erode warehouse profitability.'
  },
  {
    _id: 'default-4',
    title: 'Building Authority Engine from Ground Up',
    slug: 'building-authority-engine-from-ground-up',
    category: 'Building in Public',
    publishedAt: '2026-08-04',
    readTime: '5 min read',
    excerpt: 'The engineering decisions, tech stack choices, and performance optimization behind the Authority Engine platform.'
  }
];

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
        // Render Sanity CMS data if available; fallback to default list only if CMS is empty
        if (sanityData && sanityData.length > 0) {
          setArticles(sanityData);
        } else {
          setArticles(defaultArticles);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Sanity fetch error:', err);
        setArticles(defaultArticles);
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