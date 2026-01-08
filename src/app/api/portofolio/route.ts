import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://salty-juditha-mffathir24-b1918382.koyeb.app/api/v1';
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://salty-juditha-mffathir24-b1918382.koyeb.app';

// Helper function to convert relative image URLs to absolute URLs
function resolveImageUrl(imageUrl: unknown): string | null {
  if (!imageUrl || typeof imageUrl !== 'string') return null;
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  if (imageUrl.startsWith('/uploads/')) {
    return `${BACKEND_BASE_URL}${imageUrl}`;
  }
  return imageUrl;
}

// Helper function to resolve all image URLs in an object recursively
function resolveImageUrls(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(item => resolveImageUrls(item));
  }
  if (obj !== null && typeof obj === 'object') {
    const resolved: Record<string, unknown> = {};
    for (const key in obj) {
      const value = (obj as Record<string, unknown>)[key];
      // Hanya proses field yang berkaitan dengan image/icon
      if (key.includes('image') || key.includes('icon') || key.includes('avatar') || key.includes('featured')) {
        if (key.endsWith('_url') || key === 'icon' || key === 'image' || key === 'avatar') {
          resolved[key] = resolveImageUrl(value);
        } else {
          resolved[key] = value; // Pertahankan nilai asli untuk field non-URL
        }
      } else {
        resolved[key] = resolveImageUrls(value);
      }
    }
    return resolved;
  }
  return obj;
}

