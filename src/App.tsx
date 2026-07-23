
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustedCompanies } from './components/TrustedCompanies';
import { Services } from './components/Services';
import { Vacancies } from './components/Vacancies';
import { ResumeSection } from './components/ResumeSection';
import { JourneyTimeline } from './components/JourneyTimeline';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Team } from './components/Team';
import { Testimonials } from './components/Testimonials';
import { BlogCards } from './components/BlogCards';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AboutPage } from './components/AboutPage';
import { ServiceDetailsPage } from './components/ServiceDetailsPage';
import { CareerPage } from './components/CareerPage';
import { BlogPage } from './components/BlogPage';
import { CEOPage } from './components/CEOPage';
import { OurImpactPage } from './components/OurImpactPage';
import { JobDetailPage } from './components/JobDetailPage';

export default function App() {
  const [selectedJobId, setSelectedJobId] = useState<string>('1');

  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#job-')) {
      const id = hash.replace('#job-', '');
      return `job-${id || '1'}`;
    }
    if (hash === '#about') return 'about';
    if (hash === '#career') return 'career';
    if (hash === '#blog') return 'blog';
    if (hash === '#ceo' || hash === '#founder' || hash === '#our-story') return 'ceo';
    if (hash === '#impact') return 'impact';
    if (hash === '#executive-search') return 'executive-search';
    if (hash === '#recruitment-solution') return 'recruitment-solution';
    if (hash === '#hr-consulting') return 'hr-consulting';
    if (hash === '#learning-development') return 'learning-development';
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const servicePages = ['executive-search', 'recruitment-solution', 'hr-consulting', 'learning-development'];
      const standalonePages = ['career', 'blog', 'ceo', 'impact'];
      let pageName = hash.replace('#', '');
      if (pageName === 'founder') pageName = 'ceo';

      if (hash.startsWith('#job-')) {
        const id = hash.replace('#job-', '');
        setSelectedJobId(id || '1');
        setCurrentPage('job-detail');
        window.scrollTo(0, 0);
      } else if (hash === '#about') {
        setCurrentPage('about');
        window.scrollTo(0, 0);
      } else if (hash === '#our-story') {
        setCurrentPage('ceo');
        setTimeout(() => {
          const el = document.getElementById('our-story');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else if (standalonePages.includes(pageName)) {
        setCurrentPage(pageName);
        window.scrollTo(0, 0);
      } else if (servicePages.includes(pageName)) {
        setCurrentPage(pageName);
        window.scrollTo(0, 0);
      } else {
        setCurrentPage('home');
        if (hash && hash !== '#home') {
          const id = hash.substring(1);
          setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash) {
      handleHashChange();
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    if (page === 'home') {
      window.location.hash = '#home';
      window.scrollTo(0, 0);
    } else {
      window.location.hash = `#${page}`;
      window.scrollTo(0, 0);
    }
  };

  const handleSelectJob = (jobId: string) => {
    setSelectedJobId(jobId);
    setCurrentPage('job-detail');
    window.location.hash = `#job-${jobId}`;
    window.scrollTo(0, 0);
  };

  const isServicePage = ['executive-search', 'recruitment-solution', 'hr-consulting', 'learning-development'].includes(currentPage);
  const isJobDetailPage = currentPage === 'job-detail' || currentPage.startsWith('job-');

  return (
    <div className="relative min-h-screen bg-[#fcfbfa] flex flex-col overflow-x-hidden antialiased">
      {/* Dynamic Header & Sticky Navigation */}
      <Navbar currentPage={currentPage} onPageChange={handlePageChange} />

      <main className="flex-1">
        {isJobDetailPage ? (
          <JobDetailPage key={selectedJobId} jobId={selectedJobId} onBack={() => handlePageChange('career')} />
        ) : currentPage === 'about' ? (
          <AboutPage />
        ) : currentPage === 'career' ? (
          <CareerPage />
        ) : currentPage === 'blog' ? (
          <BlogPage />
        ) : currentPage === 'ceo' ? (
          <CEOPage />
        ) : currentPage === 'impact' ? (
          <OurImpactPage />
        ) : isServicePage ? (
          <ServiceDetailsPage serviceType={currentPage as any} />
        ) : (
          <>
            {/* Hero Banner Section */}
            <Hero />

            {/* Logo Band Horizonal Loop */}
            <TrustedCompanies />

            {/* Services & Detailed Features */}
            <Services onServiceSelect={handlePageChange} />

            {/* Vacancies / Job Listings Board */}
            <Vacancies onSelectJob={handleSelectJob} />

            {/* AI Resume Check Engine */}
            <ResumeSection />

            {/* Milestone Journey Wave Timeline */}
            <JourneyTimeline />

            {/* About / Why Choose Us Column Block */}
            <WhyChooseUs />

            {/* Professional Core Members Grid */}
            <Team />

            {/* Clients & Happy Testimonies Sliders */}
            <Testimonials />

            {/* Latest Blog Post Cards Spread */}
            <BlogCards />

            {/* Custom Form & Support Panel */}
            <Contact />
          </>
        )}
      </main>
      {/* Structured Footer Column Grid */}
      <Footer onPageChange={handlePageChange} />
    </div>
  );
}

