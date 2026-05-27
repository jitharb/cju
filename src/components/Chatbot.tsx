import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, GraduationCap, ChevronUp, AlertCircle } from "lucide-react";

interface Message {
  role: "user" | "model";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "안녕하세요! 실학성세 4.0 청주대학교 스마트 AI 학사 비서입니다. 무한한 가능성을 지닌 청주대학교 입학 안내, 기숙사 생활관 정보, 장학금 지원 제도 등에 대해 무엇이든 편안하게 여쭤보세요!"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputVal;
    if (!textToSend.trim() || isLoading) return;

    if (!customText) {
      setInputVal("");
    }

    const newMsg: Message = { role: "user", content: textToSend };
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
          systemPrompt: "You are the official AI Academic Advisor for Cheongju University (청주대학교), an outstanding private research university in South Korea. Speak in a respectful, welcoming, and clear Korean academic advising tone. Introduce students to colleges (경상대학, 인문사회대학, 공과대학, AI·SW융합대학, 예술대학, 보건의료과학대학, 항공·국방대학) and answer housing, shuttle, or scholarship details logically, referencing actual school values. Highlight that CJU offers over 200 scholarships worth more than 25 billion KRW annually."
        })
      });

      if (!response.ok) {
        throw new Error("서버와의 통신에 실패했습니다.");
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        { role: "model", content: data.text || "죄송합니다. 서비스 상태가 고르지 못하여 답변을 생성하지 못했습니다. 입학처 홈페이지를 확인해 주세요." }
      ]);
    } catch (error) {
      console.error("AI Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        { 
          role: "model", 
          content: "현재 가상체험용 백엔드 서버 로딩이 진행 중이거나 응답 점검 상태입니다. 우암마을 기숙사 종류, 풍성한 장학금 혜택 혹은 신입생 편입 전형에 관해 궁금하신 핵심 내용은 위의 대화 상자 탭을 선택하여 세부 일정을 살펴볼 수 있습니다." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "장학금 지원 혜택이 어떻게 되나요?",
    "기숙사(생활관) 시설과 비용을 알려줘.",
    "AI·SW융합대학 학과들이 궁금해요.",
    "수시/정시 원서 접수 일정은?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Panel Container */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[520px] bg-white border border-[#e4e2e1] rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-4 animate-scaleUp">
          {/* Header */}
          <div className="bg-[#003B71] text-white p-4 flex justify-between items-center border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#00A2E1] flex items-center justify-center border border-white/20">
                <Bot size={18} className="text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-[#c7e7ff] tracking-widest font-mono">CJU ASSISTANT</h4>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-sm tracking-tight">청주대 AI 학사비서</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              id="close-chatbot"
              aria-label="채팅창 닫기"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Box */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 text-left">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-2 max-w-[85%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {msg.role === "model" && (
                  <div className="w-7 h-7 rounded-full bg-[#c7e7ff] text-[#003B71] flex items-center justify-center shrink-0 mt-1 border border-blue-200">
                    <GraduationCap size={14} />
                  </div>
                )}
                <div>
                  <div className={`p-3 rounded-2xl text-xs md:text-sm font-medium leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-[#003B71] text-white rounded-tr-none" 
                      : "bg-white text-[#1b1c1c] border border-gray-200 rounded-tl-none pr-4 shadow-2xs"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-2 max-w-[80%] mr-auto">
                <div className="w-7 h-7 rounded-full bg-[#c7e7ff] text-[#003B71] flex items-center justify-center shrink-0 mt-1 border border-blue-200 animate-pulse">
                  <Sparkles size={12} />
                </div>
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-2xs flex items-center">
                  <span className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick recommendations panel */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto select-none shrink-0 scrollbar-none">
            {quickQuestions.map((q, qIdx) => (
              <button
                key={qIdx}
                onClick={() => handleSendMessage(q)}
                className="bg-gray-50 hover:bg-[#c7e7ff]/30 text-[#003B71] hover:text-[#00A2E1] border border-gray-150 rounded-full text-[10px] md:text-xs font-bold px-3 py-1.5 h-8 whitespace-nowrap transition-colors cursor-pointer"
                id={`qq-btn-${qIdx}`}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input text form */}
          <div className="p-3 bg-gray-50 border-t border-gray-100 flex gap-2">
            <input
              type="text"
              placeholder="질문을 입력해 주세요..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }}
              className="flex-1 bg-white border border-gray-300 rounded-lg text-xs md:text-sm px-3 focus:outline-none focus:border-[#003B71]"
              id="chatbot-msg-input"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputVal.trim() || isLoading}
              className={`p-2.5 rounded-lg text-white transition-colors cursor-pointer ${
                inputVal.trim() && !isLoading ? "bg-[#00A2E1] hover:bg-blue-500" : "bg-gray-300"
              }`}
              id="send-chatbot-msg"
              aria-label="메시지 전송"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Circle Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#003B71] hover:bg-[#00254b] text-white flex items-center justify-center shadow-2xl transition-all hvr-grow active:scale-95 cursor-pointer relative"
        id="chatbot-toggle"
        aria-label="챗봇 도우미 대화하기"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <>
            <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-500 rounded-full text-[10px] font-bold text-center leading-4 animate-bounce text-white border border-white">
              N
            </span>
            <MessageSquare size={24} />
          </>
        )}
      </button>
    </div>
  );
}
