'use client';
import { useState, useEffect, JSX, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
  FiBarChart2, FiAward, FiCode, FiDownload, FiMail, FiX,
  FiMessageSquare, FiLinkedin, FiInstagram, FiGithub, FiStar,
  FiExternalLink, FiCalendar, FiEye, FiClock, FiUser,
  FiMonitor, FiSmartphone, FiServer, FiDatabase, FiGlobe,
  FiArrowRight, FiZap, FiLayers, FiTerminal, FiCpu,
  FiChevronDown, FiMapPin, FiPhone, FiCheckCircle
} from 'react-icons/fi';
import { FaWhatsapp, FaTelegram, FaLine, FaReact, FaGolang, FaLaravel, FaFlutter } from 'react-icons/fa6';
import { SiGo, SiLaravel, SiFlutter, SiReact, SiMysql, SiDocker } from 'react-icons/si';
import React from 'react';
import Link from 'next/link';

// ============================================================
// TYPES
// ============================================================
interface Project { id:string; title:string; description:string; image_url:string; demo_url:string; code_url:string; display_order:number; is_featured:boolean; status:string; created_at:string; updated_at:string; tags:ProjectTag[]; }
interface ProjectTag { id:string; name:string; color:string; created_at:string; }
interface Experience { id:string; title:string; company:string; location:string; start_year:string; end_year:string; current_job:boolean; display_order:number; responsibilities:Responsibility[]; skills:ExperienceSkill[]; }
interface Responsibility { id:string; experience_id:string; description:string; display_order:number; created_at:string; }
interface ExperienceSkill { experience_id:string; skill_name:string; }
interface Skill { id:string; name:string; value:number; icon_url:string; category:string; display_order:number; is_featured:boolean|string|null; created_at:string; updated_at:string; }
interface Certificate { id:string; name:string; image_url:string; issue_date:string; issuer:string; credential_url:string; display_order:number; created_at:string; }
interface Education { id:string; school:string; major:string; start_year:string; end_year:string; description:string; degree:string; display_order:number; achievements:Achievement[]; }
interface Achievement { id:string; education_id:string; achievement:string; display_order:number; created_at:string; }
interface Testimonial { id:string; name:string; title:string; message:string; avatar_url:string; rating:number; is_featured:boolean; display_order:number; status:string; created_at:string; }
interface BlogPost { id:string; title:string; content:string; excerpt:string; slug:string; featured_image:string; publish_date:string; status:string; view_count:number; tags:BlogTag[]; }
interface BlogTag { id:string; name:string; created_at:string; }
interface Section { id:string; section_id:string; label:string; display_order:number; is_active:boolean; created_at:string; updated_at:string; }
interface SocialLink { id:string; platform:string; url:string; icon_name:string; display_order:number; is_active:boolean; created_at:string; updated_at:string; }
interface Setting { id:string; key:string; value:string; data_type:string; description:string; created_at:string; updated_at:string; }

