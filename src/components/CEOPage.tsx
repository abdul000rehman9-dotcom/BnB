

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'motion/react';
import { Team } from './Team';
import { Contact } from './Contact';
import professionalHandshake from '../assets/professional_handshake_greeting.jpg';

// Smooth spring animation config for luxury feel
const springConfig = { damping: 30, stiffness: 120, mass: 0.8 };

// Slowly counting decimal component
function Counter({ target, duration = 3.5, decimals = 1, suffix = '' }: { target: number; duration?: number; decimals?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Premium easeOutQuart easing for extra-slow, elegant deceleration near the end
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(easeProgress * target);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return <span>{count.toFixed(decimals)}{suffix}</span>;
}

export function CEOPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  // Scroll Parallax Hooks
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Soft Parallax Scroll Offsets (Text moves up slightly, image shifts down slightly)
  const textScrollY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const imageScrollY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const bgScrollY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  // Mouse Spotlight Positions
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Image 3D Tilt Mouse Transforms
  const imageX = useMotionValue(0);
  const imageY = useMotionValue(0);

  // Very gentle 3D rotations (maximum 4 degrees for premium, professional aesthetic)
  const rotateY = useTransform(imageX, [-250, 250], [-4, 4]);
  const rotateX = useTransform(imageY, [-250, 250], [4, -4]);

  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgContainerRef.current) return;
    const rect = imgContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    imageX.set(e.clientX - centerX);
    imageY.set(e.clientY - centerY);
  };

  const handleImageMouseLeave = () => {
    imageX.set(0);
    imageY.set(0);
  };

  // Scroll to top instantly on mount
  useEffect(() => {
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

  return (
    <div className="pt-24 pb-12 bg-white overflow-hidden">
      {/* 1. Founder Hero Section */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center py-16 px-6 overflow-hidden bg-white select-none"
      >
        {/* Soft interactive spotlight following cursor */}
        <motion.div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.05), transparent 80%)`,
          }}
        />

        {/* Soft slowly floating animated ambient gradient circles in background */}
        <motion.div
          style={{ y: bgScrollY }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-48 -left-48 w-[500px] h-[500px] bg-sky-150/20 rounded-full blur-[100px] pointer-events-none z-0"
        />

        <motion.div
          style={{ y: bgScrollY }}
          animate={{
            x: [0, -40, 20, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.92, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-blue-150/20 rounded-full blur-[110px] pointer-events-none z-0"
        />

        {/* Hero content grid */}
        <div className="relative z-20 max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Subtle 3D Tilt Image with Soft floating animation */}
          <div className="md:col-span-6 flex justify-center">
            <motion.div
              style={{ y: imageScrollY }}
              className="w-full max-w-[450px]"
            >
              {/* Soft floating animation */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                ref={imgContainerRef}
                onMouseMove={handleImageMouseMove}
                onMouseLeave={handleImageMouseLeave}
                style={{
                  rotateX: smoothRotateX,
                  rotateY: smoothRotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative aspect-square w-full rounded-[32px] overflow-hidden shadow-2xl bg-slate-100 group cursor-grab active:cursor-grabbing border border-slate-200/40"
              >
                {/* Clean, high-contrast, black and white styled founder image */}
                <img
                  src={professionalHandshake}
                  alt="Max Holden"
                  className="w-full h-full object-cover grayscale contrast-[1.12] transition-transform duration-500"
                  
                />
                
                {/* Corner light reflection mask for extra luxury finish */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Text Information & Counting Blocks with slow counter */}
          <motion.div
            style={{ y: textScrollY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 flex flex-col items-start text-left"
          >
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-3 bg-blue-50 px-3 py-1.5 rounded-lg">
              Meet Our Founder
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-slate-900 tracking-tight leading-[1.08] mb-2">
              Arbab Wasi
            </h1>

            <p className="text-sm font-semibold text-slate-500 font-sans tracking-wide mb-5">
              Founder & Managing Director
            </p>

            {/* Accent divider line */}
            <div className="w-14 h-[3px] bg-slate-900 mb-6 rounded-full" />

            <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
              Founded by Arbab Wasi, Bucks & Bricks was established with a simple yet powerful vision — to redefine how organizations discover, attract, and develop talent. With extensive experience in recruitment, executive search, HR consulting, and organizational development, Arbab has partnered with leading organizations across diverse industries to solve hiring challenges and build high-performing teams.
            </p>

            <blockquote className="border-l-2 border-blue-600 pl-4 italic text-slate-700 font-sans text-xs sm:text-sm mb-8">
              “Great businesses are built by great people. Our role is to connect organizations with the talent that drives lasting success.”
            </blockquote>

            {/* Counting blocks */}
            <div className="grid grid-cols-2 gap-5 w-full max-w-md">
              {/* Followers Block */}
              <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-6 text-left flex flex-col justify-center shadow-sm">
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight mb-1">
                  <Counter target={1.1} duration={4.0} decimals={1} suffix="M+" />
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  Followers
                </span>
              </div>

              {/* Likes Block */}
              <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-6 text-left flex flex-col justify-center shadow-sm">
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight mb-1">
                  <Counter target={2.5} duration={4.2} decimals={1} suffix="M" />
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  Likes
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. Reused Team Section */}
      <Team />

      {/* 3. Reused Contact Section */}
      <Contact />
    </div>
  );
}
