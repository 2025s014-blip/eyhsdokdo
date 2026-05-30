import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Calendar, HelpCircle, FileText, Globe, CheckCircle, X } from "lucide-react";
import { DOKDO_SOURCES, HISTORY_TIMELINE } from "../data";
import { DokdoSource } from "../types";

export function ClassTwo() {
  const [activeTab, setActiveTab] = useState<"ALL" | "KOREA" | "JAPAN">("ALL");
  const [selectedSource, setSelectedSource] = useState<DokdoSource | null>(null);

  // Filter sources based on Tab
  const filteredSources = DOKDO_SOURCES.filter(src => {
    if (activeTab === "ALL") return true;
    return src.country === activeTab;
  });

  // Filter timeline
  const anyongbokEvents = HISTORY_TIMELINE.filter(ev => ev.category === "ANYONGBOK");

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
      id="class2-panel"
    >
      {/* Title Header */}
      <div className="border-b border-white/5 pb-5">
        <span className="text-xs font-mono font-bold text-[#FF3E00] bg-[#FF3E00]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">2차시 과업</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
          사료와 지도로 규명하는 역사적 권원
        </h2>
        <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-3xl leading-relaxed font-sans">
          역사학적 사실의 힘은 명확한 1차 사료(Primary Sources)의 교차 대조 분석에서 나옵니다.
          한·일 양국의 관찬 공문서와 옛 지도를 면밀히 탐사하여 독도 영유권의 문헌적 진실을 추적합니다.
        </p>
      </div>

      {/* Filter and Content Category */}
      <div className="space-y-4" id="historical-sources-viewer">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex gap-1.5 bg-white/[0.04] p-1 rounded-xl border border-white/5">
            {(["ALL", "KOREA", "JAPAN"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold transition focus:outline-none cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#FF3E00] text-white shadow-md shadow-[#FF3E00]/20"
                    : "text-slate-400 hover:text-white"
                }`}
                id={`src-tab-${tab}`}
              >
                {tab === "ALL" ? "전체 자료" : tab === "KOREA" ? "대한민국 공표 사료" : "일본 고백 사료"}
              </button>
            ))}
          </div>
          <span className="text-[11px] text-slate-500 font-mono">총 {filteredSources.length}개의 역사적 증거 수록</span>
        </div>

        {/* Sources Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="sources-cards-grid">
          {filteredSources.map((source) => (
            <div
              key={source.id}
              onClick={() => setSelectedSource(source)}
              className="group bg-white/[0.02] p-5 rounded-2xl border border-white/5 transition duration-300 cursor-pointer flex flex-col justify-between hover:border-[#FF3E00]/30 hover:bg-white/[0.04] hover:translate-y-[-4px]"
              id={`source-card-${source.id}`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    source.country === "KOREA" ? "bg-white/10 text-white" : "bg-[#FF3E00]/10 text-[#FF3E00]"
                  }`}>
                    {source.country === "KOREA" ? "대한민국" : "일본 관찬"}
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-bold flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {source.year}년
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-white group-hover:text-[#FF3E00] transition flex items-center gap-1.5 text-sm">
                    {source.category === "DOCUMENT" ? (
                      <FileText className="h-4 w-4 text-slate-500 shrink-0" />
                    ) : (
                      <Globe className="h-4 w-4 text-slate-500 shrink-0" />
                    )}
                    {source.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-sans">
                    {source.sourceText}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between text-[11px] text-[#FF3E00] font-bold group-hover:underline">
                <span>자세히 분석하기</span>
                <CheckCircle className="h-3 w-3 opacity-0 group-hover:opacity-100 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Anyongbok Timeline Section */}
      <div 
        className="bg-white/[0.01] p-6 md:p-8 rounded-3xl border border-white/5 space-y-6"
        id="anyongbok-timeline-section"
      >
        <div className="space-y-1 border-b border-white/5 pb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#FF3E00]" />
            안용복 사건과 한·일 외교 교섭 타임라인 (17세기 말)
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            평범한 조선의 어부 안용복의 주도적인 외교 투쟁은 당시 에도 막부 정부의 공식 결정을 이끌어내어 영유 주권을 평화적으로 굳건히 한 결정적 계기가 되었습니다.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l-2 border-white/5 pl-4 sm:pl-6 ml-2 sm:ml-4 space-y-8 py-2">
          {anyongbokEvents.map((ev, index) => (
            <div key={ev.id} className="relative" id={`timeline-event-${ev.id}`}>
              {/* Event Marker */}
              <span className="absolute -left-[27px] sm:-left-[35px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#0C0C0E] border-2 border-[#FF3E00] shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF3E00]"></span>
              </span>

              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="text-[10px] font-mono font-bold text-[#FF3E00] bg-[#FF3E00]/10 border border-[#FF3E00]/20 px-2.5 py-0.5 rounded-full w-fit">
                    {ev.date}
                  </span>
                  <h4 className="font-extrabold text-white text-sm sm:text-base">{ev.title}</h4>
                </div>
                <p className="text-xs text-slate-300 font-sans max-w-4xl leading-relaxed">
                  {ev.description}
                </p>

                {ev.points && ev.points.length > 0 && (
                  <ul className="space-y-1 pt-1 pl-3 border-l border-white/10">
                    {ev.points.map((pt, pIdx) => (
                      <li key={pIdx} className="text-[11px] text-slate-400 font-sans list-disc pl-1 leading-relaxed">
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Source Modal Component using AnimatePresence */}
      <AnimatePresence>
        {selectedSource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" id="source-detail-modal">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#131316] text-[#F0F0F0] rounded-3xl max-w-2xl w-full border border-white/10 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-6 bg-[#0c0c0e] text-white flex justify-between items-center border-b border-white/5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[10px] font-mono font-bold border px-2 py-0.5 rounded-md ${
                      selectedSource.country === "KOREA" ? "border-white/20 text-white" : "border-[#FF3E00]/20 text-[#FF3E00]"
                    }`}>
                      {selectedSource.country === "KOREA" ? "대한민국 사료" : "일본 입증 사료"}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{selectedSource.year}년 편찬</span>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">{selectedSource.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedSource(null)}
                  className="bg-white/5 text-slate-450 hover:text-white p-2 rounded-full cursor-pointer hover:bg-white/15 transition animate-fade-in"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Body Scroll */}
              <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[70vh]">
                
                {/* Original Text Quote */}
                {selectedSource.originalText && (
                  <div className="bg-white/[0.02] border-l-4 border-[#FF3E00] p-4 rounded-r-xl">
                    <h5 className="text-[10px] font-sans font-bold text-[#FF3E00] uppercase tracking-wider mb-1">한문/원문 혹은 핵심 구장</h5>
                    <p className="text-xs text-slate-100 font-medium leading-relaxed italic font-sans">
                      "{selectedSource.originalText}"
                    </p>
                  </div>
                )}

                {/* Analytical details */}
                <div className="space-y-2">
                  <h5 className="text-xs font-sans font-bold text-white flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#FF3E00]" />
                    사료 서술 및 역사 해설
                  </h5>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {selectedSource.sourceText}
                  </p>
                </div>

                {/* Modern Significance */}
                <div className="bg-[#FF3E00]/5 p-5 rounded-2xl border border-[#FF3E00]/15 space-y-2">
                  <h5 className="text-xs font-bold text-[#FF3E00] flex items-center gap-1.5">
                    <HelpCircle className="h-4 w-4 text-[#FF3E00]/80" />
                    문헌적/국제법적 핵심 가치
                  </h5>
                  <p className="text-xs text-slate-200 font-sans leading-relaxed font-semibold">
                    {selectedSource.significance}
                  </p>
                </div>

              </div>

              {/* Footer */}
              <div className="p-5 border-t border-white/5 bg-[#0c0c0e] flex justify-end">
                <button
                  onClick={() => setSelectedSource(null)}
                  className="px-5 py-2.5 rounded-lg bg-[#FF3E00] text-white hover:bg-[#e03500] active:bg-[#c22e00] font-bold text-xs cursor-pointer transition shadow-lg shadow-[#FF3E00]/15"
                >
                  확인함
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
