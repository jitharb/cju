import { useState } from "react";
import { Briefcase, Globe, Wrench, Cpu, Palette, Activity, Plane, BookOpen, Compass, Trophy, X, ArrowUpRight } from "lucide-react";
import { COLLEGES, College } from "../data";

const iconMap: Record<string, any> = {
  Briefcase: Briefcase,
  Globe: Globe,
  Wrench: Wrench,
  Cpu: Cpu,
  Palette: Palette,
  Activity: Activity,
  Plane: Plane
};

export default function Colleges() {
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  return (
    <section id="college-section" className="bg-[#F4F4F4] py-16 scroll-mt-24 border-t border-[#e4e2e1]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-20 text-left">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <h2 className="font-headline-lg text-3xl font-bold text-[#003B71] mb-2">단과대학 안내</h2>
            <p className="font-body-md text-[#424750]">각 분야를 리드하는 7개 특성화 단과대학에서 글로벌 인재로 성장합니다.</p>
          </div>
          <button
            onClick={() => setSelectedCollege(COLLEGES[3])} // Selects AI-SW by default for full preview
            className="text-[#00A2E1] font-bold text-sm hover:underline flex items-center gap-1 cursor-pointer"
            id="show-all-colleges-btn"
          >
            특성화 대학 한눈에 보기 <ArrowUpRight size={16} />
          </button>
        </div>

        {/* 7 Colleges Grid, mimicking the beautiful rounded hover-lift states */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {COLLEGES.map((college) => {
            const IconComponent = iconMap[college.icon] || BookOpen;
            const isSelected = selectedCollege?.id === college.id;

            return (
              <button
                key={college.id}
                onClick={() => setSelectedCollege(college)}
                className={`p-6 border rounded-xl text-left transition-all hover:-translate-y-1.5 focus:outline-none cursor-pointer group ${
                  isSelected
                    ? "bg-[#003B71] border-[#003B71] text-white shadow-md relative"
                    : "bg-white border-[#e4e2e1] text-[#1b1c1c] hover:border-[#00A2E1] hover:shadow-md"
                }`}
                id={`card-${college.id}`}
              >
                <div className="flex justify-between items-start w-full">
                  <div className={`p-3 rounded-lg mb-4 inline-block transition-colors ${
                    isSelected ? "bg-white/10 text-white" : "bg-[#F4F4F4] text-[#003B71] group-hover:bg-[#c7e7ff]"
                  }`}>
                    <IconComponent size={24} />
                  </div>
                  <ArrowUpRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${isSelected ? "text-white" : "text-[#00A2E1]"}`} />
                </div>
                <h3 className="font-headline-md font-bold text-base md:text-lg mb-1 leading-tight">{college.name}</h3>
                <p className={`text-[10px] md:text-xs font-medium font-mono ${isSelected ? "text-blue-200" : "text-gray-400"}`}>
                  {college.departments.length}개 핵심 전공 학부
                </p>
              </button>
            );
          })}
        </div>

        {/* Deep Detail Accordion Panel with transitions */}
        {selectedCollege && (
          <div className="mt-8 bg-white border border-[#e4e2e1] rounded-2xl p-6 md:p-8 text-left shadow-lg animate-fadeIn duration-300 relative">
            <button
              onClick={() => setSelectedCollege(null)}
              className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
              id="close-college-detail"
              aria-label="닫기"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
              {/* College Overview */}
              <div className="md:w-1/3 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-8">
                <div className="inline-flex items-center gap-3">
                  <div className="p-3 bg-[#c7e7ff] text-[#003B71] rounded-xl">
                    {(() => {
                      const Icon = iconMap[selectedCollege.icon] || BookOpen;
                      return <Icon size={24} />;
                    })()}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#00A2E1] font-bold uppercase">CHEONGJU COLLEGE</span>
                    <h4 className="text-xl md:text-2xl font-bold text-[#003B71]">{selectedCollege.name}</h4>
                  </div>
                </div>

                <p className="text-sm text-gray-600 font-medium leading-relaxed mt-2">
                  {selectedCollege.description}
                </p>

                <div className="mt-auto space-y-3 bg-blue-50/60 p-4 rounded-xl border border-blue-100/50">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#003B71]">
                    <Trophy size={14} />
                    <span>학술 연구 및 단과대 지수 성과</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-gray-400 block">취업 연계율</span>
                      <span className="text-lg font-bold text-[#003B71]">84.2%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">국가 장학 매칭</span>
                      <span className="text-lg font-bold text-[#003B71]">100% 수혜</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Departments detailed view */}
              <div className="md:w-2/3 space-y-6">
                <h5 className="font-bold text-sm md:text-base text-gray-400 tracking-wide uppercase">정식 개설 학과 및 진로 매칭 레시피</h5>
                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
                  {selectedCollege.departments.map((dept) => (
                    <div 
                      key={dept.id} 
                      className="p-4 rounded-xl bg-gray-50 border border-gray-100/80 transition-colors hover:bg-blue-50/20"
                      id={`dept-${dept.id}`}
                    >
                      <h6 className="font-bold text-sm md:text-base text-[#003B71] mb-1.5">{dept.name}</h6>
                      <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-3">{dept.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold text-[#00A2E1] bg-white border border-blue-100 px-2 py-0.5 rounded-sm mr-1">주요 졸업 진로:</span>
                        {dept.careers.map((career, cIdx) => (
                          <span 
                            key={cIdx} 
                            className="text-[10px] md:text-xs font-medium bg-white text-gray-600 border border-gray-200 px-2.5 py-0.5 rounded-full"
                          >
                            {career}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
