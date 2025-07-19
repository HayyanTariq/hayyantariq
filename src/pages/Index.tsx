import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Navigation from '../components/Navigation';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import Footer from '../components/Footer';
import CursorLight from '../components/CursorLight';
import ParticleBackground from '../components/ParticleBackground';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Global GSAP settings
    gsap.config({
      force3D: true,
    });

    // Smooth scrolling enhancement
    const lenis = {
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    };

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Effects */}
      <ParticleBackground />
      <CursorLight />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
