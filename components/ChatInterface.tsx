import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { Chat } from '@google/genai';

interface ChatInterfaceProps {
  chatSession: Chat | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ chatSession }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !chatSession || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await chatSession.sendMessage({ message: userMsg.text });
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || "I'm pondering that symbol...",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!chatSession) return null;

  return (
    <div className="flex flex-col h-[500px] bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-slate-700 bg-slate-900/50">
        <h3 className="text-lg font-medium text-dream-accent flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Dream Guide
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.length === 0 && (
          <div className="text-center text-slate-500 mt-10 text-sm">
            Ask about specific symbols (e.g., "What does the red door mean?")
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-dream-accent text-slate-900 rounded-tr-sm'
                  : 'bg-slate-700 text-slate-100 rounded-tl-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-700/50 text-slate-400 rounded-2xl rounded-tl-sm p-3 text-xs flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-slate-900/50 border-t border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about your dream..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-dream-accent text-slate-200 placeholder-slate-600"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="p-2 bg-dream-accent hover:bg-indigo-400 text-slate-900 rounded-xl transition-colors disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
