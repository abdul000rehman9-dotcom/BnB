
import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { JourneyTimeline } from './JourneyTimeline';
import { Contact } from './Contact';
import { AnimatedHeading, AnimatedParagraph } from './animations';
import { BlogPost } from '../types';

const hrRecruitmentProcess = '/assets/hr_recruitment_process.jpeg';
const recruitmentDigitalWorkplace = '/assets/recruitment_digital_workplace.jpeg';
const hrRecruitmentServices = '/assets/hr_recruitment_services.jpeg';
const jobApplicationReview = '/assets/job_application_review.jpeg';

const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };

// Premium scale-in & lift variant with cascading delay
const cardEntranceVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.94,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 18,
      mass: 0.8,
      delay: index * 0.1, // Gorgeous cascading stagger
    },
  }),
};

// Interactive 3D Parallax Tilt Card Component
const BlogCard: React.FC<{ post: BlogPost; index: number }> = ({ post, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Translate mouse coordinates to subtle rotation & translation values
  const moveX = useTransform(x, [-120, 120], [-10, 10]);
  const moveY = useTransform(y, [-120, 120], [-10, 10]);
  const rotateY = useTransform(x, [-120, 120], [-5, 5]);
  const rotateX = useTransform(y, [-120, 120], [5, -5]);

  // Spring animations for ultra-smooth buttery feel
  const imageX = useSpring(moveX, springConfig);
  const imageY = useSpring(moveY, springConfig);
  const cardRotateX = useSpring(rotateX, springConfig);
  const cardRotateY = useSpring(rotateY, springConfig);

  const imageScale = useMotionValue(1);
  const smoothScale = useSpring(imageScale, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseEnter = () => {
    imageScale.set(1.08);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    imageScale.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-40px' }}
      variants={cardEntranceVariants}
      style={{
        rotateX: cardRotateX,
        rotateY: cardRotateY,
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.02,
        y: -10,
        boxShadow: '0 24px 40px rgba(0,0,0,0.06), 0 12px 20px rgba(0,0,0,0.03)',
      }}
      className="group bg-white rounded-[24px] overflow-hidden border border-slate-100/90 transition-all duration-300 flex flex-col justify-between text-left cursor-pointer [will-change:transform,opacity]"
    >
      {/* Aspect Ratio Balanced Image Container */}
      <div className="relative aspect-[1.4] w-full overflow-hidden bg-slate-100 shrink-0">
        {/* Absolute dark/tint overlay on hover */}
        <div className="absolute inset-0 bg-blue-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

        <motion.img
          src={post.image}
          alt={post.title}
          style={{
            x: imageX,
            y: imageY,
            scale: smoothScale,
          }}
          className="w-full h-full object-cover origin-center"
          
        />
        <span className="absolute top-4 left-4 z-20 text-[10px] font-extrabold uppercase tracking-widest text-slate-800 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
          {post.category}
        </span>
      </div>

      {/* Card Content Area */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-slate-400 font-sans text-[11px] font-semibold mb-2">
            <Calendar size={13} className="text-blue-500" />
            <span>{post.date}</span>
          </div>

          <h4 className="text-slate-900 font-bold font-display text-base sm:text-lg leading-snug group-hover:text-blue-600 transition-colors duration-200">
            {post.title}
          </h4>
        </div>

        <div className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-xs font-bold tracking-wider uppercase mt-2 group-hover:translate-x-1.5 transition-transform duration-200">
          <span>Read Article</span>
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </div>
      </div>
    </motion.div>
  );
};

export function BlogPage() {
  useEffect(() => {
    // Scroll page to top instantly on mount
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
  }, []);

  // Six highly engaging blog post items matching the design layout & assets
  const latestInsights: BlogPost[] = [
    {
      id: '1',
      category: 'Automation',
      date: '07 Nov 2025',
      title: 'Payroll HR With Automated Workforce Management',
      image: hrRecruitmentProcess,
    },
    {
      id: '2',
      category: 'Efficiency',
      date: '07 Nov 2025',
      title: 'Improve Employee Efficiency Using HRM Solutions',
      image: recruitmentDigitalWorkplace,
    },
    {
      id: '3',
      category: 'Payroll',
      date: '07 Nov 2025',
      title: 'Boost Productivity With Efficient Time HR Systems',
      image: hrRecruitmentServices,
    },
    {
      id: '4',
      category: 'Automation',
      date: '07 Nov 2025',
      title: 'Payroll HR With Automated Workforce Management',
      image: hrRecruitmentProcess,
    },
    {
      id: '5',
      category: 'Efficiency',
      date: '07 Nov 2025',
      title: 'Improve Employee Efficiency Using HRM Solutions',
      image: recruitmentDigitalWorkplace,
    },
    {
      id: '6',
      category: 'Payroll',
      date: '07 Nov 2025',
      title: 'Boost Productivity With Efficient Time HR Systems',
      image: hrRecruitmentServices,
    },
  ];

  return (
    <div className="pt-24 pb-12 bg-[#fcfbfa]">
      {/* 1. Our Blogs - Title & Featured Hero Card */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

        <div className="relative z-10">
          {/* Centered Heading with Word Reveal */}
          <div className="text-center mb-12 sm:mb-16">
            <AnimatedHeading
              text="Our Blogs"
              className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-slate-900 tracking-tight text-center"
            />
          </div>

          {/* Featured Horizontal Card */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-950/5 grid grid-cols-1 md:grid-cols-12 gap-0 group cursor-pointer"
          >
            {/* Featured Image */}
            <div className="md:col-span-6 relative aspect-[16/10] md:aspect-auto overflow-hidden bg-slate-50 min-h-[250px] md:min-h-[380px]">
              <motion.img
                src={jobApplicationReview}
                alt="HRM Improves Workflow and Compliance Standards"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                
              />
              <div className="absolute inset-0 bg-blue-950/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Featured Post details */}
            <div className="md:col-span-6 p-8 sm:p-10 flex flex-col justify-center items-start text-left bg-white relative">
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-white bg-[#0b1c24] px-3.5 py-1.5 rounded-lg mb-6 shadow-sm">
                Featured Blog
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 leading-tight mb-4 group-hover:text-blue-500 transition-colors duration-200">
                HRM Improves Workflow and Compliance Standards
              </h3>

              <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed mb-6">
                Managing payroll can be complex, time-consuming, and prone to errors if not handled with precision. Our Payroll Management Services are designed to simplify your payroll processes, ensuring accuracy and compliance while saving you valuable time.
              </p>

              <div className="flex items-center gap-2 text-blue-600 font-bold font-sans text-xs sm:text-sm uppercase tracking-wider group-hover:translate-x-1.5 transition-transform duration-200 mt-2">
                <span>Read Feature</span>
                <ArrowUpRight size={16} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Free HR Toolkit & Salary Insights Section (From Blueprint) */}
      <section className="relative py-16 sm:py-24 bg-white border-t border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Free HR Toolkit */}
            <div className="bg-[#f8fafc] border border-slate-100/90 rounded-[24px] p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 mb-3 bg-blue-50 px-3 py-1.5 rounded-lg inline-block">
                  Downloadable Resources
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mb-3">
                  Free HR Toolkit
                </h3>
                <p className="text-slate-500 font-sans text-xs sm:text-sm mb-6">
                  Essential templates and forms to streamline your HR processes and compliance:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 font-sans text-xs sm:text-sm font-medium mb-8">
                  <li className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    Job Description Templates
                  </li>
                  <li className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    Interview Evaluation Forms
                  </li>
                  <li className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    Employee Warning Templates
                  </li>
                  <li className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    Exit Interview Forms
                  </li>
                  <li className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    Performance Appraisal Templates
                  </li>
                  <li className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    HR Policy Samples
                  </li>
                </ul>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-[#041d24] text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl hover:bg-slate-800 transition-colors self-start"
              >
                Request Free HR Toolkit
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Salary & Market Insights */}
            <div className="bg-[#f8fafc] border border-slate-100/90 rounded-[24px] p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 mb-3 bg-blue-50 px-3 py-1.5 rounded-lg inline-block">
                  Industry Reports
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mb-3">
                  Salary & Market Insights
                </h3>
                <p className="text-slate-500 font-sans text-xs sm:text-sm mb-6">
                  Quarterly benchmark reports providing transparent compensation data across Pakistan's key sectors:
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-slate-800 font-display font-bold text-xs sm:text-sm">Textile Salary Guide</span>
                    <span className="text-[10px] text-blue-600 font-bold uppercase bg-blue-50 px-2 py-1 rounded">Latest 2026 Edition</span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-slate-800 font-display font-bold text-xs sm:text-sm">FMCG Salary Guide</span>
                    <span className="text-[10px] text-blue-600 font-bold uppercase bg-blue-50 px-2 py-1 rounded">Latest 2026 Edition</span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-slate-800 font-display font-bold text-xs sm:text-sm">Pharma & Healthcare Guide</span>
                    <span className="text-[10px] text-blue-600 font-bold uppercase bg-blue-50 px-2 py-1 rounded">Latest 2026 Edition</span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-slate-800 font-display font-bold text-xs sm:text-sm">Finance & HR Salary Guide</span>
                    <span className="text-[10px] text-blue-600 font-bold uppercase bg-blue-50 px-2 py-1 rounded">Latest 2026 Edition</span>
                  </div>
                </div>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-[#0b132a] text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl hover:bg-blue-600 transition-colors self-start"
              >
                Request Report Copy
                <ArrowUpRight size={14} />
              </a>
            </div>

          </div>

          {/* L&D Calendar & Recruitment Cost Estimator */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* L&D Program Calendar */}
            <div className="bg-[#f8fafc] border border-slate-100/90 rounded-[24px] p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 mb-3 bg-blue-50 px-3 py-1.5 rounded-lg inline-block">
                  Corporate Workshops
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mb-3">
                  Learning & Development Calendar
                </h3>
                <p className="text-slate-500 font-sans text-xs sm:text-sm mb-6">
                  Upcoming corporate training programs designed for organizational excellence:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {['Leadership Development', 'Communication Skills', 'Performance Management', 'HR for Non-HR Managers', 'Sales Excellence', 'Team Building Workshops'].map((program, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs text-xs font-semibold text-slate-800 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      {program}
                    </div>
                  ))}
                </div>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-[#041d24] text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl hover:bg-slate-800 transition-colors self-start"
              >
                Register for Workshop
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Recruitment Cost Estimator */}
            <div className="bg-[#0b132a] text-white rounded-[24px] p-8 sm:p-10 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 mb-3 bg-blue-900/50 px-3 py-1.5 rounded-lg inline-block border border-blue-800">
                  Interactive Business Tool
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3">
                  Recruitment Cost Estimator
                </h3>
                <p className="text-slate-300 font-sans text-xs sm:text-sm mb-6">
                  Estimate hiring costs tailored to your organization's position level, industry, vacancies count, and hiring urgency:
                </p>
                <div className="space-y-3 mb-8 text-xs font-sans text-slate-300">
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
                    <span>Target Position Level</span>
                    <span className="text-white font-bold">Executive / Senior / Mid</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
                    <span>Industry Sector</span>
                    <span className="text-white font-bold">FMCG, Tech, Banking, Textile</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
                    <span>Hiring Urgency</span>
                    <span className="text-white font-bold">Standard / Urgent Search</span>
                  </div>
                </div>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl hover:bg-blue-500 transition-colors self-start"
              >
                Calculate Estimate Now
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Latest Insights Grid Section */}
      <section className="relative py-16 sm:py-24 bg-white border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <AnimatedHeading
              text="Latest Insights"
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight text-center"
            />
            <AnimatedParagraph className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed mt-4">
              Explore our fresh, hand-picked insights detailing modern workforce automation strategies, performance optimization, and global HR compliance guidelines.
            </AnimatedParagraph>
          </div>

          {/* 3-Column Grid of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto py-4">
            {latestInsights.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. JourneyTimeline Section */}
      <JourneyTimeline />

      {/* 4. Contact Us Section */}
      <Contact />
    </div>
  );
}
