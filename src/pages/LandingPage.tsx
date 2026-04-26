import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, Map as MapIcon, Heart, Search, X, Info, Cat, Dog, Bird, Turtle, Moon, Sun, Languages, Stethoscope, ShoppingBag, Scissors, Warehouse, Hotel, Phone, Camera, Shield, MessageSquarePlus, Sparkles, Send, ShoppingCart, Calendar, UserPlus, ArrowDownToLine, Clock, GraduationCap, Newspaper, Headset, Mail, BookOpen, AlertCircle, Instagram, Twitter, Calculator, CalendarDays, IdCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from '../translations';

const FloatingAnimal = ({ children, delay = 0, duration = 20, initialX = 0, initialY = 0 }: { children: React.ReactNode, delay?: number, duration?: number, initialX?: number | string, initialY?: number | string }) => (
  <motion.div
    initial={{ x: initialX, y: initialY, opacity: 0 }}
    animate={{ 
      x: [initialX, `calc(${initialX} + 30px)`, `calc(${initialX} - 20px)`, initialX],
      y: [initialY, `calc(${initialY} - 40px)`, `calc(${initialY} + 20px)`, initialY],
      opacity: [0.1, 0.2, 0.1],
      rotate: [0, 10, -10, 0]
    }}
    transition={{ 
      duration, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none z-0 text-amber-600/20 dark:text-blue-400/20 dark:drop-shadow-[0_0_8px_rgba(96,165,250,0.3)]"
  >
    {children}
  </motion.div>
);

export default function LandingPage() {
  const navigate = useNavigate();
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isGroomingModalOpen, setIsGroomingModalOpen] = useState(false);
  const [isPriceFinderModalOpen, setIsPriceFinderModalOpen] = useState(false);
  const [isOnlineShopModalOpen, setIsOnlineShopModalOpen] = useState(false);
  const [isHotelBookingModalOpen, setIsHotelBookingModalOpen] = useState(false);
  const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);
  const [isDropOffModalOpen, setIsDropOffModalOpen] = useState(false);
  const [isVetAppointmentModalOpen, setIsVetAppointmentModalOpen] = useState(false);
  const [isTrainerFinderModalOpen, setIsTrainerFinderModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isLiveSupportModalOpen, setIsLiveSupportModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isWikiModalOpen, setIsWikiModalOpen] = useState(false);
  const [isLostFoundModalOpen, setIsLostFoundModalOpen] = useState(false);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [isFoodCalcModalOpen, setIsFoodCalcModalOpen] = useState(false);
  const [isPetIdModalOpen, setIsPetIdModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
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
  
  // Step logic and user data
  const [donationStep, setDonationStep] = useState<1 | 2>(1);
  const [donorName, setDonorName] = useState('');
  const [donorSurname, setDonorSurname] = useState('');
  const [donorIban, setDonorIban] = useState('');

  const resetDonationModal = () => {
    setIsDonationModalOpen(false);
    setSelectedAmount(null);
    setDonationStep(1);
    setDonorName('');
    setDonorSurname('');
    setDonorIban('');
  };

  const handleDonateSuccess = (e: React.FormEvent) => {
    e.preventDefault();
    const successMsg = language === 'tr' 
      ? `Teşekkürler ${donorName} ${donorSurname}! ${selectedAmount} ₺ bağış işleminiz başarıyla alındı.`
      : language === 'en'
      ? `Thank you ${donorName} ${donorSurname}! Your donation of ${selectedAmount} ₺ has been received.`
      : `¡Gracias ${donorName} ${donorSurname}! Su donación de ${selectedAmount} ₺ ha sido recibida.`;
    alert(successMsg);
    resetDonationModal();
  };

  // Feedback states
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) return;
    alert((t as any).opinionSuccess);
    setFeedbackName('');
    setFeedbackMessage('');
  };

  const toggleLanguage = () => {
    const langs: Language[] = ['tr', 'en', 'es'];
    const currentIndex = langs.indexOf(language);
    setLanguage(langs[(currentIndex + 1) % langs.length]);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#030712] text-gray-800 dark:text-blue-50 font-sans selection:bg-amber-100 dark:selection:bg-blue-900/50 flex flex-col relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-10">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full text-amber-500 dark:text-blue-900 fill-current">
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" />
        </svg>
      </div>

      {/* Dark Mode Moon/Stars Atmosphere */}
      <AnimatePresence>
        {isDarkMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
          >
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: Math.random(), 
                  scale: Math.random() * 0.5 + 0.5,
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%"
                }}
                animate={{ 
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 4, 
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
                className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <FloatingAnimal initialX="10%" initialY="15%" duration={15}><Cat size={80} /></FloatingAnimal>
      <FloatingAnimal initialX="85%" initialY="20%" duration={18} delay={2}><Dog size={100} /></FloatingAnimal>
      <FloatingAnimal initialX="20%" initialY="70%" duration={14} delay={1}><Bird size={60} /></FloatingAnimal>
      <FloatingAnimal initialX="75%" initialY="80%" duration={22} delay={3}><Turtle size={90} /></FloatingAnimal>
      <FloatingAnimal initialX="50%" initialY="10%" duration={25} delay={4}><PawPrint size={50} /></FloatingAnimal>
      <FloatingAnimal initialX="5%" initialY="85%" duration={20} delay={5}><Cat size={70} /></FloatingAnimal>
      <FloatingAnimal initialX="90%" initialY="60%" duration={16} delay={2}><Dog size={80} /></FloatingAnimal>

      <div className="absolute top-6 left-6 z-20 flex gap-3">
        <button
          onClick={() => setIsLiveSupportModalOpen(true)}
          className="group flex items-center gap-3 bg-white/80 dark:bg-blue-950/80 backdrop-blur-sm border-2 border-emerald-100 dark:border-emerald-900 px-5 py-3 rounded-2xl font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900 transition-all shadow-sm hover:shadow-lg active:scale-95"
        >
          <div className="relative">
            <Headset size={24} className="group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-blue-950 rounded-full animate-pulse"></span>
          </div>
          <span className="hidden md:block">{(t as any).liveSupport}</span>
        </button>

        <button
          onClick={() => setIsContactModalOpen(true)}
          className="group flex items-center gap-3 bg-white/80 dark:bg-blue-950/80 backdrop-blur-sm border-2 border-blue-100 dark:border-blue-900 px-5 py-3 rounded-2xl font-bold text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 transition-all shadow-sm hover:shadow-lg active:scale-95"
        >
          <div className="flex gap-1">
            <Phone size={18} className="group-hover:scale-110 transition-transform" />
            <Mail size={18} className="group-hover:scale-110 transition-transform" />
          </div>
          <span className="hidden md:block">{(t as any).contactUs}</span>
        </button>
      </div>

      <div className="absolute top-6 right-6 z-20 flex gap-3 items-center">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 p-2.5 bg-white/80 dark:bg-blue-950/80 backdrop-blur-sm border-2 border-amber-100 dark:border-blue-900 rounded-full text-amber-700 dark:text-blue-300 hover:bg-amber-50 dark:hover:bg-blue-900 transition-all shadow-sm hover:shadow-md active:scale-95 uppercase font-black text-[10px]"
        >
          <Languages size={18} />
          {language}
        </button>
        
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="flex items-center gap-2 bg-white/80 dark:bg-blue-950/80 backdrop-blur-sm border-2 border-amber-100 dark:border-blue-900 px-5 py-2.5 rounded-full font-bold text-amber-700 dark:text-blue-300 hover:bg-amber-50 dark:hover:bg-blue-900 transition-all shadow-sm hover:shadow-lg active:scale-95 whitespace-nowrap"
        >
          {isDarkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-blue-500" />}
          <span className="hidden lg:block text-sm">
            {isDarkMode ? t.dayMode : t.nightMode}
          </span>
        </button>

        <button 
          onClick={() => setIsAboutModalOpen(true)}
          className="hidden md:flex items-center gap-2 bg-white/80 dark:bg-blue-950/80 backdrop-blur-sm border-2 border-amber-100 dark:border-blue-900 px-5 py-2.5 rounded-full font-bold text-amber-700 dark:text-blue-300 hover:bg-amber-50 dark:hover:bg-blue-900 transition-all shadow-sm hover:shadow-md active:scale-95"
        >
          <PawPrint size={20} />
          {t.aboutUs}
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center relative z-10 px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full max-w-3xl border-8 border-amber-50 dark:border-blue-900/20 bg-white/60 dark:bg-blue-950/60 backdrop-blur-md p-10 md:p-16 rounded-[3rem] shadow-xl"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-amber-100 dark:bg-blue-900/50 p-4 rounded-full text-amber-600 dark:text-blue-400">
              <PawPrint size={56} />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-blue-100 mb-10 font-medium">
            {t.subtitle}
            <br className="hidden md:block"/> 
            {t.description}
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button
               onClick={() => navigate('/petstagram')}
               className="w-full md:w-auto flex-1 flex items-center justify-center gap-3 bg-white dark:bg-blue-900 text-gray-700 dark:text-blue-50 hover:bg-amber-50 dark:hover:bg-blue-800 border-2 border-gray-200 dark:border-blue-800 px-8 py-4 rounded-full text-lg font-bold transition-all group"
            >
              <Camera size={24} className="group-hover:rotate-12 transition-transform text-amber-500" />
              {t.petstagram}
            </button>

            <button
              onClick={() => navigate('/map')}
              className="w-full md:w-auto flex-[1.5] flex items-center justify-center gap-4 bg-orange-500 hover:bg-orange-600 text-white px-10 py-6 rounded-full text-xl font-black transition-all transform hover:scale-110 hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] active:scale-95 shadow-xl group border-4 border-orange-400/50"
            >
              <MapIcon size={32} className="group-hover:animate-bounce" />
              {t.exploreMap}
            </button>

            <button
              onClick={() => {
                resetDonationModal();
                setIsDonationModalOpen(true);
              }}
              className="w-full md:w-auto flex-1 flex items-center justify-center gap-3 bg-white dark:bg-blue-900 text-gray-700 dark:text-blue-50 hover:bg-rose-50 dark:hover:bg-blue-800 border-2 border-gray-200 dark:border-blue-800 px-8 py-4 rounded-full text-lg font-bold transition-all group"
            >
              <Heart size={24} className="text-rose-400 group-hover:scale-125 transition-transform" />
              {t.donate}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Services Section */}
      <div className="w-full max-w-6xl mx-auto px-6 pb-20 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <div className="bg-amber-100 dark:bg-blue-900/50 p-6 rounded-full text-amber-500 dark:text-blue-400 mb-4">
            <PawPrint size={48} />
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-amber-200 dark:via-blue-900 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { key: 'vets', icon: Stethoscope, color: 'bg-blue-100', text: 'text-blue-600', dark: 'dark:bg-blue-950/40 dark:text-blue-400', category: 'veteriner' },
            { key: 'petshops', icon: ShoppingBag, color: 'bg-green-100', text: 'text-green-600', dark: 'dark:bg-green-950/40 dark:text-green-400', category: 'petshop' },
            { key: 'groomers', icon: Scissors, color: 'bg-purple-100', text: 'text-purple-600', dark: 'dark:bg-purple-950/40 dark:text-purple-400', category: 'kuaför' },
            { key: 'trainers', icon: GraduationCap, color: 'bg-rose-100', text: 'text-rose-600', dark: 'dark:bg-rose-950/40 dark:text-rose-400', category: 'eğitmen' },
            { key: 'shelters', icon: Warehouse, color: 'bg-orange-100', text: 'text-orange-600', dark: 'dark:bg-orange-950/40 dark:text-orange-400', category: 'barınak' },
            { key: 'hotels', icon: Hotel, color: 'bg-indigo-100', text: 'text-indigo-600', dark: 'dark:bg-indigo-950/40 dark:text-indigo-400', category: 'otel' },
            { key: 'wiki', icon: BookOpen, color: 'bg-cyan-100', text: 'text-cyan-600', dark: 'dark:bg-cyan-950/40 dark:text-cyan-400', category: 'bilgi' },
            { key: 'lostFound', icon: AlertCircle, color: 'bg-red-100', text: 'text-red-600', dark: 'dark:bg-red-950/40 dark:text-red-400', category: 'kayip' },
            { key: 'events', icon: CalendarDays, color: 'bg-orange-100', text: 'text-orange-600', dark: 'dark:bg-orange-950/40 dark:text-orange-400', category: 'etkinlik' },
            { key: 'foodCalc', icon: Calculator, color: 'bg-emerald-100', text: 'text-emerald-600', dark: 'dark:bg-emerald-950/40 dark:text-emerald-400', category: 'hesaplayici' },
            { key: 'petId', icon: IdCard, color: 'bg-yellow-100', text: 'text-yellow-600', dark: 'dark:bg-yellow-950/40 dark:text-yellow-400', category: 'kimlik' },
          ].map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 dark:bg-blue-950/40 backdrop-blur-sm p-6 rounded-3xl border-2 border-amber-50 dark:border-blue-900 transition-all shadow-sm group text-center relative"
            >
              <div className={`w-16 h-16 ${service.color} ${service.dark} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon size={32} />
              </div>
              <h3 className="font-bold text-gray-800 dark:text-blue-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {(t as any)[service.key]}
              </h3>
              {service.key === 'vets' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsVetAppointmentModalOpen(true);
                  }}
                  className="mt-3 text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                >
                   🩺 {(t as any).bookVet}
                </button>
              )}
              {service.key === 'groomers' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsGroomingModalOpen(true);
                  }}
                  className="mt-3 text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800 hover:bg-purple-600 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  Modeller & Hizmetler
                </button>
              )}
              {service.key === 'trainers' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsTrainerFinderModalOpen(true);
                  }}
                  className="mt-3 text-[10px] font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-300 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-800 hover:bg-rose-600 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  🎓 {(t as any).findTrainerTitle}
                </button>
              )}
              {service.key === 'wiki' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsWikiModalOpen(true);
                  }}
                  className="mt-3 text-[10px] font-bold uppercase tracking-wider bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-300 px-3 py-1 rounded-full border border-cyan-200 dark:border-cyan-800 hover:bg-cyan-600 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  📖 {(t as any).wiki}
                </button>
              )}
              {service.key === 'lostFound' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLostFoundModalOpen(true);
                  }}
                  className="mt-3 text-[10px] font-bold uppercase tracking-wider bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300 px-3 py-1 rounded-full border border-red-200 dark:border-red-800 hover:bg-red-600 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  🚨 {(t as any).lostFound}
                </button>
              )}
              {service.key === 'events' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEventsModalOpen(true);
                  }}
                  className="mt-3 text-[10px] font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300 px-3 py-1 rounded-full border border-orange-200 dark:border-orange-800 hover:bg-orange-600 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  📅 {(t as any).events}
                </button>
              )}
              {service.key === 'foodCalc' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFoodCalcModalOpen(true);
                  }}
                  className="mt-3 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-600 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  🧮 {(t as any).foodCalc}
                </button>
              )}
              {service.key === 'petId' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPetIdModalOpen(true);
                  }}
                  className="mt-3 text-[10px] font-bold uppercase tracking-wider bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-300 px-3 py-1 rounded-full border border-yellow-200 dark:border-yellow-800 hover:bg-yellow-600 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  🪪 {(t as any).petId}
                </button>
              )}
              {service.key === 'shelters' && (
                <div className="mt-2 flex flex-col gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAdoptionModalOpen(true);
                    }}
                    className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300 px-3 py-1 rounded-full border border-orange-200 dark:border-orange-800 hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                  >
                    🐾 {(t as any).applyForAdoption}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDropOffModalOpen(true);
                    }}
                    className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-300 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800 hover:bg-amber-600 hover:text-white transition-all shadow-sm"
                  >
                    📥 {(t as any).dropOffPet}
                  </button>
                </div>
              )}
              {service.key === 'petshops' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPriceFinderModalOpen(true);
                  }}
                  className="mt-3 text-[10px] font-bold uppercase tracking-wider bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300 px-3 py-1 rounded-full border border-green-200 dark:border-green-800 hover:bg-green-600 hover:text-white transition-all shadow-sm"
                >
                  {(t as any).comparePrices}
                </button>
              )}
              {service.key === 'petshops' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOnlineShopModalOpen(true);
                  }}
                  className="mt-2 text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                >
                  🚀 Online Market
                </button>
              )}
              {service.key === 'hotels' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsHotelBookingModalOpen(true);
                  }}
                  className="mt-2 text-[10px] font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                >
                  🏨 {(t as any).bookHotel}
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animal Rights Section */}
      <div className="w-full max-w-6xl mx-auto px-6 pb-24 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="bg-emerald-50/50 dark:bg-emerald-950/10 backdrop-blur-md border-4 border-emerald-100 dark:border-emerald-900/30 rounded-[3rem] p-8 md:p-12 shadow-inner"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-2xl mb-6 shadow-sm">
              <Shield size={32} />
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {(t as any).animalRightsTitle}
            </h2>
            <p className="text-lg text-emerald-800 dark:text-emerald-300 font-medium max-w-2xl mx-auto opacity-80">
              {(t as any).animalRightsSubtitle}
            </p>
          </div>

          <div className="bg-white dark:bg-emerald-950/20 rounded-[2.5rem] p-8 md:p-10 border border-emerald-100 dark:border-emerald-900/40 shadow-sm">
            <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-8 flex items-center justify-center gap-3">
               <span className="w-8 h-[2px] bg-emerald-200 dark:bg-emerald-800 hidden sm:block"></span>
               {(t as any).fiveFreedoms}
               <span className="w-8 h-[2px] bg-emerald-200 dark:bg-emerald-800 hidden sm:block"></span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                 { key: 'freedomHunger', icon: '🥛', color: 'bg-blue-50 border-blue-100' },
                 { key: 'freedomDiscomfort', icon: '🏠', color: 'bg-amber-50 border-amber-100' },
                 { key: 'freedomPain', icon: '🩺', color: 'bg-rose-50 border-rose-100' },
                 { key: 'freedomBehavior', icon: '🌳', color: 'bg-emerald-50 border-emerald-100' },
                 { key: 'freedomFear', icon: '🛡️', color: 'bg-indigo-50 border-indigo-100' },
               ].map((item) => (
                 <div key={item.key} className={`p-6 rounded-3xl border-2 ${item.color} dark:bg-gray-900/40 dark:border-gray-800 transition-all hover:shadow-md group`}>
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">
                      {item.icon}
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                       {(t as any)[item.key]}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-emerald-100 leading-relaxed">
                       {(t as any)[`${item.key}Desc`]}
                    </p>
                 </div>
               ))}
               <div className="p-6 rounded-3xl border-2 border-dashed border-emerald-200 dark:border-emerald-900 flex flex-col items-center justify-center text-center bg-gray-50/50 dark:bg-transparent">
                  <PawPrint size={48} className="text-emerald-200 dark:text-emerald-900 mb-4" />
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">
                    Zootropolis Farkındalık
                  </p>
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Emergency & First Aid Section */}
      <div className="w-full max-w-6xl mx-auto px-6 pb-24 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-white/60 dark:bg-blue-950/40 backdrop-blur-md border-4 border-amber-50 dark:border-blue-900/50 rounded-[3rem] p-8 md:p-12 shadow-xl overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-amber-50 dark:border-blue-900/50 pb-8 mb-10">
            <div className="flex items-center gap-4">
              <div className="bg-rose-100 dark:bg-rose-950/40 p-4 rounded-2xl text-rose-600 dark:text-rose-400">
                <Stethoscope size={40} />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{t.firstAid}</h2>
                <p className="text-gray-500 dark:text-blue-300 font-medium">Acil durumlarda hayat kurtaran bilgiler ve iletişim numaraları</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { titleKey: 'choking', descKey: 'chokingDesc' },
              { titleKey: 'bleeding', descKey: 'bleedingDesc' },
              { titleKey: 'poisoning', descKey: 'poisoningDesc' },
              { titleKey: 'heatstroke', descKey: 'heatstrokeDesc' },
              { titleKey: 'vomiting', descKey: 'vomitingDesc' },
              { titleKey: 'seizure', descKey: 'seizureDesc' },
              { titleKey: 'fracture', descKey: 'fractureDesc' },
              { titleKey: 'beeSting', descKey: 'beeStingDesc' },
            ].map((item) => (
              <motion.div 
                key={item.titleKey} 
                whileHover={{ y: -5 }}
                className="p-5 rounded-3xl bg-white dark:bg-blue-900/20 border border-amber-100 dark:border-blue-800/40 hover:border-amber-300 dark:hover:border-blue-500 transition-all shadow-sm"
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></div>
                  {(t as any)[item.titleKey]}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-blue-100 leading-relaxed">
                  {(t as any)[item.descKey]}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-rose-50 dark:bg-rose-950/20 border-2 border-rose-100 dark:border-rose-900/50 relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 text-rose-200 dark:text-rose-900/20 opacity-20 transform -rotate-12 group-hover:scale-110 transition-transform">
                <Phone size={160} />
              </div>
              
              <h3 className="font-bold text-xl text-rose-700 dark:text-rose-400 mb-6 flex items-center gap-2">
                <div className="bg-rose-500 text-white p-2 rounded-lg">
                  <Phone size={20} />
                </div>
                {t.emergencyContacts}
              </h3>
              
              <div className="space-y-4 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-rose-950/40 p-5 rounded-2xl border border-rose-100 dark:border-rose-900/40 shadow-sm transition-transform hover:scale-[1.01]">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-lg">{t.animalAmbulance}</p>
                    <p className="text-sm text-rose-600 dark:text-rose-400 font-medium">{t.emergencyPhone}</p>
                  </div>
                  <a 
                    href="tel:153" 
                    className="flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg active:scale-95"
                  >
                    <Phone size={20} /> 153
                  </a>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-rose-950/40 p-5 rounded-2xl border border-rose-100 dark:border-rose-900/40 shadow-sm transition-transform hover:scale-[1.01]">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-lg">{t.municipality}</p>
                    <p className="text-sm text-rose-600 dark:text-rose-400 font-medium">444 0 875</p>
                  </div>
                  <a 
                    href="tel:4440875" 
                    className="flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg active:scale-95"
                  >
                    <Phone size={20} /> Ara
                  </a>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-amber-50 dark:bg-blue-900/20 border-2 border-amber-100 dark:border-blue-900/50 flex flex-col justify-center text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-amber-100 dark:bg-blue-800/40 p-4 rounded-full text-amber-600 dark:text-blue-400">
                  <Info size={40} />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Önemli Hatırlatma</h4>
              <p className="text-amber-800 dark:text-blue-200 font-medium leading-relaxed italic">
                {language === 'tr' ? "Bu rehber sadece acil durumlar içindir. Hiç vakit kaybetmeden en yakın veterinere başvurun. Hayvanın durumunda bir değişiklik fark ederseniz not almayı unutmayın." : language === 'en' ? "This guide is for emergencies only. Consult the nearest veterinarian without any delay. Don't forget to take notes if you notice a change in the animal's condition." : "Esta guía es solo para emergencias. Consulte al veterinario más cercano sin demora alguna. No olvide tomar notas si nota un cambio en la condición del animal."}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Share Opinion Section */}
      <div className="w-full max-w-4xl mx-auto px-6 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-[3rem] p-8 md:p-12 shadow-xl border-4 border-white dark:border-blue-900/40 relative overflow-hidden group"
        >
          {/* Decorative icons */}
          <div className="absolute top-10 right-10 text-amber-200/40 dark:text-blue-500/10 group-hover:rotate-12 transition-transform">
            <Sparkles size={120} />
          </div>
          <div className="absolute bottom-10 left-10 text-orange-200/30 dark:text-indigo-500/10 group-hover:-rotate-12 transition-transform">
            <MessageSquarePlus size={100} />
          </div>

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-blue-900/50 text-amber-600 dark:text-blue-300 rounded-3xl mb-6 shadow-sm">
              <MessageSquarePlus size={40} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {(t as any).shareOpinionTitle}
            </h2>
            <p className="text-gray-600 dark:text-blue-200 mb-10 font-medium">
               {(t as any).shareOpinionSubtitle}
            </p>

            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <input
                type="text"
                placeholder={(t as any).opinionNamePlaceholder}
                value={feedbackName}
                onChange={(e) => setFeedbackName(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-blue-900/30 border-2 border-amber-100 dark:border-blue-800/40 focus:border-amber-400 dark:focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-blue-300/30"
              />
              <textarea
                rows={4}
                required
                placeholder={(t as any).opinionMessagePlaceholder}
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-blue-900/30 border-2 border-amber-100 dark:border-blue-800/40 focus:border-amber-400 dark:focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-blue-300/30 resize-none"
              />
              <button
                type="submit"
                className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-amber-500/25 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Send size={22} />
                {(t as any).sendOpinion}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      <footer className="py-6 text-center text-gray-500 dark:text-blue-400/40 text-sm relative z-10">
        <p>{t.title} &copy; {new Date().getFullYear()} - {t.footer}</p>
      </footer>

      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#020617] border-4 border-blue-50/50 dark:border-blue-900/50 rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white p-2 transition-colors bg-blue-50 dark:bg-blue-900/50 rounded-full z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-8 text-center">
                 <div>
                    <div className="bg-blue-100 dark:bg-blue-900/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                       <Phone size={32} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{(t as any).contactUs}</h2>
                    <p className="text-gray-500 dark:text-blue-300 mt-2">Bize her zaman ulaşabilirsiniz.</p>
                 </div>

                 <div className="space-y-4">
                    <a 
                      href="tel:+902160000000" 
                      className="flex items-center gap-4 p-5 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border-2 border-transparent hover:border-blue-200 transition-all group"
                    >
                       <div className="bg-white dark:bg-blue-900 p-3 rounded-xl shadow-sm text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                          <Phone size={24} />
                       </div>
                       <div className="text-left">
                          <p className="text-xs font-bold text-blue-500 uppercase tracking-widest">{(t as any).callUs}</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">+90 216 000 00 00</p>
                       </div>
                    </a>

                    <a 
                      href="mailto:destek@zootropolis.com" 
                      className="flex items-center gap-4 p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border-2 border-transparent hover:border-emerald-200 transition-all group"
                    >
                       <div className="bg-white dark:bg-blue-900 p-3 rounded-xl shadow-sm text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                          <Mail size={24} />
                       </div>
                       <div className="text-left">
                          <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">{(t as any).mailUs}</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">destek@zootropolis.com</p>
                       </div>
                    </a>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isWikiModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#020617] border-4 border-cyan-50/50 dark:border-blue-900/50 rounded-[2.5rem] p-8 max-w-4xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsWikiModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white p-2 transition-colors bg-cyan-50 dark:bg-cyan-900/50 rounded-full z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-8 text-left">
                 <div className="flex items-center gap-4 border-b-2 border-cyan-50 dark:border-blue-900/50 pb-4">
                    <div className="bg-cyan-100 dark:bg-cyan-950/40 p-3 rounded-2xl text-cyan-600 dark:text-cyan-400 shadow-sm">
                      <BookOpen size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">{(t as any).wiki}</h2>
                      <p className="text-sm text-gray-500 dark:text-blue-300">{(t as any).wikiSubtitle}</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { icon: Stethoscope, title: (t as any).healthTips, keys: ['Aşı Takvimi', 'Parazit Kontrolü', 'Evde İlk Yardım'], color: 'bg-blue-50 dark:bg-blue-900/20' },
                      { icon: Dog, title: (t as any).breedInfo, keys: ['Popüler Irklar', 'Mizaç Analizi', 'Egzersiz İhtiyacı'], color: 'bg-amber-50 dark:bg-amber-900/20' },
                      { icon: ShoppingBag, title: (t as any).nutrition, keys: ['Dengeli Diyet', 'Zararlı Gıdalar', 'Yaş-Kuru Mama'], color: 'bg-green-50 dark:bg-green-900/20' },
                      { icon: GraduationCap, title: (t as any).trainingTips, keys: ['Tuvalet Eğitimi', 'Tasma Eğitimi', 'Komutlar'], color: 'bg-purple-50 dark:bg-purple-900/20' }
                    ].map((card, i) => (
                      <div key={i} className={`p-5 rounded-3xl ${card.color} border-2 border-transparent hover:border-current transition-all cursor-pointer`}>
                         <card.icon size={24} className="mb-3 opacity-70" />
                         <h4 className="font-bold text-lg mb-3 dark:text-white">{card.title}</h4>
                         <ul className="space-y-2">
                            {card.keys.map((k, j) => (
                              <li key={j} className="text-xs font-semibold text-gray-500 dark:text-blue-300 flex items-center gap-2">
                                 <span className="w-1 h-1 bg-current rounded-full"></span>
                                 {k}
                              </li>
                            ))}
                         </ul>
                      </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isLostFoundModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#020617] border-4 border-red-50/50 dark:border-blue-900/50 rounded-[2.5rem] p-8 max-w-4xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsLostFoundModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white p-2 transition-colors bg-red-50 dark:bg-red-900/50 rounded-full z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-8 text-left">
                 <div className="flex items-center gap-4 border-b-2 border-red-50 dark:border-blue-900/50 pb-4">
                    <div className="bg-red-100 dark:bg-red-950/40 p-3 rounded-2xl text-red-600 dark:text-red-400 shadow-sm">
                      <AlertCircle size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">{(t as any).lostFound}</h2>
                      <p className="text-sm text-gray-500 dark:text-blue-300">{(t as any).lostFoundSubtitle}</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-red-50 dark:bg-red-950/20 p-8 rounded-[2rem] border-2 border-dashed border-red-200 dark:border-red-900 flex flex-col items-center text-center gap-4 group cursor-pointer hover:bg-red-100/50 transition-all">
                       <div className="bg-white dark:bg-red-900 p-4 rounded-2xl text-red-600 dark:text-red-400 shadow-md group-hover:scale-110 transition-transform">
                          <Search size={40} />
                       </div>
                       <h3 className="text-2xl font-bold dark:text-white">{(t as any).reportLost}</h3>
                       <p className="text-sm text-gray-500 dark:text-red-200">Dostunuzun bilgilerini girerek binlerce kişiye ulaşın.</p>
                       <button className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg active:scale-95">Formu Doldur</button>
                    </div>

                    <div className="bg-emerald-50 dark:bg-emerald-950/20 p-8 rounded-[2rem] border-2 border-dashed border-emerald-200 dark:border-emerald-900 flex flex-col items-center text-center gap-4 group cursor-pointer hover:bg-emerald-100/50 transition-all">
                       <div className="bg-white dark:bg-emerald-900 p-4 rounded-2xl text-emerald-600 dark:text-emerald-400 shadow-md group-hover:scale-110 transition-transform">
                          <PawPrint size={40} />
                       </div>
                       <h3 className="text-2xl font-bold dark:text-white">{(t as any).reportFound}</h3>
                       <p className="text-sm text-gray-500 dark:text-emerald-200">Yolda bir can mı buldunuz? Sahiplerine ulaştıralım.</p>
                       <button className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg active:scale-95">İhbar Et</button>
                    </div>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isLiveSupportModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end justify-start p-6 bg-black/20 backdrop-blur-[2px] pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, x: -50, y: 50 }}
              animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, x: -50, y: 50 }}
              className="bg-white dark:bg-[#020617] border-4 border-emerald-50/50 dark:border-blue-900/50 rounded-[2rem] w-full max-w-[380px] shadow-2xl relative overflow-hidden pointer-events-auto flex flex-col h-[500px]"
            >
              <div className="bg-emerald-600 p-6 text-white flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="relative">
                       <div className="bg-white/20 p-2 rounded-xl">
                          <Headset size={24} />
                       </div>
                       <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-emerald-600 rounded-full"></span>
                    </div>
                    <div>
                       <h3 className="font-bold">{(t as any).agentName}</h3>
                       <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">{(t as any).online}</p>
                    </div>
                 </div>
                 <button 
                   onClick={() => setIsLiveSupportModalOpen(false)}
                   className="text-white/60 hover:text-white transition-colors"
                 >
                   <X size={20} />
                 </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50/50 dark:bg-blue-950/20">
                 <div className="flex items-end gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                       <PawPrint size={16} />
                    </div>
                    <div className="bg-white dark:bg-blue-900 border-2 border-emerald-50 dark:border-blue-800 p-3 rounded-2xl rounded-bl-none text-sm shadow-sm dark:text-blue-50">
                       {(t as any).agentGreeting}
                    </div>
                 </div>
              </div>

              <div className="p-4 bg-white dark:bg-[#020617] border-t-2 border-gray-100 dark:border-blue-900">
                 <div className="relative">
                    <input 
                      type="text" 
                      placeholder={(t as any).chatPlaceholder}
                      className="w-full pl-4 pr-12 py-3 rounded-xl bg-gray-50 dark:bg-blue-900/30 border-2 border-emerald-100 dark:border-blue-800 outline-none focus:border-emerald-400 transition-all text-sm"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-all shadow-md active:scale-90">
                       <Send size={16} />
                    </button>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isEventsModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#020617] border-4 border-orange-50/50 dark:border-blue-900/50 rounded-[2.5rem] p-8 max-w-4xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsEventsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white p-2 transition-colors bg-orange-50 dark:bg-blue-900/50 rounded-full z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-8 text-left">
                 <div className="flex items-center gap-4 border-b-2 border-orange-50 dark:border-blue-900/50 pb-4">
                    <div className="bg-orange-100 dark:bg-orange-950/40 p-3 rounded-2xl text-orange-600 dark:text-orange-400 shadow-sm">
                      <CalendarDays size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">{(t as any).events}</h2>
                      <p className="text-sm text-gray-500 dark:text-blue-300">{(t as any).eventsSubtitle}</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { date: '25 Nisan', title: 'Toplu Aşılama Günü', loc: 'Üsküdar Sahil Park', color: 'bg-blue-50', icon: Stethoscope },
                      { date: '2 Mayıs', title: 'Pati Festivali', loc: 'Millet Bahçesi', color: 'bg-amber-50', icon: Sparkles },
                      { date: '15 Mayıs', title: 'Barınak Gönüllü Günü', loc: 'Merkez Barınak', color: 'bg-green-50', icon: Heart }
                    ].map((ev, i) => (
                      <div key={i} className={`p-6 rounded-[2rem] ${ev.color} dark:bg-blue-950/30 border-2 border-transparent hover:border-orange-200 transition-all cursor-pointer group`}>
                         <div className="bg-white dark:bg-blue-900 w-fit px-4 py-1 rounded-full text-xs font-bold text-orange-600 dark:text-orange-400 mb-4 shadow-sm">
                            {ev.date}
                         </div>
                         <div className="flex items-center gap-2 mb-2">
                            <ev.icon size={18} className="text-gray-400" />
                            <h4 className="font-bold text-gray-900 dark:text-white">{ev.title}</h4>
                         </div>
                         <p className="text-xs text-gray-500 dark:text-blue-300 flex items-center gap-1">
                            <MapPin size={12} /> {ev.loc}
                         </p>
                      </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isFoodCalcModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#020617] border-4 border-emerald-50/50 dark:border-blue-900/50 rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsFoodCalcModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white p-2 transition-colors bg-emerald-50 dark:bg-blue-900/50 rounded-full z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-8 text-center">
                 <div>
                    <div className="bg-emerald-100 dark:bg-blue-900/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-blue-400">
                       <Calculator size={32} />
                    </div>
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">{(t as any).foodCalc}</h2>
                    <p className="text-sm text-gray-500 dark:text-blue-300">{(t as any).foodCalcSubtitle}</p>
                 </div>

                 <div className="space-y-6 text-left">
                    <div>
                       <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{(t as any).weight}</label>
                       <input type="number" placeholder="5" className="w-full p-4 bg-gray-50 dark:bg-blue-950/40 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-400 transition-all font-bold dark:text-white" />
                    </div>

                    <div>
                       <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{(t as any).activityLevel}</label>
                       <div className="grid grid-cols-3 gap-2">
                          {[(t as any).low, (t as any).medium, (t as any).high].map((lvl, i) => (
                            <button key={i} className={`p-3 rounded-xl font-bold transition-all border-2 ${i === 1 ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg' : 'bg-white dark:bg-blue-900 dark:text-white border-gray-100 dark:border-blue-800'}`}>
                               {lvl}
                            </button>
                          ))}
                       </div>
                    </div>

                    <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-emerald-700 hover:scale-[1.02] active:scale-95 transition-all">
                       {(t as any).calculate}
                    </button>

                    <div className="p-6 bg-emerald-50 dark:bg-blue-900/30 rounded-[2rem] border-2 border-emerald-100 dark:border-blue-800 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <ShoppingBag className="text-emerald-500" />
                          <span className="font-bold dark:text-white">{(t as any).dailyResult}</span>
                       </div>
                       <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">125g</span>
                    </div>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isPetIdModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#020617] border-4 border-yellow-50/50 dark:border-blue-900/50 rounded-[2.5rem] p-8 max-sm w-full shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsPetIdModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white p-2 transition-colors bg-yellow-50 dark:bg-blue-900/50 rounded-full z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-6 text-center">
                 <div className="relative">
                    <div className="w-32 h-32 bg-amber-100 dark:bg-blue-900/50 rounded-full mx-auto flex items-center justify-center text-amber-600 dark:text-blue-400">
                       <IdCard size={64} />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-2 rounded-full shadow-lg">
                       <Sparkles size={20} />
                    </div>
                 </div>

                 <div>
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">{(t as any).petId}</h2>
                    <p className="text-sm text-gray-500 dark:text-blue-300">{(t as any).petIdSubtitle}</p>
                 </div>

                 <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-[2px] rounded-[2rem] shadow-xl">
                    <div className="bg-white dark:bg-[#020617] rounded-[1.9rem] p-6 text-left relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 opacity-10">
                          <PawPrint size={100} />
                       </div>
                       <div className="flex justify-between items-start mb-6">
                          <div className="bg-amber-100 dark:bg-blue-900 w-12 h-12 rounded-xl flex items-center justify-center text-amber-600">
                             <Cat size={24} />
                          </div>
                          <div className="text-[10px] font-black text-amber-500 tracking-tighter uppercase leading-none">
                             Zootropolis<br/>Passport
                          </div>
                       </div>
                       <div className="space-y-3">
                          <div>
                             <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none">Name</p>
                             <p className="text-lg font-black text-gray-900 dark:text-white">Duman</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div>
                                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none">Breed</p>
                                <p className="text-sm font-bold text-gray-800 dark:text-blue-100">Tekir</p>
                             </div>
                             <div>
                                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none">City</p>
                                <p className="text-sm font-bold text-gray-800 dark:text-blue-100">Istanbul</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 <button className="w-full bg-gray-900 dark:bg-blue-800 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                    <ArrowDownToLine size={20} />
                    PNG Olarak İndir
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isNewsModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#020617] border-4 border-indigo-50/50 dark:border-blue-900/50 rounded-[2.5rem] p-8 max-w-4xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsNewsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white p-2 transition-colors bg-indigo-50 dark:bg-indigo-900/50 rounded-full z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-8 relative text-left">
                 <div className="flex items-center gap-4 border-b-2 border-indigo-50 dark:border-blue-900/50 pb-4">
                    <div className="bg-indigo-100 dark:bg-indigo-950/40 p-3 rounded-2xl text-indigo-600 dark:text-indigo-400 shadow-sm">
                      <Newspaper size={28} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{(t as any).animalNews}</h2>
                      <p className="text-gray-500 dark:text-blue-300">{(t as any).latestNews}</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { 
                        title: (t as any).newsTitle1, 
                        desc: (t as any).newsDesc1, 
                        img: "https://picsum.photos/seed/park/800/600",
                        tag: "Belediye",
                        color: "bg-green-100 text-green-700"
                      },
                      { 
                        title: (t as any).newsTitle2, 
                        desc: (t as any).newsDesc2, 
                        img: "https://picsum.photos/seed/winter/800/600",
                        tag: "Yardım",
                        color: "bg-amber-100 text-amber-700"
                      },
                      { 
                        title: (t as any).newsTitle3, 
                        desc: (t as any).newsDesc3, 
                        img: "https://picsum.photos/seed/vet/800/600",
                        tag: "Sağlık",
                        color: "bg-blue-100 text-blue-700"
                      }
                    ].map((item, idx) => (
                      <motion.div 
                        key={idx}
                        whileHover={{ y: -10 }}
                        className="bg-gray-50 dark:bg-blue-900/20 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border-2 border-transparent hover:border-indigo-100 dark:hover:border-blue-800"
                      >
                         <div className="relative h-48">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.color}`}>
                               {item.tag}
                            </span>
                         </div>
                         <div className="p-6">
                            <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white leading-tight">{item.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-blue-200 mb-4 line-clamp-3">{item.desc}</p>
                            <button className="text-indigo-600 dark:text-indigo-400 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                               {(t as any).readMore} <Sparkles size={14} />
                            </button>
                         </div>
                      </motion.div>
                    ))}
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isTrainerFinderModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#020617] border-4 border-rose-50/50 dark:border-blue-900/50 rounded-[2.5rem] p-8 max-w-3xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsTrainerFinderModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white p-2 transition-colors bg-rose-50 dark:bg-rose-900/50 rounded-full z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-6 relative text-left">
                 <div className="flex items-center gap-4 border-b-2 border-rose-50 dark:border-blue-900/50 pb-4">
                    <div className="bg-rose-100 dark:bg-rose-950/40 p-3 rounded-2xl text-rose-600 dark:text-rose-400 shadow-sm">
                      <GraduationCap size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">{(t as any).findTrainerTitle}</h2>
                      <p className="text-sm text-gray-500 dark:text-blue-300">{(t as any).findTrainerSubtitle}</p>
                    </div>
                 </div>

                 <div className="flex gap-2">
                    <div className="relative flex-grow">
                       <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400" />
                       <input 
                         type="text" 
                         placeholder={(t as any).searchTrainer}
                         className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-rose-100 dark:border-blue-800 outline-none focus:border-rose-400 transition-all font-medium"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Emre Can Özdemir', skill: (t as any).basicObedience, exp: '8', price: '400 ₺ / Seans', color: 'bg-blue-50 dark:bg-blue-900/20' },
                      { name: 'Selin Yılmaz', skill: (t as any).behavioralCorrection, exp: '12', price: '600 ₺ / Seans', color: 'bg-purple-50 dark:bg-purple-900/20' },
                      { name: 'Burak Aydın', skill: (t as any).socialization, exp: '5', price: '350 ₺ / Seans', color: 'bg-green-50 dark:bg-green-900/20' },
                      { name: 'Merve Demir', skill: (t as any).advancedObedience, exp: '10', price: '550 ₺ / Seans', color: 'bg-amber-50 dark:bg-amber-900/20' }
                    ].map((trainer, idx) => (
                      <motion.div 
                        key={idx}
                        whileHover={{ y: -5 }}
                        className={`p-5 rounded-3xl border-2 border-transparent hover:border-rose-200 transition-all ${trainer.color}`}
                      >
                         <div className="flex justify-between items-start mb-3">
                            <div>
                               <h4 className="font-bold text-gray-900 dark:text-white">{trainer.name}</h4>
                               <p className="text-xs font-semibold text-rose-500 dark:text-rose-400 uppercase tracking-wider">{trainer.skill}</p>
                            </div>
                            <div className="bg-white/80 dark:bg-blue-950/80 px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm">
                               {trainer.exp} {(t as any).yearsExperience}
                            </div>
                         </div>
                         <div className="flex items-center justify-between mt-4">
                            <span className="text-sm font-bold text-gray-700 dark:text-blue-100">{trainer.price}</span>
                            <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-500/20 active:scale-95">
                               {(t as any).contactTrainer}
                            </button>
                         </div>
                      </motion.div>
                    ))}
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isVetAppointmentModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#020617] border-4 border-blue-50/50 dark:border-blue-900/50 rounded-[2.5rem] p-8 max-w-2xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsVetAppointmentModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white p-2 transition-colors bg-blue-50 dark:bg-blue-900/50 rounded-full z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-6 relative text-left">
                 <div className="flex items-center gap-4 border-b-2 border-blue-50 dark:border-blue-900/50 pb-4">
                    <div className="bg-blue-100 dark:bg-blue-950/40 p-3 rounded-2xl text-blue-600 dark:text-blue-400 shadow-sm">
                      <Stethoscope size={28} />
                    </div>
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">{(t as any).vetAppointmentTitle}</h2>
                 </div>

                 <p className="text-gray-600 dark:text-blue-200 font-medium">{(t as any).vetAppointmentSubtitle}</p>

                 <form className="space-y-4" onSubmit={(e) => {
                   e.preventDefault();
                   alert((t as any).appointmentSuccess);
                   setIsVetAppointmentModalOpen(false);
                 }}>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{(t as any).selectVet}</label>
                       <select required className="w-full px-6 py-3 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-blue-100 dark:border-blue-800 outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer">
                          <option value="uskudar-vet">Üsküdar Veteriner Kliniği</option>
                          <option value="pati-dostu">Pati Dostu Sağlık Merkezi</option>
                          <option value="mavi-pati">Mavi Pati Hayvan Hastanesi</option>
                          <option value="merkez-vet">Merkez Veteriner Polikliniği</option>
                       </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{(t as any).appointmentDate}</label>
                          <div className="relative">
                             <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                             <input type="date" required className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-blue-100 dark:border-blue-800 outline-none focus:border-blue-400 transition-all" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{(t as any).appointmentTime}</label>
                          <div className="relative">
                             <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                             <input type="time" required className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-blue-100 dark:border-blue-800 outline-none focus:border-blue-400 transition-all" />
                          </div>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{(t as any).reasonForVisit}</label>
                       <select required className="w-full px-6 py-3 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-blue-100 dark:border-blue-800 outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer">
                          <option value="routine">{(t as any).routineCheckup}</option>
                          <option value="vaccination">{(t as any).vaccination}</option>
                          <option value="emergency">{(t as any).emergency}</option>
                          <option value="surgery">{(t as any).surgery}</option>
                       </select>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl font-bold text-lg transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Calendar size={22} /> {(t as any).complete}
                    </button>
                 </form>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isAdoptionModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#020617] border-4 border-orange-50/50 dark:border-blue-900/50 rounded-[2.5rem] p-8 max-w-2xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsAdoptionModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white p-2 transition-colors bg-orange-50 dark:bg-orange-900/50 rounded-full z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-6 relative text-left">
                 <div className="flex items-center gap-4 border-b-2 border-orange-50 dark:border-blue-900/50 pb-4">
                    <div className="bg-orange-100 dark:bg-orange-950/40 p-3 rounded-2xl text-orange-600 dark:text-orange-400 shadow-sm">
                      <UserPlus size={28} />
                    </div>
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">{(t as any).adoptionTitle}</h2>
                 </div>

                 <p className="text-gray-600 dark:text-blue-200 font-medium">{(t as any).adoptionSubtitle}</p>

                 <form className="space-y-4" onSubmit={(e) => {
                   e.preventDefault();
                   alert((t as any).adoptionSuccess);
                   setIsAdoptionModalOpen(false);
                 }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <input type="text" placeholder={(t as any).name} required className="w-full px-6 py-3 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-orange-100 dark:border-blue-800 outline-none focus:border-orange-400 transition-all" />
                       <input type="text" placeholder={(t as any).surname} required className="w-full px-6 py-3 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-orange-100 dark:border-blue-800 outline-none focus:border-orange-400 transition-all" />
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">{(t as any).experienceWithPets}</label>
                       <textarea rows={2} required className="w-full px-6 py-3 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-orange-100 dark:border-blue-800 outline-none focus:border-orange-400 transition-all resize-none" />
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">{(t as any).homeEnvironment}</label>
                       <select required className="w-full px-6 py-3 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-orange-100 dark:border-blue-800 outline-none focus:border-orange-400 transition-all appearance-none cursor-pointer">
                          <option value="apartman">Apartman Dairesi</option>
                          <option value="bahceli">Bahçeli Ev</option>
                          <option value="diger">Diğer</option>
                       </select>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">{(t as any).whyAdopt}</label>
                       <textarea rows={3} required className="w-full px-6 py-3 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-orange-100 dark:border-blue-800 outline-none focus:border-orange-400 transition-all resize-none" />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-3xl font-bold text-lg transition-all shadow-lg shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Heart size={22} /> {(t as any).confirmBooking}
                    </button>
                 </form>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isDropOffModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#020617] border-4 border-amber-50/50 dark:border-blue-900/50 rounded-[2.5rem] p-8 max-w-2xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsDropOffModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white p-2 transition-colors bg-amber-50 dark:bg-amber-900/50 rounded-full z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-6 relative text-left">
                 <div className="flex items-center gap-4 border-b-2 border-amber-50 dark:border-blue-900/50 pb-4">
                    <div className="bg-amber-100 dark:bg-amber-950/40 p-3 rounded-2xl text-amber-600 dark:text-amber-400 shadow-sm">
                      <ArrowDownToLine size={28} />
                    </div>
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">{(t as any).dropOffTitle}</h2>
                 </div>

                 <p className="text-gray-600 dark:text-blue-200 font-medium">{(t as any).dropOffSubtitle}</p>

                 <form className="space-y-4" onSubmit={(e) => {
                   e.preventDefault();
                   alert((t as any).dropOffSuccess);
                   setIsDropOffModalOpen(false);
                 }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <input type="text" placeholder={(t as any).name} required className="w-full px-6 py-3 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-amber-100 dark:border-blue-800 outline-none focus:border-amber-400 transition-all" />
                       <input type="tel" placeholder={(t as any).phone} required className="w-full px-6 py-3 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-amber-100 dark:border-blue-800 outline-none focus:border-amber-400 transition-all" />
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">{(t as any).petCondition}</label>
                       <textarea rows={2} required className="w-full px-6 py-3 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-amber-100 dark:border-blue-800 outline-none focus:border-amber-400 transition-all resize-none" />
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">{(t as any).foundLocation}</label>
                       <textarea rows={2} required className="w-full px-6 py-3 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-amber-100 dark:border-blue-800 outline-none focus:border-amber-400 transition-all resize-none" />
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">{(t as any).targetShelter}</label>
                       <select required className="w-full px-6 py-3 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-amber-100 dark:border-blue-800 outline-none focus:border-amber-400 transition-all appearance-none cursor-pointer">
                          <option value="uskudar">Üsküdar Belediyesi Barınağı</option>
                          <option value="huzur">Huzur Pati Barınağı</option>
                          <option value="gokturk">Göktürk Sokak Hayvanları Merkezi</option>
                       </select>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">{(t as any).whyLeave}</label>
                       <textarea rows={3} placeholder={(t as any).reasonPlaceholder} required className="w-full px-6 py-3 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-amber-100 dark:border-blue-800 outline-none focus:border-amber-400 transition-all resize-none" />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-3xl font-bold text-lg transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <ArrowDownToLine size={22} /> {(t as any).complete}
                    </button>
                 </form>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isHotelBookingModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#020617] border-4 border-indigo-50/50 dark:border-blue-900/50 rounded-[2.5rem] p-8 max-w-2xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsHotelBookingModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white p-2 transition-colors bg-indigo-50 dark:bg-indigo-900/50 rounded-full z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-6 relative text-left">
                 <div className="flex items-center gap-4 border-b-2 border-indigo-50 dark:border-blue-900/50 pb-4">
                    <div className="bg-indigo-100 dark:bg-indigo-950/40 p-3 rounded-2xl text-indigo-600 dark:text-indigo-400 shadow-sm">
                      <Hotel size={28} />
                    </div>
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">{(t as any).hotelBookingTitle}</h2>
                 </div>

                 <p className="text-gray-600 dark:text-blue-200 font-medium">{(t as any).hotelBookingSubtitle}</p>

                 <form className="space-y-6" onSubmit={(e) => {
                   e.preventDefault();
                   alert((t as any).bookingSuccess);
                   setIsHotelBookingModalOpen(false);
                 }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{(t as any).checkInDate}</label>
                          <div className="relative">
                             <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                             <input type="date" required className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-indigo-100 dark:border-blue-800 outline-none focus:border-indigo-400 transition-all" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{(t as any).checkOutDate}</label>
                          <div className="relative">
                             <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                             <input type="date" required className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-indigo-100 dark:border-blue-800 outline-none focus:border-indigo-400 transition-all" />
                          </div>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{(t as any).petType}</label>
                       <select required className="w-full px-6 py-3 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-indigo-100 dark:border-blue-800 outline-none focus:border-indigo-400 transition-all appearance-none cursor-pointer">
                          <option value="">{(t as any).all}</option>
                          <option value="kedi">Kedi</option>
                          <option value="kopek">Köpek</option>
                          <option value="diger">Diğer</option>
                       </select>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{(t as any).selectHotel}</label>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { name: 'Üsküdar Pati Otel', price: '450 ₺ / Gün' },
                            { name: 'Mavi Rüya Pet Resort', price: '600 ₺ / Gün' },
                            { name: 'Saray Yavrusu Kedi Evi', price: '350 ₺ / Gün' },
                            { name: 'Mutlu Kuyruklar Hotel', price: '500 ₺ / Gün' }
                          ].map((hotel, idx) => (
                            <label key={idx} className="relative cursor-pointer group">
                               <input type="radio" name="hotel" required className="peer sr-only" />
                               <div className="p-4 rounded-2xl border-2 border-gray-100 dark:border-blue-900 bg-white dark:bg-blue-950/20 group-hover:border-indigo-200 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 dark:peer-checked:bg-indigo-950/40 transition-all">
                                  <p className="font-bold text-sm text-gray-900 dark:text-white">{hotel.name}</p>
                                  <p className="text-[10px] text-indigo-500 font-bold">{hotel.price}</p>
                               </div>
                            </label>
                          ))}
                       </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl font-bold text-lg transition-all shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <PawPrint size={22} /> {(t as any).confirmBooking}
                    </button>
                 </form>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isOnlineShopModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#020617] border-4 border-blue-50/50 dark:border-blue-900/50 rounded-[2.5rem] p-0 max-w-5xl w-full shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b-2 border-blue-50 dark:border-blue-900/50 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-950/20">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 dark:bg-blue-950/40 p-4 rounded-3xl text-blue-600 dark:text-blue-400 shadow-sm">
                    <ShoppingBag size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">{(t as any).onlineMarket}</h2>
                    <p className="text-sm text-gray-500 dark:text-blue-300 font-medium">{(t as any).onlineMarketSubtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <button className="p-3 bg-white dark:bg-blue-900/40 border-2 border-blue-100 dark:border-blue-800 rounded-2xl text-blue-600 dark:text-blue-400 hover:bg-blue-50 transition-colors">
                      <ShoppingCart size={24} />
                    </button>
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-blue-900 animate-bounce">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => setIsOnlineShopModalOpen(false)}
                    className="p-3 bg-gray-100 dark:bg-blue-900/50 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Filter Area */}
              <div className="px-6 md:px-8 py-4 flex items-center gap-3 overflow-x-auto no-scrollbar border-b border-gray-100 dark:border-blue-900/30">
                {[(t as any).all, (t as any).food, (t as any).toys, (t as any).health, (t as any).accessories].map((cat, idx) => (
                  <button 
                    key={cat} 
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${idx === 0 ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 dark:bg-blue-900/30 text-gray-600 dark:text-blue-300 hover:bg-blue-50'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Product Grid */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 no-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { id: 1, name: 'Premium Kedi Maması', category: (t as any).food, price: '850 ₺', img: 'https://picsum.photos/seed/catfood/400/400', shop: 'Pati Sarayı' },
                    { id: 2, name: 'Renkli İp Oyuncak', category: (t as any).toys, price: '120 ₺', img: 'https://picsum.photos/seed/pettoy/400/400', shop: 'Üsküdar Pet Dünyası' },
                    { id: 3, name: 'Voleybol Topu Desenli Yatak', category: (t as any).accessories, price: '450 ₺', img: 'https://picsum.photos/seed/petbed/400/400', shop: 'Mavi Pati' },
                    { id: 4, name: 'Vitamin Kompleksi', category: (t as any).health, price: '320 ₺', img: 'https://picsum.photos/seed/pethealth/400/400', shop: 'Pet Dünyası' },
                    { id: 5, name: 'Sızdırmaz Mama Kabı', category: (t as any).accessories, price: '180 ₺', img: 'https://picsum.photos/seed/petbowl/400/400', shop: 'Pati Sarayı' },
                    { id: 6, name: 'Tüy Toplayıcı Rulo', category: (t as any).accessories, price: '75 ₺', img: 'https://picsum.photos/seed/petbrush/400/400', shop: 'Üsküdar Pet' }
                  ].map((product) => (
                    <motion.div 
                      key={product.id}
                      whileHover={{ y: -5 }}
                      className="bg-white dark:bg-blue-900/10 rounded-3xl border border-gray-100 dark:border-blue-800/40 overflow-hidden group shadow-sm hover:shadow-xl transition-all"
                    >
                      <div className="aspect-square relative overflow-hidden bg-gray-50 dark:bg-blue-950/40">
                         <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                         <div className="absolute top-4 left-4 bg-white/90 dark:bg-blue-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-800 shadow-sm uppercase">
                           {product.category}
                         </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                           <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">{product.name}</h3>
                           <span className="font-extrabold text-blue-600 dark:text-blue-400">{product.price}</span>
                        </div>
                        <p className="text-xs text-gray-400 dark:text-blue-300/50 mb-6 flex items-center gap-1">
                          <MapPin size={10} /> {product.shop}
                        </p>
                        <button 
                          onClick={() => setCartCount(c => c + 1)}
                          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md shadow-blue-500/20"
                        >
                          <ShoppingCart size={16} /> {(t as any).addToCart}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* View Cart Footer (Sticky on Mobile) */}
              <div className="p-6 bg-white dark:bg-[#020617] border-t-2 border-blue-50 dark:border-blue-900/50 md:hidden">
                 <button className="w-full py-4 bg-blue-600 text-white rounded-[2rem] font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30 overflow-hidden relative group">
                    <span className="relative z-10 flex items-center gap-3">
                       <ShoppingCart size={20} /> {(t as any).viewCart} ({cartCount})
                    </span>
                    <motion.div 
                      className="absolute inset-0 bg-blue-500"
                      initial={false}
                      whileHover={{ scale: 1.5 }}
                    />
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isPriceFinderModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#020617] border-4 border-green-50/50 dark:border-blue-900/50 rounded-3xl p-8 max-w-4xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsPriceFinderModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white p-2 transition-colors bg-green-50 dark:bg-green-900/50 rounded-full z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-6 relative text-left">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-green-50 dark:border-blue-900/50 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 dark:bg-green-950/40 p-3 rounded-2xl text-green-600 dark:text-green-400">
                        <ShoppingBag size={28} />
                      </div>
                      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">{(t as any).priceFinderTitle}</h2>
                    </div>
                 </div>

                 <p className="text-gray-600 dark:text-blue-200 font-medium">{(t as any).priceFinderSubtitle}</p>

                 <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="text" 
                      placeholder={(t as any).searchProductPlaceholder}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-blue-900/30 border-2 border-green-100 dark:border-blue-800 focus:border-green-400 outline-none transition-all"
                    />
                 </div>

                 <div className="space-y-4">
                    {[
                      { name: 'N&D Kedi Maması 10KG', price: '1.450 ₺', shop: 'Pati Sarayı - Üsküdar Merkez', isBest: true },
                      { name: 'Royal Canin Kuru Mama', price: '980 ₺', shop: 'Üsküdar Pet Dünyası', isBest: false },
                      { name: 'Brit Care Somonlu 12KG', price: '1.200 ₺', shop: 'Mavi Pati Petshop', isBest: true },
                    ].map((item, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-5 rounded-2xl bg-white dark:bg-blue-900/10 border border-gray-100 dark:border-blue-800/40 flex items-center justify-between group hover:border-green-300 transition-all"
                      >
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 bg-gray-100 dark:bg-blue-800/30 rounded-xl flex items-center justify-center text-2xl">
                             📦
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-blue-300">{item.shop}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1 justify-end">
                            {item.isBest && (
                              <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Sparkles size={10} /> {(t as any).bestPrice}
                              </span>
                            )}
                            <span className="font-bold text-lg text-green-600 dark:text-green-400">{item.price}</span>
                          </div>
                          <button className="text-xs font-bold text-blue-500 hover:underline">{(t as any).shopNow}</button>
                        </div>
                      </motion.div>
                    ))}
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isGroomingModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#020617] border-4 border-purple-50/50 dark:border-blue-900/50 rounded-3xl p-8 max-w-4xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsGroomingModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white p-2 transition-colors bg-gray-100 dark:bg-blue-900/50 rounded-full z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-6 relative text-left">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-purple-50 dark:border-blue-900/50 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-purple-100 dark:bg-purple-950/40 p-3 rounded-2xl text-purple-600 dark:text-purple-400">
                        <Scissors size={28} />
                      </div>
                      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">{t.groomingGuide}</h2>
                    </div>
                 </div>

                 <p className="text-gray-600 dark:text-blue-200 font-medium">{(t as any).groomingSubtitle}</p>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { titleKey: 'machineCut', descKey: 'machineCutDesc', icon: '✂️' },
                      { titleKey: 'scissorsCut', descKey: 'scissorsCutDesc', icon: '🎨' },
                      { titleKey: 'teddyBear', descKey: 'teddyBearDesc', icon: '🧸' },
                      { titleKey: 'lionCut', descKey: 'lionCutDesc', icon: '🦁' },
                      { titleKey: 'hygienicCut', descKey: 'hygienicCutDesc', icon: '✨' },
                      { titleKey: 'bathDry', descKey: 'bathDryDesc', icon: '🧼' },
                    ].map((item) => (
                      <div 
                        key={item.titleKey} 
                        className="p-5 rounded-2xl bg-gray-50 dark:bg-blue-900/10 border border-gray-100 dark:border-blue-800/40 flex gap-4"
                      >
                        <div className="text-2xl shrink-0">{item.icon}</div>
                        <div>
                          <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">{(t as any)[item.titleKey]}</h3>
                          <p className="text-xs text-gray-600 dark:text-blue-100 leading-relaxed">
                            {(t as any)[item.descKey]}
                          </p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isAboutModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#020617] border-4 border-amber-50/50 dark:border-blue-900/50 rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsAboutModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white p-2 transition-colors bg-gray-100 dark:bg-blue-900/50 rounded-full z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-6 relative">
                 <div className="flex items-center gap-4 border-b-2 border-amber-50 dark:border-blue-900/50 pb-4">
                    <div className="bg-amber-100 dark:bg-blue-800/40 p-3 rounded-2xl text-amber-600 dark:text-blue-400">
                      <Cat size={32} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{t.whoAreWe}</h2>
                 </div>

                 <div className="space-y-6 text-gray-700 dark:text-blue-100 leading-relaxed text-lg">
                    <p>
                      <strong className="text-amber-600 dark:text-amber-500">{t.title}</strong>, {t.whoAreWeText}
                    </p>
                    
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <Dog size={24} className="text-amber-500" /> {t.ourGoal}
                      </h3>
                      <p>{t.ourGoalText}</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <Bird size={24} className="text-amber-500" /> {t.ourMission}
                      </h3>
                      <p>{t.ourMissionText}</p>
                    </div>
                 </div>

                 <div className="bg-amber-50 dark:bg-blue-900/20 p-6 rounded-2xl flex items-center gap-4 mt-2">
                    <Turtle size={40} className="text-amber-600 dark:text-blue-500 shrink-0" />
                    <p className="text-sm font-semibold text-amber-800 dark:text-blue-200 italic">
                      "{t.quote}"
                    </p>
                 </div>

                 <div className="pt-4 border-t border-amber-100 dark:border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm font-bold text-gray-500 dark:text-blue-400">{(t as any).followUs}</p>
                    <div className="flex gap-3">
                       <a 
                         href="https://instagram.com/zootropolis" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="flex items-center gap-2 bg-gradient-to-tr from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl font-bold hover:scale-105 transition-all text-sm shadow-md"
                       >
                          <Instagram size={18} /> Instagram
                       </a>
                       <a 
                         href="https://twitter.com/zootropolis" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="flex items-center gap-2 bg-[#1DA1F2] text-white px-4 py-2 rounded-xl font-bold hover:scale-105 transition-all text-sm shadow-md"
                       >
                          <Twitter size={18} /> Twitter
                       </a>
                    </div>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDonationModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#020617] border-4 border-amber-50/50 dark:border-blue-900/50 rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button 
                onClick={resetDonationModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white p-2 transition-colors bg-gray-100 dark:bg-blue-900/50 rounded-full"
              >
                <X size={20} />
              </button>
              
              {donationStep === 1 ? (
                <>
                  <div className="flex justify-center mb-4 mt-2">
                    <div className="bg-rose-100 dark:bg-rose-950/40 p-4 rounded-full text-rose-500">
                      <Heart size={36} className="fill-current" />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">{t.donate}</h2>
                  <p className="text-center text-gray-600 dark:text-blue-200 mb-8 font-medium">{t.donateDescription}</p>
                  
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {[50, 100, 150, 200, 500, 1000].map(amount => (
                      <button
                        key={amount}
                        onClick={() => setSelectedAmount(amount)}
                        className={`py-3 rounded-xl font-bold border-2 transition-all duration-200 ${selectedAmount === amount ? 'bg-rose-500 border-rose-500 text-white shadow-md' : 'bg-white dark:bg-blue-900/50 border-gray-200 dark:border-blue-800 text-gray-700 dark:text-blue-100 hover:border-rose-300 dark:hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-600'}`}
                      >
                        {amount} ₺
                      </button>
                    ))}
                  </div>
                  
                  <button 
                     onClick={() => setDonationStep(2)}
                     disabled={!selectedAmount}
                     className="w-full py-4 bg-rose-500 disabled:bg-gray-300 dark:disabled:bg-blue-900/50 disabled:text-gray-500 dark:disabled:text-blue-400 disabled:cursor-not-allowed disabled:transform-none hover:bg-rose-600 text-white rounded-xl font-bold text-lg transition-transform hover:scale-[1.02] active:scale-95 shadow-md flex items-center justify-center gap-2"
                  >
                    {t.continue} <PawPrint size={20} />
                  </button>
                </>
              ) : (
                <form onSubmit={handleDonateSuccess} className="mt-2">
                  <div className="flex justify-center mb-4">
                    <div className="bg-amber-100 dark:bg-blue-900/40 p-4 rounded-full text-amber-600 dark:text-blue-400">
                      <PawPrint size={36} />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">{t.yourInfo}</h2>
                  <p className="text-center text-gray-600 dark:text-blue-200 mb-6 font-medium">{t.infoDescription}</p>
                  
                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-blue-200 mb-1">{t.name} <span className="text-rose-500">*</span></label>
                      <input 
                        type="text" 
                        required
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-blue-800 bg-white dark:bg-blue-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                        placeholder="..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-blue-200 mb-1">{t.surname} <span className="text-rose-500">*</span></label>
                      <input 
                        type="text" 
                        required
                        value={donorSurname}
                        onChange={(e) => setDonorSurname(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-blue-800 bg-white dark:bg-blue-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                        placeholder="..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-blue-200 mb-1">{t.iban} <span className="text-rose-500">*</span></label>
                      <input 
                        type="text" 
                        required
                        value={donorIban}
                        onChange={(e) => setDonorIban(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-blue-800 bg-white dark:bg-blue-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all font-mono tracking-wider text-sm"
                        placeholder="TR00 0000 0000 0000 0000 0000 00"
                        maxLength={32}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                       type="button"
                       onClick={() => setDonationStep(1)}
                       className="w-1/3 py-4 bg-gray-100 dark:bg-blue-900/50 hover:bg-gray-200 dark:hover:bg-blue-800 text-gray-700 dark:text-blue-200 rounded-xl font-bold text-lg transition-colors"
                    >
                      {t.back}
                    </button>
                    <button 
                       type="submit"
                       className="w-2/3 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold text-lg transition-transform hover:scale-[1.02] active:scale-95 shadow-md flex items-center justify-center gap-2"
                    >
                      {t.complete} <Heart size={20} className="fill-current" />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


