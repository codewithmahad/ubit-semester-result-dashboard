"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  HelpCircle, 
  BookOpen, 
  Shield, 
  Cpu, 
  MessageCircle, 
  ExternalLink,
  ChevronDown,
  Mail,
  ArrowRight,
  Info
} from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

/**
 * Help Center Page — 11/10 Premium support & documentation hub.
 * Designed with a focus on high-end editorial layouts, smooth interactions,
 * and academic professionalism.
 */
export default function HelpCenterPage() {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  const faqCategories = [
    {
      id: "academic",
      title: "Academic Metrics",
      icon: <BookOpen className="w-5 h-5" />,
      questions: [
        {
          q: "How is SGPA and CGPA calculated?",
          a: "All calculations follow the official University of Karachi (UBIT) grading criteria. SGPA is calculates as weighted average of points earned in a semester, while CGPA is the cumulative average across all completed semesters. You can use our GPA Calculator for simulations."
        },
        {
          q: "What determines the Class Rankings?",
          a: "Rankings are based strictly on Cumulative GPA. In case of a tie, the student with higher aggregate marks across all semesters is ranked higher. Medalists (Gold, Silver, Bronze) are highlighted based on their standings."
        }
      ]
    },
    {
      id: "data",
      title: "Data & Privacy",
      icon: <Shield className="w-5 h-5" />,
      questions: [
        {
          q: "Is this an official University portal?",
          a: "No. This is a student-maintained, unofficial repository. It is designed to provide faster access to results and better analytics than the traditional manual methods, but for legal purposes, only the physical transcript from the UBIT Admin Office is official."
        },
        {
          q: "How is my data protected?",
          a: "We do not store any personal passwords or sensitive student identifiers. The portal uses academic records already available in the public/semi-public domain. You can also use 'Anonymity Mode' (if available) to mask your name on certain views."
        }
      ]
    },
    {
      id: "portal",
      title: "Portal Features",
      icon: <Cpu className="w-5 h-5" />,
      questions: [
        {
          q: "How do I report a grading error?",
          a: "If you find a typo in your marks or personal details, please contact the portal maintainers. However, for official grade changes or re-evaluations, you must visit the Examination Department."
        },
        {
          q: "Can I download my transcript?",
          a: "Yes, you can use the 'Print' or 'Export' buttons on your profile page to generate a clean, web-formatted version of your academic record."
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#f5f7f8] flex flex-col">
      <Nav />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden border-b border-gray-100 bg-white">
        {/* Decorative background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8F141B] opacity-[0.02] rounded-full -mr-64 -mt-32 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0056D2] opacity-[0.02] rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 mb-6">
            <HelpCircle className="w-3.5 h-3.5 text-[#8F141B]" />
            <span className="text-[11px] font-bold text-[#8F141B] uppercase tracking-wider">Support Hub</span>
          </div>
          <h1 className="text-[36px] md:text-[54px] font-black text-[#1f2432] leading-[1.1] mb-6 tracking-tight">
            How can we <span className="text-[#8F141B]">help</span> you today?
          </h1>
          <p className="text-[16px] md:text-[18px] text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Search our comprehensive guides on academic grading, portal features, 
            and data integrity specifically for UBIT students.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="flex-1 py-16 md:py-24 max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: FAQ categories */}
          <div className="lg:col-span-8 space-y-12">
            {faqCategories.map((category) => (
              <div key={category.id} className="group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-white border border-gray-100 shadow-sm text-[#8F141B] group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="text-[20px] font-black text-[#1f2432]">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq, idx) => {
                    const faqId = `${category.id}-${idx}`;
                    const isExpanded = expandedFaq === (category.id.length + idx); // simplified ID for state
                    
                    return (
                      <div 
                        key={idx}
                        className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors"
                      >
                        <button 
                          onClick={() => setExpandedFaq(expandedFaq === (category.id.length + idx) ? null : (category.id.length + idx))}
                          className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group/btn"
                        >
                          <span className="text-[15px] font-bold text-gray-800 leading-snug">{faq.q}</span>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedFaq === (category.id.length + idx) ? 'rotate-180' : ''}`} />
                        </button>
                        <div 
                          className={`transition-all duration-300 ease-in-out ${expandedFaq === (category.id.length + idx) ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                        >
                          <div className="px-6 pb-6 text-[14px] text-gray-600 leading-relaxed font-medium bg-gray-50/50">
                            {faq.a}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Support Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Contact Card */}
            <div className="bg-[#0F172A] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0056D2] opacity-20 rounded-bl-full -mr-8 -mt-8" />
              <div className="relative z-10">
                <h4 className="text-[18px] font-bold mb-3">Still have questions?</h4>
                <p className="text-[13px] text-slate-400 mb-6 leading-relaxed">
                  Can't find what you're looking for? Our student maintainers are here to support your academic journey.
                </p>
                <div className="space-y-3">
                  <a href="mailto:support@ubitresults.com" className="flex items-center gap-3 w-full bg-white/10 hover:bg-white/15 p-3.5 rounded-xl transition-colors group">
                    <div className="p-2 bg-white/10 rounded-lg group-hover:scale-110 transition-transform">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">Email Support</p>
                      <p className="text-[13px] font-bold">contact@ubit.dev</p>
                    </div>
                  </a>
                  <button className="flex items-center gap-3 w-full bg-[#8F141B] hover:bg-[#a11a21] p-3.5 rounded-xl transition-all shadow-lg active:scale-95 group">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] font-black text-white/60 uppercase tracking-tighter">Community</p>
                      <p className="text-[13px] font-bold">Join Discord/WhatsApp</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/50 ml-auto group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Official Links Card */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
              <h4 className="text-[16px] font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Info className="w-4 h-4 text-gray-400" />
                Official Resources
              </h4>
              <ul className="space-y-4">
                {[
                  { label: "UBIT Official Website", url: "https://uok.edu.pk/faculties/computerscience/" },
                  { label: "Exam Dept. Circulars", url: "#" },
                  { label: "UoK Registration Portal", url: "#" }
                ].map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href={link.url}
                      className="group flex items-center justify-between text-[13px] font-semibold text-gray-600 hover:text-[#8F141B] transition-colors"
                    >
                      {link.label}
                      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer Mini-Card */}
            <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5">
              <p className="text-[11px] text-amber-800/80 leading-relaxed font-medium italic">
                Notice: All academic data is provided for informational purposes only. Cross-verify with the official gazette for finality.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
