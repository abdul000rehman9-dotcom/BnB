/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#fcfbfa] flex flex-col overflow-x-hidden antialiased">
      {/* Dynamic Header & Sticky Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Banner Section */}
        <Hero />

        {/* Logo Band Horizonal Loop */}
        <TrustedCompanies />

        {/* Services & Detailed Features */}
        <Services />

        {/* Vacancies / Job Listings Board */}
        <Vacancies />

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
      </main>

      {/* Structured Footer Column Grid */}
      <Footer />
    </div>
  );
}
