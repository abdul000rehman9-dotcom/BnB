import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Briefcase, Search, ArrowRight } from 'lucide-react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');

  // Cinematic cards animation matching requirement:
  // Fade in, move upward 25px, scale from 0.97 -> 1 with custom ease curve
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      scale: 0.97,
      filter: 'blur(4px)',
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      },
    }),
  };

  const vacanciesData = [
    {
      id: '1',
      company: 'Software Engineer',
      city: 'Sydney',
      type: 'Full-Time',
      description: 'Design, develop, and maintain high-quality software solutions and workforce platforms for industry leaders.',
    },
    {
      id: '2',
      company: 'Executive Search Manager',
      city: 'Karachi',
      type: 'Full-Time',
      description: 'Lead high-stakes executive search assignments for senior management and C-suite leadership roles.',
    },
    {
      id: '3',
      company: 'HR Consulting Specialist',
      city: 'Lahore',
      type: 'Full-Time',
      description: 'Provide customized HR consulting, policy crafting, HR audits, and organizational design solutions.',
    },
    {
      id: '4',
      company: 'Learning & Development Lead',
      city: 'Islamabad',
      type: 'Full-Time',
      description: 'Design corporate training programs, leadership workshops, and competency development interventions.',
    },
    {
      id: '5',
      company: 'Recruitment Consultant',
      city: 'Karachi',
      type: 'Full-Time',
      description: 'Drive end-to-end recruitment pipelines for mid-to-senior level positions across key industries.',
    },
    {
      id: '6',
      company: 'Talent Acquisition Specialist',
      city: 'Sydney',
      type: 'Full-Time',
      description: 'Manage full-cycle tech sourcing and recruitment for high-growth software and enterprise partners.',
    },
    {
      id: '7',
      company: 'Payroll & HR Operations Lead',
      city: 'Lahore',
      type: 'Full-Time',
      description: 'Ensure precise, compliant payroll management and statutory HR compliance for partner organizations.',
    },
    {
      id: '8',
      company: 'Corporate Sales & Accounts Manager',
      city: 'Islamabad',
      type: 'Full-Time',
      description: 'Manage corporate relationships with enterprise clients, delivering customized workforce solutions.',
    },
  ];

  const cities = ['All', 'Sydney', 'Karachi', 'Lahore', 'Islamabad'];

  const filteredVacancies = vacanciesData.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'All' || job.city.toLowerCase() === selectedCity.toLowerCase();
    return matchesSearch && matchesCity;
  });

  const displayedVacancies = filteredVacancies.slice(0, limit);

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
        
        {/* Section Heading with Staggered Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <AnimatedHeading
            text="Top Open Vacancies"
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#031929] tracking-tight leading-tight mb-4 text-center"
          />
          <AnimatedParagraph className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed">
            Discover your next opportunity. Explore available roles matching your experience and skill sets.
          </AnimatedParagraph>
        </motion.div>

        {/* Vacancies Grid with Cinematic Individual Stagger Reveal */}
        {displayedVacancies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {displayedVacancies.map((job, idx) => (
              <motion.div
                key={job.id}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: '-40px' }}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: '0 20px 35px -10px rgba(5, 40, 66, 0.12)',
                  borderColor: 'rgba(5, 40, 66, 0.3)',
                  transition: { duration: 0.25, ease: 'easeOut' },
                }}
                onClick={() => handleCardClick(job.id)}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 flex flex-col justify-between text-left relative overflow-hidden group cursor-pointer [will-change:transform,opacity] transition-colors duration-200"
              >
                {/* Visual accent left line on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#052842] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                <div>
                  {/* Top Row: Title & Location */}
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-50/80 text-[#052842] rounded-xl group-hover:bg-[#052842] group-hover:text-white transition-colors duration-300">
                        <Briefcase size={18} />
                      </div>
                      <h3 className="text-[#031929] font-bold font-display text-base sm:text-lg group-hover:text-[#052842] transition-colors duration-200">
                        {job.company}
                      </h3>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 shrink-0">
                      <MapPin size={12} className="text-[#052842]" />
                      To {job.city}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed mb-6">
                    {job.description}
                  </p>
                </div>

                {/* Bottom Action Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-[#052842] group-hover:translate-x-1 transition-transform duration-200">
                  <span>View Details & Apply</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                </div>

              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80 max-w-xl mx-auto">
            <p className="text-slate-600 font-sans text-sm">No vacancies match your search criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCity('All');
              }}
              className="mt-4 text-xs font-bold text-[#052842] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}