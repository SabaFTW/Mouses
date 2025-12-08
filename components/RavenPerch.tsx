
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Feather } from 'lucide-react';

interface RavenPerchProps {
  onBack: () => void;
}

const RavenPerch: React.FC<RavenPerchProps> = ({ onBack }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  // --- DATA ---
  const rolesData = [
    {
        id: 'psychopomp',
        title: 'Psychopomp',
        icon: '👻',
        desc: 'A guide of souls. The raven appears at the moment of death to escort the spirit across the threshold to the afterlife.',
        examples: ['Waiting outside the door of the dying', 'Wandering souls of the unburied (Swedish lore)', 'Funerary associations']
    },
    {
        id: 'messenger',
        title: 'Divine Messenger',
        icon: '📨',
        desc: 'A courier between gods and humans. They traverse the vertical axis of the cosmos, bringing divine will down to earth.',
        examples: ['Apollo\'s ravens in Greek lore', 'Odin\'s informants in Norse myth', 'Yatagarasu in Shinto']
    },
    {
        id: 'knowledge',
        title: 'Bearer of Knowledge',
        icon: '🧠',
        desc: 'Possessors of hidden truths and prophecy. Their ability to fly high gives them a perspective denied to mortals.',
        examples: ['Huginn (Thought) and Muninn (Memory)', 'Apollo\'s spy', 'Revealers of secrets']
    },
    {
        id: 'creator',
        title: 'Shapeshifter / Creator',
        icon: '✨',
        desc: 'A central figure in creation myths, often acting as a trickster who steals light or fire to animate the world.',
        examples: ['Pacific Northwest Raven tales', 'Stealing the sun', 'Transforming between human and bird']
    },
    {
        id: 'omen',
        title: 'Omen of War',
        icon: '🛡️',
        desc: 'Harbingers of conflict and fate. Their presence on the battlefield signals the thin line between victory and death.',
        examples: ['The Morrígan (Celtic)', 'Presaging victory or defeat', 'Scavengers of the fallen']
    }
  ];

  const cultureData: Record<string, { name: string; title: string; content: string }> = {
    'norse': {
        name: 'Norse',
        title: 'The Eyes of Odin',
        content: 'In Norse mythology, the raven is central. Odin, the All-Father, is known as Hrafnaguð (Raven-god). He is attended by Huginn (Thought) and Muninn (Memory). These two birds fly over Midgard (Earth) every day and return to whisper news of the world into Odin\'s ears. This reflects a shamanic tradition where the bird acts as the soul\'s extension gathering knowledge.'
    },
    'greek': {
        name: 'Greco-Roman',
        title: 'Apollo\'s Truth',
        content: 'Classical myth links the raven to Apollo, god of the sun and prophecy. Originally white, the raven was scorched black by Apollo after delivering the news of his lover Coronis\'s infidelity. This marks the raven as a bearer of hard truths and a connection between the divine realm of Olympus and mortal affairs.'
    },
    'celtic': {
        name: 'Celtic',
        title: 'The Battle Crow',
        content: 'In Celtic tradition, the raven is intimately tied to war and sovereignty. The goddess Morrígan often appears as a crow or raven on the battlefield. Her presence is an omen, signaling the fate of warriors and the outcome of conflict. The bird embodies the terrifying but necessary transition of death in battle.'
    },
    'native': {
        name: 'Pacific NW',
        title: 'The Great Trickster',
        content: 'For Indigenous cultures of the Pacific Northwest, Raven is a complex hero-trickster. He is credited with stealing the light (sun/stars) from a hoarder and releasing it into the world, transforming darkness into day. He is a shapeshifter who moves freely between animal and human forms, bridging the spiritual and physical realms.'
    },
    'asian': {
        name: 'East Asian',
        title: 'The Solar Guide',
        content: 'In Japanese Shinto lore, the Yatagarasu is a legendary three-legged crow sent by the sun goddess Amaterasu. It served as a guide for Emperor Jimmu, showing him the path to victory. Here, the raven is a benevolent divine messenger, representing the will of Heaven intervening in human history.'
    }
  };

  const [currentRole, setCurrentRole] = useState(rolesData[0]);
  const [currentCultureKey, setCurrentCultureKey] = useState('norse');

  // --- CHART INITIALIZATION ---
  useEffect(() => {
    if (!chartRef.current || !window.Chart) return;

    if (chartInstance.current) {
        chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new window.Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Death & Transition', 'Wisdom & Prophecy', 'War & Conflict', 'Solar & Creation', 'Trickster'],
            datasets: [{
                label: 'Thematic Intensity',
                data: [95, 85, 75, 70, 60],
                backgroundColor: 'rgba(245, 158, 11, 0.2)', // Amber 500 with opacity
                borderColor: '#f59e0b', // Amber 500
                pointBackgroundColor: '#0f172a', // Slate 900
                pointBorderColor: '#f59e0b',
                pointHoverBackgroundColor: '#f59e0b',
                pointHoverBorderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(148, 163, 184, 0.2)' }, // Slate 400
                    grid: { color: 'rgba(148, 163, 184, 0.2)' },
                    pointLabels: {
                        font: { size: 11, family: "'Inter', sans-serif" },
                        color: '#94a3b8' // Slate 400
                    },
                    ticks: { display: false, max: 100, backdropColor: 'transparent' }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleColor: '#f1f5f9',
                    bodyColor: '#cbd5e1',
                    titleFont: { size: 13 },
                    bodyFont: { size: 13 },
                    padding: 10,
                    borderColor: '#334155',
                    borderWidth: 1,
                    displayColors: false
                }
            }
        }
    });

    return () => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 font-sans overflow-y-auto absolute inset-0 z-50 animate-fade-in custom-scrollbar">
        
        {/* Navigation */}
        <div className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800 shadow-sm transition-all duration-300">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <button 
                    onClick={onBack} 
                    className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors font-medium group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Village
                </button>
                <div className="flex items-center gap-2 text-amber-500 animate-rune-glow">
                    <Feather className="w-5 h-5" />
                    <span className="font-bold tracking-wide uppercase text-sm">The Raven's Perch</span>
                </div>
            </div>
        </div>

        {/* Hero Section */}
        <header className="relative py-20 px-4 overflow-hidden">
            {/* Moving Mist Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 z-0"></div>
            <div className="absolute inset-0 dream-mist animate-mist-flow z-0 opacity-20"></div>
            
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="mb-6 inline-block p-4 rounded-full bg-amber-500/5 border border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.1)] animate-float">
                    <span className="text-5xl filter drop-shadow-lg">🦅</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-400 to-amber-600 animate-fade-in-up">
                    THE RAVEN
                </h1>
                <p className="text-xl md:text-3xl font-light text-slate-400 italic font-serif mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Messenger Between Worlds
                </p>
                <p className="max-w-2xl mx-auto text-slate-400 leading-relaxed text-lg border-t border-slate-700/50 pt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    Across cultures, the raven is a powerful liminal symbol. Dark, intelligent, and uncanny, it stands at the threshold of life and death, mediating between the seen and the unseen.
                </p>
            </div>
            
            {/* Ambient Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-12 space-y-20 relative z-10">

            {/* Section 1: Archetypes */}
            <section className="bg-slate-800/30 rounded-3xl border border-slate-700/50 overflow-hidden backdrop-blur-md shadow-2xl transition-transform duration-500 hover:border-slate-600/80">
                <div className="p-8 border-b border-slate-700/50 bg-slate-900/40">
                    <h2 className="text-3xl font-serif font-bold text-amber-100 mb-2 flex items-center gap-3">
                        <span className="text-amber-500 text-2xl">✦</span> Archetypal Roles
                    </h2>
                    <p className="text-slate-400">
                        The raven is rarely just a bird; it is a functionary of the cosmos.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 min-h-[450px]">
                    {/* Nav */}
                    <div className="bg-slate-900/30 p-4 flex flex-col space-y-2 border-r border-slate-700/50">
                        {rolesData.map(role => (
                            <button
                                key={role.id}
                                onClick={() => setCurrentRole(role)}
                                className={`text-left px-5 py-4 rounded-xl transition-all duration-300 text-sm font-medium flex items-center gap-4 ${
                                    currentRole.id === role.id 
                                    ? 'bg-gradient-to-r from-amber-500/20 to-transparent text-amber-200 border-l-4 border-amber-500' 
                                    : 'hover:bg-slate-800 text-slate-500 hover:text-slate-300 border-l-4 border-transparent'
                                }`}
                            >
                                <span className="text-2xl filter drop-shadow-md transform transition-transform duration-300 group-hover:scale-110">{role.icon}</span>
                                <span className="uppercase tracking-wider text-xs">{role.title}</span>
                            </button>
                        ))}
                    </div>
                    
                    {/* Content */}
                    <div className="md:col-span-2 p-10 flex flex-col justify-center relative overflow-hidden">
                        {/* Background rune effect */}
                        <div className="absolute -top-10 -right-10 text-[15rem] opacity-[0.03] pointer-events-none select-none grayscale animate-spin-slow">
                            {currentRole.icon}
                        </div>

                        <div className="flex items-center mb-8 relative z-10 animate-fade-in" key={currentRole.id}>
                            <div className="w-16 h-16 flex items-center justify-center bg-amber-500/10 rounded-2xl mr-6 border border-amber-500/20 animate-float">
                                <span className="text-4xl filter drop-shadow-lg">{currentRole.icon}</span>
                            </div>
                            <h3 className="text-4xl font-serif font-bold text-slate-100 tracking-tight">{currentRole.title}</h3>
                        </div>
                        
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 relative z-10 backdrop-blur-sm animate-fade-in-up" key={`${currentRole.id}-desc`}>
                            <p className="text-lg text-slate-300 leading-relaxed mb-6 italic">
                                "{currentRole.desc}"
                            </p>
                            <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-4 border-b border-slate-700 pb-2">Manifestations</h4>
                            <ul className="space-y-3">
                                {currentRole.examples.map((ex, i) => (
                                    <li key={i} className="flex items-start text-slate-300 group">
                                        <span className="mr-3 text-amber-600 font-bold group-hover:text-amber-400 transition-colors">↳</span>
                                        <span className="group-hover:text-slate-200 transition-colors">{ex}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Global Mythos */}
            <section className="bg-slate-800/30 rounded-3xl border border-slate-700/50 p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-50"></div>
                
                <div className="mb-8 relative z-10">
                    <h2 className="text-3xl font-serif font-bold text-amber-100 mb-2 flex items-center gap-3">
                        <span className="text-amber-500 text-2xl">✦</span> Global Mythos
                    </h2>
                    <p className="text-slate-400">
                        The raven speaks many languages. Select a tradition.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 border-b border-slate-700/50 mb-10 relative z-10">
                    {Object.keys(cultureData).map(key => (
                        <button
                            key={key}
                            onClick={() => setCurrentCultureKey(key)}
                            className={`pb-3 px-6 text-sm font-medium transition-all duration-300 relative ${
                                currentCultureKey === key 
                                ? 'text-amber-400' 
                                : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            <span className="relative z-10">{cultureData[key].name}</span>
                            {currentCultureKey === key && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.8)]"></span>
                            )}
                            {currentCultureKey === key && (
                                <span className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent opacity-100 -z-0"></span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="bg-slate-900/60 rounded-2xl p-10 border border-slate-700 min-h-[250px] animate-fade-in relative overflow-hidden shadow-inner group">
                    <div className="absolute top-4 right-8 font-serif text-9xl text-amber-500/5 select-none transition-transform duration-1000 group-hover:rotate-12 group-hover:scale-110">“</div>
                    
                    <div key={currentCultureKey} className="animate-fade-in relative z-10">
                        <h3 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 mb-6">
                            {cultureData[currentCultureKey].title}
                        </h3>
                        <p className="text-slate-300 leading-loose text-xl font-serif font-light">
                            {cultureData[currentCultureKey].content}
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 3: Analysis */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-800/30 rounded-3xl border border-slate-700/50 p-8 backdrop-blur-md shadow-xl hover:bg-slate-800/40 transition-colors">
                    <h2 className="text-2xl font-serif font-bold text-amber-100 mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-amber-500 rounded-full"></span> The Shape of Symbolism
                    </h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Analysis reveals that the Raven is not solely a symbol of death. It is a complex mediator where Wisdom and Prophecy are nearly as prominent as its role as a Psychopomp.
                    </p>
                    <div className="space-y-4">
                        {[
                            { icon: '💀', title: 'Death & Transition', desc: 'Psychopomp, carrion eater, soul escort.' },
                            { icon: '👁️', title: 'Wisdom & Prophecy', desc: 'Divine messengers, spies for gods, truth-tellers.' },
                            { icon: '⚔️', title: 'War & Fate', desc: 'Battlefield omens, connection to victory/doom.' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start p-4 hover:bg-slate-700/50 rounded-xl transition-all border border-transparent hover:border-slate-600 hover:translate-x-1 duration-300">
                                <span className="text-3xl mr-4">{item.icon}</span>
                                <div>
                                    <h4 className="font-bold text-slate-200">{item.title}</h4>
                                    <p className="text-sm text-slate-500">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-800/30 rounded-3xl border border-slate-700/50 p-8 flex flex-col items-center justify-center backdrop-blur-md shadow-xl relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent rounded-3xl pointer-events-none"></div>
                    <h3 className="text-sm font-bold text-amber-500/80 uppercase tracking-widest mb-6 animate-pulse-slow">Thematic Intensity Profile</h3>
                    <div className="w-full h-[350px] relative">
                        <canvas ref={chartRef}></canvas>
                    </div>
                </div>
            </section>

            {/* Section 4: Key Entities */}
            <section className="bg-slate-800/30 rounded-3xl border border-slate-700/50 p-10 backdrop-blur-md shadow-2xl">
                <h2 className="text-3xl font-serif font-bold text-amber-100 mb-10 text-center">Key Figures of the Veil</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: '🦅', name: 'Huginn & Muninn', culture: 'Norse', desc: '"Thought" and "Memory." Odin\'s spies who fly over Midgard.' },
                        { icon: '☀️', name: 'Apollo\'s Raven', culture: 'Greek', desc: 'Once white, scorched black for delivering bad news.' },
                        { icon: '⚔️', name: 'The Morrígan', culture: 'Celtic', desc: 'The "Great Queen" of war who appears as a crow to foretell death.' },
                        { icon: '🌅', name: 'Yatagarasu', culture: 'Japanese', desc: 'The three-legged solar crow. A divine guide sent by heaven.' }
                    ].map((entity, i) => (
                        <div 
                            key={i} 
                            className="bg-slate-900/60 p-6 rounded-2xl border border-slate-700 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all duration-500 group animate-float"
                            style={{ animationDelay: `${i * 0.5}s` }}
                        >
                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform filter drop-shadow-xl text-center">{entity.icon}</div>
                            <h3 className="font-bold text-slate-100 text-lg mb-2 text-center group-hover:text-amber-200 transition-colors">{entity.name}</h3>
                            <p className="text-xs text-amber-500 font-bold uppercase tracking-wide mb-3 text-center opacity-80">{entity.culture}</p>
                            <p className="text-sm text-slate-400 leading-relaxed text-center group-hover:text-slate-300 transition-colors">{entity.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>

        <footer className="bg-slate-900 text-slate-500 py-12 border-t border-slate-800 mt-12 relative z-10">
            <div className="max-w-6xl mx-auto px-4 text-center text-sm">
                <p className="font-serif italic text-slate-600">Based on "Mitologija in simbolika krokarja"</p>
                <div className="mt-4 flex justify-center gap-4 text-xs tracking-widest uppercase text-slate-700">
                    <span className="hover:text-amber-500 transition-colors">Chart.js</span>
                    <span>•</span>
                    <span className="hover:text-amber-500 transition-colors">Tailwind</span>
                    <span>•</span>
                    <span className="hover:text-amber-500 transition-colors">React</span>
                </div>
            </div>
        </footer>
    </div>
  );
};

export default RavenPerch;
