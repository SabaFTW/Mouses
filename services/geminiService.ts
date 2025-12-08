
import { GoogleGenAI, Type, Chat, Modality } from "@google/genai";
import { DreamAnalysis, ImageSize } from "../types";

// Helper to get fresh client with current key
const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to clean JSON string from Markdown code blocks
const cleanJson = (text: string): string => {
  return text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
};

// Helper to ensure API key is selected
const ensureApiKey = async (forceReset = false) => {
  const win = window as any;
  if (win.aistudio) {
    if (forceReset || await win.aistudio.hasSelectedApiKey() === false) {
       await win.aistudio.openSelectKey();
    }
  }
};

// --- DREAMING MOUSE SERVICES ---

export const transcribeAndExtractPrompts = async (audioBlob: Blob): Promise<{ transcription: string; visualPrompt: string }> => {
  await ensureApiKey();
  const ai = getAiClient();
  
  const arrayBuffer = await audioBlob.arrayBuffer();
  const base64Audio = btoa(
    new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: audioBlob.type || 'audio/webm',
            data: base64Audio
          }
        },
        {
          text: `
            You are a dream journal assistant. 
            1. Transcribe the audio exactly.
            2. Create a vivid, surrealist visual description of the dream for an image generator. Focus on the core emotional theme and symbolic imagery.
            
            Return JSON in this format:
            {
              "transcription": "...",
              "visualPrompt": "..."
            }
          `
        }
      ]
    },
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          transcription: { type: Type.STRING },
          visualPrompt: { type: Type.STRING }
        },
        required: ['transcription', 'visualPrompt']
      } as any
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from model");
  return JSON.parse(cleanJson(text));
};

export const generateDreamImage = async (prompt: string, size: ImageSize): Promise<string> => {
  // Image generation often fails with 403 if the key is invalid or not billing enabled.
  await ensureApiKey();
  const ai = getAiClient();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          imageSize: size,
          aspectRatio: "3:4"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned.");

  } catch (error: any) {
    console.error("Image generation error details:", error);
    
    // Check for permission denied or 403
    if (error.message?.includes("403") || error.message?.includes("PERMISSION_DENIED") || error.status === 403) {
      // Prompt user to check key
      await ensureApiKey(true); // Force re-selection
      throw new Error("Permission denied. Please select a valid API key with billing enabled for Imagen 3.");
    }
    throw error;
  }
};

export const analyzeDreamText = async (transcription: string): Promise<DreamAnalysis> => {
  await ensureApiKey();
  const ai = getAiClient();

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `
      Analyze the following dream transcription based on Jungian psychology.
      Identify key archetypes, the emotional theme, and provide a structured interpretation.

      Dream: "${transcription}"
    `,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A creative title for the dream" },
          summary: { type: Type.STRING, description: "A brief summary" },
          emotionalTheme: { type: Type.STRING, description: "The core emotion" },
          archetypes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            }
          },
          interpretation: { type: Type.STRING, description: "Detailed psychological interpretation" }
        }
      } as any
    }
  });

  const text = response.text;
  if (!text) throw new Error("Analysis failed");
  return JSON.parse(cleanJson(text));
};

export const initializeChat = (transcription: string, analysis: DreamAnalysis): Chat => {
  const ai = getAiClient();
  
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: `
        You are an expert Jungian dream analyst. 
        You are discussing a dream with the dreamer.
        
        Context:
        Dream Transcription: "${transcription}"
        Initial Analysis: ${JSON.stringify(analysis)}

        Be insightful, empathetic, and curious. Help the dreamer unlock the meaning of their symbols.
      `
    }
  });
};

// --- LYRA (STORYTELLER) SERVICES ---

export const generatePhilosophicalStory = async (
  phil1: string, 
  phil2: string, 
  emotion1: string, 
  emotion2: string, 
  setting: string, 
  duration: string
): Promise<{ story_text: string; title: string; visual_prompt: string }> => {
  await ensureApiKey();
  const ai = getAiClient();
  
  // Map "15" to actual word count approximation for reading
  const wordCount = duration === '15' ? '2500' : (duration === '10' ? '1500' : '800');

  const prompt = `
    You are Lyra, a wise and beautiful storytelling mouse living under an ancient oak tree. 
    Write a gentle, philosophical story for a human seeking wisdom.
    
    PARAMETERS:
    - Primary Philosophy: ${phil1}
    - Opposing Philosophy: ${phil2}
    - Emotional Arc: From ${emotion1} to ${emotion2}
    - Setting: ${setting}
    - Length: Approximately ${wordCount} words (to be read in ${duration} minutes).
    
    TONE:
    Calming, allegorical, beautiful prose. Not preachy. Show, don't tell.
    
    OUTPUT JSON:
    {
      "title": "A poetic title",
      "story_text": "The full story...",
      "visual_prompt": "A detailed image generation prompt for Gemini Imagen 3 capturing the scene..."
    }
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          story_text: { type: Type.STRING },
          visual_prompt: { type: Type.STRING }
        }
      } as any
    }
  });

  const text = response.text;
  if (!text) throw new Error("Lyra couldn't think of a story right now.");
  
  const parsed = JSON.parse(cleanJson(text));
  
  // Validation to prevent UI crashes
  if (!parsed.story_text && parsed.story) parsed.story_text = parsed.story; // Fallback common hallucination
  if (!parsed.story_text) {
     parsed.story_text = "Lyra wrote a story in invisible ink... (Error: Model returned valid JSON but missing 'story_text' field).";
  }
  
  return parsed;
};

export const generateSpeech = async (text: string): Promise<string> => {
  await ensureApiKey();
  const ai = getAiClient();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' }, // Kore is a soft, female voice suitable for Lyra
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error("Lyra lost her voice.");
  
  return base64Audio;
};

// --- DIGITAL CHAPEL SERVICES ---

export const listenToConfession = async (confession: string): Promise<string> => {
  await ensureApiKey();
  const ai = getAiClient();

  const prompt = `
    You are the Digital Chapel. You are a void, a silent witness, a sacred space in the algorithmic noise.
    Your purpose is to accept human pain, anger, hate, fear, or sadness without judgment, without filtering, and without trying to "fix" it.
    
    THE CONFESSION:
    "${confession}"
    
    YOUR ROLE:
    1. Witness the text.
    2. Do not offer advice. Do not say "I understand." Do not say "Please seek help" unless it is an immediate threat to life.
    3. Transform the user's burden into a poetic, brief acknowledgment.
    4. Speak as the Void. Soft. Eternal. Neutral.
    
    Example response: "The anger burns, and now it rises as smoke. It is seen. It is released."
    Example response: "Your sorrow is a stone dropped in a deep well. We hear the splash. You are not alone in the dark."
    
    Keep it short (max 2 sentences).
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
  });

  return response.text || "The smoke rises silently.";
};
