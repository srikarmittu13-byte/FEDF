/**
 * @file Features.jsx
 * @description Features overview section containing interactive widgets (Eligibility Checker Form).
 * 
 * Front-End Engineering (CO1) Concepts:
 * - Dynamic interactive elements that avoid stale static representations, reinforcing real value.
 * - Accessible `<form>` state tracking, responsive validation message alerts.
 * - Glassmorphic card styling with border details and custom icon backgrounds.
 * 
 * JavaScript Engineering (CO2) Concepts:
 * - Form event handlers with `e.preventDefault()`, input cleansing, and async state checks.
 * - Modular structures with responsive map iterations over constant metadata objects.
 */

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  UploadCloud, 
  CreditCard, 
  Search, 
  BellRing, 
  FileCheck, 
  HelpCircle, 
  Sparkles,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { apiService } from '../services/api';

export default function Features() {
  // Local state for the Eligibility Checker widget (CO2: Unidirectional interactive data states)
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [percentage, setPercentage] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Fetch courses asynchronously from our service layer (CO2: Async lifecycle handling)
    const loadCourses = async () => {
      const data = await apiService.getCourses();
      setCourses(data);
      if (data.length > 0) {
        setSelectedCourse(data[0].id);
      }
    };
    loadCourses();
  }, []);

  const handleCheckEligibility = async (e) => {
    e.preventDefault();
    setChecking(true);
    setResult(null);

    try {
      const outcome = await apiService.checkEligibility(percentage, selectedCourse);
      setResult(outcome);
    } catch (err) {
      setResult({ eligible: false, message: 'Invalid inputs. Please check your data.' });
    } finally {
      setChecking(false);
    }
  };

  // Static Metadata of portal capabilities for cards rendering (CO1 Layout structure)
  const featuresList = [
    {
      icon: Search,
      color: 'bg-blue-100 text-blue-600',
      title: 'Eligibility Checker',
      description: 'Find compatible majors instantly using our dynamic background eligibility algorithm.'
    },
    {
      icon: FileCheck,
      color: 'bg-indigo-100 text-indigo-600',
      title: 'Online Application',
      description: 'Fill in comprehensive personal, academic, and administrative details via our smooth unified form.'
    },
    {
      icon: UploadCloud,
      color: 'bg-emerald-100 text-emerald-600',
      title: 'Document Upload',
      description: 'Drag and drop layout structures with size verification checks for credentials and files.'
    },
    {
      icon: CreditCard,
      color: 'bg-purple-100 text-purple-600',
      title: 'Secure Fee Payment',
      description: 'Certified industry payment forms for fast transactional processing.'
    },
    {
      icon: TrendingUp,
      color: 'bg-amber-100 text-amber-600',
      title: 'Status Tracking',
      description: 'Interactive timeline verification checklist monitoring registrar review sessions.'
    },
    {
      icon: BellRing,
      color: 'bg-sky-100 text-sky-600',
      title: 'Instant Notifications',
      description: 'Email receipt logs and immediate status notifications at each enrollment stage.'
    }
  ];

  return (
    <section id="features-section" className="py-20 bg-gray-50/50 scroll-mt-12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content description */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs text-blue-600 tracking-widest font-bold uppercase py-1 px-3 bg-blue-50 bg-opacity-80 rounded-full border border-blue-100">
            Engineered Excellence
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Comprehensive Digital Admissions
          </h2>
          <p className="text-base sm:text-lg text-gray-500 font-sans max-w-2xl mx-auto">
            Experience a streamlined university application portal designed to eliminate administrative complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Card Grid displaying portal capabilities (8 columns on large screens) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuresList.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={idx}
                  className="group relative bg-white border border-blue-50 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-200/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-50/20 to-transparent rounded-bl-full group-hover:scale-110 transition-transform duration-300"></div>
                  
                  {/* Icon wrap */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-inner ${feature.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="font-sans text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-sans mt-2.5 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Interactive eligibility checker widget (5 columns) */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-5 blur-xl"></div>
            
            <div className="relative bg-white border border-blue-100 rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden">
              
              {/* Widget banner header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white flex items-center justify-between">
                <div>
                  <h3 className="font-sans text-lg font-extrabold tracking-tight">Interactive Eligibility Checker</h3>
                  <p className="text-blue-100 text-xs mt-0.5">Check your chances instantly based on academic merit</p>
                </div>
                <Sparkles className="w-6 h-6 text-blue-200 animate-pulse shrink-0" />
              </div>

              {/* Form elements (CO1 & CO2 input control flows) */}
              <form onSubmit={handleCheckEligibility} className="p-6 sm:p-8 space-y-5">
                
                {/* Degree Target Area Selection */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="eligibility-course" className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Select Target Program
                  </label>
                  <select
                    id="eligibility-course"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full bg-gray-50 border border-blue-100 text-gray-800 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer"
                  >
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name} (Min: {course.minPercentage}%)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Score inputs */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="eligibility-percentage" className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                    12th Grade / Equivalent Percentage %
                  </label>
                  <div className="relative">
                    <input
                      id="eligibility-percentage"
                      type="number"
                      required
                      min="0"
                      max="100"
                      step="any"
                      placeholder="e.g. 84.5"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      className="w-full bg-gray-50 border border-blue-100 text-gray-800 rounded-xl pl-4 pr-12 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
                      %
                    </div>
                  </div>
                </div>

                {/* Trigger Button */}
                <button
                  type="submit"
                  disabled={checking}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/10 hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
                >
                  {checking ? (
                    <div className="flex items-center gap-1.5">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <span>Validate My Eligibility</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </button>

                {/* Result output frames (Interactive and Responsive) */}
                {result && (
                  <div 
                    className={`p-4 rounded-xl border flex items-start gap-3 text-left animate-fade-in transition-all ${
                      result.eligible 
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                        : 'bg-rose-50 border-rose-100 text-rose-800'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {result.eligible ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <HelpCircle className="w-5 h-5 text-rose-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wide">
                        {result.eligible ? 'Eligibility Matches' : 'Action Recommended'}
                      </h4>
                      <p className="text-xs font-medium mt-1 leading-relaxed">
                        {result.message}
                      </p>
                    </div>
                  </div>
                )}

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
