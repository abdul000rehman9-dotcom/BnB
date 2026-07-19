/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

// Custom inline SVG logo for Webflow
function WebflowLogo() {
  return (
    <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity duration-300">
      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
        <path d="M23.1 5.3s-1.8.8-2.5 1.1c-.8.3-1.6.6-2.4 1-.3.1-.5.3-.6.5l-3.3 8.3c-.1.2-.2.3-.4.3h-.2c-.2 0-.3-.1-.4-.2L10 11.2c-.1-.1-.1-.2-.1-.3l1.8-6.1c.1-.2.2-.3.4-.3h2.3c.2 0 .4.1.4.3L13.1 9c0 .1 0 .2.1.2l1.6 3.8 2.2-6.1c.1-.2.2-.3.4-.3h3.5c.2 0 .3.1.4.2.1.2.1.3 0 .4l-4.1 9.3c-.1.2-.2.3-.4.3h-2.1c-.2 0-.4-.1-.4-.3L12.4 12c0-.1-.1-.1-.2-.1l-1.6 3.6c-.1.2-.2.3-.4.3H8.1c-.2 0-.3-.1-.4-.3L4.1 6.5C4 6.3 3.9 6.2 3.8 6.1l-1.3-.4c-.1-.1-.2-.1-.2-.2 0-.1.1-.2.2-.2h4.5c.2 0 .4.1.4.3l1.6 4.8c0 .1.1.1.2.1l1.1-2.9-1.2-3.3c-.1-.2-.2-.3-.4-.3H6c-.2 0-.3-.1-.3-.2 0-.1.1-.2.2-.2H10c.2 0 .4.1.4.3l1.6 4.2h.2c0-.1.1-.1.1-.2l1.1-2.9-1.3-3.4c-.1-.2-.2-.3-.4-.3h-2.1c-.2 0-.3-.1-.3-.2 0-.1.1-.2.2-.2h4.4c.2 0 .4.1.4.3l1.6 4.3h.2l1.1-2.9-1.3-3.4c-.1-.2-.2-.3-.4-.3h-2.2c-.2 0-.3-.1-.3-.2 0-.1.1-.2.2-.2h4.8c.2 0 .4.1.4.3l2.2 5.5s1.4-3.5 2.1-5.1c.1-.2.2-.3.4-.3H23c.2 0 .3.1.3.2 0 0-.1.1-.2.1z" />
      </svg>
      <span className="font-display font-bold text-white tracking-tight text-sm">Webflow</span>
    </div>
  );
}

// Custom inline SVG logo for Relume
function RelumeLogo() {
  return (
    <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity duration-300">
      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zm0 10L2 17l10 5 10-5-10-5z" />
      </svg>
      <span className="font-display font-bold text-white tracking-tight text-sm">Relume</span>
    </div>
  );
}

export function TrustedCompanies() {
  const marqueeItems = [
    { component: <WebflowLogo /> },
    { component: <RelumeLogo /> },
    { component: <WebflowLogo /> },
    { component: <RelumeLogo /> },
    { component: <WebflowLogo /> },
    { component: <RelumeLogo /> },
    { component: <WebflowLogo /> },
    { component: <RelumeLogo /> },
  ];

  // Double the items to make the horizontal scroll loop perfectly seamless
  const extendedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section className="relative bg-[#0b132a] py-6 sm:py-8 overflow-hidden z-20 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 flex justify-center mb-4 sm:mb-5">
        <ul className="list-disc text-slate-400 font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase pl-4">
          <li>Trusted by 100 of top companies</li>
        </ul>
      </div>

      {/* Infinite Horizontal Loop Marquee */}
      <div className="flex overflow-hidden relative select-none w-full py-1">
        {/* Soft blur side gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0b132a] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0b132a] to-transparent z-10" />

        <motion.div
          animate={{ x: [0, '-33.333%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 16,
              ease: 'linear',
            },
          }}
          className="flex gap-16 md:gap-24 whitespace-nowrap min-w-max items-center px-4"
        >
          {extendedItems.map((item, index) => (
            <div key={index} className="inline-block">
              {item.component}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
