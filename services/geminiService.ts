import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const getChatResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  try {
    const ai = getClient();
    // Using gemini-3-pro-preview for complex text tasks (Chatbot)
    const model = 'gemini-3-pro-preview';
    
    // Transform history to format expected by API if needed, 
    // but simpler to just send the conversation as a prompt or use chat session.
    // Here we use chat session for better context management.
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: "You are a compassionate, empathetic, and professional mental health assistant for an app called 'Stress Meter'. Your goal is to provide supportive, non-judgmental guidance on stress management, anxiety, and mood improvement. Do not provide medical diagnoses or prescriptions. If a user seems to be in immediate danger or severe crisis, gently encourage them to seek professional help or contact emergency services immediately. Keep responses concise, warm, and helpful.",
      }
    });

    // Replay history to the chat session (excluding the new message)
    // Note: In a real persistent app we might maintain the `chat` object instance, 
    // but for this stateless service call pattern, we re-hydrate or just send context.
    // For simplicity and robustness in this demo, we'll send the history as context in the prompt 
    // OR just rely on the new message if history is too complex to reconstruct perfectly without the previous response objects.
    // Let's try to reconstruct a simple history if possible, or just send the current message.
    
    // Simplest robust approach for this demo:
    // Create a new chat and send the history as part of the context or "history" param if the SDK supports it easily.
    // Since SDK chat.sendMessage is stateful for the instance, we can't easily "inject" past history without making multiple calls.
    // We will assume a fresh context or just the last few messages for context in the system instruction or prompt.
    
    const contextPrompt = history.slice(-5).map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n');
    const fullPrompt = contextPrompt ? `Previous conversation:\n${contextPrompt}\n\nUser: ${newMessage}` : newMessage;

    const response: GenerateContentResponse = await chat.sendMessage({
      message: fullPrompt
    });

    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};

export const editImage = async (imageBase64: string, prompt: string): Promise<string | null> => {
  try {
    const ai = getClient();
    // Using gemini-2.5-flash-image (Nano banana) for image editing
    const model = 'gemini-2.5-flash-image';

    // Remove header if present in base64 string
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming jpeg or png, strict MIME checking might be needed in prod
              data: base64Data
            }
          },
          {
            text: `Edit this image: ${prompt}. Return ONLY the edited image.`
          }
        ]
      }
    });

    // Iterate to find image part
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Gemini Image Edit Error:", error);
    throw error;
  }
};
