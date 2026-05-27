import React, { useState } from "react";
import { Coins, Building, Info, Clock, Calendar, CheckSquare, ShieldCheck, Bus, MapPin, Calculator } from "lucide-react";
import { DORM_ROOMS, SHUTTLE_ROUTES, DormRoom, ShuttleRoute } from "../data";

export default function CampusLife() {
  const [activeDormIdx, setActiveDormIdx] = useState(0);
  const [activeRouteIdx, setActiveRouteIdx] = useState(0);
  const [selectedStation, setSelectedStation] = useState<string>("청주대 정문");
  const [simulatedMinutes, setSimulatedMinutes] = useState<number | null>(null);

  const selectedDorm: DormRoom = DORM_ROOMS[activeDormIdx];
  const selectedRoute: ShuttleRoute = SHUTTLE_ROUTES[activeRouteIdx];

  // Simple simulator to check next bus times
  const handleCalculateArrival = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate minutes based on mock math
    const randomMinutes = Math.floor(Math.random() * 15) + 3;
    setSimulatedMinutes(randomMinutes);
  };

  return (
    <section id="campus-section" className="max-w-[1280px] mx-auto px-6 md:px-20 py-16 scroll-mt-24">
      <div className="mb-10 text-left">
        <h2 className="font-headline-md text-2xl font-bold text-[#003B71]">캠퍼스 생활</h2>
        <p className="text-xs text-gray-400 mt-1">학우들의 안락한 학업 보금자리와 전방위 편의 주거 혜택들</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-left">
        {/* Left column: Scholarship & Dormitory picker */}
        <div className="space-y-8">
          {/* Rich Scholarship Card */}
          <div className="block p-8 border border-[#e4e2e1] rounded-2xl bg-[#F4F4F4] hover:bg-[#e4e2e1]/30 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00A2E1]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00A2E1]/10 transition-colors"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold text-[#00A2E1] font-mono tracking-wider block mb-1">FINANCIAL SUPPORT</span>
                <h3 className="font-headline-md text-xl font-bold text-[#1b1c1c]">풍성한 국가 & 교내외 장학지원</h3>
              </div>
              <div className="p-3 bg-white text-[#003B71] border border-gray-150 rounded-xl">
                <Coins size={24} className="text-[#00A2E1]" />
              </div>
            </div>
            <p className="text-xs md:text-sm text-[#424750] leading-relaxed mb-6 font-medium">
              청주대학교는 성적우수, 복지장학금 뿐만 아니라 인공지능/SW 특성화 국책 장려 사업으로 선발된 학생들에게 200여개에 달하는 다양한 장학금을 폭넓게 수여하고 있습니다.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-bold text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-sm">연간 누적 수혜액 250억원 규모</span>
              <span className="text-[10px] font-bold text-[#003B71] bg-[#c7e7ff] px-3 py-1 rounded-sm">재학생 수혜율 88% 돌파</span>
            </div>
          </div>

          {/* Dormitory Interactive Detail Selector */}
          <div className="bg-white border border-[#e4e2e1] rounded-2xl p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3">
              <div className="p-2 bg-[#d4e3ff] text-[#003B71] rounded-lg">
                <Building size={18} />
              </div>
              <div>
                <h4 className="font-bold text-base text-[#1b1c1c] leading-tight">내 집 처럼 편안한 생활관 안내</h4>
                <p className="text-[10px] text-gray-400 font-mono">CAMPUS DORMITORY SELECTOR</p>
              </div>
            </div>

            {/* Selector buttons */}
            <div className="flex gap-2 mb-6">
              {DORM_ROOMS.map((dorm, dIdx) => (
                <button
                  key={dIdx}
                  onClick={() => { setActiveDormIdx(dIdx); }}
                  className={`text-xs px-3.5 py-2.5 rounded-lg font-bold transition-all flex-1 text-center cursor-pointer ${
                    activeDormIdx === dIdx
                      ? "bg-[#003B71] text-white shadow-sm"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-500"
                  }`}
                  id={`dorm-select-${dIdx}`}
                >
                  {dorm.name.split(" ")[0]}
                </button>
              ))}
            </div>

            {/* Active dormitory card content */}
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-[#F4F4F4]/70 p-4 rounded-xl border border-gray-100">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 block">생활관 형태</span>
                  <span className="text-xs md:text-sm font-bold text-[#003B71]">{selectedDorm.type} ({selectedDorm.capacity})</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-gray-400 block">수강 관리 가격 수치</span>
                  <strong className="text-xs md:text-sm text-green-600 font-bold">{selectedDorm.priceQuarter}</strong>
                </div>
              </div>

              {/* Special Features Checklist */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-400 block mb-1">관내 편의 및 치안 지원 인프라:</span>
                {selectedDorm.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex gap-2 text-xs text-gray-600 font-medium">
                    <ShieldCheck size={14} className="text-[#00A2E1] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Shuttle bus scheduler arrival estimator */}
        <div className="bg-white border border-[#e4e2e1] rounded-2xl p-6 shadow-xs h-full flex flex-col">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3">
            <div className="p-2 bg-[#c7e7ff] text-[#003B71] rounded-lg">
              <Bus size={18} />
            </div>
            <div>
              <h4 className="font-bold text-base text-[#1b1c1c] leading-tight">무료 통학 & 순환 셔틀버스 운행</h4>
              <p className="text-[10px] text-gray-400 font-mono">REALTIME SHUTTLE SIMULATOR</p>
            </div>
          </div>

          {/* Route selector tabs */}
          <div className="flex gap-2 mb-6">
            {SHUTTLE_ROUTES.map((route, rIdx) => (
              <button
                key={rIdx}
                onClick={() => { 
                  setActiveRouteIdx(rIdx); 
                  setSelectedStation(route.timetable[0]?.station || route.stops[0]);
                  setSimulatedMinutes(null);
                }}
                className={`text-xs px-3 py-2.5 rounded-lg font-bold transition-all text-center flex-1 cursor-pointer truncate ${
                  activeRouteIdx === rIdx
                    ? "bg-[#00A2E1] text-white shadow-xs"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-500"
                }`}
                id={`route-select-${rIdx}`}
              >
                {route.name.split(" ")[0]}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50/50 border border-blue-150/40 rounded-xl space-y-2 text-xs font-medium">
              <div className="flex gap-2 text-[#003B71] font-bold">
                <Bus size={14} className="mt-0.5" />
                <span>주요 순환 정류 정차 코스:</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedRoute.stops.map((stop, sIdx) => (
                  <span key={sIdx} className="bg-white border border-gray-200 px-2.5 py-1 rounded-xs text-[10px] font-bold text-gray-600">
                    {stop}
                  </span>
                ))}
              </div>
            </div>

            {/* Realtime dynamic calculation form */}
            <form onSubmit={handleCalculateArrival} className="bg-gray-50 p-4 border border-gray-150 rounded-xl space-y-4 text-left">
              <div className="space-y-1.5">
                <label htmlFor="station-select" className="text-[10px] font-bold text-gray-400 tracking-wider flex items-center gap-1">
                  <MapPin size={12} className="text-[#00A2E1]" />
                  현재 탑승 대기 장소 (정류장 선택):
                </label>
                <select
                  id="station-select"
                  value={selectedStation}
                  onChange={(e) => { 
                    setSelectedStation(e.target.value); 
                    setSimulatedMinutes(null);
                  }}
                  className="w-full bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 py-2 px-3 focus:outline-none focus:border-[#003B71]"
                >
                  {selectedRoute.timetable.map((st, stIdx) => (
                    <option key={stIdx} value={st.station}>{st.station}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#003B71] hover:bg-[#00254b] text-white text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  id="calc-arrival-btn"
                >
                  <Calculator size={14} />
                  실시간 도착 정보 예상 계산
                </button>
              </div>

              {simulatedMinutes !== null && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-fadeIn">
                  <Clock size={18} className="text-green-500 animate-pulse shrink-0" />
                  <div className="text-xs">
                    <span className="text-gray-500 font-medium">대기지 [{selectedStation}] 기준:</span>{" "}
                    <strong className="text-green-600 font-bold block sm:inline">다음 셔틀버스가 약 {simulatedMinutes}분 후 출발 예정입니다!</strong>
                  </div>
                </div>
              )}
            </form>

            {/* List of times */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-gray-400 tracking-wider flex items-center gap-1 uppercase">
                <Clock size={12} />
                주요 타임 테이블 가이드:
              </span>
              <div className="grid grid-cols-1 gap-2 max-h-[160px] overflow-y-auto pr-2">
                {selectedRoute.timetable.map((st, tIdx) => (
                  <div 
                    key={tIdx} 
                    className={`flex justify-between items-center p-2.5 rounded-lg border text-xs ${
                      selectedStation === st.station ? "border-[#00A2E1] bg-[#00A2E1]/2" : "border-gray-100 bg-white"
                    }`}
                  >
                    <span className="font-bold text-gray-700">{st.station}</span>
                    <span className="font-semibold text-gray-400 font-mono truncate max-w-sm pl-4">
                      {st.times.join("  |  ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
