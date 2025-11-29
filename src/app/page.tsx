'use client';
import { useState, useEffect, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBarChart2, FiAward, FiCode, FiDownload, FiMail, FiX, FiMessageSquare, FiLinkedin, FiInstagram, FiGithub, FiStar, FiExternalLink, FiCalendar, FiEye, FiClock, FiUser } from 'react-icons/fi';
import { FaWhatsapp, FaTelegram, FaLine } from 'react-icons/fa';
import React from 'react';
import Link from 'next/link';

// Typing animation hook
function useTyping(text: string, delay = 100, pause = 3000) {
  const [display, setDisplay] = useState('');
  const [phase, setPhase] = useState<'typing' | 'waiting' | 'deleting'>('typing');
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (phase === 'typing') {
      if (idx < text.length) {
        timeout = setTimeout(() => {
          setDisplay((d) => d + text[idx]);
          setIdx((i) => i + 1);
        }, delay);
      } else {
        timeout = setTimeout(() => setPhase('deleting'), pause);
      }
    } else if (phase === 'deleting') {
      if (idx > 0) {
        timeout = setTimeout(() => {
          setDisplay((d) => d.slice(0, -1));
          setIdx((i) => i - 1);
        }, delay / 2);
      } else {
        timeout = setTimeout(() => setPhase('typing'), 500);
      }
    } else if (phase === 'waiting') {
      timeout = setTimeout(() => setPhase('deleting'), pause);
    }
    return () => clearTimeout(timeout);
  }, [text, idx, phase, delay, pause]);

  useEffect(() => {
    if (phase === 'typing') setIdx(0);
    if (phase === 'deleting') setIdx(text.length);
  }, [phase, text]);

  return display;
}

// Particle Background Component - Fixed for hydration
const FloatingParticles = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Jangan render particles di server
  if (!isClient) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.8 + 0.2,
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
          style={{
            width: Math.random() * 15 + 5,
            height: Math.random() * 15 + 5,
          }}
        />
      ))}
    </div>
  );
};

