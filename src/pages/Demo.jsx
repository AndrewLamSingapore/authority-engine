import React, { useState } from 'react';

export default function Demo() {
  const [inventoryCover, setInventoryCover] = useState(15);
  const [supplierOTIF, setSupplierOTIF] = useState(78);
  const [backlogDays, setBacklogDays] = useState(12);
  const [trajectoryVelocity, setTrajectoryVelocity] = useState(65);

  // Synthetic demonstration only. These transforms and weights are illustrative,
  // not a fitted or validated predictive model.
  const inventoryRiskScore = Math.max(0, Math.min(100, ((30 - inventoryCover) / 30) * 100));
  const supplierRiskScore = Math.max(0, Math.min(100, ((95 - supplierOTIF) / 45) * 100));
  const backlogRiskScore = Math.max(0, Math.min(100, (backlogDays / 15) * 100));
  const trajectoryRiskScore = trajectoryVelocity;

  const compositeRiskIndex = Math.round(
    (inventoryRiskScore * 0.35) +
    (supplierRiskScore * 0.25) +
    (backlogRiskScore * 0.20) +
    (trajectoryRiskScore * 0.20)
  );

  const isIllustrativeWarning = compositeRiskIndex >= 70;
  const status = isIllustrativeWarning ? 'Illustrative warning threshold crossed' : compositeRiskIndex > 45 ? 'Illustrative watch zone' : 'Illustrative lower-risk zone';

  const controls = [
    {label:'Inventory Cover',weight:'35%',value:inventoryCover,set:setInventoryCover,min:2,max:30,unit:'days',help:'Illustrative inventory-cover input. Lower cover increases the demonstration score.'},
    {label:'Supplier OTIF',weight:'25%',value:supplierOTIF,set:setSupplierOTIF,min:50,max:100,unit:'%',help:'Illustrative On-Time In-Full input. Lower OTIF increases the demonstration score.'},
    {label:'Order Backlog',weight:'20%',value:backlogDays,set:setBacklogDays,min:0,max:20,unit:'days',help:'Illustrative queue input. A larger backlog increases the demonstration score.'},
    {label:'Trajectory Velocity',weight:'20%',value:trajectoryVelocity,set:setTrajectoryVelocity,min:0,max:100,unit:'score',help:'A synthetic deterioration input used to explore how directional change affects a composite score.'}
  ];

  return (
    <div className="min-h-screen bg-[#050807] text-slate-100 px-4 sm:px-6 py-28 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="border-b border-white/[0.08] pb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-300/[0.07] border border-amber-300/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">E1 · Synthetic analytical demonstration</div>
          <h1 className="mt-5 text-4xl md:text-5xl font-black text-white tracking-tight">Multi-Signal Risk Simulator</h1>
          <p className="text-slate-400 mt-4 max-w-3xl leading-relaxed">Explore how four illustrative operational signals combine under an explicit weighted rule. This is a transparent decision-model demonstration — not a trained forecasting model and not evidence that a failure will occur.</p>
        </header>

        <div className={`p-6 rounded-2xl border ${isIllustrativeWarning ? 'bg-rose-950/30 border-rose-500/40' : compositeRiskIndex > 45 ? 'bg-amber-950/25 border-amber-500/30' : 'bg-emerald-950/25 border-emerald-500/30'}`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div><div className="text-xs uppercase tracking-[.16em] text-slate-500">Illustrative composite score</div><div className="mt-2 text-5xl font-black text-white">{compositeRiskIndex}<span className="text-xl text-slate-500"> / 100</span></div></div>
            <div className="text-sm font-semibold text-slate-200">{status}</div>
          </div>
          <p className="mt-5 pt-5 border-t border-white/[0.08] text-sm leading-relaxed text-slate-400">The 70-point warning boundary, input transforms and 35/25/20/20 weights are intentionally inspectable assumptions for experimentation. They have not been calibrated against a labelled production outcome dataset.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {controls.map((c,i)=><div key={c.label} className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] space-y-4">
            <div className="flex justify-between gap-4 items-center"><label htmlFor={`signal-${i}`} className="text-sm font-bold text-slate-200">{i+1}. {c.label} <span className="text-slate-500">({c.weight})</span></label><span className="text-xs font-mono bg-white/[0.05] px-2.5 py-1 rounded text-emerald-300">{c.value} {c.unit}</span></div>
            <input id={`signal-${i}`} aria-label={c.label} type="range" min={c.min} max={c.max} value={c.value} onChange={e=>c.set(Number(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
            <p className="text-xs leading-relaxed text-slate-500">{c.help}</p>
          </div>)}
        </div>

        <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-sm text-slate-400 space-y-4">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-[.16em]">Model contract</div>
          <p><span className="text-slate-200 font-mono">Composite</span> = Inventory Risk × 0.35 + Supplier Risk × 0.25 + Backlog Risk × 0.20 + Trajectory × 0.20.</p>
          <p><strong className="text-slate-300">What it demonstrates:</strong> transparent multi-signal aggregation, sensitivity to changing inputs and an explicit intervention threshold.</p>
          <p><strong className="text-slate-300">What it does not prove:</strong> predictive accuracy, causal relationships, a fixed lead time to failure, or suitability for production decisions.</p>
          <p className="text-slate-500">A claim of prediction would require a defined outcome, historical labelled data, calibration, holdout validation, error metrics and monitoring for drift.</p>
        </section>
      </div>
    </div>
  );
}
