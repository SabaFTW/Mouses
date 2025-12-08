
import React, { useState } from 'react';
import { Sparkles, Play, Pause, Image as ImageIcon, BookOpen, Music, Wand2, ArrowLeft } from 'lucide-react';
import * as GeminiService from '../services/geminiService';
import { StorySession } from '../types';

interface LyraMouseProps {
  onBack: () => void;
  onSave: (story: StorySession) => void;
}

const LyraMouse: React.FC<LyraMouseProps> = ({ onBack, onSave }) => {
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  
  // State for form
  const [formData, setFormData] = useState({
    phil1: 'stoicism',
    phil2: 'existentialism',
    emotion1: 'anxious',
    emotion2: 'peaceful',
    setting: 'forest',
    duration: '15'
  });

  // State for results
  const [story, setStory] = useState<{ title: string; story_text: string; visual_prompt: string } | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);

  const philosophies = [
    { value: 'stoicism', label: 'Stoicism', icon: '🏛️' },
    { value: 'existentialism', label: 'Existentialism', icon: '🎭' },
    { value: 'taoism', label: 'Taoism', icon: '☯️' },
    { value: 'hedonism', label: 'Hedonism', icon: '🌺' }
  ];

  const handleGenerate = async () => {
    setLoading(true);
    setLoadingMessage("Lyra is thinking deeply...");
    try {
      // 1. Generate Story
      const result = await GeminiService.generatePhilosophicalStory(
        formData.phil1, formData.phil2, 
        formData.emotion1, formData.emotion2, 
        formData.setting, formData.duration
      );
      setStory(result);
      setStep(2); // Move to view
      
      // 2. Auto-generate Image (Parallel if we wanted, but let's do sequential for better UX feedback)
      setLoadingMessage("Painting the scene...");
      try {
        const img = await GeminiService.generateDreamImage(result.visual_prompt, '1K');
        setImageUrl(img);
      } catch (e) {
        console.error("Image generation skipped or failed", e);
        // Do not crash, just show placeholder
      }

    } catch (error) {
      console.error(error);
      alert("Lyra got distracted by a butterfly. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTTS = async () => {
    if (!story) return;
    if (audioBase64) {
      // Already generated, just toggle
      if (audioEl) {
        if (isPlaying) {
          audioEl.pause();
          setIsPlaying(false);
        } else {
          audioEl.play();
          setIsPlaying(true);
        }
      }
      return;
    }

    setLoading(true);
    setLoadingMessage("Lyra is clearing her throat...");
    try {
      const audioData = await GeminiService.generateSpeech(story.story_text);
      setAudioBase64(audioData);
      
      playPcmData(audioData);

    } catch (e) {
      console.error(e);
      alert("Could not generate audio.");
    } finally {
      setLoading(false);
    }
  };

  const playPcmData = async (base64: string) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
      
      const binaryString = atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Convert Int16 PCM to Float32
      const dataInt16 = new Int16Array(bytes.buffer);
      const float32Data = new Float32Array(dataInt16.length);
      for (let i = 0; i < dataInt16.length; i++) {
        float32Data[i] = dataInt16[i] / 32768.0;
      }

      const buffer = audioContext.createBuffer(1, float32Data.length, 24000);
      buffer.getChannelData(0).set(float32Data);

      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start(0);
      setIsPlaying(true);
      
      source.onended = () => setIsPlaying(false);

      // Save for "save" functionality? Currently we only play. 
      // To allow saving/replaying easily, we might want to store the base64.
      setAudioBase64(base64);

    } catch (e) {
      console.error("Audio playback error", e);
    }
  };

  const handleSave = () => {
    if (!story) return;
    onSave({
      id: crypto.randomUUID(),
      date: new Date(),
      title: story.title,
      content: story.story_text,
      visualPrompt: story.visual_prompt,
      imageUrl: imageUrl || undefined,
      audioBase64: audioBase64 || undefined,
      params: formData
    });
    alert("Saved to the Library in the Hollow!");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-pink-200">
        <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-serif text-xl animate-pulse">{loadingMessage}</p>
      </div>
    );
  }

  // Configuration Step
  if (step === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-slate-900/80 backdrop-blur-md rounded-3xl border border-pink-500/30 shadow-2xl">
        <div className="flex items-center gap-3 mb-6 border-b border-pink-500/20 pb-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-pink-300" />
          </button>
          <div className="flex-1 text-center">
             <h2 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400">
               Lyra, the Beautiful
             </h2>
             <p className="text-pink-200/60 text-sm">She weaves wisdom into stories.</p>
          </div>
          <div className="w-10"></div>{/* Spacer */}
        </div>

        <div className="space-y-6">
          
          {/* Philosophies */}
          <div>
            <label className="block text-pink-300 mb-2 font-medium">Philosophy Clash</label>
            <div className="grid grid-cols-2 gap-4">
              <select 
                value={formData.phil1}
                onChange={(e) => setFormData({...formData, phil1: e.target.value})}
                className="bg-slate-800 border border-slate-600 text-white rounded-xl p-3 focus:border-pink-500 focus:outline-none"
              >
                {philosophies.map(p => <option key={p.value} value={p.value}>{p.icon} {p.label}</option>)}
              </select>
              <select 
                value={formData.phil2}
                onChange={(e) => setFormData({...formData, phil2: e.target.value})}
                className="bg-slate-800 border border-slate-600 text-white rounded-xl p-3 focus:border-purple-500 focus:outline-none"
              >
                {philosophies.map(p => <option key={p.value} value={p.value}>{p.icon} {p.label}</option>)}
              </select>
            </div>
          </div>

          {/* Emotions */}
          <div>
             <label className="block text-pink-300 mb-2 font-medium">Emotional Journey</label>
             <div className="flex items-center gap-4">
                <input 
                  type="text" 
                  value={formData.emotion1}
                  onChange={(e) => setFormData({...formData, emotion1: e.target.value})}
                  className="flex-1 bg-slate-800 border border-slate-600 rounded-xl p-3 text-white placeholder-slate-500"
                  placeholder="Start (e.g. Lost)"
                />
                <span className="text-slate-500">→</span>
                <input 
                  type="text" 
                  value={formData.emotion2}
                  onChange={(e) => setFormData({...formData, emotion2: e.target.value})}
                  className="flex-1 bg-slate-800 border border-slate-600 rounded-xl p-3 text-white placeholder-slate-500"
                  placeholder="End (e.g. Found)"
                />
             </div>
          </div>

          {/* Setting & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-pink-300 mb-2 font-medium">Setting</label>
              <select 
                value={formData.setting}
                onChange={(e) => setFormData({...formData, setting: e.target.value})}
                className="w-full bg-slate-800 border border-slate-600 text-white rounded-xl p-3"
              >
                <option value="forest">🌲 Twilight Forest</option>
                <option value="ocean">🌊 Moonlit Ocean</option>
                <option value="library">📚 Ancient Library</option>
                <option value="mountain">🏔️ Silent Mountain</option>
                <option value="cosmic">✨ Deep Space</option>
              </select>
            </div>
            <div>
              <label className="block text-pink-300 mb-2 font-medium">Duration</label>
              <select 
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full bg-slate-800 border border-slate-600 text-white rounded-xl p-3"
              >
                <option value="5">5 Minutes</option>
                <option value="10">10 Minutes</option>
                <option value="15">15 Minutes (Deep)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-900/50 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02]"
          >
            <Sparkles className="w-5 h-5" />
            Ask Lyra to Tell a Story
          </button>
        </div>
      </div>
    );
  }

  // Story View
  if (step === 2 && story) {
    return (
       <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          {/* Header Actions */}
          <div className="flex justify-between items-center bg-slate-900/50 backdrop-blur-sm p-4 rounded-2xl border border-pink-500/20">
             <button onClick={() => setStep(0)} className="flex items-center gap-2 text-pink-300 hover:text-white transition-colors">
               <ArrowLeft className="w-5 h-5" /> Back to Lyra
             </button>
             <div className="flex gap-2">
                <button 
                  onClick={handleTTS}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                    isPlaying 
                      ? 'bg-red-500/20 text-red-300 border border-red-500/50' 
                      : 'bg-pink-500/20 text-pink-300 border border-pink-500/50 hover:bg-pink-500/30'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Pause Voice' : 'Listen (TTS)'}
                </button>
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 hover:bg-indigo-500/30 rounded-full font-medium transition-colors"
                >
                  <BookOpen className="w-4 h-4" /> Save to Hollow
                </button>
             </div>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
            {/* Story Text */}
            <div className="md:col-span-7 space-y-6">
               <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-700 shadow-2xl">
                  <h1 className="text-3xl font-serif font-bold text-pink-100 mb-6 text-center leading-tight">
                    {story.title}
                  </h1>
                  <div className="prose prose-invert prose-lg max-w-none text-slate-300 font-serif leading-relaxed">
                     {(story.story_text || "The wind blew the pages away... (Story text missing)").split('\n').map((para, i) => (
                       <p key={i} className="mb-4">{para}</p>
                     ))}
                  </div>
               </div>
            </div>

            {/* Visuals */}
            <div className="md:col-span-5 space-y-6 sticky top-6 self-start">
               <div className="rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-black aspect-[3/4] relative group">
                  {imageUrl ? (
                    <img src={imageUrl} alt="Story Visual" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-600 gap-4 p-4 text-center">
                      <ImageIcon className="w-12 h-12 opacity-50" />
                      <p className="text-sm">Image could not be generated.<br/>(Check API Key permissions)</p>
                    </div>
                  )}
                  {imageUrl && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <p className="text-xs text-slate-300 italic">{story.visual_prompt}</p>
                    </div>
                  )}
               </div>
               
               <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700">
                 <h3 className="text-pink-300 font-bold mb-2 flex items-center gap-2">
                   <Wand2 className="w-4 h-4" /> The Magic Used
                 </h3>
                 <div className="text-sm text-slate-400 space-y-2">
                    <p><strong>Gemini 3 Pro:</strong> Wrote this story based on {formData.phil1} vs {formData.phil2}.</p>
                    <p><strong>Imagen 3:</strong> {imageUrl ? 'Painted the scene.' : 'Skipped painting (check key).'}</p>
                    <p><strong>Gemini TTS:</strong> {audioBase64 ? 'Generated the voice.' : 'Ready to speak.'}</p>
                 </div>
               </div>
            </div>
          </div>
       </div>
    );
  }

  return null;
};

export default LyraMouse;
