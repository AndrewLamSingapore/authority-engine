import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import SoundControl from './SoundControl';

const projects = [['The Portal','/portal'],['JARVIS','/jarvis'],['VELYQUA','/velyqua'],['Living Worlds','/game-platform'],['Sky Tablet','/sky-tablet'],['Maxwell Excel','/maxwell-excel']];
const primary = [['About','/about'],['Evidence','/insights']];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const close = () => setOpen(false);
  const link = ([name, path]) => <Link key={path} to={path} onClick={close} aria-current={loc.pathname === path ? 'page' : undefined} className="nav-link">{name}</Link>;
  return <nav className="portfolio-nav" aria-label="Main Navigation">
    <div className="portfolio-nav-inner">
      <Link to="/" onClick={close} className="portfolio-wordmark"><span className="portfolio-monogram">A</span><span><strong>ANDREW LAM</strong><small>Operations · Analytics · Applied AI</small></span></Link>
      <div className="portfolio-desktop-nav">
        {primary.map(link)}
        <details className="project-menu" onKeyDown={e => { if (e.key === 'Escape') e.currentTarget.removeAttribute('open'); }}>
          <summary>Explore projects</summary>
          <div className="project-menu-panel">{projects.map(([name,path]) => <Link key={path} to={path} onClick={e => e.currentTarget.closest('details').removeAttribute('open')}>{name}<ArrowUpRight size={16}/></Link>)}</div>
        </details>
        <Link to="/contact" className="premium-button nav-conversation">Let’s talk <ArrowUpRight size={16}/></Link>
      </div>
      <div className="portfolio-nav-controls"><SoundControl /><button type="button" className="portfolio-menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X/> : <Menu/>}</button></div>
    </div>
    {open && <div id="mobile-navigation" className="portfolio-mobile-nav" onKeyDown={e => { if(e.key === 'Escape') close(); }}>{[['Home','/'],...primary,...projects,['Let’s talk','/contact']].map(link)}<a className="nav-link" href="https://github.com/AndrewLamSingapore">GitHub</a></div>}
  </nav>;
}
