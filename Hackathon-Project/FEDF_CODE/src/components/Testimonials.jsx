/**
 * @file Testimonials.jsx
 * @description Testimonials section showing verified student enrollment success reviews.
 * 
 * Front-End Engineering (CO1) Concepts:
 * - Visually delightful bento-inspired or card layout with custom avatars and student tags.
 * - Semantic layout structure. High contrast accessibility between textual quotes and panels.
 */

import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Elena Rostova',
      major: 'B.Tech Computer Science',
      percentage: '94.2%',
      quote: 'The digital admission portal made submission exceptionally fast. I verified my high school transcripts, completed the diagnostic eligibility test, paid my fees, and got my offer letter within 36 hours!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120'
    },
    {
      name: 'Marcus Vance',
      major: 'Bachelor of Business Admin (BBA)',
      percentage: '88.6%',
      quote: 'Being able to track my document verification status in real-time was incredibly comforting. I used to call other university registrar offices, but Aura Portal displays updates on our dashboard instantly.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120'
    },
    {
      name: 'Samantha Liang',
      major: 'B.Sc Economics (Hons)',
      percentage: '91.8%',
      quote: 'We uploaded transcripts directly using our mobile devices with simple drag-and-drop. The interface is clean, fast, mobile-friendly, and very responsive. Fully recommended for high school graduates!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120'
    }
  ];

  return (
    <section className="py-20 bg-gray-50/50 border-t border-blue-50/50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title metadata */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs text-sky-600 tracking-widest font-bold uppercase py-1 px-3 bg-sky-50 bg-opacity-80 rounded-full border border-sky-100">
            Student Success Stories
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Hear From Our Admitted Students
          </h2>
          <p className="text-base sm:text-lg text-gray-500 font-sans max-w-2xl mx-auto">
            These graduates completed their admissions online using our streamlined application system.
          </p>
        </div>

        {/* Testimonials grid cards representation (CO1 layout optimization) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((student, index) => (
            <div 
              key={index}
              className="bg-white border border-blue-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Abstract decorative accent */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-blue-50/70 shrink-0" />

              <div className="space-y-6">
                {/* Rating score framework */}
                <div className="flex gap-1 text-amber-400">
                  {[...Array(student.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Testimonial Core Body */}
                <p className="text-sm text-gray-600 italic font-medium leading-relaxed font-sans text-left">
                  "{student.quote}"
                </p>
              </div>

              {/* Student credential footer summary */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
                <img 
                  src={student.avatar} 
                  alt={student.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border border-blue-100 shadow-inner shrink-0"
                />
                
                <div className="text-left">
                  <h4 className="text-sm font-bold text-gray-950 flex items-center gap-1.5">
                    {student.name}
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-50 shrink-0" />
                  </h4>
                  
                  <div className="text-[11px] text-gray-400 font-sans tracking-wide">
                    {student.major}
                  </div>
                  
                  <span className="inline-block text-[10px] font-bold text-blue-600 bg-blue-50/80 px-2 py-0.5 rounded-md mt-1 font-mono">
                    Grade: {student.percentage}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
