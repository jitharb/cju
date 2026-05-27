import { useState, useEffect } from "react";
import { Search, Calendar, Tag, ChevronRight, X, Sparkles } from "lucide-react";
import { NEWS_ARTICLES, NewsArticle } from "../data";

interface NewsProps {
  externalQuery: string;
}

export default function News({ externalQuery }: NewsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    if (externalQuery) {
      setSearchQuery(externalQuery);
    }
  }, [externalQuery]);

  // Map hotlink images from prompt precisely for authenticity
  const getImageForNews = (id: string, defaultUrl: string) => {
    if (id === "news-1") {
      return "https://lh3.googleusercontent.com/aida/ADBb0ugq-nAWGibmrqyrVLIKKwnc_m8WXB04LFEu9UjQpvFJANR1nOBVbt4C9_oZznwJz_Mqd_zBxfUr_8ABmViSzvCX8c3R97UNnegaLwZWarXvO468Op0lcShgw3iWGG13IzlwnnrMKzXMiNXfTDkcqkxP3u76KKu4F8FzIqS5B4pvrvpvsBWzTKgIasXZS4kYP-bqR8VDb0yHOzfA-PjZIBr02ykE0G6fPsV0OjaqahTiAm7CJhTUXt8h4A";
    }
    if (id === "news-2") {
      return "https://lh3.googleusercontent.com/aida/ADBb0uhXo76YbRiv6_UCVjEHiXROw2g9-A3XVETpKmvcfI7GJ6x0OVrTLfJogKUXpdW8b7xCnOdoYQgYY7ZSb4fLBl8h_2h-db_XXFDyRa2V5tTHiAXobZMvl0Z8uv1Nr7jWf9r8B3D_ELpdm_oQ-NV_ED15T7uFGHOSNapitYCaeaPiWu3D8LRh-pOf9cgNg4OY-aKrvOy2-wjyz4bzvqD7rCUrbWZbPMyQMSm6tX3-L08uQXAGlLCD7q6JpnU";
    }
    return defaultUrl;
  };

  const filteredArticles = NEWS_ARTICLES.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "학술/행사", "취업/채용", "연구/성과"];

  return (
    <div id="news-section" className="scroll-mt-24 text-left">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#e4e2e1]">
        <div>
          <h2 className="font-headline-md text-2xl font-bold text-[#003B71]">청주대 뉴스</h2>
          <p className="text-xs text-gray-400 mt-1">글로벌 리더로 자라나는 청주대 학우들의 다양한 활약상</p>
        </div>
        
        {/* Sub-navigation search block */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="뉴스 소식 키워드 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs border border-gray-300 rounded-lg pl-8 pr-3 py-1.5 focus:border-[#003B71] focus:outline-none w-56 font-medium text-gray-700 bg-white"
              id="news-local-search-input"
            />
            <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
          </div>
          
          <button 
            onClick={() => setSearchQuery("")} 
            className="text-xs text-[#003B71] hover:text-[#00A2E1] font-bold tracking-wider"
            id="clear-news-search-btn"
          >
            전체 초기화
          </button>
        </div>
      </div>

      {/* Category badging */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-[#003B71] text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
            id={`news-cat-${cat}`}
          >
            {cat === "All" ? "전체 보기" : cat}
          </button>
        ))}
      </div>

      {/* Display warnings if search result count is empty */}
      {filteredArticles.length === 0 ? (
        <div className="py-12 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200 min-h-[160px] flex flex-col justify-center items-center">
          <p className="text-sm font-semibold mb-1">검색 결과가 없습니다.</p>
          <p className="text-xs">다른 학술, 세무, 취업 또는 토익 키워드로 다시 매칭해 보세요.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Top Primary articles mapping */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.filter(art => art.id !== "news-3" && art.id !== "news-4").slice(0, 2).map((article) => (
              <button
                key={article.id}
                onClick={() => setSelectedNews(article)}
                className="group flex flex-col sm:flex-row gap-4 items-start bg-white p-4 rounded-xl border border-gray-200 hover:border-[#00A2E1] hover:shadow-xs transition-all cursor-pointer text-left focus:outline-none"
                id={`article-card-${article.id}`}
              >
                <div className="w-full sm:w-1/3 aspect-[4/3] rounded overflow-hidden border border-[#e4e2e1] shrink-0 bg-gray-50">
                  <img 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                    src={getImageForNews(article.id, article.imageUrl)}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-full sm:w-2/3 flex flex-col h-full py-1">
                  <div className="flex items-center gap-2 mb-2 text-[10px] sm:text-xs">
                    <span className="text-[#00A2E1] font-bold flex items-center gap-1.5 bg-blue-50 px-2 py-0.5 rounded-sm">
                      <Tag size={12} />
                      {article.category}
                    </span>
                    <span className="text-gray-400 font-mono tracking-wider">{article.date}</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1b1c1c] group-hover:text-[#00A2E1] line-clamp-2 leading-snug transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-2 md:line-clamp-3">
                    {article.summary}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Bottom lists (for text-oriented listings) */}
          <div className="border-t border-[#e4e2e1] pt-4 space-y-3">
            {filteredArticles.filter(art => art.id === "news-3" || art.id === "news-4" || filteredArticles.length < 3).map((article) => (
              <button
                key={article.id}
                onClick={() => setSelectedNews(article)}
                className="w-full flex items-center justify-between group py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors text-left focus:outline-none cursor-pointer"
                id={`row-news-${article.id}`}
              >
                <div className="flex items-center gap-3 truncate pr-4">
                  <span className="text-[10px] font-bold bg-[#eae8e7] text-gray-600 px-2.5 py-0.5 rounded-sm shrink-0">
                    {article.category}
                  </span>
                  <span className="font-medium text-xs md:text-sm text-[#1b1c1c] group-hover:text-[#00A2E1] truncate transition-colors">
                    {article.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-gray-400 font-mono">{article.date}</span>
                  <ChevronRight size={14} className="text-gray-400 group-hover:text-[#00A2E1] transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* News Detail Modal Popup */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden border border-[#e4e2e1] shadow-2xl relative animate-fadeIn duration-200">
            {/* Header banner */}
            <div className="p-4 md:p-6 bg-[#00254b] text-white border-b border-gray-800 flex justify-between items-start">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 bg-[#00A2E1] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-xs">
                  <Sparkles size={10} />
                  CJU NEWS
                </div>
                <h4 className="font-bold text-base md:text-lg tracking-tight leading-tight mt-1">
                  {selectedNews.title}
                </h4>
              </div>
              <button 
                onClick={() => setSelectedNews(null)}
                className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors shrink-0"
                id="close-news-modal-btn"
                aria-label="닫기"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto max-h-[480px] space-y-6">
              <div className="flex justify-between items-center text-xs text-gray-400 font-medium">
                <span className="flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  구분: {selectedNews.category}
                </span>
                <span>보도 일자: {selectedNews.date}</span>
              </div>

              {/* Cover Image */}
              <div className="w-full aspect-video rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                <img 
                  alt={selectedNews.title} 
                  className="w-full h-full object-cover" 
                  src={getImageForNews(selectedNews.id, selectedNews.imageUrl)}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Summary and Content paragraphs */}
              <div className="space-y-4 text-xs md:text-sm text-gray-700 leading-relaxed font-medium">
                <div className="p-4 bg-blue-50/60 border-l-4 border-[#00A2E1] rounded-r-xl font-bold">
                  {selectedNews.summary}
                </div>
                {selectedNews.content.split("\n\n").map((para, pIdx) => (
                  <p key={pIdx} className="text-gray-600 leading-relaxed font-normal whitespace-pre-line">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Footer buttons */}
            <div className="p-4 bg-gray-50 border-t border-gray-150 flex justify-end gap-2">
              <button
                onClick={() => setSelectedNews(null)}
                className="bg-[#003B71] hover:bg-[#00254b] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                id="news-modal-dismiss-btn"
              >
                닫기 및 복귀
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
