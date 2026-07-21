import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AnimatedHeading, AnimatedParagraph, AnimatedButton } from './animations';
const hrTalentRecruitment = '/assets/hr_talent_recruitment.jpeg';

// Custom Circular Progress component
interface CircularProgressBadgeProps {
  isLoaded: boolean;
}

function CircularProgressBadge({ isLoaded }: CircularProgressBadgeProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;

    if (!isLoaded) {
      // Phase 1: Slow increment, starting from zero, capping at 60%
      const startTime = performance.now();
      const maxPreloadCount = 60;
      const preloadDuration = 6000; // Slower, taking 6 seconds to reach 60% if not yet loaded

      const tickPreload = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / preloadDuration, 1);
        
        // Linear slow progression
        const current = Math.floor(progress * maxPreloadCount);
        setCount(current);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(tickPreload);
        }
      };
      animationFrameId = requestAnimationFrame(tickPreload);
    } else {
      // Phase 2: Hero section is loaded!
      // Allow for a slight delay of 1.5 seconds before starting the completion phase
      timeoutId = setTimeout(() => {
        const startCount = count;
        const endCount = 89;
        const completionDuration = 2000; // Slow, smooth progress to finish (2 seconds)
        const startAnimTime = performance.now();

        const tickCompletion = (now: number) => {
          const elapsed = now - startAnimTime;
          const progress = Math.min(elapsed / completionDuration, 1);
          
          // easeOutCubic curve for elegant slowdown at the very end
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(startCount + easeProgress * (endCount - startCount));
          
          setCount(current);

          if (progress < 1) {
            animationFrameId = requestAnimationFrame(tickCompletion);
          }
        };
        animationFrameId = requestAnimationFrame(tickCompletion);
      }, 1500); // 1.5 second delay before final animation phase
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isLoaded]);

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (count / 100) * circumference;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8, type: 'spring', stiffness: 90, damping: 14 }}
      className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col items-start gap-3 w-[150px]"
    >
      <span className="text-[11px] font-bold text-slate-700 tracking-normal">
        Candidate hiring
      </span>
      <div className="relative w-16 h-16 flex items-center justify-center self-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={radius}
            className="stroke-slate-100"
            strokeWidth="5"
            fill="transparent"
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="#dfa135"
            strokeWidth="5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-sm font-bold text-slate-800">
          {count}%
        </span>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  // Safety fallback in case image onLoad doesn't fire or cached
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setIsHeroLoaded(true);
    }, 4500); // 4.5 seconds maximum safety margin
    return () => clearTimeout(fallbackTimer);
  }, []);
  // Continuous float effect definitions
  const floatAnimationLeft = {
    animate: {
      y: [0, -6, 0],
      transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  const floatAnimationRight = {
    animate: {
      y: [0, -8, 0],
      transition: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center bg-[#fcfbfa] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full relative z-10">
        
        {/* Left Copy */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-4 px-2.5 py-1 rounded border border-[#f5dfca] bg-[#fdf6ee] flex items-center gap-1.5"
          >
            <span className="text-[11px] font-bold text-[#8a5d3b] tracking-wide uppercase flex items-center gap-1">
              ✦ Workforce Solutions
            </span>
          </motion.div>

          <AnimatedHeading
            text="Building High-Performance Teams for Pakistan's Leading Organizations"
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-slate-900 tracking-tight leading-[1.1] mb-6"
            as="h1"
          />

          <AnimatedParagraph delay={0.9} className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
            From Executive Search to Recruitment, HR Consulting, and Learning & Development, Bucks & Bricks helps organizations attract, hire, and develop exceptional talent that drives business success.
          </AnimatedParagraph>

          <div className="flex flex-wrap items-center gap-4">
            <AnimatedButton
              delay={1.2}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#041d24] hover:bg-slate-800 text-white font-sans text-sm font-semibold py-3.5 px-6 rounded shadow-md transition-colors"
            >
              Request Talent
            </AnimatedButton>
            <AnimatedButton
              delay={1.4}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#0b132a] hover:bg-blue-600 text-white font-sans text-sm font-semibold py-3.5 px-6 rounded shadow-md transition-colors"
            >
              Schedule a Consultation
            </AnimatedButton>
            <AnimatedButton
              delay={1.6}
              onClick={() => document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent hover:bg-slate-50 text-slate-800 border border-slate-200 font-sans text-sm font-semibold py-3.5 px-6 rounded transition-colors"
            >
              Upload Your CV
            </AnimatedButton>
          </div>
        </div>

        {/* Right Collateral (Hero Image + Overlaid Badge & Custom SVGs with Entry Animations) */}
        <div className="lg:col-span-6 flex justify-center relative">
          
          <div className="relative w-full max-w-[420px] aspect-[4/5] mx-auto md:mr-4">
            
            {/* 1. TOP LEFT STAIRCASE SVG DECORATION (With Entry + Float Animation) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, x: -30, y: -30 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -top-10 -left-6 z-0 pointer-events-none"
            >
              <motion.div variants={floatAnimationLeft} animate="animate">
                <svg width="74" height="78" viewBox="0 0 74 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 76H30V52H50V28H72V4" stroke="#a3b899" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 66H22V42H42V18H62V2H2V66Z" fill="#041d24" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Main Hero Image Wrapper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-slate-100"
            >
              <img
                src={hrTalentRecruitment}
                alt="Professional HR Specialist"
                className="w-full h-full object-cover"
                
                onLoad={() => setIsHeroLoaded(true)}
              />
            </motion.div>

            {/* 2. Overlaid Widget Bottom Left: "Candidate hiring" */}
            <div className="absolute -bottom-8 -left-8 z-20">
              <CircularProgressBadge isLoaded={isHeroLoaded} />
            </div>

            {/* 3. BOTTOM RIGHT ASTERISK STAR SVG (With Entry + Float Animation) */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 1.4, type: 'spring', stiffness: 100 }}
              className="absolute -bottom-6 -right-6 z-20 pointer-events-none"
            >
              <motion.div variants={floatAnimationRight} animate="animate">
                <svg width="58" height="58" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M12 24V0M0 12H24M3.5 3.5L20.5 20.5M20.5 3.5L3.5 20.5" 
                    stroke="#041d24" 
                  	strokeWidth="4.2" 
                    strokeLinecap="square"
                  />
                </svg>
              </motion.div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}