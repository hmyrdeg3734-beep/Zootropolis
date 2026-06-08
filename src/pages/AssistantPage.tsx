import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, ArrowLeft, Sparkles, AlertCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      parts: [{ text: input.trim() }],
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.parts[0].text,
          history: messages,
        }),
      });

      const data = await response.json();
      
      const modelMessage: Message = {
        role: 'model',
        parts: [{ text: data.text }],
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'model',
        parts: [{ text: "Üzgünüm, şu an bağlantı kuramıyorum. Lütfen internetini kontrol et veya biraz sonra tekrar dene." }],
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Bot size={22} className="text-white" />
            </div>
            <div>
              <h1 className="font-black text-gray-900 text-sm tracking-tight">PatiAsistan</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Çevrimiçi</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <div className="bg-amber-50 text-amber-600 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
             <Sparkles size={14} />
             <span className="text-[10px] font-black uppercase tracking-widest">AI Destekli</span>
           </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-8 space-y-6 scroller-hide bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
      >
        {messages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center space-y-6 pt-12"
          >
            <div className="w-20 h-20 bg-white rounded-[32px] shadow-2xl shadow-gray-200/50 flex items-center justify-center border border-gray-50 mb-4">
              <Bot size={40} className="text-amber-500" />
            </div>
            <div className="max-w-[280px] space-y-2">
              <h2 className="text-xl font-black text-gray-900 leading-tight">Selam! Ben PatiAsistan.</h2>
              <p className="text-xs font-medium text-gray-500 leading-relaxed">
                Dostunun sağlığı, eğitimi veya beslenmesi hakkında her şeyi sorabilirsin. Sana yardım etmek için buradayım!
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-2 w-full max-w-sm px-4">
              {[
                "Kedim neden çok miyavlıyor?",
                "Yavru köpekler ne sıklıkla beslenmeli?",
                "Anadolu Yakası'nda gece açık veteriner var mı?",
                "Köpeğimin tırnaklarını nasıl keserim?"
              ].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => setInput(suggestion)}
                  className="bg-white border border-gray-100 p-3 rounded-2xl text-[10px] font-bold text-gray-600 hover:border-amber-500 hover:text-amber-500 transition-all text-left shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  msg.role === 'user' ? 'bg-amber-500' : 'bg-white border border-gray-100'
                }`}>
                  {msg.role === 'user' ? (
                    <User size={16} className="text-white" />
                  ) : (
                    <Bot size={16} className="text-amber-500" />
                  )}
                </div>
                <div className={`p-4 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-amber-500 text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 border border-gray-50 rounded-tl-none'
                }`}>
                  {msg.parts[0].text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%] items-center">
              <div className="w-8 h-8 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                <Bot size={16} className="text-amber-500" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-50 flex gap-1.5">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Warning Toast */}
      <div className="px-4 py-2 border-t border-gray-100 bg-white flex items-start gap-2 text-rose-600 bg-rose-50/50">
        <AlertCircle size={14} className="shrink-0 mt-0.5" />
        <p className="text-[9px] font-bold leading-tight">
          ÖNEMLİ: AI tavsiyeleri asla profesyonel veteriner muayenesinin yerini tutmaz. Acil durumlarda lütfen kliniğe başvurun.
        </p>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-100 p-4 pb-8">
        <div className="max-w-4xl mx-auto flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Mesajınızı yazın..."
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-4 pr-12 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none min-h-[48px] max-h-[120px]"
              rows={1}
            />
            <div className="absolute right-3 bottom-3 text-[9px] font-black text-gray-300 uppercase tracking-widest hidden sm:block">
              Enter ile gönder
            </div>
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
              !input.trim() || isLoading 
                ? 'bg-gray-100 text-gray-400 shadow-none' 
                : 'bg-amber-500 text-white shadow-amber-500/30 hover:scale-105 active:scale-95'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scroller-hide::-webkit-scrollbar { display: none; }
        .scroller-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
