'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import {
  FiCalendar, FiArrowLeft, FiEye, FiClock,
  FiTag, FiTerminal, FiShare2, FiCopy, FiCheck,
  FiArrowRight, FiMessageSquare, FiZap
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
}
interface BlogTag { id: string; name: string; }

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
      background: var(--bg); color: var(--text-primary);
      overflow-x: hidden; -webkit-font-smoothing: antialiased;
    }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--cyan); border-radius: 2px; }

    .mono { font-family: var(--font-mono); }
    .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
    .prose-container { max-width: 740px; margin: 0 auto; }

    .glass {
      background: var(--bg-glass); border: 1px solid var(--border);
      border-radius: 16px; backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      transition: border-color 0.3s, box-shadow 0.3s;
    }

    .grad { background: linear-gradient(135deg, var(--cyan) 0%, var(--blue) 50%, var(--violet) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

    .section-label {
      font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.15em;
      color: var(--cyan); text-transform: uppercase;
      display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
    }
    .section-label::before { content: '//'; opacity: 0.4; }
    .section-label::after { content: ''; flex: 0 0 32px; height: 1px; background: var(--cyan); opacity: 0.4; }

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
      transition: box-shadow 0.25s, transform 0.15s;
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

    /* Article prose */
    .article-body p {
      color: var(--text-secondary);
      font-size: 16px;
      line-height: 1.85;
      margin-bottom: 20px;
    }
    .article-body h2 {
      font-size: 24px; font-weight: 700; color: var(--text-primary);
      margin: 40px 0 16px; letter-spacing: -0.02em;
    }
    .article-body h3 {
      font-size: 20px; font-weight: 700; color: var(--text-primary);
      margin: 32px 0 12px;
    }
    .article-body ul, .article-body ol {
      color: var(--text-secondary); padding-left: 24px;
      margin-bottom: 20px; line-height: 1.8;
    }
    .article-body li { margin-bottom: 8px; font-size: 15px; }
    .article-body code {
      font-family: var(--font-mono); font-size: 13px;
      background: rgba(0,245,212,0.06);
      border: 1px solid rgba(0,245,212,0.12);
      color: var(--cyan); padding: 2px 7px; border-radius: 4px;
    }
    .article-body pre {
      background: #050912; border: 1px solid var(--border);
      border-radius: 12px; padding: 20px; margin: 24px 0;
      overflow-x: auto; position: relative;
    }
    .article-body pre::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, var(--cyan), transparent); opacity: 0.3;
    }
    .article-body pre code {
      font-family: var(--font-mono); font-size: 13px; color: #a8b4c8;
      background: none; border: none; padding: 0;
    }
    .article-body blockquote {
      border-left: 3px solid var(--cyan);
      padding: 14px 20px; margin: 24px 0;
      background: rgba(0,245,212,0.04); border-radius: 0 10px 10px 0;
      color: var(--text-secondary); font-style: italic; font-size: 15px; line-height: 1.75;
    }
    .article-body strong { color: var(--text-primary); font-weight: 700; }
    .article-body a { color: var(--cyan); text-decoration: none; border-bottom: 1px solid rgba(0,245,212,0.3); transition: border-color 0.2s; }
    .article-body a:hover { border-color: var(--cyan); }
    .article-body hr { border: none; border-top: 1px solid var(--border); margin: 36px 0; }

    /* Progress bar */
    .progress-bar {
      position: fixed; top: 0; left: 0; height: 2px;
      background: linear-gradient(90deg, var(--cyan), var(--blue));
      z-index: 200; transition: width 0.1s linear;
      box-shadow: 0 0 8px rgba(0,245,212,0.4);
    }

    @media(max-width:768px) { .container { padding: 0 16px; } .prose-container { padding: 0 4px; } }
  `}</style>
);

// ============================================================
// MINIMAL BACKGROUND for detail page
// ============================================================
const Background = () => (
  <>
    <div className="grid-bg" style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.25 }} />
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse at 20% 20%, rgba(0,245,212,0.03) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(59,130,246,0.03) 0%, transparent 50%)', pointerEvents: 'none' }} />
  </>
);

// ============================================================
// READING PROGRESS
// ============================================================
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const calc = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', calc, { passive: true });
    return () => window.removeEventListener('scroll', calc);
  }, []);
  return <div className="progress-bar" style={{ width: `${progress}%` }} />;
};

// ============================================================
// FORMAT CONTENT
// ============================================================
const formatContent = (content: string) => {
  const lines = content.split('\n');
  let html = '';
  let inList = false;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inList) { html += '</ul>'; inList = false; }
      return;
    }
    // Numbered list
    if (/^\d+\./.test(trimmed)) {
      if (!inList) { html += '<ul style="list-style:decimal">'; inList = true; }
      html += `<li>${trimmed.replace(/^\d+\.\s*/, '')}</li>`;
    }
    // Bullet
    else if (/^[-*]/.test(trimmed)) {
      if (!inList) { html += '<ul>'; inList = true; }
      html += `<li>${trimmed.replace(/^[-*]\s*/, '')}</li>`;
    }
    // Heading
    else if (trimmed.startsWith('## ')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<h2>${trimmed.slice(3)}</h2>`;
    }
    else if (trimmed.startsWith('# ')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<h2>${trimmed.slice(2)}</h2>`;
    }
    // Blockquote
    else if (trimmed.startsWith('> ')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<blockquote>${trimmed.slice(2)}</blockquote>`;
    }
    // Normal paragraph
    else {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<p>${trimmed}</p>`;
    }
  });

  if (inList) html += '</ul>';
  return html;
};

// ============================================================
// TAG COLOR
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
// DUMMY POSTS
// ============================================================
const DUMMY_POSTS: BlogPost[] = [
  {
    id: '1', title: '5 Tips Menjadi Web Developer Handal',
    content: `Menjadi web developer handal bukan sekadar menguasai syntax coding. Ada aspek yang lebih luas yang perlu kamu bangun setiap hari.

## 1. Konsistensi Adalah Kunci

Banyak developer yang berhenti di tengah jalan karena merasa progress lambat. Kenyataannya, coding setiap hari selama 1 jam lebih efektif daripada marathon 8 jam sekali seminggu.

Otak manusia belajar lebih baik dengan repetisi yang konsisten. Bayangkan seperti gym — kamu tidak bisa berotot dengan latihan sekali dalam seminggu.

## 2. Baca Kode Orang Lain

Salah satu cara tercepat untuk berkembang adalah membaca kode open source di GitHub. Perhatikan bagaimana developer senior menyusun arsitektur, memberi nama variabel, dan mengelola error.

> Kode yang baik adalah kode yang bisa dibaca oleh manusia, bukan hanya oleh mesin.

## 3. Build Project Nyata

Tutorial adalah titik awal, bukan tujuan. Setelah selesai tutorial, segera buat project sendiri dari nol. Tidak perlu sempurna — yang penting kamu menghadapi masalah nyata dan mencari solusinya sendiri.

## 4. Pahami Konsep, Bukan Hafal Syntax

Syntax bisa di-Google, tapi konsep tidak. Pastikan kamu benar-benar memahami:
- Bagaimana HTTP bekerja
- Apa itu REST API dan mengapa ia ada
- Perbedaan client-side dan server-side rendering
- Konsep database normalization

## 5. Network dengan Komunitas Dev

Bergabunglah dengan komunitas developer lokal maupun internasional. Diskusi, berbagi masalah, dan belajar dari pengalaman orang lain akan mempercepat growth kamu secara signifikan.`,
    excerpt: 'Menjadi web developer bukan hanya soal coding, tetapi juga soal mindset dan kebiasaan...',
    slug: '5-tips-menjadi-web-developer-handal',
    featured_image: '',
    publish_date: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    status: 'published', view_count: 150,
    tags: [{ id: '1', name: 'Web Development' }, { id: '2', name: 'Tips' }]
  },
  {
    id: '2', title: 'Tips Menggunakan AI dalam Pengembangan Web',
    content: `AI bukan ancaman bagi developer — ia adalah superpower yang bisa melipatgandakan produktivitas kamu jika digunakan dengan benar.

## AI sebagai Pair Programmer

Tools seperti GitHub Copilot, Cursor, dan ChatGPT bisa bertindak sebagai pair programmer yang selalu tersedia. Tapi ingat: AI bisa salah. Selalu review dan pahami kode yang ia generate.

## Prompt Engineering untuk Developer

Cara kamu berkomunikasi dengan AI sangat menentukan kualitas output. Beberapa tips:

- Berikan konteks yang spesifik (bahasa, framework, versi)
- Jelaskan masalah, bukan hanya minta solusi
- Iterasi — jangan terima hasil pertama begitu saja
- Minta penjelasan jika ada bagian yang tidak kamu mengerti

## Gunakan AI untuk Debugging

Paste error message dan kode relevan ke AI. Ia seringkali bisa mengidentifikasi masalah lebih cepat dari Google karena memahami konteks keseluruhan kode kamu.

> AI adalah asisten terbaik ketika kamu sudah tahu apa yang ingin kamu capai. Jika kamu tidak tahu tujuannya, AI juga tidak akan tahu.

## AI untuk Dokumentasi

Salah satu hal yang paling dibenci developer adalah menulis dokumentasi. Gunakan AI untuk generate doc dari kode yang sudah ada — tinggal review dan edit sesuai kebutuhan.`,
    excerpt: 'AI dapat menjadi alat yang sangat berguna dalam pengembangan web, berikut tips memanfaatkannya...',
    slug: 'tips-ai-pengembangan-web',
    featured_image: '',
    publish_date: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    status: 'published', view_count: 230,
    tags: [{ id: '3', name: 'AI' }, { id: '4', name: 'Web Development' }]
  },
  {
    id: '3', title: 'Laravel vs Node.js: Mana yang Lebih Baik?',
    content: `Pertanyaan ini sering muncul di komunitas developer Indonesia. Jawabannya: tergantung use case. Mari kita breakdown secara objektif.

## Laravel: Batteries Included

Laravel adalah framework PHP yang sangat mature dengan ekosistem lengkap out of the box:
- Authentication siap pakai
- ORM Eloquent yang intuitif  
- Queue dan Jobs bawaan
- Artisan CLI yang powerful

Cocok untuk: Aplikasi web tradisional, e-commerce, CMS, API yang butuh rapid development.

## Node.js: Speed dan Scalability

Node.js unggul dalam:
- Real-time applications (chat, notifications)
- High concurrency dengan event loop non-blocking
- Microservices architecture
- Sharing code antara frontend dan backend (TypeScript)

## Perbandingan Performa

Untuk request-response biasa, perbedaannya tidak signifikan dalam konteks aplikasi bisnis. Node.js memang lebih cepat raw, tapi Laravel dengan caching yang benar bisa sangat performant.

> Pilih teknologi berdasarkan masalah yang ingin kamu selesaikan, bukan berdasarkan hype di Twitter.

## Rekomendasi Pribadi

Kalau kamu baru memulai dan mau cepat productive: Laravel. Ekosistemnya mature, dokumentasinya excellent, dan banyak resource bahasa Indonesia.

Kalau kamu ingin masuk dunia microservices atau real-time: Node.js dengan TypeScript adalah pilihan yang solid.`,
    excerpt: 'Dalam dunia pengembangan web, Laravel dan Node.js adalah dua pilihan populer. Mari bahas...',
    slug: 'laravel-vs-nodejs',
    featured_image: '',
    publish_date: new Date(Date.now() - 12 * 24 * 3600 * 1000).toISOString(),
    status: 'published', view_count: 180,
    tags: [{ id: '5', name: 'Laravel' }, { id: '6', name: 'Node.js' }]
  },
  {
    id: '4', title: 'Membangun REST API dengan Golang dan Gin Framework',
    content: `Golang semakin populer untuk backend API karena performanya yang luar biasa dan simplicity-nya. Gin adalah framework HTTP yang ringan dan cepat untuk Go.

## Kenapa Golang untuk API?

Golang compiled language yang menghasilkan binary tunggal. Keuntungannya:
- Performa mendekati C/C++
- Concurrency native dengan goroutines
- Memory footprint sangat kecil
- Deploy mudah — satu binary tanpa dependencies

## Setup Project

Mulai dengan struktur folder yang clean. Pisahkan antara routes, handlers, models, dan services. Pattern yang bagus adalah mengikuti Clean Architecture atau layered architecture.

## Gin Router

Gin menyediakan routing yang sangat cepat berkat httprouter di bawahnya. Middleware system-nya juga sangat fleksibel untuk authentication, logging, dan rate limiting.

## Error Handling yang Proper

Salah satu keunggulan Go adalah error handling yang explicit. Jangan abaikan error — handle setiap kemungkinan gagal dan return response yang informative ke client.

> Go memaksa kamu untuk berpikir tentang error sejak awal. Ini terasa verbose di awal, tapi membuat kode lebih reliable di production.

## Database dengan GORM

GORM adalah ORM populer untuk Go. Meski ada yang prefer raw SQL untuk performa maksimal, GORM memberikan productivity yang jauh lebih baik untuk kebanyakan use case.`,
    excerpt: 'Golang adalah bahasa yang sangat cocok untuk membangun REST API yang cepat dan efisien...',
    slug: 'rest-api-golang-gin',
    featured_image: '',
    publish_date: new Date(Date.now() - 20 * 24 * 3600 * 1000).toISOString(),
    status: 'published', view_count: 310,
    tags: [{ id: '7', name: 'Golang' }, { id: '8', name: 'Web Development' }]
  },
  {
    id: '5', title: 'Flutter untuk Mobile Developer Pemula',
    content: `Flutter adalah framework dari Google untuk membangun aplikasi cross-platform dari satu codebase. Dengan Flutter, kamu bisa target iOS, Android, Web, dan Desktop sekaligus.

## Kenapa Flutter?

Sebelum Flutter, developer harus belajar Swift/Kotlin untuk native, atau React Native untuk cross-platform. Flutter menggunakan Dart — bahasa yang mudah dipelajari terutama jika kamu sudah familiar dengan OOP.

## Dart Language Basics

Dart adalah bahasa strongly-typed yang modern. Beberapa fitur menariknya:
- Null safety bawaan
- Async/await yang clean
- Extension methods
- Sound type system

## Widget Everything

Di Flutter, semua adalah Widget. UI dibangun dengan komposisi widget yang nested. Ini mungkin terasa asing di awal, tapi sangat powerful ketika kamu terbiasa.

> Pola pikir Flutter: "Apa yang ingin saya tampilkan?" bukan "Bagaimana saya mengatur layout ini?"

## State Management

Untuk aplikasi sederhana, setState sudah cukup. Untuk aplikasi yang lebih kompleks, pertimbangkan Provider, Riverpod, atau BLoC. Pilihannya banyak — jangan overthink, mulai saja dengan yang paling kamu pahami.

## Hot Reload = Productivity Killer untuk Rivals

Hot reload Flutter adalah salah satu developer experience terbaik yang pernah ada. Perubahan langsung terlihat tanpa perlu restart app — ini membuat iterasi UI jadi sangat cepat.`,
    excerpt: 'Flutter adalah framework yang sangat powerful untuk membangun aplikasi mobile cross-platform...',
    slug: 'flutter-mobile-developer-pemula',
    featured_image: '',
    publish_date: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
    status: 'published', view_count: 275,
    tags: [{ id: '9', name: 'Tips' }]
  },
  {
    id: '6', title: 'Deploy Aplikasi ke VPS Ubuntu: Panduan Lengkap',
    content: `Setelah aplikasi selesai dibangun, saatnya deploy ke production. VPS (Virtual Private Server) memberikan kontrol penuh atas environment kamu.

## Pilih VPS yang Tepat

Untuk awal, spesifikasi 1 vCPU dan 1GB RAM sudah cukup untuk aplikasi sederhana. Provider populer: DigitalOcean, Vultr, Linode, atau lokal seperti IDCloudHost.

## Setup Awal Server

Langkah pertama setelah dapat VPS:
1. Update sistem dengan apt update && apt upgrade
2. Buat user non-root untuk keamanan
3. Setup SSH key authentication, disable password login
4. Configure firewall dengan UFW

## Install Dependencies

Tergantung stack kamu. Untuk PHP/Laravel: install PHP, Composer, Nginx/Apache, MySQL. Untuk Golang: cukup upload binary yang sudah di-compile.

> Prinsip security: Least privilege. Setiap service hanya boleh punya akses yang ia butuhkan, tidak lebih.

## Nginx sebagai Reverse Proxy

Nginx sangat efisien sebagai reverse proxy yang meneruskan request ke aplikasi kamu. Konfigurasi server block yang benar memastikan performa dan keamanan optimal.

## SSL dengan Certbot

Aplikasi production wajib HTTPS. Certbot dari Let's Encrypt memberikan SSL certificate gratis yang bisa di-renew otomatis. Setup hanya butuh beberapa menit.

## Monitoring dan Logging

Jangan deploy dan lupakan. Setup monitoring basic dengan htop, netstat, dan pastikan logs tersimpan dengan baik. Untuk production yang lebih serius, pertimbangkan tools seperti PM2, Supervisord, atau bahkan Docker.`,
    excerpt: 'Deploying ke VPS bisa terasa menakutkan bagi developer pemula. Artikel ini panduan lengkap...',
    slug: 'deploy-vps-ubuntu-panduan-lengkap',
    featured_image: '',
    publish_date: new Date(Date.now() - 45 * 24 * 3600 * 1000).toISOString(),
    status: 'published', view_count: 420,
    tags: [{ id: '10', name: 'Web Development' }, { id: '11', name: 'Tips' }]
  },
];

// ============================================================
// MAIN DETAIL PAGE
// ============================================================
export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // Try API first
        const res = await fetch('/api/portofolio');
        const d = await res.json();
        const posts: BlogPost[] = d.blogPosts || [];
        const found = posts.find((p: BlogPost) => p.id === resolvedParams.id);
        if (found) {
          setPost(found);
          setRelatedPosts(posts.filter((p: BlogPost) => p.id !== found.id).slice(0, 3));
        } else {
          throw new Error('not found in api');
        }
      } catch {
        // Fallback to dummy
        const found = DUMMY_POSTS.find(p => p.id === resolvedParams.id);
        setPost(found || DUMMY_POSTS[0]);
        setRelatedPosts(DUMMY_POSTS.filter(p => p.id !== (found?.id || DUMMY_POSTS[0].id)).slice(0, 3));
      } finally {
        setLoading(false);
      }
    })();
  }, [resolvedParams.id]);

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <>
        <Styles />
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{ width: 44, height: 44, border: '2px solid rgba(0,245,212,0.15)', borderTopColor: 'var(--cyan)', borderRadius: '50%' }}
          />
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Styles />
        <Background />
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, position: 'relative', zIndex: 1 }}>
          <FiMessageSquare style={{ fontSize: 48, color: 'var(--text-muted)' }} />
          <h1 style={{ fontWeight: 700, fontSize: 24 }}>Article Not Found</h1>
          <Link href="/blog" className="btn-cta"><FiArrowLeft size={14} /> Back to Blog</Link>
        </div>
      </>
    );
  }

  const readTime = Math.max(1, Math.ceil((post.content?.length || 0) / 1200));

  return (
    <>
      <Styles />
      <Background />
      <ReadingProgress />

      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>

        {/* ── NAV ── */}
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            background: 'rgba(3,5,13,0.9)', backdropFilter: 'blur(24px)',
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

            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleCopy} className="btn-outline" style={{ padding: '8px 14px', fontSize: 12 }}>
                {copied ? <FiCheck size={13} style={{ color: 'var(--green)' }} /> : <FiCopy size={13} />}
                {copied ? 'Copied!' : 'Share'}
              </button>
              <Link href="/blog" className="btn-outline" style={{ padding: '8px 14px', fontSize: 12 }}>
                <FiArrowLeft size={13} /> Blog
              </Link>
            </div>
          </div>
        </motion.header>

        {/* ── ARTICLE HEADER ── */}
        <div style={{ paddingTop: 100, paddingBottom: 0 }}>
          <div className="container">
            <div className="prose-container">

              {/* Breadcrumb */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, fontSize: 12, color: 'var(--text-muted)' }}
              >
                <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="mono">Home</Link>
                <FiArrowRight size={10} />
                <Link href="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="mono">Blog</Link>
                <FiArrowRight size={10} />
                <span className="mono" style={{ color: 'var(--cyan)' }}>Article</span>
              </motion.div>

              {/* Tags */}
              {post.tags?.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                  style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}
                >
                  {post.tags.map(tag => {
                    const tc = tagColor(tag.name);
                    return (
                      <span key={tag.id} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        padding: '4px 10px', borderRadius: 4,
                        fontSize: 10, fontWeight: 600, letterSpacing: '0.06em',
                        fontFamily: 'var(--font-mono)',
                        background: tc.bg, color: tc.color, border: `1px solid ${tc.border}`,
                      }}>
                        <FiTag size={9} /> {tag.name}
                      </span>
                    );
                  })}
                </motion.div>
              )}

              {/* Title */}
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 20 }}
              >
                {post.title}
              </motion.h1>

              {/* Excerpt */}
              {post.excerpt && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 28 }}
                >
                  {post.excerpt}
                </motion.p>
              )}

              {/* Meta */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 20, fontSize: 12, color: 'var(--text-muted)', marginBottom: 36, paddingBottom: 36, borderBottom: '1px solid var(--border)' }}
              >
                {[
                  { icon: <FiCalendar size={12} />, text: new Date(post.publish_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
                  { icon: <FiClock size={12} />, text: `${readTime} min read` },
                  { icon: <FiEye size={12} />, text: `${post.view_count} views` },
                ].map(({ icon, text }) => (
                  <span key={text} className="mono" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {icon} {text}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── ARTICLE BODY ── */}
        <div style={{ paddingBottom: 80 }}>
          <div className="container">
            <div className="prose-container">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="article-body"
                dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
              />

              {/* Share / Nav */}
              <div style={{ marginTop: 56, paddingTop: 36, borderTop: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={handleCopy} className="btn-outline" style={{ padding: '10px 18px', fontSize: 13 }}>
                    {copied ? <FiCheck size={14} style={{ color: 'var(--green)' }} /> : <FiShare2 size={14} />}
                    {copied ? 'Link Copied!' : 'Share Article'}
                  </button>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Link href="/blog" className="btn-outline" style={{ padding: '10px 18px', fontSize: 13 }}>
                    <FiArrowLeft size={14} /> All Articles
                  </Link>
                  <Link href="/#kontak" className="btn-cta" style={{ padding: '10px 18px', fontSize: 13 }}>
                    <FiZap size={14} /> Hire Me
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RELATED POSTS ── */}
        {relatedPosts.length > 0 && (
          <div style={{ paddingBottom: 80, borderTop: '1px solid var(--border)' }}>
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,245,212,0.12), transparent)', marginTop: -1 }} />
            <div className="container" style={{ paddingTop: 56 }}>
              <div style={{ marginBottom: 32 }}>
                <div className="section-label">more articles</div>
                <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>
                  Keep <span className="grad">Reading</span>
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {relatedPosts.map((related, i) => {
                  const rt = Math.max(1, Math.ceil((related.content?.length || 0) / 1200));
                  return (
                    <Link key={related.id} href={`/blog/${related.id}`} style={{ textDecoration: 'none' }}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="glass"
                        style={{ padding: '20px 22px', borderRadius: 16, cursor: 'pointer', transition: 'border-color 0.3s, transform 0.25s, box-shadow 0.25s' }}
                        whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.4)' }}
                      >
                        {related.tags?.length > 0 && (
                          <div style={{ marginBottom: 10 }}>
                            {related.tags.slice(0, 2).map(tag => {
                              const tc = tagColor(tag.name);
                              return (
                                <span key={tag.id} style={{
                                  display: 'inline-flex', alignItems: 'center', gap: 3, padding: '2px 8px',
                                  marginRight: 4, borderRadius: 4, fontSize: 9, fontWeight: 600, letterSpacing: '0.06em',
                                  fontFamily: 'var(--font-mono)', background: tc.bg, color: tc.color, border: `1px solid ${tc.border}`,
                                }}>
                                  #{tag.name}
                                </span>
                              );
                            })}
                          </div>
                        )}
                        <h3 style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.45, marginBottom: 10, color: 'var(--text-primary)' }}>
                          {related.title}
                        </h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
                          <span className="mono" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <FiClock size={10} /> {rt}m
                          </span>
                          <span style={{ color: 'var(--cyan)', display: 'flex', alignItems: 'center', gap: 3, fontWeight: 700 }}>
                            Read <FiArrowRight size={10} />
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 0' }}>
          <div style={{ position: 'absolute', width: '100%', height: 1, top: 0, background: 'linear-gradient(90deg, transparent, rgba(0,245,212,0.1), transparent)' }} />
          <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <span className="mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              MFF<span style={{ color: 'var(--cyan)' }}>.dev</span> · Blog
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link href="/blog" className="btn-outline" style={{ padding: '8px 14px', fontSize: 12 }}>
                <FiArrowLeft size={12} /> All Articles
              </Link>
              <Link href="/" className="btn-cta" style={{ padding: '8px 14px', fontSize: 12 }}>
                Portfolio
              </Link>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}