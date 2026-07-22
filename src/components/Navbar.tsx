
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { AnimatedButton } from './animations';
const logoImg = '/assets/logo-main.png';

interface NavbarProps {
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

export function Navbar({ currentPage = 'home', onPageChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const desktopNavItems = [
    { label: 'Home', href: '#home', page: 'home', sectionId: 'home' },
    { label: 'About Us', href: '#about', page: 'about', sectionId: 'about' },
    { label: 'Our Service', href: '#services', page: 'services', sectionId: 'services' },
    { label: 'Founder', href: '#ceo', page: 'ceo', sectionId: 'ceo' },
    { label: 'Our Impact', href: '#impact', page: 'impact', sectionId: 'impact' },
    { label: 'Contact Us', href: '#contact', page: 'contact', sectionId: 'contact' },
  ];

  const mobileNavItems = [
    { label: 'Home', href: '#home', page: 'home', sectionId: 'home' },
    { label: 'About Us', href: '#about', page: 'about', sectionId: 'about' },
    { label: 'Our Service', href: '#services', page: 'services', sectionId: 'services' },
    { label: 'Executive Search', href: '#executive-search', page: 'executive-search', sectionId: 'executive-search' },
    { label: 'Recruitment Solutions', href: '#recruitment-solution', page: 'recruitment-solution', sectionId: 'recruitment-solution' },
    { label: 'HR Consulting', href: '#hr-consulting', page: 'hr-consulting', sectionId: 'hr-consulting' },
    { label: 'Learning & Development', href: '#learning-development', page: 'learning-development', sectionId: 'learning-development' },
    { label: 'Our Impact', href: '#impact', page: 'impact', sectionId: 'impact' },
    { label: 'Our Blog', href: '#blog', page: 'blog', sectionId: 'blog' },
    { label: 'Founder', href: '#ceo', page: 'ceo', sectionId: 'ceo' },
    { label: 'Careers', href: '#career', page: 'career', sectionId: 'career' },
    { label: 'Contact Us', href: '#contact', page: 'contact', sectionId: 'contact' },
  ];

  const isActive = (itemPage: string) => {
    if (currentPage === itemPage) return true;
    if (itemPage === 'ceo' && (currentPage === 'founder' || currentPage === 'ceo')) return true;
    if (itemPage === 'services' && ['executive-search', 'recruitment-solution', 'hr-consulting', 'learning-development'].includes(currentPage)) {
      return true;
    }
    return false;
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: { label: string; href: string; page: string; sectionId: string }
  ) => {
    e.preventDefault();
    if (!onPageChange) return;

    const standalonePages = [
      'about',
      'ceo',
      'impact',
      'blog',
      'career',
      'executive-search',
      'recruitment-solution',
      'hr-consulting',
      'learning-development',
    ];

    if (standalonePages.includes(item.page)) {
      onPageChange(item.page);
      window.scrollTo(0, 0);
    } else if (item.page === 'home') {
      onPageChange('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.page === 'services') {
      if (currentPage === 'home') {
        const element = document.getElementById('services');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        onPageChange('home');
        setTimeout(() => {
          const element = document.getElementById('services');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    } else if (item.page === 'contact') {
      if (currentPage === 'home') {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        onPageChange('home');
        setTimeout(() => {
          const element = document.getElementById('contact');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    }
  };

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
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (onPageChange) {
                onPageChange('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center group"
          >
            <img
              src={logoImg}
              alt="BucksnBricks Logo"
              className="h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {desktopNavItems.map((item) => {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={`font-sans text-sm font-medium transition-colors duration-200 relative group ${
                    isActive(item.page) ? 'text-blue-500' : 'text-slate-600 hover:text-blue-500'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-[-4px] left-0 h-0.5 bg-blue-500 transition-all duration-300 ${
                    isActive(item.page) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </a>
              );
            })}
          </div>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <AnimatedButton
              onClick={() => {
                if (currentPage === 'home') {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                } else if (onPageChange) {
                  onPageChange('home');
                  setTimeout(() => {
                    const element = document.getElementById('contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }
              }}
              className="bg-[#0b132a] hover:bg-blue-500 text-white font-sans text-sm font-semibold py-2.5 px-6 rounded-full transition-colors duration-300"
            >
              Contact Us
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
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-white z-50 shadow-2xl p-6 flex flex-col md:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6 shrink-0">
                {/* Logo inside sidebar */}
                <div className="flex items-center">
                  <img
                    src={logoImg}
                    alt="BucksnBricks Logo"
                    className="h-10 w-auto object-contain"
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
              <div className="flex flex-col gap-3 my-2 overflow-y-auto">
                {mobileNavItems.map((item, index) => (
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      setIsOpen(false);
                      handleLinkClick(e, item);
                    }}
                    className={`font-sans text-sm font-semibold py-1.5 border-b border-slate-50 transition-colors ${
                      isActive(item.page) ? 'text-blue-500' : 'text-slate-700 hover:text-blue-500'
                    }`}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              {/* CTA inside sidebar */}
              <div className="mt-auto pt-4 shrink-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <AnimatedButton
                    onClick={() => {
                      setIsOpen(false);
                      if (currentPage === 'home') {
                        const element = document.getElementById('contact');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      } else if (onPageChange) {
                        onPageChange('home');
                        setTimeout(() => {
                          const element = document.getElementById('contact');
                          if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }, 150);
                      }
                    }}
                    delay={0.2}
                    className="w-full bg-[#0b132a] hover:bg-blue-500 text-white font-sans text-sm font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 shadow-md shadow-slate-950/10"
                  >
                    <span>Contact Us</span>
                    <ArrowRight size={18} />
                  </AnimatedButton>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
