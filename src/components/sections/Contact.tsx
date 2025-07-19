import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
        '.contact-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon!",
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hayyantariq2004@gmail.com',
      href: 'mailto:hayyantariq2004@gmail.com',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Lahore, Pakistan',
      href: '#',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@HayyanTariq',
      href: 'https://github.com/HayyanTariq',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Hayyan Tariq',
      href: 'https://linkedin.com/in/hayyan-tariq-051a1a282',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 gradient-text"
        >
          Let's Work Together
        </motion.h2>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="contact-card card-3d">
                <h3 className="text-2xl font-bold mb-6 text-foreground">
                  Get In Touch
                </h3>
                <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                  Ready to bring your ideas to life? I'm always excited to discuss new projects, 
                  creative ideas, or opportunities to be part of your team. Let's create something amazing together!
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-card/50 hover:bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 group"
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${info.gradient} flex items-center justify-center`}>
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {info.label}
                        </div>
                        <div className="text-foreground/70 text-sm">
                          {info.value}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Download CV Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-8 btn-3d flex items-center justify-center gap-3"
                >
                  <Download className="w-5 h-5" />
                  Download CV
                </motion.button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-card card-3d">
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                Send a Message
              </h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                      placeholder="Your name"
                    />
                  </motion.div>
                  
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </motion.div>
                </div>

                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                    placeholder="Project discussion, job opportunity, etc."
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or how we can work together..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full btn-3d flex items-center justify-center gap-3 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>

          {/* Additional CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 text-center card-3d"
          >
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg text-foreground/80 mb-6 max-w-2xl mx-auto leading-relaxed">
              Whether you need a web application, mobile app, or full-stack solution, 
              I'm here to help turn your vision into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:hayyantariq2004@gmail.com"
                whileHover={{ scale: 1.05 }}
                className="btn-3d inline-flex items-center gap-3"
              >
                <Mail className="w-5 h-5" />
                Start a Conversation
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/hayyan-tariq-051a1a282"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-3"
              >
                <Linkedin className="w-5 h-5" />
                Connect on LinkedIn
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;