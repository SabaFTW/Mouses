
export interface DreamSession {
  id: string;
  date: Date;
  status: 'idle' | 'recording' | 'processing_audio' | 'generating_image' | 'analyzing' | 'complete';
  audioBlob?: Blob;
  transcription?: string;
  visualPrompt?: string;
  imageUrl?: string;
  analysis?: DreamAnalysis;
  imageSize: '1K' | '2K' | '4K';
}

export interface DreamAnalysis {
  title: string;
  summary: string;
  emotionalTheme: string;
  archetypes: Array<{
    name: string;
    description: string;
  }>;
  interpretation: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface StorySession {
  id: string;
  date: Date;
  title: string;
  content: string;
  visualPrompt: string;
  imageUrl?: string;
  audioBase64?: string; // For TTS
  params: {
    philosophy1: string;
    philosophy2: string;
    setting: string;
    duration: string;
  };
}

export type ImageSize = '1K' | '2K' | '4K';
export type AppView = 'village' | 'dreamer' | 'lyra' | 'library' | 'ves_archive' | 'chapel' | 'raven' | 'dignum';

declare global {
  interface Window {
    // AudioContext types for legacy browsers
    webkitAudioContext?: typeof AudioContext;
    Chart?: any;
  }
}
