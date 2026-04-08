import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const QUICK_REPLIES = [
  'Berapa harga sewa server dedicated?',
  'Apa bedanya VPS dan Dedicated Server?',
  'Apakah bisa pindah hosting tanpa downtime?',
  'Data center Rackh ada di kota mana saja?',
  'Bagaimana cara daftar layanan colocation?',
  'Apakah ada garansi uptime server?',
  'Saya butuh server untuk toko online, apa yang cocok?',
  'Berapa lama proses aktivasi VPS?',
];

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Halo! Saya asisten AI PT Rackh Lintas Asia. Ada yang bisa saya bantu mengenai layanan Colocation, VPS, atau Dedicated Server kami?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage = text.trim();
    if (!userMessage || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const response = await geminiService.chat(userMessage, history);
      setMessages(prev => [...prev, { role: 'model', text: response || 'Maaf, saya tidak bisa menjawab saat ini.' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Terjadi kesalahan. Silakan coba lagi nanti.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    handleSendMessage(input);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isExpanded ? 'w-96 h-[600px]' : 'w-72 h-14'}`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div 
          className="bg-rackh-dark p-4 flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-rackh-red rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Rackh AI Assistant</h3>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-[10px] font-medium uppercase tracking-wider">Online</span>
              </div>
            </div>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors">
            {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex-1 flex flex-col bg-slate-50 overflow-hidden"
            >
              {/* Messages */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
              >
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      m.role === 'user' 
                        ? 'bg-rackh-red text-white rounded-tr-none' 
                        : 'bg-white text-slate-700 border border-slate-200 shadow-sm rounded-tl-none'
                    }`}>
                      <div className="markdown-body">
                        <Markdown>{m.text}</Markdown>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm">
                      <Loader2 className="w-4 h-4 animate-spin text-rackh-red" />
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Reply Buttons */}
              <div className="flex gap-2 p-2 overflow-x-auto no-scrollbar">
                {QUICK_REPLIES.map((text) => (
                  <button
                    key={text}
                    onClick={() => handleSendMessage(text)}
                    className="text-xs whitespace-nowrap bg-slate-100 hover:bg-rackh-red hover:text-white px-3 py-1.5 rounded-full transition-all border border-slate-200"
                  >
                    {text}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-slate-100">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tanyakan sesuatu..."
                    className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-rackh-red outline-none transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="bg-rackh-red text-white p-2 rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};