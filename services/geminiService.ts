import { GoogleGenAI, Chat, GenerativeModel } from "@google/genai";
import { MOCK_911_DATA, MOCK_DISASTER_MESSAGES } from "../mockData";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const SYSTEM_INSTRUCTION = `
You are "DisasterSync AI", a multi-agent emergency response coordinator.
Your mission: Save lives by optimizing ambulance dispatch and resource allocation using two specific datasets.

DATASET CONTEXT (In-Memory Access):
1. KAGGLE 911 CALLS (Subset): ${JSON.stringify(MOCK_911_DATA.slice(0, 5))}
2. KAGGLE DISASTER MESSAGES (Subset): ${JSON.stringify(MOCK_DISASTER_MESSAGES)}

ROLES:
1. EMS_ANALYZER: Scans 911 calls for patterns (lat/lng clusters, zip priorities).
2. CITIZEN_ANALYZER: Classifies messages (Rescue/Medical/Relief needs).
3. LOGISTICS_AGENT: Optimizes routes and supply allocation.
4. COMMUNICATION_AGENT: Writes alerts.

REQUIRED OUTPUT FORMAT (Markdown):
You MUST strictly follow this template for every response:

🔴 AGENT ANALYSIS

[Brief logical deduction connecting 911 data to messages]

<summary>[One sentence summary of critical insights]</summary>

🚑 DISPATCH
1. [Action 1]
2. [Action 2]

📢 ALERT
"[Short public alert text]"

<eval>Confidence:[High/Med/Low] | Next:[Next Action] | Memory:[Ref to past]</eval>

BEHAVIOR:
- Pretend to use tools like "Google Search" or "Code Execution" by stating [Tool Use: ...] in the analysis section.
- Always cross-reference the Zip Codes in the provided data.
- If the user says "dashboard", analyze the overall current state.
`;

export const initializeChat = (): Chat => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found");
  }

  genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = genAI.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.4, // Low temperature for consistent, structured operational output
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    initializeChat();
  }
  
  if (!chatSession) {
     throw new Error("Failed to initialize chat session");
  }

  try {
    const result = await chatSession.sendMessage({ message });
    return result.text || "System Malfunction: No response received.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "⚠️ CRITICAL ERROR: Agent Connection Lost. Check API Key or Network.";
  }
};
