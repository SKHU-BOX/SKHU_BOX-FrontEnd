"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    /*
     * ✅ CSS module → Tailwind 변환 패턴:
     *
     * position: fixed → fixed
     * top:0; left:0; right:0 → top-0 left-0 right-0  또는  inset-x-0 top-0
     * z-index: 100 → z-[100]
     * display: flex; align-items: center → flex items-center
     * justify-content: space-between → justify-between
     * transition: all 0.3s → transition-all duration-300
     *
     * 조건부 스타일: CSS module에서 styles.scrolled 토글했던 걸
     * Tailwind에서는 삼항연산자로 클래스를 조건부 추가
     */
    <nav
      className={`
        fixed top-0 inset-x-0 z-[100]
        flex items-center justify-between
        transition-all duration-300
        ${
          isScrolled
            ? "bg-brand-dark/95 backdrop-blur-xl py-3.5 px-[60px] shadow-lg" /* 스크롤 시 */
            : "py-5 px-[60px]" /* 기본 */
        }
        max-md:px-6 max-md:py-4
      `}
      /* max-md: = @media (max-width: 768px) 와 동일 */
    >
      {/* ===== 로고 ===== */}
      {/*
       * text-xl = font-size: 20px
       * font-black = font-weight: 900
       * no-underline = text-decoration: none
       * gap-2 = gap: 8px (Tailwind은 4px 단위, 2 = 8px)
       */}
      <Link href="/" className="flex items-center gap-2 text-xl font-black text-white no-underline">
        {/*
         * bg-white/20 = background: rgba(255,255,255, 0.2)
         * 이게 Tailwind의 "색상/투명도" 문법이야!
         * bg-white = #fff, /20 = opacity 20% = 0.2
         */}
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
          <svg className="w-[18px] h-[18px] fill-white" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" />
          </svg>
        </div>
        SKHUBox
      </Link>

      {/* ===== 네비 링크 ===== */}
      {/*
       * gap-8 = gap: 32px
       * text-sm = font-size: 14px
       * text-white/80 = color: rgba(255,255,255, 0.8)
       * hover:text-white = 마우스 올리면 흰색으로 (CSS의 :hover)
       * transition-colors = color 관련 속성만 transition
       */}
      <div className="flex items-center gap-8">
        {["서비스 소개", "이용방법", "FAQ"].map((label) => (
          <Link key={label} href="#" className="text-sm text-white/80 font-medium hover:text-white transition-colors">
            {label}
          </Link>
        ))}

        {/*
         * rounded-full = border-radius: 9999px (완전 둥근 모양)
         * hover:-translate-y-0.5 = hover 시 위로 2px 이동
         */}
        <Link
          href="/login"
          className="
            text-sm font-semibold bg-white text-brand-dark
            px-5 py-2 rounded-full
            hover:-translate-y-0.5 hover:shadow-lg
            transition-all duration-200
          "
        >
          로그인
        </Link>
      </div>
    </nav>
  );
}
