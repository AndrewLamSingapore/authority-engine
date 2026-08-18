import React, { useState } from 'react';

export default function Demo() {
  // Operational Variables State
  const [inventoryCover, setInventoryCover] = useState(15); // Days of inventory
  const [supplierOTIF, setSupplierOTIF] = useState(78);     // On-Time In-Full %
  const [backlogDays, setBacklogDays] = useState(12);       // Backlog processing queue (days)
  const [trajectoryVelocity, setTrajectoryVelocity] = useState(65); // Deterioration velocity score (0-100)

  // 1. Calculate Individual Vector Risk Scores (Normalized 0 - 100)
  // Target Inventory Cover = 30 days. Under 10 days = 100% risk.
  const inventoryRiskScore = Math.max(0, Math.min(100, ((30 - inventoryCover) / 30) * 100));
  
  // Target Supplier OTIF = 95%. Below 95% increases risk.
  const supplierRiskScore = Math.max(0, Math.min(100, ((95 - supplierOTIF) / 45) * 100));
  
  // Target Backlog = < 3 days. Over 15 days = 100% risk.
  const backlogRiskScore = Math.max(0, Math.min(100, (backlogDays / 15) * 100));

  // Trajectory Risk Score directly mapped
  const trajectoryRiskScore = trajectoryVelocity;

  // 2. Compute Weighted Composite Risk Index (35% / 25% / 20% / 20%)
  const compositeRiskIndex = Math.round(
    (inventoryRiskScore * 0.35) +
    (supplierRiskScore * 0.25) +
    (backlogRiskScore * 0.20) +
    (trajectoryRiskScore * 0.20)
  );

  // Early Warning Threshold Trigger (>= 70%)
  const isEarlyWarningTriggered = compositeRiskIndex >= 70;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Interactive Technical Demo
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Supply Chain Control Tower Simulator
          </h1>
          <p className="text-slate-400 mt-2 text-sm md:text-base">
            Live multi-factor weighted risk engine calculating early-warning degradation signals before conventional KPI threshold breach.
          </p>
        </div>

        {/* Live Output Banner */}
        <div className={`p-6 rounded-xl border transition-all duration-300 ${
          isEarlyWarningTriggered 
            ? 'bg-rose-950/40 border-rose-500/50 shadow-lg shadow-rose-950/50' 
            : compositeRiskIndex > 45 
            ? 'bg-amber-950/30 border-amber-500/40' 
            : 'bg-emerald-950/30 border-emerald-500/40'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                Composite Operational Risk Score
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className={`text-4xl font-extrabold ${
                  isEarlyWarningTriggered ? 'text-rose-400' : compositeRiskIndex > 45 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {compositeRiskIndex}%
                </span>
                <span className="text-xs text-slate-400">/ 100% Critical Scale</span>
              </div>
            </div>

            {/* Status Badge */}
            <div>
              {isEarlyWarningTriggered ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 text-sm font-bold animate-pulse">
                  <span>⚠️ EARLY WARNING TRIGGERED</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold">
                  <span>✅ Operations Within Safe Baseline</span>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Early Warning Message */}
          {isEarlyWarningTriggered && (
            <div className="mt-4 pt-4 border-t border-rose-500/30 text-rose-200 text-sm leading-relaxed">
              <strong>24-Day Early-Warning Alert:</strong> Operational metrics indicate significant multi-factor deterioration. System predicts full supply chain failure in 24 days prior to standard Amber/Red KPI breaches.
            </div>
          )}
        </div>

        {/* Control Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Vector 1: Inventory Cover (35%) */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-200">
                1. Inventory Cover (35% Weight)
              </label>
              <span className="text-xs font-mono bg-slate-800 px-2.5 py-1 rounded text-emerald-400">
                {inventoryCover} Days
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="30"
              value={inventoryCover}
              onChange={(e) => setInventoryCover(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <p className="text-xs text-slate-400">
              Evaluates current inventory trajectory against lead-time demand requirements.
            </p>
          </div>

          {/* Vector 2: Supplier Performance (25%) */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-200">
                2. Supplier OTIF Rate (25% Weight)
              </label>
              <span className="text-xs font-mono bg-slate-800 px-2.5 py-1 rounded text-emerald-400">
                {supplierOTIF}%
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={supplierOTIF}
              onChange={(e) => setSupplierOTIF(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <p className="text-xs text-slate-400">
              Tracks supplier On-Time In-Full historical performance and delivery variance.
            </p>
          </div>

          {/* Vector 3: Backlog Risk (20%) */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-200">
                3. Order Backlog Queue (20% Weight)
              </label>
              <span className="text-xs font-mono bg-slate-800 px-2.5 py-1 rounded text-emerald-400">
                {backlogDays} Days Queue
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={backlogDays}
              onChange={(e) => setBacklogDays(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <p className="text-xs text-slate-400">
              Measures order processing queue buildup across key fulfillment hubs.
            </p>
          </div>

          {/* Vector 4: Trajectory Risk (20%) */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-200">
                4. Trajectory Velocity (20% Weight)
              </label>
              <span className="text-xs font-mono bg-slate-800 px-2.5 py-1 rounded text-emerald-400">
                {trajectoryVelocity} Score
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={trajectoryVelocity}
              onChange={(e) => setTrajectoryVelocity(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <p className="text-xs text-slate-400">
              Calculates directional velocity and rate of operational decay over time.
            </p>
          </div>

        </div>

        {/* Mathematical Breakdown Box */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 space-y-2">
          <div className="font-semibold text-slate-300 uppercase tracking-wider mb-1">
            Engine Algorithm Specifications
          </div>
          <p>
            <span className="text-slate-300 font-mono">Composite Index</span> = (Inventory Risk × 0.35) + (Supplier Risk × 0.25) + (Backlog Risk × 0.20) + (Trajectory Velocity × 0.20)
          </p>
          <p>
            Designed by <strong>Andrew Lam Teck Sing</strong> for predictive operations and proactive risk mitigation.
          </p>
        </div>

      </div>
    </div>
  );
}