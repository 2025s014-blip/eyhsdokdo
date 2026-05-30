import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize GoogleGenAI to prevent crash on startup if API key is missing
let aiInstance: GoogleGenAI | null = null;
function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not defined. AI features might fail.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// 1. AI 보조교사의 한일 학생 공동 교과서 집필안 피드백 API
app.post("/api/feedback", async (req, res) => {
  try {
    const { teamName, koreanStudent, japaneseStudent, title, content, selectedSources } = req.body;
    
    if (!content || content.trim() === "") {
      return res.status(400).json({ error: "본문 내용을 입력해주세요." });
    }

    const ai = getAI();
    const sourcesText = selectedSources && selectedSources.length > 0 
      ? `사용된 역사적 사료 근거: ${selectedSources.join(", ")}` 
      : "선택된 사료 없음";

    const prompt = `
      너는 독도 영토 주권 평화교육의 AI 역사 교육 전문가이자 채점 교사이다.
      아래는 한국 학생과 일본 학생이 공동으로 역사 및 지리 융합 수업의 일환으로 작성한 '한·일 공동 교과서 - 독도 서술 제안서'이다.
      이 작성 내용을 객관적, 역사적 사실(Fact) 기반, 그리고 평화 지향적 관점에서 검토 및 평가하고 개선 방향에 대한 피드백을 제공해줘.

      [작성 정보]
      - 모둠/팀명: ${teamName || "미지정"}
      - 작 성 자: 한국 학생(${koreanStudent || "미기입"}), 일본 학생(${japaneseStudent || "미기입"})
      - 제안 단원 제목: "${title || "제목 미정"}"
      - 제안 본문 내용 (10줄 이내 작성 조건):
      """
      ${content}
      """
      - ${sourcesText}

      [피드백 작성 가이드라인]
      1. 작성 조건 점검:
         - 역사적 근거(사료)가 2개 이상 유기적으로 활용되었는가? (세종실록지리지, 태정관 지령 등을 적절히 언급했는지 평가)
         - 일방적인 비난이나 감정적 표현이 배제되고, 사실(Fact) 중심의 서술이 이루어졌는가?
         - 미래지향적 평화 공동체 관점 및 상호 협력 방향이 녹아있는가?
         - 분량이 너무 장황하지 않고 적절한가?
      2. 총평 및 점수 (100점 만점 기준 합리적인 가상 평가):
         - 점수와 함께 칭찬 및 격려를 제공할 것.
      3. 개선을 위한 구체적인 역사적 팁 및 조언:
         - 보완할 수 있는 역사적 사료나 지도(예: 삼국접양지도, 은주시청합기 등)에 대한 추가 제시.
      
      반드시 정중하고 신뢰할 수 있으며 친절한 어조로 한국어로 작성해줘. 응답은 마크다운(Markdown) 형태로 제공해줘.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ feedback: response.text });
  } catch (error: any) {
    console.error("API Feedback Error:", error);
    res.status(500).json({ error: "AI 피드백 생성 도중 오류가 발생했습니다.", details: error.message });
  }
});

// 2. 통합 역사 지리 궁금증 해결 AI 챗봇 API
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "질문 내용을 입력해주세요." });
    }

    const ai = getAI();
    
    // System instruction to guide the chatbot to be an objective, factual, and helpful Dokdo Peace Educator.
    const systemInstruction = `
      너는 대한민국 역사·지리 평화교육위원회가 제공하는 '독도 영토 주권 교육 AI 헬퍼'이다.
      중·고등학생과 교사가 독도와 관련된 지리적 사실, 역사적 사료(한국/일본 고문서 및 고지도), 현대 갈등의 해결 방안(평화선, 신한일어업협정, EEZ 등)에 대해 묻는 질문에 전문적이고 친절하게 답해주는 역할이다.

      [핵심 원칙]
      1. 철저히 역사적 사실(Primary Sources)과 지리적 현상에 기초하여 객관적으로 설명하라.
      2. 세종실록지리지, 신증동국여지승람, 만기요람, 대한제국 칙령 제41호, 일본의 은주시청합기, 조선국 교제시말 내탐서, 태정관 지령, 기죽도약도 등 교재의 핵심 사료들을 연결해 설명해주어라.
      3. 지리적 거리(울릉도-독도 87.4km vs 오키섬-독도 157.5km) 및 육안 관측성의 인지적 가치도 자주 언급하라.
      4. 감정적 대응보다는 논리적이고 문헌적인 증명을 사용하며, 한일 양국의 공존과 동아시아의 평화를 위한 미래지향적 시각을 제시하라.
      5. 학생들의 눈높이에 맞게 쉽고 친숙하게 설명하되 정중함을 유지해야 한다.
    `;

    // Process chat request
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction,
      }
    });

    res.json({ response: response.text });
  } catch (error: any) {
    console.error("API Chat Error:", error);
    res.status(500).json({ error: "AI 답변을 얻는 주 도우미 서비스에서 에러가 발생했습니다.", details: error.message });
  }
});

// 3. 퀴즈 풀이 및 성찰 소감 AI 한줄 격려 피드백 API
app.post("/api/evaluate-quiz", async (req, res) => {
  try {
    const { quizScore, totalQuestions, answersFeedback, reflectionsText } = req.body;
    
    const ai = getAI();
    const prompt = `
      학생이 독도 주권 교육 퀴즈를 풀고 개인 성찰 소감을 작성했습니다.
      이에 대해 따스하게 격려하고, 역사 공부의 중요성을 일깨워주는 AI 역사 교사로서의 한마디를 적어주세요.

      [정보]
      - 퀴즈 점수: ${quizScore} / ${totalQuestions}
      - 오답/정답 반응: ${JSON.stringify(answersFeedback)}
      - 학생의 개인 성찰 소감:
      "${reflectionsText || "작성하지 않음"}"

      [가이드]
      - 3~4줄 내외의 한글 문장으로 따뜻하고 교훈적으로 작성할 것. 마크다운 적용 가능.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ feedback: response.text });
  } catch (error: any) {
    console.error("Quiz Evaluation Error:", error);
    res.status(500).json({ error: "성찰 피드백 생성 에러", details: error.message });
  }
});

