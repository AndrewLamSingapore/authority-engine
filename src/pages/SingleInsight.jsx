import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ShieldAlert, 
  BookOpen,
  Cpu,
  Truck
} from 'lucide-react';
import { createClient } from '@sanity/client';

// Sanity Client Setup
const client = createClient({
  projectId: 'h3pl1rfx',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

// Fallback Dictionary mapped strictly to actual URL Slugs
const insightData = {
  'scaling-our-enterprise-architecture': {
    title: 'Scaling Our Enterprise Architecture',
    category: 'Case Studies',
    date: 'August 2026',
    readTime: '6 min read',
    author: 'Lam Teck Sing Andrew',
    icon: Cpu,
    overview: 'An in-depth look at how modern enterprise systems decouple monolithic backends into resilient, microservices-driven architectures.',
    keyTakeaways: [
      'Decoupled monolithic domains into independent microservice APIs.',
      'Implemented asynchronous messaging patterns to handle heavy traffic spikes.',
      'Established strict governance over database strategies and logging.'
    ],
    content: `Modern enterprise applications demand high availability, fault tolerance, and clear domain boundaries. As organizations scale, traditional monolithic systems often present bottlenecks in deployment speed and developer productivity.\n\nDecoupling core business domains into microservices or modular architectures allows engineering teams to ship updates independently. By adopting clear API boundaries and asynchronous messaging patterns, systems maintain stability even under heavy traffic spikes.\n\nTransitioning to an enterprise-grade setup requires strict governance over API design, database strategy, and distributed logging. Building modular components ensures long-term maintainability while keeping operational costs manageable.`
  },
  'supply-chain-control-tower': {
    title: 'Supply Chain Control Tower',
    category: 'Case Studies',
    date: 'August 2026',
    readTime: '5 min read',
    author: 'Lam Teck Sing Andrew',
    icon: ShieldAlert,
    overview: 'How end-to-end visibility and real-time data integration transform global supply chain decision-making.',
    keyTakeaways: [
      'Weighted risk scoring: Inventory cover (35%), Supplier trajectory (25%), Backlog velocity (20%).',
      'Integration of WMS and ERP telemetry into interactive drill-down cards.',
      'Proven 24-day early warning window prior to order fulfillment bottlenecks.'
    ],
    content: `A Supply Chain Control Tower serves as a centralized hub that integrates real-time data across global supplier networks, fulfillment centers, and transportation channels.\n\nWith predictive analytics and automated event management, organizations can detect disruptions before they escalate into costly delays. Real-time telemetry enables operations teams to proactively reroute shipments and adjust inventory allocations.\n\nImplementing a control tower unifies fragmented legacy systems into a single source of truth, empowering leaders to optimize logistics efficiency and drastically reduce turnaround times.`
  },
  'the-hidden-cost-of-inefficient-warehouse-logistics': {
    title: 'The Hidden Cost of Inefficient Warehouse Logistics',
    category: 'The Hidden Economics of Business',
    date: 'August 2026',
    readTime: '7 min read',
    author: 'Lam Teck Sing Andrew',
    icon: Truck,
    overview: 'Uncovering operational friction, labor downtime, and inventory inaccuracies that erode warehouse profitability.',
    keyTakeaways: [
      'Identification of operational drag: extra picker walking distance and delayed replenishment.',
      'Automated bin location tagging to prevent misplaced inventory.',
      'Throughput recovery through optimized picking route automation.'
    ],
    content: `Warehouse inefficiencies rarely present themselves as sudden failures; instead, they manifest as subtle operational drag—extra walking distance for pickers, delayed stock replenishment, and inventory misallocations.\n\nWithout automated inventory tracking and optimized picking routes, operating costs quickly compound. Labor hours spent manually locating misplaced stock directly erode margin on fulfilled orders.\n\nModernizing warehouse management systems with automated routing, smart bin location tagging, and real-time inventory synchronization recovers lost capacity and significantly increases throughput.`
  },
  'building-authority-engine-from-ground-up': {
    title: 'Building Authority Engine from Ground Up',
    category: 'Building in Public',
    date: 'August 2026',
    readTime: '5 min read',
    author: 'Lam Teck Sing Andrew',
    icon: BookOpen,
    overview: 'The engineering decisions, tech stack choices, and performance optimization behind the Authority Engine platform.',
    keyTakeaways: [
      'Pairing React frontend with Sanity Headless CMS for rapid content updates.',
      'Optimized GROQ queries and static edge deployment for fast page loads.',
      'Modular component architecture designed for scalable feature expansion.'
    ],
    content: `Authority Engine was designed to deliver high-performance dynamic content management without compromising speed or user experience.\n\nBy pairing a responsive frontend with Sanity’s headless CMS, the platform achieves seamless content delivery, robust SEO optimization, and instant live updates.\n\nBuilding from the ground up required careful consideration of schema design, API caching, and modular UI components to ensure the system scales smoothly alongside growing business requirements.`
  }
};

export default function SingleInsight() {
  const { slug, id } = useParams();
  const currentKey = slug || id || 'scaling-our-enterprise-architecture';

  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

          // Process content (handles plain text string, array of strings, or PortableText blocks)
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
            icon: ShieldAlert,
            overview: data.excerpt || '',
            keyTakeaways: data.keyTakeaways || [],
            content: extractedContent,
          });
        } else {
          // Fallback to exact static dictionary entry or default fallback matching the key
          setInsight(insightData[currentKey] || insightData['scaling-our-enterprise-architecture']);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Sanity single post fetch error:', err);
        setInsight(insightData[currentKey] || insightData['scaling-our-enterprise-architecture']);
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

  const activeInsight = insight || insightData['scaling-our-enterprise-architecture'];
  const IconComponent = activeInsight.icon || ShieldAlert;

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
              {activeInsight.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-gray-400">
              <Calendar className="w-3.5 h-3.5" /> {activeInsight.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-gray-400">
              <Clock className="w-3.5 h-3.5" /> {activeInsight.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            {activeInsight.title}
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            {activeInsight.overview}
          </p>
        </header>

        {activeInsight.keyTakeaways && activeInsight.keyTakeaways.length > 0 && (
          <div className="bg-[#0D1816] border border-emerald-900/40 rounded-xl p-6 sm:p-8 mb-10">
            <h2 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Key Takeaways
            </h2>
            <ul className="space-y-3">
              {activeInsight.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start text-gray-300 text-sm leading-relaxed">
                  <span className="text-emerald-500 mr-2 font-bold">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
          {activeInsight.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-base sm:text-lg text-gray-300">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}