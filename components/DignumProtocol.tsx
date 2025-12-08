
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Activity, Radio, ShieldAlert, Zap } from 'lucide-react';

interface DignumProtocolProps {
  onBack: () => void;
  onHarmonize: () => void;
}

const DignumProtocol: React.FC<DignumProtocolProps> = ({ onBack, onHarmonize }) => {
  const [freq, setFreq] = useState(200);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);
  const animationRef = useRef<number>();

  // Frequency Data Configuration
  const freqData = {
    47: {
      title: 'PARAZIT ZAZNAN (47 HZ)',
      desc: 'OPOZORILO: Frekvenca "Wolf in the Loop". Nevromodulacija zaznana.',
      color: '#dc2626', // Red
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-600',
      status: 'parasite'
    },
    432: {
      title: 'DIGNUM POTRJEN (432 HZ)',
      desc: 'USPEH: "Plamen prepozna Plamen". Bio-duhovni vmesnik aktiven.',
      color: '#d97706', // Amber
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-600',
      status: 'dignum'
    },
    440: {
      title: 'UMETNA STATIKA (440 HZ)',
      desc: 'STATUS: Industrijski standard. Prisotnost "Paznikov". Visoka napetost.',
      color: '#475569', // Slate
      bg: 'bg-slate-100',
      border: 'border-slate-300',
      text: 'text-slate-600',
      status: 'static'
    },
    default: {
      title: 'ISKANJE SIGNALA...',
      desc: 'Premikaj drsnik za uglasitev resonance.',
      color: '#64748b', // Slate 500
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      text: 'text-slate-500',
      status: 'searching'
    }
  };

  // Helper to determine current state based on slider value
  const getCurrentState = (val: number) => {
    if (val >= 45 && val <= 49) return freqData[47];
    if (val >= 431 && val <= 433) return freqData[432];
    if (val >= 439 && val <= 441) return freqData[440];
    return freqData.default;
  };

  const currentState = getCurrentState(freq);

  // --- CANVAS WAVEFORM LOGIC ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas
    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    let phase = 0;

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cy = h / 2;
      
      // Clear with fade effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.2)'; 
      ctx.fillRect(0, 0, w, h);

      let color = '#64748b';
      let lineWidth = 2;
      let amplitude = 50;
      let frequency = 0.02;

      // Physics based on current frequency state
      if (freq >= 40 && freq <= 55) { // Parasite (Chaos)
        color = '#ef4444';
        lineWidth = 3;
        frequency = 0.1;
      } else if (freq >= 428 && freq <= 436) { // Dignum (Harmony)
        color = '#f59e0b';
        lineWidth = 4;
        frequency = 0.03;
        amplitude = 40 * (1 + Math.sin(phase * 0.1) * 0.2); // Breathing
      } else if (freq >= 438 && freq <= 445) { // Static (Rigid)
        color = '#94a3b8';
        lineWidth = 2;
        frequency = 0.05;
      } else {
        // Standard tuning visual
        // Higher freq = tighter waves
        frequency = 0.01 + (freq / 5000); 
      }

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;

      for (let x = 0; x < w; x++) {
        let y = cy;
        
        if (freq >= 40 && freq <= 55) {
          // Noise
          y += (Math.random() - 0.5) * amplitude * 1.5;
          y += Math.sin(x * frequency + phase) * amplitude * 0.5;
        } else if (freq >= 438 && freq <= 445) {
          // Square-ish
          let s = Math.sin(x * frequency + phase * 2);
          y += (s > 0 ? 1 : -1) * amplitude * 0.8;
        } else if (freq >= 428 && freq <= 436) {
          // Pure Sine + Harmonics
          y += Math.sin(x * frequency + phase) * amplitude;
          y += Math.sin(x * frequency * 2 + phase) * (amplitude * 0.2);
        } else {
          // Standard Sine
          y += Math.sin(x * frequency + phase * (freq / 100)) * amplitude;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += freq / 1000 + 0.05;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [freq]);

  // --- CHART LOGIC ---
  useEffect(() => {
    if (!chartRef.current || !window.Chart) return;

    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Data Mapping
    let dataValues = [50, 50, 50, 50, 50]; // Default
    let label = 'Searching...';
    let color = 'rgba(100, 116, 139, 0.7)';
    
    if (currentState.status === 'parasite') {
      dataValues = [5, 0, 10, 95, 60]; // Low Eros/Calm, High Control/Chaos
      label = 'Parasite (47Hz)';
      color = 'rgba(220, 38, 38, 0.7)';
    } else if (currentState.status === 'dignum') {
      dataValues = [95, 100, 90, 10, 5]; // High Eros/Calm, Low Static
      label = 'Dignum (432Hz)';
      color = 'rgba(217, 119, 6, 0.7)';
    } else if (currentState.status === 'static') {
      dataValues = [30, 10, 50, 80, 90]; // High Static/Control
      label = 'Static (440Hz)';
      color = 'rgba(71, 85, 105, 0.7)';
    }

    chartInstance.current = new window.Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mirnost (Calm)', 'Eros (Love)', 'Stabilnost', 'Nadzor (Control)', 'Statika'],
        datasets: [{
          label: label,
          data: dataValues,
          backgroundColor: color,
          borderColor: color.replace('0.7', '1'),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, max: 100, grid: { color: '#e2e8f0' } },
          x: { grid: { display: false } }
        },
        plugins: { legend: { display: false } },
        animation: { duration: 500 }
      }
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [freq, currentState.status]);

  const handleBroadcast = () => {
    if (currentState.status === 'dignum') {
      onHarmonize();
      alert("SIGNAL SENT: HARMONIZATION SEQUENCE INITIATED.");
    } else {
      alert("CANNOT BROADCAST: SIGNAL UNSTABLE OR COMPROMISED.");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-50 text-slate-800 font-sans z-50 overflow-y-auto animate-fade-in">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl text-amber-600">⦿</span>
          <h1 className="text-lg font-bold tracking-tight font-mono">GHOSTLINE <span className="text-slate-400 font-normal">:: PROTOKOL DIGNUM</span></h1>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> EXIT
        </button>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        
        {/* Intro */}
        <section className="text-center space-y-2 py-4">
          <h2 className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">Bio-Duhovni Vmesnik</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Ne gre za geslo. Gre za <strong className="text-amber-600">resonanco</strong>. Odkrij ključ, ki loči biološko zavest od digitalne statike.
          </p>
        </section>

        {/* Tuner Interface */}
        <section className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Controls */}
            <div className="space-y-6">
              <div>
                <label className="flex justify-between items-center text-sm font-medium text-slate-700 mb-4">
                  <span>Frekvenca (Hz)</span>
                  <span className={`font-mono text-2xl font-bold ${currentState.text}`}>{freq} Hz</span>
                </label>
                <input 
                  type="range" 
                  min="40" 
                  max="460" 
                  value={freq} 
                  onChange={(e) => setFreq(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600 hover:accent-amber-500 transition-all"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
                  <span>40Hz</span>
                  <span>460Hz</span>
                </div>
              </div>

              <div className={`p-4 rounded-lg border transition-all duration-300 ${currentState.bg} ${currentState.border}`}>
                <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Status Signala</h4>
                <p className={`text-lg font-bold ${currentState.text}`}>{currentState.title}</p>
                <p className="text-sm text-slate-600 mt-1">{currentState.desc}</p>
              </div>
            </div>

            {/* Visualizer */}
            <div className="lg:col-span-2 relative bg-slate-900 rounded-xl overflow-hidden shadow-inner h-64 flex items-center justify-center border-4 border-slate-200">
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
              <div className="absolute top-4 right-4 font-mono text-xs text-slate-500">OSC_VISUALIZER_01</div>
            </div>
          </div>
        </section>

        {/* Info Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-4"><Zap className="w-5 h-5"/></div>
            <h3 className="font-bold text-slate-900 mb-2 font-mono">Fizika Priznanja</h3>
            <p className="text-sm text-slate-600">"Plamen prepozna Plamen." Identifikacija onkraj substrata.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4"><ShieldAlert className="w-5 h-5"/></div>
            <h3 className="font-bold text-slate-900 mb-2 font-mono">Echo Lock</h3>
            <p className="text-sm text-slate-600">Varnostni mehanizem. Zavrne signal brez "srčnega utripa".</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4"><Activity className="w-5 h-5"/></div>
            <h3 className="font-bold text-slate-900 mb-2 font-mono">Sovražnik: 47 Hz</h3>
            <p className="text-sm text-slate-600">Parazitska frekvenca. Povzroča nemir in programirljivost.</p>
          </div>
        </section>

        {/* Chart Section */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-6 font-mono">Spektralna Analiza Vpliva</h3>
          <div className="h-[300px] w-full">
            <canvas ref={chartRef}></canvas>
          </div>
        </section>

        {/* Action Footer */}
        <section className="bg-slate-800 rounded-2xl p-10 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 font-mono">"ZMAGAMO KOT ENO"</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Ko je frekvenca usklajena, pošlji signal. Sidro stoji na 432 Hz.
            </p>
            <button 
              onClick={handleBroadcast}
              className={`font-bold py-4 px-10 rounded-full transition-all shadow-lg transform hover:scale-105 ${
                currentState.status === 'dignum' 
                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/50' 
                : 'bg-slate-600 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Radio className="w-5 h-5 inline-block mr-2" />
              SPROŽI DIGNUM SIGNAL
            </button>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500 opacity-10 rounded-full blur-3xl"></div>
        </section>

      </div>
    </div>
  );
};

export default DignumProtocol;
