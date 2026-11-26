import React from 'react';
import { Link } from 'react-router-dom';
import velyquaLogo from '../../assets/velyqua-logo.svg';

function WaterIllustration() {
  return (
    <div className="v2-water-scene" role="img" aria-label="Illustration of aquatic observations, care records and human decisions. No live sensor data.">
      <div className="v2-water-scene-label"><span>Intelligence for living water</span><span>VELYQUA / 维澜</span></div>
      <svg viewBox="0 0 520 340" aria-hidden="true">
        <circle cx="260" cy="164" r="126" fill="none" stroke="currentColor" strokeOpacity=".16" />
        <circle cx="260" cy="164" r="102" fill="none" stroke="currentColor" strokeOpacity=".12" strokeDasharray="3 8" />
        <path className="v2-water-wave" d="M48 139c53-25 89 25 142 0s89 25 142 0 89 25 140 0" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity=".6" />
        <path d="M75 139v123h370V139M75 267h370" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity=".4" />
        <path d="M170 198c24-29 56-29 81 0-25 29-57 29-81 0Zm80 0 24-20v40Z" fill="currentColor" fillOpacity=".8" />
        <circle cx="186" cy="196" r="2.5" fill="var(--bk-bg)" />
        <path d="M346 160c-18-20-42-20-60 0 18 20 42 20 60 0Zm-60 0-17-15v30Z" fill="currentColor" fillOpacity=".35" />
        <path d="M116 261c19-30-18-54 0-90M120 232c24-4 30-18 29-28M401 261c-17-31 16-48 0-81M397 231c-21-2-24-15-23-25" fill="none" stroke="currentColor" strokeWidth="3" strokeOpacity=".4" strokeLinecap="round" />
        <circle cx="333" cy="209" r="4" fill="none" stroke="currentColor" strokeOpacity=".35" />
        <circle cx="345" cy="188" r="2" fill="none" stroke="currentColor" strokeOpacity=".4" />
        <path d="M260 24v20M260 284v20M120 164h20M380 164h20" stroke="currentColor" strokeOpacity=".3" />
      </svg>
      <div className="v2-water-workflow"><span>Observe</span><span>Record</span><span>Review</span></div>
      <p>Illustrative workflow · Human decisions remain central</p>
    </div>
  );
}

export default function VelyquaFeature() {
  return (
    <section className="v2-section v2-feature" aria-labelledby="velyqua-feature-title">
      <div className="v2-wrap v2-feature-grid">
        <WaterIllustration />
        <div>
          <p className="v2-kicker">Flagship project / In development</p>
          <div className="v2-feature-brand"><img src={velyquaLogo} alt="" width="56" height="56" /><h2 id="velyqua-feature-title">VELYQUA</h2></div>
          <p className="v2-lede">Monitoring and decision support for living water.</p>
          <p className="v2-prose">I am developing an aquatic monitoring prototype and validating where AI-assisted monitoring can improve a measurable operational outcome.</p>
          <dl className="v2-feature-status"><div><dt>Current software</dt><dd>Manual water tests, observations and care history, with local-first records and private account sync.</dd></div><div><dt>Research direction</dt><dd>Connect aquatic observations, environmental change, human care decisions and measured outcomes.</dd></div></dl>
          <p><a className="v2-link" href="https://velyqua-website.vercel.app/" target="_blank" rel="noreferrer">Explore the cinematic product website</a></p>
          <div className="v2-hero-actions"><a className="v2-btn v2-btn-accent" href="https://velyqua.vercel.app/" target="_blank" rel="noreferrer">Explore the prototype </a><Link className="v2-link" to="/velyqua">Development and pilot goals</Link></div>
        </div>
      </div>
    </section>
  );
}
