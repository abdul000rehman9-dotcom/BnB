/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
}

export function JourneyTimeline() {
  const [activeMilestone, setActiveMilestone] = useState<string | null>(null);

  const milestones: TimelineMilestone[] = [
    {
      id: '1',
      year: '2009',
      title: 'Company Founded',
      description: 'Party we years to order allow asked of. We so opinion friends me message as delight.',
    },
    {
      id: '2',
      year: '2013',
      title: 'Series A Milestone',
      description: 'His defective nor convinced residence own. Connection has put impossible own apartments boisterous.',
    },
    {
      id: '3',
      year: '2025',
      title: 'Enterprise Dominance',
      description: 'From they fine john ne give of rich he. They age and draw mrs like. Improving end distrusts may instantly.',
    }
  ];

  // Perfectly smooth, mathematically continuous cubic bezier spline path matching the image
  const svgPath = 'M 100 320 C 130 350, 160 380, 200 380 C 250 380, 320 260, 370 260 C 420 260, 470 310, 515 310 C 580 310, 660 120, 730 120 C 780 120, 850 120, 920 120';

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 2.2, delay: 0.5, ease: 'easeInOut' },
    },
  };

  const bgNumVariants = (delay: number) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.05,
      transition: { duration: 1.0, delay },
    },
  });

  const nodeVariants = (delay: number) => ({
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15, delay },
    },
  });

  return (
    <section id="journey" className="relative py-20 sm:py-28 bg-[#fcfbfa] overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Main Wrapper: Full Width Responsive Canvas */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="relative w-full aspect-[1000/550] min-h-[500px] sm:min-h-[550px]"
        >
          
          {/* 1. Left-Side Intro Content (Positioned exactly over the top-left area) */}
          <div className="absolute left-0 top-0 z-30 max-w-sm flex flex-col items-start text-left pointer-events-auto">
            <motion.span
              variants={fadeInUp}
              className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans mb-3"
            >
              STOCKIE OPERATION ACROSS THE WORLD
            </motion.span>
            
            <motion.h2
              variants={fadeInUp}
              className="text-4xl lg:text-[46px] font-bold font-display text-slate-900 tracking-tight leading-none mb-5 lowercase"
            >
              our journey
            </motion.h2>
            
            <motion.p
              variants={fadeInUp}
              className="text-slate-500 font-sans text-xs lg:text-sm leading-relaxed mb-8"
            >
              Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy.
            </motion.p>

            <motion.button
              variants={fadeInUp}
              className="bg-[#0b1c24] hover:bg-[#14323d] text-white font-sans text-xs font-bold py-3.5 px-8 rounded-full shadow-lg shadow-slate-950/10 transition-all duration-300 cursor-pointer"
            >
              Get Started
            </motion.button>
          </div>

          {/* 2. Full-Width SVG S-Wave Timeline Grid */}
          <div className="absolute inset-0 pointer-events-none z-10 w-full h-full">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 520" fill="none" preserveAspectRatio="none">
              <defs>
                <filter id="wave-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#0b1c24" floodOpacity="0.12" />
                </filter>
              </defs>

         
              <path
                d={svgPath}
                stroke="#0b1c24"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.04"
              />

              {/* Glowing active drawing segment */}
              <motion.path
                d={svgPath}
                stroke="#0b1c24"
                strokeWidth="4.5"
                strokeLinecap="round"
                filter="url(#wave-shadow)"
                variants={pathVariants}
              />
            </svg>
          </div>

          {/* Giant Background Decorative Numbers */}
          <motion.div
            variants={bgNumVariants(1.0)}
            style={{ left: '30%', top: '75%' }}
            className="absolute text-[120px] sm:text-[180px] font-black font-display text-slate-400 select-none pointer-events-none -z-10 leading-none -translate-x-1/2 -translate-y-1/2"
          >
            1
          </motion.div>

          <motion.div
            variants={bgNumVariants(1.6)}
            style={{ left: '61.5%', top: '61.5%' }}
            className="absolute text-[120px] sm:text-[180px] font-black font-display text-slate-400 select-none pointer-events-none -z-10 leading-none -translate-x-1/2 -translate-y-1/2"
          >
            2
          </motion.div>

          <motion.div
            variants={bgNumVariants(2.2)}
            style={{ left: '83%', top: '25%' }}
            className="absolute text-[120px] sm:text-[180px] font-black font-display text-slate-400 select-none pointer-events-none -z-10 leading-none -translate-x-1/2 -translate-y-1/2"
          >
            3
          </motion.div>

     
          <div
            style={{ left: '20%', top: '73.08%' }}
            className="absolute flex flex-col items-start z-20 -ml-[22px] -mt-[22px] pointer-events-auto"
          >
            <div className="relative mb-4">
              <motion.button
                variants={nodeVariants(1.0)}
                onMouseEnter={() => setActiveMilestone('1')}
                onMouseLeave={() => setActiveMilestone(null)}
                whileHover={{ scale: 1.15 }}
                className={`w-9 h-9 sm:w-12 sm:h-12 rounded-2xl bg-white border flex items-center justify-center transition-all duration-300 z-30 relative shadow-[0_8px_22px_rgba(11,28,36,0.06)] hover:border-slate-400 ${
                  activeMilestone === '1' ? 'border-slate-800' : 'border-slate-100'
                }`}
              >
                <span className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-colors duration-300 ${
                  activeMilestone === '1' ? 'bg-[#0b1c24]' : 'bg-slate-300'
                }`} />
              </motion.button>

    
              <AnimatePresence>
                {activeMilestone === '1' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute left-1/2 transform -translate-x-1/2 z-40 bg-white border border-slate-100 shadow-xl p-4 rounded-xl w-[200px] h-[100px] bottom-12 sm:bottom-15"
                  >
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-white border-r border-b border-slate-100 rotate-45 -bottom-1.5" />
                    {/* Yaha aap apna customized content add kar sakti hain */}
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 font-sans italic">
                      Content placeholder...
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div variants={fadeInUp} className="px-1 flex flex-col items-start text-left">
              <span className="text-slate-900 font-display font-black text-sm sm:text-base mb-1">2009</span>
              <p className="text-slate-500 font-sans text-[10px] sm:text-[12px] leading-relaxed max-w-[140px] sm:max-w-[200px]">
                {milestones[0].description}
              </p>
            </motion.div>
          </div>

  
          <div
            style={{ left: '51.5%', top: '59.62%' }}
            className="absolute flex flex-col items-start z-20 -ml-[22px] -mt-[22px] pointer-events-auto"
          >
            <div className="relative mb-4">
              <motion.button
                variants={nodeVariants(1.6)}
                onMouseEnter={() => setActiveMilestone('2')}
                onMouseLeave={() => setActiveMilestone(null)}
                whileHover={{ scale: 1.15 }}
                className={`w-9 h-9 sm:w-12 sm:h-12 rounded-2xl bg-white border flex items-center justify-center transition-all duration-300 z-30 relative shadow-[0_8px_22px_rgba(11,28,36,0.06)] hover:border-slate-400 ${
                  activeMilestone === '2' ? 'border-slate-800' : 'border-slate-100'
                }`}
              >
                <span className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-colors duration-300 ${
                  activeMilestone === '2' ? 'bg-[#0b1c24]' : 'bg-slate-300'
                }`} />
              </motion.button>

              {/* Clean White Pop-up */}
              <AnimatePresence>
                {activeMilestone === '2' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute left-1/2 transform -translate-x-1/2 z-40 bg-white border border-slate-100 shadow-xl p-4 rounded-xl w-[200px] h-[100px] bottom-12 sm:bottom-15"
                  >
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-white border-r border-b border-slate-100 rotate-45 -bottom-1.5" />
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 font-sans italic">
                      Content placeholder...
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div variants={fadeInUp} className="px-1 flex flex-col items-start text-left">
              <span className="text-slate-900 font-display font-black text-sm sm:text-base mb-1">2013</span>
              <p className="text-slate-500 font-sans text-[10px] sm:text-[12px] leading-relaxed max-w-[140px] sm:max-w-[200px]">
                {milestones[1].description}
              </p>
            </motion.div>
          </div>

          <div
            style={{ left: '73%', top: '23.08%' }}
            className="absolute flex flex-col items-start z-20 -ml-[22px] -mt-[22px] pointer-events-auto"
          >
            <div className="relative mb-4">
              <motion.button
                variants={nodeVariants(2.2)}
                onMouseEnter={() => setActiveMilestone('3')}
                onMouseLeave={() => setActiveMilestone(null)}
                whileHover={{ scale: 1.15 }}
                className={`w-9 h-9 sm:w-12 sm:h-12 rounded-2xl bg-white border flex items-center justify-center transition-all duration-300 z-30 relative shadow-[0_8px_22px_rgba(11,28,36,0.06)] hover:border-slate-400 ${
                  activeMilestone === '3' ? 'border-slate-800' : 'border-slate-100'
                }`}
              >
                <span className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-colors duration-300 ${
                  activeMilestone === '3' ? 'bg-[#0b1c24]' : 'bg-slate-300'
                }`} />
              </motion.button>

          
              <AnimatePresence>
                {activeMilestone === '3' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute left-1/2 transform -translate-x-1/2 z-40 bg-white border border-slate-100 shadow-xl p-4 rounded-xl w-[200px] h-[100px] bottom-12 sm:bottom-15"
                  >
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-white border-r border-b border-slate-100 rotate-45 -bottom-1.5" />
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 font-sans italic">
                      Content placeholder...
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div variants={fadeInUp} className="px-1 flex flex-col items-start text-left">
              <span className="text-slate-900 font-display font-black text-sm sm:text-base mb-1">2025</span>
              <p className="text-slate-500 font-sans text-[10px] sm:text-[12px] leading-relaxed max-w-[140px] sm:max-w-[200px]">
                {milestones[2].description}
              </p>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}