/**
 * @file Footer.jsx
 * @description Comprehensive footer module with system navigation, social branding links, and contact records.
 * 
 * Front-End Engineering (CO1) Concepts:
 * - Structured footer with layout alignment across mobile, tablet, and desktop viewports.
 * - Social action triggers styled with smooth hover color transitions.
 * - Underlines semantic `<address>` formatting for contact credentials.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Globe, BookmarkCheck, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinksComp = {
    admissions: [
      { name: 'Core Eligibility Criteria', href: '#features-section' },
      { name: 'University Offers & Fees', href: '#' },
      { name: 'Required Documents list', href: '#' },
      { name: 'Undergraduate Calendar', href: '#' }
    ],
    support: [
      { name: 'Admissions FAQ Desk', href: '#' },
      { name: 'Registrar Help Desk', href: '#' },
      { name: 'Accessibility policy', href: '#' },
      { name: 'Student Handbook PDF', href: '#' }
    ]
  };

  return (
    <footer className="bg-gray-950 text-gray-400 py-16 border-t border-gray-900 font-sans transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand/About Col (4 cols) */}
          <div className="md:col-span-5 space-y-6 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-base font-bold text-white tracking-tight">
                  AURA UNIVERSITY
                </span>
                <span className="font-mono text-[8px] tracking-widest text-indigo-400 font-bold -mt-1 uppercase">
                  Admissions Division
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Empowering students globally through modern, highly accessible admissions pipelines. Secure your position and track verification sessions end-to-end.
            </p>

            {/* Social credentials */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-900 hover:bg-blue-600/20 hover:text-blue-400 border border-gray-800 flex items-center justify-center transition-all duration-300">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-900 hover:bg-blue-600/20 hover:text-blue-400 border border-gray-800 flex items-center justify-center transition-all duration-300">
                <BookmarkCheck className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column (3 cols) */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-xs font-bold text-gray-200 uppercase tracking-widest mb-5 border-l-2 border-blue-500 pl-2.5">
              Admission Guides
            </h4>
            <ul className="space-y-3.5 text-sm">
              {footerLinksComp.admissions.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-blue-400 flex items-center gap-1 group transition-colors">
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-gray-700 group-hover:text-blue-400 transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column (2 cols) */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-bold text-gray-200 uppercase tracking-widest mb-5 border-l-2 border-indigo-500 pl-2.5">
              Resources
            </h4>
            <ul className="space-y-3.5 text-sm">
              {footerLinksComp.support.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-indigo-400 flex items-center gap-1 group transition-colors">
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col (2 cols) */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-bold text-gray-200 uppercase tracking-widest mb-5 border-l-2 border-emerald-500 pl-2.5">
              Campus Office
            </h4>
            
            {/* Semantic <address> tag (CO1 Best Practice) */}
            <address className="not-italic space-y-4 text-xs font-medium leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Aura Campus Way,<br />
                  Avenue Suite 101,<br />
                  NY 10001
                </span>
              </div>
              <div className="flex items-center gap-2.5 border-t border-gray-900 pt-3">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <a href="mailto:registrar@aura.edu" className="hover:text-white transition-colors">
                  registrar@aura.edu
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="tel:+1800123456" className="hover:text-white transition-colors">
                  +1 (800) 123-456
                </a>
              </div>
            </address>
          </div>

        </div>

        {/* Footer Base bar */}
        <div className="mt-16 pt-8 border-t border-gray-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div>
            &copy; {currentYear} Aura University Admissions. All rights reserved.
          </div>
          
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <button 
              onClick={handleScrollToTop}
              className="text-blue-500 hover:text-blue-400 font-bold focus:outline-none flex items-center gap-1 transition-colors cursor-pointer"
            >
              Back to top ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
