import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './pages/About'
import Insights from './pages/Insights'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-botanical text-slate-100 flex flex-col antialiased">
        <Navbar />
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}