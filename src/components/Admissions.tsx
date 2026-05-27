import { useState } from "react";
import { GraduationCap, ArrowLeftRight, BookOpen, Clock, Calendar, CheckCircle, HelpCircle, RefreshCw, ChevronRight } from "lucide-react";
import { ADMISSION_QUIZ, COLLEGES } from "../data";

type AdmissionCategory = "freshman" | "transfer" | "graduate";

interface TimelineEvent {
  title: string;
  date: string;
  desc: string;
}

export default function Admissions() {
  const [activeTab, setActiveTab] = useState<AdmissionCategory>("freshman");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizResult, setQuizResult] = useState<any>(null);

  const timelines: Record<AdmissionCategory, TimelineEvent[]> = {
    freshman: [
      { title: "수시 원서 접수", date: "2025.09.09 ~ 09.13", desc: "인터넷 접수 (Uwayapply / Jinhakapply)" },
      { title: "수시 실기/면접 고사", date: "2025.10.15 ~ 10.22", desc: "예술대학/보건의료대학 실증 전형 평가" },
      { title: "수시 최종 합격 발표", date: "2025.11.14", desc: "입학처 홈페이지 확인 및 개별 문자 발송" },
      { title: "정시 원서 접수 및 발표", date: "2025.12.26 ~ 2026.01.20", desc: "가/나/다군 일반 학생 및 수능 위주 선임" }
    ],
    transfer: [
      { title: "원서 인터넷 접수", date: "2025.12.18 ~ 12.28", desc: "인터넷 접수 사이트를 통해 정식 수집" },
      { title: "서류 및 증명서 제출", date: "2026.01.05 한도", desc: "성적 및 수료 증명서 우편/방문 제출" },
      { title: "편입 면접/실기 고사", date: "2026.01.18", desc: "지원 학부별 면접 혹은 포트폴리오 면접" },
      { title: "합격자 정식 공고 및 등록", date: "2026.02.04 ~ 02.10", desc: "차수별 예비번호 회전 및 잔여 충전" }
    ],
    graduate: [
      { title: "특별전형 원서 접수", date: "2025.10.20 ~ 11.03", desc: "대학원 행정실 방문 및 팩스 접수 병행" },
      { title: "구술 및 면접시험", date: "2025.11.15", desc: "각 대학원 전공 주임교수 구술 면접" },
      { title: "합격 정식 고지", date: "2025.12.02", desc: "대학원 홈페이지 정식 게재 및 개별 문자 송신" },
      { title: "신입생 수강 등록 완료", date: "2026.02.16 ~ 02.20", desc: "정규 1학기 학점 신청 및 오리엔테이션" }
    ]
  };

  const handleQuizAnswer = (answerValue: string) => {
    const updatedAnswers = [...quizAnswers, answerValue];
    setQuizAnswers(updatedAnswers);

    if (currentQuestionIdx + 1 < ADMISSION_QUIZ.length) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Calculate recommend outcomes
      // Count frequency of answers
      const collegeCounts: Record<string, number> = {};
      updatedAnswers.forEach((ans) => {
        collegeCounts[ans] = (collegeCounts[ans] || 0) + 1;
      });

      // Match highest value
      let winningId = "aisw"; // Default AI Software if split
      let maxCount = 0;
      Object.entries(collegeCounts).forEach(([colId, count]) => {
        if (count > maxCount) {
          maxCount = count;
          winningId = colId;
        }
      });

      // Find matched college from COLLEGES database
      const matchedCollege = COLLEGES.find(c => c.id === winningId) || COLLEGES[3]; // Fallback to AI·SW
      setQuizResult(matchedCollege);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIdx(0);
    setQuizAnswers([]);
    setQuizResult(null);
  };

  return (
    <section id="admission-section" className="max-w-[1000px] mx-auto px-6 md:px-20 py-16 scroll-mt-24 border-t border-[#e4e2e1]">
      <div className="mb-12 text-left">
        <h2 className="font-headline-lg text-3xl font-bold text-[#003B71] mb-2">입학 안내</h2>
        <p className="font-body-md text-[#424750]">청주대학교와 함께 융복합 시대를 헤쳐 나갈 혁신의 꿈을 디자인하세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Navigation panel based on beautiful card listing */}
        <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-4">
          <button
            onClick={() => setActiveTab("freshman")}
            className={`group text-left p-5 rounded-xl border transition-all cursor-pointer ${
              activeTab === "freshman"
                ? "border-[#003B71] bg-[#003B71]/4 shadow-sm"
                : "border-[#e4e2e1] hover:border-[#00A2E1] bg-white"
            }`}
            id="tab-freshman"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                activeTab === "freshman" ? "bg-[#003B71] text-white" : "bg-gray-100 text-[#003B71]"
              }`}>
                <GraduationCap size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[#1b1c1c] mb-1">신입생</h3>
                <p className="text-xs text-[#424750]">2025-2026학년도 수시 및 정시 신입학 전형 안내</p>
              </div>
              <ChevronRight size={18} className={`transition-transform duration-300 ${activeTab === "freshman" ? "translate-x-1 text-[#003B71]" : "text-gray-400"}`} />
            </div>
          </button>

          <button
            onClick={() => setActiveTab("transfer")}
            className={`group text-left p-5 rounded-xl border transition-all cursor-pointer ${
              activeTab === "transfer"
                ? "border-[#003B71] bg-[#003B71]/4 shadow-sm"
                : "border-[#e4e2e1] hover:border-[#00A2E1] bg-white"
            }`}
            id="tab-transfer"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                activeTab === "transfer" ? "bg-[#003B71] text-white" : "bg-gray-100 text-[#00A2E1]"
              }`}>
                <ArrowLeftRight size={22} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[#1b1c1c] mb-1">편입생</h3>
                <p className="text-xs text-[#424750]">더 높은 꿈을 품고 세상을 전진하는 편입학 수칙 안내</p>
              </div>
              <ChevronRight size={18} className={`transition-transform duration-300 ${activeTab === "transfer" ? "translate-x-1 text-[#003B71]" : "text-gray-400"}`} />
            </div>
          </button>

          <button
            onClick={() => setActiveTab("graduate")}
            className={`group text-left p-5 rounded-xl border transition-all cursor-pointer ${
              activeTab === "graduate"
                ? "border-[#003B71] bg-[#003B71]/4 shadow-sm"
                : "border-[#e4e2e1] hover:border-[#00A2E1] bg-white"
            }`}
            id="tab-graduate"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                activeTab === "graduate" ? "bg-[#003B71] text-white" : "bg-gray-100 text-[#17477e]"
              }`}>
                <BookOpen size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[#1b1c1c] mb-1">대학원생</h3>
                <p className="text-xs text-[#424750]">세계를 무대로 주도할 학문의 깊이 실용 대학원 가이드</p>
              </div>
              <ChevronRight size={18} className={`transition-transform duration-300 ${activeTab === "graduate" ? "translate-x-1 text-[#003B71]" : "text-gray-400"}`} />
            </div>
          </button>
        </div>

        {/* Selected tab schedule timeline details */}
        <div className="md:col-span-12 lg:col-span-7 bg-white p-6 rounded-2xl border border-[#e4e2e1] shadow-xs">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h4 className="font-bold text-lg text-[#003B71] flex items-center gap-2">
              <Clock size={18} className="text-[#00A2E1]" />
              전형 일정 및 제출 서류 요약
            </h4>
            <span className="text-xs bg-[#c7e7ff] text-[#004c6c] px-2.5 py-1 rounded font-bold uppercase">
              {activeTab === "freshman" ? "신입학" : activeTab === "transfer" ? "편입학" : "석/박사 과정"}
            </span>
          </div>

          <div className="space-y-6 relative border-l border-dashed border-[#c3c6d1] ml-3.5 pl-6 py-2">
            {timelines[activeTab].map((event, idx) => (
              <div key={idx} className="relative group">
                <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#003B71] border border-white group-hover:scale-110 transition-transform">
                  <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                </span>
                <div className="text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 mb-1">
                    <h5 className="font-bold text-[#1b1c1c] text-sm md:text-base group-hover:text-[#00A2E1] transition-colors">{event.title}</h5>
                    <span className="text-xs text-[#003B71] font-semibold flex items-center gap-1 shrink-0 bg-blue-50 px-2 py-0.5 rounded-sm">
                      <Calendar size={12} />
                      {event.date}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 font-medium">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
            <div className="text-xs text-gray-400">
              * 위 일정은 교육부 대입 정책 및 본교 사정에 따라 변동될 수 있습니다.
            </div>
            <button
              onClick={() => alert("임시 보관된 '청주대 2026학년도 모집 요강 가이드 PDF'가 성공적으로 다운로드되었습니다.")}
              className="w-full sm:w-auto bg-[#00254b] text-white text-xs font-bold px-4 py-2.5 rounded-md hover:bg-[#003B71] transition-colors cursor-pointer text-center"
              id="download-guide-pdf-btn"
            >
              모집요강 다운로드 (PDF)
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Admission Matchmaker Quiz */}
      <div className="mt-12 bg-radial from-[#F4F4F4] to-white p-6 md:p-8 rounded-2xl border border-[#e4e2e1] text-center shadow-xs">
        {!quizStarted ? (
          <div>
            <div className="inline-flex py-1 px-3 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-500 gap-1.5 items-center mb-4">
              <HelpCircle size={14} className="text-[#00A2E1]" />
              인공지능 추천 전형 연계
            </div>
            <h3 className="font-bold text-xl md:text-2xl text-[#003B71] mb-2 font-headline-md">나에게 꼭 맞는 단과대학 & 학과 진단</h3>
            <p className="text-xs md:text-sm text-gray-500 max-w-lg mx-auto mb-6 leading-relaxed">
              성격 및 학술 관심도를 분석하는 3가지 짧은 퀴즈를 통해 나에게 맞는 최적의 청주대학교 학부군을 스마트하게 제안해 드립니다.
            </p>
            <button
              onClick={() => setQuizStarted(true)}
              className="bg-[#00A2E1] hover:bg-blue-500 text-white font-bold text-xs md:text-sm px-6 py-3 rounded-lg shadow-xs transition-colors cursor-pointer"
              id="start-quiz-btn"
            >
              간편 성향 테스트 시작하기
            </button>
          </div>
        ) : !quizResult ? (
          <div className="max-w-xl mx-auto text-left">
            <div className="flex justify-between items-center mb-4 text-xs font-medium text-gray-400">
              <span>질문 {currentQuestionIdx + 1} / {ADMISSION_QUIZ.length}</span>
              <span className="text-[#00A2E1] font-bold">진행도: {Math.round(((currentQuestionIdx) / ADMISSION_QUIZ.length) * 100)}%</span>
            </div>
            
            <div className="w-full bg-gray-200 h-1 rounded-full mb-6 overflow-hidden">
              <div 
                className="bg-[#00A2E1] h-1 transition-all duration-300" 
                style={{ width: `${((currentQuestionIdx) / ADMISSION_QUIZ.length) * 100}%` }}
              ></div>
            </div>

            <h4 className="font-bold text-base md:text-lg text-[#1b1c1c] mb-6 leading-snug">
              {ADMISSION_QUIZ[currentQuestionIdx].question}
            </h4>

            <div className="space-y-3">
              {ADMISSION_QUIZ[currentQuestionIdx].options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleQuizAnswer(opt.value)}
                  className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-[#003B71] hover:bg-[#003B71]/2 text-xs md:text-sm font-medium text-gray-700 bg-white shadow-xs transition-all cursor-pointer"
                  id={`quiz-option-${currentQuestionIdx}-${oIdx}`}
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-gray-100 text-[#003B71] text-xs font-bold text-center leading-6 mr-3 shrink-0">
                    {oIdx + 1}
                  </span>
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-4 border border-green-200 animate-bounce">
              <CheckCircle size={32} />
            </div>

            <div className="text-xs font-bold text-gray-400 tracking-wider mb-1 uppercase">진단 피드백 완성</div>
            <h4 className="font-bold text-2xl text-[#003B71] mb-2 font-headline-md">
              추천 학부: {quizResult.name}
            </h4>
            <p className="text-xs md:text-sm text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
              귀하의 수치적 합리성과 도전 태도는 <strong>{quizResult.name}</strong> 계열의 실용 커리큘럼에서 가장 밝게 빛날 것으로 가이드됩니다. {quizResult.description}
            </p>

            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 text-left shadow-xs">
              <span className="text-xs font-bold text-[#00A2E1] block mb-2">이 단과대학의 강력 추천 소속 전공:</span>
              <ul className="space-y-2">
                {quizResult.departments.map((dept: any, dIdx: number) => (
                  <li key={dIdx} className="flex gap-2 text-xs text-gray-600 font-medium">
                    <span className="text-blue-500 font-bold">•</span>
                    <div>
                      <strong>{dept.name}</strong>: {dept.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={resetQuiz}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-4 py-2.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                id="reset-quiz-btn"
              >
                <RefreshCw size={12} />
                테스트 다시하기
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("college-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-[#003B71] hover:bg-[#00254b] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                id="go-colleges-btn"
              >
                단과대 상세 정보 탐색하기
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
