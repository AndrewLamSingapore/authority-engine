import React, { useMemo, useState } from 'react';
import { ArrowRight, ExternalLink, Network, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const portalUrl = 'https://the-portal-ten.vercel.app/';

const nodes = [
  { id: 'operations', label: 'Operations', x: 50, y: 47, color: 'emerald', note: 'The operating reality: people, process, constraints and decisions.' },
  { id: 'evidence', label: 'Evidence', x: 22, y: 24, color: 'amber', note: 'What can be verified, traced and responsibly claimed.' },
  { id: 'analytics', label: 'Analytics', x: 78, y: 24, color: 'emerald', note: 'Signals translated into decision support—not decoration.' },
  { id: 'ai', label: 'Applied AI', x: 80, y: 74, color: 'amber', note: 'Controlled experiments that extend human judgement.' },
  { id: 'memory', label: 'Memory', x: 20, y: 74, color: 'emerald', note: 'Encounters and artifacts that compound into useful context.' },
];

export default function Portal() {
  const [active, setActive] = useState(nodes[0]);
  const [query, setQuery] = useState('');
  const [serendipity, setSerendipity] = useState(0);

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term ? nodes.filter((node) => node.label.toLowerCase().includes(term) || node.note.toLowerCase().includes(term)) : nodes;
  }, [query]);

  const surpriseMe = () => {
    const next = nodes[(nodes.findIndex((node) => node.id === active.id) + 1 + serendipity) % nodes.length];
    setActive(next);
    setSerendipity((value) => value + 1);
  };

  return (
    <div className="min-h-screen bg-[#050807] text-slate-100 pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-16 items-end">
          <div>
            <div className="eyebrow">Flagship knowledge system · Portal 4.1</div>
            <h1 className="mt-5 text-[clamp(3.2rem,7vw,6.5rem)] leading-[.86] font-black tracking-[-.065em] text-white">THE<br /><span className="text-gradient">PORTAL.</span></h1>
          </div>
          <div className="max-w-xl lg:pb-2">
            <p className="text-lg sm:text-xl leading-relaxed text-slate-300">A living knowledge graph for turning encounters, evidence and unfinished questions into connected intelligence.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={portalUrl} target="_blank" rel="noreferrer" className="premium-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">Enter the live Portal <ExternalLink className="w-4 h-4" /></a>
              <Link to="/insights" className="ghost-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold">Inspect my evidence <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>

        <section className="mt-16 rounded-[2rem] border border-white/[0.09] bg-white/[0.025] overflow-hidden shadow-2xl shadow-black/30" aria-label="Interactive Portal preview">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] px-5 sm:px-7 py-4">
            <div className="flex items-center gap-3">
              <Network className="w-5 h-5 text-emerald-300" />
              <div><div className="text-sm font-bold text-white">Living Knowledge Graph</div><div className="text-[10px] tracking-[.14em] uppercase text-slate-500">Interactive preview</div></div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search this constellation" className="w-full sm:w-64 rounded-full border border-white/[0.1] bg-black/25 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-emerald-300/40" />
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.25fr_.75fr] min-h-[540px]">
            <div className="relative min-h-[430px] sm:min-h-[540px] border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[radial-gradient(circle_at_center,rgba(52,211,153,.08),transparent_58%)]">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                {nodes.slice(1).map((node) => <line key={node.id} x1="50%" y1="47%" x2={node.x + '%'} y2={node.y + '%'} stroke="rgba(110,231,183,.18)" strokeWidth="1" strokeDasharray="5 7" />)}
              </svg>
              {nodes.map((node) => {
                const visible = matches.some((match) => match.id === node.id);
                const selected = active.id === node.id;
                return <button key={node.id} onClick={() => setActive(node)} style={{ left: node.x + '%', top: node.y + '%' }} className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/60 ${selected ? 'scale-110 border-emerald-300 bg-emerald-300 text-[#04100c] shadow-[0_0_40px_rgba(52,211,153,.28)]' : visible ? 'border-white/15 bg-[#0b110f] text-slate-200 hover:border-emerald-300/45 hover:scale-105' : 'opacity-20 border-white/5 bg-black text-slate-600'} ${node.id === 'operations' ? 'w-28 h-28 sm:w-32 sm:h-32 font-black' : 'w-20 h-20 sm:w-24 sm:h-24 text-xs sm:text-sm font-bold'}`} aria-pressed={selected}>{node.label}</button>;
              })}
              <div className="absolute left-5 bottom-5 text-[10px] tracking-[.15em] uppercase text-slate-600">Select any node to traverse</div>
            </div>

            <div className="p-7 sm:p-10 flex flex-col">
              <div className="text-[10px] tracking-[.2em] uppercase text-amber-300">Selected node</div>
              <h2 className="mt-4 text-3xl font-black text-white">{active.label}</h2>
              <p className="mt-4 text-slate-400 leading-relaxed">{active.note}</p>
              <div className="mt-8 space-y-3">
                {['Trace its relationships', 'Open evidence-aware artifacts', 'Preserve the encounter in memory'].map((item, index) => <div key={item} className="rounded-2xl border border-white/[0.07] bg-black/20 p-4 flex items-center gap-3"><span className="text-xs font-black text-emerald-300">0{index + 1}</span><span className="text-sm text-slate-300">{item}</span></div>)}
              </div>
              <button onClick={surpriseMe} className="mt-auto pt-8 inline-flex items-center gap-2 text-sm font-bold text-amber-300 hover:text-amber-200"><Sparkles className="w-4 h-4" /> Follow a serendipitous connection</button>
            </div>
          </div>
        </section>

        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {[['Encounter creation','Capture what happened before its meaning disappears.'],['Evidence-aware artifacts','Keep sources, claims and uncertainty visible together.'],['Browser-private cabinet','Let useful context compound without turning memory into surveillance.']].map(([title,text]) => <div key={title} className="system-card rounded-3xl p-7"><div className="text-[10px] tracking-[.18em] uppercase text-emerald-300">Portal principle</div><h3 className="mt-8 text-xl font-black text-white">{title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-400">{text}</p></div>)}
        </div>
      </div>
    </div>
  );
}
