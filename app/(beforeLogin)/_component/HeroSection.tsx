"use client";

import { useState } from "react";
import LockerGrid from "./LockerGrid";

type LockerStatus = "available" | "occupied" | "mine" | "broken";

const LOCKER_STATUSES: LockerStatus[] = [
  "available",
  "occupied",
  "available",
  "occupied",
  "available",
  "mine",
  "occupied",
  "available",
  "broken",
  "occupied",
  "available",
  "available",
  "available",
  "occupied",
  "occupied",
  "available",
  "occupied",
  "available",
  "occupied",
  "available",
  "available",
  "occupied",
  "available",
  "available",
  "available",
  "occupied",
  "available",
  "available",
  "occupied",
  "occupied",
];

export default function HeroSection() {
  const [selectedLocker, setSelectedLocker] = useState(4);
  const selectedStatus = LOCKER_STATUSES[selectedLocker];

  return (
    /*
     * ✅ 자주 쓰는 레이아웃 변환:
     * position: relative → relative
     * width: 100% → w-full
     * min-height: 100vh → min-h-screen  (screen = 100vh)
     * overflow: hidden → overflow-hidden
     * display: flex; align-items: center → flex items-center
     */
    <section className="relative w-full min-h-screen overflow-hidden flex items-center">
      {/* ===== 배경 (복잡한 gradient는 globals.css에 정의) ===== */}
      <div className="hero-bg-gradient absolute inset-0 z-0" />

      {/*
       * 대각선 스트라이프
       * w-[120%] = width: 120% (기본값에 없는 건 [] 안에)
       * -rotate-[8deg] = transform: rotate(-8deg)
       * -left-[10%] = left: -10%
       */}
      <div
        className="absolute z-[1] w-[120%] h-[220px] -rotate-[8deg] -left-[10%]"
        style={{ top: "60px", background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))" }}
      />
      <div
        className="absolute z-[1] w-[120%] h-[160px] -rotate-[5deg] -left-[10%]"
        style={{ top: "200px", background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))" }}
      />

      {/* 물결 도형 — rounded-full = border-radius: 50%, opacity-[0.12] = 커스텀 opacity */}
      <div className="absolute z-[1] w-[600px] h-[600px] rounded-full opacity-[0.12] animate-float-wave -top-[200px] -right-[100px] bg-gradient-to-br from-white/30 to-brand-lightest/10" />
      <div className="absolute z-[1] w-[400px] h-[400px] rounded-full opacity-[0.12] animate-float-wave delay-3000 -bottom-[100px] -left-[80px] bg-gradient-to-tl from-white/25 to-brand-light/10" />
      <div className="absolute z-[1] w-[300px] h-[300px] rounded-full opacity-[0.12] animate-float-wave delay-5000 top-[20%] left-[40%] bg-gradient-to-b from-white/20 to-transparent" />

      {/* 떠다니는 장식 오브젝트 */}
      <div className="absolute z-[2] w-[60px] h-[60px] rounded-full border-[8px] border-white/35 top-[12%] left-[42%] animate-float-obj delay-1000 rotate-[20deg]" />
      <div className="absolute z-[2] w-[18px] h-[18px] rounded-full bg-brand-accent/70 top-[8%] right-[12%] animate-float-obj delay-2000 shadow-[0_4px_20px_rgba(255,220,100,0.3)]" />
      <div className="absolute z-[2] w-3 h-3 rounded-full bg-white/50 bottom-[25%] left-[8%] animate-float-obj delay-4000" />
      <div className="absolute z-[2] w-6 h-6 rounded-[6px] bg-brand-light/40 top-[35%] right-[8%] animate-float-obj delay-3000 rotate-45" />
      <div className="absolute z-[2] w-[50px] h-5 rounded-[10px] bg-white/15 bottom-[18%] left-[15%] animate-float-obj delay-5000 -rotate-[20deg]" />

      {/* ===== 콘텐츠 영역 ===== */}
      <div
        className="
        relative z-10 max-w-[1200px] w-full mx-auto
        px-[60px] flex items-center justify-between gap-[60px]
        max-md:flex-col max-md:px-[30px] max-md:pt-[120px] max-md:pb-[60px] max-md:text-center
      "
      >
        {/* ===== 왼쪽: 텍스트 ===== */}
        <div className="flex-1 max-w-[520px]">
          {/* 배지 — backdrop-blur-[8px] = backdrop-filter: blur(8px) */}
          <div
            className="
            inline-flex items-center gap-1.5
            bg-white/[0.18] backdrop-blur-[8px]
            border border-white/25 rounded-[20px]
            px-4 py-1.5 text-[13px] font-medium text-white/95
            mb-7 opacity-0 animate-fade-up delay-200
          "
          >
            <span className="w-2 h-2 rounded-full bg-[#a0f0b0] shadow-[0_0_8px_rgba(160,240,176,0.6)]" />
            성공회대학교 공식 사물함 서비스
          </div>

          {/*
           * 타이틀
           * text-5xl = font-size: 48px
           * font-black = font-weight: 900
           * leading-tight = line-height: 1.25
           * tracking-tight = letter-spacing: -0.025em
           *
           * after: = ::after 가상 요소
           * after:content-[''] = content: ''
           * after:absolute = position: absolute
           */}
          <h1
            className="
            text-5xl font-black text-white leading-tight tracking-tight
            mb-5 opacity-0 animate-fade-up delay-400
            max-md:text-[34px]
          "
          >
            <span
              className="
              relative
              after:content-[''] after:absolute after:bottom-0.5 after:left-0
              after:w-full after:h-2 after:bg-brand-accent/40
              after:rounded after:-z-10
            "
            >
              내 사물함
            </span>
            ,<br />
            이제 쉽게 관리하자
          </h1>

          {/* text-[17px] = 기본값에 없는 font-size는 []로 지정 */}
          <p
            className="
            text-[17px] text-white/85 leading-[1.75]
            mb-9 opacity-0 animate-fade-up delay-600
          "
          >
            나에게 맞는 건물에서, 원하는 층에서
            <br />
            클릭 한번으로 사물함 신청부터 관리까지
            <br />
            SKHUBox에서 더 편하게 !
          </p>

          {/* CTA 버튼 */}
          <a
            href="/login"
            className="
            inline-flex items-center gap-2.5
            bg-white text-brand-dark text-base font-bold
            px-9 py-4 rounded-full no-underline
            shadow-[0_8px_30px_rgba(0,0,0,0.15)]
            hover:-translate-y-[3px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)]
            transition-all duration-300
            opacity-0 animate-fade-up delay-800
          "
          >
            사물함 신청하기
            <span className="transition-transform duration-300">→</span>
          </a>
        </div>

        {/* ===== 오른쪽: 폰 목업 ===== */}
        <div className="shrink-0 relative opacity-0 animate-fade-right delay-600 max-md:mt-5">
          {/* 떠다니는 알림 토스트 */}
          <div
            className="
            absolute -right-[60px] top-[80px] z-[15]
            bg-white rounded-[14px] px-4 py-2.5
            shadow-[0_8px_30px_rgba(0,0,0,0.12)]
            flex items-center gap-2.5
            animate-float-slow delay-2000
            max-md:-right-[10px] max-md:top-[50px]
          "
          >
            <div className="w-2 h-2 bg-locker-available rounded-full shrink-0" />
            <span className="text-[13px] text-gray-700 font-medium whitespace-nowrap">1A-05 사물함 배정 완료!</span>
          </div>

          {/* 떠다니는 잔여 사물함 카드 */}
          <div
            className="
            absolute -left-[70px] bottom-[80px] z-[15]
            bg-white rounded-2xl px-[18px] py-3.5
            shadow-[0_12px_40px_rgba(0,0,0,0.15)]
            flex items-center gap-3
            animate-float
            max-md:left-0 max-md:bottom-[40px]
          "
          >
            <div className="w-10 h-10 bg-gradient-to-br from-locker-available to-green-400 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-medium">잔여 사물함</span>
              <span className="text-base font-bold text-gray-900">24개 남음</span>
            </div>
          </div>

          {/* 폰 프레임 — phone-shadow는 globals.css에 정의된 복합 그림자 */}
          <div className="w-[380px] h-[720px] bg-white rounded-[36px] phone-shadow overflow-hidden relative">
            <div className="w-full h-full bg-gradient-to-b from-brand-dark to-brand-mid pt-8 px-6 pb-6 flex flex-col">
              {/* 스크린 헤더 */}
              <div className="mb-6">
                <span className="text-lg font-black text-white tracking-wide">SKHUBOX</span>
              </div>

              <div className="mb-6">
                <div className="text-sm text-white/75 font-medium mb-1">안녕하세요</div>
                <div className="text-[22px] font-extrabold text-white">사용자님</div>
              </div>

              {/* 사물함 카드 */}
              <div className="bg-white rounded-3xl p-[22px] flex-1 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between mb-[18px]">
                  <span className="text-base font-extrabold text-gray-900">새천년관 2층 A구역</span>
                  <span className="text-xs bg-green-50 text-green-700 px-3 py-0.5 rounded-[10px] font-semibold">
                    신청가능
                  </span>
                </div>

                <LockerGrid
                  statuses={[...LOCKER_STATUSES]}
                  selectedIndex={selectedLocker}
                  onSelect={setSelectedLocker}
                />

                {/* 하단 신청 버튼 */}
                <div className="flex justify-end mt-auto">
                  <button
                    className={`
                      text-[11px] text-white border-none
                      px-4 py-2 rounded-[20px] font-semibold
                      transition-colors duration-200
                      ${
                        selectedStatus === "available"
                          ? "bg-brand-dark hover:bg-brand-mid cursor-pointer"
                          : "bg-gray-300 cursor-not-allowed"
                      }
                    `}
                    disabled={selectedStatus !== "available"}
                  >
                    신청하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
