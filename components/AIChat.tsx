
import React, { useState, useRef, useEffect } from 'react';
import { askResumeQuestion } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I am Muhammad\'s AI assistant. Ask me anything about his expertise or education!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await askResumeQuestion(userMsg);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center transition-all transform hover:scale-110 active:scale-95"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[350px] md:w-[400px] h-[550px] glass rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/10 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="p-5 bg-amber-500/10 border-b border-white/5 flex items-center justify-between">
            <div>
              <h3 className="font-black text-xs uppercase tracking-[0.2em] text-amber-500">Resume Guide</h3>
              <p className="text-[10px] text-slate-400 font-bold">POWERED BY GEMINI AI</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-amber-500 text-slate-900 font-bold rounded-tr-none' 
                    : 'glass text-slate-200 rounded-tl-none border-white/5'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="glass rounded-2xl p-4 rounded-tl-none border-white/5">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white/5 border-t border-white/5 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about Mudasir..."
              className="flex-1 text-sm bg-slate-900/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-amber-500 text-slate-900 p-3 rounded-xl hover:bg-amber-400 transition-all disabled:opacity-50 active:scale-90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
