import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAIClient = (): GoogleGenAI => {
  if (!ai) {
    // Ideally process.env.API_KEY is available. 
    // If not, we handle gracefully in the UI, but for this code we assume it exists or fail.
    const apiKey = process.env.API_KEY || '';
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const sendMessageToGemini = async (
  message: string, 
  history: { role: 'user' | 'model'; parts: { text: string }[] }[] = []
): Promise<string> => {
  try {
    const client = getAIClient();
    
    // Using gemini-3-flash-preview for fast, interactive chat
    const model = 'gemini-3-flash-preview';
    
    // We can use the chat API for history context
    const chat = client.chats.create({
      model,
      history: history,
      config: {
        systemInstruction: "你是‘超赢’，‘快乐平安’的智能销售助手。你专业、简洁且乐于助人。你负责帮助进行客户分析、整理会议纪要和发现销售机会。请用简体中文回答，保持回答简短，并针对移动端屏幕进行良好的排版。",
      }
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "抱歉，我无法生成回复。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "目前无法连接到智能体，请稍后再试。";
  }
};

export const generateMeetingSummary = async (transcript: string): Promise<string> => {
   try {
    const client = getAIClient();
    const model = 'gemini-3-flash-preview';
    
    const prompt = `请将以下会议记录总结为关键点、做出的决定和行动项（请用简体中文回答）：\n\n${transcript}`;
    
    const response = await client.models.generateContent({
      model,
      contents: prompt,
    });
    
    return response.text || "无法生成摘要。";
   } catch (error) {
     console.error("Summary Error:", error);
     return "生成摘要失败。";
   }
}