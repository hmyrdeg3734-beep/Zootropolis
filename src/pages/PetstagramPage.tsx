import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, 
  Search, Camera, Home, Compass, PlaySquare, User, Moon, Sun, 
  Languages, PawPrint, PlusCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from '../translations';

interface Post {
  id: string;
  username: string;
  avatar: string;
  image: string;
  likes: number;
  caption: string;
  isLiked: boolean;
  time: string;
}

const DUMMY_POSTS: Post[] = [
  {
    id: '1',
    username: 'pasha_the_goldie',
    avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=120&h=120',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800&h=800',
    likes: 1240,
    caption: 'Anadolu Yakası sahilinde sabah yürüyüşü keyfi! 🐾🌊 #goldenretriever #anadoluyakası',
    isLiked: false,
    time: '2 saat önce'
  },
  {
    id: '2',
    username: 'muezza_cat',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=120&h=120',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800&h=800',
    likes: 856,
    caption: 'Güneşi gördüm, hemen yayıldım. ☀️🐈 #catlife #sunnyday',
    isLiked: true,
    time: '5 saat önce'
  },
  {
    id: '3',
    username: 'boncuk_parrot',
    avatar: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=120&h=120',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=800&h=800',
    likes: 320,
    caption: 'Yeni oyuncağım çok eğlenceli! 🦜💎 #parrot #birdsofinstagram',
    isLiked: false,
    time: '1 gün önce'
  }
];

const STORIES = [
  { id: '1', name: 'Pamuk', img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: '2', name: 'Zeytin', img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: '3', name: 'Tarçın', img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: '4', name: 'Duman', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: '5', name: 'Sütlaç', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: '6', name: 'Çakıl', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150' },
];

export default function PetstagramPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(DUMMY_POSTS);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('lang') as Language) || 'tr';
  });

  const t = translations[language];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  const toggleLanguage = () => {
    const langs: Language[] = ['tr', 'en', 'es'];
    const currentIndex = langs.indexOf(language);
    setLanguage(langs[(currentIndex + 1) % langs.length]);
  };

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] text-gray-900 dark:text-blue-50 font-sans transition-colors duration-500 pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-md border-b border-gray-100 dark:border-blue-900/50 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-blue-900/50 rounded-full transition-colors text-amber-600 dark:text-blue-400"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold tracking-tighter italic flex items-center gap-1">
            Petstagram <PawPrint size={20} className="text-amber-500 fill-current" />
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="p-2 hover:bg-gray-100 dark:hover:bg-blue-900/50 rounded-full transition-all text-amber-600 dark:text-blue-400 font-bold text-xs uppercase"
          >
            {language}
          </button>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-blue-900/50 rounded-full transition-all text-amber-600 dark:text-blue-400"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-blue-900/50 rounded-full transition-colors hidden sm:block">
            <Heart size={24} />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-blue-900/50 rounded-full transition-colors hidden sm:block">
            <Send size={24} />
          </button>
        </div>
      </header>

      <main className="max-w-xl mx-auto py-4">
        {/* Stories */}
        <div className="flex gap-4 overflow-x-auto px-4 pb-4 no-scrollbar border-b border-gray-100 dark:border-blue-900/30 mb-4">
          {STORIES.map(story => (
            <div key={story.id} className="flex flex-col items-center gap-1 shrink-0">
              <div className="p-1 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-600">
                <div className="bg-white dark:bg-[#030712] p-0.5 rounded-full">
                   <img src={story.img} alt={story.name} className="w-14 h-14 rounded-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <span className="text-xs font-medium">{story.name}</span>
            </div>
          ))}
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {posts.map(post => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-blue-950/20 border-y sm:border border-gray-100 dark:border-blue-900/50 sm:rounded-xl overflow-hidden"
            >
              {/* Post Header */}
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-blue-800">
                    <img src={post.avatar} alt={post.username} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <span className="font-bold text-sm">{post.username}</span>
                </div>
                <button className="p-1">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* Post Image */}
              <div 
                className="aspect-square bg-gray-100 dark:bg-blue-900/20 relative cursor-pointer"
                onDoubleClick={() => handleLike(post.id)}
              >
                <img src={post.image} alt="post" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>

              {/* Post Actions */}
              <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`transition-colors ${post.isLiked ? 'text-rose-500' : 'hover:text-gray-500'}`}
                    >
                      <Heart size={26} fill={post.isLiked ? "currentColor" : "none"} />
                    </button>
                    <button className="hover:text-gray-500">
                      <MessageCircle size={26} />
                    </button>
                    <button className="hover:text-gray-500">
                      <Send size={26} />
                    </button>
                  </div>
                  <button className="hover:text-gray-500">
                    <Bookmark size={26} />
                  </button>
                </div>

                {/* Likes & Caption */}
                <div className="space-y-1">
                  <p className="font-bold text-sm">{post.likes.toLocaleString()} {language === 'tr' ? 'beğeni' : language === 'en' ? 'likes' : 'me gusta'}</p>
                  <p className="text-sm">
                    <span className="font-bold mr-2">{post.username}</span>
                    {post.caption}
                  </p>
                  <p className="text-[10px] uppercase text-gray-400 dark:text-blue-400/50 mt-2">{post.time}</p>
                </div>

                {/* Add Comment */}
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-blue-900/30 flex items-center justify-between">
                  <input 
                    type="text" 
                    placeholder={language === 'tr' ? 'Yorum ekle...' : language === 'en' ? 'Add a comment...' : 'Añadir un comentario...'}
                    className="bg-transparent border-none outline-none text-sm w-full"
                  />
                  <button className="text-blue-500 font-bold text-sm opacity-50 hover:opacity-100 transition-opacity">
                    {language === 'tr' ? 'Paylaş' : language === 'en' ? 'Post' : 'Publicar'}
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      {/* Navigation - Bottom bar on mobile, could be sidebar on desktop */}
      <nav className="fixed bottom-0 w-full bg-white dark:bg-[#030712] border-t border-gray-100 dark:border-blue-900/50 px-6 py-3 flex items-center justify-between z-50 md:hidden">
        <button onClick={() => navigate('/')} className="p-2"><Home size={28} /></button>
        <button className="p-2"><Search size={28} /></button>
        <button className="p-2 text-amber-600"><PlusCircle size={28} /></button>
        <button className="p-2"><PlaySquare size={28} /></button>
        <button className="p-2"><User size={28} /></button>
      </nav>

      {/* Desktop Navigation Hints (Sidebar simulation) */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 ml-4 hidden md:flex flex-col gap-6 p-4 bg-white/50 dark:bg-blue-900/10 backdrop-blur-sm rounded-3xl border border-gray-100 dark:border-blue-900/30">
        <button onClick={() => navigate('/')} className="p-3 hover:bg-amber-100 dark:hover:bg-blue-900 rounded-2xl transition-colors"><Home size={28} /></button>
        <button className="p-3 hover:bg-amber-100 dark:hover:bg-blue-900 rounded-2xl transition-colors"><Search size={28} /></button>
        <button className="p-3 hover:bg-amber-100 dark:hover:bg-blue-900 rounded-2xl transition-colors"><Compass size={28} /></button>
        <button className="p-3 hover:bg-amber-100 dark:hover:bg-blue-900 rounded-2xl transition-colors"><PlaySquare size={28} /></button>
        <button className="p-3 hover:bg-amber-100 dark:hover:bg-blue-900 rounded-2xl transition-colors text-amber-600"><PlusCircle size={28} /></button>
      </div>
    </div>
  );
}
