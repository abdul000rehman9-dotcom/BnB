import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Briefcase } from 'lucide-react';
import { AnimatedHeading, AnimatedParagraph } from './animations';

export function Vacancies() {
  // Ultra-smooth easing aur physics configurations
  const cardVariants = {
    hidden: (custom: { initialX: number; initialY: number; initialRotate: number }) => ({
      opacity: 0,
      x: custom.initialX,
      y: custom.initialY,
      rotate: custom.initialRotate,
      scale: 0.95, // Shuruat me thoda scale down taaki pop-in smoother lage
    }),
    visible: (custom: { delay: number }) => ({
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 60,   // Stiffness kam ki taaki acceleration smooth ho
        damping: 15,     // Damping barhayi taaki card jhatka na mare (no overshoot)
        mass: 0.8,       // Mass kam kiya taaki lag-free light feel ho
        delay: custom.delay,
      },
    }),
  };

  const vacanciesData = [
    {
      id: '1',
      company: 'Software Engineer',
      city: 'Sydney',
      description: 'Ability skilled Software Engineer to design, develop, and maintain high-quality software.',
      initialX: -120, // Offsets thode kam kiye hain taaki transition distance optimized rahe
      initialY: -120,
      initialRotate: -4, // Mild rotation for maximum smoothness
      delay: 0.05,
    },
    {
      id: '2',
      company: 'Software Engineer',
      city: 'Sydney',
      description: 'Ability skilled Software Engineer to design, develop, and maintain high-quality software.',
      initialX: 120,
      initialY: -120,
      initialRotate: 4,
      delay: 0.1,
    },
    {
      id: '3',
      company: 'Software Engineer',
      city: 'Sydney',
      description: 'Ability skilled Software Engineer to design, develop, and maintain high-quality software.',
      initialX: -120,
      initialY: 120,
      initialRotate: -3,
      delay: 0.15,
    },
    {
      id: '4',
      company: 'Software Engineer',
      city: 'Sydney',
      description: 'Ability skilled Software Engineer to design, develop, and maintain high-quality software.',
      initialX: 120,
      initialY: 120,
      initialRotate: 3,
      delay: 0.2,
    },
  ];

  return (
    <section id="vacancies" className="relative py-20 sm:py-28 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <AnimatedHeading
            text="Top Open Vacancies"
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight leading-tight mb-4"
          />
          <AnimatedParagraph className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed">
            Discover your next opportunity. Explore available roles matching your experience and skill sets.
          </AnimatedParagraph>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {vacanciesData.map((job) => (
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
              viewport={{ once: true, margin: '-60px' }} // Margin tight ki hai taaki screen par aate hi render ho jaye
              variants={cardVariants}
              whileHover={{
                y: -6,
                scale: 1.01,
                boxShadow: '0 15px 30px rgba(0,0,0,0.04)',
                borderColor: 'rgba(2, 132, 199, 0.15)',
                transition: { type: 'tween', ease: 'easeOut', duration: 0.2 }, // Hover ko simple tween rakha taaki spring clash na kare
              }}
              // will-change-transform se browser hardware acceleration use karega aur animation stutter nahi hogi
              className="bg-white rounded-2xl p-7 border border-slate-100 flex flex-col justify-between text-left relative overflow-hidden group cursor-pointer [will-change:transform,opacity]"
            >
              {/* Visual accent left line on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />

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
              <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed mb-1">
                {job.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}