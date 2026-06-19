/**
 * @file AdmissionProcess.jsx
 * @description Educational admission pipeline timeline with connected visual nodes and clean descriptions.
 * 
 * Front-End Engineering (CO1) Concepts:
 * - Fluid grid layout displaying sequentially numbered nodes.
 * - Interactive hover highlight scales on each timeline step.
 * - High accessibility using readable dark icon colors set against high contrast light canvases.
 */

import React from 'react';
import { 
  UserPlus, 
  FileEdit, 
  Upload, 
  CreditCard, 
  FileCheck2, 
  CheckCircle 
} from 'lucide-react';

export default function AdmissionProcess() {
  const steps = [
    {
      number: '01',
      title: 'Create Account',
      description: 'Sign up on our admissions catalog with a valid email to set up your personal student workspace.',
      icon: UserPlus,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      tag: '5 Minutes'
    },
    {
      number: '02',
      title: 'Fill Application',
      description: 'Enter your academic goals, personal bio data, and preferred courses in under 15 minutes.',
      icon: FileEdit,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      tag: '10 Minutes'
    },
    {
      number: '03',
      title: 'Upload Documents',
      description: 'Safely drag and drop transcripts, personal profile photos, and identification documents in PDF format.',
      icon: Upload,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      tag: 'Secure Encryption'
    },
    {
      number: '04',
      title: 'Pay Fees',
      description: 'Submit administrative assessment fees through our verified, end-to-end encrypted integration billing system.',
      icon: CreditCard,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      tag: 'Instant Receipt'
    },
    {
      number: '05',
      title: 'Verification',
      description: 'Our digital registrar audits your credentials against university criteria and verifies transcripts.',
      icon: FileCheck2,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      tag: '1-2 Days Duration'
    },
    {
      number: '06',
      title: 'Admission Confirmation',
      description: 'Receive your official university offer letter, generated instantly and logged in your system dashboard.',
      icon: CheckCircle,
      color: 'bg-sky-50 text-sky-600 border-sky-100',
      tag: 'Congratulations'
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-blue-50/50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header descriptive content */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs text-indigo-600 tracking-widest font-bold uppercase py-1 px-3 bg-indigo-50 bg-opacity-80 rounded-full border border-indigo-100">
            Admissions Flowchart
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Our Straightforward Admission Process
          </h2>
          <p className="text-base sm:text-lg text-gray-500 font-sans max-w-2xl mx-auto">
            From registration to final confirmation, follow these six consecutive phases to secure your enrollment.
          </p>
        </div>

        {/* Timeline structural frames (Connected nodes vertical pipeline on mobile, grid layout on desktop) */}
        <div className="relative mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Subtle connected path line across grid row on large displays */}
          <div className="hidden lg:block absolute top-[43px] left-8 right-8 h-0.5 bg-gradient-to-r from-blue-100 via-indigo-100 to-sky-100 -z-10"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className="group relative bg-white border border-blue-50 hover:border-blue-100 p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start gap-4"
              >
                
                {/* Step Top Bar: Icon circle + Sequence text */}
                <div className="flex items-center justify-between w-full">
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300 ${step.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  {/* Digital Index Number indicator */}
                  <span className="font-mono text-4xl font-black text-blue-100 tracking-wider group-hover:text-blue-500/20 transition-colors">
                    {step.number}
                  </span>
                </div>

                {/* Text credentials */}
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="font-sans text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>
                    <span className="text-[10px] font-semibold text-blue-600 bg-blue-50/70 py-0.5 px-2 rounded-md">
                      {step.tag}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 font-sans leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Highlight visual indicator on card deck base */}
                <div className="absolute bottom-0 inset-x-8 h-1 rounded-t-full bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
