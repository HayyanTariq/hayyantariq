import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { gsap } from 'gsap';
import Logo3D from '../Logo3D';
import ThreeJSErrorBoundary from '../ThreeJSErrorBoundary';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Logo Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <ThreeJSErrorBoundary>
          <Logo3D className="w-full h-full max-w-4xl max-h-4xl" />
        </ThreeJSErrorBoundary>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 mt-20"
        >
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-secondary p-1">
            <div className="w-full h-full rounded-full bg-background overflow-hidden">
              <img 
                src="/lovable-uploads/1753a369-f5d3-4d8f-a8c2-a809f8495874.png" 
                alt="Hayyan Tariq" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="gradient-text">Hayyan Tariq</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-8 font-light"
        >
          Software Engineer & Full Stack Developer
        </p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-lg md:text-xl text-foreground/60 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Passionate about solving problems and building innovative solutions with{' '}
          <span className="text-primary font-medium">React</span>,{' '}
          <span className="text-secondary font-medium">TypeScript</span>,{' '}
          <span className="text-accent font-medium">ASP.NET</span>, and{' '}
          <span className="text-primary font-medium">React Native</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button 
            onClick={scrollToAbout}
            className="btn-3d group px-8 py-4"
          >
            <span className="flex items-center gap-3">
              Explore My Work
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </span>
          </button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-3 group"
          >
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" />
            Download CV
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { number: '1+', label: 'Years Experience' },
            { number: '10+', label: 'Projects Completed' },
            { number: '100%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-foreground/60 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;