import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Briefcase, Clock, CircleDollarSign } from 'lucide-react';
import { AnimatedHeading, AnimatedParagraph } from './animations';

export function Vacancies({
  limit = 4,
  showDetails = false,
  onSelectJob,
}: {
  limit?: number;
  showDetails?: boolean;
  onSelectJob?: (jobId: string) => void;
}) {
  // Ultra-smooth easing aur physics configurations
  const cardVariants = {
    hidden: (custom: { initialX: number; initialY: number; initialRotate: number }) => ({
      opacity: 0,
      x: custom.initialX,
      y: custom.initialY,
      rotate: custom.initialRotate,
      scale: 0.95,
    }),
    visible: (custom: { delay: number }) => ({
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 60,
        damping: 15,
        mass: 0.8,
        delay: custom.delay,
      },
    }),
  };

  const vacanciesData = [
    {
      id: '1',
      company: 'Software Engineer',
      city: 'Sydney',
      description: 'Design, develop, and maintain high-quality software solutions and workforce platforms for industry leaders.',
      initialX: -120,
      initialY: -120,
      initialRotate: -4,
      delay: 0.05,
    },
    {
      id: '2',
      company: 'Executive Search Manager',
      city: 'Karachi',
      description: 'Lead high-stakes executive search assignments for senior management and C-suite leadership roles.',
      initialX: 120,
      initialY: -120,
      initialRotate: 4,
      delay: 0.1,
    },
    {
      id: '3',
      company: 'HR Consulting Specialist',
      city: 'Lahore',
      description: 'Provide customized HR consulting, policy crafting, HR audits, and organizational design solutions.',
      initialX: -120,
      initialY: 120,
      initialRotate: -3,
      delay: 0.15,
    },
    {
      id: '4',
      company: 'Learning & Development Lead',
      city: 'Islamabad',
      description: 'Design corporate training programs, leadership workshops, and competency development interventions.',
      initialX: 120,
      initialY: 120,
      initialRotate: 3,
      delay: 0.2,
    },
    {
      id: '5',
      company: 'Recruitment Consultant',
      city: 'Karachi',
      description: 'Drive end-to-end recruitment pipelines for mid-to-senior level positions across key industries.',
      initialX: -120,
      initialY: -120,
      initialRotate: -4,
      delay: 0.25,
    },
    {
      id: '6',
      company: 'Talent Acquisition Specialist',
      city: 'Sydney',
      description: 'Manage full-cycle tech sourcing and recruitment for high-growth software and enterprise partners.',
      initialX: 120,
      initialY: -120,
      initialRotate: 4,
      delay: 0.3,
    },
    {
      id: '7',
      company: 'Payroll & HR Operations Lead',
      city: 'Lahore',
      description: 'Ensure precise, compliant payroll management and statutory HR compliance for partner organizations.',
      initialX: -120,
      initialY: 120,
      initialRotate: -3,
      delay: 0.35,
    },
    {
      id: '8',
      company: 'Corporate Sales & Accounts Manager',
      city: 'Islamabad',
      description: 'Manage corporate relationships with enterprise clients, delivering customized workforce solutions.',
      initialX: 120,
      initialY: 120,
      initialRotate: 3,
      delay: 0.4,
    },
  ];

  const displayedVacancies = vacanciesData.slice(0, limit);

  const handleCardClick = (id: string) => {
    if (onSelectJob) {
      onSelectJob(id);
    } else {
      window.location.hash = `#job-${id}`;
      window.scrollTo(0, 0);
    }
  };

  return (
    <section id="vacancies" className="relative py-20 sm:py-28 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <AnimatedHeading
            text="Top Open Vacancies"
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight leading-tight mb-4 text-center"
          />
          <AnimatedParagraph className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed">
            Discover your next opportunity. Explore available roles matching your experience and skill sets.
          </AnimatedParagraph>
        </div>

        {/* 2x2 or 4x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {displayedVacancies.map((job) => (
            <motion.div
              key={job.id}
              custom={{
                initialX: job.initialX,
                initialY: job.initialY,
                initialRotate: job.initialRotate,
                delay: job.delay,
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: '-60px' }} // Margin tight ki hai taaki screen par aate hi render ho jaye
              variants={cardVariants}
              whileHover={{
                y: -6,
                scale: 1.01,
                boxShadow: '0 15px 30px rgba(0,0,0,0.04)',
                borderColor: 'rgba(2, 132, 199, 0.15)',
                transition: { type: 'tween', ease: 'easeOut', duration: 0.2 }, // Hover ko simple tween rakha taaki spring clash na kare
              }}
              // will-change-transform se browser hardware acceleration use karega aur animation stutter nahi hogi
              onClick={() => handleCardClick(job.id)}
              className="bg-white rounded-2xl p-7 border border-slate-100 flex flex-col justify-between text-left relative overflow-hidden group cursor-pointer [will-change:transform,opacity]"
            >
              {/* Visual accent left line on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />

              <div>
                {/* Top Row: Title & City */}
                <div className="flex justify-between items-start mb-4 gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <Briefcase size={16} />
                    </div>
                    <h3 className="text-slate-900 font-bold font-display text-base sm:text-lg group-hover:text-blue-600 transition-colors duration-200">
                      {job.company}
                    </h3>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                    <MapPin size={12} className="text-slate-400" />
                    To {job.city}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Bottom details: Clock & Dollar */}
              {showDetails && (
                <div className="flex items-center gap-5 mt-5 pt-5 border-t border-slate-100 text-xs font-medium text-slate-400 font-sans">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-blue-500" />
                    Part Time
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CircleDollarSign size={14} className="text-blue-500" />
                    80k - 100k
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}