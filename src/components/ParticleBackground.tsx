import React from 'react';

const ParticleBackground: React.FC = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDelay: Math.random() * 6,
    animationDuration: Math.random() * 10 + 10,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle absolute"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
          }}
        />
      ))}
      
      {/* Additional geometric shapes */}
      <div className="absolute top-20 right-20 w-16 h-16 border border-primary/20 rotate-45 animate-float" />
      <div className="absolute bottom-32 left-16 w-12 h-12 rounded-full border-2 border-secondary/30 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-gradient-to-r from-primary/10 to-secondary/10 rotate-12 animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-20 right-20 w-6 h-6 border border-accent/25 animate-float" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default ParticleBackground;