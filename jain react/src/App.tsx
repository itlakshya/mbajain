/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ChevronDown, 
  Globe, 
  BookOpen, 
  Award, 
  Briefcase, 
  ArrowRight, 
  Menu, 
  X,
  GraduationCap,
  TrendingUp,
  Users,
  ShieldCheck
} from 'lucide-react';

// Mock data based on Jain Online MBA International Finance
const CONTENT = {
  programTitle: "Online MBA in International Finance",
  university: "Jain (Deemed-to-be University)",
  hero: {
    title: "MBA in International Finance (Accredited by ACCA, UK)",
    subtitle: "UGC-DEB Entitled Online MBA — A global pathway to elite financial careers with professional accreditation.",
    highlights: [
      "UGC-DEB Entitled & AICTE Approved",
      "Global Curriculum with Industry Projects",
      "Career Support with 2000+ Hiring Partners"
    ]
  },
  comparison: {
    title: "Why Jain Online MBA is the Smart Move",
    left: {
      title: "Traditional MBA",
      items: [
        "Generic Curriculum",
        "Limited Global Exposure",
        "Local Job Markets",
        "Rigid Schedules"
      ]
    },
    right: {
      title: "Jain Online MBA",
      items: [
        "International Finance Focus",
        "Global Financial Insights",
        "International Career Reach",
        "Flexible Online Learning"
      ]
    }
  },
  highlights: [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Recognition",
      desc: "Degree recognized globally, opening doors to international MNCs and Big 4s."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Expert Faculty",
      desc: "Learn from seasoned academicians and industry experts with global experience."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "UGC Entitled",
      desc: "Fully entitled by UGC-DEB, ensuring the highest standards of online education."
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Placement Support",
      desc: "Dedicated career advancement services to help you land your dream role."
    }
  ],
  curriculum: [
    {
      semester: "Semester 1",
      topics: [
        "Business Economics",
        "Sustainability & Ethics",
        "Financial Reporting & Corporate Finance",
        "Organizational Behavior and Human Resources Management",
        "Quantitative Techniques for Business Decisions -I",
        "Generative AI for Online Learners"
      ]
    },
    {
      semester: "Semester 2",
      topics: [
        "Entrepreneurship",
        "Marketing Management",
        "Corporate and Business Law (ACCA)",
        "Taxation (ACCA)",
        "Performance Management (ACCA)"
      ]
    },
    {
      semester: "Semester 3",
      topics: [
        "Business Research Methods",
        "Operations Management",
        "Financial Reporting (ACCA)",
        "Audit and Assurance (ACCA)",
        "Financial Management (ACCA)",
        "Open Elective Course- Strategic Business Leadership (ACCA)"
      ]
    },
    {
      semester: "Semester 4",
      topics: [
        "Analytics for Finance",
        "Financial Markets",
        "Advanced Financial Management (ACCA)",
        "Advanced Performance Management (ACCA)",
        "Cross-Functional Elective Course- Strategic Business Reporting (ACCA)",
        "Master Thesis / Project **"
      ]
    }
  ],
  eligibility: [
    "Bachelor's degree in any discipline from a recognized university.",
    "Minimum of 50% marks in graduation.",
    "Final year students awaiting results can also apply."
  ],
  careers: [
    "Investment Banker",
    "Financial Analyst",
    "Portfolio Manager",
    "Risk Manager",
    "International Trade Consultant",
    "Corporate Treasurer"
  ],
  hiringPartners: [
    "Google", "Amazon", "Flipkart", "Accenture", "Deloitte", 
    "KPMG", "EY", "PwC", "HDFC Bank", "ICICI Bank", 
    "HSBC", "Capgemini", "Infosys", "TCS"
  ],
  fee: {
    emi: "₹12,781",
    note: "* T&C applied"
  },
  faqs: [
    {
      question: "Is an Online MBA in International Finance from JAIN Online worth it?",
      answer: "Yes, pursuing an Online MBA in International Finance from JAIN Online is highly advantageous. With our flexible learning options, experienced faculty, comprehensive curriculum tailored to international finance, and emphasis on practical skills development, students gain valuable expertise to thrive in global financial markets and advance their careers."
    },
    {
      question: "What is the scope of an Online MBA in International Finance?",
      answer: "The scope of Online MBA in International Finance is broad, with graduates finding opportunities in multinational corporations, financial institutions, investment banks, consulting firms, and government agencies. They can work in various sectors such as banking, corporate finance, international trade, investment management, and risk assessment."
    },
    {
      question: "What is the salary range after pursuing an Online MBA in International Finance?",
      answer: "The salary range after completing an Online MBA in International Finance can vary depending on factors such as job role, location, and experience. However, graduates can typically expect to earn salaries ranging from INR 6 lakhs to 25 lakhs per annum, with higher positions and experience commanding higher pay scales."
    },
    {
      question: "What are the eligibility criteria for pursuing an Online MBA in International Finance?",
      answer: "Learners who want to pursue an Online MBA in International Finance typically need to hold a bachelor's degree from a recognised university or institution, with a minimum aggregate score of 50% or its equivalent grade in the qualifying examination. SC/ST candidates will receive a 5% relaxation."
    },
    {
      question: "What job opportunities are available for an Online MBA in international finance?",
      answer: "Job opportunities for graduates with an Online MBA in International Finance include roles such as financial analyst, investment banker, risk manager, financial consultant, and corporate treasurer. These professionals are sought after by multinational corporations, investment firms, banks, financial institutions, and government agencies, both domestically and internationally."
    }
  ]
};

