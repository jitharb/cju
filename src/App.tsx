import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Admissions from "./components/Admissions";
import Colleges from "./components/Colleges";
import News from "./components/News";
import CampusLife from "./components/CampusLife";
import Chatbot from "./components/Chatbot";
import { GraduationCap, MapPin, Phone, Mail, FileText, Globe } from "lucide-react";

export default function App() {
  const [newsQuery, setNewsQuery] = useState("");

  const handleSearchNewsFromHeader = (query: string) => {
    setNewsQuery(query);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] min-h-screen flex flex-col font-sans transition-colors antialiased select-none">
      
      {/* 1. Header with dynamic news filter proxy */}
      <Header onSearchNews={handleSearchNewsFromHeader} />

      {/* Main Container */}
      <main className="flex-grow">
        
        {/* 2. Hero Presentation cover */}
        <Hero />

        {/* 3. Admissions guide timeline & Interactive Quiz Matchmaker */}
        <Admissions />

        {/* 4. 7 Academic Colleges expanding guidelines */}
        <Colleges />

        {/* 5. CJU News & Announcements with Search keyword highlights */}
        <section className="bg-white py-16 scroll-mt-24 border-t border-[#e4e2e1]">
          <div className="max-w-[1280px] mx-auto px-6 md:px-20">
            <News externalQuery={newsQuery} />
          </div>
        </section>

        {/* 6. Campus Life: Scholarships, Housing & Shuttle Arrival Simulator */}
        <CampusLife />

      </main>

      {/* 7. Comprehensive Prestigious University Footer, mimicking the visual exactly */}
      <footer className="bg-[#F4F4F4] border-t border-[#e4e2e1] mt-auto text-left">
        <div className="flex flex-col lg:flex-row justify-between items-start w-full max-w-[1280px] mx-auto px-6 md:px-20 py-16 gap-12">
          
          {/* Logo Brand metadata */}
          <div className="flex flex-col gap-6 max-w-md">
            <div>
              <div className="font-headline-md text-2xl font-black text-[#003B71] tracking-tight uppercase">
                Cheongju University
              </div>
              <span className="text-[10px] text-gray-400 font-mono tracking-widest font-bold">대한민국 실용 학문 국가대표 대학</span>
            </div>
            
            <div className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed space-y-2">
              <p>
                © {currentYear} Cheongju University. All Rights Reserved. 298 Daeseong-ro, Sangdang-gu, Cheongju, Chungcheongbuk-do, South Korea.
              </p>
              
              {/* Actual academic location parameters */}
              <div className="space-y-1.5 pt-4 border-t border-gray-200/60 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-gray-400" />
                  <span>충청북도 청주시 상당구 대성로 298 청주대학교 [우편번호: 28503]</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={12} className="text-gray-400" />
                  <span>대표 안내 전화: 043-229-8114 / FAX 정합: 043-229-8080</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={12} className="text-gray-400" />
                  <span>입학 관련 상담 이메일: cju_admit@cju.ac.kr</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick links matching */}
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-24">
            <div className="flex flex-col gap-4 text-left">
              <h4 className="font-bold text-xs text-[#003B71] uppercase tracking-widest pb-1 border-b border-gray-200">
                QUICK PORTALS
              </h4>
              <div className="flex flex-col gap-2.5 text-xs">
                <a className="text-[#424750] hover:text-[#00A2E1] transition-colors font-medium flex items-center gap-1.5" href="https://www.cju.ac.kr/adms/index.do" target="_blank" rel="noreferrer">
                  <GraduationCap size={12} />
                  수시/정시 합격자 조회
                </a>
                <a className="text-[#424750] hover:text-[#00A2E1] transition-colors font-medium flex items-center gap-1.5" href="https://tis.cju.ac.kr/" target="_blank" rel="noreferrer">
                  <Globe size={12} />
                  종합 정보 시스템 (포털)
                </a>
                <a className="text-[#424750] hover:text-[#00A2E1] transition-colors font-medium flex items-center gap-1.5" href="https://web.cju.ac.kr/lib/index.do" target="_blank" rel="noreferrer">
                  <FileText size={12} />
                  중앙 도서관 시스템 전자 열람
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-left">
              <h4 className="font-bold text-xs text-[#003B71] uppercase tracking-widest pb-1 border-b border-gray-200">
                QUICK LINKS
              </h4>
              <div className="flex flex-col gap-2.5 text-xs text-[#424750] font-medium font-sans">
                <a className="hover:text-[#00A2E1] transition-colors" href="#hero-section" onClick={(e) => { e.preventDefault(); document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth" }); }}>Privacy Policy</a>
                <a className="hover:text-[#00A2E1] transition-colors" href="#hero-section" onClick={(e) => { e.preventDefault(); document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth" }); }}>Terms of Service</a>
                <a className="hover:text-[#00A2E1] transition-colors" href="#hero-section" onClick={(e) => { e.preventDefault(); document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth" }); }}>Campus Map</a>
                <a className="hover:text-[#00A2E1] transition-colors" href="#hero-section" onClick={(e) => { e.preventDefault(); document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth" }); }}>Contact Us</a>
                <a className="hover:text-[#00A2E1] transition-colors" href="#hero-section" onClick={(e) => { e.preventDefault(); document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth" }); }}>Employment</a>
              </div>
            </div>
          </div>

        </div>

        {/* Technical compliance bar */}
        <div className="bg-[#eae8e7] py-4 text-center text-[10px] text-gray-400 font-mono border-t border-[#e4e2e1]">
          <span>COMPLIANCE RATING S++ | DEVELOPED WITH ADVANCED INTERACTIVE FRAMEWORK | CJU PORTAL CENTER 4.0</span>
        </div>
      </footer>

      {/* 8. Modern Custom Guided AI Chatbot Academic Helper */}
      <Chatbot />

    </div>
  );
}