// ============================================================
// GLOBAL STYLES
// ============================================================
const GlobalStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Fira+Code:wght@300;400;500;600&display=swap');

    :root {
      --font-display: 'Syne', sans-serif;
      --font-mono: 'Fira Code', monospace;

      --bg:        #03050d;
      --bg-card:   #070b18;
      --bg-card2:  #09101f;
      --bg-glass:  rgba(9,16,31,0.7);

      --border:        rgba(255,255,255,0.05);
      --border-glow:   rgba(0,245,212,0.25);

      --cyan:    #00F5D4;
      --blue:    #3B82F6;
      --violet:  #8B5CF6;
      --green:   #10B981;
      --amber:   #F59E0B;
      --pink:    #EC4899;

      --text-primary:   #F0F6FF;
      --text-secondary: #8892A4;
      --text-muted:     #3D4A5C;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: var(--font-display);
      background: var(--bg);
      color: var(--text-primary);
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--cyan); border-radius: 2px; opacity: 0.5; }

    /* Utilities */
    .mono { font-family: var(--font-mono); }
    .section { padding: 120px 0; }
    .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }

    /* Glass card */
    .glass {
      background: var(--bg-glass);
      border: 1px solid var(--border);
      border-radius: 16px;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .glass:hover {
      border-color: rgba(0,245,212,0.15);
      box-shadow: 0 0 40px rgba(0,245,212,0.04), inset 0 1px 0 rgba(255,255,255,0.04);
    }

    /* Section label */
    .section-label {
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.15em;
      color: var(--cyan);
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
    }
    .section-label::before { content: '//'; opacity: 0.4; }
    .section-label::after { content: ''; flex: 0 0 32px; height: 1px; background: var(--cyan); opacity: 0.4; }

    /* Gradient text */
    .grad { background: linear-gradient(135deg, var(--cyan) 0%, var(--blue) 50%, var(--violet) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .grad-warm { background: linear-gradient(135deg, var(--amber) 0%, var(--pink) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

    /* Tag */
    .tag {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 9px; border-radius: 4px;
      font-size: 10px; font-weight: 500; letter-spacing: 0.06em;
      font-family: var(--font-mono);
    }

    /* Buttons */
    .btn-cta {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 26px;
      background: var(--cyan);
      color: #03050d;
      font-family: var(--font-display);
      font-size: 14px; font-weight: 700;
      border: none; border-radius: 10px;
      cursor: pointer; text-decoration: none;
      transition: box-shadow 0.25s, transform 0.15s;
      letter-spacing: 0.02em;
    }
    .btn-cta:hover { box-shadow: 0 0 24px rgba(0,245,212,0.4); transform: translateY(-2px); }

    .btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 24px;
      background: transparent;
      color: var(--text-primary);
      font-family: var(--font-display);
      font-size: 14px; font-weight: 600;
      border: 1px solid var(--border-glow);
      border-radius: 10px;
      cursor: pointer; text-decoration: none;
      transition: background 0.25s, box-shadow 0.25s, transform 0.15s;
    }
    .btn-outline:hover { background: rgba(0,245,212,0.06); box-shadow: 0 0 16px rgba(0,245,212,0.12); transform: translateY(-2px); }

    /* Badge */
    .badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 14px; border-radius: 30px;
      font-family: var(--font-mono); font-size: 11px;
      background: rgba(0,245,212,0.08);
      border: 1px solid rgba(0,245,212,0.2);
      color: var(--cyan);
    }

    /* Status dot animated */
    .dot-live {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--green);
      box-shadow: 0 0 8px var(--green);
      animation: live-pulse 2s ease-in-out infinite;
    }
    @keyframes live-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }

    /* Skill bar */
    .bar-track { background: rgba(255,255,255,0.04); border-radius: 3px; height: 4px; overflow: hidden; }
    .bar-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--cyan), var(--blue)); }

    /* Timeline */
    .tl-line { width: 1px; background: linear-gradient(to bottom, var(--cyan), transparent); position: absolute; top: 0; left: 18px; height: 100%; opacity: 0.2; }
    .tl-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--cyan); border: 2px solid var(--bg); position: absolute; left: 14px; top: 28px; box-shadow: 0 0 10px var(--cyan); }

    /* Platform chips */
    .chip-web    { background: rgba(59,130,246,0.12); color: #60A5FA; border: 1px solid rgba(59,130,246,0.25); }
    .chip-mobile { background: rgba(0,245,212,0.10); color: var(--cyan); border: 1px solid rgba(0,245,212,0.2); }
    .chip-back   { background: rgba(16,185,129,0.10); color: #34D399; border: 1px solid rgba(16,185,129,0.2); }
    .chip-full   { background: rgba(139,92,246,0.10); color: #A78BFA; border: 1px solid rgba(139,92,246,0.2); }

    /* Code block */
    .code-block {
      background: #050912;
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 22px;
      font-family: var(--font-mono);
      font-size: 13px;
      line-height: 1.75;
      position: relative;
      overflow: hidden;
    }
    .code-block::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, var(--cyan), transparent);
      opacity: 0.4;
    }

    /* Hover lift */
    .lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
    .lift:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(0,0,0,0.4); }

    /* Glow divider */
    .glow-hr { border: none; height: 1px; background: linear-gradient(90deg, transparent, rgba(0,245,212,0.2), transparent); margin: 32px 0; }

    /* Nav link */
    .nav-link {
      color: var(--text-secondary); text-decoration: none;
      font-size: 13px; font-weight: 500; letter-spacing: 0.03em;
      padding: 6px 13px; border-radius: 8px;
      transition: color 0.2s, background 0.2s;
    }
    .nav-link:hover { color: var(--text-primary); background: rgba(255,255,255,0.04); }

    /* Grid background helper */
    .grid-bg {
      background-image:
        linear-gradient(rgba(0,245,212,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,245,212,0.025) 1px, transparent 1px);
      background-size: 48px 48px;
    }

    /* Responsive helpers */
    @media(max-width: 768px) {
      .hide-sm { display: none !important; }
      .two-col { grid-template-columns: 1fr !important; }
      .section { padding: 72px 0; }
    }
    @media(max-width: 480px) {
      .container { padding: 0 16px; }
    }

    /* Cursor blink */
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    .cursor::after { content: '▋'; animation: blink 0.9s step-end infinite; color: var(--cyan); }

    /* Scanline effect */
    @keyframes scan { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }

    /* Float animation */
    @keyframes float-a { 0%,100%{transform:translateY(0px) rotate(0deg)} 50%{transform:translateY(-20px) rotate(3deg)} }
    @keyframes float-b { 0%,100%{transform:translateY(0px) rotate(0deg)} 50%{transform:translateY(16px) rotate(-2deg)} }
    @keyframes float-c { 0%,100%{transform:translateY(0px)} 33%{transform:translateY(-12px)} 66%{transform:translateY(8px)} }

    /* Shimmer */
    @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  `}</style>
);

// ============================================================
// ANIMATED BACKGROUND — Circuit / Code Rain
// ============================================================
const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    // Matrix-like code rain columns
    const cols = Math.floor(window.innerWidth / 22);
    const drops: number[] = Array(cols).fill(1);
    const chars = '01アイウエオカキクケコGOLANGREACTFLUTTERLARAVELMYSQL{}[]()<>/=+*&^%$#@!;:?~'.split('');

    // Floating orbs
    const orbs = [
      { x: 0.15, y: 0.2, r: 260, color: 'rgba(0,245,212,', speed: 0.00008 },
      { x: 0.85, y: 0.5, r: 200, color: 'rgba(59,130,246,', speed: 0.00012 },
      { x: 0.5,  y: 0.8, r: 180, color: 'rgba(139,92,246,', speed: 0.0001 },
    ];

    let t = 0;
    const draw = () => {
      t++;
      ctx.fillStyle = 'rgba(3,5,13,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animated orbs
      orbs.forEach((o, i) => {
        const px = (o.x + Math.sin(t * o.speed * (i + 1)) * 0.08) * canvas.width;
        const py = (o.y + Math.cos(t * o.speed * (i + 1)) * 0.06) * canvas.height;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, o.r);
        grad.addColorStop(0, o.color + '0.07)');
        grad.addColorStop(1, o.color + '0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Code rain
      ctx.font = '12px "Fira Code", monospace';
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 22;
        // Head glow
        ctx.fillStyle = 'rgba(0,245,212,0.9)';
        ctx.fillText(char, x, y * 16);
        // Trail
        ctx.fillStyle = `rgba(0,245,212,${Math.random() * 0.12})`;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, (y - 1) * 16);

        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    // Clear first
    ctx.fillStyle = '#03050d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw();

    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.55 }} />
      {/* Grid overlay */}
      <div className="grid-bg" style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.4 }} />
      {/* Vignette */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(3,5,13,0.85) 100%)', pointerEvents: 'none' }} />
    </>
  );
};

// ============================================================
// CURSOR GLOW (desktop only)
// ============================================================
const CursorGlow = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 80, damping: 20 });
  const sy = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed', zIndex: 0, pointerEvents: 'none',
        width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,245,212,0.05) 0%, transparent 70%)',
        transform: 'translate(-50%,-50%)',
        left: sx, top: sy,
      }}
    />
  );
};

// ============================================================
// NAVIGATION
// ============================================================
const Navigation = ({ sections, menuOpen, setMenuOpen }: { sections:Section[]; menuOpen:boolean; setMenuOpen:(v:boolean)=>void }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.4s ease',
        borderBottom: scrolled ? '1px solid rgba(0,245,212,0.08)' : '1px solid transparent',
        background: scrolled ? 'rgba(3,5,13,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        {/* Logo */}
        <a href="#profil" onClick={scrollTo('profil')} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34,
            background: 'linear-gradient(135deg, var(--cyan), var(--blue))',
            borderRadius: 9,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 14px rgba(0,245,212,0.3)'
          }}>
            <FiTerminal style={{ color: '#03050d', fontSize: 15, fontWeight: 700 }} />
          </div>
          <span className="mono" style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
            MFF<span style={{ color: 'var(--cyan)' }}>.dev</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hide-sm" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {sections.map(sec => (
            <a key={sec.id} href={`#${sec.section_id}`} onClick={scrollTo(sec.section_id)} className="nav-link mono" style={{ fontSize: 12 }}>
              {sec.label}
            </a>
          ))}
        </nav>

        <a href="#kontak" onClick={scrollTo('kontak')} className="btn-cta" style={{ padding: '9px 20px', fontSize: 12 }}>
          <FiZap size={13} /> Hire Me
        </a>
      </div>
    </motion.header>
  );
};

