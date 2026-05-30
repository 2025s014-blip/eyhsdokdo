import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, BookOpen, MapPin, Award, CheckSquare, MessageSquare, Anchor } from "lucide-react";

// Import custom sub-modules
import { Introduction } from "./components/Introduction";
import { ClassOne } from "./components/ClassOne";
import { ClassTwo } from "./components/ClassTwo";
import { ClassThree } from "./components/ClassThree";
import { ActivityWorksheet } from "./components/ActivityWorksheet";
import { QuizAndReflection } from "./components/QuizAndReflection";
import { AIBot } from "./components/AIBot";

export default function App() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [reflections, setReflections] = useState<string[]>([]);

  // 성찰 누적 등록 콜백
  const handleAddReflection = (newRefContent: string) => {
    setReflections(prev => [newRefContent, ...prev]);
  };

  // 탭 목록 매핑
  const tabMetadata = [
    { label: "교재 개요", icon: BookOpen },
    { label: "1차시: 지리적 특성", icon: Compass },
    { label: "2차시: 고사료 분석", icon: MapPin },
    { label: "3차시: 현대 상생", icon: Anchor },
    { label: "수업 활동지", icon: Award },
    { label: "개인 소감/퀴즈", icon: CheckSquare }
  ];

  return (
    <div className="min-h-screen bg-[#0C0C0E] text-[#F0F0F0] flex flex-col font-sans selection:bg-[#FF3E00] selection:text-white relative overflow-x-hidden" id="dokdo-platform-root">
      
      {/* Cinematic Ambient Glow Spots */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-[#FF3E00]/10 to-transparent rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[40%] -left-60 w-[500px] h-[500px] bg-gradient-to-br from-[#FF3E00]/5 to-transparent rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Top Professional Header Navigation */}
      <header className="sticky top-0 z-30 bg-[#0C0C0E]/80 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-4 shrink-0 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <div 
          onClick={() => setActiveTab(0)}
          className="flex items-center gap-3 cursor-pointer select-none group relative z-10"
          id="branding-logo-box"
        >
          <div className="bg-[#FF3E00] text-white p-2.5 rounded-2xl shadow-lg shadow-[#FF3E00]/25 group-hover:rotate-6 transition">
            <Anchor className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white tracking-tight font-sans">
              독도 영토 주권 교육 종합관
            </h1>
            <span className="text-[10px] text-[#FF3E00] font-mono tracking-widest block uppercase">STUDIO_KINETIC • PEACE LAB</span>
          </div>
        </div>

        {/* Dynamic Class Selector (Desktop layout) */}
        <nav className="flex flex-wrap gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/5 relative z-10" id="main-navigation-bar">
          {tabMetadata.map((tab, index) => {
            const Icon = tab.icon;
            const isTabActive = activeTab === index;
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10.5px] font-bold tracking-tight transition focus:outline-none cursor-pointer select-none ${
                  isTabActive
                    ? "bg-[#FF3E00] text-white shadow-lg shadow-[#FF3E00]/25"
                    : "text-[#F0F0F0]/60 hover:text-white hover:bg-white/[0.02]"
                }`}
                id={`nav-tab-button-${index}`}
              >
                <Icon className="h-3.5 w-3.5 text-[#FF3E00]" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Global actions */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono relative z-10">
          <div className="text-right">
            <span className="text-[#F0F0F0]/40 block text-[9px] tracking-wider uppercase">Volume 01 / Issue 04</span>
            <span className="font-bold text-[#F0F0F0]/85">독도 하이파이 교육</span>
          </div>
        </div>

      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 shrink-0 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full"
            id="panel-wrapper"
          >
            {activeTab === 0 && <Introduction onStartLesson={(index) => setActiveTab(index)} />}
            {activeTab === 1 && <ClassOne />}
            {activeTab === 2 && <ClassTwo />}
            {activeTab === 3 && <ClassThree />}
            {activeTab === 4 && <ActivityWorksheet onAddReflection={handleAddReflection} />}
            {activeTab === 5 && <QuizAndReflection reflections={reflections} onAddReflection={handleAddReflection} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Interactive AI Chat Assistant pop up */}
      <AIBot />

      {/* Modern Footer section */}
      <footer className="bg-black/60 text-[#F0F0F0]/40 border-t border-white/5 py-12 text-center text-[11px] space-y-3 mt-12 shrink-0 relative z-10">
        <div className="max-w-2xl mx-auto px-4 font-sans leading-relaxed tracking-wide">
          본 플랫폼은 중·고등학생 및 역사 영토 연구 학급을 위해 제공되는 독도 주권 융합 수업의 디지털 실천 전시관입니다. 
          감성적 대응을 넘어 숭고한 1차적 사료들의 집합적 사실들을 공유하고 한일 양국의 지속 가능한 교류와 평화 공존을 소망합니다.
        </div>
        <div className="text-[#FF3E00] font-mono text-[9px] tracking-[0.3em] uppercase pt-2">
          © 2026. STUDIO_KINETIC. 대한민국 역사·지리 평화교육위원회. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}

