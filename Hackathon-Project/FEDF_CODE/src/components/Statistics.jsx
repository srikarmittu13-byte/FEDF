/**
 * @file Statistics.jsx
 * @description Academic stats section with real-time numeric counting loops.
 * 
 * JavaScript Engineering (CO2) Concepts:
 * - Increment interval timers inside `useEffect` with appropriate lifecycle cleanups.
 * - Solves memory leaks by clearing `setInterval` objects immediately on unmount.
 * - Pure declarative JS state to drive immediate HTML node redraws.
 * 
 * Front-End Engineering (CO1) Concepts:
 * - Fluid grid layout displaying numerical metric hierarchies.
 * - Interactive custom CSS glassmorphism overlay containing stats counters.
 */

import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, Building2, Percent } from 'lucide-react';

export default function Statistics() {
  // Counters states (CO2: Numeric accumulator states)
  const [students, setStudents] = useState(9000);
  const [courses, setCourses] = useState(150);
  const [depts, setDepts] = useState(20);
  const [success, setSuccess] = useState(70);

  useEffect(() => {
    // Dynamic progressive counter implementation (CO2: Interval setup with cleanup logs)
    const duration = 1200; // Count duration in ms
    const intervalStep = 20;
    const steps = duration / intervalStep;

    const studentIncrement = (10000 - 9000) / steps;
    const coursesIncrement = (250 - 150) / steps;
    const deptsIncrement = (50 - 20) / steps;
    const successIncrement = (95 - 70) / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setStudents(10000);
        setCourses(250);
        setDepts(50);
        setSuccess(95);
        clearInterval(timer);
      } else {
        setStudents(prev => Math.min(Math.floor(prev + studentIncrement), 10000));
        setCourses(prev => Math.min(Math.floor(prev + coursesIncrement), 250));
        setDepts(prev => Math.min(Math.floor(prev + deptsIncrement), 50));
        setSuccess(prev => Math.min(Math.floor(prev + successIncrement), 95));
      }
    }, intervalStep);

    // CRITICAL (CO2): Wipe timer upon component unmount to prevent persistent memory leaks
    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      label: 'Enrolled Students',
      value: `${students.toLocaleString()}+`,
      icon: Users,
      color: 'from-blue-500 to-indigo-500',
      description: 'Active young minds across multiple study campuses.'
    },
    {
      label: 'Offered Courses',
      value: `${courses}+`,
      icon: GraduationCap,
      color: 'from-indigo-500 to-purple-500',
      description: 'Accredited undergraduate & postgraduate modules.'
    },
    {
      label: 'Specialist Departments',
      value: `${depts}+`,
      icon: Building2,
      color: 'from-purple-500 to-pink-500',
      description: 'Expert research centers and learning zones.'
    },
    {
      label: 'Admission Success',
      value: `${success}%`,
      icon: Percent,
      color: 'from-emerald-500 to-teal-500',
      description: 'High standard recommendation & student support rate.'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-r from-blue-900 to-indigo-950 text-white relative overflow-hidden">
      
      {/* Visual background decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] -z-10"></div>
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Layout stats column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-left"
              >
                {/* Floating blur overlay accent background */}
                <div className={`absolute top-0 left-0 w-2 h-full rounded-l-3xl bg-gradient-to-b ${stat.color}`}></div>

                {/* Stat Header Wrap: Icon / Label */}
                <div className="flex items-center justify-between">
                  <div className="text-[10px] tracking-widest font-mono font-bold text-blue-300 uppercase">
                    {stat.label}
                  </div>
                  <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-blue-300" />
                  </div>
                </div>

                {/* Core counter displays */}
                <div className="mt-4">
                  <span className="font-sans text-4xl sm:text-5xl font-black tracking-tight block">
                    {stat.value}
                  </span>
                  <p className="text-xs text-blue-100/70 font-sans mt-2.5 leading-relaxed">
                    {stat.description}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