// Animated Background Gradient
const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<Array<{left: string, top: string, width: string, height: string, delay: string, duration: string}>>([]);

  useEffect(() => {
    setIsClient(true);
    
    // Generate particles hanya di client
    const generatedParticles = Array.from({ length: 15 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 10 + 10}s`
    }));
    setParticles(generatedParticles);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    // Throttle mouse events untuk performa
    let ticking = false;
    const throttledMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', throttledMouseMove);
    return () => window.removeEventListener('mousemove', throttledMouseMove);
  }, []);

  // Untuk menghindari hydration mismatch, render minimal di server
  if (!isClient) {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient static - lebih ringan */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #581c87 50%, #831843 100%)',
        }}
      />

      {/* Interactive gradient yang mengikuti mouse - simplified */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: `radial-gradient(circle 600px at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(139, 92, 246, 0.25), transparent 50%)`,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 30,
          mass: 0.5
        }}
      />

      {/* Reduced animated orbs - hanya 2 dengan animasi lebih sederhana */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/15 rounded-full blur-2xl"
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-pink-500/15 rounded-full blur-2xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Simplified particles - hanya di-render di client */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20 animate-float"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.width,
              height: particle.height,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      {/* Static mesh grid - tanpa animasi */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Static vignette effect */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/5 to-black/40"
      />

      {/* Reduced shimmer effect - hanya 1 dengan durasi lebih lama */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)',
          transform: 'skewX(-20deg)',
        }}
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 3,
        }}
      />
    </div>
  );
};

// Glass Morphism Card Component
const GlassCard = ({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
  return (
    <motion.div
      className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl ${className}`}
      whileHover={{
        scale: 1.02,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        transition: { duration: 0.2 }
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

// Interface definitions
interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  demo_url: string;
  code_url: string;
  display_order: number;
  is_featured: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  tags: ProjectTag[];
}

interface ProjectTag {
  id: string;
  name: string;
  color: string;
  created_at: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  start_year: string;
  end_year: string;
  current_job: boolean;
  display_order: number;
  responsibilities: Responsibility[];
  skills: ExperienceSkill[];
}

interface Responsibility {
  id: string;
  experience_id: string;
  description: string;
  display_order: number;
  created_at: string;
}

interface ExperienceSkill {
  experience_id: string;
  skill_name: string;
}

interface Skill {
  id: string;
  name: string;
  value: number;
  icon_url: string;
  category: string;
  display_order: number;
  is_featured: boolean | string | null;
  created_at: string;
  updated_at: string;
}

interface Certificate {
  id: string;
  name: string;
  image_url: string;
  issue_date: string;
  issuer: string;
  credential_url: string;
  display_order: number;
  created_at: string;
}

interface Education {
  id: string;
  school: string;
  major: string;
  start_year: string;
  end_year: string;
  description: string;
  degree: string;
  display_order: number;
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  education_id: string;
  achievement: string;
  display_order: number;
  created_at: string;
}

interface Testimonial {
  id: string;
  name: string;
  title: string;
  message: string;
  avatar_url: string;
  rating: number;
  is_featured: boolean;
  display_order: number;
  status: string;
  created_at: string;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  featured_image: string;
  publish_date: string;
  status: string;
  view_count: number;
  tags: BlogTag[];
}

interface BlogTag {
  id: string;
  name: string;
  created_at: string;
}

interface Section {
  id: string;
  section_id: string;
  label: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon_name: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Setting {
  id: string;
  key: string;
  value: string;
  data_type: string;
  description: string;
  created_at: string;
  updated_at:string;
}

// Enhanced Typing Animation Component
const TypingAnimation = ({ lines, speed, className }: { lines: string[]; speed: number; className?: string }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= lines.length) return;

    const timeout = setTimeout(() => {
      if (currentCharIndex < lines[currentLineIndex].length) {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (!newLines[currentLineIndex]) {
            newLines[currentLineIndex] = '';
          }
          newLines[currentLineIndex] = lines[currentLineIndex].substring(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      } else {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentLineIndex, currentCharIndex, lines, speed]);

  return (
    <div className={className}>
      {displayedLines.map((line, index) => (
        <motion.div
          key={index}
          className="flex"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <span className="text-purple-400 mr-2 select-none font-mono">{index + 1}</span>
          <span className="font-mono">
            {typeof line === 'string'
              ? line.split('').map((char, i) => {
                let color = 'text-gray-300';
                if (char === "'" || char === '"') color = 'text-yellow-300';
                if (char === '{' || char === '}' || char === '(' || char === ')' || char === '[' || char === ']') color = 'text-white';
                if (
                  line.trim().startsWith('const') ||
                  line.trim().startsWith('function') ||
                  line.trim().startsWith('return') ||
                  line.trim().startsWith('export')
                ) {
                  color = 'text-purple-300';
                }
                if (line.includes('//')) {
                  const commentIndex = line.indexOf('//');
                  if (i >= commentIndex) color = 'text-green-400';
                }
                return (
                  <motion.span
                    key={i}
                    className={color}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (index * 0.1) + (i * 0.02) }}
                  >
                    {char}
                  </motion.span>
                );
              })
              : null}
          </span>
        </motion.div>
      ))}
      <motion.div
        className="flex"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <span className="text-purple-400 mr-2 select-none font-mono">{displayedLines.length + 1}</span>
        <span className="w-3 h-5 bg-purple-400 inline-block ml-1"></span>
      </motion.div>
    </div>
  );
};

const TypingTitle = React.memo(() => {
  const typedName = useTyping('Web Developer | Mobile Developer | FullStack', 120, 3000);
  return <>{typedName}</>;
});

TypingTitle.displayName = "TypingTitle";

// Enhanced Contact Bubble Component
const ContactBubble = ({ isOpen, onClose, socialLinks }: { isOpen: boolean; onClose: () => void; socialLinks: SocialLink[] }) => {
  const iconMap: { [key: string]: JSX.Element } = {
    'FaWhatsapp': <FaWhatsapp className="text-2xl text-green-400" />,
    'FiInstagram': <FiInstagram className="text-2xl text-pink-400" />,
    'FiLinkedin': <FiLinkedin className="text-2xl text-blue-400" />,
    'FaTelegram': <FaTelegram className="text-2xl text-blue-300" />,
    'FaLine': <FaLine className="text-2xl text-green-300" />,
    'FiMail': <FiMail className="text-2xl text-indigo-300" />,
    'FiGithub': <FiGithub className="text-2xl text-gray-300" />
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="relative bg-gray-900/90 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 max-w-md w-full mx-auto shadow-2xl"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <FiX className="text-xl" />
            </button>
            
            <motion.h3 
              className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 flex items-center justify-center gap-3"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
            >
              <FiMessageSquare className="text-purple-300" />
              Let&apos;s Connect
            </motion.h3>
            
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-4 flex flex-col items-center gap-3 group relative overflow-hidden"
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <motion.div
                    className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {iconMap[social.icon_name] || <FiMail className="text-2xl text-indigo-300" />}
                  </motion.div>
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                    {social.platform}
                  </span>
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                    initial={false}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Enhanced Navigation Component
const EnhancedNavigation = ({ sections, menuOpen, setMenuOpen }: { 
  sections: Section[]; 
  menuOpen: boolean; 
  setMenuOpen: (open: boolean) => void;
}) => {
  const handleNavClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <motion.nav
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-6 py-3 shadow-2xl">
        {sections.map((sec, index) => (
          <motion.a
            key={sec.id}
            href={`#${sec.section_id}`}
            onClick={handleNavClick(sec.section_id)}
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-300 relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {sec.label}
            <motion.span
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"
              initial={false}
            />
          </motion.a>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-3 shadow-2xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-6 h-6 flex flex-col justify-between">
            <motion.span
              className="w-full h-0.5 bg-white rounded"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            />
            <motion.span
              className="w-full h-0.5 bg-white rounded"
              animate={{ opacity: menuOpen ? 0 : 1 }}
            />
            <motion.span
              className="w-full h-0.5 bg-white rounded"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            />
          </div>
        </motion.button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="absolute top-16 left-0 backdrop-blur-xl bg-gray-900/95 border border-white/20 rounded-2xl p-4 shadow-2xl min-w-48"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
            >
              {sections.map((sec, index) => (
                <motion.a
                  key={sec.id}
                  href={`#${sec.section_id}`}
                  onClick={handleNavClick(sec.section_id)}
                  className="block px-4 py-3 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  {sec.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

// Enhanced Profile Section with 3D Effect
const EnhancedProfileSection = ({ settings, setShowContact }: { 
  settings: Setting[]; 
  setShowContact: (show: boolean) => void;
}) => {
  const getSettingValue = (key: string): string => {
    const setting = settings.find(s => s.key === key);
    return setting?.value || '';
  };

  return (
    <section id="profil" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-20">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          className="text-center lg:text-left space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FiStar className="text-yellow-400" />
            <span className="text-sm font-medium text-purple-200">Hello, I&apos;m</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-white block">
              Muhammad
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-white block">
              Fathiir Farhansyah
            </span>
          </motion.h1>

          <motion.div
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="font-mono bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              <TypingTitle />
            </span>
          </motion.div>

          <motion.p
            className="text-lg text-gray-400 leading-relaxed max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Pengembang yang penuh semangat menciptakan pengalaman digital dengan teknologi modern. 
            Mengkhususkan diri dalam membuat aplikasi web yang responsif dan berkinerja tinggi yang memberikan pengalaman pengguna yang luar biasa, 
            serta aplikasi mobile yang performa tinggi dan ramah pengguna. Saya selalu berusaha untuk belajar, explore, dan berinovasi dalam setiap proyek yang saya kerjakan.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl font-semibold text-white shadow-2xl flex items-center gap-3 group"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(192, 132, 252, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload className="text-xl" />
              <a href={getSettingValue('cv_url')} target="_blank" rel="noopener noreferrer" className="inline-block">
                Download CV
              </a>
            </motion.button>
            
            <motion.button
              onClick={() => setShowContact(true)}
              className="px-8 py-4 border-2 border-purple-400 text-purple-300 rounded-2xl font-semibold backdrop-blur-sm hover:bg-purple-500/10 transition-all duration-300 flex items-center gap-3 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail className="text-xl" />
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 3D ID Card */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <InteractiveIDCard />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-purple-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

// Interactive 3D ID Card Component
const InteractiveIDCard = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = ((centerY - y) / centerY) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      className="relative w-80 h-96 lg:w-96 lg:h-[480px] cursor-grab active:cursor-grabbing"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Main Card */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900" />
        
        {/* Holographic Effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45 scale-150" />
        </div>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Card Content */}
        <div className="relative z-10 w-full h-full p-8 flex flex-col justify-between">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FiCode className="text-white text-xl" />
              </motion.div>
              <h3 className="text-white text-sm font-semibold opacity-80">JUNIOR DEVELOPER</h3>
            </div>
            
            {/* Company Logo/Badge */}
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-3 border border-white/20"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <FiAward className="text-white text-sm" />
              </div>
            </motion.div>
          </div>

          {/* Profile Section */}
          <div className="flex-1 flex flex-col justify-center items-center space-y-6">
            {/* Profile Image with Frame */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-spin-slow -m-2" />
              {/* Image Container */}
              <div className="relative rounded-full overflow-hidden w-32 h-32 border-4 border-gray-900 bg-gray-800">
                <img
                  src="/fatirr.jpg"
                  alt="Muhammad Fathiir Farhansyah"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Name and Title */}
            <div className="text-center">
              <motion.h2
                className="text-2xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Muhammad Fathiir Farhansyah
              </motion.h2>
              <motion.p
                className="text-purple-300 font-mono text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Web/Mobile Developer
              </motion.p>
            </div>
          </div>

          {/* Footer */}
          <div className="space-y-4">
            {/* Status Bar */}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>STATUS</span>
              <motion.div
                className="flex items-center gap-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-green-400 font-semibold">AVAILABLE</span>
              </motion.div>
            </div>

            {/* Tech Stack */}
            <div className="flex justify-center gap-3">
              {['Golang', 'Laravel', 'React', 'Python'].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(147, 51, 234, 0.2)" }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-6 right-6 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-2xl"
          animate={{ y: [0, -10, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute bottom-6 left-6 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-2xl"
          animate={{ y: [0, 10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />

        {/* Scan Lines Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-20 pointer-events-none" />
      </div>

      {/* Reflection Shadow */}
      <motion.div
        className="absolute -bottom-4 left-4 right-4 h-8 bg-purple-500/20 blur-xl rounded-full"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

// Enhanced About Section
const EnhancedAboutSection = ({ projects }: { projects: Project[] }) => {
  const [projectsCount, setProjectsCount] = useState(0);
  const [experienceYears, setExperienceYears] = useState(0);

  useEffect(() => {
    // Gunakan projects.length dari API (bukan hardcoded)
    const targetProjects = projects.length; // Ini yang penting!
    const targetYears = 2.5;
    
    const duration = 2000;
    const startTime = Date.now();
    
    const animateCount = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      
      const currentProjects = Math.floor(easeOut(progress) * targetProjects);
      const currentYears = (easeOut(progress) * targetYears).toFixed(1);
      
      setProjectsCount(currentProjects);
      setExperienceYears(parseFloat(currentYears));
      
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    
    animateCount();
  }, [projects]); // projects sebagai dependency

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-6xl mx-auto">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Laptop Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <GlassCard className="p-8">
              <div className="bg-gray-800 rounded-xl p-6">
                <TypingAnimation
                  lines={[
                    "const developer = {",
                    `  name: 'Muhammad Fathiir Farhansyah',`,
                    `  projects: ${projects.length},`, // Tampilkan jumlah real
                    "  skills: ['React', 'Golang', 'Laravel'],",
                    "  focus: 'User experience & performance',",
                    "  philosophy: 'Clean, maintainable code',",
                    "};",
                    "",
                    "function buildFuture() {",
                    "  return innovate().then(grow);",
                    "}"
                  ]}
                  speed={40}
                  className="text-sm"
                />
              </div>
            </GlassCard>
          </motion.div>

          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <GlassCard className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-purple-300">My Journey</h3>
              <p className="text-gray-300 leading-relaxed">
                Dengan pengalaman lebih dari {experienceYears} dalam pengembangan web, saya mengkhususkan diri dalam membuat aplikasi modern dan responsif, serta sekarang mulai dalam pengembangan mobile dengan menggunakan React Native dan Golang, saya dapat membuat aplikasi yang memiliki performa dan UI yang modern,responsive serta interaktif. Saya telah menyelesaikan <span className="text-purple-300 font-semibold">{projects.length} projects </span> 
                 menggunakan teknologi terkini.
              </p>
            </GlassCard>

            <div className="grid grid-cols-2 gap-4">
              <GlassCard className="p-4 text-center">
                <FiAward className="text-3xl text-yellow-400 mx-auto mb-2" />
                <motion.div 
                  className="text-2xl font-bold text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 }}
                >
                  {experienceYears}+
                </motion.div>
                <div className="text-gray-400 text-sm">Years Experience</div>
              </GlassCard>
              
              <GlassCard className="p-4 text-center">
                <FiCode className="text-3xl text-purple-400 mx-auto mb-2" />
                <motion.div 
                  className="text-2xl font-bold text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  {projectsCount}+
                </motion.div>
                <div className="text-gray-400 text-sm">Projects Completed</div>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Projects Section
const EnhancedProjectsSection = ({ projects }: { projects: Project[] }) => {
  console.log('Projects data in EnhancedProjectsSection:', projects);
  
  return (
    <section id="projek" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-7xl mx-auto">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col hover:bg-white/10 transition-all duration-300 shadow-xl hover:shadow-2xl">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={project.image_url || '/default-project.jpg'}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Project Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm border ${
                      project.status === 'completed' 
                        ? 'bg-green-500/20 text-green-300 border-green-400/30'
                        : project.status === 'in_progress'
                        ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'
                        : project.status === 'published'
                        ? 'bg-blue-500/20 text-blue-300 border-blue-400/30'
                        : 'bg-purple-500/20 text-purple-300 border-purple-400/30'
                    }`}>
                      {project.status === 'published' ? '🚀 Published' : 
                       project.status === 'completed' ? '✅ Completed' :
                       project.status === 'in_progress' ? '🔄 In Progress' : '💡 Planned'}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {project.is_featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full backdrop-blur-sm border border-white/20">
                        ⭐ Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  
                  {/* Project Description */}
                  <p className="text-gray-300 text-sm mb-4 flex-1 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Project Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <motion.span
                          key={tag.id}
                          className="px-3 py-1.5 text-xs font-medium rounded-full border backdrop-blur-sm flex items-center gap-1"
                          style={{
                            backgroundColor: `${tag.color}15`,
                            color: tag.color,
                            borderColor: `${tag.color}30`
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: `${tag.color}25`,
                            boxShadow: `0 0 10px ${tag.color}40`
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: tag.color }}
                          />
                          {tag.name}
                        </motion.span>
                      ))}
                    </div>
                  )}

                  {/* Project Meta */}
                  <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <FiCalendar className="text-xs" />
                        <span>
                          {new Date(project.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      {project.display_order > 0 && (
                        <div className="flex items-center gap-1">
                          <FiStar className="text-xs" />
                          <span>#{project.display_order}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Tech Stack Icons based on tags */}
                    <div className="flex gap-1">
                      {project.tags?.slice(0, 3).map(tag => (
                        <div 
                          key={tag.id}
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: tag.color }}
                          title={tag.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-3 mt-auto pt-4 border-t border-white/10">
                    {project.demo_url && project.demo_url !== '#' && (
                      <motion.a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/25"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiExternalLink className="text-xs" />
                        Live Demo
                      </motion.a>
                    )}
                    
                    {project.code_url && project.code_url !== '#' && (
                      <motion.a
                        href={project.code_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 px-3 py-2 border rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm ${
                          project.demo_url && project.demo_url !== '#'
                            ? 'border-purple-400 text-purple-300 hover:bg-purple-500/10'
                            : 'border-purple-400 text-purple-300 hover:bg-purple-500/10'
                        }`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiCode className="text-xs" />
                        Source Code
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Hover Effect Border */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  whileHover={{ opacity: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <motion.div
              className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <FiCode className="text-4xl text-purple-300" />
            </motion.div>
            <h3 className="text-2xl font-semibold text-white mb-4">No Projects Yet</h3>
            <p className="text-gray-300 text-lg max-w-md mx-auto mb-8">
              Amazing projects are coming soon! Stay tuned for some exciting developments.
            </p>
            
            {/* Animated Dots */}
            <div className="flex justify-center gap-3 mt-6">
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-3 h-3 bg-purple-400 rounded-full"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: dot * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Enhanced Experiences Section
const EnhancedExperiencesSection = ({ experiences }: { experiences: Experience[] }) => {
  return (
    <section id="pengalaman" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-6xl mx-auto">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Experience
        </motion.h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-1/2 h-full w-1 bg-gradient-to-b from-purple-500/30 to-pink-500/30 transform -translate-x-1/2" />
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-start gap-8`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform -translate-x-1/2 z-10" />
                
                {/* Content */}
                <div className={`flex-1 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <GlassCard className="p-8 group hover:bg-white/15 transition-all duration-300">
                    {/* Date Badge */}
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FiStar className="text-yellow-400 text-sm" />
                      <span className="text-sm font-medium text-purple-200">
                        {exp.start_year} - {exp.current_job ? 'Present' : exp.end_year}
                      </span>
                    </motion.div>

                    {/* Job Title */}
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {exp.title}
                    </h3>

                    {/* Company & Location */}
                    <div className="flex items-center gap-4 text-gray-300 mb-4">
                      <span className="font-semibold text-purple-300">{exp.company}</span>
                      <span className="text-sm">• {exp.location}</span>
                    </div>

                    {/* Responsibilities */}
                    <div className="space-y-3 mb-6">
                      <h4 className="text-lg font-semibold text-white">Responsibilities:</h4>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((responsibility, idx) => (
                          <motion.li
                            key={responsibility.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + idx * 0.05 }}
                            className="flex items-start gap-3 text-gray-300"
                          >
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                            <span>{responsibility.description}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills */}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + idx * 0.05 }}
                            className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full text-sm text-purple-200"
                          >
                            {skill.skill_name}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </GlassCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Education Section
const EnhancedEducationSection = ({ education }: { education: Education[] }) => {
  return (
    <section id="studi" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-4xl mx-auto">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Education
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <GlassCard className="p-8 h-full group hover:bg-white/15 transition-all duration-300">
                {/* School Icon */}
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                  <FiAward className="text-2xl text-purple-300" />
                </div>

                {/* Degree & Major */}
                <h3 className="text-xl font-bold text-white text-center mb-2 group-hover:text-purple-300 transition-colors">
                  {edu.degree}
                </h3>
                <p className="text-lg text-purple-300 text-center font-semibold mb-4">
                  {edu.major}
                </p>

                {/* School Name */}
                <p className="text-gray-300 text-center mb-4 font-medium">
                  {edu.school}
                </p>

                {/* Duration */}
                <div className="flex justify-center mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-sm text-purple-200">
                    {edu.start_year} - {edu.end_year}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-center text-sm mb-6 leading-relaxed">
                  {edu.description}
                </p>

                {/* Achievements */}
                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white text-center">Achievements:</h4>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, idx) => (
                        <motion.li
                          key={achievement.id}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                          className="flex items-center gap-2 text-xs text-gray-300"
                        >
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0" />
                          <span>{achievement.achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Testimonials Section
const EnhancedTestimonialsSection = ({ testimonials }: { testimonials: Testimonial[] }) => {
  return (
    <section id="testimoni" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-6xl mx-auto">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Testimonials
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <GlassCard className="p-8 h-full group hover:bg-white/15 transition-all duration-300">
                {/* Quote Icon */}
                <div className="text-4xl text-purple-400/50 mb-4">&quot;</div>
                
                {/* Testimonial Text */}
                <p className="text-gray-300 italic mb-6 leading-relaxed">
                  &quot;{testimonial.message}&quot;
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                    >
                      <FiStar 
                        className={`text-sm ${
                          i < testimonial.rating 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-600'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Client Info */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-purple-300">{testimonial.title}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {testimonials.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center">
              <FiMessageSquare className="text-3xl text-purple-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Testimonials Yet</h3>
            <p className="text-gray-400">Be the first to share your experience!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Enhanced Blog Section
const EnhancedBlogSection = ({ blogPosts }: { blogPosts: BlogPost[] }) => {
  // Sort blog posts by publish_date (newest first) and take 5 latest
  const latestBlogPosts = blogPosts
    .sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime())
    .slice(0, 5);

  return (
    <section id="blog" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-6xl mx-auto">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Latest Blog
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogPosts.map((post, index) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="block">
              <motion.article
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer h-full"
              >
                {/* Glass Card Replacement */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col hover:bg-white/10 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  {/* Gradient Header sebagai pengganti gambar */}
                  <div className="relative h-40 overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/40 via-pink-500/30 to-indigo-500/40"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.15]">
                      <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45 scale-150" />
                    </div>
                    
                    {/* Icon dan Title di Header */}
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <div className="text-center w-full">
                        <motion.div
                          className="w-14 h-14 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <FiMessageSquare className="text-2xl text-white" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-white line-clamp-2 leading-tight px-2">
                          {post.title}
                        </h3>
                      </div>
                    </div>

                    {/* Date Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-2 bg-black/50 backdrop-blur-sm rounded-full text-sm text-white border border-white/20 font-medium">
                        {new Date(post.publish_date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    {/* New Badge untuk artikel terbaru (3 hari terakhir) */}
                    {isNewPost(post.publish_date) && (
                      <div className="absolute top-4 right-4">
                        <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-xs text-white font-bold animate-pulse">
                          NEW
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map(tag => (
                          <motion.span
                            key={tag.id}
                            className="px-3 py-1.5 text-sm bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-full text-purple-100 border border-purple-400/40 backdrop-blur-sm font-medium"
                            whileHover={{ scale: 1.05 }}
                          >
                            #{tag.name}
                          </motion.span>
                        ))}
                      </div>
                    )}
                    
                    {/* Excerpt */}
                    <motion.p 
                      className="text-gray-300 text-base mb-6 flex-1 line-clamp-3 leading-relaxed"
                      whileHover={{ color: "#E9D5FF" }}
                      transition={{ duration: 0.3 }}
                    >
                      {post.excerpt || "Discover more about this fascinating topic in our latest blog post..."}
                    </motion.p>

                    {/* Stats */}
                    <div className="flex items-center gap-6 mb-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <FiEye className="text-base" />
                        <span>{post.view_count || 0} views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiClock className="text-base" />
                        <span>{Math.ceil((post.content?.length || 0) / 200)} min read</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                          <FiUser className="text-sm text-white" />
                        </div>
                        <span className="text-sm text-gray-300 font-medium">Admin</span>
                      </div>
                      
                      <motion.div
                        className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors text-base font-semibold"
                        whileHover={{ x: 5 }}
                      >
                        Read More
                        <FiExternalLink className="text-sm" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    whileHover={{ opacity: 1 }}
                  />
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        {blogPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <div className="mb-6 text-gray-400">
              <p className="text-lg">Showing {latestBlogPosts.length} latest articles</p>
              {blogPosts.length > 5 && (
                <p className="text-sm mt-1">
                  {blogPosts.length - 5} more articles available
                </p>
              )}
            </div>
            
            <Link href="/blog">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 text-purple-100 rounded-2xl font-semibold hover:from-purple-500/40 hover:to-pink-500/40 transition-all duration-300 flex items-center gap-3 mx-auto backdrop-blur-lg shadow-lg hover:shadow-xl text-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View All {blogPosts.length} Articles
                <FiExternalLink className="text-xl" />
              </motion.button>
            </Link>
          </motion.div>
        )}

        {/* Empty State */}
        {blogPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <motion.div
              className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <FiMessageSquare className="text-4xl text-purple-200" />
            </motion.div>
            <h3 className="text-2xl font-semibold text-white mb-4">No Articles Yet</h3>
            <p className="text-gray-300 text-lg max-w-md mx-auto mb-8">
              Stay tuned! Amazing blog posts are coming soon to inspire and educate.
            </p>
            
            {/* Animated Dots */}
            <div className="flex justify-center gap-3 mt-6">
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-3 h-3 bg-purple-400 rounded-full"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: dot * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Helper function to check if post is new (published within last 3 days)
function isNewPost(publishDate: string): boolean {
  const postDate = new Date(publishDate);
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  return postDate > threeDaysAgo;
}

// Enhanced Skills Section
const EnhancedSkillsSection = ({ skills, certificates }: { skills: Skill[]; certificates: Certificate[] }) => {
  // Handle undefined or null data
  const safeSkills = skills || [];
  const safeCertificates = certificates || [];

  // Filter skills dengan handling untuk null/undefined
  const featuredSkills = safeSkills.filter(skill => {
    // Handle berbagai kemungkinan tipe data
    if (skill.is_featured === true || skill.is_featured === 'true') return true;
    if (skill.is_featured === false || skill.is_featured === 'false' || skill.is_featured === null) return false;
    return false; // default untuk nilai yang tidak dikenali
  });

  const skillCollection = safeSkills.filter(skill => {
    // Handle berbagai kemungkinan tipe data
    if (skill.is_featured === false || skill.is_featured === 'false') return true;
    if (skill.is_featured === true || skill.is_featured === 'true' || skill.is_featured === null) return false;
    return true; // default anggap sebagai non-featured
  });

  // Debug: console.log untuk memastikan filter bekerja
  console.log('All skills:', safeSkills);
  console.log('Featured skills:', featuredSkills);
  console.log('Skill collection:', skillCollection);
  console.log('Certificates:', safeCertificates);

  // Debug detail untuk setiap skill
  safeSkills.forEach((skill, index) => {
    console.log(`Skill ${index}:`, {
      name: skill.name,
      is_featured: skill.is_featured,
      type: typeof skill.is_featured,
      value: skill.is_featured
    });
  });

  return (
    <section id="skill" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-7xl mx-auto">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Skills & Certifications
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Featured Skills dengan Progress Bars */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold mb-8 text-purple-300 flex items-center gap-3">
                <FiBarChart2 />
                Core Competencies
              </h3>
              
              {featuredSkills.length > 0 ? (
                <div className="space-y-6">
                  {featuredSkills.map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                            {skill.icon_url ? (
                              <img 
                                src={skill.icon_url} 
                                alt={skill.name}
                                className="w-6 h-6 object-contain"
                              />
                            ) : (
                              <FiCode className="text-purple-300 text-lg" />
                            )}
                          </div>
                          <span className="font-medium text-white group-hover:text-purple-300 transition-colors">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-purple-300 font-mono text-sm bg-purple-500/10 px-2 py-1 rounded">
                          {skill.value}%
                        </span>
                      </div>
                      
                      <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.value}%` }}
                          transition={{ duration: 1.2, delay: index * 0.1, type: "spring" }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <FiBarChart2 className="text-4xl mx-auto mb-4 opacity-50" />
                  <p>No featured skills available</p>
                  <p className="text-sm mt-2">
                    {safeSkills.length === 0 ? 'No skills data found' : 'Skills with is_featured: true will appear here'}
                  </p>
                  <p className="text-xs mt-1">Total skills: {safeSkills.length}, Featured: {featuredSkills.length}</p>
                </div>
              )}
            </GlassCard>
          </motion.div>

          {/* Certifications - tetap sama */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold mb-8 text-purple-300 flex items-center gap-3">
                <FiAward />
                Certifications
              </h3>
              
              {safeCertificates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {safeCertificates.map((cert, index) => (
                    <motion.a
                      key={cert.id}
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.03 }}
                      className="block cursor-pointer group"
                    >
                      <GlassCard className="p-6 h-full transition-all duration-300 hover:bg-white/15 border border-white/10 hover:border-purple-400/30">
                        {/* Certificate Image Container */}
                        <div className="relative mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                          {cert.image_url ? (
                            <div className="aspect-video relative">
                              <img
                                src={cert.image_url}
                                alt={cert.name}
                                className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          ) : (
                            <div className="aspect-video flex items-center justify-center">
                              <FiAward className="text-4xl text-purple-300 opacity-60" />
                            </div>
                          )}
                          
                          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <FiExternalLink className="text-white text-xs" />
                          </div>
                        </div>

                        <div className="text-center">
                          <h4 className="font-bold text-white mb-2 text-sm leading-tight line-clamp-2 group-hover:text-purple-300 transition-colors">
                            {cert.name}
                          </h4>
                          
                          <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                            {cert.issuer}
                          </p>
                          
                          <div className="flex items-center justify-center gap-1 text-purple-300 text-xs">
                            <FiCalendar className="text-xs" />
                            <span>{new Date(cert.issue_date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short',
                              day: 'numeric'
                            })}</span>
                          </div>
                        </div>

                        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-purple-500/20 transition-all duration-300" />
                      </GlassCard>
                    </motion.a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <FiAward className="text-4xl mx-auto mb-4 opacity-50" />
                  <p>No certifications available</p>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </div>

        {/* Skill Collection - Non-featured skills */}
        {skillCollection.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold mb-8 text-purple-300 flex items-center gap-3">
                <FiCode />
                Technology Stack
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {skillCollection.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="group"
                  >
                    <GlassCard className="p-4 text-center transition-all duration-300 hover:bg-white/15 border border-white/10 hover:border-purple-400/30">
                      <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                        {skill.icon_url ? (
                          <img 
                            src={skill.icon_url} 
                            alt={skill.name}
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <FiCode className="text-purple-300 text-lg" />
                        )}
                      </div>
                      
                      <span className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
                        {skill.name}
                      </span>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ) : (
          safeSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="p-8">
                <h3 className="text-2xl font-bold mb-8 text-purple-300 flex items-center gap-3">
                  <FiCode />
                  Technology Stack
                </h3>
                <div className="text-center py-8 text-gray-400">
                  <FiCode className="text-4xl mx-auto mb-4 opacity-50" />
                  <p>No additional skills available</p>
                  <p className="text-sm mt-2">Skills with is_featured: false will appear here</p>
                  <p className="text-xs mt-1">Total skills: {safeSkills.length}, Featured: {featuredSkills.length}, Non-featured: {skillCollection.length}</p>
                </div>
              </GlassCard>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
};

// Enhanced Contact Section
const EnhancedContactSection = ({ settings }: { settings: Setting[] }) => {
  const getSettingValue = (key: string): string => {
    const setting = settings.find(s => s.key === key);
    return setting?.value || '';
  };

  return (
    <section id="kontak" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-4xl mx-auto">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-purple-300">Send Message</h3>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 resize-none"
                    placeholder="Your message here..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </GlassCard>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <GlassCard className="p-6">
              <h3 className="text-2xl font-bold mb-6 text-purple-300">Contact Info</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                    <FiMail className="text-xl text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white font-medium">{getSettingValue('contact_email') || 'your@email.com'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                    <FiMessageSquare className="text-xl text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="text-white font-medium">{getSettingValue('phone_number') || '+62 812-3456-7890'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                    <FiStar className="text-xl text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white font-medium">{getSettingValue('location') || 'Palembang, Indonesia'}</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* CV Download */}
            <GlassCard className="p-6 text-center">
              <h4 className="text-lg font-semibold text-white mb-3">Download My CV</h4>
              <motion.a
                href={getSettingValue('cv_url')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-purple-400 text-purple-300 rounded-xl font-semibold hover:bg-purple-500/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload className="text-xl" />
                Download CV
              </motion.a>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  
  // State untuk data dari API
  const [sections, setSections] = useState<Section[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fungsi untuk mengambil semua data dari API
  const fetchAllData = async () => {
    try {
      setLoading(true);
      setFetchError(null);

      const res = await fetch('/api/portofolio');
      if (!res.ok) throw new Error(`Failed to load data: ${res.status}`);

      const payload = await res.json();
      
      console.log('Full API response:', payload);
      console.log('Projects from API:', payload.projects);
      console.log('Source:', payload.source);

      setSections(payload.sections || []);
      setProjects(Array.isArray(payload.projects) ? payload.projects : []);
      setExperiences(payload.experiences || []);
      setSkills(payload.skills || []);
      setCertificates(payload.certificates || []);
      setEducation(payload.education || []);
      setTestimonials(payload.testimonials || []);
      setBlogPosts(payload.blogPosts || []);
      setSocialLinks(payload.socialLinks || []);
      setSettings(payload.settings || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setFetchError((error as Error)?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <AnimatedBackground />
        <FloatingParticles />
        <div className="text-center text-white z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading Portfolio...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      {/* Background Elements */}
      <AnimatedBackground />
      <FloatingParticles />
      
      {/* Enhanced Navigation */}
      <EnhancedNavigation 
        sections={sections} 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
      />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Profile Section */}
        <EnhancedProfileSection settings={settings} setShowContact={setShowContact} />

        {/* About Section */}
        <EnhancedAboutSection projects={projects} />

        {/* Experiences Section */}
        <EnhancedExperiencesSection experiences={experiences} />

        {/* Projects Section */}
        <EnhancedProjectsSection projects={projects} />

        {/* Skills Section */}
        <EnhancedSkillsSection skills={skills} certificates={certificates} />

        {/* Education Section */}
        <EnhancedEducationSection education={education} />

        {/* Testimonials Section */}
        <EnhancedTestimonialsSection testimonials={testimonials} />

        {/* Blog Section */}
        <EnhancedBlogSection blogPosts={blogPosts} />

        {/* Contact Section */}
        <EnhancedContactSection settings={settings} />
      </main>

      {/* Enhanced Contact Bubble */}
      <ContactBubble isOpen={showContact} onClose={() => setShowContact(false)} socialLinks={socialLinks} />

      {/* Floating Contact Button */}
      <motion.button
        onClick={() => setShowContact(true)}
        className="fixed bottom-8 right-8 z-40 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl flex items-center gap-3 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FiMessageSquare className="text-xl" />
        <span className="font-semibold">Contact</span>
      </motion.button>

      {/* Error Banner */}
      {fetchError && (
        <motion.div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-yellow-500/90 text-black px-6 py-3 rounded-2xl shadow-2xl max-w-md text-sm font-medium"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ⚠️ Using fallback data: {fetchError}
        </motion.div>
      )}
    </div>
  );
}