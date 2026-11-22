import React, { lazy } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, Link } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import SEO from './components/SEO';
import V2Shell from './v2/components/V2Shell';

const HomeV2 = lazy(() => import('./v2/pages/HomeV2'));
const AboutV2 = lazy(() => import('./v2/pages/AboutV2'));
const EvidenceV2 = lazy(() => import('./v2/pages/EvidenceV2'));
const FrameworksV2 = lazy(() => import('./v2/pages/FrameworksV2'));
const Insights = lazy(() => import('./pages/Insights'));
const SingleInsight = lazy(() => import('./pages/SingleInsight'));
const Contact = lazy(() => import('./pages/Contact'));
const MaxwellExcel = lazy(() => import('./pages/MaxwellExcel'));
const Demo = lazy(() => import('./pages/Demo'));
const GatedDemo = lazy(() => import('./pages/GatedDemo'));
const Portal = lazy(() => import('./pages/Portal'));
const Velyqua = lazy(() => import('./pages/Velyqua'));
const GamePlatform = lazy(() => import('./pages/GamePlatform'));
const OrqeviaControl = lazy(() => import('./pages/OrqeviaControl'));
const AgentNetwork = lazy(() => import('./pages/AgentNetwork'));
const SkyTablet = lazy(() => import('./pages/SkyTablet'));

function NotFound() {
  return (
    <>
      <SEO title="404 - Page Not Found" description="The requested Authority Engine page could not be located." noindex />
      <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4">
        <div className="eyebrow">404</div>
        <h1 className="mt-4 text-5xl font-black text-white">Signal lost.</h1>
        <p className="text-slate-400 mt-3 mb-7 max-w-md">The requested route does not exist or has moved.</p>
        <Link to="/" className="premium-button px-6 py-3 rounded-full font-semibold">Return home</Link>
      </div>
    </>
  );
}

/** Product tools retain their behaviour inside the shared portfolio navigation. */
function LegacyShell() {
  return <V2Shell legacy />;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<V2Shell />}>
          <Route path="frameworks" element={<><SEO title="Decision frameworks that turn signals into action" description="Explore practical frameworks, mental models and unconventional strategies for finding bottlenecks, testing assumptions and making better operational decisions." /><FrameworksV2 /></>} />
          <Route
            index
            element={
              <>
                <SEO
                  title="Operations Intelligence & Applied AI in Singapore"
                  description="Andrew Lam connects 20+ years in operations with analytics, cloud training and applied AI. Explore career evidence, verified credentials and the VELYQUA prototype."
                />
                <HomeV2 />
              </>
            }
          />
          <Route
            path="about"
            element={
              <>
                <SEO
                  title="About Andrew Lam"
                  description="Meet Andrew Lam in Singapore: 20+ years in supply chain and logistics, applied AI credentials, cloud training and an emerging Industrial AI focus."
                />
                <AboutV2 />
              </>
            }
          />
          <Route
            path="evidence"
            element={
              <>
                <SEO
                  title="Evidence"
                  description="Real operating evidence, synthetic prototypes and concepts, each graded by what it actually is, with an explicit statement of what it does not claim."
                />
                <EvidenceV2 />
              </>
            }
          />
        </Route>

        <Route element={<LegacyShell />}>
          <Route
            path="insights"
            element={
              <>
                <SEO title="Evidence, Experiments & Case Studies" description="Inspect operational evidence, decision frameworks, analytics experiments and working systems built by Andrew Lam." />
                <Insights />
              </>
            }
          />
          <Route path="insights/:slug" element={<SingleInsight />} />
          <Route
            path="contact"
            element={
              <>
                <SEO title="Contact Andrew Lam" description="Discuss Singapore operations intelligence, AI-enabled operations, analytics and cloud roles, or a potential VELYQUA customer pilot with Andrew Lam." />
                <Contact />
              </>
            }
          />
          <Route path="maxwell-excel" element={<MaxwellExcel />} />
          <Route path="demo" element={<Demo />} />
          <Route path="portal" element={<><SEO title="The Portal — Connected Knowledge & Evidence" description="Explore Andrew Lam's interactive knowledge graph and the Portal Evidence Lab for reading and comparing public transaction evidence." /><Portal /></>} />
          <Route path="velyqua" element={<><SEO title="VELYQUA — Aquatic Monitoring & Decision Support" description="Explore Andrew Lam's freshwater aquarium prototype, manual water tests and care records, plus development and customer-pilot goals for AI-assisted monitoring." /><Velyqua /></>} />
          <Route path="game-platform" element={<GamePlatform />} />
          <Route
            path="sky-tablet"
            element={
              <>
                <SEO title="The Sky Tablet - Public Build" description="Explore Andrew Lam's interactive Mesopotamian astronomy and cuneiform working prototype, with explicit scholarly evidence boundaries." />
                <SkyTablet />
              </>
            }
          />
          <Route path="jarvis" element={<Navigate to="/orqevia" replace />} />
          <Route path="jarvis/agents" element={<Navigate to="/orqevia/agents" replace />} />
          <Route path="orqevia" element={<OrqeviaControl />} />
          <Route path="orqevia/agents" element={<AgentNetwork />} />
          <Route path="locked-demo" element={<GatedDemo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
