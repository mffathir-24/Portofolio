import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://portobackend-production-5461.up.railway.app/api/v1';
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://portobackend-production-5461.up.railway.app';

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

// Data fallback jika API offline
const fallbackData = {
  sections: [
    { id: '1', section_id: 'profil', label: 'Profil', display_order: 1, is_active: true },
    { id: '2', section_id: 'about', label: 'About', display_order: 2, is_active: true },
    { id: '3', section_id: 'projek', label: 'Projek', display_order: 3, is_active: true },
    { id: '4', section_id: 'pengalaman', label: 'Pengalaman', display_order: 4, is_active: true },
    { id: '5', section_id: 'skill', label: 'Skill', display_order: 5, is_active: true },
    { id: '6', section_id: 'studi', label: 'Studi', display_order: 6, is_active: true },
    { id: '7', section_id: 'testimoni', label: 'Testimoni', display_order: 7, is_active: true },
    { id: '8', section_id: 'blog', label: 'Blog', display_order: 8, is_active: true },
    { id: '9', section_id: 'kontak', label: 'Kontak', display_order: 9, is_active: true }
  ],
  projects: []
};

export async function GET() {
  try {
    const responses = await Promise.allSettled([
      fetch(`${API_BASE_URL}/sections`),
      fetch(`${API_BASE_URL}/projects?with_tags=true`), // Pastikan URL benar
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
            console.log(`Response from endpoint ${index}:`, result); // Debug log
            
            let extractedData: unknown;
            
            // Handle different response structures
            switch (index) {
              case 0: // sections
                extractedData = result.data || [];
                break;
              case 1: // projects - PERBAIKAN: handle struktur yang berbeda
                // Coba beberapa kemungkinan struktur response
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
            
            console.log(`Extracted data from endpoint ${index}:`, extractedData); // Debug log
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

    // Debug log untuk memastikan data projects terambil
    console.log('All extracted projects data:', data[1]);

    const hasRealData = data.some(d => Array.isArray(d) && d.length > 0);

    return NextResponse.json({
      sections: Array.isArray(data[0]) && data[0].length > 0 ? data[0] : fallbackData.sections,
      projects: Array.isArray(data[1]) && data[1].length > 0 ? data[1] : fallbackData.projects,
      experiences: Array.isArray(data[2]) ? data[2] : [],
      skills: Array.isArray(data[3]) ? data[3] : [],
      certificates: Array.isArray(data[4]) ? data[4] : [],
      education: Array.isArray(data[5]) ? data[5] : [],
      testimonials: Array.isArray(data[6]) ? data[6] : [],
      blogPosts: Array.isArray(data[7]) ? data[7] : [],
      socialLinks: Array.isArray(data[8]) ? data[8] : [],
      settings: Array.isArray(data[9]) ? data[9] : [],
      source: hasRealData ? 'api' : 'fallback'
    });

  } catch (error) {
    console.error('API aggregation error:', error);
    return NextResponse.json({
      ...fallbackData,
      source: 'fallback'
    });
  }
}