import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, ArrowRight, Eye, Shield, HelpCircle, Navigation } from "lucide-react";
import { DOKDO_GEOGRAPHY } from "../data";

export function ClassOne() {
  const [selectedZone, setSelectedZone] = useState<string>("territory");

  // 영역 법적 지위 데이터 정의
  const zones = [
    {
      id: "territory",
      title: "영토 (Territory)",
      badgeName: "영주권",
      summary: "주권이 미치는 지표의 범위",
      status: "경상북도 울릉군 울릉읍 독도리 1~96번지에 해당하는 엄연한 대한민국의 고유 행정 도서 영토입니다.",
      color: "bg-[#FF3E00]/5 border-[#FF3E00]/20 text-[#F0F0F0] focus:ring-[#FF3E00]/50"
    },
    {
      id: "sea",
      title: "영해 (Territorial Sea)",
      badgeName: "기선 12해리",
      summary: "영토에 인접한 영속 해역",
      status: "기선으로부터 12해리(1해리 = 1,852m)까지 지정됩니다. 대한민국 해해 경찰은 완벽한 영해 주권을 선언하고 불법 침입 어선을 철저히 단속하고 있습니다.",
      color: "bg-[#FF3E00]/5 border-[#FF3E00]/20 text-[#F0F0F0] focus:ring-[#FF3E00]/50"
    },
    {
      id: "air",
      title: "영공 (Airspace)",
      badgeName: "KADIZ 포함",
      summary: "영토와 영해의 수직 상공",
      status: "대기권 범위의 상공을 의미하며, 독도 상공 전체는 대한민국 공군의 한국방공식별구역(KADIZ)에 완벽하게 포함되어 상시 방공 수호가 이루어지고 있습니다.",
      color: "bg-[#FF3E00]/5 border-[#FF3E00]/20 text-[#F0F0F0] focus:ring-[#FF3E00]/50"
    },
    {
      id: "eez",
      title: "배타적 경제수역 (EEZ)",
      badgeName: "최대 200해리",
      summary: "천연자원의 탐사·개발 권한 보전 영역",
      status: "영해 기선으로부터 최대 200해리까지의 수역 중 영해를 제외한 수역입니다. 연안국에 어업권 및 천연자원의 탐사·개발·보존 및 환경 관리 권한이 보장되는 고유 경제 권리 해역입니다.",
      color: "bg-[#FF3E00]/5 border-[#FF3E00]/20 text-[#F0F0F0] focus:ring-[#FF3E00]/50"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 animate-fade-in"
      id="class1-panel"
    >
      {/* Title Header */}
      <div className="border-b border-white/5 pb-5" id="class1-header">
        <span className="text-xs font-mono font-bold text-[#FF3E00] bg-[#FF3E00]/10 px-2.5 py-1 rounded-full uppercase tracking-widest">1차시 과업</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
          독도의 지리적 특성과 영역의 이해
        </h2>
        <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-3xl leading-relaxed">
          독도가 대한민국의 영토임을 영구 이해하는 첫걸음은 명확한 지리적·물리적 실존적 사실들과 국제법적 국가 영역 개념을 정립하는 것에서 시작합니다.
        </p>
      </div>

      {/* Grid: Coordinates & Dimensions & Roads */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="geography-bento-grid">
        
        {/* Box 1: Coordinates */}
        <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2 text-[#FF3E00]">
            <MapPin className="h-5 w-5" />
            <h4 className="font-bold text-white text-sm">독도의 위도와 경도</h4>
          </div>
          <div>
            <div className="text-xl font-bold text-white font-mono tracking-wide">{DOKDO_GEOGRAPHY.coords.lat}</div>
            <div className="text-xl font-bold text-white font-mono tracking-wide mt-1">{DOKDO_GEOGRAPHY.coords.lng}</div>
          </div>
          <span className="text-xs text-slate-400 font-sans block bg-white/[0.01] p-2 rounded-lg border border-white/5">
            ※ {DOKDO_GEOGRAPHY.coords.base}
          </span>
        </div>

        {/* Box 2: Composition */}
        <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2 text-[#FF3E00]">
            <Shield className="h-5 w-5" />
            <h4 className="font-bold text-white text-sm">독도의 구성과 면적</h4>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-extrabold text-white font-mono tracking-tight">{DOKDO_GEOGRAPHY.area.total}</div>
            <div className="text-xs text-slate-400 flex flex-wrap gap-x-2 font-sans">
              <span>동도 {DOKDO_GEOGRAPHY.area.dongdo}</span>
              <span className="text-white/20">|</span>
              <span>서도 {DOKDO_GEOGRAPHY.area.seodo}</span>
            </div>
            <div className="text-[11px] text-[#FF3E00] font-semibold">{DOKDO_GEOGRAPHY.area.subIslands}</div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans mt-1 bg-[#FF3E00]/5 p-2 rounded-lg border border-[#FF3E00]/10">
            총크기는 {DOKDO_GEOGRAPHY.area.compare}에 달합니다.
          </p>
        </div>

        {/* Box 3: Road Names */}
        <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2 text-[#FF3E00]">
            <Navigation className="h-5 w-5" />
            <h4 className="font-bold text-white text-sm">고유 도로명 주소 체계</h4>
          </div>
          <div className="space-y-2">
            {DOKDO_GEOGRAPHY.roadNames.map((road, idx) => (
              <div key={idx} className="border-l-2 border-[#FF3E00]/30 pl-2.5">
                <div className="text-xs font-bold text-[#F0F0F0]">{road.name}</div>
                <div className="text-[10px] text-slate-400 font-sans mt-0.5 leading-snug">{road.meaning}</div>
              </div>
            ))}
          </div>
          <span className="text-[10px] text-[#FF3E00] bg-[#FF3E00]/10 font-bold p-1.5 rounded-md text-center block border border-[#FF3E00]/20">
            상주민이 직접 거주하는 유인도
          </span>
        </div>

      </div>

      {/* Interactive Range Viewer: Distance Analyzer */}
      <div 
        className="bg-white/[0.02] p-6 md:p-8 rounded-3xl border border-white/5 shadow-sm space-y-6"
        id="distance-range-analyzer"
      >
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-[#FF3E00]" />
            인접 영토 및 국가 경계 거리 정밀 분석
          </h3>
          <p className="text-slate-400 text-xs mt-1">
            독도는 홀로 떠 있는 해가 아닌, 울릉도와 자연적·유기적으로 일체화된 대한민국 최동단의 한계를 증명합니다.
          </p>
        </div>

        {/* Visual progress bar diagram */}
        <div className="space-y-5 pt-2">
          {DOKDO_GEOGRAPHY.distances.map((item, index) => {
            // Calculate a proportional percentage for display (max 220km)
            const percentage = Math.min(100, (item.distance / 220) * 100);
            return (
              <div key={index} className="space-y-1.5" id={`distance-item-${index}`}>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2 font-semibold text-slate-300">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.isClosest ? 'bg-[#FF3E00] animate-pulse' : 'bg-white/20'}`}></span>
                    {item.label}
                  </div>
                  <div className="font-mono font-bold text-white">
                    {item.distance} <span className="text-[10px] text-slate-500">km</span>
                  </div>
                </div>
                
                <div className="relative h-2.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${percentage}%` }}
                    className={`h-full rounded-full transition-all duration-700 ${item.isClosest ? 'bg-[#FF3E00]' : 'bg-white/20'}`}
                  ></div>
                </div>
                <div className="text-[10px] text-slate-500 font-sans flex justify-between">
                  <span>{item.detail}</span>
                  {item.isClosest && <span className="text-[#FF3E00] font-semibold">[가장 가까움]</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historical visibility significance */}
      <div 
        className="bg-white/[0.01] rounded-2xl border border-white/5 p-6 md:p-8 flex flex-col lg:flex-row gap-6 md:gap-8 items-start"
        id="visibility-learning-block"
      >
        <div className="bg-[#FF3E00]/10 p-4 rounded-xl text-[#FF3E00] shrink-0">
          <Eye className="h-8 w-8" />
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">지리적 육안 관측성의 역사학적 의의</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              지리학 및 국제 영토법에서 <strong>'육안 관측 가능성'</strong>은 단순한 시각적 사실을 너머, 배타적 영토 자각과 생활공간 인지의 시작을 규정하는 대단한 핵심 법리입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="bg-white/[0.02] p-4.5 rounded-xl border border-white/5 space-y-2">
              <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FF3E00]/10 text-[#FF3E00]">울릉도 관측의 사실 관계</span>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                울릉도의 사동, 석포마을 등 정상 고지대에서는 맑은 날 <strong>독도가 육안으로 선명히 관측</strong>됩니다. 
                이는 고대부터 울릉도 거주민들이 동해 끝에 존재하는 부속섬의 실존을 인지하고 생활권에 합류시켰음을 고증합니다.
              </p>
            </div>
            <div className="bg-white/[0.02] p-4.5 rounded-xl border border-white/5 space-y-2">
              <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/5 text-slate-300">일본 오키섬에서의 한계</span>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                일본에서 가장 독도와 가까운 오키섬은 거리가 157.5km로, <strong>지구 곡률의 한계상 어떠한 맑은 날씨에도 독도를 육안으로 절대 관측할 수 없습니다.</strong> 
                이는 당시 일본 에도 상인들의 영유 인식 자연적 생활권 범위 밖이었음을 확증합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Nation Territory Components: Interactive Tab */}
      <div 
        className="bg-white/[0.02] p-6 rounded-3xl border border-white/5 shadow-sm space-y-5"
        id="territory-three-components"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="h-4.5 w-4.5 text-[#FF3E00]/60" />
              국가 영역의 개념 배가와 독도의 국가 지위
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">
              국가를 구성하는 영토, 영해, 영공 내에서 행사되고 있는 대한민국의 독도 주권 위상을 탭을 클릭해 탐지하세요.
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 border-b border-white/5 pb-3">
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(zone.id)}
              className={`text-xs px-4 py-2 rounded-xl font-bold transition focus:outline-none cursor-pointer ${
                selectedZone === zone.id
                  ? "bg-[#FF3E00] text-white shadow-lg shadow-[#FF3E00]/25"
                  : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
              }`}
              id={`tab-zone-${zone.id}`}
            >
              {zone.title}
            </button>
          ))}
        </div>

        {/* Active Tab Panel with Motion */}
        <div className="min-h-[140px] pt-1">
          {zones.map((zone) => {
            if (zone.id !== selectedZone) return null;
            return (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-5 rounded-2xl border ${zone.color} space-y-2.5`}
                id={`panel-zone-${zone.id}`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-extrabold">{zone.title}</h4>
                  <span className="text-[10px] font-mono font-bold bg-white/10 text-white px-2.5 py-0.5 rounded-full border border-white/5">
                    {zone.badgeName}
                  </span>
                </div>
                <div className="text-[11px] font-medium opacity-80 uppercase tracking-wider">{zone.summary}</div>
                <p className="text-xs font-sans leading-relaxed pt-1 font-medium">{zone.status}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