const Navbar = ({ onApply }: { onApply: (title?: string, subtitle?: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-secondary font-bold text-xl">
              J
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-secondary">Jain online</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a
              href="https://wa.me/919061277777?text=Im%20interested%20in%20MBA%2Cneed%20more%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#25D366] font-bold hover:opacity-80 transition-opacity"
              aria-label="Chat with us on WhatsApp"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <button 
              onClick={() => onApply()}
              className="bg-primary text-secondary px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Apply now
            </button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <a
              href="https://wa.me/919061277777?text=Im%20interested%20in%20MBA%2Cneed%20more%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:opacity-80 transition-opacity"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="text-secondary p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-black/5 px-4 py-6 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => { onApply(); setIsOpen(false); }}
                className="bg-primary text-secondary px-6 py-3 rounded-xl text-lg font-bold shadow-lg shadow-primary/20"
              >
                Apply now
              </button>
              <span className="text-secondary/40 text-[10px] font-medium text-center">Start your global career journey today</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onApply }: { onApply: (title?: string, subtitle?: string) => void }) => {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl w-full"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-secondary text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-3.5 h-3.5 md:w-4 h-4 text-secondary" />
              Admission open 2026
            </div>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.2] lg:leading-[1.1] text-secondary mb-6 md:mb-8 px-2 sm:px-0">
              {CONTENT.hero.title}
            </h1>
            <p className="text-sm md:text-xl text-secondary/60 mb-8 md:mb-10 mx-auto lg:mx-0 max-w-2xl leading-relaxed px-4 sm:px-0">
              {CONTENT.hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 md:gap-4 mb-10 md:mb-12 items-center lg:items-start px-2 sm:px-0">
              {CONTENT.hero.highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-3 bg-paper px-4 py-2.5 rounded-full border border-black/5 w-full sm:w-auto">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <span className="text-secondary/80 font-bold text-[11px] md:text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 md:gap-6 w-full sm:w-auto px-2 sm:px-0">
              <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
                <button 
                  onClick={() => onApply()}
                  className="bg-primary text-secondary px-6 md:px-8 py-4 rounded-full text-base md:text-lg font-bold hover:scale-105 transition-transform shadow-xl shadow-primary/30 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <span className="whitespace-nowrap">Speak to counselor</span> <ArrowRight className="w-5 h-5 flex-shrink-0" />
                </button>
                <span className="text-secondary/40 text-[10px] md:text-xs font-medium text-center">Get a free call back from experts</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
                <button 
                  onClick={() => onApply("Download Syllabus", "Enter your details to receive the detailed curriculum.")}
                  className="border border-secondary/10 text-secondary px-6 md:px-8 py-4 rounded-full text-base md:text-lg font-bold hover:bg-secondary/5 transition-colors w-full sm:w-auto"
                >
                  <span className="whitespace-nowrap">Download syllabus</span>
                </button>
                <span className="text-secondary/40 text-[10px] md:text-xs font-medium text-center">Explore the complete curriculum</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Accreditations = () => {
  return (
    <section className="py-12 bg-paper border-y border-black/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h3 className="text-secondary font-bold text-sm md:text-lg uppercase tracking-[0.2em] mb-2">
              Rankings & Accreditations
            </h3>
            <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none gap-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {[
              { label: "NAAC A++", sub: "Highest Grade", color: "bg-emerald-500" },
              { label: "NIRF", sub: "Top 100 University", color: "bg-blue-500" },
              { label: "UGC-DEB", sub: "Entitled Program", color: "bg-amber-500" },
              { label: "AICTE", sub: "Approved", color: "bg-orange-500" },
              { label: "AACSB", sub: "Member", color: "bg-indigo-500" },
              { label: "NBA", sub: "Accredited", color: "bg-rose-500" }
            ].map((acc, i) => (
              <div key={i} className="flex-shrink-0 w-[60vw] sm:w-[40vw] md:w-auto snap-center bg-white p-6 rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center group">
                <div className={`w-2.5 h-2.5 rounded-full ${acc.color} mb-4 group-hover:scale-125 transition-transform`} />
                <div className="font-bold text-secondary text-base md:text-lg mb-1">{acc.label}</div>
                <div className="text-[10px] md:text-xs text-secondary/40 font-bold uppercase tracking-wider">{acc.sub}</div>
              </div>
            ))}
          </div>
          
          <p className="text-secondary/40 text-[10px] md:text-xs font-medium text-center max-w-2xl mx-auto leading-relaxed">
            Jain (Deemed-to-be University) is recognized among the top educational institutions in India for its commitment to excellence.
          </p>
        </div>
      </div>
    </section>
  );
};

const Comparison = ({ onApply }: { onApply: (title?: string, subtitle?: string) => void }) => {
  return (
    <section className="py-16 md:py-20 bg-paper">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary mb-4">
            {CONTENT.comparison.title}
          </h2>
          <div className="w-16 md:w-20 h-1 md:h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
          <div className="bg-white p-8 md:p-10 rounded-[1.5rem] md:rounded-[2rem] border border-black/5 shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold text-secondary/40 mb-6 md:mb-8 uppercase tracking-widest text-xs md:text-sm">
              {CONTENT.comparison.left.title}
            </h3>
            <div className="space-y-4 md:space-y-6">
              {CONTENT.comparison.left.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 md:gap-4 text-secondary/50">
                  <X className="w-4 h-4 md:w-5 md:h-5 text-red-400 mt-1 flex-shrink-0" />
                  <span className="text-base md:text-lg font-medium leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-secondary p-8 md:p-10 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 md:p-8">
              <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-primary opacity-20" />
            </div>
            <h3 className="text-primary mb-6 md:mb-8 uppercase tracking-widest text-xs md:text-sm font-bold">
              {CONTENT.comparison.right.title}
            </h3>
            <div className="space-y-4 md:space-y-6">
              {CONTENT.comparison.right.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 md:gap-4 text-white">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-base md:text-lg font-medium leading-tight">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 md:mt-12 p-5 md:p-6 bg-white/5 rounded-xl md:rounded-2xl border border-white/10">
              <p className="text-white/60 text-xs md:text-sm italic">
                "The curriculum is designed to make you industry-ready from day one."
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button 
            onClick={() => onApply("Speak to Counselor", "Enter your details to get a call back from our academic experts.")}
            className="bg-primary text-secondary px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-xl shadow-primary/30 flex items-center gap-2"
          >
            Choose the smart move <ArrowRight className="w-5 h-5" />
          </button>
          <span className="text-secondary/40 text-xs font-medium">Join 50,000+ students who transformed their careers</span>
        </div>
      </div>
    </section>
  );
};

const Curriculum = ({ onApply }: { onApply: (title?: string, subtitle?: string) => void }) => {
  const [activeSem, setActiveSem] = useState(0);

  return (
    <section id="curriculum" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div className="text-center md:text-left">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-secondary mb-4">
              Comprehensive <br /> <span className="text-primary">curriculum</span>
            </h2>
            <p className="text-secondary/50 font-medium max-w-xl mx-auto md:mx-0">
              Semester-wise breakdown of your learning journey. <br />
              <span className="text-secondary font-bold mt-2 block">
                India’s only online accredited program that provides the highest level of exemptions toward ACCA qualification.
              </span>
            </p>
          </div>
          <div className="flex gap-2 bg-paper p-2 rounded-full mx-auto md:mx-0 overflow-x-auto no-scrollbar max-w-full">
            {CONTENT.curriculum.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSem(i)}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeSem === i ? 'bg-primary text-secondary shadow-lg shadow-primary/20' : 'text-secondary/40 hover:text-secondary'
                }`}
              >
                Sem {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            key={activeSem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 sm:grid-cols-1 gap-3"
          >
            {CONTENT.curriculum[activeSem].topics.map((topic, i) => (
              <div key={i} className="group flex items-center justify-between p-3 md:p-5 bg-paper rounded-xl md:rounded-2xl hover:bg-primary hover:text-secondary transition-all cursor-default h-full">
                <span className="text-[11px] sm:text-sm md:text-lg font-bold leading-tight">{topic}</span>
                <ChevronDown className="w-4 h-4 md:w-5 md:h-5 opacity-0 group-hover:opacity-100 transition-opacity -rotate-90 flex-shrink-0 ml-2 hidden sm:block" />
              </div>
            ))}
          </motion.div>

          <div className="bg-secondary text-white p-8 md:p-10 rounded-[2rem] sticky top-32">
            <GraduationCap className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Master global finance</h3>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6">
              Our curriculum is curated by industry experts to cover the latest trends in international financial management, derivatives, and global markets.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-medium">120+ hours of live learning</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-medium">Case study based pedagogy</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-medium">Industry projects & mentorship</span>
              </li>
            </ul>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => onApply("Download Syllabus", "Enter your details to receive the detailed curriculum.")}
                className="w-full bg-primary text-secondary py-4 rounded-xl text-lg font-bold hover:scale-[1.02] transition-all shadow-xl shadow-primary/20"
              >
                Download detailed syllabus
              </button>
              <span className="text-white/40 text-xs font-medium text-center">Get the complete semester-wise breakdown</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BrightFuture = () => {
  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold text-secondary mb-6">
              A bright <br /> <span className="text-primary">future awaits</span>
            </h2>
            <p className="text-secondary/60 text-lg leading-relaxed mb-10 mx-auto max-w-3xl">
              The Online MBA in International Finance is designed to prepare you for the complexities of the global financial landscape. With a curriculum aligned with international standards and professional accreditations, your career trajectory is set for success.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                { title: "Global opportunities", desc: "Access roles in multinational corporations and international financial hubs." },
                { title: "Industry integration", desc: "Curriculum designed in collaboration with global financial bodies." },
                { title: "Network growth", desc: "Connect with a global community of finance professionals and alumni." }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-paper rounded-2xl border border-black/5 flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary text-lg mb-2">{item.title}</h4>
                    <p className="text-secondary/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Eligibility = () => {
  return (
    <section id="eligibility" className="py-12 md:py-16 bg-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary mb-10">
          Who can <span className="text-primary">apply?</span>
        </h2>
        <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none gap-4 md:gap-8 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar text-left md:text-center">
          {CONTENT.eligibility.map((item, i) => (
            <div key={i} className="flex-shrink-0 w-[85vw] md:w-auto snap-center bg-white p-8 rounded-3xl shadow-sm border border-black/5 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mb-6 shadow-sm">
                0{i + 1}
              </div>
              <p className="text-lg text-secondary/70 font-medium leading-relaxed text-center">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Careers = ({ onApply }: { onApply: (title?: string, subtitle?: string) => void }) => {
  return (
    <section id="careers" className="py-10 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary mb-4">
            Career <span className="text-primary">prospects</span>
          </h2>
          <p className="text-secondary/50 font-medium">Unlock high-growth roles in the global financial sector.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
          {CONTENT.careers.map((role, i) => (
            <div key={i} className="p-4 md:p-8 border border-black/5 rounded-xl md:rounded-2xl hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-paper flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-colors mb-3 md:mb-6">
                <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-sm sm:text-base md:text-xl font-bold text-secondary leading-tight">{role}</h3>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 md:gap-3">
          <button 
            onClick={() => onApply("Speak to Counselor", "Enter your details to get a call back from our academic experts.")}
            className="bg-primary text-secondary px-8 py-3.5 md:px-10 md:py-4 rounded-2xl md:rounded-full text-base md:text-lg font-bold hover:scale-105 transition-transform shadow-xl shadow-primary/30 flex items-center gap-2"
          >
            Launch your global career <ArrowRight className="w-5 h-5" />
          </button>
          <span className="text-secondary/40 text-[10px] md:text-xs font-medium">Get expert guidance from our academic advisors</span>
        </div>
      </div>
    </section>
  );
};

const FeeSection = ({ onApply }: { onApply: (title?: string, subtitle?: string) => void }) => {
  return (
    <section id="fees" className="py-16 md:py-20 bg-paper">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-black/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="text-center lg:text-left">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mb-6">
                Invest in your <br /> <span className="text-primary">global career</span>
              </h2>
              <p className="text-secondary/60 text-lg mb-8 mx-auto lg:mx-0 max-w-xl">
                We offer flexible payment options and easy EMI facilities to ensure that financial constraints don't stand in the way of your ambitions.
              </p>
              <div className="flex flex-col items-center lg:items-start mb-10">
              <div className="flex items-baseline gap-2 sm:gap-4 mb-2">
                <span className="text-4xl sm:text-5xl font-bold text-secondary">{CONTENT.fee.emi}</span>
                <span className="text-secondary/40 font-medium text-sm sm:text-base">per month</span>
              </div>
                <p className="text-secondary/30 text-xs font-medium">{CONTENT.fee.note}</p>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-3">
                <button 
                  onClick={() => onApply("Fee Structure", "Enter your details to receive the complete semester and yearly fee breakdown.")}
                  className="bg-secondary text-white px-10 py-5 rounded-2xl font-bold hover:bg-secondary/90 transition-all shadow-xl shadow-secondary/20 flex items-center justify-center lg:justify-start gap-3 w-full sm:w-auto"
                >
                  View complete fee structure <ArrowRight className="w-5 h-5" />
                </button>
                <span className="text-secondary/40 text-xs font-medium w-full text-center lg:text-left lg:pl-4">Get a detailed semester-wise breakdown</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Easy EMIs", desc: "No-cost EMI options available" },
                { label: "Scholarships", desc: "Merit-based financial aid" },
                { label: "Tax Benefits", desc: "Save under Section 80C" },
                { label: "Corporate Tie-ups", desc: "Special fee for partner firms" }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-paper rounded-2xl border border-black/5">
                  <h4 className="font-bold text-secondary mb-2">{item.label}</h4>
                  <p className="text-secondary/40 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CertificateSection = ({ onApply }: { onApply: (title?: string, subtitle?: string) => void }) => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mb-4">
            Earn a <span className="text-primary">global credential</span>
          </h2>
          <p className="text-secondary/50 font-medium">Your hard work deserves a degree that is recognized worldwide.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center mb-12">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h3 className="text-2xl font-bold text-secondary mb-8">Degrees from JAIN Online are:</h3>
            <ul className="space-y-6 md:space-y-8 max-w-xl mx-auto lg:mx-0">
              <li className="flex gap-4 text-left">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-secondary text-xl mb-2">Equivalent to on-campus degree</h4>
                  <p className="text-secondary/50 leading-relaxed">
                    The degree awarded is equivalent to the JAIN (Deemed-to-be University) on-campus degree, ensuring equal value in the job market.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 text-left">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-secondary text-xl mb-2">Globally recognized</h4>
                  <p className="text-secondary/50 leading-relaxed">
                    Recognized by top employers and academic institutions worldwide, providing you with a truly global career advantage.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative p-4 bg-paper rounded-[2rem] border border-black/5 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=1000" 
                alt="Sample Certificate" 
                className="w-full rounded-xl shadow-lg"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -top-6 -right-6 bg-primary text-secondary font-bold px-6 py-3 rounded-full shadow-xl rotate-12">
                Sample certificate
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button 
            onClick={() => onApply("Speak to Counselor", "Enter your details to get a call back from our academic experts.")}
            className="bg-primary text-secondary px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-xl shadow-primary/30 flex items-center gap-2"
          >
            Get your global degree <ArrowRight className="w-5 h-5" />
          </button>
          <span className="text-secondary/40 text-xs font-medium">Start your journey towards a globally recognized MBA</span>
        </div>
      </div>
    </section>
  );
};

const HiringPartners = () => {
  return (
    <section className="py-16 md:py-20 bg-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mb-4">
            Our alumni <span className="text-primary">work here</span>
          </h2>
          <p className="text-secondary/50 font-medium">Join our graduates at top global organizations.</p>
        </div>
        
        <div className="relative">
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {[...CONTENT.hiringPartners, ...CONTENT.hiringPartners].map((brand, i) => (
              <div key={i} className="bg-white px-10 py-6 rounded-2xl border border-black/5 shadow-sm flex items-center justify-center min-w-[180px]">
                <span className="text-secondary/40 font-bold text-xl uppercase tracking-widest">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const displayedFaqs = showAll ? CONTENT.faqs : CONTENT.faqs.slice(0, 3);

  return (
    <section id="faq" className="py-16 md:py-20 bg-paper">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mb-4">
            Frequently asked <span className="text-primary">questions</span>
          </h2>
          <p className="text-secondary/50 font-medium">Everything you need to know about the program.</p>
        </div>

        <div className="space-y-4">
          {displayedFaqs.map((faq, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl border border-black/5 overflow-hidden transition-all shadow-sm hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <span className="text-lg font-bold text-secondary pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-primary transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 text-secondary/60 leading-relaxed font-medium">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {CONTENT.faqs.length > 3 && (
          <div className="mt-10 text-center flex flex-col items-center gap-3">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="bg-white border border-secondary/10 text-secondary px-8 py-3 rounded-full font-bold hover:bg-secondary/5 transition-colors shadow-sm"
            >
              {showAll ? "View less" : "View more"}
            </button>
            <span className="text-secondary/40 text-xs font-medium">Find answers to all your queries</span>
          </div>
        )}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-secondary py-12 pb-28 md:pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-secondary font-bold text-xl">
            J
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-white">Jain online</span>
        </div>
        <p className="text-white/20 text-sm font-medium">
          © 2026 IIC Lakshya. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [modalContent, setModalContent] = useState({
    title: "Speak to Counselor",
    subtitle: "Enter your details to get a call back from our experts."
  });

  const openModal = (title?: string, subtitle?: string) => {
    setModalContent({
      title: title || "Speak to Counselor",
      subtitle: subtitle || "Enter your details to get a call back from our experts."
    });
    setFullName("");
    setPhone("");
    setModalStep(1);
    setIsModalOpen(true);
  };

  const handleModalStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10 && fullName.trim().length > 0) {
      setModalStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-secondary selection:bg-primary selection:text-white">
      <Navbar onApply={openModal} />
      <main>
        <Hero onApply={openModal} />
        <Accreditations />
        <section id="overview" className="py-12 md:py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary mb-4">
                Program <span className="text-primary">highlights</span>
              </h2>
              <p className="text-secondary/50 font-medium">Why Jain online is the preferred choice for global finance professionals.</p>
            </div>
            <div className="flex md:grid md:grid-cols-4 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none gap-4 md:gap-8 pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
              {CONTENT.highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-[85vw] md:w-auto snap-center p-8 bg-paper rounded-3xl border border-black/5 hover:shadow-xl hover:shadow-black/5 transition-all"
                >
                  <div className="text-primary mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-secondary/50 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <Eligibility />
        <Comparison onApply={openModal} />
        <Curriculum onApply={openModal} />
        <BrightFuture />
        <Careers onApply={openModal} />
        <FeeSection onApply={openModal} />
        <CertificateSection onApply={openModal} />
        <HiringPartners />
        <FAQ />
      </main>
      <Footer />

      {/* Global Application Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-secondary/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 md:p-10 overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-secondary/40 hover:text-secondary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {modalStep === 1 ? (
                <>
                  <div className="mb-8 text-center">
                    <h3 className="text-3xl font-bold text-secondary mb-2">{modalContent.title}</h3>
                    <p className="text-secondary/60">{modalContent.subtitle}</p>
                  </div>
                  <form className="space-y-6" onSubmit={handleModalStep1Submit}>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-secondary/50 uppercase tracking-wider ml-1">Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full px-6 py-4 rounded-2xl bg-paper border border-black/5 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-secondary/50 uppercase tracking-wider ml-1">Mobile Number</label>
                        <div className="flex items-center bg-paper rounded-2xl border border-black/5 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all overflow-hidden">
                          <div className="px-5 py-4 bg-black/5 text-secondary font-bold border-r border-black/5">
                            +91
                          </div>
                          <input 
                            type="tel" 
                            required 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Mobile Number"
                            className="w-full px-6 py-4 bg-transparent outline-none font-medium"
                          />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-primary text-secondary py-5 rounded-2xl text-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20">
                      Continue
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-secondary mb-2">Complete Your Profile</h3>
                    <p className="text-secondary/60">Just a few more details to get you started.</p>
                  </div>
                  <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-secondary/50 uppercase tracking-wider ml-1">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="Enter your email"
                        className="w-full px-6 py-4 rounded-xl bg-paper border border-black/5 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-1.5 relative">
                      <label className="text-xs font-bold text-secondary/50 uppercase tracking-wider ml-1">Current Status / Work Experience</label>
                      <select required className="w-full px-6 py-4 rounded-xl bg-paper border border-black/5 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium appearance-none cursor-pointer">
                        <option value="">Select Experience</option>
                        <option value="graduate">Graduate and Above – No Experience</option>
                        <option value="0-1">0–1 Yr Experience</option>
                        <option value="2-5">2–5 Yrs Experience</option>
                        <option value="5+">5+ Yrs Experience</option>
                      </select>
                      <div className="absolute right-6 bottom-4 pointer-events-none text-secondary/40">
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-primary text-secondary py-5 rounded-xl text-lg font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 mt-4">
                      Submit
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/10 p-3 flex gap-3 z-40 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => openModal('Download Syllabus')}
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 border-2 border-secondary rounded-xl text-secondary hover:bg-secondary/5 transition-colors"
        >
          <span className="font-bold text-[13px] leading-tight">Download brochure</span>
          <span className="text-[9px] font-bold tracking-wider opacity-80 mt-0.5">Get syllabus PDF</span>
        </button>
        <button 
          onClick={() => openModal('Speak to Counselor')}
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 bg-primary border-2 border-primary rounded-xl text-secondary hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          <span className="font-bold text-[13px] leading-tight">Get free counselling</span>
          <span className="text-[9px] font-bold tracking-wider opacity-90 mt-0.5">Speak to expert</span>
        </button>
      </div>

    </div>
  );
}
