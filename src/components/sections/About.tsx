import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Database, Smartphone, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.about-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
    {
      icon: Code,
      title: 'Frontend Development',
      description: 'Expert in React, TypeScript, and modern web technologies',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Building cross-platform apps with React Native',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Database,
      title: 'Backend Development',
      description: 'ASP.NET, Laravel, and database optimization',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Globe,
      title: 'Full Stack Solutions',
      description: 'End-to-end application development and deployment',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const timeline = [
    {
      year: '2022',
      title: 'Started Computer Science',
      description: 'Began my journey at University of Lahore',
    },
    {
      year: '2023',
      title: 'First Projects',
      description: 'Built my first React applications and learned mobile development',
    },
    {
      year: '2024',
      title: 'Professional Growth',
      description: 'Expanded to full-stack development with ASP.NET and advanced React',
    },
    {
      year: '2025',
      title: 'Innovation Focus',
      description: 'Focusing on cutting-edge technologies and problem-solving',
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 gradient-text"
        >
          About Me
        </motion.h2>

        <div ref={contentRef} className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="about-card card-3d mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                  Problem Solver & Tech Enthusiast
                </h3>
                <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                  I'm a software engineer who loves solving problems, whether they're technical or not. 
                  I enjoy working with React, React Native, JavaScript, TypeScript, ASP.NET, and Python. 
                  What drives me is seeing things get done and making real progress.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  Currently pursuing Computer Science at the University of Lahore (2022-2026), 
                  I like building useful stuff and learning along the way. Based in Lahore, Pakistan, 
                  I'm always excited to take on new challenges and create meaningful solutions.
                </p>
              </div>
              
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl backdrop-blur-sm border border-primary/20 flex items-center justify-center">
                  <div className="text-6xl font-bold gradient-text">HT</div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                whileHover={{ scale: 1.05, y: -5 }}
                className="about-card card-3d text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${highlight.color} p-4 flex items-center justify-center`}>
                  <highlight.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-foreground">
                  {highlight.title}
                </h4>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <div className="about-card card-3d">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center gradient-text">
              My Journey
            </h3>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-6 group"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center font-bold text-white text-sm">
                    {item.year}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-foreground/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;