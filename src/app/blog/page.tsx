'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  FiMessageSquare, FiExternalLink, FiEye, FiClock,
  FiArrowLeft, FiTag, FiSearch, FiTerminal, FiX,
  FiArrowRight, FiCalendar, FiZap
} from 'react-icons/fi';

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
  created_at?: string;
  updated_at?: string;
}

interface BlogTag {
  id: string;
  name: string;
  created_at?: string;
}

// ============================================================
// STYLES
// ============================================================
const Styles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Fira+Code:wght@300;400;500;600&display=swap');

    :root {
      --font-display: 'Syne', sans-serif;
      --font-mono: 'Fira Code', monospace;
      --bg:       #03050d;
      --bg-card:  #070b18;
      --bg-card2: #09101f;
      --bg-glass: rgba(9,16,31,0.7);
      --border:   rgba(255,255,255,0.05);
      --cyan:   #00F5D4;
      --blue:   #3B82F6;
      --violet: #8B5CF6;
      --green:  #10B981;
      --amber:  #F59E0B;
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
    ::-webkit-scrollbar-thumb { background: var(--cyan); border-radius: 2px; }

    .mono { font-family: var(--font-mono); }
    .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }

    .glass {
      background: var(--bg-glass);
      border: 1px solid var(--border);
      border-radius: 16px;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    .glass:hover {
      border-color: rgba(0,245,212,0.15);
      box-shadow: 0 0 40px rgba(0,245,212,0.04), inset 0 1px 0 rgba(255,255,255,0.04);
    }

    .grad { background: linear-gradient(135deg, var(--cyan) 0%, var(--blue) 50%, var(--violet) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

    .section-label {
      font-family: var(--font-mono);
      font-size: 11px; letter-spacing: 0.15em;
      color: var(--cyan); text-transform: uppercase;
      display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
    }
    .section-label::before { content: '//'; opacity: 0.4; }
    .section-label::after { content: ''; flex: 0 0 32px; height: 1px; background: var(--cyan); opacity: 0.4; }

    .badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 14px; border-radius: 30px;
      font-family: var(--font-mono); font-size: 11px;
      background: rgba(0,245,212,0.08);
      border: 1px solid rgba(0,245,212,0.2);
      color: var(--cyan);
    }

    .grid-bg {
      background-image:
        linear-gradient(rgba(0,245,212,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,245,212,0.025) 1px, transparent 1px);
      background-size: 48px 48px;
    }

    .btn-cta {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 11px 22px; background: var(--cyan); color: #03050d;
      font-family: var(--font-display); font-size: 13px; font-weight: 700;
      border: none; border-radius: 10px; cursor: pointer; text-decoration: none;
      transition: box-shadow 0.25s, transform 0.15s; letter-spacing: 0.02em;
    }
    .btn-cta:hover { box-shadow: 0 0 24px rgba(0,245,212,0.4); transform: translateY(-2px); }

    .btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 20px; background: transparent; color: var(--text-primary);
      font-family: var(--font-display); font-size: 13px; font-weight: 600;
      border: 1px solid rgba(0,245,212,0.25); border-radius: 10px;
      cursor: pointer; text-decoration: none;
      transition: background 0.25s, box-shadow 0.25s, transform 0.15s;
    }
    .btn-outline:hover { background: rgba(0,245,212,0.06); box-shadow: 0 0 16px rgba(0,245,212,0.12); transform: translateY(-2px); }

    .lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
    .lift:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(0,0,0,0.4); }

    .tag-pill {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 10px; border-radius: 4px;
      font-size: 10px; font-weight: 500; letter-spacing: 0.06em;
      font-family: var(--font-mono);
    }

    .search-input {
      width: 100%; padding: 13px 16px 13px 44px;
      background: rgba(9,16,31,0.8);
      border: 1px solid var(--border);
      border-radius: 12px;
      color: var(--text-primary);
      font-family: var(--font-display);
      font-size: 14px; outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .search-input::placeholder { color: var(--text-muted); }
    .search-input:focus { border-color: rgba(0,245,212,0.35); box-shadow: 0 0 0 3px rgba(0,245,212,0.06); }

    @keyframes live-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
    .dot-live { width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green);animation:live-pulse 2s ease-in-out infinite; }

    @media(max-width:768px) {
      .hide-sm { display:none!important; }
      .container { padding: 0 16px; }
    }
  `}</style>
);

// ============================================================
// CANVAS BACKGROUND
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

    const cols = Math.floor(window.innerWidth / 26);
    const drops: number[] = Array(cols).fill(1);
    const chars = '01GOLANG REACTFLUTTERBLOGWRITEREADPOSTDEV{}[];:'.split('');
    const orbs = [
      { x: 0.1, y: 0.15, r: 240, color: 'rgba(0,245,212,', speed: 0.00007 },
      { x: 0.9, y: 0.6,  r: 190, color: 'rgba(59,130,246,', speed: 0.0001 },
      { x: 0.5, y: 0.9,  r: 160, color: 'rgba(139,92,246,', speed: 0.00009 },
    ];

    let t = 0;
    ctx.fillStyle = '#03050d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const draw = () => {
      t++;
      ctx.fillStyle = 'rgba(3,5,13,0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      orbs.forEach((o, i) => {
        const px = (o.x + Math.sin(t * o.speed * (i + 1)) * 0.07) * canvas.width;
        const py = (o.y + Math.cos(t * o.speed * (i + 1)) * 0.05) * canvas.height;
        const g = ctx.createRadialGradient(px, py, 0, px, py, o.r);
        g.addColorStop(0, o.color + '0.06)');
        g.addColorStop(1, o.color + '0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      ctx.font = '11px "Fira Code", monospace';
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 26;
        ctx.fillStyle = 'rgba(0,245,212,0.85)';
        ctx.fillText(ch, x, y * 16);
        ctx.fillStyle = `rgba(0,245,212,${Math.random() * 0.1})`;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, (y - 1) * 16);
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.45 }} />
      <div className="grid-bg" style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.35 }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(3,5,13,0.88) 100%)', pointerEvents: 'none' }} />
    </>
  );
};

// ============================================================
// TAG COLOR MAP
// ============================================================
const tagColor = (name: string) => {
  const map: Record<string, { bg: string; color: string; border: string }> = {
    'Web Development': { bg: 'rgba(59,130,246,0.12)', color: '#60A5FA', border: 'rgba(59,130,246,0.25)' },
    'Tips':           { bg: 'rgba(0,245,212,0.10)', color: '#00F5D4', border: 'rgba(0,245,212,0.2)' },
    'AI':             { bg: 'rgba(139,92,246,0.12)', color: '#A78BFA', border: 'rgba(139,92,246,0.25)' },
    'Laravel':        { bg: 'rgba(255,45,32,0.10)', color: '#FF6B5B', border: 'rgba(255,45,32,0.2)' },
    'Node.js':        { bg: 'rgba(104,211,145,0.10)', color: '#68D391', border: 'rgba(104,211,145,0.2)' },
    'Golang':         { bg: 'rgba(0,173,216,0.10)', color: '#00ADD8', border: 'rgba(0,173,216,0.2)' },
  };
  return map[name] || { bg: 'rgba(0,245,212,0.06)', color: '#8892A4', border: 'rgba(0,245,212,0.1)' };
};

// ============================================================
// BLOG CARD
// ============================================================
const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => {
  const readTime = Math.max(1, Math.ceil((post.content?.length || 0) / 1200));
  const isNew = (new Date().getTime() - new Date(post.publish_date).getTime()) < 7 * 24 * 3600 * 1000;

  return (
    <Link href={`/blog/${post.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <motion.article
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 28 }}
        transition={{ delay: index * 0.07 }}
        className="glass lift"
        style={{ borderRadius: 18, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
      >
        {/* Header */}
        <div style={{ height: 130, background: 'linear-gradient(135deg, #070b18, #0b1428)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
          <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
          {/* Glow orb */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,245,212,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 48, height: 48, background: 'rgba(0,245,212,0.08)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,245,212,0.15)', backdropFilter: 'blur(8px)' }}>
              <FiMessageSquare style={{ fontSize: 22, color: 'rgba(0,245,212,0.6)' }} />
            </div>
          </div>

          {/* Date */}
          <div style={{ position: 'absolute', top: 12, left: 14 }}>
            <span className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <FiCalendar size={9} />
              {new Date(post.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          {/* New badge */}
          {isNew && (
            <div style={{ position: 'absolute', top: 10, right: 12 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 4, fontSize: 9, color: '#34D399', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                ✦ NEW
              </span>
            </div>
          )}
          {/* Bottom gradient */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: 'linear-gradient(to top, rgba(7,11,24,0.8), transparent)' }} />
        </div>

        {/* Content */}
        <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Tags */}
          {post.tags?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
              {post.tags.slice(0, 3).map(tag => {
                const tc = tagColor(tag.name);
                return (
                  <span key={tag.id} className="tag-pill" style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.border}` }}>
                    #{tag.name}
                  </span>
                );
              })}
            </div>
          )}

          <h3 style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.45, marginBottom: 10, color: 'var(--text-primary)' }}>
            {post.title}
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, marginBottom: 16, flex: 1 }}>
            {post.excerpt || 'Read the full article to explore more...'}
          </p>

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <FiEye size={11} /> {post.view_count || 0}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <FiClock size={11} /> {readTime}m read
              </span>
            </div>
            <span style={{ color: 'var(--cyan)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700 }}>
              Read <FiArrowRight size={11} />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

// ============================================================
// MAIN BLOG PAGE
// ============================================================
export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/portofolio');
        const d = await res.json();
        setPosts(d.blogPosts || []);
      } catch {
        // fallback dummy
        setPosts([
          {
            id: '1',
            title: '5 Tips Menjadi Web Developer Handal',
            content: 'Menjadi web developer bukan hanya soal coding, tetapi juga soal mindset dan kebiasaan yang harus dibangun setiap hari. Konsistensi adalah kunci utama dalam perjalanan menjadi developer handal.',
            excerpt: 'Menjadi web developer bukan hanya soal coding, tetapi juga soal mindset dan kebiasaan...',
            slug: '5-tips-menjadi-web-developer-handal',
            featured_image: '',
            publish_date: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
            status: 'published',
            view_count: 150,
            tags: [{ id: '1', name: 'Web Development' }, { id: '2', name: 'Tips' }]
          },
          {
            id: '2',
            title: 'Tips Menggunakan AI dalam Pengembangan Web',
            content: 'AI dapat menjadi alat yang sangat berguna dalam pengembangan web, berikut beberapa tips untuk memanfaatkannya secara optimal dalam workflow sehari-hari.',
            excerpt: 'AI dapat menjadi alat yang sangat berguna dalam pengembangan web, berikut tips memanfaatkannya...',
            slug: 'tips-ai-pengembangan-web',
            featured_image: '',
            publish_date: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
            status: 'published',
            view_count: 230,
            tags: [{ id: '3', name: 'AI' }, { id: '4', name: 'Web Development' }]
          },
          {
            id: '3',
            title: 'Laravel vs Node.js: Mana yang Lebih Baik?',
            content: 'Dalam dunia pengembangan web, Laravel dan Node.js adalah dua pilihan populer. Mari kita bahas kelebihan dan kekurangan masing-masing berdasarkan pengalaman nyata.',
            excerpt: 'Dalam dunia pengembangan web, Laravel dan Node.js adalah dua pilihan populer. Mari bahas...',
            slug: 'laravel-vs-nodejs',
            featured_image: '',
            publish_date: new Date(Date.now() - 12 * 24 * 3600 * 1000).toISOString(),
            status: 'published',
            view_count: 180,
            tags: [{ id: '5', name: 'Laravel' }, { id: '6', name: 'Node.js' }]
          },
          {
            id: '4',
            title: 'Membangun REST API dengan Golang dan Gin Framework',
            content: 'Golang adalah bahasa yang sangat cocok untuk membangun REST API yang cepat dan efisien. Gin framework membuatnya semakin mudah dengan routing yang powerful.',
            excerpt: 'Golang adalah bahasa yang sangat cocok untuk membangun REST API yang cepat dan efisien...',
            slug: 'rest-api-golang-gin',
            featured_image: '',
            publish_date: new Date(Date.now() - 20 * 24 * 3600 * 1000).toISOString(),
            status: 'published',
            view_count: 310,
            tags: [{ id: '7', name: 'Golang' }, { id: '8', name: 'Web Development' }]
          },
          {
            id: '5',
            title: 'Flutter untuk Mobile Developer Pemula',
            content: 'Flutter adalah framework yang sangat powerful untuk membangun aplikasi mobile cross-platform. Dengan satu codebase, kamu bisa deploy ke iOS dan Android sekaligus.',
            excerpt: 'Flutter adalah framework yang sangat powerful untuk membangun aplikasi mobile cross-platform...',
            slug: 'flutter-mobile-developer-pemula',
            featured_image: '',
            publish_date: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
            status: 'published',
            view_count: 275,
            tags: [{ id: '9', name: 'Tips' }]
          },
          {
            id: '6',
            title: 'Deploy Aplikasi ke VPS Ubuntu: Panduan Lengkap',
            content: 'Deploying ke VPS bisa terasa menakutkan bagi developer pemula. Artikel ini akan memandu kamu langkah demi langkah dari setup hingga aplikasi berjalan di production.',
            excerpt: 'Deploying ke VPS bisa terasa menakutkan bagi developer pemula. Artikel ini panduan lengkap...',
            slug: 'deploy-vps-ubuntu-panduan-lengkap',
            featured_image: '',
            publish_date: new Date(Date.now() - 45 * 24 * 3600 * 1000).toISOString(),
            status: 'published',
            view_count: 420,
            tags: [{ id: '10', name: 'Web Development' }, { id: '11', name: 'Tips' }]
          },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const allTags = Array.from(new Set(posts.flatMap(p => p.tags.map(t => t.name))));

  const filtered = posts.filter(p => {
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.name.toLowerCase().includes(search.toLowerCase()));
    const matchTag = !selectedTag || p.tags.some(t => t.name === selectedTag);
    return matchSearch && matchTag;
  });

  return (
    <>
      <Styles />
      <Background />

      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>

        {/* ── NAV ── */}
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            background: 'rgba(3,5,13,0.88)', backdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(0,245,212,0.08)',
          }}
        >
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, var(--cyan), var(--blue))', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 12px rgba(0,245,212,0.3)' }}>
                <FiTerminal style={{ color: '#03050d', fontSize: 14 }} />
              </div>
              <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                MFF<span style={{ color: 'var(--cyan)' }}>.dev</span>
              </span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="badge" style={{ fontSize: 10 }}>
                <div className="dot-live" />
                {posts.length} Articles
              </div>
            </div>

            <Link href="/" className="btn-outline" style={{ padding: '8px 16px', fontSize: 12 }}>
              <FiArrowLeft size={13} /> Back Home
            </Link>
          </div>
        </motion.header>

        {/* ── HERO ── */}
        <section style={{ paddingTop: 120, paddingBottom: 64 }}>
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} style={{ maxWidth: 640 }}>
              <div className="section-label">writing</div>
              <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 16 }}>
                Dev <span className="grad">Blog</span>
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginBottom: 0 }}>
                Tulisan tentang web development, mobile, backend, dan pengalaman nyata membangun produk dari nol hingga production.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── SEARCH + FILTER ── */}
        <section style={{ paddingBottom: 40 }}>
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              {/* Search */}
              <div style={{ position: 'relative', maxWidth: 560, marginBottom: 20 }}>
                <FiSearch style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 16 }} />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search articles, tags..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
                    <FiX size={15} />
                  </button>
                )}
              </div>

              {/* Tag filters */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <button
                  onClick={() => setSelectedTag('')}
                  className="mono"
                  style={{
                    padding: '6px 14px', fontSize: 10, borderRadius: 8, border: 'none', cursor: 'pointer',
                    fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                    background: !selectedTag ? 'var(--cyan)' : 'rgba(255,255,255,0.04)',
                    color: !selectedTag ? '#03050d' : 'var(--text-muted)',
                    transition: 'all 0.2s',
                    borderWidth: 1, borderStyle: 'solid',
                    borderColor: !selectedTag ? 'transparent' : 'var(--border)',
                  }}
                >
                  All
                </button>
                {allTags.map(tag => {
                  const tc = tagColor(tag);
                  const active = selectedTag === tag;
                  return (
                    <button key={tag} onClick={() => setSelectedTag(active ? '' : tag)}
                      className="mono"
                      style={{
                        padding: '6px 14px', fontSize: 10, borderRadius: 8, cursor: 'pointer',
                        fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                        background: active ? tc.bg : 'rgba(255,255,255,0.03)',
                        color: active ? tc.color : 'var(--text-muted)',
                        border: `1px solid ${active ? tc.border : 'var(--border)'}`,
                        transition: 'all 0.2s',
                      }}
                    >
                      <FiTag size={9} style={{ marginRight: 4 }} />
                      {tag}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── RESULTS COUNT ── */}
        <div className="container" style={{ marginBottom: 24 }}>
          <p className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
            // {loading ? 'loading...' : `${filtered.length} article${filtered.length !== 1 ? 's' : ''} found`}
            {(search || selectedTag) && !loading && (
              <button onClick={() => { setSearch(''); setSelectedTag(''); }} style={{ marginLeft: 12, background: 'none', border: 'none', color: 'var(--cyan)', cursor: 'pointer', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                clear filters ✕
              </button>
            )}
          </p>
        </div>

        {/* ── GRID ── */}
        <main style={{ paddingBottom: 100 }}>
          <div className="container">
            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="glass" style={{ height: 320, borderRadius: 18, overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(0,245,212,0.04), transparent)', backgroundSize: '400px 100%', animation: 'shimmer 1.8s infinite' }} />
                  </div>
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <AnimatePresence mode="popLayout">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
                  {filtered.map((post, i) => (
                    <BlogCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              </AnimatePresence>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="glass" style={{ padding: '72px 40px', textAlign: 'center', borderRadius: 18 }}
              >
                <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(0,245,212,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid rgba(0,245,212,0.12)' }}>
                  <FiSearch style={{ fontSize: 28, color: 'rgba(0,245,212,0.4)' }} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>No Articles Found</h3>
                <p className="mono" style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>
                  // try different keywords or clear filters
                </p>
                <button onClick={() => { setSearch(''); setSelectedTag(''); }} className="btn-cta" style={{ padding: '10px 20px', fontSize: 13 }}>
                  <FiZap size={13} /> Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 0' }}>
          <div style={{ position: 'absolute', width: '100%', height: 1, top: 0, background: 'linear-gradient(90deg, transparent, rgba(0,245,212,0.1), transparent)' }} />
          <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <span className="mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              MFF<span style={{ color: 'var(--cyan)' }}>.dev</span> · Blog
            </span>
            <Link href="/" className="btn-outline" style={{ padding: '8px 16px', fontSize: 12 }}>
              <FiArrowLeft size={12} /> Back to Portfolio
            </Link>
          </div>
        </footer>

      </div>

      <style jsx>{`
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
      `}</style>
    </>
  );
}