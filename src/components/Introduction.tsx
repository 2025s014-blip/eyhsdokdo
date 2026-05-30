import { motion } from "motion/react";
import { Compass, BookOpen, MapPin, ShieldAlert, Award } from "lucide-react";

interface IntroductionProps {
  onStartLesson: (tabIndex: number) => void;
}

export function Introduction({ onStartLesson }: IntroductionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
      id="intro-page-container"
    >
      {/* Hero Welcome Banner */}
      <div 
        className="relative overflow-hidden rounded-3xl bg-neutral-950/80 border border-white/5 p-8 md:p-12 text-white shadow-2xl relative z-10"
        id="intro-hero-banner"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-[#FF3E00]/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#FF3E00]/5 blur-3xl"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FF3E00]/10 px-3 py-1 text-xs font-semibold text-[#FF3E00] border border-[#FF3E00]/20">
            <Award className="h-3.5 w-3.5" />
            중·고등용 역사 및 지리 융합 수업 보조 플랫폼
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans text-white leading-tight">
            독도 영토 주권 교육 종합 교재
          </h1>
          <p className="text-base md:text-lg text-slate-300 font-sans leading-relaxed">
            지리적 특성, 역사적 사료 및 한·일 갈등의 평화적 공동 해결 방안을 모색하고 감정적 대응을 넘어 
            명확한 '1차 사료'와 지리학적 관점을 토대로 영토 주권을 합리적으로 규명하는 평화 주권 학습 플랫폼입니다.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => onStartLesson(1)}
              className="px-6 py-3 rounded-xl bg-[#FF3E00] hover:bg-[#e03500] active:bg-[#c22e00] transition-colors duration-200 font-bold text-white shadow-lg shadow-[#FF3E00]/20 text-sm flex items-center gap-2 cursor-pointer"
              id="start-button-geography"
            >
              <Compass className="h-4 w-4" />
              1차시: 지리 및 영역 시작하기
            </button>
            <button
              onClick={() => onStartLesson(4)}
              className="px-6 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors duration-200 font-medium text-slate-200 border border-white/10 text-sm flex items-center gap-2 cursor-pointer"
              id="start-button-activity"
            >
              <BookOpen className="h-4 w-4 text-[#FF3E00]" />
              공동 교과서 집필 활동
            </button>
          </div>
        </div>
      </div>

      {/* Book Summary Card */}
      <div 
        className="bg-white/[0.02] rounded-2xl border border-white/5 p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-6 md:gap-10 items-start hover:border-white/10 hover:bg-white/[0.03] transition duration-300"
        id="book-summary-box"
      >
        <div className="bg-[#FF3E00]/10 p-4 rounded-2xl text-[#FF3E00] shrink-0">
          <BookOpen className="h-8 w-8" />
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">교과 요약 (Executive Summary)</h3>
          <p className="text-slate-300 leading-relaxed text-sm font-sans">
            본 교재 및 플랫폼은 대한민국 독도의 현대·중세적 지위와 동해 해양 영토의 역사적 문맥을 체계적으로 이해하기 위해 기획되었습니다. 
            학생들이 감정적인 호소에서 벗어나 명확한 <strong>역사적 고문서, 법적 조약문, 고지도의 시각적 대조 분석</strong>을 바탕으로 사실관계를 정립하고, 
            궁극적으로 동아시아의 평화적 공동 해결 방안과 공동 비전을 모색할 수 있는 비판적 사고력을 기르는 것을 지향합니다.
          </p>
          <div className="pt-2 text-xs text-slate-500 flex items-center gap-2 font-mono">
            <span>대한민국 역사·지리 평화교육위원회</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
            <span>2026년 5월 발간본 수록</span>
          </div>
        </div>
      </div>

      {/* Lesson Index Bento Grid */}
      <div className="space-y-4" id="lesson-index-section">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 px-1">
          <Compass className="h-4.5 w-4.5 text-[#FF3E00]" />
          종합 교육 과정 안내
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Class 1 Card */}
          <div 
            onClick={() => onStartLesson(1)}
            className="group bg-white/[0.02] p-6 rounded-2xl border border-white/5 hover:border-[#FF3E00]/30 hover:bg-white/[0.04] shadow-sm transition-all duration-300 cursor-pointer space-y-4 hover:translate-y-[-4px]"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono font-bold text-[#FF3E00] bg-[#FF3E00]/10 px-2.5 py-1 rounded-lg">1차시</span>
              <MapPin className="h-5 w-5 text-white/20 group-hover:text-[#FF3E00] transition" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-white group-hover:text-[#FF3E00] transition text-base">지리적 특성과 영역</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-3">
                독도의 정확한 경위도, 주변 섬과의 실제 교차 거리분석, 울릉도에서의 육안관측 조건 및 영토·영해·영공 체계를 학습합니다.
              </p>
            </div>
          </div>

          {/* Class 2 Card */}
          <div 
            onClick={() => onStartLesson(2)}
            className="group bg-white/[0.02] p-6 rounded-2xl border border-white/5 hover:border-[#FF3E00]/30 hover:bg-white/[0.04] shadow-sm transition-all duration-300 cursor-pointer space-y-4 hover:translate-y-[-4px]"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono font-bold text-[#FF3E00] bg-[#FF3E00]/10 px-2.5 py-1 rounded-lg">2차시</span>
              <BookOpen className="h-5 w-5 text-white/20 group-hover:text-[#FF3E00] transition" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-white group-hover:text-[#FF3E00] transition text-base">사료와 지도 규명</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-3">
                한국 및 일본 정부의 관찬 고문서와 세종실록지리지, 태정관 지령 분석 및 옛 지도가 들려주는 영유권 진실 대조 탐사입니다.
              </p>
            </div>
          </div>

          {/* Class 3 Card */}
          <div 
            onClick={() => onStartLesson(3)}
            className="group bg-white/[0.02] p-6 rounded-2xl border border-white/5 hover:border-[#FF3E00]/30 hover:bg-white/[0.04] shadow-sm transition-all duration-300 cursor-pointer space-y-4 hover:translate-y-[-4px]"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono font-bold text-[#FF3E00] bg-[#FF3E00]/10 px-2.5 py-1 rounded-lg">3차시</span>
              <ShieldAlert className="h-5 w-5 text-white/20 group-hover:text-[#FF3E00] transition" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-white group-hover:text-[#FF3E00] transition text-base">현대 갈등과 평화 상생</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-3">
                샌프란시스코 조약, 영유권 수호 노력(평화선 선포, 의용수비대 활동) 및 신한일어업협정 이후의 현안과 평화 로드맵을 논의합니다.
              </p>
            </div>
          </div>

          {/* Workshop Activity Card */}
          <div 
            onClick={() => onStartLesson(4)}
            className="group bg-white/[0.03] p-6 rounded-2xl border border-white/10 hover:border-[#FF3E00]/30 hover:bg-white/[0.05] shadow-sm transition-all duration-300 cursor-pointer space-y-4 hover:translate-y-[-4px]"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono font-bold text-[#FF3E00] bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-lg">수업 활동</span>
              <Award className="h-5 w-5 text-[#FF3E00]/60 group-hover:text-[#FF3E00] transition" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-white text-base">한·일 평화 공동 교과서</h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3">
                한국과 일본 학생들이 힘을 합쳐 사실 및 객관적 자료를 근간으로 평화적인 역사 교과서를 가상 서술하고 AI의 개별 피드백을 수령해봅니다.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Additional Visual Widget: Facts of Dokdo */}
      <div 
        className="bg-white/[0.01] rounded-2xl border border-white/5 p-6"
        id="additional-info-widget"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h4 className="font-bold text-white text-sm">독도의 지위: 엄연한 우리의 유인도(有人島)</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xl font-sans leading-relaxed">
              독도는 상주 주민과 상시 상주하는 독도경비대 어민 및 등대관리관이 상주하고 있으며 전력 공급과 자체 정수 시스템인 물골 등으로 완전히 유지되는 확고한 명예 영토입니다.
            </p>
          </div>
          <div className="flex gap-4 shrink-0 w-full md:w-auto mt-2 md:mt-0 font-mono">
            <div className="bg-white/[0.02] p-3.5 rounded-xl border border-white/5 grow md:grow-0 text-center">
              <span className="block text-xl font-bold text-white font-mono">2026</span>
              <span className="text-[10px] text-slate-500 font-sans">마스터 교안 최신화</span>
            </div>
            <div className="bg-white/[0.02] p-3.5 rounded-xl border border-white/5 grow md:grow-0 text-center">
              <span className="block text-xl font-bold text-[#FF3E00] font-mono">100%</span>
              <span className="text-[10px] text-slate-500 font-sans">실존 사료 대조</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
