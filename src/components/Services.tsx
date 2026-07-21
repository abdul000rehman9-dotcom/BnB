import React from 'react';
import { motion } from 'motion/react';
import { AnimatedHeading, AnimatedParagraph, ImageReveal, StaggerContainer, StaggerItem } from './animations';

const execSearchIcon = '/assets/hr_talent_acquisition_management.jpeg';
const recruitSolIcon = '/assets/hr_recruitment_services.jpeg';
const hrConsultingIcon = '/assets/human_resources_team_management.jpeg';
const learningDevIcon = '/assets/hr_team_building_concept.jpeg';
const candidateSourcing = '/assets/candidate_recruitment_sourcing.jpeg';

interface ServicesProps {
  onServiceSelect?: (serviceType: 'executive-search' | 'recruitment-solution' | 'hr-consulting' | 'learning-development') => void;
}

export function Services({ onServiceSelect }: ServicesProps) {

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
      }
    }
  };


  const cardVariants = {
    hidden: {
      opacity: 0,
      x: -240,
      rotate: -10,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 70,
        mass: 1.1,
      }
    }
  };


  const hoverAnimation = {
    y: -10,
    scale: 1.03,
    borderColor: "rgba(2, 132, 199, 0.4)",
    boxShadow: "0 20px 40px rgba(2, 132, 199, 0.08)",
    transition: { type: "spring", stiffness: 350, damping: 15 }
  };

  return (
    <section id="services" className="relative py-20 sm:py-28 bg-[#ffffff] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <AnimatedHeading
            text="Complete HR Solutions"
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight leading-tight mb-4 text-center"
          />
          <AnimatedParagraph className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed">
            From modern automated talent pipelines to secure employee systems and analytics dashboards.
          </AnimatedParagraph>
        </div>

        {/* 4-Column Service Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 relative px-4"
        >
          
          {/* Card 1: Executive Search */}
          <motion.div
            variants={cardVariants}
            whileHover={hoverAnimation}
            onClick={() => onServiceSelect?.('executive-search')}
            className="group flex flex-col items-center text-center p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors duration-300 cursor-pointer hover:shadow-emerald-100/50 hover:border-emerald-300 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            
            <img 
              src={execSearchIcon} 
              alt="Executive Search" 
              className="w-16 h-16 object-contain mb-6 group-hover:scale-110 transition-transform duration-300 rounded-2xl"
              
            />
            
            <h3 className="text-slate-900 font-bold font-display text-lg mb-3">
              Executive Search
            </h3>
            <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
              We prioritize your needs, providing tailored solutions to enhance satisfaction and drive business growth.
            </p>
          </motion.div>

          {/* Card 2: Recruitment Solution */}
          <motion.div
            variants={cardVariants}
            whileHover={hoverAnimation}
            onClick={() => onServiceSelect?.('recruitment-solution')}
            className="group flex flex-col items-center text-center p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors duration-300 cursor-pointer hover:shadow-blue-100/50 hover:border-blue-300 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            
            <img 
              src={recruitSolIcon} 
              alt="Recruitment Solution" 
              className="w-16 h-16 object-contain mb-6 group-hover:scale-110 transition-transform duration-300 rounded-2xl"
              
            />
            
            <h3 className="text-slate-900 font-bold font-display text-lg mb-3">
              Recruitment Solution
            </h3>
            <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
              Your data is safe with us. We employ strong security protocols to safeguard your sensitive business information.
            </p>
          </motion.div>

          {/* Card 3: HR Consulting */}
          <motion.div
            variants={cardVariants}
            whileHover={hoverAnimation}
            onClick={() => onServiceSelect?.('hr-consulting')}
            className="group flex flex-col items-center text-center p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors duration-300 cursor-pointer hover:shadow-purple-100/50 hover:border-purple-300 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            
            <img 
              src={hrConsultingIcon} 
              alt="HR Consulting" 
              className="w-16 h-16 object-contain mb-6 group-hover:scale-110 transition-transform duration-300 rounded-2xl"
              
            />
            
            <h3 className="text-slate-900 font-bold font-display text-lg mb-3">
              HR Consulting
            </h3>
            <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
              Our professional consulting services help you align your HR strategies with your business goals seamlessly.
            </p>
          </motion.div>

          {/* Card 4: Learning And Development */}
          <motion.div
            variants={cardVariants}
            whileHover={hoverAnimation}
            onClick={() => onServiceSelect?.('learning-development')}
            className="group flex flex-col items-center text-center p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors duration-300 cursor-pointer hover:shadow-sky-100/50 hover:border-sky-300 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-sky-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            
            <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 p-2.5">
              <img 
                src={learningDevIcon} 
                alt="Learning And Development" 
                className="w-full h-full object-contain"
                
              />
            </div>
            
            <h3 className="text-slate-900 font-bold font-display text-lg mb-3">
              Learning And Development
            </h3>
            <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
              Our solutions are flexible, designed to scale and adapt to the evolving needs of your business.
            </p>
          </motion.div>

        </motion.div>

        {/* Bottom Detailed Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <ImageReveal
              src={candidateSourcing}
              alt="Developer working on laptop"
              className="rounded-3xl aspect-[1.3] w-full shadow-lg"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col text-left">
            <StaggerContainer className="flex flex-col gap-0 divide-y divide-slate-150">
              <StaggerItem direction="up">
                <div className="pb-6 text-left">
                  <h4 className="text-slate-900 font-bold font-display text-base sm:text-lg mb-2">
                    AI Analytics
                  </h4>
                  <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
                    Use AI to analyze employee data for smarter workforce management decisions every day.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem direction="up">
                <div className="py-6 text-left">
                  <h4 className="text-slate-900 font-bold font-display text-base sm:text-lg mb-2">
                    Onboarding Automation
                  </h4>
                  <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
                    Streamline new hire processes with automated, personalized onboarding workflows for lasting success.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem direction="up">
                <div className="pt-6 text-left">
                  <h4 className="text-slate-900 font-bold font-display text-base sm:text-lg mb-2">
                    Feedback Loop
                  </h4>
                  <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
                    Enable real-time performance feedback for continuous improvement and deeper engagement.
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>

      </div>
    </section>
  );
}