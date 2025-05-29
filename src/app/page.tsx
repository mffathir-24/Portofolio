'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { FiBarChart2, FiAward, FiCode, FiDownload, FiMail,FiX, FiMessageSquare, FiLinkedin, FiInstagram, FiExternalLink, FiGithub } from 'react-icons/fi';
import { FaWhatsapp, FaTelegram, FaLine } from 'react-icons/fa';
import React from 'react';
import Image from 'next/image';

// Typing animation hook
function PaperPlaneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
  );
}


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

const sections = [
  { id: 'profil', label: 'Profil' },
  { id: 'projek', label: 'Projek' },
  { id: 'pengalaman', label: 'Pengalaman' },
  { id: 'skill', label: 'Skill' },
  { id: 'studi', label: 'Studi' },
  { id: 'testimoni', label: 'Testimoni' },
  { id: 'blog', label: 'Blog' },
  { id: 'kontak', label: 'Kontak' }
];

// Data dummy untuk projek, pengalaman, skill, studi
const projects = [
  {
    title: "Aplikasi E-Commerce Bernama DekufaShop",
    desc: "Sebuah aplikasi e-commerce yang dibangun dengan Laravel, menyediakan fitur lengkap untuk penjualan online tetapi dengan pembayaran qris/tf secara manual.",
    img: "/project/ApkE1.jpg",
    tags: ["Laravel", "Bootstrap", "Node.js"," MySQL"],
    demoUrl: "#",
    codeUrl: "#"
  },
    {
    title: "Aplikasi Pengelolaan Dokumen Akreditasi",
    desc: "Aplikasi ini membantu yang dirancang untuk meningkatkan nilai akreditasi pada prodi manajemen informatika dalam mengelola dokumen akreditasi dengan mudah, termasuk upload, pengelompokan, dan pencarian dokumen.",
    img: "/project/Apkpengelola.png",
    tags: ["Laravel", "Bootstrap", "Node.js"," MySQL"],
    demoUrl: "https://akreditasi.mi.ilkom.unsri.ac.id/login",
    codeUrl: "#"
  },
    {
    title: "Aplikasi Topup Game",
    desc: " Aplikasi ini adalah platform topup game yang memungkinkan pengguna untuk membeli voucher game dengan mudah dan cepat, yang hanya menyediakan game populer seperti ML.",
    img: "/project/topupgame.jpg",
    tags: ["Laravel", "Bootstrap", "Node.js"," MySQL"],
    demoUrl: "#",
    codeUrl: "#"
  },
    {
    title: "Aplikasi Absensi Siswa Menggunakan Face Recognition",
    desc: "Aplikasi ini adalah sistem absensi siswa yang menggunakan teknologi pengenalan wajah untuk mencatat kehadiran siswa secara otomatis, meningkatkan efisiensi dan akurasi dalam proses absensi walau masih tahab pengembangan tetapi ini sudah bisa digunakan dan semoga dapat bermanfaat kedepannya.",
    img: "/project/ApkAbsen.png",
    tags: ["Laravel", "Bootstrap", "Node.js"," MySQL","Python", "Face Recognition","Filament"],
    demoUrl: "#",
    codeUrl: "#"
  },
      {
    title: "Aplikasi Berita PT.PLN (Persero) Wilayah Sumatera Selatan, Jambi, dan Bengkulu",
    desc: "Aplikasi portal berita yang menyediakan informasi terkini dan penting dari PT.PLN (Persero) untuk wilayah Sumatera Selatan, Jambi, dan Bengkulu.",
    img: "/project/newspln.jpg",
    tags: ["Laravel", "Bootstrap", "Node.js"," MySQL"],
    demoUrl: "#",
    codeUrl: "#"
  },
  
];

const experiences = [
  {
    title: "Saya membuat aplikasi pengelolaan dokumen akreditasi untuk Prodi Manajemen Informatika",
    company: "University Sriwijaya",
    location: "Bukit Lama, Palembang,South Sumatra, Indonesia",
    year: "2024-2025",
    responsibilities: [
      "Membangun aplikasi web untuk pengelolaan dokumen akreditasi",
      "Menerapkan fitur upload, pengelompokan, dan pencarian dokumen",
      "Memastikan keamanan dan aksesibilitas data",
    ],
    skills: ["Laravel", "Node.js", "MySQL", "Bootstrap", "javascript", "HTML", "CSS"],
  },
  {
    title: "Saya bekerja paruh waktu sebagai installer Wi-Fi dan SD-WAN di PT. Enseval Megatrading Putera Tbk.Palembang",
    company: "Freelance Team Installation Wi-fi Sdwan",
    location: "Remote",
    year: "2023-2024",
    responsibilities: [
      "Melakukan instalasi dan konfigurasi jaringan Wi-Fi dan SD-WAN",
      "Memasang Perangkat keras jaringan di lokasi klien",
      "Dapat melakukan configurasi jaringan dan troubleshooting",
    ],
    skills: ["CMD", "Networking", "Troubleshooting", "Customer Service", "Teamwork"],
  },
  {
    title: "Saya membuat aplikasi e-commerce bernama DekufaShop dengan fitur pembayaran qris/tf secara manual",
    company: "Hybrid Developer",
    location: "Palembang, South Sumatra, Indonesia",
    year: "2023-2024",
    responsibilities: [
      "Mengembangkan dan memelihara aplikasi web menggunakan Laravel",
      "Bekerja sama dengan tim desain untuk implementasi UI/UX",
      "Mengoptimalkan performa aplikasi dan database",
    ],
    skills: ["Laravel", "MySQL", "CSS", "JavaScript", "HTML", "Bootstrap"],
  },
  {
    title: "Saya membuat website portal berita untuk PT.PLN Persero Wilayah Sumatera Selatan, Jambi, dan Bengkulu",
    company: "Apprenticeship at PT.PLN (Persero) Wilayah Sumatera Selatan, Jambi, dan Bengkulu",
    location: "Palembang, South Sumatra, Indonesia",
    year: "2023-2024",
    responsibilities: [
      "Mengembangkan sistem portal berita menggunakan Laravel",
      "Menerapkan fitur manajemen konten untuk berita dan artikel",
      "Hanya diperuntukan wilayah Sumatera Selatan, Jambi, dan Bengkulu",
    ],
    skills: ["Laravel", "MySQL", "CSS", "JavaScript", "HTML", "Bootstrap"],
  },
    {
    title: "Saya sebagai backend developer yang membuat web topup game, bekerja di dalam team sebanyak 3 orang, untuk projek akhir dari bootcamp",
    company: "Freelance",
    location: "Remote",
    year: "2023-2024",
    responsibilities: [
      "Sebagai pembuat database relasi untuk aplikasi topup game",
      "Membuat Alerts untuk notifikasi topup game",
      "Membuat diagram relasi database untuk aplikasi topup game",
    ],
    skills: ["Laravel", "MySQL", "ERD","Alerts", "Database Design", "Teamwork"],
  },
];

