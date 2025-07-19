import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skillsData = {
    frontend: [
      { name: 'React.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Next.js', level: 50 },
      { name: 'React Native', level: 95 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
    ],
    backend: [
      { name: 'ASP.NET', level: 95 },
      { name: 'Laravel', level: 50 },
      { name: 'Python', level: 70 },
      { name: 'JavaScript', level: 90 },
    ],
    databases: [
      { name: 'MySQL', level: 80 },
      { name: 'MongoDB', level: 75 },
      { name: 'SQL Server', level: 85 },
    ],
    tools: [
      { name: 'Git/GitHub', level: 90 },
      { name: 'VS Code', level: 95 },
      { name: 'Docker', level: 60 },
      { name: 'Figma', level: 70 },
    ],
  };

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
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate skill cards
      gsap.fromTo(
        '.skill-category',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate progress bars
      gsap.fromTo(
        '.progress-fill',
        { width: '0%' },
        {
          width: (index, element) => element.dataset.level + '%',
          duration: 1.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const SkillBar: React.FC<{ skill: { name: string; level: number } }> = ({ skill }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="mb-6 group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
          {skill.name}
        </span>
        <span className="text-sm text-foreground/60 font-mono">
          {skill.level}%
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="progress-fill h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
          data-level={skill.level}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>
    </motion.div>
  );

  const SkillCategory: React.FC<{ 
    title: string; 
    skills: { name: string; level: number }[];
    gradient: string;
  }> = ({ title, skills, gradient }) => (
    <div className="skill-category card-3d">
      <div className={`text-center mb-6 p-4 rounded-xl bg-gradient-to-r ${gradient}`}>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="space-y-4">
        {skills.map((skill) => (
          <SkillBar key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 gradient-text"
        >
          Skills & Expertise
        </motion.h2>

        <div ref={skillsRef} className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SkillCategory
              title="Frontend"
              skills={skillsData.frontend}
              gradient="from-blue-500 to-cyan-500"
            />
            <SkillCategory
              title="Backend"
              skills={skillsData.backend}
              gradient="from-purple-500 to-pink-500"
            />
            <SkillCategory
              title="Databases"
              skills={skillsData.databases}
              gradient="from-green-500 to-emerald-500"
            />
            <SkillCategory
              title="Tools"
              skills={skillsData.tools}
              gradient="from-orange-500 to-red-500"
            />
          </div>

          {/* Additional Skills Summary */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 card-3d text-center"
          >
            <h3 className="text-2xl font-bold mb-6 gradient-text">
              Continuous Learning
            </h3>
            <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto">
              I'm always expanding my skillset and staying up-to-date with the latest technologies. 
              Currently exploring advanced React patterns, cloud technologies, and AI integration 
              to build even more powerful and efficient solutions.
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {['Three.js', 'GSAP', 'Framer Motion', 'GraphQL', 'AWS', 'Docker'].map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className="px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full text-sm font-medium border border-primary/30 hover:border-primary/50 transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;