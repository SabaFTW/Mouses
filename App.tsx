
import React, { useState, useEffect } from 'react';
import { DreamSession, AppView, StorySession } from './types';
import * as GeminiService from './services/geminiService';
import VoiceRecorder from './components/VoiceRecorder';
import ChatInterface from './components/ChatInterface';
import LyraMouse from './components/LyraMouse';
import VesArchive from './components/VesArchive';
import DigitalChapel from './components/DigitalChapel';
import RavenPerch from './components/RavenPerch';
import DignumProtocol from './components/DignumProtocol';
import { Chat } from '@google/genai';
import { Moon, AlertCircle, RefreshCw, Home, Library, Star, Trees, Flame, Feather, Radio } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('village');
  
  // Global Atmosphere State (Harmonization)
  const [isHarmonized, setIsHarmonized] = useState(false);

  // Dreamer Mouse State
  const [dreamSession, setDreamSession] = useState<DreamSession>({
    id: crypto.randomUUID(),
    date: new Date(),
    status: 'idle',
    imageSize: '1K'
  });
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  
  // Library State
  const [savedStories, setSavedStories] = useState<StorySession[]>([]);

  const [error, setError] = useState<string | null>(null);

  // --- DREAMER MOUSE LOGIC ---
  const handleRecordingComplete = async (audioBlob: Blob) => {
    setDreamSession(prev => ({ ...prev, status: 'processing_audio', audioBlob }));
    setError(null);

    try {
      const { transcription, visualPrompt } = await GeminiService.transcribeAndExtractPrompts(audioBlob);
      setDreamSession(prev => ({ ...prev, status: 'generating_image', transcription, visualPrompt }));

      let imageUrl = '';
      try {
        imageUrl = await GeminiService.generateDreamImage(visualPrompt, dreamSession.imageSize);
      } catch (imgError: any) {
        if (imgError.message?.includes("Requested entity was not found") || imgError.message?.includes("404")) {
           setError("Please ensure you have selected a valid project/API Key for the Image Generation model.");
           setDreamSession(prev => ({ ...prev, status: 'idle' })); 
           return;
        }
        throw imgError;
      }

      setDreamSession(prev => ({ ...prev, status: 'analyzing', imageUrl }));
      const analysis = await GeminiService.analyzeDreamText(transcription);
      setDreamSession(prev => ({ ...prev, status: 'complete', analysis }));
      
      const chat = GeminiService.initializeChat(transcription, analysis);
      setChatSession(chat);

    } catch (err: any) {
      console.error("Pipeline error:", err);
      setError("Something went wrong interpreting your dream. Please try again.");
      setDreamSession(prev => ({ ...prev, status: 'idle' }));
    }
  };

  const resetDream = () => {
    setDreamSession({
      id: crypto.randomUUID(),
      date: new Date(),
      status: 'idle',
      imageSize: dreamSession.imageSize
    });
    setChatSession(null);
    setError(null);
  };

  // --- LIBRARY LOGIC ---
  const saveStory = (story: StorySession) => {
    setSavedStories(prev => [story, ...prev]);
  };

  // --- NAVIGATION HELPERS ---
  const goHome = () => setCurrentView('village');

  // --- RENDERERS ---

  const renderVillage = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8 animate-fade-in relative z-10">
      <div className="text-center mb-8">
        <h1 className={`text-5xl font-serif font-bold text-transparent bg-clip-text drop-shadow-lg mb-2 ${
          isHarmonized 
            ? 'bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200' 
            : 'bg-gradient-to-r from-emerald-300 via-amber-200 to-emerald-300'
        }`}>
          The Oak Tree Village
        </h1>
        <p className={`font-serif italic text-lg ${isHarmonized ? 'text-amber-200/80' : 'text-emerald-100/80'}`}>
          {isHarmonized ? "Harmonized Frequency: 432 Hz" : "Where little mice dream big dreams."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4">
        {/* Dreamer Mouse */}
        <button 
          onClick={() => setCurrentView('dreamer')}
          className="group relative bg-slate-800/40 backdrop-blur-md border-2 border-slate-600 hover:border-dream-accent rounded-3xl p-6 transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(129,140,248,0.3)] flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <Moon className="w-8 h-8 text-indigo-300" />
          </div>
          <h2 className="text-xl font-bold text-indigo-200 mb-2">Dreamer Mouse</h2>
          <p className="text-xs text-center text-slate-400">Tell me your dreams.</p>
        </button>

        {/* Lyra Mouse */}
        <button 
          onClick={() => setCurrentView('lyra')}
          className="group relative bg-slate-800/40 backdrop-blur-md border-2 border-slate-600 hover:border-pink-400 rounded-3xl p-6 transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(244,114,182,0.3)] flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <Star className="w-8 h-8 text-pink-300" />
          </div>
          <h2 className="text-xl font-bold text-pink-200 mb-2">Lyra</h2>
          <p className="text-xs text-center text-slate-400">Beautiful stories & wisdom.</p>
        </button>

        {/* Library Hollow */}
        <button 
          onClick={() => setCurrentView('library')}
          className="group relative bg-slate-800/40 backdrop-blur-md border-2 border-slate-600 hover:border-amber-400 rounded-3xl p-6 transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] flex flex-col items-center"
        >
           <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <Library className="w-8 h-8 text-amber-300" />
          </div>
          <h2 className="text-xl font-bold text-amber-200 mb-2">The Hollow</h2>
          <p className="text-xs text-center text-slate-400">Your collected tales.</p>
        </button>

        {/* The Raven's Perch */}
        <button 
          onClick={() => setCurrentView('raven')}
          className="group relative bg-slate-800/40 backdrop-blur-md border-2 border-slate-600 hover:border-slate-400 rounded-3xl p-6 transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(200,200,200,0.3)] flex flex-col items-center"
        >
           <div className="w-16 h-16 bg-slate-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <Feather className="w-8 h-8 text-slate-300" />
          </div>
          <h2 className="text-xl font-bold text-slate-200 mb-2">Raven's Perch</h2>
          <p className="text-xs text-center text-slate-400">Messenger Between Worlds.</p>
        </button>
      </div>
      
      {/* Footer Guardians: The Wolf & The Signal Tower */}
      <div className="mt-12 flex items-center justify-center gap-12">
        
        {/* The Wolf */}
        <div className="opacity-50 hover:opacity-100 transition-opacity cursor-help flex flex-col items-center gap-4 group" title="The Guardian Wolf watches over the settings.">
           <div className="flex items-center gap-2 text-slate-500">
              <Trees className="w-6 h-6 group-hover:text-emerald-500 transition-colors" />
              <span className="text-xs tracking-widest uppercase">Guardian Wolf</span>
           </div>
           <button 
              onClick={() => setCurrentView('chapel')}
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-black/40 transition-all border border-transparent hover:border-slate-800"
           >
             <Flame className="w-4 h-4 text-slate-700 group-hover:text-amber-900 transition-colors" />
             <span className="text-[10px] text-slate-800 group-hover:text-slate-600 tracking-widest uppercase">Kapelica</span>
           </button>
        </div>

        {/* The Signal Tower (Dignum) */}
        <div className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer flex flex-col items-center gap-4 group" title="Signal Frequency Tuner">
           <div className="flex items-center gap-2 text-slate-500">
              <Radio className={`w-6 h-6 transition-colors ${isHarmonized ? 'text-amber-500 animate-pulse' : 'group-hover:text-blue-400'}`} />
              <span className="text-xs tracking-widest uppercase">Signal Tower</span>
           </div>
           <button 
              onClick={() => setCurrentView('dignum')}
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-black/40 transition-all border border-transparent hover:border-slate-800"
           >
             <span className="text-[10px] text-slate-800 group-hover:text-slate-600 tracking-widest uppercase">
                {isHarmonized ? '432 Hz Active' : 'Tune Signal'}
             </span>
           </button>
        </div>

      </div>
    </div>
  );

  const renderLibrary = () => (
    <div className="max-w-4xl mx-auto p-4 animate-fade-in relative">
       <div className="flex items-center gap-4 mb-8">
         <button onClick={goHome} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700">
           <Home className="w-6 h-6 text-emerald-200" />
         </button>
         <h1 className="text-3xl font-serif font-bold text-amber-200">The Hollow Library</h1>
       </div>
       
       {savedStories.length === 0 ? (
         <div className="text-center py-20 bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-700">
            <Library className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">The shelves are empty. Ask Lyra for a story!</p>
         </div>
       ) : (
         <div className="grid gap-6">
            {savedStories.map(story => (
              <div key={story.id} className="bg-slate-900/80 p-6 rounded-2xl border border-amber-500/20 flex gap-4 hover:bg-slate-800 transition-colors">
                 <div className="w-24 h-32 bg-black rounded-lg overflow-hidden flex-shrink-0">
                    {story.imageUrl ? (
                      <img src={story.imageUrl} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center"><Star className="text-slate-600"/></div>
                    )}
                 </div>
                 <div className="flex-1">
                    <h3 className="text-xl font-bold text-amber-100 mb-1">{story.title}</h3>
                    <p className="text-xs text-amber-500/60 mb-2">{new Date(story.date).toLocaleDateString()} • {story.params.duration} min read</p>
                    <p className="text-slate-400 text-sm line-clamp-3 font-serif">{story.content}</p>
                 </div>
              </div>
            ))}
         </div>
       )}

       {/* EASTER EGG: THE SAUSAGE TRIGGER */}
       <button 
         onClick={() => setCurrentView('ves_archive')}
         className="absolute bottom-4 right-4 opacity-10 hover:opacity-100 transition-opacity text-2xl grayscale hover:grayscale-0 transform hover:scale-125 duration-300"
         title="???"
       >
         🌭
       </button>
    </div>
  );

  const renderDreamer = () => (
    <div className="animate-fade-in max-w-6xl mx-auto px-4">
      <div className="flex items-center gap-4 mb-6">
         <button onClick={goHome} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700">
           <Home className="w-6 h-6 text-indigo-200" />
         </button>
         <h2 className="text-2xl font-bold text-indigo-200">Dreamer Mouse</h2>
      </div>

      {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-200">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
      )}

      {/* Existing Dream Logic UI */}
      {dreamSession.status === 'idle' || dreamSession.status === 'recording' ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center bg-slate-900/30 rounded-3xl border border-indigo-500/20">
             <VoiceRecorder 
               onRecordingComplete={handleRecordingComplete} 
               isProcessing={false} 
             />
          </div>
        ) : null}

        {/* Processing State */}
        {['processing_audio', 'generating_image', 'analyzing'].includes(dreamSession.status) && (
          <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-6">
             <div className="relative w-24 h-24">
               <div className="absolute inset-0 border-t-4 border-dream-accent rounded-full animate-spin"></div>
             </div>
             <p className="text-xl font-light animate-pulse text-dream-accent">
               Working magic...
             </p>
          </div>
        )}

        {/* Complete State */}
        {dreamSession.status === 'complete' && dreamSession.analysis && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              
              {/* SURREAL IMAGE CONTAINER */}
              <div className="relative group rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-black aspect-[3/4] sm:aspect-auto sm:min-h-[500px]">
                {dreamSession.imageUrl && (
                  <>
                    <img 
                      src={dreamSession.imageUrl} 
                      alt="Dream" 
                      className="w-full h-full object-cover animate-dream-breathe"
                    />
                    {/* Mist Overlay */}
                    <div className="absolute inset-0 dream-mist opacity-30 pointer-events-none"></div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/50 to-transparent">
                       <p className="text-indigo-200/80 text-sm font-serif italic text-shadow-sm tracking-wide leading-relaxed">
                         "{dreamSession.visualPrompt}"
                       </p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                 <h3 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Transcription</h3>
                 <p className="text-slate-300 font-serif italic text-sm">{dreamSession.transcription}</p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <h2 className="text-4xl font-serif font-bold text-white drop-shadow-md">{dreamSession.analysis.title}</h2>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs tracking-widest uppercase">
                  {dreamSession.analysis.emotionalTheme}
                </div>
              </div>
              <div className="prose prose-invert prose-sm text-slate-300 leading-relaxed font-serif">
                <p>{dreamSession.analysis.interpretation}</p>
              </div>
              
              <div className="space-y-4">
                 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Identified Archetypes</h4>
                 <div className="grid grid-cols-1 gap-3">
                    {dreamSession.analysis.archetypes.map((arch, i) => (
                      <div key={i} className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                         <div className="font-bold text-dream-accent text-sm mb-1">{arch.name}</div>
                         <div className="text-xs text-slate-400">{arch.description}</div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="pt-6 border-t border-slate-700/50">
                 <ChatInterface chatSession={chatSession} />
              </div>
              <button onClick={resetDream} className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 font-medium transition-colors border border-slate-700">
                Dream Again
              </button>
            </div>
          </div>
        )}
    </div>
  );

  return (
    <div className={`min-h-screen font-sans selection:bg-dream-accent selection:text-night-900 pb-20 relative overflow-x-hidden transition-colors duration-[2000ms] ${
        isHarmonized ? 'bg-[#2a2215] text-amber-100' : 'bg-night-900 text-slate-200'
    }`}>
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
         {/* Gradient Transition */}
        <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-[2000ms] ${
            isHarmonized 
            ? 'from-[#3f2e18] via-[#4d3820] to-[#2a2215]' // Warm Amber/Wood
            : 'from-[#0f172a] via-[#111e2f] to-[#0a0f1c]' // Cold Slate/Night
        }`}></div>
        
        {/* Glowing Orbs (Fireflies) */}
        {isHarmonized ? (
            <>
                <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-amber-500/20 rounded-full blur-[100px] animate-blob"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-yellow-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
            </>
        ) : (
            <>
                <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-emerald-900/10 rounded-full blur-[100px] animate-blob"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-900/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
                <div className="absolute top-[50%] left-[50%] w-[20%] h-[20%] bg-amber-900/10 rounded-full blur-[80px] animate-pulse-slow"></div>
            </>
        )}
      </div>

      <header className="p-6 border-b border-white/5 backdrop-blur-sm sticky top-0 z-50">
         {/* Simple subtle header */}
      </header>

      <main className="container mx-auto py-8">
        {currentView === 'village' && renderVillage()}
        {currentView === 'dreamer' && renderDreamer()}
        {currentView === 'lyra' && <LyraMouse onBack={goHome} onSave={saveStory} />}
        {currentView === 'library' && renderLibrary()}
        {currentView === 'ves_archive' && <VesArchive onBack={() => setCurrentView('library')} />}
        {currentView === 'chapel' && <DigitalChapel onBack={goHome} />}
        {currentView === 'raven' && <RavenPerch onBack={goHome} />}
        {currentView === 'dignum' && <DignumProtocol onBack={goHome} onHarmonize={() => setIsHarmonized(true)} />}
      </main>
    </div>
  );
}
