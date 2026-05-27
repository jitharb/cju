import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize server-side Gemini client securely
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    try {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      console.log("Successfully initialized GoogleGenAI with API key");
    } catch (error) {
      console.error("Error creating GoogleGenAI client:", error);
    }
  } else {
    console.log("No valid GEMINI_API_KEY found, running in demo mode with intelligent auto-responder fallback");
  }

  // API Route for chat assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, systemPrompt } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages format" });
      }

      const lastUserMsg = messages[messages.length - 1]?.content || "";

      // Fallback answers for Demo Mode if GEMINI_API_KEY is not configured
      if (!ai) {
        let answer = "청주대학교에 오신 것을 환영합니다! 스마트 AI 비서입니다. ";
        const q = lastUserMsg.toLowerCase();
        if (q.includes("장학") || q.includes("돈") || q.includes("비용")) {
          answer += "청주대학교는 학생들의 학업 안정을 위해 성적 우수 장학금, 복지 장학금, 교내·외 200여 개의 다양하고 풍성한 장학제도를 운영하고 있습니다. 소득분위 및 성적 기준에 따라 전액 또는 일부 금액을 지원받을 수 있으니 포털 내 '장학지원' 탭을 꼭 확인해 보세요!";
        } else if (q.includes("기숙사") || q.includes("우암마을") || q.includes("생활관")) {
          answer += "청주대학교 생활관은 우암마을, 국제학사, 진아관 등 현대식 시설을 갖추어 전국 각지에서 온 학생들에게 편안한 보금자리를 제공합니다. 입사 신청은 수시/정시 합격자 등록 후 생활관 홈페이지에서 신청하실 수 있으며, 거리 점수와 성적을 기준으로 선발합니다.";
        } else if (q.includes("셔틀") || q.includes("버스") || q.includes("교통")) {
          answer += "청주지역 및 시외(서울, 수도권, 대전 등) 통학 학생들을 위해 무료 순환 셔틀버스와 정기 통학버스를 운행하고 있습니다. 상세한 버스 노선과 운행 운용표는 포털 하단의 '셔틀버스 운행' 탭에서 실시간 출도착 예상시간 계산기를 통해 확인해 보실 수 있습니다.";
        } else if (q.includes("융합") || q.includes("ai") || q.includes("it") || q.includes("컴퓨터")) {
          answer += "AI·SW융합대학은 소프트웨어융합학부, 인공지능학부, 컴퓨터정보공학과, 빅데이터통계학과 등으로 구성되어 차세대 IT 리더를 선도적으로 육성하고 있습니다. 4차 산업혁명의 주역이 되고 싶다면 실습 위주의 커리큘럼을 갖춘 AI·SW융합대학을 적극 추천드립니다!";
        } else {
          answer += "현재 가상 체험 모드로 작동 중입니다. 청주대학교는 충북 청주에 위치한 70여 년 전통의 실용 학문 중심 명문 대학입니다. 단과대 목록, 뉴스 검색, 셔틀버스 시간표 및 맞춤 전형 퀴즈를 페이지 위에서 지금 바로 체험해 보세요!";
        }
        return res.json({ text: answer });
      }

      // Format input messages for the Gemini SDK
      // Using standard config format from @google/genai SKILL
      const formattedContents = messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }));

      const modelName = "gemini-3.5-flash";
      const response = await ai.models.generateContent({
        model: modelName,
        contents: formattedContents,
        config: {
          systemInstruction: systemPrompt || "You are an expert AI Academic Advisor for Cheongju University (청주대학교). You must respond in a friendly, professional, and supportive tone in Korean. Offer descriptive, clear information about academic details, admissions, scholarships, dormitory, and campus life using real academic standards.",
          temperature: 0.7,
        }
      });

      res.json({ text: response.text || "" });
    } catch (e: any) {
      console.error("Gemini API error:", e);
      res.status(500).json({ error: e.message || "Gemini execution failed" });
    }
  });

  // Vite dev middleware vs Production static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log(`Serving static files in production from: ${distPath}`);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started on port ${PORT}`);
  });
}

startServer();