const certificates = [
  { name: 'Sertifikat Laravel Achivement Mastered Bootcamp by Sanbercode', img: '/sertifikat-laravel.jpg' },
  { name: 'Sertifikat English Conversation,Speaking and Academy Writing', img: '/englishsr.jpg' },
  { name: 'Sertifikat Seminar by Google Developer Student Clubs', img: '/seminarG.jpg' },
  { name: 'Sertifikat Apresiasi Panitia Perlengkapan', img: '/apresiasisr.jpg' },
];

const skills = [
  { name: 'Laravel', value: 95, icon: '/icons/laravel.png' },
  { name: 'PHP', value: 90, icon: '/icons/php.png' },
  { name: 'CSS', value: 85, icon: '/icons/css.png' },
  { name: 'MySQL', value: 90, icon: '/icons/mysql.png' },
  { name: 'Ai', value: 88, icon: '/icons/ai.png' },
  { name: 'NodeJS', value: 93, icon: '/icons/nodejs.png' },
];

const studies = [
    {
    school: "SMA Yayasan Pendidikan Islam (YPI) Palembang",
    major: "Ilmu Pengetahuan Sosial(IPS)",
    year: "2019-2022",
    desc: " Saya menyelesaikan pendidikan menengah di SMA YPI Palembang dengan fokus pada Ilmu Pengetahuan Sosial. Selama di sekolah, saya aktif dalam berbagai kegiatan ekstrakurikuler dan organisasi siswa.",
    achievements: [
      "Sertifikat Pramuka Siswa",
      "Sertifikat MIPA (Musyawarah Ilmiah Pelajar)",
    ]
  },
  {
    school: "University Sriwijaya",
    major: "Manajemen Informatika",
    year: "2022-2025",
    desc: "Saya sedang menempuh pendidikan di Universitas Sriwijaya, jurusan Manajemen Informatika, dengan fokus pada pengembangan web dan teknologi informasi.",
    achievements: [
      "Student of the Year 2022",
      "Completed 5+ major projects",
      "Active member of Web Development Club",
    ]
  },
];

const testimonials = [
  {
    name: 'Bayu Wijaya Putra',
    title: 'Lektor Fakultas Ilmu Komputer',
    message: 'Fathiir mahasiswa yang sangat berdedikasi dan memiliki kemampuan teknis yang luar biasa. Dia telah menunjukkan kemampuannya dalam mengembangkan aplikasi yang kompleks dengan efisiensi tinggi.'
  },
  {
    name: 'Syahlan',
    title: 'Ayah',
    message: 'Fathiir adalah anak yang sangat berbakat dan pekerja keras. Dia selalu berusaha memberikan yang terbaik dalam setiap proyek yang dia kerjakan. Saya bangga padanya.'
  },
    {
    name: 'Abdiansah',
    title: 'Kaprodi Manajemen Informatika',
    message: 'Sangat Memuaskan, sangat membantu dalam mengelola dokumen akreditasi prodi kami. Aplikasi ini sangat user-friendly dan efisien.'
  },
  {
    name: 'Purwita Sari',
    title: 'Dosen Pratikum E-Commerce',
    message: 'Aplikasi e-commerce sangat akurant dan mudah digunakan.Hanya saja fitur pembayaran masih manual.'
  },
  {
    name: 'Fitri',
    title: 'Ibu',
    message: 'Kamu harus bangga dengan dirimu sendiri, Fathiir. Kamu telah bekerja keras dan mencapai banyak hal. Teruslah belajar dan berkembang, saya selalu mendukungmu.'
  },
  {
    name: 'Eko,Meiliano,Daffa,Azzam,Alif,Fahkri',
    title: 'Teman Seperjuangan',
    message: 'Fathiir adalah teman yang sangat inspiratif. Dia selalu siap membantu dan berbagi ilmu dengan kami. Kerja kerasnya dalam mengembangkan aplikasi pengelolaan dokumen akreditasi sangat menginspirasi kami semua.'
  },
];

