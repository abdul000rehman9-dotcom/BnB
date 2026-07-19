/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { AnimatedHeading, AnimatedParagraph, ImageReveal, StaggerContainer, StaggerItem } from './animations';

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="relative py-20 sm:py-28 bg-[#ffffff] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Solid Grey Image Placeholder per reference image */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl aspect-[4/3] w-full overflow-hidden shadow-lg border border-slate-200/80 relative bg-[#e2e8f0] flex items-center justify-center select-none"
          >
            <span className="text-slate-400 font-sans text-lg font-semibold tracking-wider lowercase">image</span>
          </motion.div>
        </div>

        {/* Right Side: Copy & Bullet Points */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-start text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-left"
          >
            <span className="text-[11px] font-bold text-slate-800 font-sans tracking-tight">
              Why Choose Us?
            </span>
          </motion.div>

          {/* Heading */}
          <AnimatedHeading
            text="Why Choose us Bricks n bucks"
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight leading-tight mb-6"
          />

          {/* Paragraph */}
          <AnimatedParagraph className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed mb-8">
            bricks and bucks streamlines HR processes with seamless integrations and tools, empowering businesses to manage efficiently. Experience enhanced productivity and workforce management today.
          </AnimatedParagraph>

          {/* Bullet Points (Stagger Upward) */}
          <StaggerContainer className="flex flex-col gap-4">
            
            {/* Point 1 */}
            <StaggerItem direction="up">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#eef2ff] border border-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <Check size={12} className="text-blue-600 stroke-[3]" />
                </div>
                <span className="text-slate-800 font-sans text-xs sm:text-sm font-semibold">
                  Get Overview ate a glance
                </span>
              </div>
            </StaggerItem>

            {/* Point 2 */}
            <StaggerItem direction="up">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#eef2ff] border border-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <Check size={12} className="text-blue-600 stroke-[3]" />
                </div>
                <span className="text-slate-800 font-sans text-xs sm:text-sm font-semibold">
                  Deoposit funds easily, security
                </span>
              </div>
            </StaggerItem>

            {/* Point 3 */}
            <StaggerItem direction="up">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#eef2ff] border border-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <Check size={12} className="text-blue-600 stroke-[3]" />
                </div>
                <span className="text-slate-800 font-sans text-xs sm:text-sm font-semibold">
                  Get Live Support
                </span>
              </div>
            </StaggerItem>

          </StaggerContainer>
        </div>

      </div>
    </section>
  );
}
