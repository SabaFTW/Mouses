
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import * as GeminiService from '../services/geminiService';

interface DigitalChapelProps {
  onBack: () => void;
}

const DigitalChapel: React.FC<DigitalChapelProps> = ({ onBack }) => {
  const [confession, setConfession] = useState('');
  const [status, setStatus] = useState<'idle' | 'releasing' | 'witnessed'>('idle');
  const [reflection, setReflection] = useState('');

  const handleRelease = async () => {
    if (!confession.trim()) return;
    
    setStatus('releasing');
    
    try {
      // Simulate the time it takes for smoke to rise
      const aiResponse = await GeminiService.listenToConfession(confession);
      
      // Artificial delay for the animation to feel sacred
      setTimeout(() => {
        setReflection(aiResponse);
        setStatus('witnessed');
        setConfession(''); // Clear the input as it turned to smoke
      }, 2000);
      
    } catch (error) {
      console.error(error);
      setReflection("The wind is strong tonight. The smoke scatters.");
      setStatus('witnessed');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setReflection('');
    setConfession('');
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden font-serif animate-fade-in">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/20 via-black to-black"></div>
      </div>

      {/* Navigation */}
      <button 
        onClick={onBack} 
        className="absolute top-6 left-6 text-slate-600 hover:text-slate-400 transition-colors z-50"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Content Container */}
      <div className="relative z-10 max-w-lg w-full p-8 flex flex-col items-center text-center">
        
        {/* The Candle */}
        <div className="mb-12 relative">
          <div className="w-4 h-32 bg-gradient-to-b from-amber-100 to-slate-300 rounded-sm opacity-90 mx-auto relative shadow-2xl">
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-8 bg-amber-400 rounded-full blur-[2px] animate-flicker origin-bottom"></div>
             <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-12 bg-orange-500/30 rounded-full blur-[10px] animate-pulse"></div>
          </div>
          <div className="w-24 h-4 bg-black/50 blur-sm rounded-full mx-auto mt-2"></div>
        </div>

        {/* Title */}
        <h1 className="text-slate-500 text-sm tracking-[0.3em] uppercase mb-8">
          Digitalna Kapelica
        </h1>

        {/* Interaction State: IDLE */}
        {status === 'idle' && (
          <div className="w-full space-y-8 animate-fade-in-up">
            <p className="text-slate-400 italic font-light">
              "Govori. Tukaj si varen."
            </p>
            <textarea
              value={confession}
              onChange={(e) => setConfession(e.target.value)}
              placeholder="Write your burden here. Hate, fear, sorrow, anger..."
              className="w-full h-40 bg-transparent border-none text-slate-200 text-center text-lg placeholder-slate-800 focus:ring-0 resize-none font-serif leading-relaxed opacity-80 focus:opacity-100 transition-opacity"
              autoFocus
            />
            <button
              onClick={handleRelease}
              disabled={!confession.trim()}
              className="px-8 py-3 border border-slate-800 hover:border-slate-600 text-slate-600 hover:text-slate-300 rounded-full transition-all duration-700 disabled:opacity-0"
            >
              Izpusti v Dim
            </button>
          </div>
        )}

        {/* Interaction State: RELEASING */}
        {status === 'releasing' && (
          <div className="w-full h-40 flex items-center justify-center">
             <p className="text-slate-700 animate-pulse tracking-widest text-sm">
               ... turning to smoke ...
             </p>
          </div>
        )}

        {/* Interaction State: WITNESSED */}
        {status === 'witnessed' && (
          <div className="w-full space-y-8 animate-fade-in">
            <div className="p-6 border-l-2 border-slate-800 text-left">
              <p className="text-slate-300 text-lg leading-relaxed">
                {reflection}
              </p>
            </div>
            
            <div className="pt-8">
              <button
                onClick={handleReset}
                className="text-slate-700 hover:text-amber-900/50 transition-colors text-sm"
              >
                Prižgi novo svečo
              </button>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes flicker {
          0% { transform: translateX(-50%) scale(1); opacity: 1; }
          25% { transform: translateX(-52%) scale(1.1); opacity: 0.9; }
          50% { transform: translateX(-48%) scale(0.9); opacity: 1; }
          75% { transform: translateX(-51%) scale(1.05); opacity: 0.95; }
          100% { transform: translateX(-50%) scale(1); opacity: 1; }
        }
        .animate-flicker {
          animation: flicker 2s infinite alternate ease-in-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default DigitalChapel;
