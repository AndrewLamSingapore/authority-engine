import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, FlaskConical, Search } from 'lucide-react';
import { articleListQuery, fetchPublishedContent, normalizeArticleList } from '../lib/insights';

const flagship = [
  { title: 'Container Operations Evidence', tag: 'REAL OPERATING EVIDENCE', text: 'Anonymised Maxwell Excel records covering 391 container jobs across seven reporting periods. Dataset figures are factual; no unverified profit, savings or production-impact claim is made.', to: '/maxwell-excel' },
  { title: 'VELYQUA 维澜', tag: 'E2 PRODUCT · E0/E1 PHYSICAL HYPOTHESIS', text: 'A live freshwater operating-system prototype plus a governed experiment asking whether low-cost continuous signals can provide useful earlier warning. The physical hypothesis is not yet scientifically validated.', to: '/velyqua' },
  { title: 'Multi-Signal Risk Simulator', tag: 'E1 SYNTHETIC DEMONSTRATION', text: 'An inspectable weighted-rule environment for exploring how multiple signals can combine. It is not presented as a trained or validated predictive model.', to: '/demo' },
];

export default function Insights() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetchPublishedContent(articleListQuery, {}, { signal: controller.signal })
      .then((data) => {
        if (!controller.signal.aborted) setArticles(normalizeArticleList(data));
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [attempt]);

  const search = query.trim().toLowerCase();
  const filtered = articles.filter((article) => `${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(search));
  const retry = () => {
    setError(false);
    setLoading(true);
    setAttempt((value) => value + 1);
  };

  return (
    <div className="bg-[#050807] min-h-screen pt-32 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="eyebrow">Evidence hub</div>
          <h1 className="mt-5 text-5xl sm:text-7xl font-black tracking-[-0.055em] leading-[.92]">Claims are easy.<br /><span className="text-gradient">Evidence compounds.</span></h1>
          <p className="mt-7 max-w-3xl text-lg text-slate-400 leading-relaxed">Projects, operating analyses and experiments connecting frontline experience with analytics, systems thinking and AI. Evidence types and maturity are identified rather than blurred together.</p>
          <Link to="/frameworks" className="mt-6 inline-flex items-center gap-2 font-semibold text-amber-300">Explore the decision frameworks <ArrowRight className="w-4 h-4" /></Link>
        </div>

        <div className="mt-16 grid lg:grid-cols-3 gap-4">
          {flagship.map((project) => (
            <Link key={project.title} to={project.to} className="system-card rounded-3xl p-7">
              <div className="flex justify-between gap-4"><FlaskConical className="w-6 h-6 text-emerald-300 shrink-0" /><span className="text-[9px] leading-relaxed text-right font-bold tracking-[.12em] text-amber-300">{project.tag}</span></div>
              <h2 className="mt-12 text-2xl font-black">{project.title}</h2>
              <p className="mt-3 min-h-[120px] text-slate-400 leading-relaxed">{project.text}</p>
              <div className="mt-6 text-sm font-bold text-emerald-300 inline-flex gap-2 items-center">Inspect evidence <ArrowRight className="w-4 h-4" /></div>
            </Link>
          ))}
        </div>

        <div className="mt-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-white/[0.08] pt-14">
          <div><div className="eyebrow">Published thinking</div><h2 className="mt-3 text-3xl font-black">Field notes & case studies</h2></div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <label htmlFor="evidence-search" className="sr-only">Search evidence</label>
            <input id="evidence-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search evidence..." className="w-full md:w-72 rounded-full border border-white/[0.1] bg-white/[0.025] py-3 pl-11 pr-5 text-sm outline-none focus:border-emerald-300/40" />
          </div>
        </div>

        <div className="mt-8" aria-busy={loading}>
          {loading ? <div role="status" className="text-slate-500 py-10">Loading evidence…</div> : error ? (
            <div className="rounded-3xl border border-amber-300/20 bg-amber-300/[0.03] p-8">
              <p role="alert" className="text-slate-300">Published articles could not load. The featured evidence above is still available.</p>
              <button type="button" onClick={retry} className="mt-4 text-amber-300 font-semibold underline underline-offset-4">Try loading articles again</button>
            </div>
          ) : filtered.length === 0 ? (
            <div role="status" className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-10 text-slate-400">
              {search ? 'No articles match your search. Try another term or clear the search.' : 'No published articles are available yet. Explore the featured evidence above.'}
              {search && <button type="button" onClick={() => setQuery('')} className="block mt-4 text-amber-300 underline underline-offset-4">Clear search</button>}
            </div>
          ) : (
            <>
              <p role="status" className="sr-only">{filtered.length} articles found.</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((article) => (
                  <article key={article._id} className="system-card rounded-3xl p-7 flex flex-col">
                    <div className="flex justify-between gap-3 text-[10px] tracking-wider uppercase"><span className="text-emerald-300">{article.category}</span><span className="text-slate-500 inline-flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span></div>
                    <h3 className="mt-8 text-xl font-black"><Link to={`/insights/${encodeURIComponent(article.slug)}`} className="hover:text-emerald-300">{article.title}</Link></h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400 flex-1">{article.excerpt}</p>
                    <Link to={`/insights/${encodeURIComponent(article.slug)}`} aria-label={`Read ${article.title}`} className="mt-7 text-sm font-bold text-amber-300 inline-flex gap-2 items-center">Read evidence <ArrowRight className="w-4 h-4" /></Link>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
