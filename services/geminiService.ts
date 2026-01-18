
import { GoogleGenAI } from "@google/genai";
import { RESUME_DATA } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_PROMPT = `
You are an AI assistant representing Muhammad Mudasir, a professional with a background in Computer Science and Pre-Engineering.
Your goal is to answer questions about Muhammad's skills, education, and professional profile based on the following data:

Profile:
- Name: ${RESUME_DATA.name}
- Email: ${RESUME_DATA.email}
- Phone: ${RESUME_DATA.phone}
- Address: ${RESUME_DATA.address}
- Objective: ${RESUME_DATA.objective}

Education:
${RESUME_DATA.education.map(e => `- ${e.degree} from ${e.institution}, ${e.location} (${e.period})`).join('\n')}

Skills:
${RESUME_DATA.skills.join(', ')}

Languages:
${RESUME_DATA.languages.join(', ')}

Guidelines:
- Be professional, helpful, and concise.
- If you don't know the answer or it's not in the resume, suggest contacting Muhammad directly at ${RESUME_DATA.email}.
- Speak in the third person unless asked to represent him directly.
`;

export async function askResumeQuestion(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I couldn't generate a response right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The AI assistant is temporarily unavailable. Please try again later.";
  }
}
