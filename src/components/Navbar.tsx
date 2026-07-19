/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { AnimatedButton } from './animations';
import logoImg from '../../assets/b&b logo-02.jpg.jpeg';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Service', href: '#services' },
    { label: 'Why Choose Us', href: '#why-choose-us' },
    { label: 'Our Clients', href: '#testimonials' },
    { label: 'Contact Us', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          mass: 0.8,
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center group">
            <img
              src={logoImg}
              alt="BucksnBricks Logo"
              className="h-11 w-auto rounded-lg object-contain border border-slate-100/50 shadow-sm group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-slate-600 hover:text-blue-500 font-sans text-sm font-medium transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <AnimatedButton
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#0b132a] hover:bg-blue-500 text-white font-sans text-sm font-semibold py-2.5 px-6 rounded-full transition-colors duration-300"
            >
              Book Demo
            </AnimatedButton>
          </div>

          {/* Mobile Hamburguer Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="text-slate-800 hover:text-blue-500 p-1.5 focus:outline-none transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Sliding Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />

            {/* Sidebar drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-white z-50 shadow-2xl p-8 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                {/* Logo inside sidebar */}
                <div className="flex items-center">
                  <img
                    src={logoImg}
                    alt="BucksnBricks Logo"
                    className="h-10 w-auto rounded-lg object-contain border border-slate-100/50 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-slate-800 focus:outline-none transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Navigation Links inside sidebar */}
              <div className="flex flex-col gap-5 mt-4">
                {navItems.map((item, index) => (
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-slate-700 hover:text-blue-500 font-sans text-base font-semibold py-1.5 border-b border-slate-50 transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              {/* CTA inside sidebar */}
              <div className="mt-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      const element = document.getElementById('contact');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-[#0b132a] hover:bg-blue-500 text-white font-sans text-base font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 shadow-md shadow-slate-950/10"
                  >
                    <span>Book Demo</span>
                    <ArrowRight size={18} />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
