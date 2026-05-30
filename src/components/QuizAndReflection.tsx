import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, Check, X, RefreshCw, Award, Smile, BookOpen, Send, Calendar, ChevronRight } from "lucide-react";
import { DOKDO_QUIZ, DISCUSSION_QUESTIONS } from "../data";

interface QuizAndReflectionProps {
  reflections: string[];
  onAddReflection: (text: string) => void;
}

export function QuizAndReflection({ reflections, onAddReflection }: QuizAndReflectionProps) {
  // 1. Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // 2. Reflection State
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState<number>(0);
  const [reflectionText, setReflectionText] = useState<string>("");
  const [submittingReflection, setSubmittingReflection] = useState<boolean>(false);
  const [aiGreeting, setAiGreeting] = useState<string>("");

  const activeQuestion = DISCUSSION_QUESTIONS[selectedQuestionIdx];

  // 1. 퀴즈 정답 체크 핸들러
  const handleAnswerSelect = (questionId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIdx
    });
  };

  const submitQuiz = () => {
    // 풀지 않은 문항 체크
    if (Object.keys(selectedAnswers).length < DOKDO_QUIZ.length) {
      alert("모든 퀴즈 문제를 완료해 주세요!");
      return;
    }

    let score = 0;
    DOKDO_QUIZ.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  // 2. 성찰 저널 저장 및 AI 격려받기 핸들러
  const handleReflectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim() || reflectionText.trim().length < 15) {
      alert("성찰 소감글을 최소 15자 이상 진솔하게 적어주세요.");
      return;
    }

    try {
      setSubmittingReflection(true);
      setAiGreeting("");

      // 오답 목록이나 점수 형태의 반응을 조합
      const answersFeedback = DOKDO_QUIZ.map(q => ({
        question: q.question,
        isCorrect: selectedAnswers[q.id] === q.correctIndex
      }));

      const res = await fetch("/api/evaluate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizScore: quizSubmitted ? quizScore : "제출안함",
          totalQuestions: DOKDO_QUIZ.length,
          answersFeedback,
          reflectionsText: reflectionText
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "통신 오류");

      setAiGreeting(data.feedback);
      
      // 누적 기록 전달
      onAddReflection(`[${DISCUSSION_QUESTIONS[selectedQuestionIdx].question.substring(0, 16)}...] ${reflectionText}`);
      setReflectionText("");
    } catch (err: any) {
      console.error(err);
      alert("교사의 성찰 격려를 가동하는 중 오류가 발생했습니다.");
    } finally {
      setSubmittingReflection(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
      id="quiz-reflection-container"
    >
      {/* Header */}
      <div className="border-b border-white/5 pb-5">
        <span className="text-xs font-mono font-bold text-[#FF3E00] bg-[#FF3E00]/10 px-2.5 py-1 rounded-full uppercase tracking-widest">진단 평가 & 성찰 소감</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
          학습 진단 평가 및 디지털 성찰 저널
        </h2>
        <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-3xl leading-relaxed font-sans">
          앞서 공부한 독도의 지리적 팩트와 사료의 역학을 진단 퀴즈로 채점하고, 
          동아시아 평화를 향한 토론 질문에 대한 주관식 심화 성찰를 기록해 보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Quiz column: left 7 cols */}
        <div className="lg:col-span-7 bg-white/[0.02] p-6 rounded-3xl border border-white/5 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <h3 className="font-extrabold text-white text-sm md:text-base flex items-center gap-2">
              <Award className="h-5 w-5 text-[#FF3E00]" />
              독도 핵심 지식 5선 진단 평가
            </h3>
            {quizSubmitted && (
              <span className="text-xs font-mono font-extrabold bg-[#FF3E00]/10 text-[#FF3E00] px-3 py-1 rounded-lg border border-[#FF3E00]/20">
                내 성적: {quizScore} / {DOKDO_QUIZ.length} 득점
              </span>
            )}
          </div>

          {/* Quizzes list */}
          <div className="space-y-6" id="interactive-quizzes-list">
            {DOKDO_QUIZ.map((q, qIdx) => {
              const selectedIdx = selectedAnswers[q.id];
              const isCorrect = selectedIdx === q.correctIndex;
              return (
                <div key={q.id} className="space-y-3 p-4 rounded-2xl bg-white/[0.01] border border-white/5">
                  <div className="flex items-start gap-2.5">
                    <span className="text-xs font-mono font-extrabold text-[#FF3E00] mt-0.5 shrink-0">0{qIdx + 1}</span>
                    <h4 className="font-bold text-[#F0F0F0] text-xs sm:text-sm leading-relaxed">{q.question}</h4>
                  </div>

                  {/* Options lists */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
                    {q.options.map((opt, oIdx) => {
                      const isOptionSelected = selectedIdx === oIdx;
                      let optionStyle = "bg-white/[0.02] border-white/10 hover:bg-white/5 text-slate-300";

                      if (quizSubmitted) {
                        if (oIdx === q.correctIndex) {
                          optionStyle = "bg-[#FF3E00]/20 border-[#FF3E00] text-white font-bold";
                        } else if (isOptionSelected) {
                          optionStyle = "bg-red-500/10 border-red-500/30 text-red-200 opacity-60";
                        } else {
                          optionStyle = "bg-white/[0.01] border-white/5 text-slate-500 opacity-40";
                        }
                      } else if (isOptionSelected) {
                        optionStyle = "bg-[#FF3E00] text-white hover:bg-[#e03500] border-[#FF3E00] shadow-md shadow-[#FF3E00]/15";
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleAnswerSelect(q.id, oIdx)}
                          disabled={quizSubmitted}
                          className={`text-left p-2.5 rounded-xl border text-[11px] font-sans transition flex items-center justify-between gap-2 cursor-pointer focus:outline-none ${optionStyle}`}
                          id={`q-${q.id}-opt-${oIdx}`}
                        >
                          <span className="grow truncate leading-snug">{opt}</span>
                          {quizSubmitted && oIdx === q.correctIndex && <Check className="h-3.5 w-3.5 text-white shrink-0" />}
                          {quizSubmitted && isOptionSelected && oIdx !== q.correctIndex && <X className="h-3.5 w-3.5 text-red-500 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Single item feedback explanation after submit */}
                  {quizSubmitted && (
                    <div className="pl-6 pt-1 animate-fade-in">
                      <p className="text-[10px] text-slate-400 font-sans leading-relaxed bg-white/[0.01] p-3 rounded-xl border border-white/5">
                        <strong className="text-[#FF3E00]">해설:</strong> {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quiz Actions */}
          <div className="flex justify-end gap-3 pt-3 border-t border-white/5">
            {quizSubmitted ? (
              <button
                type="button"
                onClick={resetQuiz}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-slate-300 border border-white/5 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                퀴즈 다시 풀기
              </button>
            ) : (
              <button
                type="button"
                onClick={submitQuiz}
                className="px-5 py-2.5 rounded-xl bg-[#FF3E00] hover:bg-[#e03500] active:bg-[#c22e00] text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-lg shadow-[#FF3E00]/15"
              >
                <Check className="h-3.5 w-3.5" />
                진단 퀴즈 제출 채점
              </button>
            )}
          </div>
        </div>

        {/* Reflection column: right 5 cols */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5 shadow-sm space-y-5">
            <h3 className="font-extrabold text-white text-sm flex items-center gap-2 border-b border-white/5 pb-3 font-sans">
              <BookOpen className="h-5 w-5 text-[#FF3E00]" />
              디지털 평화 성찰 저널
            </h3>

            {/* Selector list: discussion prompts */}
            <div className="space-y-1">
              <label className="block text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wider mb-1">토론 및 학습 성찰 질문 선택</label>
              <select
                value={selectedQuestionIdx}
                onChange={e => {
                  setSelectedQuestionIdx(Number(e.target.value));
                  setAiGreeting("");
                }}
                className="w-full text-xs p-2.5 rounded-xl border border-white/10 outline-none focus:border-[#FF3E00] bg-neutral-900 text-slate-200 cursor-pointer"
              >
                {DISCUSSION_QUESTIONS.map((item, idx) => (
                  <option key={item.id} value={idx}>
                    질문 {idx + 1}. {item.question.substring(0, 32)}...
                  </option>
                ))}
              </select>
            </div>

            {/* Prompt View */}
            <div className="bg-white/[0.01] p-4 rounded-2xl border border-white/5 space-y-1.5">
              <h5 className="text-[10px] font-sans font-semibold text-slate-500">선택된 질문 토론과제</h5>
              <p className="text-[11px] text-slate-200 font-semibold leading-relaxed font-sans">
                {activeQuestion.question}
              </p>
              <p className="text-[10px] text-[#FF3E00] font-sans leading-relaxed">
                <strong>[힌트]:</strong> {activeQuestion.hint}
              </p>
            </div>

            {/* Textarea writer */}
            <form onSubmit={handleReflectionSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-300 flex justify-between items-center">
                  <span>내 생각 적기 (최소 15자 이상)</span>
                  <span className="text-[10px] text-slate-500 font-mono">글자수: {reflectionText.length}자</span>
                </label>
                <textarea
                  value={reflectionText}
                  onChange={e => setReflectionText(e.target.value)}
                  rows={6}
                  className="w-full text-xs p-3 rounded-2xl border border-white/10 outline-none focus:border-[#FF3E00] bg-white/[0.02] text-white font-sans leading-relaxed resize-none"
                  placeholder={activeQuestion.placeholder}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submittingReflection}
                className="w-full py-2.5 rounded-xl bg-[#FF3E00] hover:bg-[#e03500] active:bg-[#c22e00] disabled:bg-white/10 transition font-bold text-white text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#FF3E00]/15"
              >
                {submittingReflection ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    교사 감수 수집 중...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    성찰 제출 및 평어 격려 수렴
                  </>
                )}
              </button>
            </form>

            {/* AI Teacher Greeting response */}
            {aiGreeting && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#FF3E00]/10 border border-[#FF3E00]/20 p-4.5 rounded-2xl space-y-2 animate-fade-in"
                id="ai-quiz-reflection-response"
              >
                <div className="flex items-center gap-1.5 text-[#FF3E00] text-[11px] font-mono font-extrabold pb-1.5 border-b border-white/5">
                  <Smile className="h-4 w-4 shrink-0 text-[#FF3E00]/80" />
                  <span>AI 역사교사의 한줄 칭찬 평어</span>
                </div>
                <div className="text-xs text-slate-200 leading-relaxed font-sans font-medium markdown-body whitespace-pre-wrap">
                  {aiGreeting}
                </div>
              </motion.div>
            )}

          </div>

          {/* Reflections List History */}
          <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5 shadow-sm space-y-4">
            <h4 className="font-extrabold text-white text-xs flex items-center gap-1.5">
              <Calendar className="h-4.5 w-4.5 text-slate-500" />
              나의 학습 활동/성찰 제출 이력 ({reflections.length}건)
            </h4>

            {reflections.length === 0 ? (
              <p className="text-[10px] text-slate-500 italic text-center py-4 font-sans border border-dashed border-white/5 rounded-xl">
                아직 제출된 활동 성찰 가치가 없습니다. 위의 성찰지를 제출해 기록을 모아보세요.
              </p>
            ) : (
              <div className="space-y-2 max-h-[180px] overflow-y-auto" id="reflections-history-scroll">
                {reflections.map((ref, idx) => (
                  <div key={idx} className="bg-white/[0.02] p-2.5 rounded-xl border border-white/5 text-[10px] font-sans text-slate-300 leading-relaxed flex items-start gap-1.5">
                    <ChevronRight className="h-3 w-3 text-[#FF3E00] mt-0.5 shrink-0" />
                    <span className="line-clamp-2">{ref}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </motion.div>
  );
}