// ============================================================
// FLOATING TECH ICONS DECORATION
// ============================================================
const TechOrbit = () => {
  const icons = [
    { Icon: FaReact, color: '#61DAFB', label: 'React', style: { top: '12%', right: '5%', animation: 'float-a 7s ease-in-out infinite' } },
    { Icon: FaGolang, color: '#00ADD8', label: 'Go', style: { top: '45%', right: '2%', animation: 'float-b 6s ease-in-out infinite 0.5s' } },
    { Icon: FaFlutter, color: '#02569B', label: 'Flutter', style: { top: '70%', right: '8%', animation: 'float-a 8s ease-in-out infinite 1s' } },
    { Icon: FaLaravel, color: '#FF2D20', label: 'Laravel', style: { top: '28%', right: '12%', animation: 'float-c 5s ease-in-out infinite 0.8s' } },
    { Icon: SiMysql, color: '#4479A1', label: 'MySQL', style: { top: '58%', right: '18%', animation: 'float-b 9s ease-in-out infinite 1.5s' } },
    { Icon: SiDocker, color: '#2496ED', label: 'Docker', style: { top: '82%', right: '4%', animation: 'float-a 6.5s ease-in-out infinite 2s' } },
  ];

  return (
    <div className="hide-sm" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {icons.map(({ Icon, color, label, style }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + i * 0.15, type: 'spring' }}
          style={{
            position: 'absolute', ...style,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          }}
        >
          <div style={{
            width: 46, height: 46,
            background: 'rgba(7,11,24,0.8)',
            border: `1px solid ${color}22`,
            borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            boxShadow: `0 0 20px ${color}15`,
          }}>
            <Icon style={{ fontSize: 22, color }} />
          </div>
          <span className="mono" style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{label}</span>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================
// HERO SECTION
// ============================================================
const HeroSection = ({ settings, setShowContact }: { settings: Setting[]; setShowContact: (v: boolean) => void }) => {
  const getSetting = (k: string) => settings.find(s => s.key === k)?.value || '';
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = ['Fullstack Developer', 'Web Engineer', 'Mobile Developer', 'API Architect', 'UI/UX Builder'];

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && typed.length < current.length) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 80);
    } else if (!isDeleting && typed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 40);
    } else if (isDeleting && typed.length === 0) {
      setIsDeleting(false);
      setRoleIdx(p => (p + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [typed, isDeleting, roleIdx]);

  return (
    <section id="profil" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <TechOrbit />

      <div className="container" style={{ paddingTop: 100, paddingBottom: 80, position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 720 }}>

          {/* Status */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="badge" style={{ marginBottom: 32 }}>
              <div className="dot-live" />
              Open to opportunities
            </div>
          </motion.div>

          {/* Name */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="section-label">Fullstack Developer · Indonesia</div>
            <h1 style={{
              fontSize: 'clamp(48px, 7vw, 86px)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              marginBottom: 18,
            }}>
              Muhammad<br />
              <span className="grad">Fathiir</span><br />
              <span style={{ opacity: 0.7, fontWeight: 600, fontSize: '0.75em' }}>Farhansyah</span>
            </h1>
          </motion.div>

          {/* Typewriter */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="mono" style={{ color: 'var(--cyan)', fontSize: 13, opacity: 0.5 }}>const role =</span>
              <span className="mono" style={{ color: '#F59E0B', fontSize: 15 }}>&quot;</span>
              <span className="mono" style={{ fontSize: 16, color: 'var(--text-primary)', fontWeight: 500 }}>
                {typed}
              </span>
              <span style={{ display: 'inline-block', width: 2, height: 20, background: 'var(--cyan)', animation: 'blink 0.9s step-end infinite', borderRadius: 1 }} />
              <span className="mono" style={{ color: '#F59E0B', fontSize: 15 }}>&quot;</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, maxWidth: 580, marginBottom: 36 }}>
            Building production-grade web & mobile applications end-to-end — from e-commerce platforms with payment gateways
            to cross-platform mobile apps. Specialized in{' '}
            <span style={{ color: '#00ADD8', fontWeight: 600 }}>Golang</span>,{' '}
            <span style={{ color: '#61DAFB', fontWeight: 600 }}>React.js</span>,{' '}
            <span style={{ color: '#FF2D20', fontWeight: 600 }}>Laravel</span>, and{' '}
            <span style={{ color: '#02569B', fontWeight: 600 }}>Flutter</span>.
          </motion.p>

          {/* Platform chips */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
            {[
              { label: 'Web Dev', cls: 'chip-web', icon: <FiMonitor size={12} /> },
              { label: 'Mobile Apps', cls: 'chip-mobile', icon: <FiSmartphone size={12} /> },
              { label: 'REST APIs', cls: 'chip-back', icon: <FiServer size={12} /> },
              { label: 'Fullstack', cls: 'chip-full', icon: <FiLayers size={12} /> },
            ].map(p => (
              <span key={p.label} className={`tag ${p.cls}`}>
                {p.icon} {p.label}
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <a href={getSetting('cv_url') || '#'} target="_blank" rel="noopener noreferrer" className="btn-cta">
              <FiDownload size={15} /> Download CV
            </a>
            <button onClick={() => setShowContact(true)} className="btn-outline">
              <FiMessageSquare size={15} /> Let&apos;s Talk
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
            style={{ display: 'flex', gap: 0, marginTop: 56, paddingTop: 36, borderTop: '1px solid var(--border)' }}>
            {[
              { num: '2.5+', label: 'Yrs Exp', color: 'var(--cyan)' },
              { num: '10+', label: 'Projects', color: 'var(--blue)' },
              { num: '4', label: 'Stacks', color: 'var(--violet)' },
              { num: '∞', label: 'Coffee ☕', color: 'var(--amber)' },
            ].map((s, i) => (
              <div key={s.label} style={{ flex: 1, paddingRight: 24, borderRight: i < 3 ? '1px solid var(--border)' : 'none', paddingLeft: i > 0 ? 24 : 0 }}>
                <div className="mono" style={{ fontSize: 28, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        >
          <span className="mono" style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.15em' }}>SCROLL</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <FiChevronDown style={{ color: 'var(--cyan)', fontSize: 16, opacity: 0.5 }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================================
// ABOUT SECTION
// ============================================================
const AboutSection = ({ projects }: { projects: Project[] }) => {
  const codeLines = [
    { ln: '01', tokens: [{ t: 'const', c: '#8B5CF6' }, { t: ' developer', c: '#E2E8F0' }, { t: ' = {', c: '#8892A4' }] },
    { ln: '02', tokens: [{ t: '  name:', c: '#00F5D4' }, { t: ' "Muhammad Fathiir",', c: '#F59E0B' }] },
    { ln: '03', tokens: [{ t: '  location:', c: '#00F5D4' }, { t: ' "Palembang, ID",', c: '#F59E0B' }] },
    { ln: '04', tokens: [{ t: '  web:', c: '#00F5D4' }, { t: ' [', c: '#8892A4' }, { t: '"React"', c: '#61DAFB' }, { t: ', ', c: '#8892A4' }, { t: '"Next.js"', c: '#61DAFB' }, { t: '],', c: '#8892A4' }] },
    { ln: '05', tokens: [{ t: '  mobile:', c: '#00F5D4' }, { t: ' [', c: '#8892A4' }, { t: '"Flutter"', c: '#02569B' }, { t: '],', c: '#8892A4' }] },
    { ln: '06', tokens: [{ t: '  backend:', c: '#00F5D4' }, { t: ' [', c: '#8892A4' }, { t: '"Golang"', c: '#00ADD8' }, { t: ', ', c: '#8892A4' }, { t: '"Laravel"', c: '#FF2D20' }, { t: '],', c: '#8892A4' }] },
    { ln: '07', tokens: [{ t: '  deploy:', c: '#00F5D4' }, { t: ' [', c: '#8892A4' }, { t: '"VPS"', c: '#10B981' },{ t: '],', c: '#8892A4' }] },
    { ln: '08', tokens: [{ t: '  experience:', c: '#00F5D4' }, { t: ' 2.5', c: '#F59E0B' }, { t: ',', c: '#8892A4' }] },
    { ln: '09', tokens: [{ t: '  projects:', c: '#00F5D4' }, { t: ` ${projects.length}`, c: '#F59E0B' }, { t: ',', c: '#8892A4' }] },
    { ln: '10', tokens: [{ t: '  passion:', c: '#00F5D4' }, { t: ' "Build great products"', c: '#F59E0B' }] },
    { ln: '11', tokens: [{ t: '};', c: '#8892A4' }] },
  ];

  return (
    <section id="about" className="section" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,245,212,0.15), transparent)' }} />
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="two-col">

          {/* Code block */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <div className="code-block">
              {/* Tab bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
                </div>
                <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 8 }}>developer.ts</span>
                <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>● TypeScript</span>
              </div>
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  style={{ display: 'flex', gap: 14, lineHeight: '26px' }}
                >
                  <span style={{ color: 'var(--text-muted)', minWidth: 22, textAlign: 'right', fontSize: 11, userSelect: 'none', opacity: 0.4 }}>{line.ln}</span>
                  <span>
                    {line.tokens.map((tok, j) => (
                      <span key={j} style={{ color: tok.c, fontSize: 13 }}>{tok.t}</span>
                    ))}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Mini stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 14 }}>
              {[
                { val: '2.5+', label: 'Years', c: 'var(--cyan)' },
                { val: `${projects.length}+`, label: 'Projects', c: 'var(--blue)' },
                { val: '4', label: 'Stacks', c: 'var(--violet)' },
              ].map(s => (
                <div key={s.label} className="glass" style={{ padding: '16px', textAlign: 'center' }}>
                  <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: s.c }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4, letterSpacing: '0.1em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <div className="section-label">about me</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 22, lineHeight: 1.15 }}>
              Building for<br /><span className="grad">Web & Mobile</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 18, fontSize: 15 }}>
              Fullstack Developer with ~2.5 years of combined professional and project experience.
              I build end-to-end applications — polished UIs to performant backends, deployed on real infrastructure.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 32, fontSize: 15 }}>
              My flagship project,{' '}
              <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>Pempek Kito</span>{' '}
              — a full e-commerce platform with Midtrans, Biteship, OAuth, and a Flutter mobile app — built and deployed solo.
            </p>

            {/* Skill rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Web Development', desc: 'React.js · Next.js · Laravel · TailwindCSS', icon: <FiMonitor size={15} />, cls: 'chip-web' },
                { label: 'Mobile Development', desc: 'Flutter · Dart · REST API integration', icon: <FiSmartphone size={15} />, cls: 'chip-mobile' },
                { label: 'Backend & APIs', desc: 'Golang (Gin) · PHP (Laravel) · MySQL · REST', icon: <FiServer size={15} />, cls: 'chip-back' },
                { label: 'DevOps & Deployment', desc: 'VPS · Nginx · Git · Docker basics', icon: <FiCpu size={15} />, cls: 'chip-full' },
              ].map(item => (
                <div key={item.label} className="glass lift" style={{ padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 14, borderRadius: 12 }}>
                  <span className={`tag ${item.cls}`} style={{ padding: '8px', borderRadius: 9, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{item.label}</div>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// EXPERIENCE SECTION
// ============================================================
const ExperienceSection = ({ experiences }: { experiences: Experience[] }) => (
  <section id="pengalaman" className="section" style={{ position: 'relative' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.15), transparent)' }} />
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="section-label">career path</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 60 }}>Work Experience</h2>
      </motion.div>

      <div style={{ position: 'relative', paddingLeft: 52 }}>
        <div className="tl-line" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {experiences.map((exp, i) => (
            <motion.div key={exp.id} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ position: 'relative' }}>
              <div className="tl-dot" />
              <div className="glass lift" style={{ padding: '28px 28px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 5 }}>{exp.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: 'var(--cyan)', fontWeight: 600, fontSize: 14 }}>{exp.company}</span>
                      <span style={{ color: 'var(--border-glow)' }}>·</span>
                      <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}><FiMapPin size={10} style={{ marginRight: 3 }} />{exp.location}</span>
                    </div>
                  </div>
                  <div className="badge" style={{ fontSize: 11 }}>
                    <FiCalendar size={11} />
                    {exp.start_year} — {exp.current_job ? 'Present' : exp.end_year}
                  </div>
                </div>

                <div className="glow-hr" style={{ margin: '14px 0' }} />

                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
                  {exp.responsibilities.map(r => (
                    <li key={r.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.65 }}>
                      <FiCheckCircle size={13} style={{ color: 'var(--cyan)', marginTop: 3, flexShrink: 0, opacity: 0.7 }} />
                      {r.description}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {exp.skills.map((s, idx) => (
                    <span key={idx} className="tag" style={{ background: 'rgba(0,245,212,0.06)', color: 'var(--text-secondary)', border: '1px solid rgba(0,245,212,0.1)', fontSize: 10 }}>
                      {s.skill_name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ============================================================
// PROJECTS SECTION
// ============================================================
const ProjectsSection = ({ projects }: { projects: Project[] }) => {
  const [filter, setFilter] = useState<'all'|'web'|'mobile'|'backend'>('all');

  const getType = (tags: ProjectTag[]) => {
    const n = tags.map(t => t.name.toLowerCase());
    if (n.some(x => x.includes('web') || x.includes('web'))) return 'web';
    if (n.some(x => x.includes('flutter') || x.includes('mobile'))) return 'mobile';
    if (n.some(x => x.includes('golang') || x.includes('api') || x.includes('backend'))) return 'backend';
    return 'web';
  };

  const filtered = projects.filter(p => filter === 'all' || getType(p.tags || []) === filter);

  const chipMap: Record<string, { cls: string; label: string; icon: JSX.Element }> = {
    web:     { cls: 'chip-web',    label: 'Web',     icon: <FiMonitor size={10} /> },
    mobile:  { cls: 'chip-mobile', label: 'Mobile',  icon: <FiSmartphone size={10} /> },
    backend: { cls: 'chip-back',   label: 'Backend', icon: <FiServer size={10} /> },
  };

  return (
    <section id="projek" className="section" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.15), transparent)' }} />
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="section-label">portfolio</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, gap: 20 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
              Selected<br /><span className="grad">Projects</span>
            </h2>
            {/* Filter */}
            <div style={{ display: 'flex', gap: 8, background: 'var(--bg-card2)', padding: '6px', borderRadius: 12, border: '1px solid var(--border)' }}>
              {(['all','web','mobile','backend'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)} className="mono" style={{
                  padding: '7px 16px', fontSize: 11, borderRadius: 8, border: 'none', cursor: 'pointer',
                  fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                  background: filter === f ? 'var(--cyan)' : 'transparent',
                  color: filter === f ? '#03050d' : 'var(--text-muted)',
                  transition: 'all 0.2s',
                }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="popLayout">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 18 }}>
            {filtered.map((project, i) => {
              const type = getType(project.tags || []);
              const chip = chipMap[type];
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass lift"
                  style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', borderRadius: 16 }}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', height: 188, overflow: 'hidden', background: 'var(--bg-card2)' }}>
                    {project.image_url
                      ? <img src={project.image_url} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                        />
                      : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #070b18, #09101f)' }}>
                          <FiCode style={{ fontSize: 36, color: 'var(--text-muted)' }} />
                        </div>
                    }
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,11,24,0.7) 0%, transparent 60%)' }} />
                    <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
                      <span className={`tag ${chip.cls}`}>{chip.icon} {chip.label}</span>
                      {project.is_featured && <span className="tag" style={{ background: 'rgba(245,158,11,0.15)', color: 'var(--amber)', border: '1px solid rgba(245,158,11,0.25)' }}>★ Featured</span>}
                    </div>
                    <div style={{ position: 'absolute', top: 12, right: 12 }}>
                      <span className="tag" style={{
                        background: project.status === 'published' ? 'rgba(16,185,129,0.15)' : 'rgba(0,245,212,0.1)',
                        color: project.status === 'published' ? 'var(--green)' : 'var(--cyan)',
                        border: `1px solid ${project.status === 'published' ? 'rgba(16,185,129,0.2)' : 'rgba(0,245,212,0.2)'}`,
                      }}>
                        {project.status === 'published' ? '⬤ Live' : project.status === 'completed' ? '✓ Done' : '◎ WIP'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em' }}>{project.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, marginBottom: 14, flex: 1 }}>
                      {project.description}
                    </p>

                    {project.tags?.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
                        {project.tags.map(tag => (
                          <span key={tag.id} className="tag" style={{ fontSize: 10, background: `${tag.color}10`, color: tag.color, border: `1px solid ${tag.color}22` }}>
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: 8, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                      {project.demo_url && project.demo_url !== '#' && (
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="btn-cta" style={{ flex: 1, justifyContent: 'center', padding: '9px 12px', fontSize: 12 }}>
                          <FiExternalLink size={12} /> Live Demo
                        </a>
                      )}
                      {project.code_url && project.code_url !== '#' && (
                        <a href={project.code_url} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ flex: project.demo_url && project.demo_url !== '#' ? 'none' : 1, justifyContent: 'center', padding: '8px 14px', fontSize: 12 }}>
                          <FiGithub size={12} /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="glass" style={{ padding: 60, textAlign: 'center', borderRadius: 16 }}>
            <FiCode style={{ fontSize: 40, color: 'var(--text-muted)', marginBottom: 16 }} />
            <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>// No projects in this category yet</p>
          </div>
        )}
      </div>
    </section>
  );
};

// ============================================================
// SKILLS SECTION
// ============================================================
const SkillsSection = ({ skills, certificates }: { skills: Skill[]; certificates: Certificate[] }) => {
  const safeSkills = skills || [];
  const featured = safeSkills.filter(s => s.is_featured === true || s.is_featured === 'true');
  const others = safeSkills.filter(s => s.is_featured !== true && s.is_featured !== 'true');

  const techGroups = [
    { label: 'Frontend', icon: <FiMonitor size={14} />, cls: 'chip-web',    items: ['React.js', 'Next.js', 'TailwindCSS', 'TypeScript', 'HTML/CSS'] },
    { label: 'Mobile',   icon: <FiSmartphone size={14} />, cls: 'chip-mobile', items: ['Flutter', 'Dart', 'REST Integration', 'State Mgmt'] },
    { label: 'Backend',  icon: <FiServer size={14} />, cls: 'chip-back',   items: ['Golang (Gin)', 'Laravel', 'PHP', 'REST API', 'Auth/JWT'] },
    { label: 'Infra',    icon: <FiDatabase size={14} />, cls: 'chip-full',  items: ['MySQL', 'VPS/Nginx', 'Git', 'Docker', 'CI/CD'] },
  ];

  return (
    <section id="skill" className="section" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,245,212,0.15), transparent)' }} />
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="section-label">expertise</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 48 }}>
            Skills & <span className="grad">Tech Stack</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 36 }} className="two-col">

          {/* Proficiency bars */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="glass" style={{ padding: '28px 28px', borderRadius: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26 }}>
                <FiBarChart2 style={{ color: 'var(--cyan)', fontSize: 16 }} />
                <span style={{ fontWeight: 700, fontSize: 15 }}>Core Proficiency</span>
              </div>
              {featured.length > 0
                ? featured.map((s, i) => (
                  <motion.div key={s.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} style={{ marginBottom: 22 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        {s.icon_url
                          ? <img src={s.icon_url} alt={s.name} style={{ width: 18, height: 18, objectFit: 'contain' }} />
                          : <FiCode style={{ color: 'var(--text-muted)', fontSize: 14 }} />}
                        <span style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</span>
                      </div>
                      <span className="mono" style={{ fontSize: 12, color: 'var(--cyan)' }}>{s.value}%</span>
                    </div>
                    <div className="bar-track">
                      <motion.div className="bar-fill" initial={{ width: 0 }} whileInView={{ width: `${s.value}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }} />
                    </div>
                  </motion.div>
                ))
                : (
                  // Default proficiency bars if none in DB
                  [
                    { name: 'Golang', val: 82, icon: null },
                    { name: 'React.js', val: 88, icon: null },
                    { name: 'Flutter', val: 80, icon: null },
                    { name: 'Laravel', val: 85, icon: null },
                    { name: 'MySQL', val: 78, icon: null },
                  ].map((s, i) => (
                    <div key={s.name} style={{ marginBottom: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</span>
                        <span className="mono" style={{ fontSize: 12, color: 'var(--cyan)' }}>{s.val}%</span>
                      </div>
                      <div className="bar-track">
                        <motion.div className="bar-fill" initial={{ width: 0 }} whileInView={{ width: `${s.val}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.1 }} />
                      </div>
                    </div>
                  ))
                )
              }
            </div>
          </motion.div>

          {/* Tech groups */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {techGroups.map(group => (
              <div key={group.label} className="glass" style={{ padding: '16px 20px', borderRadius: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 11 }}>
                  <span className={`tag ${group.cls}`} style={{ padding: '5px 9px' }}>{group.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{group.label}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {group.items.map(item => (
                    <span key={item} className="tag mono" style={{ fontSize: 10, background: 'rgba(255,255,255,0.03)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Certificates */}
        {certificates.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <FiAward style={{ color: 'var(--amber)', fontSize: 17 }} />
              <span style={{ fontWeight: 700, fontSize: 15 }}>Certifications</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {certificates.map((cert, i) => (
                <motion.a key={cert.id} href={cert.credential_url} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="glass lift" style={{ padding: 18, textDecoration: 'none', display: 'block', borderRadius: 14 }}
                >
                  {cert.image_url && (
                    <img src={cert.image_url} alt={cert.name} style={{ width: '100%', height: 90, objectFit: 'contain', marginBottom: 12, borderRadius: 8, background: 'var(--bg-card2)', padding: 8 }} />
                  )}
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 5, lineHeight: 1.4 }}>{cert.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{cert.issuer}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', marginTop: 8 }}>
                    {new Date(cert.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Other tech pills */}
        {others.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginTop: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <FiCode style={{ color: 'var(--cyan)', fontSize: 16 }} />
              <span style={{ fontWeight: 700, fontSize: 15 }}>More Technologies</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {others.map(s => (
                <span key={s.id} className="glass" style={{ padding: '8px 15px', display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, borderRadius: 10 }}>
                  {s.icon_url ? <img src={s.icon_url} alt={s.name} style={{ width: 16, height: 16, objectFit: 'contain' }} /> : <FiCode style={{ color: 'var(--text-muted)', fontSize: 13 }} />}
                  {s.name}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// ============================================================
// EDUCATION SECTION
// ============================================================
const EducationSection = ({ education }: { education: Education[] }) => (
  <section id="studi" className="section" style={{ position: 'relative' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.15), transparent)' }} />
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="section-label">background</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 48 }}>Education</h2>
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
        {education.map((edu, i) => (
          <motion.div key={edu.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="glass lift" style={{ padding: 28, borderRadius: 16 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, background: 'rgba(0,245,212,0.08)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,245,212,0.12)' }}>
                <FiAward style={{ color: 'var(--cyan)', fontSize: 22 }} />
              </div>
              <div className="badge" style={{ fontSize: 10 }}>
                <FiCalendar size={10} /> {edu.start_year} – {edu.end_year}
              </div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 5 }}>{edu.degree}</div>
            <div style={{ color: 'var(--cyan)', fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{edu.major}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 12 }}>{edu.school}</div>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.65, marginBottom: 14 }}>{edu.description}</p>
            {edu.achievements?.length > 0 && (
              <div style={{ paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Achievements</div>
                {edu.achievements.map(a => (
                  <div key={a.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 7, fontSize: 13, color: 'var(--text-secondary)' }}>
                    <FiArrowRight size={11} style={{ color: 'var(--cyan)', marginTop: 4, flexShrink: 0 }} />
                    {a.achievement}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ============================================================
// TESTIMONIALS SECTION
// ============================================================
const TestimonialsSection = ({ testimonials }: { testimonials: Testimonial[] }) => (
  <section id="testimoni" className="section" style={{ position: 'relative' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.12), transparent)' }} />
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="section-label">social proof</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 48 }}>Testimonials</h2>
      </motion.div>
      {testimonials.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
          {testimonials.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="glass" style={{ padding: '28px', borderRadius: 16 }}
            >
              <div style={{ fontSize: 36, color: 'var(--cyan)', lineHeight: 1, marginBottom: 16, opacity: 0.25, fontFamily: 'Georgia, serif' }}>"</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic' }}>{t.message}</p>
              <div style={{ display: 'flex', gap: 3, marginBottom: 18 }}>
                {[...Array(5)].map((_, j) => (
                  <FiStar key={j} size={12} style={{ color: j < t.rating ? 'var(--amber)' : 'var(--text-muted)', fill: j < t.rating ? 'var(--amber)' : 'none' }} />
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, var(--cyan), var(--blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, color: '#03050d' }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{t.name}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass" style={{ padding: 60, textAlign: 'center', borderRadius: 16 }}>
          <FiMessageSquare style={{ fontSize: 32, color: 'var(--text-muted)', marginBottom: 12 }} />
          <p className="mono" style={{ color: 'var(--text-muted)', fontSize: 13 }}>// No testimonials yet — come back soon</p>
        </div>
      )}
    </div>
  </section>
);

// ============================================================
// BLOG SECTION
// ============================================================
const BlogSection = ({ blogPosts }: { blogPosts: BlogPost[] }) => {
  const latest = [...blogPosts]
    .sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime())
    .slice(0, 3);

  return (
    <section id="blog" className="section" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.12), transparent)' }} />
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="section-label">writing</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-0.025em' }}>
              Latest <span className="grad">Articles</span>
            </h2>
            {blogPosts.length > 3 && (
              <Link href="/blog" style={{ color: 'var(--cyan)', textDecoration: 'none', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
                View all {blogPosts.length} <FiArrowRight size={13} />
              </Link>
            )}
          </div>
        </motion.div>

        {latest.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
            {latest.map((post, i) => {
              const isNew = (new Date().getTime() - new Date(post.publish_date).getTime()) < 3 * 24 * 3600 * 1000;
              return (
                <Link key={post.id} href={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
                  <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="glass lift" style={{ borderRadius: 16, overflow: 'hidden', height: '100%' }}
                  >
                    <div style={{ height: 110, background: 'linear-gradient(135deg, #070b18, #0a1020)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
                      <div style={{ width: 44, height: 44, background: 'rgba(0,245,212,0.08)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,245,212,0.12)', position: 'relative', zIndex: 1 }}>
                        <FiMessageSquare style={{ fontSize: 20, color: 'rgba(0,245,212,0.5)' }} />
                      </div>
                      <div style={{ position: 'absolute', top: 10, left: 12 }}>
                        <span className="mono" style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                          {new Date(post.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      {isNew && (
                        <div style={{ position: 'absolute', top: 10, right: 12 }}>
                          <span className="tag chip-back" style={{ fontSize: 9 }}>✦ NEW</span>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '18px 20px' }}>
                      {post.tags?.slice(0, 2).map(tag => (
                        <span key={tag.id} className="tag" style={{ fontSize: 10, background: 'rgba(0,245,212,0.06)', color: 'var(--text-secondary)', border: '1px solid var(--border)', marginRight: 5, marginBottom: 10, display: 'inline-block' }}>
                          #{tag.name}
                        </span>
                      ))}
                      <h3 style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.45, marginBottom: 8 }}>{post.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.65, marginBottom: 14 }}>
                        {post.excerpt || 'Read the full article...'}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
                        <div style={{ display: 'flex', gap: 14 }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiEye size={11} /> {post.view_count || 0}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiClock size={11} /> {Math.max(1, Math.ceil((post.content?.length || 0) / 1200))}m read</span>
                        </div>
                        <span style={{ color: 'var(--cyan)', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                          Read <FiArrowRight size={11} />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="glass" style={{ padding: 60, textAlign: 'center', borderRadius: 16 }}>
            <FiMessageSquare style={{ fontSize: 32, color: 'var(--text-muted)', marginBottom: 12 }} />
            <p className="mono" style={{ color: 'var(--text-muted)', fontSize: 13 }}>// Articles loading soon...</p>
          </div>
        )}
      </div>
    </section>
  );
};

// ============================================================
// CONTACT SECTION
// ============================================================
const ContactSection = ({ settings }: { settings: Setting[] }) => {
  const getSetting = (k: string) => settings.find(s => s.key === k)?.value || '';
  const [sent, setSent] = useState(false);

  return (
    <section id="kontak" className="section" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,245,212,0.15), transparent)' }} />
      {/* Big glow bg */}
      <div style={{ position: 'absolute', bottom: '-10%', left: '50%', transform: 'translateX(-50%)', width: '80vw', height: '60vh', background: 'radial-gradient(ellipse, rgba(0,245,212,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>contact</div>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 18, lineHeight: 1.1 }}>
            Let&apos;s Build<br /><span className="grad">Something Great</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, maxWidth: 520, margin: '0 auto' }}>
            Open to freelance projects, full-time roles, and collaboration. Whether it&apos;s a web app, mobile app, or full-scale platform — let&apos;s talk.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }} className="two-col">

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: <FiMail size={17} />, label: 'Email', value: getSetting('contact_email') || 'your@email.com', color: 'var(--cyan)' },
              { icon: <FiPhone size={17} />, label: 'Phone / WA', value: getSetting('phone_number') || '+62 812-3456-7890', color: 'var(--blue)' },
              { icon: <FiMapPin size={17} />, label: 'Location', value: getSetting('location') || 'Palembang, Indonesia', color: 'var(--violet)' },
            ].map(item => (
              <div key={item.label} className="glass" style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16, borderRadius: 14 }}>
                <div style={{ width: 44, height: 44, background: `rgba(0,0,0,0.3)`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, flexShrink: 0, border: `1px solid ${item.color}20` }}>
                  {item.icon}
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{item.value}</div>
                </div>
              </div>
            ))}

            <a href={getSetting('cv_url') || '#'} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ marginTop: 8, justifyContent: 'center' }}>
              <FiDownload size={15} /> Download Full CV
            </a>
          </motion.div>

          {/* Right — Form */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="glass" style={{ padding: '32px 30px', borderRadius: 16 }}>
              {!sent ? (
                <>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <FiMessageSquare style={{ color: 'var(--cyan)' }} />
                    Send a Message
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {['name', 'email'].map(field => (
                      <div key={field}>
                        <label className="mono" style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{field}</label>
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          placeholder={field === 'email' ? 'you@example.com' : 'Your name'}
                          style={{ width: '100%', padding: '12px 15px', background: 'rgba(3,5,13,0.6)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-primary)', fontSize: 14, outline: 'none', fontFamily: 'var(--font-display)', transition: 'border-color 0.2s' }}
                          onFocus={e => e.target.style.borderColor = 'rgba(0,245,212,0.35)'}
                          onBlur={e => e.target.style.borderColor = 'var(--border)'}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="mono" style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.1em' }}>message</label>
                      <textarea rows={4} placeholder="Tell me about your project..."
                        style={{ width: '100%', padding: '12px 15px', background: 'rgba(3,5,13,0.6)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-primary)', fontSize: 14, outline: 'none', resize: 'none', fontFamily: 'var(--font-display)', transition: 'border-color 0.2s' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(0,245,212,0.35)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                      />
                    </div>
                    <button type="button" onClick={() => setSent(true)} className="btn-cta" style={{ width: '100%', justifyContent: 'center', padding: 14 }}>
                      <FiArrowRight size={15} /> Send Message
                    </button>
                  </div>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <FiCheckCircle style={{ fontSize: 28, color: 'var(--green)' }} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Message Sent!</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>I&apos;ll get back to you soon. 🚀</p>
                  <button onClick={() => setSent(false)} style={{ marginTop: 20, background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 18px', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 13, fontFamily: 'var(--font-display)' }}>
                    Send Another
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// FOOTER
// ============================================================
const Footer = ({ socialLinks }: { socialLinks: SocialLink[] }) => {
  const iconMap: Record<string, JSX.Element> = {
    FaWhatsapp: <FaWhatsapp size={16} />, FiInstagram: <FiInstagram size={16} />,
    FiLinkedin: <FiLinkedin size={16} />, FaTelegram: <FaTelegram size={16} />,
    FaLine: <FaLine size={16} />, FiMail: <FiMail size={16} />, FiGithub: <FiGithub size={16} />
  };
  const colors: Record<string, string> = {
    FaWhatsapp: '#25D366', FiInstagram: '#E1306C', FiLinkedin: '#0A66C2',
    FaTelegram: '#229ED9', FiMail: 'var(--cyan)', FiGithub: '#A0AEC0', FaLine: '#00C300'
  };

  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '36px 0', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,245,212,0.1), transparent)' }} />
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg, var(--cyan), var(--blue))', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiTerminal style={{ color: '#03050d', fontSize: 13 }} />
          </div>
          <span className="mono" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            MFF<span style={{ color: 'var(--cyan)' }}>.dev</span> · Muhammad Fathiir Farhansyah
          </span>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {socialLinks.map(s => (
            <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{ width: 36, height: 36, borderRadius: 9, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = colors[s.icon_name] || 'var(--cyan)'; el.style.borderColor = (colors[s.icon_name] || 'var(--cyan)') + '44'; el.style.background = 'rgba(255,255,255,0.03)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--text-muted)'; el.style.borderColor = 'var(--border)'; el.style.background = 'transparent'; }}
            >
              {iconMap[s.icon_name] || <FiMail size={16} />}
            </a>
          ))}
        </div>

        <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} · Palembang, Indonesia
        </span>
      </div>
    </footer>
  );
};

// ============================================================
// CONTACT MODAL
// ============================================================
const ContactModal = ({ isOpen, onClose, socialLinks }: { isOpen: boolean; onClose: () => void; socialLinks: SocialLink[] }) => {
  const iconMap: Record<string, JSX.Element> = {
    FaWhatsapp: <FaWhatsapp size={22} />, FiInstagram: <FiInstagram size={22} />,
    FiLinkedin: <FiLinkedin size={22} />, FaTelegram: <FaTelegram size={22} />,
    FaLine: <FaLine size={22} />, FiMail: <FiMail size={22} />, FiGithub: <FiGithub size={22} />
  };
  const colors: Record<string, string> = {
    FaWhatsapp: '#25D366', FiInstagram: '#E1306C', FiLinkedin: '#0A66C2',
    FaTelegram: '#229ED9', FiMail: '#00F5D4', FiGithub: '#A0AEC0', FaLine: '#00C300'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(3,5,13,0.8)', backdropFilter: 'blur(12px)', padding: 20 }}
          onClick={onClose}
        >
          <motion.div initial={{ scale: 0.88, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.88, opacity: 0, y: 20 }} transition={{ type: 'spring', damping: 18, stiffness: 200 }}
            onClick={e => e.stopPropagation()}
            style={{ background: 'var(--bg-card)', border: '1px solid rgba(0,245,212,0.12)', borderRadius: 20, padding: 36, width: '100%', maxWidth: 420, position: 'relative', boxShadow: '0 0 80px rgba(0,245,212,0.08)' }}
          >
            {/* Top glow line */}
            <div style={{ position: 'absolute', top: 0, left: 24, right: 24, height: 1, background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)', opacity: 0.4 }} />

            <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 18, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 9, padding: '6px', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
            >
              <FiX size={16} />
            </button>

            <div className="section-label" style={{ marginBottom: 6 }}>connect with me</div>
            <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Get In Touch</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 28 }}>Choose your preferred platform</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {socialLinks.map((s, i) => (
                <motion.a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'var(--text-primary)', transition: 'all 0.25s', background: 'rgba(255,255,255,0.01)' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    const c = colors[s.icon_name] || 'var(--cyan)';
                    el.style.borderColor = c + '44';
                    el.style.background = c + '08';
                    el.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'var(--border)';
                    el.style.background = 'rgba(255,255,255,0.01)';
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  <span style={{ color: colors[s.icon_name] || 'var(--cyan)', flexShrink: 0 }}>
                    {iconMap[s.icon_name] || <FiMail size={22} />}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{s.platform}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================
// MAIN PORTFOLIO
// ============================================================
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
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

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/portofolio');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const d = await res.json();
        setSections(d.sections || []);
        setProjects(Array.isArray(d.projects) ? d.projects : []);
        setExperiences(d.experiences || []);
        setSkills(d.skills || []);
        setCertificates(d.certificates || []);
        setEducation(d.education || []);
        setTestimonials(d.testimonials || []);
        setBlogPosts(d.blogPosts || []);
        setSocialLinks(d.socialLinks || []);
        setSettings(d.settings || []);
      } catch (err) {
        setFetchError((err as Error)?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <>
        <GlobalStyles />
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
          <div style={{ textAlign: 'center' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{ width: 44, height: 44, border: '2px solid rgba(0,245,212,0.15)', borderTopColor: 'var(--cyan)', borderRadius: '50%', margin: '0 auto 20px' }}
            />
            <div className="mono" style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.15em' }}>LOADING PORTFOLIO...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <GlobalStyles />
      <Background />
      <CursorGlow />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navigation sections={sections} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main>
          <HeroSection settings={settings} setShowContact={setShowContact} />
          <AboutSection projects={projects} />
          <ExperienceSection experiences={experiences} />
          <ProjectsSection projects={projects} />
          <SkillsSection skills={skills} certificates={certificates} />
          <EducationSection education={education} />
          <TestimonialsSection testimonials={testimonials} />
          <BlogSection blogPosts={blogPosts} />
          <ContactSection settings={settings} />
        </main>
        <Footer socialLinks={socialLinks} />
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} socialLinks={socialLinks} />

      {/* Floating CTA */}
      <motion.button
        onClick={() => setShowContact(true)}
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 50,
          padding: '12px 22px',
          background: 'linear-gradient(135deg, var(--cyan), var(--blue))',
          color: '#03050d',
          border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 13,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-display)',
          boxShadow: '0 4px 28px rgba(0,245,212,0.3)',
          letterSpacing: '0.02em',
        }}
        whileHover={{ scale: 1.06, boxShadow: '0 4px 40px rgba(0,245,212,0.45)' }}
        whileTap={{ scale: 0.96 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FiMessageSquare size={15} /> Contact Me
      </motion.button>

      {/* Error toast */}
      {fetchError && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          style={{ position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 99, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', color: 'var(--amber)', padding: '10px 20px', borderRadius: 10, fontSize: 12, fontFamily: 'var(--font-mono)' }}>
          ⚠ API fallback mode — {fetchError}
        </motion.div>
      )}
    </>
  );
}