// Dummy data fallback yang sesuai dengan struktur frontend
const dummyData = {
  sections: [
    { 
      id: '1', 
      section_id: 'profil', 
      label: 'Profil', 
      display_order: 1, 
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '2', 
      section_id: 'about', 
      label: 'About', 
      display_order: 2, 
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '3', 
      section_id: 'projek', 
      label: 'Projek', 
      display_order: 3, 
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '4', 
      section_id: 'pengalaman', 
      label: 'Pengalaman', 
      display_order: 4, 
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '5', 
      section_id: 'skill', 
      label: 'Skill', 
      display_order: 5, 
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '6', 
      section_id: 'studi', 
      label: 'Studi', 
      display_order: 6, 
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '7', 
      section_id: 'testimoni', 
      label: 'Testimoni', 
      display_order: 7, 
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '8', 
      section_id: 'blog', 
      label: 'Blog', 
      display_order: 8, 
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '9', 
      section_id: 'kontak', 
      label: 'Kontak', 
      display_order: 9, 
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  
  projects: [
    {
      id: '1',
      title: 'Aplikasi E-Commerce Bernama DekufaShop',
      description: 'Sebuah aplikasi e-commerce yang dibangun dengan Laravel, menyediakan fitur lengkap untuk penjualan online tetapi dengan pembayaran qris/tf secara manual.',
      image_url: '/project/ApkE1.jpg',
      demo_url: '#',
      code_url: 'https://github.com/mffathir-24/E-Commerce.git',
      display_order: 1,
      is_featured: true,
      status: 'completed',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z',
      tags: [
        { id: '1', name: 'Laravel', color: '#FF2D20', created_at: '2024-01-15T10:00:00Z' },
        { id: '2', name: 'Bootstrap', color: '#7952B3', created_at: '2024-01-15T10:00:00Z' },
        { id: '3', name: 'Node.js', color: '#339933', created_at: '2024-01-15T10:00:00Z' },
        { id: '4', name: 'MySQL', color: '#4479A1', created_at: '2024-01-15T10:00:00Z' }
      ]
    },
    {
      id: '2',
      title: 'Aplikasi Pengelolaan Dokumen Akreditasi',
      description: 'Aplikasi ini membantu yang dirancang untuk meningkatkan nilai akreditasi pada prodi manajemen informatika dalam mengelola dokumen akreditasi dengan mudah, termasuk upload, pengelompokan, dan pencarian dokumen.',
      image_url: '/project/Apkpengelola.png',
      demo_url: '#',
      code_url: 'https://github.com/mffathir-24/Akre_MI.git',
      display_order: 2,
      is_featured: true,
      status: 'completed',
      created_at: '2024-02-20T10:00:00Z',
      updated_at: '2024-02-20T10:00:00Z',
      tags: [
        { id: '1', name: 'Laravel', color: '#FF2D20', created_at: '2024-02-20T10:00:00Z' },
        { id: '2', name: 'Bootstrap', color: '#7952B3', created_at: '2024-02-20T10:00:00Z' },
        { id: '3', name: 'Node.js', color: '#339933', created_at: '2024-02-20T10:00:00Z' },
        { id: '4', name: 'MySQL', color: '#4479A1', created_at: '2024-02-20T10:00:00Z' }
      ]
    },
    {
      id: '3',
      title: 'Aplikasi Topup Game',
      description: 'Aplikasi ini adalah platform topup game yang memungkinkan pengguna untuk membeli voucher game dengan mudah dan cepat, yang hanya menyediakan game populer seperti ML.',
      image_url: '/project/topupgame.jpg',
      demo_url: '#',
      code_url: 'https://github.com/mffathir-24/TopUp-Game-ML.git',
      display_order: 3,
      is_featured: false,
      status: 'completed',
      created_at: '2024-03-10T10:00:00Z',
      updated_at: '2024-03-10T10:00:00Z',
      tags: [
        { id: '1', name: 'Laravel', color: '#FF2D20', created_at: '2024-03-10T10:00:00Z' },
        { id: '2', name: 'Bootstrap', color: '#7952B3', created_at: '2024-03-10T10:00:00Z' },
        { id: '3', name: 'Node.js', color: '#339933', created_at: '2024-03-10T10:00:00Z' },
        { id: '4', name: 'MySQL', color: '#4479A1', created_at: '2024-03-10T10:00:00Z' }
      ]
    },
    {
      id: '4',
      title: 'Aplikasi Absensi Siswa Menggunakan Face Recognition',
      description: 'Aplikasi ini adalah sistem absensi siswa yang menggunakan teknologi pengenalan wajah untuk mencatat kehadiran siswa secara otomatis, meningkatkan efisiensi dan akurasi dalam proses absensi walau masih tahab pengembangan tetapi ini sudah bisa digunakan dan semoga dapat bermanfaat kedepannya.',
      image_url: '/project/ApkAbsen.png',
      demo_url: '#',
      code_url: 'https://github.com/mffathir-24/Absen-Face_Recognition.git',
      display_order: 4,
      is_featured: true,
      status: 'in_progress',
      created_at: '2024-04-05T10:00:00Z',
      updated_at: '2024-04-05T10:00:00Z',
      tags: [
        { id: '1', name: 'Laravel', color: '#FF2D20', created_at: '2024-04-05T10:00:00Z' },
        { id: '2', name: 'Bootstrap', color: '#7952B3', created_at: '2024-04-05T10:00:00Z' },
        { id: '3', name: 'MySQL', color: '#4479A1', created_at: '2024-04-05T10:00:00Z' },
        { id: '5', name: 'Python', color: '#3776AB', created_at: '2024-04-05T10:00:00Z' },
        { id: '6', name: 'Face Recognition', color: '#FF6B6B', created_at: '2024-04-05T10:00:00Z' }
      ]
    },
    {
      id: '5',
      title: 'Aplikasi Berita PT.PLN (Persero) Wilayah Sumatera Selatan, Jambi, dan Bengkulu',
      description: 'Aplikasi portal berita yang menyediakan informasi terkini dan penting dari PT.PLN (Persero) untuk wilayah Sumatera Selatan, Jambi, dan Bengkulu.',
      image_url: '/project/newspln.jpg',
      demo_url: '#',
      code_url: 'https://github.com/mffathir-24/Berita-PT-PLN-Palembang.git',
      display_order: 5,
      is_featured: false,
      status: 'completed',
      created_at: '2024-05-12T10:00:00Z',
      updated_at: '2024-05-12T10:00:00Z',
      tags: [
        { id: '1', name: 'Laravel', color: '#FF2D20', created_at: '2024-05-12T10:00:00Z' },
        { id: '2', name: 'Bootstrap', color: '#7952B3', created_at: '2024-05-12T10:00:00Z' },
        { id: '3', name: 'Node.js', color: '#339933', created_at: '2024-05-12T10:00:00Z' },
        { id: '4', name: 'MySQL', color: '#4479A1', created_at: '2024-05-12T10:00:00Z' }
      ]
    },
    {
      id: '6',
      title: 'Aplikasi Penjualan Pempek Palembang Secara Online',
      description: 'Aplikasi ini adalah platform penjualan pempek Palembang secara online, memungkinkan pengguna untuk memesan dan membeli pempek dengan mudah walaupun berbeda pulau.',
      image_url: '/project/pempek.png',
      demo_url: '#',
      code_url: 'https://github.com/mffathir-24/Pempek-Online',
      display_order: 6,
      is_featured: true,
      status: 'published',
      created_at: '2024-06-18T10:00:00Z',
      updated_at: '2024-06-18T10:00:00Z',
      tags: [
        { id: '1', name: 'Laravel', color: '#FF2D20', created_at: '2024-06-18T10:00:00Z' },
        { id: '2', name: 'Bootstrap', color: '#7952B3', created_at: '2024-06-18T10:00:00Z' },
        { id: '3', name: 'Tailwind', color: '#06B6D4', created_at: '2024-06-18T10:00:00Z' },
        { id: '4', name: 'Node.js', color: '#339933', created_at: '2024-06-18T10:00:00Z' },
        { id: '5', name: 'MySQL', color: '#4479A1', created_at: '2024-06-18T10:00:00Z' }
      ]
    },
    {
      id: '7',
      title: 'Aplikasi Untuk System Auditi Pada Universitas Sriwijaya',
      description: 'Aplikasi ini adalah sistem auditi yang dirancang untuk membantu Universitas Sriwijaya dalam mengelola dan memantau proses audit internal secara efisien.Tetapi Aplikasi ini masih dalam tahap pengembangan dan sudah memasuki tahap testing. mungkin akan ada beberapa bug yang harus diperbaiki jadi kedepannya akan di update oleh tim pengembang yang ada disana.',
      image_url: '/project/auditi.png',
      demo_url: '#',
      code_url: 'https://github.com/mffathir-24/System-Audit_Unsri.git',
      display_order: 6,
      is_featured: true,
      status: 'published',
      created_at: '2025-07-10T10:00:00Z',
      updated_at: '2024-08-18T10:00:00Z',
      tags: [
        { id: '1', name: 'Laravel', color: '#FF2D20', created_at: '2024-06-18T10:00:00Z' },
        { id: '2', name: 'Bootstrap', color: '#7952B3', created_at: '2024-06-18T10:00:00Z' },
        { id: '3', name: 'Tailwind', color: '#06B6D4', created_at: '2024-06-18T10:00:00Z' },
        { id: '4', name: 'Node.js', color: '#339933', created_at: '2024-06-18T10:00:00Z' },
        { id: '5', name: 'MySQL', color: '#4479A1', created_at: '2024-06-18T10:00:00Z' },
        { id: '6', name: 'API', color: '#0F172A', created_at: '2024-06-18T10:00:00Z' }
      ]
    },
    {
      id: '8',
      title: 'Aplikasi Profile Perusahaan Berbasis Web dengan Penerapan AI di PT. Lematang Coal Lestari',
      description: 'Aplikasi ini adalah website profile perusahaan yang memanfaatkan teknologi AI untuk meningkatkan interaksi pengguna dan memberikan informasi yang lebih personalisasi tentang PT. Lematang Coal Lestari. Dengan kesediaan AI lokasi perusahaan dapat dengan mudah ditemukan dari mencari hotel terdekat, restoran terdekat, dan lain-lain.',
      image_url: '/project/ptlematangcoallestari.png',
      demo_url: '#',
      code_url: 'https://github.com/mffathir-24/Company-Profile-AI_PT-Coal-Lestari.git',
      display_order: 6,
      is_featured: true,
      status: 'published',
      created_at: '2025-07-10T10:00:00Z',
      updated_at: '2024-08-18T10:00:00Z',
      tags: [
        { id: '1', name: 'Laravel', color: '#FF2D20', created_at: '2024-06-18T10:00:00Z' },
        { id: '2', name: 'Bootstrap', color: '#7952B3', created_at: '2024-06-18T10:00:00Z' },
        { id: '3', name: 'Tailwind', color: '#06B6D4', created_at: '2024-06-18T10:00:00Z' },
        { id: '4', name: 'Node.js', color: '#339933', created_at: '2024-06-18T10:00:00Z' },
        { id: '5', name: 'MySQL', color: '#4479A1', created_at: '2024-06-18T10:00:00Z' },
        { id: '6', name: 'API', color: '#0F172A', created_at: '2024-06-18T10:00:00Z' },
        { id: '7', name: 'AI', color: '#020617', created_at: '2024-06-18T10:00:00Z' }
      ]
    },
    {
      id: '9',
      title: 'Aplikasi Task and Projek Manajemen System berbasis Mobile',
      description: 'Aplikasi ini menggunakan backend golang dan frontend react native dengan memiliki 3 role admin,manager,staff',
      image_url: '/project/taskprojekmobile.jpg',
      demo_url: '#',
      code_url: 'https://github.com/mffathir-24/Company-Profile-AI_PT-Coal-Lestari.git',
      display_order: 6,
      is_featured: true,
      status: 'published',
      created_at: '2025-07-10T10:00:00Z',
      updated_at: '2024-08-18T10:00:00Z',
      tags: [
        { id: '1', name: 'Golang', color: '#00ADD8', created_at: '2024-06-18T10:00:00Z' },
        { id: '2', name: 'React', color: '#61DAFB', created_at: '2024-06-18T10:00:00Z' },
        { id: '3', name: 'Tailwind', color: '#06B6D4', created_at: '2024-06-18T10:00:00Z' },
        { id: '4', name: 'Mobile', color: '#0B1120', created_at: '2024-06-18T10:00:00Z' },
        { id: '5', name: 'PostgresSQL', color: '#1E3A5F', created_at: '2024-06-18T10:00:00Z' },
        { id: '6', name: 'API', color: '#0F172A', created_at: '2024-06-18T10:00:00Z' },
      ]
    },
  ],
  
  experiences: [
    {
      id: '1',
      title: 'Saya membuat aplikasi pengelolaan dokumen akreditasi untuk Prodi Manajemen Informatika',
      company: 'University Sriwijaya',
      location: 'Bukit Lama, Palembang, South Sumatra, Indonesia',
      start_year: '2024',
      end_year: '2025',
      current_job: false,
      display_order: 1,
      responsibilities: [
        { 
          id: '1', 
          experience_id: '1', 
          description: 'Membangun aplikasi web untuk pengelolaan dokumen akreditasi', 
          display_order: 1,
          created_at: '2024-01-01T00:00:00Z'
        },
        { 
          id: '2', 
          experience_id: '1', 
          description: 'Menerapkan fitur upload, pengelompokan, dan pencarian dokumen', 
          display_order: 2,
          created_at: '2024-01-01T00:00:00Z'
        },
        { 
          id: '3', 
          experience_id: '1', 
          description: 'Memastikan keamanan dan aksesibilitas data', 
          display_order: 3,
          created_at: '2024-01-01T00:00:00Z'
        }
      ],
      skills: [
        { experience_id: '1', skill_name: 'Laravel' },
        { experience_id: '1', skill_name: 'Node.js' },
        { experience_id: '1', skill_name: 'MySQL' },
        { experience_id: '1', skill_name: 'Bootstrap' },
        { experience_id: '1', skill_name: 'JavaScript' },
        { experience_id: '1', skill_name: 'HTML' },
        { experience_id: '1', skill_name: 'CSS' }
      ]
    },
    {
      id: '2',
      title: 'Saya bekerja paruh waktu sebagai installer Wi-Fi dan SD-WAN di PT. Enseval Megatrading Putera Tbk.Palembang',
      company: 'Freelance Team Installation Wi-fi Sdwan',
      location: 'Onsite PT.Enseval Megatrading Putera Tbk.Palembang',
      start_year: '2024',
      end_year: '2024',
      current_job: false,
      display_order: 2,
      responsibilities: [
        { 
          id: '4', 
          experience_id: '2', 
          description: 'Melakukan instalasi dan konfigurasi jaringan Wi-Fi dan SD-WAN', 
          display_order: 1,
          created_at: '2024-01-01T00:00:00Z'
        },
        { 
          id: '5', 
          experience_id: '2', 
          description: 'Memasang Perangkat keras jaringan di lokasi klien', 
          display_order: 2,
          created_at: '2024-01-01T00:00:00Z'
        },
        { 
          id: '6', 
          experience_id: '2', 
          description: 'Dapat melakukan configurasi jaringan dan troubleshooting', 
          display_order: 3,
          created_at: '2024-01-01T00:00:00Z'
        }
      ],
      skills: [
        { experience_id: '2', skill_name: 'CMD' },
        { experience_id: '2', skill_name: 'Networking' },
        { experience_id: '2', skill_name: 'Troubleshooting' },
        { experience_id: '2', skill_name: 'Customer Service' },
        { experience_id: '2', skill_name: 'Teamwork' }
      ]
    },
    {
      id: '3',
      title: 'Saya membuat website portal berita untuk PT.PLN Persero Wilayah Sumatera Selatan, Jambi, dan Bengkulu',
      company: 'Intership at PT.PLN (Persero) Wilayah Sumatera Selatan, Jambi, dan Bengkulu',
      location: 'Palembang, South Sumatra, Indonesia',
      start_year: '2024',
      end_year: '2024',
      current_job: false,
      display_order: 3,
      responsibilities: [
        { 
          id: '7', 
          experience_id: '3', 
          description: 'Mengembangkan sistem portal berita menggunakan Laravel', 
          display_order: 1,
          created_at: '2024-01-01T00:00:00Z'
        },
        { 
          id: '8', 
          experience_id: '3', 
          description: 'Menerapkan fitur manajemen konten untuk berita dan artikel', 
          display_order: 2,
          created_at: '2024-01-01T00:00:00Z'
        },
        { 
          id: '9', 
          experience_id: '3', 
          description: 'Hanya diperuntukan wilayah Sumatera Selatan, Jambi, dan Bengkulu', 
          display_order: 3,
          created_at: '2024-01-01T00:00:00Z'
        }
      ],
      skills: [
        { experience_id: '3', skill_name: 'Laravel' },
        { experience_id: '3', skill_name: 'MySQL' },
        { experience_id: '3', skill_name: 'CSS' },
        { experience_id: '3', skill_name: 'JavaScript' },
        { experience_id: '3', skill_name: 'HTML' },
        { experience_id: '3', skill_name: 'Bootstrap' }
      ]
    },
    {
      id: '4',
      title: 'Saya bekerja freelance sebagai teknisi replace Fortiswitch dan FortiGate dari perangkat lama ke perangkat baru di Jamkrindo kantor cabang dan kantor wilayah Palembang',
      company: 'MSInfokom',
      location: 'Onsite',
      start_year: '2025',
      end_year: '2025',
      current_job: false,
      display_order: 4,
      responsibilities: [
        { 
          id: '10', 
          experience_id: '4', 
          description: 'Melakukan replace Fortiswitch dan FortiGate di lokasi klien', 
          display_order: 1,
          created_at: '2025-11-20T00:00:00Z'
        },
        { 
          id: '11', 
          experience_id: '4', 
          description: 'Perapian kabel LAN', 
          display_order: 2,
          created_at: '2025-11-20T00:00:00Z'
        },
        { 
          id: '12', 
          experience_id: '4', 
          description: 'Cek config 8.8.8.8 apakah aman atau tidak servernya', 
          display_order: 3,
          created_at: '2025-11-20T00:00:00Z'
        }
      ],
      skills: [
        { experience_id: '4', skill_name: 'CMD' },
        { experience_id: '4', skill_name: 'Networking' },
        { experience_id: '4', skill_name: 'Troubleshooting' },
        { experience_id: '4', skill_name: 'Customer Service' },
        { experience_id: '4', skill_name: 'Teamwork' },
        { experience_id: '4', skill_name: 'FortiGate' },
        { experience_id: '4', skill_name: 'FortiSwitch' }
      ]
    },
    {
      id: '5',
      title: 'Saya bekerja freelance sebagai Web Developer di PT.Meta Digital Informasi di Batam',
      company: 'PT.Meta Digital Informasi',
      location: 'Onsite',
      start_year: '2026',
      end_year: '2026',
      current_job: true,
      display_order: 5,
      responsibilities: [
        { 
          id: '16', 
          experience_id: '5', 
          description: 'Membuat fitur voucher dalam penjualan resto', 
          display_order: 1,
          created_at: '2025-11-20T00:00:00Z'
        },
        { 
          id: '17', 
          experience_id: '5', 
          description: 'Membuat print pdf semua voucher beserta menggunakan QR kode voucher', 
          display_order: 2,
          created_at: '2025-11-20T00:00:00Z'
        },
        { 
          id: '18', 
          experience_id: '5', 
          description: 'Membuat auto generate kode voucher berdasarkan jumlah voucher yang diinput secara random dan unik tanpa ada yang sama di databaase', 
          display_order: 3,
          created_at: '2025-11-20T00:00:00Z'
        }
      ],
      skills: [
        { experience_id: '5', skill_name: 'React' },
        { experience_id: '5', skill_name: 'Graphql' },
        { experience_id: '5', skill_name: 'dbForge Studio' },
        { experience_id: '5', skill_name: 'MySQL' },
        { experience_id: '5', skill_name: 'Teamwork' },
        { experience_id: '5', skill_name: 'Tailwind' },
      ]
    },
  ],
  
skills: [
    { 
      id: '1', 
      name: 'Laravel', 
      value: 95, 
      icon_url: '/icons/laravel.png', 
      category: 'Backend',
      display_order: 1,
      is_featured: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '2', 
      name: 'PHP', 
      value: 90, 
      icon_url: '/icons/php.png', 
      category: 'Backend',
      display_order: 2,
      is_featured: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '3', 
      name: 'MySQL', 
      value: 90, 
      icon_url: '/icons/mysql.png', 
      category: 'Database',
      display_order: 3,
      is_featured: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '4', 
      name: 'CSS', 
      value: 85, 
      icon_url: '/icons/css.png', 
      category: 'Frontend',
      display_order: 4,
      is_featured: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '5', 
      name: 'Node.js', 
      value: 80, 
      icon_url: '/icons/nodejs.png', 
      category: 'Backend',
      display_order: 5,
      is_featured: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '6', 
      name: 'React', 
      value: 93, // Diubah dari 75 ke 93
      icon_url: '/icons/react.png', 
      category: 'Frontend',
      display_order: 6,
      is_featured: true, // Diubah dari false ke true
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '7', 
      name: 'JavaScript', 
      value: 88, 
      icon_url: '/icons/js.png', 
      category: 'Frontend',
      display_order: 7,
      is_featured: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '8', 
      name: 'Bootstrap', 
      value: 85, 
      icon_url: '/icons/bootstrapt.png', 
      category: 'Frontend',
      display_order: 8,
      is_featured: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    // ========== TAMBAHAN BARU ==========
    { 
      id: '9', 
      name: 'Golang', 
      value: 95, 
      icon_url: '/icons/golang.png', 
      category: 'Backend',
      display_order: 9,
      is_featured: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '10', 
      name: 'NextJS', 
      value: 90, 
      icon_url: '/icons/nextjs.png', 
      category: 'Frontend',
      display_order: 10,
      is_featured: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '11', 
      name: 'HTML', 
      value: 90, 
      icon_url: '/icons/html.png', 
      category: 'Frontend',
      display_order: 11,
      is_featured: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '12', 
      name: 'Tailwind', 
      value: 85, 
      icon_url: '/icons/tailwind.png', 
      category: 'Frontend',
      display_order: 12,
      is_featured: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '13', 
      name: 'Git', 
      value: 88, 
      icon_url: '/icons/git.png', 
      category: 'Tools',
      display_order: 13,
      is_featured: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '14', 
      name: 'Python', 
      value: 80, 
      icon_url: '/icons/py.png', 
      category: 'Backend',
      display_order: 14,
      is_featured: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '15', 
      name: 'UML', 
      value: 75, 
      icon_url: '/icons/uml.png', 
      category: 'Tools',
      display_order: 15,
      is_featured: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '16', 
      name: 'Photoshop', 
      value: 70, 
      icon_url: '/icons/ps.png', 
      category: 'Design',
      display_order: 16,
      is_featured: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '17', 
      name: 'Microsoft Office', 
      value: 90, 
      icon_url: '/icons/ofice.png', 
      category: 'Tools',
      display_order: 17,
      is_featured: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    { 
      id: '18', 
      name: 'Capcut', 
      value: 75, 
      icon_url: '/icons/capcut.png', 
      category: 'Design',
      display_order: 18,
      is_featured: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  
  certificates: [
    { 
      id: '1', 
      name: 'Sertifikat Laravel Achivement Mastered Bootcamp by Sanbercode', 
      image_url: '/sertifikat-laravel.jpg',
      issue_date: '2024-01-15',
      issuer: 'Sanbercode',
      credential_url: '#',
      display_order: 1,
      created_at: '2024-01-15T00:00:00Z'
    },
    { 
      id: '2', 
      name: 'Sertifikat English Conversation, Speaking and Academy Writing', 
      image_url: '/englishsr.jpg',
      issue_date: '2023-11-20',
      issuer: 'English Course Center',
      credential_url: '#',
      display_order: 2,
      created_at: '2023-11-20T00:00:00Z'
    },
    { 
      id: '3', 
      name: 'Sertifikat Seminar by Google Developer Student Clubs', 
      image_url: '/seminarG.jpg',
      issue_date: '2023-09-10',
      issuer: 'Google Developer Student Clubs',
      credential_url: '#',
      display_order: 3,
      created_at: '2023-09-10T00:00:00Z'
    },
    { 
      id: '4', 
      name: 'Sertifikat Apresiasi Panitia Perlengkapan', 
      image_url: '/apresiasisr.jpg',
      issue_date: '2023-08-05',
      issuer: 'University Sriwijaya',
      credential_url: '#',
      display_order: 4,
      created_at: '2023-08-05T00:00:00Z'
    },
    { 
      id: '5', 
      name: 'Sertifikat Golang Achivement Mastered Bootcamp by Sanbercode', 
      image_url: '/sertifikat-golang.jpg',
      issue_date: '2023-08-05',
      issuer: 'University Sriwijaya',
      credential_url: '#',
      display_order: 4,
      created_at: '2023-08-05T00:00:00Z'
    }
  ],
  
  education: [
    {
      id: '1',
      school: 'SMA Yayasan Pendidikan Islam (YPI) Palembang',
      major: 'Ilmu Pengetahuan Sosial (IPS)',
      start_year: '2019',
      end_year: '2022',
      description: 'Saya menyelesaikan pendidikan menengah di SMA YPI Palembang dengan fokus pada Ilmu Pengetahuan Sosial. Selama di sekolah, saya aktif dalam berbagai kegiatan ekstrakurikuler dan organisasi siswa.',
      degree: 'SMA',
      display_order: 1,
      achievements: [
        { 
          id: '1', 
          education_id: '1', 
          achievement: 'Sertifikat Pramuka Siswa', 
          display_order: 1,
          created_at: '2024-01-01T00:00:00Z'
        },
        { 
          id: '2', 
          education_id: '1', 
          achievement: 'Sertifikat MIPA (Musyawarah Ilmiah Pelajar)', 
          display_order: 2,
          created_at: '2024-01-01T00:00:00Z'
        }
      ]
    },
    {
      id: '2',
      school: 'University Sriwijaya',
      major: 'Manajemen Informatika',
      start_year: '2022',
      end_year: '2025',
      description: 'Saya sedang menempuh pendidikan di Universitas Sriwijaya, jurusan Manajemen Informatika, dengan fokus pada pengembangan web dan teknologi informasi.',
      degree: 'D3',
      display_order: 2,
      achievements: [
        { 
          id: '3', 
          education_id: '2', 
          achievement: 'Student of the Year 2022', 
          display_order: 1,
          created_at: '2024-01-01T00:00:00Z'
        },
        { 
          id: '4', 
          education_id: '2', 
          achievement: 'Completed 5+ major projects', 
          display_order: 2,
          created_at: '2024-01-01T00:00:00Z'
        },
        { 
          id: '5', 
          education_id: '2', 
          achievement: 'Active member of Web Development Club', 
          display_order: 3,
          created_at: '2024-01-01T00:00:00Z'
        }
      ]
    }
  ],
  
  testimonials: [
    {
      id: '1',
      name: 'Bayu Wijaya Putra',
      title: 'Lektor Fakultas Ilmu Komputer',
      message: 'Fathiir mahasiswa yang sangat berdedikasi dan memiliki kemampuan teknis yang luar biasa. Dia telah menunjukkan kemampuannya dalam mengembangkan aplikasi yang kompleks dengan efisiensi tinggi.',
      avatar_url: '/avatars/bayu.jpg',
      rating: 5,
      is_featured: true,
      display_order: 1,
      status: 'published',
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Syahlan',
      title: 'Ayah',
      message: 'Fathiir adalah anak yang sangat berbakat dan pekerja keras. Dia selalu berusaha memberikan yang terbaik dalam setiap proyek yang dia kerjakan. Saya bangga padanya.',
      avatar_url: '/avatars/ayah.jpg',
      rating: 5,
      is_featured: true,
      display_order: 2,
      status: 'published',
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '3',
      name: 'Abdiansah',
      title: 'Kaprodi Manajemen Informatika',
      message: 'Sangat Memuaskan, sangat membantu dalam mengelola dokumen akreditasi prodi kami. Aplikasi ini sangat user-friendly dan efisien.',
      avatar_url: '/avatars/abdiansah.jpg',
      rating: 4,
      is_featured: true,
      display_order: 3,
      status: 'published',
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '4',
      name: 'Purwita Sari',
      title: 'Dosen Pratikum E-Commerce',
      message: 'Aplikasi e-commerce sangat akurant dan mudah digunakan. Hanya saja fitur pembayaran masih manual.',
      avatar_url: '/avatars/purwita.jpg',
      rating: 4,
      is_featured: false,
      display_order: 4,
      status: 'published',
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '5',
      name: 'Fitri',
      title: 'Ibu',
      message: 'Kamu harus bangga dengan dirimu sendiri, Fathiir. Kamu telah bekerja keras dan mencapai banyak hal. Teruslah belajar dan berkembang, saya selalu mendukungmu.',
      avatar_url: '/avatars/ibu.jpg',
      rating: 5,
      is_featured: true,
      display_order: 5,
      status: 'published',
      created_at: '2024-01-01T00:00:00Z'
    }
  ],
  
  blogPosts: [
    {
      id: '1',
      title: '5 Tips Menjadi Web Developer Handal',
      content: 'Menjadi web developer bukan hanya soal coding, tetapi juga soal mindset dan kebiasaan... Konten lengkap akan tersedia di halaman detail.',
      excerpt: 'Menjadi web developer bukan hanya soal coding, tetapi juga soal mindset dan kebiasaan...',
      slug: '5-tips-menjadi-web-developer-handal',
      featured_image: '/blog/web-developer-tips.jpg',
      publish_date: '2024-05-12',
      status: 'published',
      view_count: 150,
      tags: [
        { id: '1', name: 'Web Development', created_at: '2024-05-12T00:00:00Z' },
        { id: '2', name: 'Tips', created_at: '2024-05-12T00:00:00Z' }
      ]
    },
    {
      id: '2',
      title: 'Tips Menggunakan AI dalam Pengembangan Web',
      content: 'AI dapat menjadi alat yang sangat berguna dalam pengembangan web, berikut beberapa tips untuk memanfaatkannya...',
      excerpt: 'AI dapat menjadi alat yang sangat berguna dalam pengembangan web, berikut beberapa tips untuk memanfaatkannya...',
      slug: 'tips-menggunakan-ai-dalam-pengembangan-web',
      featured_image: '/blog/ai-web-development.jpg',
      publish_date: '2024-05-28',
      status: 'published',
      view_count: 230,
      tags: [
        { id: '3', name: 'AI', created_at: '2024-05-28T00:00:00Z' },
        { id: '4', name: 'Artificial Intelligence', created_at: '2024-05-28T00:00:00Z' }
      ]
    },
    {
      id: '3',
      title: 'Laravel vs Node.js: Mana yang Lebih Baik untuk Proyek Anda?',
      content: 'Dalam dunia pengembangan web, Laravel dan Node.js adalah dua pilihan populer. Mari kita bahas kelebihan dan kekurangan masing-masing...',
      excerpt: 'Dalam dunia pengembangan web, Laravel dan Node.js adalah dua pilihan populer. Mari kita bahas kelebihan dan kekurangan masing-masing...',
      slug: 'laravel-vs-nodejs-mana-yang-lebih-baik',
      featured_image: '/blog/laravel-vs-nodejs.jpg',
      publish_date: '2024-05-20',
      status: 'published',
      view_count: 180,
      tags: [
        { id: '1', name: 'Web Development', created_at: '2024-05-20T00:00:00Z' },
        { id: '5', name: 'Laravel', created_at: '2024-05-20T00:00:00Z' },
        { id: '6', name: 'Node.js', created_at: '2024-05-20T00:00:00Z' }
      ]
    }
  ],
  
  socialLinks: [
    {
      id: '1',
      platform: 'WhatsApp',
      url: 'https://wa.me/6285809735614',
      icon_name: 'FaWhatsapp',
      display_order: 1,
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      platform: 'Instagram',
      url: 'https://www.instagram.com/mfathir_fh',
      icon_name: 'FiInstagram',
      display_order: 2,
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '3',
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/muhammad-fathiir-farhansyah-58baa6279/',
      icon_name: 'FiLinkedin',
      display_order: 3,
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '4',
      platform: 'GitHub',
      url: 'https://github.com/mffathir-24',
      icon_name: 'FiGithub',
      display_order: 4,
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '5',
      platform: 'Email',
      url: 'mailto:fathirfarhansyah@gmail.com',
      icon_name: 'FiMail',
      display_order: 5,
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  
  settings: [
    {
      id: '1',
      key: 'cv_url',
      value: 'CV_Br_Tir.pdf',
      data_type: 'string',
      description: 'URL untuk download CV',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      key: 'contact_email',
      value: 'fathirfarhansyah24@gmail.com',
      data_type: 'string',
      description: 'Email kontak utama',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '3',
      key: 'phone_number',
      value: '+62 858-0973-5614',
      data_type: 'string',
      description: 'Nomor telepon kontak',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '4',
      key: 'location',
      value: 'Palembang, Indonesia',
      data_type: 'string',
      description: 'Lokasi saat ini',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ]
};

export async function GET() {
  try {
    const responses = await Promise.allSettled([
      fetch(`${API_BASE_URL}/sections`),
      fetch(`${API_BASE_URL}/projects?with_tags=true`),
      fetch(`${API_BASE_URL}/experiences/with-relations`),
      fetch(`${API_BASE_URL}/skills`),
      fetch(`${API_BASE_URL}/certificates`),
      fetch(`${API_BASE_URL}/education`),
      fetch(`${API_BASE_URL}/testimonials`),
      fetch(`${API_BASE_URL}/blog`),
      fetch(`${API_BASE_URL}/social-links`),
      fetch(`${API_BASE_URL}/settings`)
    ]);

    const data = await Promise.all(
      responses.map(async (response, index) => {
        if (response.status === 'fulfilled' && response.value.ok) {
          try {
            const result = await response.value.json();
            console.log(`Response from endpoint ${index}:`, result);
            
            let extractedData: unknown;
            
            switch (index) {
              case 0: // sections
                extractedData = result.data || [];
                break;
              case 1: // projects
                if (Array.isArray(result.data)) {
                  extractedData = result.data;
                } else if (Array.isArray(result)) {
                  extractedData = result;
                } else if (result && Array.isArray(result.projects)) {
                  extractedData = result.projects;
                } else {
                  extractedData = [];
                }
                break;
              case 2: // experiences
                extractedData = result.experiences || [];
                break;
              case 3: // skills
                extractedData = result.data || result.skills || [];
                break;
              case 4: // certificates
                extractedData = result.data || [];
                break;
              case 5: // education
                extractedData = result.data || [];
                break;
              case 6: // testimonials
                extractedData = result.data || [];
                break;
              case 7: // blog
                extractedData = result.data || [];
                break;
              case 8: // social-links
                extractedData = result.data || [];
                break;
              case 9: // settings
                extractedData = result.data || [];
                break;
              default: 
                extractedData = [];
            }
            
            return resolveImageUrls(extractedData);
          } catch (parseError) {
            console.error(`Error parsing response for endpoint ${index}:`, parseError);
            return [];
          }
        } else {
          console.error(`Failed to fetch from endpoint ${index}:`, response.status);
          return [];
        }
      })
    );

    // Check if we got any real data
    const hasRealData = data.some(d => Array.isArray(d) && d.length > 0);

    // If no real data, use dummy data
    if (!hasRealData) {
      console.log('No real data found, using dummy data');
      const resolvedDummyData = {
        sections: resolveImageUrls(dummyData.sections),
        projects: resolveImageUrls(dummyData.projects),
        experiences: resolveImageUrls(dummyData.experiences),
        skills: resolveImageUrls(dummyData.skills),
        certificates: resolveImageUrls(dummyData.certificates),
        education: resolveImageUrls(dummyData.education),
        testimonials: resolveImageUrls(dummyData.testimonials),
        blogPosts: resolveImageUrls(dummyData.blogPosts),
        socialLinks: resolveImageUrls(dummyData.socialLinks),
        settings: resolveImageUrls(dummyData.settings)
      };

      return NextResponse.json({
        sections: Array.isArray(resolvedDummyData.sections) && resolvedDummyData.sections.length > 0 ? resolvedDummyData.sections : dummyData.sections,
        projects: Array.isArray(resolvedDummyData.projects) && resolvedDummyData.projects.length > 0 ? resolvedDummyData.projects : dummyData.projects,
        experiences: Array.isArray(resolvedDummyData.experiences) ? resolvedDummyData.experiences : dummyData.experiences,
        skills: Array.isArray(resolvedDummyData.skills) ? resolvedDummyData.skills : dummyData.skills,
        certificates: Array.isArray(resolvedDummyData.certificates) ? resolvedDummyData.certificates : dummyData.certificates,
        education: Array.isArray(resolvedDummyData.education) ? resolvedDummyData.education : dummyData.education,
        testimonials: Array.isArray(resolvedDummyData.testimonials) ? resolvedDummyData.testimonials : dummyData.testimonials,
        blogPosts: Array.isArray(resolvedDummyData.blogPosts) ? resolvedDummyData.blogPosts : dummyData.blogPosts,
        socialLinks: Array.isArray(resolvedDummyData.socialLinks) ? resolvedDummyData.socialLinks : dummyData.socialLinks,
        settings: Array.isArray(resolvedDummyData.settings) ? resolvedDummyData.settings : dummyData.settings,
        source: 'dummy'
      });
    }

    // If we have real data, use it
    return NextResponse.json({
      sections: Array.isArray(data[0]) && data[0].length > 0 ? data[0] : dummyData.sections,
      projects: Array.isArray(data[1]) && data[1].length > 0 ? data[1] : dummyData.projects,
      experiences: Array.isArray(data[2]) && data[2].length > 0 ? data[2] : dummyData.experiences,
      skills: Array.isArray(data[3]) && data[3].length > 0 ? data[3] : dummyData.skills,
      certificates: Array.isArray(data[4]) && data[4].length > 0 ? data[4] : dummyData.certificates,
      education: Array.isArray(data[5]) && data[5].length > 0 ? data[5] : dummyData.education,
      testimonials: Array.isArray(data[6]) && data[6].length > 0 ? data[6] : dummyData.testimonials,
      blogPosts: Array.isArray(data[7]) && data[7].length > 0 ? data[7] : dummyData.blogPosts,
      socialLinks: Array.isArray(data[8]) && data[8].length > 0 ? data[8] : dummyData.socialLinks,
      settings: Array.isArray(data[9]) && data[9].length > 0 ? data[9] : dummyData.settings,
      source: 'api'
    });

  } catch (error) {
    console.error('API aggregation error:', error);
    
    // Return dummy data on error
    const resolvedDummyData = {
      sections: resolveImageUrls(dummyData.sections),
      projects: resolveImageUrls(dummyData.projects),
      experiences: resolveImageUrls(dummyData.experiences),
      skills: resolveImageUrls(dummyData.skills),
      certificates: resolveImageUrls(dummyData.certificates),
      education: resolveImageUrls(dummyData.education),
      testimonials: resolveImageUrls(dummyData.testimonials),
      blogPosts: resolveImageUrls(dummyData.blogPosts),
      socialLinks: resolveImageUrls(dummyData.socialLinks),
      settings: resolveImageUrls(dummyData.settings)
    };

    return NextResponse.json({
      sections: resolvedDummyData.sections,
      projects: resolvedDummyData.projects,
      experiences: resolvedDummyData.experiences,
      skills: resolvedDummyData.skills,
      certificates: resolvedDummyData.certificates,
      education: resolvedDummyData.education,
      testimonials: resolvedDummyData.testimonials,
      blogPosts: resolvedDummyData.blogPosts,
      socialLinks: resolvedDummyData.socialLinks,
      settings: resolvedDummyData.settings,
      source: 'dummy-error'
    });
  }
}