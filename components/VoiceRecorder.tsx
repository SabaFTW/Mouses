import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';

interface VoiceRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  isProcessing: boolean;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onRecordingComplete, isProcessing }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        onRecordingComplete(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);
      timerRef.current = window.setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone access is required to record your dream.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      <div className="relative group">
        <div className={`absolute inset-0 bg-dream-glow rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${isRecording ? 'animate-pulse-slow opacity-60' : ''}`}></div>
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600 scale-110' 
              : 'bg-indigo-600 hover:bg-indigo-500'
          } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isProcessing ? (
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          ) : isRecording ? (
            <Square className="w-8 h-8 text-white fill-current" />
          ) : (
            <Mic className="w-10 h-10 text-white" />
          )}
        </button>
      </div>

      <div className="text-center space-y-2">
        <p className="text-2xl font-light text-slate-200 tracking-wide font-serif">
          {isRecording ? 'Listening to your dream...' : 'Record your dream'}
        </p>
        {isRecording && (
          <p className="text-dream-accent font-mono text-lg">{formatTime(duration)}</p>
        )}
        <p className="text-slate-400 text-sm max-w-xs mx-auto">
          Share your dream immediately upon waking. We'll visualize and analyze it.
        </p>
      </div>
    </div>
  );
};

export default VoiceRecorder;
