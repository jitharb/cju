import React, { useState } from "react";
import { Search, Menu, X, ShieldAlert, GraduationCap } from "lucide-react";

interface HeaderProps {
  onSearchNews: (query: string) => void;
}

export default function Header({ onSearchNews }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchNews(searchQuery);
    // Smooth scroll directly to the news section
    const newsSection = document.getElementById("news-section");
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { name: "대학소개", id: "hero-section" },
    { name: "입학안내", id: "admission-section" },
    { name: "학과안내", id: "college-section" },
    { name: "캠퍼스라이프", id: "campus-section" },
    { name: "소식/공지", id: "news-section" }
  ];

  return (
    <header className="bg-white/95 backdrop-blur border-b border-[#e4e2e1] sticky top-0 z-50 transition-shadow hover:shadow-xs">
      <div className="max-w-[1280px] mx-auto px-4 md:px-20 py-4 flex justify-between items-center">
        {/* CJU Brand Logo Container */}
        <a 
          href="#hero-section" 
          onClick={(e) => { e.preventDefault(); scrollToSection("hero-section"); }}
          className="flex items-center gap-2 group focus:outline-none"
          id="cju-logo"
        >
          <img 
            alt="청주대학교 로고" 
            className="h-10 w-auto object-contain transition-transform group-hover:scale-102" 
            src="https://lh3.googleusercontent.com/aida/ADBb0uhgJAtaTUV9wwc8UUJ5Q4x7vFfHF9TVPYykm7cBCMJ78GcGeDLWUbkR9hU_06NJNfyV1bEFtIRjMCes1vW0Yjho2YOiE83gWhNBjXalQ-X7b9FEswzxp2-bszFZfUr0O6TSJlIjrBe5s1uTLJt7Z_HGhTQCoayKPTT1E4J4Zdp2rFjPh3psAKbpw5Pthf2VXYjFYBCjLcYPoBZJL86UVBB3tjrx4WYkSsYvNDYKHQGoupUfHDFcwEMaG-4"
            referrerPolicy="no-referrer"
          />
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-[#003B71] text-base leading-tight tracking-wide font-headline-md">청주대학교</span>
            <span className="text-gray-400 text-[10px] font-mono tracking-wider">CHEONGJU UNIVERSITY</span>
          </div>
        </a>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-[#1b1c1c] hover:text-[#00A2E1] transition-colors font-medium text-sm tracking-wide focus:outline-none cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#00A2E1] after:transition-all hover:after:w-full"
              id={`nav-btn-${item.id}`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Secondary controls */}
        <div className="flex items-center gap-2">
          {searchOpen && (
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 relative">
              <input
                type="text"
                placeholder="공지 비법 및 대학 뉴스 피릿 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs text-gray-800 focus:outline-none w-48 pr-6"
                id="header-search-input"
              />
              <button type="submit" className="absolute right-2 text-gray-400 hover:text-blue-500">
                <Search size={14} />
              </button>
            </form>
          )}

          <button 
            type="button"
            aria-label="Toggle search bar"
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-gray-600 hover:text-[#00A2E1] hover:bg-gray-50 rounded-full transition-colors cursor-pointer"
            id="search-toggle-btn"
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          {/* Mobile menu toggle */}
          <button 
            type="button"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-[#00A2E1] hover:bg-gray-50 rounded-full transition-colors cursor-pointer"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg animate-fadeIn duration-200">
          <div className="p-4 space-y-3">
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full">
              <input
                type="text"
                placeholder="관심 공지 뉴스 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-sm text-gray-800 bg-transparent focus:outline-none w-full"
                id="header-mobile-search-input"
              />
              <button type="submit" className="text-gray-400">
                <Search size={16} />
              </button>
            </form>

            <div className="grid grid-cols-1 gap-2 pt-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-[#1b1c1c] hover:bg-gray-50 hover:text-[#00A2E1] transition-all text-left px-3 py-2.5 rounded-lg text-sm font-semibold focus:outline-none w-full cursor-pointer"
                  id={`mobile-nav-${item.id}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
