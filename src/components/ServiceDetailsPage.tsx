
import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { AnimatedHeading, StaggerContainer, StaggerItem } from './animations';
import { Vacancies } from './Vacancies';
import { Contact } from './Contact';

const executiveSearchImg = '/assets/job_interview_meeting.jpeg';
const recruitmentSolutionImg = '/assets/recruitment_process_screening.jpeg';
const hrConsultingImg = '/assets/hr_candidate_evaluation.jpeg';
const learningDevelopmentImg = '/assets/hr_digital_networking_solution.jpeg';
const specialistImg = '/assets/hiring_process_handshake.jpeg';

interface ServiceDetailsPageProps {
  serviceType: 'executive-search' | 'recruitment-solution' | 'hr-consulting' | 'learning-development';
}

interface CaseStudyData {
  caseTitle: string;
  challenge: string;
  solution: string;
  result: string;
  img: string;
}

const caseStudies: Record<ServiceDetailsPageProps['serviceType'], CaseStudyData> = {
  'executive-search': {
    caseTitle: 'Executive Search — FMCG Sector',
    challenge: 'A leading FMCG company required an experienced senior manager within a short timeframe.',
    solution: 'Targeted executive search and industry-specific talent mapping.',
    result: 'Position successfully filled with a highly qualified candidate within the agreed timeline.',
    img: specialistImg,
  },
  'recruitment-solution': {
    caseTitle: 'Recruitment Solutions — Technology & Fintech Sector',
    challenge: 'A rapidly growing tech enterprise needed to scale technical & operational teams by 25+ roles in under 60 days.',
    solution: 'End-to-end recruitment pipeline, structured candidate screening, and dedicated sourcing support.',
    result: 'All key positions successfully onboarded with a 95% retention rate and 40% faster time-to-hire.',
    img: '/assets/candidate_recruitment_sourcing.jpeg',
  },
  'hr-consulting': {
    caseTitle: 'HR Consulting — Corporate Transformation',
    challenge: 'An established organization faced high turnover and fragmented HR policies across multiple departments.',
    solution: 'Comprehensive HR audit, process development, updated compliance policies, and organizational restructuring.',
    result: 'Employee engagement boosted by 35%, standardized workflows across teams, and zero compliance risks.',
    img: '/assets/financial_consulting_collaboration.jpeg',
  },
  'learning-development': {
    caseTitle: 'Learning & Development — Leadership Intervention',
    challenge: 'A growing firm required upskilling for mid-level managers to boost cross-functional collaboration and leadership agility.',
    solution: 'Tailored corporate training workshops, competency assessments, and executive coaching interventions.',
    result: '100% completion rate, notable leadership performance score increase, and improved team productivity.',
    img: '/assets/hr_digital_networking_solution.jpeg',
  },
};

export function ServiceDetailsPage({ serviceType }: ServiceDetailsPageProps) {
  useEffect(() => {
    // Reset page scroll position to top instantly on mount or serviceType change
    const html = document.documentElement;
    const originalBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    html.scrollTop = 0;
    if (document.body) {
      document.body.scrollTop = 0;
    }
    const timer = setTimeout(() => {
      html.style.scrollBehavior = originalBehavior;
    }, 100);
    return () => clearTimeout(timer);
  }, [serviceType]);

  // Determine dynamic heading and image based on serviceType
  let title = '';
  let heroImg = '';

  switch (serviceType) {
    case 'executive-search':
      title = 'Executive Search';
      heroImg = executiveSearchImg;
      break;
    case 'recruitment-solution':
      title = 'Recruitment Solutions';
      heroImg = recruitmentSolutionImg;
      break;
    case 'hr-consulting':
      title = 'HR Consulting';
      heroImg = hrConsultingImg;
      break;
    case 'learning-development':
      title = 'Learning & Development';
      heroImg = learningDevelopmentImg;
      break;
    default:
      title = 'Our Services';
      heroImg = recruitmentSolutionImg;
  }

  const currentCase = caseStudies[serviceType] || caseStudies['executive-search'];

  return (
    <div className="pt-24 pb-12 bg-[#fcfbfa]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

        <div className="relative z-10">
          <AnimatedHeading
            text={title}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-slate-900 tracking-tight leading-[1.1] mb-12 max-w-4xl mx-auto text-center"
            as="h1"
          />

          <div className="relative w-full max-w-5xl aspect-[16/9] md:aspect-[21/9] mx-auto rounded-3xl overflow-hidden shadow-2xl bg-slate-100 mb-16">
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
              style={{ originX: 1 }}
              className="absolute inset-0 bg-[#0b132a] z-10"
            />
            <motion.img
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: 'easeOut', delay: 0.1 }}
              src={heroImg}
              alt={title}
              className="w-full h-full object-cover"
              
            />
          </div>
        </div>
      </section>

      {/* Recruitment Cost Estimator & L&D Interactive Section (Replaces Featured Case Study per prompt instructions) */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden border-t border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Recruitment Cost Estimator */}
            <div className="bg-[#0b132a] text-white rounded-[28px] p-8 sm:p-10 shadow-xl border border-slate-800">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 mb-3 bg-blue-900/50 px-3 py-1.5 rounded-lg inline-block border border-blue-800">
                Interactive Calculator
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3">
                Recruitment Cost Estimator
              </h3>
              <p className="text-slate-300 font-sans text-xs sm:text-sm mb-6 leading-relaxed">
                Estimate recruitment costs based on key organization parameters:
              </p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Position Level</label>
                  <select className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-blue-500">
                    <option>Junior / Mid-Level Position</option>
                    <option>Senior Management</option>
                    <option>Executive / C-Suite Role</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Industry</label>
                  <select className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-blue-500">
                    <option>FMCG & Consumer Goods</option>
                    <option>Textile & Apparel</option>
                    <option>Pharmaceuticals & Healthcare</option>
                    <option>Banking & Financial Services</option>
                    <option>Manufacturing & Engineering</option>
                    <option>Information Technology</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Number of Vacancies</label>
                    <input type="number" defaultValue={1} min={1} className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Hiring Urgency</label>
                    <select className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-blue-500">
                      <option>Standard (30-45 Days)</option>
                      <option>Urgent (15-30 Days)</option>
                      <option>Immediate Headhunt</option>
                    </select>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl transition-colors"
              >
                Request Detailed Estimate Quote
              </a>
            </div>

            {/* Learning & Development Calendar */}
            <div className="bg-[#f8fafc] border border-slate-100 rounded-[28px] p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 mb-3 bg-blue-50 px-3 py-1.5 rounded-lg inline-block">
                  Upcoming Corporate Workshops
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mb-3">
                  Learning & Development Calendar
                </h3>
                <p className="text-slate-500 font-sans text-xs sm:text-sm mb-6 leading-relaxed">
                  Display upcoming corporate training programs with instant registration:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    'Leadership Development',
                    'Communication Skills',
                    'Performance Management',
                    'HR for Non-HR Managers',
                    'Sales Excellence',
                    'Team Building Workshops',
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-100 text-slate-800 font-sans text-xs font-semibold flex items-center gap-2.5 shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-[#0b132a] text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl hover:bg-blue-600 transition-colors self-start"
              >
                Register for Workshop Program
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Top Open Vacancies */}
      <Vacancies />
      <Contact />
    </div>
  );
}
