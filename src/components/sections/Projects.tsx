import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, Smartphone, Globe, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: 'E-Commerce Mobile App',
      description: 'A full-featured React Native e-commerce application with payment integration, user authentication, and real-time inventory management.',
      tech: ['React Native', 'TypeScript', 'ASP.NET', 'SQL Server'],
      icon: Smartphone,
      gradient: 'from-blue-500 to-cyan-500',
      github: 'https://github.com/HayyanTariq',
      demo: '#',
      image: 'mobile-ecommerce',
    },
    {
      title: 'Portfolio Dashboard',
      description: 'A modern web dashboard for portfolio management with interactive charts, real-time data updates, and responsive design.',
      tech: ['React.js', 'TypeScript', 'Laravel', 'MySQL'],
      icon: Globe,
      gradient: 'from-purple-500 to-pink-500',
      github: 'https://github.com/HayyanTariq',
      demo: '#',
      image: 'portfolio-dashboard',
    },
    {
      title: 'Task Management System',
      description: 'A collaborative task management platform with team features, deadline tracking, and progress analytics.',
      tech: ['React.js', 'ASP.NET', 'MongoDB', 'SignalR'],
      icon: Database,
      gradient: 'from-green-500 to-emerald-500',
      github: 'https://github.com/HayyanTariq',
      demo: '#',
      image: 'task-management',
    },
    {
      title: 'Learning Platform',
      description: 'An educational platform with video streaming, quiz system, progress tracking, and interactive learning modules.',
      tech: ['Next.js', 'Python', 'PostgreSQL', 'AWS'],
      icon: Globe,
      gradient: 'from-orange-500 to-red-500',
      github: 'https://github.com/HayyanTariq',
      demo: '#',
      image: 'learning-platform',
    },
  ];

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

      gsap.fromTo(
        '.project-card',
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const ProjectCard: React.FC<{ project: typeof projects[0]; index: number }> = ({ 
    project, 
    index 
  }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -8 }}
      className="project-card card-3d group overflow-hidden"
    >
      {/* Project Image/Icon */}
      <div className={`relative h-48 bg-gradient-to-br ${project.gradient} rounded-lg mb-6 flex items-center justify-center overflow-hidden`}>
        <project.icon className="w-16 h-16 text-white/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Overlay Links */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
          >
            <Github className="w-6 h-6 text-white" />
          </motion.a>
          <motion.a
            href={project.demo}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
          >
            <ExternalLink className="w-6 h-6 text-white" />
          </motion.a>
        </div>
      </div>

      {/* Project Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-foreground/70 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Github className="w-4 h-4" />
            Code
          </a>
          <a
            href={project.demo}
            className="flex-1 py-2 px-4 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-lg hover:border-primary/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            Demo
          </a>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="projects" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 gradient-text"
        >
          Featured Projects
        </motion.h2>

        <div ref={projectsRef} className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center card-3d"
          >
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Explore More Projects
            </h3>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Visit my GitHub profile to see more projects and contributions to the open-source community.
            </p>
            <motion.a
              href="https://github.com/HayyanTariq"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-3d inline-flex items-center gap-3"
            >
              <Github className="w-5 h-5" />
              View GitHub Profile
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;