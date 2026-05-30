import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, RefreshCw, Sparkles, Smile, Compass, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function AIBot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>("");
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    {
      sender: "bot",
      text: "안녕하세요! 독도 영토 주권 평화교육관의 AI 역사 지리 도우미입니다. 독도의 지리적 사실, 한일 고문서, 고지도의 역사적 의의 및 평화적 상생 방안에 대해 무엇이든 친절하게 알려드릴게요! 😊"
    }
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const testQuestions = [
    { label: "태정관 지령이 왜 결정적 사료인가요?", query: "태정관 지령(1877)이 왜 독도 영유권 논쟁에서 가장 결정적이고 명확한 최고의 공문서이자 증거가 되는지 궁금합니다." },
    { label: "오키섬과의 거리가 왜 중요한가요?", query: "일본 오키섬과 독도의 거리(157.5km) 및 육안 관측 불가능성이 왜 지리학적, 영토법적으로 중요한 의의를 가지나요?" },
    { label: "안용복 사건의 외교적 결말은 뭔가요?", query: "조선의 어민 안용복이 일본 막부로 건너가 도해 금지령(1696)을 이끌어내기까지의 과정과 외교적 결말을 설명해주세요." }
  ];

  const handleSendMessage = async (rawMessage: string) => {
    if (!rawMessage.trim() || loading) return;

    const userMsg = rawMessage;
    // Add user message to state
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "서버 응답 오류");

      // Add bot response
      setMessages(prev => [...prev, { sender: "bot", text: data.response }]);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [...prev, { sender: "bot", text: "답변을 가져오는 도중 문제가 발생했습니다. API가 원활하게 셋업되었는지 확인해주세요." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans" id="ai-bot-floating-widget">
      
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="bg-[#FF3E00] text-white p-4 sm:p-4.5 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:bg-[#e03500] hover:scale-105 active:scale-95 transition-all text-xs font-bold gap-2 border border-white/10"
            id="open-bot-button"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="max-w-px overflow-hidden hover:max-w-xs transition-all whitespace-nowrap hidden sm:inline text-white font-extrabold font-sans">AI 역사교사 질의응답</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Interactive Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 50, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 50, scale: 0.9, opacity: 0 }}
            className="bg-[#0e0e11] rounded-3xl w-[320px] sm:w-[380px] h-[520px] shadow-2xl border border-white/15 flex flex-col overflow-hidden"
            id="chat-window-box"
          >
            {/* Header */}
            <div className="bg-[#131316] p-4.5 text-white flex justify-between items-center shrink-0 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-[#FF3E00]" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm">AI 독도 역사 조력자</h4>
                  <span className="text-[9px] text-[#FF3E00] font-mono block">GEMINI LIVE STUDY</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition p-1 rounded-full cursor-pointer hover:bg-white/5"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#0a0a0c] space-y-3 flex flex-col">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                  }`}
                >
                  <span className="text-[9px] font-mono text-slate-500 mb-0.5 mt-1.5">
                    {msg.sender === "user" ? "나의 질문" : "AI 역사교사"}
                  </span>
                  <div
                    className={`p-3 rounded-2xl text-[11px] leading-relaxed font-sans ${
                      msg.sender === "user"
                        ? "bg-[#FF3E00] text-white rounded-tr-none shadow-md shadow-[#FF3E00]/15"
                        : "bg-[#18181c] text-slate-200 border border-white/5 rounded-tl-none whitespace-pre-wrap"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Bot typing status */}
              {loading && (
                <div className="self-start max-w-[85%] flex flex-col items-start animate-pulse">
                  <span className="text-[9px] font-mono text-[#FF3E00] mb-0.5">사료 교차 분석 중...</span>
                  <div className="bg-[#18181c] p-3 rounded-2xl border border-white/5 rounded-tl-none">
                    <div className="flex gap-1 py-1">
                      <span className="w-1.5 h-1.5 bg-[#FF3E00] rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-[#FF3E00] rounded-full animate-bounce delay-100"></span>
                      <span className="w-1.5 h-1.5 bg-[#FF3E00] rounded-full animate-bounce delay-200"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Suggested Tags selection inside the Chat Panel if empty typing */}
            <div className="bg-[#131316] px-3 py-2 border-t border-white/5 shrink-0 select-none overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
              {testQuestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(item.query)}
                  className="text-[9px] font-sans font-bold bg-white/[0.02] text-slate-300 border border-white/10 px-2.5 py-1.5 rounded-lg shrink-0 transition hover:bg-[#FF3E00]/10 hover:text-[#FF3E00] hover:border-[#FF3E00]/25 cursor-pointer focus:outline-none"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Input area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(chatInput);
              }}
              className="p-3 border-t border-white/5 bg-[#0e0e11] flex gap-2 shrink-0 items-center"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="역사 고문서 및 지리 상식을 물어보세요..."
                className="flex-1 text-xs px-3 py-2.5 rounded-xl border border-white/10 outline-none focus:border-[#FF3E00] bg-white/[0.02] text-white"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || loading}
                className="bg-[#FF3E00] hover:bg-[#e03500] active:bg-[#c22e00] disabled:bg-white/10 transition p-2.5 rounded-xl text-white flex items-center justify-center cursor-pointer font-bold focus:outline-none"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
export default AIBot;
