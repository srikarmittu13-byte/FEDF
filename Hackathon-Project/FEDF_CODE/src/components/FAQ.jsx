/**
 * @file FAQ.jsx
 * @description Accordion style FAQ section containing common student admission questions.
 * 
 * JavaScript Engineering (CO2) Concepts:
 * - Dynamic state mapping where an integer variable (`activeIndex`) controls the expansion of item details.
 * - Single-toggle toggle operations with parameter inputs (`index`).
 * 
 * Front-End Engineering (CO1) Concepts:
 * - Interactive accordion cards with distinct indicators (Plus/Minus) and touch accessibility.
 * - Visual design layout leveraging smooth height transit styles.
 */

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      q: 'How do I check my eligibility before starting an application?',
      a: 'We have provided an Interactive Eligibility Checker on our portal homepage. Simply select your target course, input your 12th percentage score, and click Validate. It will instantly tell you if your score meets the minimum criteria criteria.'
    },
    {
      q: 'What is the standard document processing time for verification?',
      a: 'Once you successfully submit your application and pay the academic assessment fee, our registration review committee will verify your credentials. Typically, this takes between 24 and 48 hours. You will receive email notifications immediately at each stage of the process.'
    },
    {
      q: 'Is the application assessment fee refundable if I withdraw my candidate portfolio?',
      a: 'The administrative application assessment fee ($50 USD) is non-refundable as it covers the immediate technical licensing and background verification checks run on your transcripts.'
    },
    {
      q: 'Can I apply for multiple courses under a single student portal account?',
      a: 'Yes, you can apply for multiple course programs under the same user workspace! However, you must fill out a separate academic form and complete the verification fee for each major, as details are verified by different departments.'
    },
    {
      q: 'What formats are supported for document uploads?',
      a: 'We support PDF, JPG, and PNG documents. Transcripts must be high-resolution scanned copies with all marks clearly visible. Total upload limits are set to 5MB per file to guarantee server bandwidth performance.'
    },
    {
      q: 'What happens if there is a mistake in my uploaded high school transcript?',
      a: 'If our registrar flags an issue with your uploads, your dashboard application status will update to "Revision Required." You will be allowed to delete the problematic file and re-upload the correct transcript directly from your dashboard without starting over.'
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-blue-50/50 transition-all">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title metadata description */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs text-blue-600 tracking-widest font-bold uppercase py-1 px-3 bg-blue-50 bg-opacity-80 rounded-full border border-blue-100">
            Support Center
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-500 font-sans max-w-2xl mx-auto">
            Got questions about requirements, payments, or timelines? We are here to clarify.
          </p>
        </div>

        {/* FAQs Accordion Deck */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index}
                className={`border border-blue-100/70 rounded-2xl transition-all duration-300 ${
                  isOpen ? 'bg-blue-50/30 border-blue-200 shadow-sm' : 'bg-white hover:bg-gray-50'
                }`}
              >
                {/* Accordion Trigger Header (CO1: Accessible touch targets) */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-sans focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3.5 pr-4">
                    <HelpCircle className={`w-5 h-5 mt-0.5 shrink-0 transition-colors ${isOpen ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="font-sans font-bold text-gray-900 text-sm sm:text-base">
                      {item.q}
                    </span>
                  </div>
                  
                  {/* Chevron rotate indicator */}
                  <div className={`w-8 h-8 rounded-full border border-blue-50 flex items-center justify-center shrink-0 transition-all ${
                    isOpen ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-transparent text-gray-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Nested Panel (CO1: Collapsing state mechanics) */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-80 opacity-100 border-t border-blue-100/50' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="px-6 py-5">
                    <p className="text-sm text-gray-600 leading-relaxed font-sans text-left">
                      {item.a}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