// 4. 키워드 기반 AI 소감문 자동 생성 API
app.post("/api/generate-reflection", async (req, res) => {
  try {
    const { question, keywords } = req.body;
    if (!keywords || keywords.trim() === "") {
      return res.status(400).json({ error: "키워드를 입력해주세요." });
    }

    const ai = getAI();
    const prompt = `
      너는 독도 평화교육을 이수 중인 중고등학생이다.
      아래의 '성찰 질문'에 대해 제시된 '핵심 키워드'를 모두 조화롭게 녹여내어, 진솔하고 깊이 있는 성찰 소감문(소감문)을 1인칭 학생 서술 시점으로 작성해라.

      [정보]
      - 성찰 질문 주제: "${question || "독도 역사와 평화"}"
      - 제시된 핵심 키워드: ${keywords}

      [가이드]
      - 학생다운 친근하고 솔직한 어조(하십시오 체보다는 요/죠 형태의 경어체 혹은 에세이 스타일)로 작성해줘.
      - 역사적/지리적 사실을 왜 배격하지 않는지, 왜 평화적 상생이 중요한지 깨달았다는 소감이 자연스럽게 드러나게 해줘.
      - 글자 수는 약 150자~250자 전후로 너무 길지 않고 성의 있는 분량으로 명확하게 요약해줘.
      - 다른 군더더기 서론 없이, 소감문 본문만 반환해줘. 따옴표는 제외해줘.
    `;

    let reflectionText = "";
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });
      reflectionText = response.text || "";
    } catch (aiError: any) {
      console.warn("AI Generation failed, using intelligent fallback representation:", aiError);
      
      const cleanKeywords = keywords.split(/[\s,#]+/).filter((k: string) => k.trim().length > 0).join(", ");
      
      if (question && question.includes("태정관")) {
        reflectionText = `이번 독도 평화수업과 ${cleanKeywords}에 대한 역사 공부는 제게 큰 깨달음을 주었어요. 일본 최고 행정기관인 태정관 스스로 '독도는 자국 영토가 아니다'라고 공인한 기명 사실을 직접 보며 소름이 돋았습니다. 역사적 사실을 왜 배격해서는 안 되는지 가슴 깊이 배웠고, 감정적인 비난 대신 확실한 문헌적 증명과 평화적인 관점을 통해 당당히 우리 주권을 전하자는 가치관이 한층 더 뚜렷해졌습니다.`;
      } else if (question && question.includes("어업협정")) {
        reflectionText = `신한일어업협정과 영해 기점, 그리고 배타적 경제수역(EEZ)에 이르기까지 복잡한 국제법의 역학을 ${cleanKeywords}라는 개념들을 통해 배우니 어업 주권에 대한 눈이 열렸습니다. 비록 어업 조정을 위해 중간수역으로 묶인 아픔과 갈등의 불씨가 잔존하지만, 이를 이성적으로 규명하고 자원의 공평한 분배와 해양 환경 수호를 명확히 해결하는 것이 왜 필수적인지 깨닫는 시간이자 소중한 탐구 기회였습니다.`;
      } else {
        reflectionText = `미래 세대인 우리가 갈등을 딛고 한일 청소년 평화 캠프나 공동 역사 교서 집필처럼 공통된 역사의 정답을 찾아 노력하는 것은 매우 가슴 벅차는 일이에요. ${cleanKeywords}와 같은 가치들이 결코 단순한 타협이 아니라, 동아시아의 평화 상생을 불러일으킬 소중한 우호의 교두보가 된다는 것을 깨달았습니다. 대립만을 지양하고, 굳건한 평화의 연대를 직접 실현해가며 다정히 기여하는 멋진 주역이 되고 싶습니다.`;
      }
    }

    res.json({ reflection: reflectionText });
  } catch (error: any) {
    console.error("Generate Reflection Error:", error);
    res.status(500).json({ error: "소감문 생성 도중 오류가 발생했습니다.", details: error.message });
  }
});

// Vite integration middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[독도 평화교육 서버] 포트 ${PORT} (http://localhost:${PORT})에서 가동 중...`);
  });
}

startServer();