const blogPosts = [
  {
    title: '5 Tips Menjadi Web Developer Handal',
    date: '12 Mei 2024',
    excerpt: 'Menjadi web developer bukan hanya soal coding, tetapi juga soal mindset dan kebiasaan...'
  },
    {
    title: 'Tips Menggunakan AI dalam Pengembangan Web',
    date: '28 Mei 2025',
    excerpt: 'AI dapat menjadi alat yang sangat berguna dalam pengembangan web, berikut beberapa tips untuk memanfaatkannya...'
  },
    {
    title: 'Laravel vs Node.js: Mana yang Lebih Baik untuk Proyek Anda?',
    date: '20 Mei 2025',
    excerpt: 'Dalam dunia pengembangan web, Laravel dan Node.js adalah dua pilihan populer. Mari kita bahas kelebihan dan kekurangan masing-masing...'
  },
    {
    title: 'Mengapa Memilih Laravel untuk Proyek Web Anda',
    date: '12 Mei 2025',
    excerpt: 'Laravel adalah framework PHP yang sangat populer dan banyak digunakan. Berikut adalah beberapa alasan mengapa Anda harus memilih Laravel untuk proyek web Anda...'
  },
      {
    title: 'Cara Mudah Membangun Website',
    date: '03 Mei 2025',
    excerpt: 'Membangun website tidak harus rumit. Berikut adalah langkah-langkah mudah untuk memulai...'
  },
    {
    title: 'Mengapa Explorasi Sangat Penting dalam Pengembangan Web',
    date: '23 Mei 2025',
    excerpt: 'Dalam dunia pengembangan web yang terus berubah, eksplorasi teknologi baru sangat penting untuk tetap relevan dan inovatif...'
  },
      {
    title: 'Selalu Belajar: Kunci Sukses di Dunia Web Development',
    date: '24 Mei 2025',
    excerpt: 'Dunia web development selalu berubah, dan untuk tetap relevan, penting untuk terus belajar dan beradaptasi dengan teknologi baru...'
  },
  {
    title: 'Mengapa React Masih Jadi Pilihan Utama',
    date: '15 April 2025',
    excerpt: 'Dalam ekosistem JavaScript yang terus berkembang, React tetap menjadi pilar utama...'
  }
];



// Variants untuk animasi masuk dan keluar
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 40 }
};

const TypingTitle = React.memo(() => {
  const typedName = useTyping('Web Developer | Laravel Senior & React Junior Specialist |', 120, 3000);
  return <>{typedName}</>;
});

// Tambahkan display name
TypingTitle.displayName = "TypingTitle";


