import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Insights from './pages/Insights';
import SingleInsight from './pages/SingleInsight';
import Contact from './pages/Contact';

// 404 Not Found Component
function NotFound() {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-extrabold text-rose-500 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
      <p className="text-gray-400 mb-6 max-w-md">
        The requested route does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
      >
        Return to Home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-[#080F0E] text-white min-h-screen font-sans antialiased flex flex-col justify-between">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<SingleInsight />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}