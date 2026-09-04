import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SEO from './components/SEO';
import AuthorityMotion from './components/AuthorityMotion';
import JarvisNetworkSpotlight from './components/JarvisNetworkSpotlight';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Insights = lazy(() => import('./pages/Insights'));
const SingleInsight = lazy(() => import('./pages/SingleInsight'));
const Contact = lazy(() => import('./pages/Contact'));
const MaxwellExcel = lazy(() => import('./pages/MaxwellExcel'));
const Demo = lazy(() => import('./pages/Demo'));
const GatedDemo = lazy(() => import('./pages/GatedDemo'));
const Portal = lazy(() => import('./pages/Portal'));
const Velyqua = lazy(() => import('./pages/Velyqua'));
const GamePlatform = lazy(() => import('./pages/GamePlatform'));
const JarvisControl = lazy(() => import('./pages/JarvisControl'));
const AgentNetwork = lazy(() => import('./pages/AgentNetwork'));

function NotFound() { return <><SEO title="404 — Page Not Found" description="The requested Authority Engine page could not be located." noindex /><div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4"><div className="eyebrow">404</div><h1 className="mt-4 text-5xl font-black text-white">Signal lost.</h1><p className="text-slate-400 mt-3 mb-7 max-w-md">The requested route does not exist or has moved.</p><Link to="/" className="premium-button px-6 py-3 rounded-full font-semibold">Return home</Link></div></>; }
function Loading() { return <div className="min-h-[60vh] flex items-center justify-center bg-[#050807] text-slate-500 text-sm tracking-widest uppercase">Loading Authority Engine…</div>; }

export default function App(){return <Router><ScrollToTop/><AuthorityMotion/><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md">Skip to main content</a><div className="bg-[#050807] text-white min-h-screen font-sans antialiased flex flex-col"><Navbar/><main id="main-content" className="flex-grow" tabIndex="-1"><Suspense fallback={<Loading/>}><Routes><Route path="/" element={<><SEO title="Authority Engine — Operations, Analytics & Applied AI" description="Explore Andrew Lam's public evidence system: 20+ years in operations, strengthened by analytics, applied AI and inspectable experiments."/><Home/><JarvisNetworkSpotlight/></>}/><Route path="/about" element={<><SEO title="About Andrew Lam" description="Operations intelligence profile spanning logistics, warehousing, process improvement, analytics and applied AI."/><About/></>}/><Route path="/insights" element={<><SEO title="Evidence, Experiments & Case Studies" description="Inspect operational evidence, decision frameworks, analytics experiments and working systems built by Andrew Lam."/><Insights/></>}/><Route path="/insights/:slug" element={<SingleInsight/>}/><Route path="/contact" element={<><SEO title="Contact Andrew Lam" description="Start a conversation with Andrew Lam about operations excellence, process improvement, supply chain analytics, logistics and operations intelligence opportunities."/><Contact/></>}/><Route path="/maxwell-excel" element={<MaxwellExcel/>}/><Route path="/demo" element={<Demo/>}/><Route path="/portal" element={<Portal/>}/><Route path="/velyqua" element={<Velyqua/>}/><Route path="/game-platform" element={<GamePlatform/>}/><Route path="/jarvis" element={<JarvisControl/>}/><Route path="/jarvis/agents" element={<AgentNetwork/>}/><Route path="/locked-demo" element={<GatedDemo/>}/><Route path="*" element={<NotFound/>}/></Routes></Suspense></main><Footer/></div></Router>}
