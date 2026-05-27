import React, { useState } from "react";
import { ArrowRight, Play, X, Compass, Award, ExternalLink, GraduationCap } from "lucide-react";

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);

  const scrollToAdmission = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("admission-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const cjuVideoUrl = "https://www.youtube.com/embed/_K09XkKqjQk"; // Official clean university promotion or nice educational embed

  return (
    <section id="hero-section" className="max-w-[1280px] mx-auto px-6 md:px-20 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      {/* Left Text Intro Component */}
      <div className="flex-1 flex flex-col items-start gap-6 md:gap-8 text-left">
        <div className="inline-flex items-center gap-2 bg-[#d4e3ff]/60 px-3.5 py-1.5 rounded-full border border-[#a6c8ff]">
          <Award size={14} className="text-[#003B71]" />
          <span className="text-xs font-bold text-[#17477e]">디지털 대전환 실학 혁신의 중심 대학</span>
        </div>

        <div>
          <h1 className="font-headline-xl text-4xl md:text-5xl lg:text-5xl font-bold text-[#003B71] leading-tight mb-4 tracking-tight">
            실학성세 4.0!<br />
            <span className="text-[#00A2E1] relative">미래를 이끄는</span> 청주대학교
          </h1>
          <p className="font-body-lg text-lg text-[#424750] max-w-xl font-medium mt-3">
            역사에 묻고 미래에 답하는 대한민국 실용 학문의 최고 중심 대학.
            세상을 변화시키는 융복합 리더로 도약하세요.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          <button
            onClick={scrollToAdmission}
            className="w-full sm:w-auto bg-[#003B71] hover:bg-[#00254b] text-white px-7 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            id="hero-go-admission-btn"
          >
            입학 안내 바로가기
            <ArrowRight size={16} />
          </button>
          
          <button
            onClick={() => setVideoOpen(true)}
            className="w-full sm:w-auto border border-[#737781] text-[#1b1c1c] hover:bg-[#e4e2e1] px-7 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer"
            id="hero-watch-video-btn"
          >
            학교 소개 영상 보기
            <Play size={16} className="text-[#00A2E1] fill-[#00A2E1]" />
          </button>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#e4e2e1] w-full max-w-md">
          <div>
            <div className="text-2xl font-bold text-[#003B71]">79년</div>
            <div className="text-xs text-gray-500 mt-1">빛나는 학문 역사</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#003B71]">200억+</div>
            <div className="text-xs text-gray-500 mt-1">풍성한 연간 장학금</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#003B71]">37개</div>
            <div className="text-xs text-gray-500 mt-1">진로 맞춤 학과군</div>
          </div>
        </div>
      </div>

      {/* Right Visual Photo Media Component */}
      <div className="flex-1 w-full max-w-lg relative group">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-[#003B71] to-[#00A2E1] rounded-2xl blur-xs opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-[#e4e2e1] relative bg-slate-50">
          <img 
            alt="청주대 활기찬 캠퍼스 라이프" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104" 
            src="https://lh3.googleusercontent.com/aida/ADBb0ui-9PvVFN4sYa9hzboJLSuIz9jCNXPbUhP3C-6b49_o7xCkDpBsg8SNLffjqeN56GNvRLnvXziXaROu3IQN5mR9Chb5445OvdU9rVWNF686JGpjRZO7gTrflF2riyT4EzzqGWQY4DljzYBPkmRNUbwIXvxrgyFujNoYDulvoUwrrGE9YbNJlBPTAQQ6wPshWj5urCEjNUJ6JlynsAD-s4FtFcp3b8sqlWoEOJLn3PZLiHZDoLJETSALrr4"
            referrerPolicy="no-referrer"
          />
          {/* Subtle glow filter overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#003B71]/10 to-transparent"></div>
        </div>
      </div>

      {/* Video Modal Popup */}
      {videoOpen && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1b1c1c] w-full max-w-3xl rounded-2xl overflow-hidden border border-[#737781] shadow-2xl relative">
            <div className="flex justify-between items-center p-4 bg-[#00254b] text-white border-b border-gray-800">
              <span className="font-bold font-headline-md tracking-tight flex items-center gap-2">
                <GraduationCap className="text-[#00A2E1]" size={18} />
                청주대학교 공식 홍보 비디오 가이드
              </span>
              <button 
                onClick={() => setVideoOpen(false)}
                className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                id="close-video-modal-btn"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="aspect-video w-full bg-black">
              <iframe 
                className="w-full h-full"
                src={cjuVideoUrl}
                title="Cheongju University Introduction Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>

            <div className="p-4 flex justify-between items-center bg-gray-900 text-gray-400 text-xs">
              <span>학교 비디오가 정상 로드되지 않으면 아래 링크로 시청하세요</span>
              <a 
                href="https://www.youtube.com/user/cjupr" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#00A2E1] hover:underline flex items-center gap-1"
              >
                공식 유튜브 채널 가기 <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
