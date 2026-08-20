import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GatedDemo from './pages/GatedDemo';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SEO from './components/SEO';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Insights from './pages/Insights';
import SingleInsight from './pages/SingleInsight';
import Contact from './pages/Contact';
import Demo from './pages/Demo';

function NotFound() {
  return (
    <>
      <SEO title="404 - Page Not Found" description="The requested page could not be located." />
      <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-7xl font-extrabold text-rose-500 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
        <p className="text-gray-400 mb-6 max-w-md">
          The requested route does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none"
        >
          Return to Home
        </Link>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>
      <div className="bg-[#080F0E] text-white min-h-screen font-sans antialiased flex flex-col justify-between">
        <Navbar />
        
        <main id="main-content" className="flex-grow" tabIndex="-1">
          <Routes>
            <Route path="/" element={<><SEO title="Operations Excellence & Supply Chain Analytics" description="20+ years of supply-chain and warehouse experience combined with Power BI and analytics to expose risk earlier and improve execution." /><Home /></>} />
            <Route path="/about" element={<><SEO title="About Lam Teck Sing Andrew" description="Verified operations excellence, supply chain and business analytics profile of Lam Teck Sing Andrew." /><About /></>} />
            <Route path="/insights" element={<><SEO title="Evidence-Led Insights & Case Studies" description="Operational case studies and frameworks that clearly separate anonymised evidence from synthetic demonstrations." /><Insights /></>} />
            <Route path="/insights/:slug" element={<SingleInsight />} />
            <Route path="/contact" element={<><SEO title="Contact Andrew Lam" description="Contact Lam Teck Sing Andrew about operations excellence, process improvement, supply chain analytics and logistics opportunities." /><Contact /></>} />
            <Route path="/demo" element={<><SEO title="Interactive Risk Simulator" description="Supply Chain Control Tower interactive multi-factor risk engine simulator." /><Demo /></>} />
            <Route path="*" element={<NotFound />} />
            <Route path="/locked-demo" element={<><SEO title="Gated Content Demo" description="Functional simulation of active lead capture." /><GatedDemo /></>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
