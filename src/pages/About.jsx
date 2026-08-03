import { Award, Briefcase, GraduationCap, CheckCircle, Download, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const careerHistory = [
    {
      period: 'Jun 2026 – Present',
      role: 'Continuous Improvement & Data Analytics (BCG RISE)',
      company: 'Boston Consulting Group & SkillsFuture',
      description: 'Undertaking full-time Business Intelligence and Data Analytics upskilling. Passed Power BI assessment; developing advanced SQL, Python, and Machine Learning workflows to drive root-cause operational diagnosis.',
      type: 'Upskilling'
    },
    {
      period: 'Oct 2024 – Present',
      role: 'Partner and Director, Small Business Operations',
      company: 'Maxwell Excel Service Pte. Ltd.',
      description: 'Directing workforce allocation, container stuffing/unstuffing logistics, and operational cash flow management for recurring cold-chain clients[cite: 1, 2.',
      type: 'Leadership'
    },
    {
      period: 'Jan 2021 – May 2026',
      role: 'Operations Executive',
      company: 'Jurong Cold Store, Singapore',
      description: 'Managed logistics and production planning across strict temperature-controlled zones where compliance failures cause direct product loss[cite: 1, 2. Held inventory accuracy high and introduced workflow refinements adopted across teams[cite: 1, 2.',
      type: 'Operations'
    },
    {
      period: 'Jan 2012 – Dec 2020',
      role: 'Operations Executive',
      company: 'Grocery Logistics of Singapore',
      description: 'Directed daily distribution across 9 consecutive years: 20–40 daily deliveries to 30–60 retail outlets, managing 800–2,000 SKUs[cite: 1, 2. Maintained 98–99.5% inventory accuracy and cut container waiting time by 10–20%[cite: 1, 2.',
      type: 'Operations'
    },
    {
      period: 'Jan 2006 – Dec 2011',
      role: 'Operations Executive',
      company: 'Ferrari Logistics Singapore Pte Ltd',
      description: 'Coordinated international freight forwarding across 5–10 markets[cite: 1, 2. Maintained 95–99% on-time shipment performance for high-value consignments up to S$500k[cite: 1, 2.',
      type: 'Logistics'
    }
  ;

  const skillCategories = [
    {
      title: 'Operational Excellence & Process',
      skills: ['Process Improvement', 'Root Cause Analysis', 'Cold Chain Management', 'Inventory Control', 'Workflow Optimization', 'Demand & Capacity Planning'
    },
    {
      title: 'Analytics & Decision Enablers',
      skills: ['Microsoft Power BI (Assessed)', 'SQL Data Querying', 'Python Analytics', 'KPI Design', 'Early-Warning Indicators', 'Data Cleaning & Validation'
    },
    {
      title: 'Emerging Tech & Credentials',
      skills: ['Applied AI Productivity Tools', 'WSQ Certified Drone Platforms', 'Supply Chain Control Towers', 'Stakeholder Communication'
    }
  ;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 1. PAGE HEADER */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-xs font-semibold text-brand-accent uppercase tracking-wider">
          Career Story & Vision
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Execution First. <br />
          <span className="text-brand-accent">Data-Enabled Improvement.</span>
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          For most organizations, the hardest problem isn't technology—it's execution. With over 20 years in frontline cold chain, grocery logistics, and freight forwarding, I specialize in finding where work actually breaks down and designing systemic fixes that hold[cite: 1, 2.
        </p>
      </div>

      {/* 2. STRATEGIC POSITIONING CARD */}
      <div className="bg-brand-slate border border-slate-800 rounded-2xl p-8 shadow-xl grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-accent" />
            <span>Operational Methodology</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            I study how work actually flows on the warehouse floor, isolate the root cause of friction, redesign the process, and measure the result. I treat Power BI, SQL, and Python as diagnostic tools to make problems visible early—not as standalone tech goals[cite: 2.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#resume"
              className="px-4 py-2.5 bg-brand-accent hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Executive Resume</span>
            </a>
      <a
                  href="https://www.linkedin.com/in/lam-teck-sing-andrew-79886719?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent hover:text-blue-400 transition-colors pt-1"
                >
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
          </div>
        </div>

        <div className="md:col-span-4 bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-brand-gold uppercase tracking-wider">Education & Certification</div>
          <div className="space-y-3 text-xs">
            <div>
              <div className="font-bold text-white">BCG RISE Analytics Programme</div>
              <div className="text-slate-400">Boston Consulting Group (Expected Oct 2026)[cite: 1, 2</div>
            </div>
            <div className="border-t border-slate-800 pt-2">
              <div className="font-bold text-white">BA, Communication & Media</div>
              <div className="text-slate-400">Monash University[cite: 1, 2</div>
            </div>
            <div className="border-t border-slate-800 pt-2">
              <div className="font-bold text-white">WSQ Drone Operations</div>
              <div className="text-slate-400">NTUC LearningHub (2026)[cite: 1, 2</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SKILLS MATRIX */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Cpu className="w-6 h-6 text-brand-accent" />
          <span>Core Strengths & Skill Architecture</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="bg-brand-slate/60 border border-slate-800 rounded-xl p-6">
              <h3 className="text-base font-bold text-white mb-4 border-b border-slate-800 pb-2">
                {cat.title}
              </h3>
              <div className="space-y-2">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CAREER TIMELINE */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Briefcase className="w-6 h-6 text-brand-accent" />
          <span>20+ Year Operations Journey</span>
        </h2>

        <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-10">
          {careerHistory.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Bullet Dot */}
              <div className="absolute -left-[31px top-1.5 w-3.5 h-3.5 rounded-full bg-brand-slate border-2 border-brand-accent group-hover:scale-125 transition-transform" />

              <div className="bg-brand-slate/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-800 text-brand-accent border border-slate-700">
                    {item.period}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {item.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{item.role}</h3>
                <div className="text-sm font-medium text-brand-accent mb-3">{item.company}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}