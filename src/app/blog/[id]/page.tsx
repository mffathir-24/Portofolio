'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiArrowLeft, FiEye, FiClock, FiTag } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

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
  created_at: string;
  updated_at: string;
}

interface BlogTag {
  id: string;
  name: string;
  created_at: string;
}

interface ApiResponse {
  data: BlogPost;
  message: string;
}

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params promise using React.use()
  const resolvedParams = React.use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://portobackend-production-5461.up.railway.app/api/v1/blog/${resolvedParams.id}`);
        
        if (!response.ok) {
          throw new Error('Blog post not found');
        }
        
        const data: ApiResponse = await response.json();
        setPost(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [resolvedParams.id]); // Use resolvedParams.id as dependency

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-300 mb-8">{error}</p>
          <Link
            href="/#blog"
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors inline-block"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const formatContent = (content: string) => {
    // Convert numbered list to proper HTML
    return content
      .split('\n')
      .map(line => {
        if (line.match(/^\d+\./)) {
          return `<p class="text-gray-300 my-4">${line}</p>`;
        }
        return `<p class="text-gray-300 my-4">${line}</p>`;
      })
      .join('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/#blog"
            className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors group"
          >
            <FiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </div>
      </motion.header>

      {/* Blog Content */}
      <div className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Featured Image */}
          {post.featured_image && post.featured_image !== '#' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={post.featured_image}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover"
              />
            </motion.div>
          )}

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full text-sm text-purple-300 flex items-center gap-1"
                  >
                    <FiTag className="text-xs" />
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-purple-400" />
                <span>
                  {new Date(post.publish_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <FiUser className="text-purple-400" />
                <span>Admin</span>
              </div>
              
              <div className="flex items-center gap-2">
                <FiClock className="text-purple-400" />
                <span>{calculateReadTime(post.content)} min read</span>
              </div>
              
              <div className="flex items-center gap-2">
                <FiEye className="text-purple-400" />
                <span>{post.view_count} views</span>
              </div>
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="prose prose-invert prose-lg max-w-none
                     prose-headings:text-white prose-headings:font-bold
                     prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                     prose-p:text-gray-300 prose-p:leading-relaxed
                     prose-strong:text-purple-300 prose-strong:font-semibold
                     prose-a:text-pink-400 prose-a:no-underline hover:prose-a:underline
                     prose-code:text-purple-300 prose-code:bg-purple-900/50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono
                     prose-pre:bg-gray-800 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
                     prose-blockquote:border-l-4 prose-blockquote:border-purple-400 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400
                     prose-ul:text-gray-300 prose-ol:text-gray-300
                     prose-li:text-gray-300 prose-li:leading-relaxed
                     prose-img:rounded-xl prose-img:shadow-2xl"
          >
            <div 
              dangerouslySetInnerHTML={{ 
                __html: formatContent(post.content) 
              }} 
            />
          </motion.div>

          {/* Article Footer */}
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Published</h3>
                <p className="text-gray-400 text-sm">
                  {new Date(post.publish_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => window.history.back()}
                  className="px-6 py-2 border border-purple-400 text-purple-300 hover:bg-purple-500/10 rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  <FiArrowLeft className="text-sm" />
                  Go Back
                </button>
                
                <Link 
                  href="/blog"
                  className="px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors flex items-center gap-2"
                >
                  View All Posts
                </Link>
              </div>
            </div>
          </motion.footer>
        </motion.article>
      </div>
    </div>
  );
}