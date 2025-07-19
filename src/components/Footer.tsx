import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/HayyanTariq', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/hayyan-tariq-051a1a282', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hayyantariq2004@gmail.com', label: 'Email' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-border/50 bg-card/20 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-3xl font-bold gradient-text cursor-pointer"
            onClick={scrollToTop}
          >
            HT
          </motion.div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-3 rounded-full bg-card/50 hover:bg-primary/20 transition-all duration-300 group border border-border/30 hover:border-primary/50"
              >
                <social.icon className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-foreground/60"
          >
            <p className="flex items-center justify-center gap-2 mb-2">
              Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by Hayyan Tariq
            </p>
            <p className="text-sm">
              © {currentYear} All rights reserved. Built with React, TypeScript, and Three.js
            </p>
          </motion.div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-primary/20 hover:bg-primary/30 transition-all duration-300 border border-primary/30 hover:border-primary/50"
          >
            <ArrowUp className="w-5 h-5 text-primary" />
          </motion.button>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 border border-primary/10 rounded-full animate-float" />
        <div className="absolute bottom-10 right-10 w-16 h-16 border border-secondary/10 rotate-45 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      </div>
    </footer>
  );
};

export default Footer;