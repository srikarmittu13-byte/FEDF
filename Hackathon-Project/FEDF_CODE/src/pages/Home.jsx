/**
 * @file Home.jsx
 * @description Coordinate core portal modules alongside "Why Choose Us" and high-impact CTA anchors.
 * 
 * Front-End Engineering (CO1) Concepts:
 * - Structured section groupings using standard `<section>` semantic blocks.
 * - Cohesive visual color styling using brand-standard blue-and-white accents.
 * 
 * JavaScript Engineering (CO2) Concepts:
 * - Declarative maps to render comparative lists with zero manual node repetition.
 * - Pass core user state down as parameters to adjust CTA destinations (Login/Apply).
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, HeartHandshake, Eye, Sparkles, GraduationCap, ArrowRight } from 'lucide-react';

// Import subcomponents
import Hero from '../components/Hero';
import Features from '../components/Features';
import AdmissionProcess from '../components/AdmissionProcess';
import Statistics from '../components/Statistics';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

export default function Home({ currentUser }) {

  const scrollToFeatures = () => {
    const el = document.getElementById('features-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const choicePros = [
    {
      title: 'Transparent Process',
      desc: 'Check live status changes on your student dashboard. No hidden guidelines or paperwork.',
      icon: Eye,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100'
    },
    {
      title: 'Fast Verification',
      desc: 'Our automated transcript reviewers verify basic eligibility standards within 24 hours of submission.',
      icon: Zap,
      color: 'text-blue-600 bg-blue-50 border-blue-100'
    },
    {
      title: 'Secure Payments',
      desc: 'Process enrollment assessment fees through completely encrypted merchant vaults with instant digital invoicing.',
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
    },
    {
      title: 'Student Friendly Guidance',
      desc: 'Access responsive text guidance systems throughout the multi-step university registration forms.',
      icon: HeartHandshake,
      color: 'text-rose-600 bg-rose-50 border-rose-100'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* 2. Hero Section */}
      <Hero currentUser={currentUser} onScrollToFeatures={scrollToFeatures} />

      {/* 5. Statistics Section */}
      <Statistics />

      {/* 3. Features Section (Containing embedded dynamic Eligibility Checker) */}
      <Features />

      {/* 4. Admission Process Pipeline Timeline */}
      <AdmissionProcess />

      {/* 6. Why Choose Us Section */}
      <section className="py-24 bg-white border-t border-blue-50/50 relative overflow-hidden">
        
        {/* Subtle blur highlights */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-4 right-1/4 w-96 h-96 bg-indigo-100/20 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual Highlight Left Frame */}
            <div className="text-left space-y-6">
              <span className="font-mono text-xs text-blue-600 tracking-widest font-bold uppercase py-1 px-3 bg-blue-50 bg-opacity-80 rounded-full border border-blue-100">
                Institutional Pillar
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Designed From The Ground Up For Aspiring Minds
              </h2>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl">
                Aura University’s digital admissions suite bridges the gap between students and high-tier academic programs. We ensure your documentation and criteria checking flow smoothly.
              </p>
              
              {/* Highlight bullet points */}
              <div className="space-y-3 font-semibold text-xs text-gray-700">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>100% cloud-hosted student dashboard workspace</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>Direct link connection to specialized course registrar offices</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <span>Immediate notification lists tracking submission changes</span>
                </div>
              </div>
            </div>

            {/* Structured Comparative Grid Right Column (CO1 Grid layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {choicePros.map((pro, index) => {
                const ProIcon = pro.icon;
                return (
                  <div 
                    key={index}
                    className="p-6 bg-gray-50/50 hover:bg-white border border-blue-50 hover:border-blue-100 rounded-3xl hover:shadow-lg transition-all duration-300 text-left space-y-4"
                  >
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${pro.color}`}>
                      <ProIcon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-sans font-bold text-gray-900 text-sm">{pro.title}</h4>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">{pro.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* 7. Testimonials Section */}
      <Testimonials />

      {/* 8. FAQ Section */}
      <FAQ />

      {/* 9. Call-To-Action (CTA) Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center relative overflow-hidden">
        
        {/* Absolute mesh circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/20 rounded-full -translate-x-1/3 translate-y-1/3 -z-10"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="w-16 h-16 bg-white/15 backdrop-blur border border-white/20 rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <GraduationCap className="w-8 h-8 text-blue-200" />
          </div>

          <div className="space-y-3">
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Begin Your Academic Journey?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 max-w-lg mx-auto">
              Join more than 10,000 enrolled students. Register today, select your target major, and let your scholastic career flourish.
            </p>
          </div>

          <div>
            <Link 
              to={currentUser ? "/apply" : "/register"}
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:text-blue-700 font-bold px-8 py-4 rounded-2xl hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-sm pointer-events-auto cursor-pointer"
            >
              <span>Apply Today</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
