'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiMessageSquare, FiExternalLink, FiEye, FiClock, FiUser, FiArrowLeft, FiTag, FiSearch } from 'react-icons/fi';

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
  data: BlogPost[];
  message: string;
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://salty-juditha-mffathir24-b1918382.koyeb.app/api/v1/blog');
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        
        const data: ApiResponse = await response.json();
        setBlogPosts(data.data);
        setFilteredPosts(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Filter posts based on search term and selected tag
  useEffect(() => {
    let filtered = blogPosts;

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(post =>
        post.tags.some(tag => tag.name === selectedTag)
      );
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedTag, blogPosts]);

  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags.map(tag => tag.name))));

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Error Loading Blog</h1>
          <p className="text-gray-300 mb-8">{error}</p>
          <Link
            href="/"
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors group"
            >
              <FiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">
                All Articles
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
              </p>
            </div>

            <div className="w-8"></div> {/* Spacer for balance */}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Search and Filter Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-6">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search articles by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Tags Filter */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setSelectedTag('')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedTag === '' 
                      ? 'bg-purple-500 text-white shadow-lg' 
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  All Tags
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      selectedTag === tag 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <FiTag className="text-xs" />
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.section>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {filteredPosts.map((post, index) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="block">
                <motion.article
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group cursor-pointer h-full"
                >
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col hover:bg-white/10 transition-all duration-300 shadow-xl hover:shadow-2xl">
                    {/* Gradient Header */}
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
                          <span>{calculateReadTime(post.content)} min read</span>
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
          </motion.div>
        ) : (
          /* Empty Search State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <motion.div
              className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <FiSearch className="text-4xl text-purple-200" />
            </motion.div>
            <h3 className="text-2xl font-semibold text-white mb-4">No Articles Found</h3>
            <p className="text-gray-300 text-lg max-w-md mx-auto mb-8">
              {searchTerm || selectedTag 
                ? `No articles found matching "${searchTerm || selectedTag}". Try different keywords or clear filters.`
                : 'No articles available at the moment.'
              }
            </p>
            
            {(searchTerm || selectedTag) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag('');
                }}
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors text-white font-medium"
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}