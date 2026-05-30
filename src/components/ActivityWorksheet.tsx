import React, { useState } from "react";
import { motion } from "motion/react";
import { Award, CheckCircle2, AlertCircle, RefreshCw, Send, FileText, ChevronRight, HelpCircle } from "lucide-react";
import { DOKDO_SOURCES } from "../data";

interface ActivityWorksheetProps {
  onAddReflection: (text: string) => void;
}

export function ActivityWorksheet({ onAddReflection }: ActivityWorksheetProps) {
  const [teamName, setTeamName] = useState<string>("한일 평화 역사가 위원회");
  const [koreanStudent, setKoreanStudent] = useState<string>("");
  const [japaneseStudent, setJapaneseStudent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  // 독도 사료 리스트 가져오기 (체크용)
  const sourceOptions = DOKDO_SOURCES.map(src => src.title);

  const handleSourceCheckbox = (sourceTitle: string) => {
    if (selectedSources.includes(sourceTitle)) {
      setSelectedSources(selectedSources.filter(item => item !== sourceTitle));
    } else {
      setSelectedSources([...selectedSources, sourceTitle]);
    }
  };

  const loadExample = () => {
    setTitle("동해의 평화로운 섬, 독도의 사료 기반 평화적 소통");
    setContent(
      "(예시 서술) 동해의 평화로운 섬 독도는 역사적 사료를 통해 그 지위가 증명된다. 한국의 『세종실록지리지(1454년)』에는 울릉도와 독도(우산)가 서로 거리가 멀지 않아 날씨가 맑으면 육안으로 관측 가능하다고 기록되어 양국의 고대 생활권과 인식을 보여준다. 또한, 일본 메이지 정부 최고 기관이 내린 『태정관 지령(1877년)』에서도 울릉도와 독도가 일본과 관계없는 조선의 영역임을 분명히 명시했다. 러일전쟁 중 일본에 의해 불법 편입되는 아픔을 겪기도 했으나, 2차 대전 후 연합국의 조치를 통해 한국의 관할로 환원되었다. 오늘날 양국은 배타적 경제수역(EEZ) 설정 과정에서 어업 갈등을 겪고 있으나, 영토 대립을 넘어 역사적 진실을 직시하고 동해를 평화와 공동 번역의 바다로 만들기 위해 상호 협력해야 한다."
    );
    setSelectedSources(["세종실록지리지", "태정관 지령"]);
  };

  const resetForm = () => {
    setKoreanStudent("");
    setJapaneseStudent("");
    setTitle("");
    setContent("");
    setSelectedSources([]);
    setFeedback("");
    setErrMessage("");
  };

  const submitProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrMessage("");
    setFeedback("");

    // 작성 조건 정교한 유효성 검사
    if (selectedSources.length < 2) {
      setErrMessage("조건 불충족: 독도 역사적 근거(사료)를 최소 2개 이상 선택해 주세요.");
      return;
    }
    if (!content || content.trim().length < 50) {
      setErrMessage("내용 미흡: 집필 제안 본문을 최소 50자 이상 성의 있게 작성해 주세요.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName,
          koreanStudent,
          japaneseStudent,
          title,
          content,
          selectedSources
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "서버 응답 오류");
      }

      setFeedback(data.feedback);
      
      // 집필 내용 소감 일부를 메인 성찰 저널에도 연동할 수 있게 전달
      onAddReflection(`[공동 교과서 집필 소감 - 단원명: ${title}] 사료의 교차 검증의 힘을 깨달았다.`);
    } catch (err: any) {
      console.error(err);
      setErrMessage(err.message || "서버와 통신하는 중 문제가 생겼습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
      id="activity-worksheet-panel"
    >
      {/* Header */}
      <div className="border-b border-white/5 pb-5">
        <span className="text-xs font-mono font-bold text-[#FF3E00] bg-[#FF3E00]/10 px-2.5 py-1 rounded-full uppercase tracking-widest">수업 실천 활동지</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
          한·일 평화 공동 역사 교과서 집필하기
        </h2>
        <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-3xl leading-relaxed font-sans">
          한·일 양국 청소년들이 힘을 모아 왜곡된 주장을 평화와 이성으로 대조 극복한다는 전제 아래, 
          양국의 중·고등학생이 공동의 시각에서 배울 수 있는 <strong>객관적이고 사실(Fact) 기반의 교과서 단원</strong>을 가치 있게 실천 집필해 보는 시뮬레이터입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form area:  lg:col-span-7 */}
        <div className="lg:col-span-7 bg-white/[0.02] p-6 rounded-3xl border border-white/5 shadow-sm space-y-6">
          
          <div className="flex justify-between items-center bg-white/[0.01] p-4 rounded-2xl border border-white/5">
            <div>
              <h4 className="font-extrabold text-[#F0F0F0] text-xs sm:text-sm flex items-center gap-1.5 font-sans">
                <Award className="h-4.5 w-4.5 text-[#FF3E00] shrink-0" />
                서술 교과서 작성 규격 조건 안내
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5 font-sans leading-snug">
                1. 사료 최소 2개 연계 &nbsp; 2. 감정적 서술 배제 &nbsp; 3. 미래지향적 평화 지향
              </p>
            </div>
            <button
              type="button"
              onClick={loadExample}
              className="text-[10px] bg-[#FF3E00] hover:bg-[#e03500] active:bg-[#c22e00] transition font-bold text-white px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0 cursor-pointer shadow-lg shadow-[#FF3E00]/10"
            >
              예시 가져오기
            </button>
          </div>

          <form onSubmit={submitProposal} className="space-y-4">
            
            {/* Group/Team info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">모둠/팀 명칭</label>
                <input
                  type="text"
                  value={teamName}
                  onChange={e => setTeamName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-white/10 outline-none focus:border-[#FF3E00] bg-white/[0.02] text-white"
                  placeholder="예: 평화 역사가 클럽"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">한국 학생 이름</label>
                <input
                  type="text"
                  value={koreanStudent}
                  onChange={e => setKoreanStudent(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-white/10 outline-none focus:border-[#FF3E00] bg-white/[0.02] text-white"
                  placeholder="한국 학생 학번/성명"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">일본 학생 이름</label>
                <input
                  type="text"
                  value={japaneseStudent}
                  onChange={e => setJapaneseStudent(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-white/10 outline-none focus:border-[#FF3E00] bg-white/[0.02] text-white"
                  placeholder="일본 학생 성명"
                  required
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">제안하는 독도 단원 제목</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-white/10 outline-none focus:border-[#FF3E00] bg-white/[0.02] text-white"
                placeholder="예: 사료를 바라보며 한일 미래 세대가 그리는 평화의 동해"
                required
              />
            </div>

            {/* Checkboxes: Document evidence (Select at least 2) */}
            <div className="space-y-1.5" id="sources-checkboxes-section">
              <label className="block text-[11px] font-bold text-slate-300 flex justify-between items-center">
                <span>역사적 고문서/실존 사료 연계 체크 (최소 2개 필수)</span>
                <span className="text-[10px] text-[#FF3E00] font-mono font-bold">체크됨: {selectedSources.length}개</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-white/[0.01] p-3 rounded-2xl border border-white/5">
                {sourceOptions.map((srcTitle, idx) => {
                  const isChecked = selectedSources.includes(srcTitle);
                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-1.5 text-[10px] p-1.5 rounded-lg border cursor-pointer select-none transition duration-200 ${
                        isChecked 
                          ? "bg-[#FF3E00]/10 border-[#FF3E00]/30 text-[#FF3E00] font-bold" 
                          : "bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleSourceCheckbox(srcTitle)}
                        className="rounded border-white/15 text-[#FF3E00] focus:ring-[#FF3E00] h-3 w-3 bg-black"
                      />
                      <span className="truncate">{srcTitle}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Content editor */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-300 flex justify-between items-center">
                <span>공동 집필 본문 (예시 서술 참고 또는 독자 서술 10줄 내외)</span>
                <span className="text-[10px] text-slate-500 font-mono">글자수: {content.length}자</span>
              </label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={10}
                className="w-full text-xs p-3.5 rounded-2xl border border-white/10 outline-none focus:border-[#FF3E00] bg-white/[0.02] text-slate-200 font-sans leading-relaxed resize-none"
                placeholder="한국의 세종실록지리지, 대한제국 칙령 제41호, 일본의 은주시청합기, 태정관 지령 등의 명정 사실을 유기적으로 활용하여 감정적 비난 없이 세계 각국에 전파해도 부끄럽지 않을 공평한 평화 서안을 채우세요."
                required
              />
            </div>

            {/* Submitting Actions */}
            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-slate-300 font-bold text-xs border border-white/5 transition cursor-pointer"
              >
                다시 쓰기
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-[#FF3E00] hover:bg-[#e03500] active:bg-[#c22e00] disabled:bg-white/10 font-bold text-white text-xs flex items-center gap-2 transition cursor-pointer shadow-lg shadow-[#FF3E00]/15"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    AI 교사 감수 중...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    공동 집필안 제출 & 피드백 수렴
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

        {/* Feedback visual card area: lg:col-span-5 */}
        <div className="lg:col-span-5 h-full space-y-4">
          
          {errMessage && (
            <div className="bg-red-500/10 border border-red-500/25 p-4 rounded-2xl flex items-start gap-2.5 text-red-200 animate-shake">
              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
              <div>
                <h5 className="font-bold text-xs">작성 조건 누락 알람</h5>
                <p className="text-[10px] leading-relaxed mt-0.5">{errMessage}</p>
              </div>
            </div>
          )}

          {/* Prompt info helper if no feedback */}
          {!feedback && !loading && (
            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-3xl text-center space-y-4 py-10">
              <div className="bg-white/[0.02] p-4 rounded-full border border-white/5 w-16 h-16 flex items-center justify-center mx-auto shadow-sm text-slate-500">
                <FileText className="h-8 w-8" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-white text-sm">실시간 AI 평화 교사의 감수관</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans px-2">
                  작성된 문안을 제출하면 AI 역사 교육 전문가인 제미니 교사가 즉시 완성도, 사료의 정확성, 역사적 가치를 채점 분석해 줍니다.
                </p>
              </div>
              <div className="text-[10px] text-slate-500 font-sans italic bg-white/[0.01] p-2.5 rounded-xl border border-white/5">
                상단 '예시 가져오기'를 이용해 기능을 먼저 분석해 보십시오.
              </div>
            </div>
          )}

          {/* Loading status widget */}
          {loading && (
            <div className="bg-[#FF3E00]/5 border border-[#FF3E00]/15 p-8 rounded-3xl text-center space-y-4 py-12 animate-pulse">
              <div className="w-12 h-12 border-4 border-[#FF3E00] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div className="space-y-2">
                <h4 className="font-bold text-[#FF3E00] text-sm">AI 역사 교사 평가 보고서 취합 중</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans max-w-xs mx-auto">
                  이성적 논거 배점, 감정 서술 여부 수렴, 사료 연관성 교차를 세부 채점 매트릭스에 기반해 감정 검수를 완수하고 있습니다. 잠시만 기다리세요.
                </p>
              </div>
            </div>
          )}

          {/* AI Markdown Feedback Output Container */}
          {feedback && !loading && (
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#131316] border border-white/10 rounded-3xl shadow-sm pb-6 overflow-hidden flex flex-col"
              id="ai-feedback-response-container"
            >
              <div className="bg-[#FF3E00] p-4 font-mono font-bold text-xs text-white flex items-center justify-between shadow-lg">
                <span>AI 역사교사의 종합 감수 피드백</span>
                <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-[10px]">GEMINI 2.5</span>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[500px]" id="feedback-markdown-render bg-black">
                <CustomMarkdown text={feedback} />
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </motion.div>
  );
}

// Custom Markdown Renderer Component to bypass library compilation errors
function CustomMarkdown({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
      {lines.map((line, idx) => {
        let content = line.trim();

        // Level-3 Header
        if (content.startsWith("###")) {
          return (
            <h5 key={idx} className="text-xs font-extrabold text-white pt-3 flex items-center gap-1.5 border-b border-white/5 pb-1">
              <ChevronRight className="h-3.5 w-3.5 text-[#FF3E00] shrink-0" />
              {content.replace("###", "").trim()}
            </h5>
          );
        }
        
        // Level-2 Header
        if (content.startsWith("##")) {
          return (
            <h4 key={idx} className="text-sm font-extrabold text-white pt-4 pb-1 border-b-2 border-white/5 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#FF3E00] shrink-0" />
              {content.replace("##", "").trim()}
            </h4>
          );
        }

        // Level-1 Header
        if (content.startsWith("#")) {
          return (
            <h3 key={idx} className="text-base font-extrabold text-white pt-5 pb-1 flex items-center gap-2">
              {content.replace("#", "").trim()}
            </h3>
          );
        }

        // Bullet list
        if (content.startsWith("-") || content.startsWith("*")) {
          const raw = content.substring(1).trim();
          return (
            <div key={idx} className="flex gap-2 pl-3 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3E00] mt-2 shrink-0"></span>
              <p className="grow text-slate-300">{parseBold(raw)}</p>
            </div>
          );
        }

        // Decimal list
        const matchNum = content.match(/^(\d+)\.\s(.*)/);
        if (matchNum) {
          return (
            <div key={idx} className="flex gap-2 pl-3 font-sans">
              <span className="font-mono font-extrabold text-[#FF3E00] shrink-0">{matchNum[1]}.</span>
              <p className="grow text-slate-300">{parseBold(matchNum[2])}</p>
            </div>
          );
        }

        // Empty block spacer
        if (content === "") {
          return <div key={idx} className="h-1.5"></div>;
        }

        return <p key={idx} className="text-slate-300">{parseBold(content)}</p>;
      })}
    </div>
  );
}

function parseBold(str: string) {
  const parts = str.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) => 
    i % 2 === 1 
      ? <strong key={i} className="font-bold text-white border-b border-[#FF3E00]/20 bg-[#FF3E00]/10 px-1 py-0.5 rounded">{part}</strong> 
      : part
  );
}