// TypingAnimation component for animated code typing effect
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
        <div key={index} className="flex">
          <span className="text-gray-500 mr-2 select-none">{index + 1}</span>
          <span>
            {typeof line === 'string'
              ? line.split('').map((char, i) => {
                let color = 'text-gray-300';
                if (char === "'" || char === '"') color = 'text-yellow-400';
                if (char === '{' || char === '}' || char === '(' || char === ')' || char === '[' || char === ']') color = 'text-white';
                if (
                  line.trim().startsWith('const') ||
                  line.trim().startsWith('function') ||
                  line.trim().startsWith('return') ||
                  line.trim().startsWith('export')
                ) {
                  color = 'text-purple-400';
                }
                return <span key={i} className={color}>{char}</span>;
              })
              : null}
          </span>
        </div>
      ))}
      <div className="flex">
        <span className="text-gray-500 mr-2 select-none">{displayedLines.length + 1}</span>
        <span className="w-4 h-6 bg-purple-400 animate-pulse inline-block"></span>
      </div>
    </div>
  );
};

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showContact, setShowContact] = useState(false);

  // Gunakan ref untuk menyimpan ukuran window hanya di client
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  // Tambahkan fungsi scroll smooth
  const handleNavClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // Tutup menu jika di mobile
    }
  };

  // ContactBubble Component
  const ContactBubble = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const socials = [
      { name: 'WhatsApp', icon: <FaWhatsapp className="text-2xl text-green-500" />, url: 'https://wa.me/6285809735614' },
      { name: 'Instagram', icon: <FiInstagram className="text-2xl text-pink-500" />, url: 'https://instagram.com/mfathir_fh' },
      { name: 'LinkedIn', icon: <FiLinkedin className="text-2xl text-blue-500" />, url: 'https://linkedin.com/in/muhammad-fathiir-farhansyah-58baa6279' },
      { name: 'Telegram', icon: <FaTelegram className="text-2xl text-blue-400" />, url: 'https://t.me/Mffathir' },
      { name: 'Line', icon: <FaLine className="text-2xl text-green-400" />, url: 'https://line.me/ti/p/5JxYtPuxe3' },
      { name: 'Email', icon: <FiMail className="text-2xl text-indigo-300" />, url: 'mailto:fathirfarhansyah24@gmail .com' },
    ];

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-gray-800/90 border border-indigo-400/30 rounded-2xl p-6 max-w-md w-full mx-4 relative shadow-2xl"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <FiX className="text-xl" />
              </button>
              <h3 className="text-xl font-bold mb-6 text-center text-indigo-200 flex items-center justify-center gap-2">
                <FiMessageSquare />
                Contact Me
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socials.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700/50 hover:bg-indigo-900/50 border border-gray-600/30 rounded-xl p-4 flex flex-col items-center gap-2 transition-all duration-300 group"
                    whileHover={{ y: -5, scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <div className="p-3 bg-gray-600/20 rounded-full group-hover:bg-indigo-500/20 transition-colors">
                      {social.icon}
                    </div>
                    <span className="text-sm font-medium">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className={`${darkMode ? 'bg-gradient-to-br from-indigo-900 to-purple-900 text-white' : 'bg-white text-black'} relative min-h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth font-sans`}>

      {/* Toggle Theme */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
        className="fixed top-4 right-4 z-50 p-2 rounded-xl backdrop-blur-md bg-white/10 hover:bg-white/20 outline-none"
      >
        {darkMode ? <Sun className="text-yellow-300" /> : <Moon className="text-gray-800" />}
      </button>

      {/* Navigation */}
      <nav className="fixed top-4 left-4 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md outline-none"
        >
          Menu
        </button>
        <ul className={`md:flex md:space-x-4 ${menuOpen ? 'block' : 'hidden'} md:block bg-white/10 backdrop-blur-md p-4 rounded-xl space-y-2 md:space-y-0`}>
          {sections.map(sec => (
            <li key={sec.id}>
              <a
                href={`#${sec.id}`}
                onClick={handleNavClick(sec.id)}
                className="block px-4 py-2 rounded hover:bg-white/20 transition cursor-pointer"
              >
                {sec.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Profil Section */}
      <AnimatePresence>
        <motion.section
          id="profil"
          className="snap-start min-h-screen flex flex-col md:flex-row justify-center items-center px-6 md:px-12 py-16 gap-12 md:gap-16 bg-gradient-to-br from-indigo-900/30 via-purple-900/10 to-gray-900/5"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Left: Text Content */}
          <motion.div 
            className="flex-1 flex flex-col items-center md:items-start text-center md:text-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Name Tag */}
            <div className="mb-6 px-4 py-2 bg-indigo-900/50 rounded-full border border-indigo-400/30 shadow-lg">
              <span className="text-sm font-medium text-indigo-200">Hello, I&apos;m</span>
            </div>

            {/* Name */}
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Muhammad Fathiir Farhansyah
            </motion.h2>

            {/* Animated Title */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.h1
                className="text-2xl md:text-4xl font-extrabold tracking-wide inline-flex items-center"
                whileHover={{ scale: 1.02 }}
              >
                <span className="border-b-4 border-indigo-400/80 pb-1 inline-flex items-center">
                  <motion.span
                    className="inline-block bg-clip-text text-transparent"
                    animate={{
                      backgroundImage: [
                        'linear-gradient(90deg, #ffffff, #ffd700)',
                        'linear-gradient(90deg, #ffd700, #ff4d4d)',
                        'linear-gradient(90deg, #ff4d4d, #ff69b4)',
                        'linear-gradient(90deg, #ff69b4, #4dffb8)',
                        'linear-gradient(90deg, #4dffb8, #4dc3ff)',
                        'linear-gradient(90deg, #4dc3ff, #ffffff)',
                      ],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <TypingTitle />
                  </motion.span>
                  <span className="inline-block h-8 w-0.5 bg-current ml-2 animate-pulse"></span>
                </span>
              </motion.h1>
            </motion.div>

            {/* Description */}
            <motion.p
              className="max-w-2xl text-base md:text-lg mb-8 text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Saya adalah seorang <span className="text-indigo-300 font-medium">web developer</span> yang berpengalaman dalam membangun aplikasi modern, scalable, dan efisien. Memiliki passion di bidang teknologi, selalu belajar hal baru, dan siap membantu Anda mewujudkan ide menjadi solusi digital yang nyata.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex gap-4 mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-lg transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <FiDownload  className="text-lg" />
                <a href="/CV-Anda.pdf" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full">Download CV</a>
              </motion.button>
              
              <motion.button
                className="px-6 py-3 bg-transparent border border-indigo-400 hover:bg-indigo-900/30 text-indigo-100 rounded-lg font-medium shadow-lg transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(99, 102, 241, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowContact(true)}
              >
                <FiMail className="text-lg" />
                Contact Me
              </motion.button>
              
            </motion.div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            className="flex-1 flex justify-center items-center relative"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
          >
            {/* Glowing Orb Background */}
            <motion.div 
              className="absolute -z-10 w-64 h-64 md:w-80 md:h-80 rounded-full bg-indigo-600/20 blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Profile Photo Container */}
            <motion.div
              className="flex-1 flex justify-center items-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8, type: 'spring' }}
            >
              <motion.div
                className="relative w-72 h-72 md:w-96 md:h-96 lg:w-112 lg:h-112 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 20px 8px rgba(255, 255, 255, 0.7)',
                    '0 0 20px 8px rgba(255, 215, 0, 0.7)',
                    '0 0 20px 8px rgba(255, 0, 0, 0.7)',
                    '0 0 20px 8px rgba(255, 105, 180, 0.7)',
                    '0 0 20px 8px rgba(0, 255, 0, 0.7)',
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <motion.img
                  src="/fatir.jpg"
                  alt="Foto Atin"
                  className="w-full h-full object-cover rounded-full border-[6px] border-white"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.98, rotate: -2 }}
                  initial={{ filter: 'blur(8px)' }}
                  animate={{ filter: 'blur(0px)' }}
                  transition={{ duration: 1.2 }}
                />
              
              {/* Floating Badge */}
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-gradient-to-br from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-xl z-20 flex items-center gap-2"
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 1, type: 'spring' }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <FiAward className="text-yellow-300" />
                <span className="text-sm font-medium">Web Developer</span>
              </motion.div>
            </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>
      </AnimatePresence>


        <AnimatePresence>
  <motion.section
    id="about"
    className="snap-start min-h-screen flex flex-col justify-center items-center px-6 py-16 bg-gradient-to-br from-gray-900 via-purple-900/20 to-indigo-900/30"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    exit="exit"
    transition={{ duration: 0.7 }}
    viewport={{ once: false, amount: 0.3 }}
  >
    <div className="w-full max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="text-lg text-indigo-200 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          The story behind the code and passion
        </motion.p>
      </motion.div>


        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Left Column - Personal Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Tentang Saya
            </h3>
            <p className="text-indigo-200 text-justify leading-relaxed tracking-wide">
                    Saya Muhammad Fathiir Farhansyah, lahir di Palembang dan saat ini berusia 20 tahun,
              Hobi saya ialah Futsal, Badminton, Renang, Coding, Gaming, Mancing. 
              Saya memiliki minat besar dalam mempelajari hal-hal baru, terutama dalam mengeksplorasi 
              teknologi, framework, dan penggunaan API seperti Python Face Recognition. Pengalaman 
              saya dalam membangun aplikasi cukup beragam, mulai dari aplikasi web sederhana hingga 
              sistem manajemen yang kompleks. Saya menguasai berbagai bahasa pemrograman dan framework, 
              dengan keahlian khusus di Laravel dan React. Selain itu, saya aktif berpartisipasi dalam 
              komunitas pengembang untuk berbagi pengetahuan dan terus mempelajari teknologi terkini.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-indigo-900/50 rounded-lg text-indigo-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-white">Experience</h4>
                  <p className="text-sm text-indigo-300">2,5+ years in web development</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-2 bg-indigo-900/50 rounded-lg text-indigo-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-white">Education</h4>
                  <p className="text-sm text-indigo-300">Informatics Management</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Skills */}
                {/* Laptop Animation */}
      <div className="relative">
        {/* Laptop Frame */}
        <motion.div
          className="relative mx-auto w-full max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Laptop Screen */}
          <div className="relative bg-gray-800 rounded-t-xl border-t-8 border-gray-700 pt-6 px-4 pb-4 shadow-2xl">
            {/* Screen Bezel */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-gray-900 rounded-t-lg flex items-center px-4">
              <div className="flex space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
              </div>
            </div>

            {/* Code Display */}
            <div className="bg-gray-900 rounded-lg overflow-hidden h-96">
              {/* Code Editor Header */}
              <div className="bg-gray-800 px-4 py-2 flex items-center">
                <div className="flex space-x-2 mr-4">
                  <span className="w-2 h-2 rounded-full bg-gray-600"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-600"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-600"></span>
                </div>
                <span className="text-xs text-gray-400">about-me.js</span>
              </div>

              {/* Animated Code */}
              <div className="p-4 font-mono text-sm">
                <TypingAnimation
                  lines={[
                    "const aboutMe = {",
                    "  name: 'Muhammad Fathiir Farhansyah',",
                    "  role: 'Full Stack Developer',",
                    "  skills: ['React', 'Node.js', 'Laravel'],",
                    "  passion: 'Creating beautiful, functional applications',",
                    "  experience: '2,5+ years in web development',",
                    "  education: 'Informatics Management',",
                    "  hobbies: ['Coding', 'Photography', 'Gaming']",
                    "};",
                    "",
                    "function myApproach() {",
                    "  return {",
                    "    design: 'Clean & intuitive interfaces',",
                    "    code: 'Efficient and maintainable',",
                    "    philosophy: 'Continuous learning',",
                    "    focus: 'User experience first'",
                    "  };",
                    "}",
                    "",
                    "export default aboutMe;"
                  ]}
                  speed={30}
                  className="text-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Laptop Base */}
          <div className="h-4 bg-gray-700 mx-auto w-3/4 rounded-b-xl shadow-lg"></div>
          <div className="h-2 bg-gray-600 mx-auto w-1/2 rounded-b-lg"></div>
        </motion.div>

        </div>
      </div>
    </div>
  </motion.section>
</AnimatePresence>

      {/* Projek Section */}
      <AnimatePresence>
        <motion.section
          id="projek"
          className="snap-start min-h-screen flex flex-col justify-center items-center px-6 py-16 bg-gradient-to-b from-indigo-900/20 to-purple-900/10 relative overflow-hidden"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Falling Stars Animation */}
          {windowSize.width > 0 && [...Array(8)].map((_, i) => {
            return (
              <motion.div
                key={`star-${i}`}
                className="absolute text-yellow-300 text-xl"
                initial={{ 
                  opacity: 0,
                  y: -50,
                  x: Math.random() * window.innerWidth
                }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, window.innerHeight],
                  x: Math.random() * 100 - 50
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-50px`
                }}
              >
                ★
              </motion.div>
            );
          })}

          {/* Floating Bubbles */}
          {windowSize.width > 0 && [...Array(12)].map((_, i) => {
            const xPos = Math.random() * windowSize.width;
            const yPos = Math.random() * windowSize.height;
            return (
              <motion.div
                key={`bubble-${i}`}
                className="absolute rounded-full bg-purple-500/20 backdrop-blur-sm"
                initial={{
                  opacity: 0,
                  y: yPos,
                  x: xPos,
                  scale: 0
                }}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  y: [0, -100],
                  x: [0, xPos + Math.random() * 100 - 50],
                  scale: [0.5, 1.2, 0.8]
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut"
                }}
                style={{
                  width: `${10 + Math.random() * 20}px`,
                  height: `${10 + Math.random() * 20}px`,
                  left: `${(xPos / windowSize.width) * 100}%`
                }}
              />
            );
          })}

          <motion.div className="w-full max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2
                className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                My Projects
              </motion.h2>
              <motion.p
                className="text-lg text-indigo-200 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Jelajahi portofolio karya kreatif dan solusi teknis saya
              </motion.p>
            </motion.div>

            {/* Projects Grid - Mobile Version (Carousel) */}
            <div className="md:hidden w-full overflow-x-auto pb-4">
              <div className="flex gap-4 px-4 w-max">
                {projects.map((proj, idx) => (
                  <motion.div
                    key={proj.title}
                    className="w-64 flex-shrink-0"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-full bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-indigo-400/30 transition-all duration-300 flex flex-col">
                      <div className="relative overflow-hidden h-40">
                        <Image    
                          src={proj.img}
                          alt={proj.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold mb-2 text-white">{proj.title}</h3>
                        <p className="text-sm text-indigo-200 mb-3 line-clamp-2">{proj.desc}</p>
                        <div className="flex gap-2 mt-auto">
                          <a
                            href={proj.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center gap-1"
                          >
                            <FiExternalLink size={12} />
                            Visit Site
                          </a>
                          <a
                            href={proj.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 text-xs bg-transparent border border-indigo-400 hover:bg-indigo-900/30 text-indigo-100 rounded-lg font-medium transition-colors flex items-center gap-1"
                          >
                            <FiGithub size={12} />
                            Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Projects Grid - Desktop Version */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
              {projects.map((proj, idx) => (
                <motion.div
                  key={proj.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {/* Project Card */}
                  <motion.div
                    className="h-full bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-indigo-400/30 hover:border-indigo-300/50 transition-all duration-300 flex flex-col"
                    whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(99, 102, 241, 0.2)" }}
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-56">
                      <motion.img
                        src={proj.img}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        initial={{ scale: 1.1 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.7 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <motion.h3
                        className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {proj.title}
                      </motion.h3>
                      
                      <motion.p
                        className="text-indigo-200 mb-4 flex-1"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {proj.desc}
                      </motion.p>

                      {/* Tags */}
                      {proj.tags && (
                        <motion.div 
                          className="flex flex-wrap gap-2 mb-4"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          {proj.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 bg-indigo-900/50 rounded-full text-indigo-200">
                              {tag}
                            </span>
                          ))}
                        </motion.div>
                      )}

                      {/* CTA Buttons */}
                      <motion.div
                        className="flex gap-3 mt-auto pt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.a
                          href={proj.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FiExternalLink />
                          Visit Site
                        </motion.a>
                        <motion.a
                          href={proj.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 text-sm bg-transparent border border-indigo-400 hover:bg-indigo-900/30 text-indigo-100 rounded-lg font-medium transition-colors flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FiGithub />
                          View Code
                        </motion.a>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>
      </AnimatePresence>

      {/* Pengalaman Section */}
<AnimatePresence>
  <motion.section
    id="pengalaman"
    className="snap-start min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-16 bg-gradient-to-b from-indigo-900/20 to-purple-900/10 relative overflow-hidden"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    exit="exit"
    transition={{ duration: 0.7 }}
    viewport={{ once: false, amount: 0.2 }}
  >

        {/* Curved Flying Paper Plane (Main) */}
{windowSize.width > 0 && windowSize.height > 0 && (
  <motion.div
    className="absolute top-0 right-0 text-indigo-300/40 z-0"
    initial={{ x: 0, y: 0, rotate: -45 }}
    animate={{
      x: [-20, -windowSize.width + 80],
      y: [0, windowSize.height - 80],
      rotate: [-45, -45], // arah kepala pesawat tetap ke kiri bawah
    }}
    transition={{
      duration: 18,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    <PaperPlaneIcon className="w-12 h-12" />
  </motion.div>
)}

    {/* Decorative paper planes */}
    <motion.div 
      className="absolute top-10 left-5 text-indigo-300/30"
      animate={{
        x: [0, 20, 0],
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <PaperPlaneIcon className="w-8 h-8" />
    </motion.div>
    <motion.div 
      className="absolute bottom-20 right-8 text-purple-300/30"
      animate={{
        x: [0, -15, 0],
        y: [0, 10, 0],
        rotate: [0, -5, 5, 0]
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
    >
      <PaperPlaneIcon className="w-10 h-10" />
    </motion.div>
    
    <div className="w-full max-w-6xl mx-auto relative z-10">
      {/* Section Header */}
      <motion.div
        className="text-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          My Experience
        </motion.h2>
        <motion.p
          className="text-sm sm:text-lg text-indigo-200 max-w-2xl mx-auto px-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Karir dan pengalaman yang pernah saya lakukan
        </motion.p>
      </motion.div>

      {/* Timeline - Mobile First Approach */}
      <div className="relative">
        {/* Timeline line - hidden on mobile, shown on md+ */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-indigo-400/30"></div>
        
        {/* Mobile timeline line */}
        <div className="md:hidden absolute left-4 sm:left-6 transform h-full w-0.5 bg-indigo-400/30"></div>

        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.title}
            className={`relative mb-6 sm:mb-8 w-full pl-10 sm:pl-12 md:pl-0 ${idx % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} md:w-1/2 ${idx % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Timeline dot */}
            <div className={`absolute top-6 rounded-full w-3 h-3 sm:w-4 sm:h-4 bg-indigo-400 border-2 border-indigo-200 left-0 md:left-auto ${idx % 2 === 0 ? 'md:-right-2' : 'md:-left-2'}`}></div>
            
            {/* Experience Card */}
            <motion.div
              className="bg-white/5 backdrop-blur-sm md:backdrop-blur-md rounded-lg md:rounded-xl shadow-lg md:shadow-xl overflow-hidden border border-indigo-400/30 hover:border-indigo-300/50 transition-all duration-300 group"
              whileHover={{ y: -3, boxShadow: "0 5px 15px -3px rgba(99, 102, 241, 0.3)" }}
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                  <motion.h3
                    className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {exp.title}
                  </motion.h3>
                  <motion.span
                    className="px-2 py-1 sm:px-3 sm:py-1 bg-indigo-900/50 rounded-full text-xs sm:text-sm text-indigo-200 w-fit"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {exp.year}
                  </motion.span>
                </div>

                <motion.p
                  className="text-sm sm:text-base text-indigo-200 mb-3 sm:mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {exp.company} • {exp.location}
                </motion.p>

                <motion.ul
                  className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {exp.responsibilities.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start text-indigo-100"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                    >
                      <span className="text-indigo-400 mr-2 mt-1 text-xs">▹</span>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Skills */}
                {exp.skills && (
                  <motion.div
                    className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-indigo-400/20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h4 className="text-xs sm:text-sm font-semibold text-indigo-300 mb-1 sm:mb-2">Skills Applied:</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-2 sm:py-1 bg-indigo-900/50 rounded-full text-indigo-200"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
</AnimatePresence>


      {/* Skill Section */}
      <AnimatePresence>
  <motion.section
    id="skill"
    className="snap-start min-h-screen flex flex-col justify-center items-center px-4 py-12 md:py-20 bg-gradient-to-b from-indigo-900/20 to-purple-900/10"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    exit="exit"
    transition={{ duration: 0.7 }}
    viewport={{ once: false, amount: 0.3 }}
  >
    <motion.h2 
      className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      My Skills & Certifications
    </motion.h2>

    <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 md:gap-12">
      {/* Left Column - Skill Bars */}
      <div className="flex-1 space-y-8">
        <motion.h3 
          className="text-xl font-semibold text-indigo-200 mb-6 flex items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <FiBarChart2 className="text-indigo-400" />
          Skill Proficiency
        </motion.h3>
        
        {skills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            className="group relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between mb-2">
                <span className="font-medium text-indigo-100 flex items-center gap-2">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
                {skill.name}
                </span>
              <span className="text-indigo-300 font-mono">{skill.value}%</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full shadow-lg relative"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.value}%` }}
                transition={{ duration: 1.2, delay: idx * 0.1, type: 'spring' }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right Column - Certifications & Skills */}
      <div className="flex-1 flex flex-col gap-8">
        {/* Certifications Section */}
        <div>
          <motion.h3 
            className="text-xl font-semibold text-indigo-200 mb-6 flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <FiAward className="text-indigo-400" />
            Certifications
          </motion.h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {certificates.map((cert, idx) => (
              <motion.div
                key={cert.name}
                className="relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-600/30 rounded-xl blur-md group-hover:blur-lg transition-all duration-300 -z-10"></div>
                <div className="h-full bg-white/5 rounded-xl shadow-lg border border-indigo-400/30 hover:border-indigo-300 transition-all overflow-hidden flex flex-col">
                  <motion.img
                    src={cert.img}
                    alt={cert.name}
                    className="w-full h-24 object-contain p-2 bg-white/5"
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                  />
                  <div className="p-2 text-center bg-gradient-to-t from-black/70 to-transparent">
                    <span className="text-xs font-medium text-indigo-100">{cert.name}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div>
          <motion.h3 
            className="text-xl font-semibold text-indigo-200 mb-6 flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <FiCode className="text-indigo-400" />
            Tech Stack
          </motion.h3>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {[
              { name: 'HTML', icon: '/icons/html.png', color: 'from-orange-500 to-orange-300' },
              { name: 'CSS', icon: '/icons/css.png', color: 'from-blue-500 to-blue-300' },
              { name: 'JavaScript', icon: '/icons/js.png', color: 'from-yellow-500 to-yellow-300' },
              { name: 'React', icon: '/icons/react.png', color: 'from-cyan-500 to-blue-500' },
              { name: 'Tailwind', icon: '/icons/tailwind.png', color: 'from-teal-400 to-cyan-400' },
              { name: 'Git', icon: '/icons/git.png', color: 'from-red-500 to-orange-500' },
              { name: 'Node.js', icon: '/icons/nodejs.png', color: 'from-green-500 to-lime-400' },
              { name: 'Bootstrapt', icon: '/icons/Bootstrapt.png', color: 'from-blue-600 to-blue-400' },
              { name: 'Python', icon: '/icons/py.png', color: 'from-gray-800 to-gray-600' },
              { name: 'UML', icon: '/icons/uml.png', color: 'from-purple-600 to-pink-500' },
              { name: 'Photoshop', icon: '/icons/ps.png', color: 'from-blue-600 to-blue-400' },
              { name: 'Microsoft Ofice', icon: '/icons/ofice.png', color: 'from-gray-800 to-gray-600' },
              { name: 'Capcut', icon: '/icons/capcut.png', color: 'from-purple-600 to-pink-500' },
            ].map((skill, idx) => (
              <motion.div
                key={skill.name}
                className="group relative"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-md -z-10"></div>
                <div className="flex flex-col items-center justify-center bg-white/5 rounded-xl shadow-lg border border-indigo-400/20 p-4 hover:bg-white/10 hover:border-indigo-300/50 hover:shadow-indigo-500/20 transition-all duration-300 h-full">
                  <div className="w-12 h-12 mb-3 flex items-center justify-center">
                    <Image 
                      src={skill.icon}
                      alt={skill.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                  <span className="text-xs font-medium text-center text-indigo-100 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.section>
</AnimatePresence>
      {/* Studi Section */}
      <AnimatePresence>
  <motion.section
    id="studi"
    className="snap-start min-h-screen flex flex-col justify-center items-center px-6 py-16 bg-gradient-to-b from-indigo-900/20 to-purple-900/10"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    exit="exit"
    transition={{ duration: 0.7 }}
    viewport={{ once: false, amount: 0.3 }}
  >
    <div className="w-full max-w-4xl mx-auto">
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Education Journey
        </motion.h2>
        <motion.p
          className="text-lg text-indigo-200 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          My academic achievements and learning milestones
        </motion.p>
      </motion.div>

      {/* Education Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-purple-400/50 to-indigo-400/50"></div>

        {studies.map((study, idx) => (
          <motion.div
            key={study.school}
            className="relative pl-12 md:pl-0 mb-8 w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            viewport={{ once: true }}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-6 rounded-full w-4 h-4 bg-purple-400 border-2 border-purple-200 z-10"></div>

            {/* Education Card */}
            <motion.div
              className="bg-white/5 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-indigo-400/30 hover:border-purple-300/50 transition-all duration-300 group"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.2)" }}
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3 gap-2">
                  <motion.h3
                    className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {study.school}
                  </motion.h3>
                  <motion.span
                    className="px-3 py-1 bg-purple-900/50 rounded-full text-sm text-purple-200 self-start md:self-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {study.year}
                  </motion.span>
                </div>

                <motion.div
                  className="flex items-center gap-2 text-indigo-300 mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  <span className="font-medium">{study.major}</span>
                </motion.div>

                <motion.p
                  className="text-indigo-200 mb-4 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {study.desc}
                </motion.p>

                {/* Achievements */}
                {study.achievements && (
                  <motion.div
                    className="mt-4 pt-4 border-t border-indigo-400/20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className="text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {study.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start text-indigo-100"
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.05 }}
                        >
                          <span className="text-purple-400 mr-2 mt-1">•</span>
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
</AnimatePresence>

      {/* Testimoni, Blog, Kontak (tetap seperti sebelumnya) */}
      {sections.slice(5).map((section) => (
        <AnimatePresence key={section.id}>
          <motion.section
            id={section.id}
            className={`snap-start min-h-screen flex flex-col justify-center items-center px-6 py-16 ${
              section.id === 'testimoni' ? 'bg-gradient-to-b from-purple-900/10 to-indigo-900/20' : 
              section.id === 'blog' ? 'bg-gradient-to-b from-gray-900/10 to-indigo-900/10' :
              'bg-gradient-to-b from-indigo-900/20 to-purple-900/10'
            }`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            {/* Section Header */}
            <motion.div
              className="text-center mb-12 w-full max-w-6xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2
                className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {section.label}
              </motion.h2>
            </motion.div>

            {/* Testimonial Section */}
            {section.id === 'testimoni' && (
              <div className="w-full max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
                  {testimonials.map((testi, index) => (
                    <motion.div
                      key={index}
                      className="relative group"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-300 -z-10"></div>
                      <div className="h-full bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-xl border border-indigo-400/30 hover:border-purple-300/50 transition-all duration-300">
                        <div className="flex items-start mb-4">
                          <div className="text-4xl font-serif text-purple-400/50 mr-4">&quot;</div>
                          <p className="text-lg italic text-indigo-100 flex-1">&quot;{testi.message}&quot;</p>
                        </div>
                        <div className="flex items-center mt-6">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-4">
                            {testi.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-white">{testi.name}</h4>
                            <p className="text-sm text-purple-300">{testi.title}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Blog Section */}
            {section.id === 'blog' && (
              <div className="w-full max-w-4xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {blogPosts.map((post, index) => (
                    <motion.div
                      key={index}
                      className="group relative overflow-hidden rounded-xl shadow-2xl"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                      <div className="relative z-10 h-full bg-white/5 backdrop-blur-md border border-indigo-400/30 hover:border-purple-300/50 transition-all duration-300">
                        <div className="p-6">
                          <span className="text-xs font-semibold px-3 py-1 bg-indigo-900/50 rounded-full text-indigo-300 mb-2 inline-block">
                            {post.date}
                          </span>
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-indigo-200 mb-4">{post.excerpt}</p>
                          <motion.button
                            className="px-4 py-2 text-sm bg-transparent border border-indigo-400 hover:bg-indigo-900/30 text-indigo-100 rounded-lg font-medium transition-colors flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Read More
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Section */}
            {section.id === 'kontak' && (
              <div className="w-full max-w-4xl mx-auto">
                <motion.div
                  className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-indigo-400/30 p-8 md:p-12"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold text-center mb-8 text-white">Get In Touch</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <motion.form
                      action="https://formspree.io/f/xpwdvwvr"
                      method="POST"
                      className="space-y-6"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-indigo-300 mb-1">Name</label>
                        <input
                          type="text"
                          id="name"
                          name='name'
                          className="w-full px-4 py-3 bg-white/10 border border-indigo-400/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-indigo-400/70"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-indigo-300 mb-1">Email</label>
                        <input
                          type="email"
                          id="email"
                          name='email'
                          className="w-full px-4 py-3 bg-white/10 border border-indigo-400/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-indigo-400/70"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-indigo-300 mb-1">Message</label>
                        <textarea
                          id="message"
                          name='message'
                          rows={4}
                          className="w-full px-4 py-3 bg-white/10 border border-indigo-400/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-indigo-400/70"
                          placeholder="Your message here..."
                        ></textarea>
                      </div>
                      <motion.button
                        type="submit"
                        className="w-full px-6 py-3 bg-transparent border-2 border-purple-500 text-white font-medium rounded-lg shadow-lg hover:bg-purple-900/30 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Send Message
                      </motion.button>
                    </motion.form>

                    {/* Contact Info */}
                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-indigo-900/50 rounded-lg text-indigo-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">Email</h4>
                          <a href="mailto:contact@example.com" className="text-indigo-300 hover:text-purple-300 transition-colors">fathirfarhansyah24@gmail.com</a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-indigo-900/50 rounded-lg text-indigo-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">Phone</h4>
                          <a href="tel:+1234567890" className="text-indigo-300 hover:text-purple-300 transition-colors">+62 858-0973-5614</a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-indigo-900/50 rounded-lg text-indigo-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">Location</h4>
                          <p className="text-indigo-300">Kalidoni,Palembang,Sumatera Selatan,Indonesia</p>
                        </div>
                      </div>

                      {/* CV Download Button */}
                      <motion.div
                        className="pt-6 mt-6 border-t border-indigo-400/20"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <motion.button
                          className="w-full px-6 py-3 bg-transparent border-2 border-purple-500 text-white font-medium rounded-lg shadow-lg hover:bg-purple-900/30 transition-all duration-300 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download My CV
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.section>
        </AnimatePresence>
      ))}
      
      {/* Tombol di section profil */}
      <motion.button
        className="px-6 py-3 bg-transparent border border-indigo-400 hover:bg-indigo-900/30 text-indigo-100 rounded-lg font-medium shadow-lg transition-all duration-300 flex items-center gap-2"
        whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(99, 102, 241, 0.2)" }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowContact(true)}
      >
        <FiMail className="text-lg" />
        Contact Me
      </motion.button>

      {/* Jika ada tombol mengambang di pojok kanan bawah */}
      <button
        onClick={() => setShowContact(true)}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg flex items-center gap-2"
      >
        <FiMessageSquare className="text-2xl" />
        <span className="hidden md:inline-block font-medium">Contact Me</span>
      </button>

      {/* Bubble */}
      <ContactBubble isOpen={showContact} onClose={() => setShowContact(false)} />
        
    </div>
  );
}
