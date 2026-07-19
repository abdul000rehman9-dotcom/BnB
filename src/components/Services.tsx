import React from 'react';
import { motion } from 'motion/react';
import { Search, ShieldCheck, GraduationCap } from 'lucide-react';
import { AnimatedHeading, AnimatedParagraph, ImageReveal, StaggerContainer, StaggerItem } from './animations';

export function Services() {
  // 1. पहले वाले कोड की एग्जैक्ट कंटेनर वेरिएंट्स (Staggered Loading के लिए)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
      }
    }
  };

  // 2. पहले वाले कोड की एग्जैक्ट स्प्रिंग एनीमेशन (Card Dealt Spread Grid)
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

  // Hover एनीमेशन कॉन्फ़िगरेशन (Exact Copy from first code)
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
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight leading-tight mb-4"
          />
          <AnimatedParagraph className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed">
            From modern automated talent pipelines to secure employee systems and analytics dashboards.
          </AnimatedParagraph>
        </div>

        {/* 3-Column Service Cards Grid */}
        {/* यहाँ पर containerVariants और viewport सेट किया है */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative px-4"
        >
          
          {/* Card 1: Executive Search */}
          <motion.div
            variants={cardVariants}
            whileHover={hoverAnimation}
            className="group flex flex-col items-center text-center p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors duration-300 cursor-pointer hover:shadow-emerald-100/50 hover:border-emerald-300 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            
            <div className="w-14 h-14 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Search size={24} />
            </div>
            
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
            className="group flex flex-col items-center text-center p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors duration-300 cursor-pointer hover:shadow-purple-100/50 hover:border-purple-300 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            
            <div className="w-14 h-14 bg-purple-50 border border-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck size={24} />
            </div>
            
            <h3 className="text-slate-900 font-bold font-display text-lg mb-3">
              Recruitment Solution
            </h3>
            <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
              Your data is safe with us. We employ strong security protocols to safeguard your sensitive business information.
            </p>
          </motion.div>

          {/* Card 3: Learning Programs */}
          <motion.div
            variants={cardVariants}
            whileHover={hoverAnimation}
            className="group flex flex-col items-center text-center p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors duration-300 cursor-pointer hover:shadow-sky-100/50 hover:border-sky-300 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            
            <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <GraduationCap size={24} />
            </div>
            
            <h3 className="text-slate-900 font-bold font-display text-lg mb-3">
              Learning Programs
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
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop"
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