import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Insights', path: '/insights' },
    { name: 'Contact', path: '/contact' },
  ]

  const activeStyle = "text-singapore-amber font-semibold"
  const inactiveStyle = "text-slate-300 hover:text-singapore-amber transition-colors duration-150"

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-botanical/85 border-b border-botanical-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Executive Brand Emblem / Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-botanical-card border border-singapore-teal/40 flex items-center justify-center font-black text-xl shadow-sm group-hover:scale-105 transition-transform duration-200">
              <span className="text-singapore-crimson">L</span>
              <span className="text-singapore-amber">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-lg text-slate-100 leading-tight">
                Lam Teck Sing Andrew
              </span>
              <span className="text-xs text-singapore-teal font-medium tracking-wide uppercase">
                Operations Executive
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm tracking-wide ${isActive ? activeStyle : inactiveStyle}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right Action */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-singapore-crimson hover:bg-rose-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <div className="flex items-center space-x-3 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-100 hover:bg-botanical-card focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                /* Close Icon */
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                /* Menu Icon */
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-botanical-border bg-botanical-card transition-colors duration-200">
          <div className="px-4 pt-3 pb-6 space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-botanical " + activeStyle
                      : inactiveStyle
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-2">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-5 py-3 rounded-lg text-sm font-semibold text-white bg-singapore-crimson hover:bg-rose-700 shadow-md transition-all duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}