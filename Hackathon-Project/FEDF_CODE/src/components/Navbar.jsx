/**
 * @file Navbar.jsx
 * @description Sticky Navigation Bar with dynamic auth states, high-contrast branding, and mobile drawer.
 * 
 * Front-End Engineering (CO1) Concepts:
 * - Accessibly sized 44px + interactive touch targets on desktop and mobile.
 * - Dynamic structural layout shifts depending on application auth status (logged in vs. logged out).
 * - Semantic `<nav>` landmark and responsive glassmorphism configuration.
 */

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, User, LogOut, ClipboardList, LogIn, UserPlus } from 'lucide-react';

export default function Navbar({ currentUser, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = () => {
    onLogout();
    setIsOpen(false);
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path 
      ? 'text-blue-600 font-semibold border-b-2 border-blue-600' 
      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 md:hover:bg-transparent';
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-blue-100/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Brand Frame */}
          <Link to="/" className="flex items-center gap-2 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-lg font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                AURA UNIVERSITY
              </span>
              <span className="font-mono text-[9px] tracking-widest text-indigo-500 font-bold -mt-1 uppercase">
                Admission Portal
              </span>
            </div>
          </Link>

          {/* Desktop Links (CO1: Clean Responsive Hidden Trigger) */}
          <div className="hidden md:flex items-center justify-end gap-6 flex-1 ml-10">
            <Link to="/" className={`px-2 py-1 text-sm tracking-wide transition-all duration-200 ${isActive('/')}`}>
              Home
            </Link>
            
            {currentUser && (
              <Link to="/apply" className={`px-2 py-1 text-sm tracking-wide transition-all duration-200 ${isActive('/apply')}`}>
                Dashboard & Apply
              </Link>
            )}

            {!currentUser ? (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
                <Link 
                  to="/register"
                  className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-700 shadow-sm shadow-blue-500/10 hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200"
                >
                  <UserPlus className="w-4 h-4" />
                  Apply Now
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4 border-l border-blue-50 pl-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'S'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-800 line-clamp-1">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-gray-400 -mt-1 font-mono">
                      Student
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-white hover:bg-rose-500 border border-transparent hover:border-rose-600 rounded-lg transition-all duration-200"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Hamburger Menu Toggle (CO1: 44px Interaction Area) */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition-all"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer (CO1: Responsive Sidebar Overlay) */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-blue-100 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 rounded-xl text-base font-medium tracking-wide text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
          >
            Home
          </Link>

          {currentUser && (
            <Link
              to="/apply"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 rounded-xl text-base font-medium tracking-wide text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
            >
              Dashboard & Apply
            </Link>
          )}

          {!currentUser ? (
            <div className="pt-4 border-t border-blue-50 space-y-2 px-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-base font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 transition-all"
              >
                <LogIn className="w-5 h-5" />
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-base font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-sm transition-all animate-pulse"
              >
                <UserPlus className="w-5 h-5" />
                Apply Now
              </Link>
            </div>
          ) : (
            <div className="pt-4 border-t border-blue-50 space-y-3 px-2">
              <div className="flex items-center gap-3 py-1">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">{currentUser.name}</div>
                  <div className="text-xs text-gray-400 font-mono">{currentUser.email}</div>
                </div>
              </div>
              
              <button
                onClick={handleLogoutClick}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white rounded-xl text-base font-semibold transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
