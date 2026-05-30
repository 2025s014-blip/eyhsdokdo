import { useState } from "react";
import { motion } from "motion/react";
import { Calendar, AlertTriangle, ShieldCheck, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { HISTORY_TIMELINE } from "../data";

export function ClassThree() {
  const modernEvents = HISTORY_TIMELINE.filter(ev => ev.category === "MODERN");
  const [expandedEventId, setExpandedEventId] = useState<string | null>("mod-1");

  const toggleExpand = (id: string) => {
    if (expandedEventId === id) {
      setExpandedEventId(null);
    } else {
      setExpandedEventId(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 animate-fade-in"
      id="class3-panel"
    >
      {/* Title Header */}
      <div className="border-b border-white/5 pb-5">
        <span className="text-xs font-mono font-bold text-[#FF3E00] bg-[#FF3E00]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">3차시 과업</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
          현대 독도 갈등의 전개와 평화적 상생 방안
        </h2>
        <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-3xl leading-relaxed font-sans">
          현대 독도 갈등의 역사는 전후 영토 처리 조약의 단순 틈새 공백과 배타적 경제수역(EEZ) 체제 도입이라는 복합적인 연안국 경계 요인이 얽혀 있습니다. 
          각 사건을 탐지하여 미래 평화 해법을 유추하십시오.
        </p>
      </div>

      {/* Visual Collapsible Timeline Accordion */}
      <div className="space-y-4" id="modern-accordion-timeline">
        {modernEvents.map((event, idx) => {
          const isExpanded = expandedEventId === event.id;
          return (
            <div
              key={event.id}
              className={`bg-white/[0.02] rounded-2xl border transition overflow-hidden duration-300 ${
                isExpanded ? "border-[#FF3E00]/40 bg-white/[0.04] shadow-lg shadow-[#FF3E00]/5" : "border-white/5 hover:border-white/10"
              }`}
              id={`accordion-${event.id}`}
            >
              {/* Accordion Trigger Header */}
              <button
                onClick={() => toggleExpand(event.id)}
                className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 grow">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#FF3E00] bg-[#FF3E00]/10 border border-[#FF3E00]/20 px-3 py-1 rounded-lg">
                      {event.date}
                    </span>
                    <span className="text-white/20 font-mono text-xs hidden sm:inline">|</span>
                  </div>
                  <h3 className="font-extrabold text-white text-sm md:text-base leading-tight">
                    {event.title}
                  </h3>
                </div>
                <div className="text-slate-400 shrink-0">
                  {isExpanded ? <ChevronUp className="h-4.5 w-4.5 text-[#FF3E00]" /> : <ChevronDown className="h-4.5 w-4.5 text-slate-500" />}
                </div>
              </button>

              {/* Accordion Content Panel */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="px-5 pb-5 md:px-6 md:pb-6 border-t border-white/5 bg-white/[0.01]"
                >
                  <div className="pt-4 space-y-4">
                    <p className="text-xs text-slate-350 font-sans leading-relaxed">
                      {event.description}
                    </p>

                    {/* Timeline sub-points */}
                    {event.points && event.points.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-white/5">
                        <h4 className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wider">주요 검수 및 역사적 중요 사실</h4>
                        <div className="space-y-2">
                          {event.points.map((pt, pIdx) => (
                            <div key={pIdx} className="flex gap-2 items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3E00]/80 mt-1.5 shrink-0"></span>
                              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                                {pt}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Peace & Reconciliation Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="peace-insight-section">
        
        {/* Card 1: Conflict analysis */}
        <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="bg-[#FF3E00]/10 text-[#FF3E00] p-3 rounded-2xl w-fit">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h4 className="text-base font-extrabold text-white">독도 왜곡의 본질 탐사</h4>
            <p className="text-xs text-slate-355 leading-relaxed font-sans">
              일본 외무성은 샌프란시스코 조약문 제2조 (a)항의 단순 명문상 기재 공백(제주, 울릉, 거문 외의 '독도' 누락)과 
              1905년 시마네현 무단 고시를 주된 구실로 영유권을 일방 주장하고 있습니다. 
              그러나 이는 근대적 행정 자치를 영구 선포한 대한제국 칙령 제41호(1900년)의 선점적 영토 질서를 위반한 주권 훼손 행태입니다.
            </p>
          </div>
          <div className="text-[10px] text-[#FF3E00] font-bold bg-[#FF3E00]/5 p-2.5 rounded-xl border border-[#FF3E00]/10">
            문서상의 작은 공백을 왜곡의 불씨로 삼으려는 지정학적 의도를 사료로 격파해야 합니다.
          </div>
        </div>

        {/* Card 2: Joint future resolution */}
        <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="bg-[#FF3E00]/10 text-[#FF3E00] p-3 rounded-2xl w-fit">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="text-base font-extrabold text-white">동아시아 평화를 위한 공동 협력제안</h4>
            <p className="text-xs text-slate-355 leading-relaxed font-sans">
              불합리한 왜곡과 배타주의 교육은 양국 미래 세대의 역사 갈등 장기화를 가져올 뿐입니다. 
              해결책은 동해 해양에 대한 공동 평화 자원 교류, 학술·역사 공동 조사 위상의 승격, 
              그리고 무엇보다 양국의 청소년들과 연구진들이 인위적 영토 논란을 청산하고 교과서 공동 집필 위원회를 갖추는 것입니다.
            </p>
          </div>
          <div className="text-[10px] text-[#FF3E00] font-bold bg-[#FF3E00]/5 p-2.5 rounded-xl border border-[#FF3E00]/10">
            갈등의 바다인 동해를 평화와 공동 번영의 거점으로 재구축하기 위한 소통 역량이 긴요합니다.
          </div>
        </div>

      </div>

      {/* Practical discussion prompt summary */}
      <div 
        className="bg-white/[0.01] p-6 rounded-2xl border border-white/5 text-center space-y-2"
        id="class3-summary-info"
      >
        <span className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider block">평화 교육 성찰 방향</span>
        <p className="text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans">
          "역사를 잊은 민족에게 미래는 없다"는 말처럼, 지리적 명명백백한 근거와 명정 사료들로 스스로 무장할 때 
          독도 영유권을 세계 앞에 당당하게 입증하고 평화 협력의 주도권을 잡게 될 것입니다.
        </p>
      </div>
    </motion.div>
  );
}
