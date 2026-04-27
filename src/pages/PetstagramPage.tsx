import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, 
  Search, Camera, Home, Compass, PlaySquare, User, Moon, Sun, 
  Languages, PawPrint, PlusCircle, X, Image, Smile, ChevronLeft
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
    avatar: 'https://picsum.photos/seed/golden_retriever_avatar/100/100',
    image: 'https://picsum.photos/seed/golden_retriever_dog/600/600',
    likes: 1240,
    caption: 'Üsküdar sahilinde sabah yürüyüşü keyfi! 🐾🌊 #goldenretriever #üsküdar',
    isLiked: false,
    time: '2 saat önce'
  },
  {
    id: '2',
    username: 'muezza_cat',
    avatar: 'https://picsum.photos/seed/tabby_cat_avatar/100/100',
    image: 'https://picsum.photos/seed/sleeping_cat/600/600',
    likes: 856,
    caption: 'Güneşi gördüm, hemen yayıldım. ☀️🐈 #catlife #sunnyday',
    isLiked: true,
    time: '5 saat önce'
  },
  {
    id: '3',
    username: 'boncuk_parrot',
    avatar: 'https://picsum.photos/seed/colorful_bird_avatar/100/100',
    image: 'https://picsum.photos/seed/parrot_bird/600/600',
    likes: 320,
    caption: 'Yeni oyuncağım çok eğlenceli! 🦜💎 #parrot #birdsofinstagram',
    isLiked: false,
    time: '1 gün önce'
  }
];

interface DmConversation {
  id: string;
  username: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: { id: string; text: string; fromMe: boolean; time: string }[];
}

const DUMMY_DMS: DmConversation[] = [
  { id: 'd1', username: 'pasha_the_goldie', avatar: 'https://picsum.photos/seed/golden_retriever_avatar/100/100', lastMessage: 'Parkta buluşalım mı? 🐾', time: '2dk', unread: 2, messages: [
    { id: 'm1', text: 'Selam! Nasılsın?', fromMe: false, time: '10:00' },
    { id: 'm2', text: 'İyiyim sen? 🐶', fromMe: true, time: '10:01' },
    { id: 'm3', text: 'Parkta buluşalım mı? 🐾', fromMe: false, time: '10:05' },
  ]},
  { id: 'd2', username: 'muezza_cat', avatar: 'https://picsum.photos/seed/tabby_cat_avatar/100/100', lastMessage: 'Fotoğrafı çok güzel! 😻', time: '1sa', unread: 0, messages: [
    { id: 'm1', text: 'O fotoğrafı nereden çektiniz?', fromMe: true, time: '09:00' },
    { id: 'm2', text: 'Fotoğrafı çok güzel! 😻', fromMe: false, time: '09:30' },
  ]},
  { id: 'd3', username: 'boncuk_parrot', avatar: 'https://picsum.photos/seed/colorful_bird_avatar/100/100', lastMessage: 'Teşekkürler! 🦜', time: '3sa', unread: 1, messages: [
    { id: 'm1', text: 'Boncuk çok tatlı!', fromMe: true, time: '08:00' },
    { id: 'm2', text: 'Teşekkürler! 🦜', fromMe: false, time: '08:15' },
  ]},
];

const STORIES = [
  { id: '1', name: 'Pamuk', img: 'https://picsum.photos/seed/white_cat/100/100' },
  { id: '2', name: 'Zeytin', img: 'https://picsum.photos/seed/black_dog/100/100' },
  { id: '3', name: 'Tarçın', img: 'https://picsum.photos/seed/orange_cat/100/100' },
  { id: '4', name: 'Duman', img: 'https://picsum.photos/seed/grey_kitty/100/100' },
  { id: '5', name: 'Sütlaç', img: 'https://picsum.photos/seed/white_puppy/100/100' },
  { id: '6', name: 'Çakıl', img: 'https://picsum.photos/seed/brown_dog/100/100' },
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

  // DM states
  const [isDmOpen, setIsDmOpen] = useState(false);
  const [dmConversations, setDmConversations] = useState(DUMMY_DMS);
  const [activeDm, setActiveDm] = useState<DmConversation | null>(null);
  const [dmInput, setDmInput] = useState('');

  // New Post states
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [newPostCaption, setNewPostCaption] = useState('');
  const [newPostImageUrl, setNewPostImageUrl] = useState('');

  const handleSendDm = () => {
    if (!dmInput.trim() || !activeDm) return;
    const newMsg = { id: `m${Date.now()}`, text: dmInput, fromMe: true, time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) };
    setDmConversations(prev => prev.map(c => c.id === activeDm.id ? { ...c, messages: [...c.messages, newMsg], lastMessage: dmInput, time: 'şimdi' } : c));
    setActiveDm(prev => prev ? { ...prev, messages: [...prev.messages, newMsg], lastMessage: dmInput } : null);
    setDmInput('');
  };

  const handleNewPost = () => {
    if (!newPostCaption.trim()) return;
    const newPost: Post = {
      id: `${Date.now()}`,
      username: 'ben_petstagram',
      avatar: 'https://picsum.photos/seed/my_pet_avatar/100/100',
      image: newPostImageUrl || `https://picsum.photos/seed/${Date.now()}/600/600`,
      likes: 0,
      caption: newPostCaption,
      isLiked: false,
      time: language === 'tr' ? 'az önce' : language === 'en' ? 'just now' : 'ahora mismo'
    };
    setPosts(prev => [newPost, ...prev]);
    setNewPostCaption('');
    setNewPostImageUrl('');
    setIsNewPostOpen(false);
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
