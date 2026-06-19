/**
 * @file Hero.jsx
 * @description Educational portal hero section featuring gradient meshes, text entrances, and high-quality visuals.
 * 
 * Front-End Engineering (CO1) Concepts:
 * - Fluid spatial grid layouts, optimized typographic scale, high-impact CTA anchors.
 * - Entrance transitions on typography nodes to establish visual flow and positive user engagement.
 * - Staggered layout groups for headlines, CTAs, and dashboard elements.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, GraduationCap, Sparkles, BookOpen, Clock, ShieldCheck } from 'lucide-react';

export default function Hero({ currentUser, onScrollToFeatures }) {
  // Animation presets (CO1: Professional entrance motion)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: 'spring', stiffness: 100, damping: 15 } 
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white py-16 lg:py-24">
      
      {/* Decorative Blur Backdrops (CO1 Style Architecture) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Hero Left Content Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Pill Highlights */}
            <motion.div 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-xs font-semibold tracking-wide"
              variants={itemVariants}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin" />
              <span>Admissions Open for Academic Session 2026-27</span>
            </motion.div>

            {/* Headline and Subtitle */}
            <div className="space-y-4">
              <motion.h1 
                className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-950 leading-tight"
                variants={itemVariants}
              >
                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Future</span> <br />
                Starts Here
              </motion.h1>
              
              <motion.p 
                className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed font-sans"
                variants={itemVariants}
              >
                Apply for admissions online with a simple, fast, and secure process. Aura University offers student-first verification and real-time status tracking.
              </motion.p>
            </div>

            {/* Simulated Value Badges */}
            <motion.div 
              className="grid grid-cols-3 gap-4 border-y border-blue-50 py-4 max-w-lg"
              variants={itemVariants}
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                <BookOpen className="w-4 h-4 text-blue-500 shrink-0" />
                <span>250+ Majors</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Fast Approval</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                <ShieldCheck className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>100% Secure</span>
              </div>
            </motion.div>

            {/* Interactive CTA buttons */}
            <motion.div 
              className="flex flex-wrap items-center gap-4"
              variants={itemVariants}
            >
              <Link 
                to={currentUser ? "/apply" : "/register"}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-2xl text-base font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/10 hover:shadow-xl hover:scale-[1.03] active:scale-95 transition-all duration-300 pointer-events-auto"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <button 
                onClick={onScrollToFeatures}
                className="flex items-center gap-1.5 bg-white border border-blue-100 text-gray-700 hover:bg-blue-50/50 px-8 py-3.5 rounded-2xl text-base font-semibold transition-all duration-300 cursor-pointer"
              >
                Learn More
              </button>
            </motion.div>

          </div>

          {/* Hero Right Column: Dynamic Glassmorphism Portal Preview */}
          <motion.div 
            className="lg:col-span-5 relative"
            variants={itemVariants}
          >
            {/* Visual Abstract Elements */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-10 blur-xl"></div>
            
            <div className="relative bg-white/70 backdrop-blur-md rounded-2xl shadow-xl shadow-blue-900/5 border border-white/60 p-6 sm:p-8 overflow-hidden">
              
              {/* College Banner Overlay Illustration */}
              <div className="relative h-44 rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-black/40 to-black/60 blend-multiply"></div>
                
                {/* Simulated University Visual Badge */}
                <div className="relative z-10 text-center text-white space-y-2">
                  <GraduationCap className="w-10 h-10 mx-auto text-blue-200 animate-bounce" />
                  <p className="font-mono text-[10px] tracking-widest text-blue-300 font-bold uppercase">Welcome aboard</p>
                  <h3 className="font-sans text-xl font-extrabold tracking-tight">AURA CAMPUS</h3>
                </div>
              </div>

              {/* Portal Live Stats Overlays */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50/50 hover:bg-blue-50 border border-blue-100/50 rounded-xl transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                      01
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Eligibility Checked</h4>
                      <p className="text-[10px] text-gray-500">Based on 12th standards</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">Passed</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50/50 hover:bg-blue-50 border border-blue-100/50 rounded-xl transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                      02
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Application Status</h4>
                      <p className="text-[10px] text-gray-500">Fast tracking verified ID</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">Live Tracking</span>
                </div>
              </div>

              {/* Real-time ticker info */}
              <div className="mt-6 text-center">
                <p className="text-[11px] font-mono text-gray-400">
                  Last admission completed 2 minutes ago
                </p>
              </div>

            </div>

          </motion.div>

        </motion.div>
      </div>

    </div>
  );
}
