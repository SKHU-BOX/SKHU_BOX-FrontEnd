"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiBox } from "react-icons/fi";

type Role = null | "student" | "admin";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>(null);

  return (
    /*
     * ✅ 레이아웃 변환 정리:
     * display: flex → flex
     * width: 100dvw; height: 100dvh → w-dvw h-dvh
     * flex-direction: row → flex-row (기본값이라 생략 가능)
     */
    <div className="flex w-dvw h-dvh">
      {/* ===== 왼쪽: 로그인 폼 영역 ===== */}
      {/*
       * w-[540px] = width: 540px
       * min-w-[540px] = min-width: 540px
       * overflow-y-auto = overflow-y: auto (세로 스크롤)
       * max-md: = @media (max-width: 768px)
       */}
      <div
        className="
        flex flex-col items-center
        w-[540px] min-w-[540px] h-dvh bg-[#f8f8f8]
        overflow-y-auto
        max-md:w-full max-md:min-w-0
      "
      >
        {/* 내부 컨텐츠 래퍼 */}
        <div className="w-full max-w-[360px] py-[50px] flex flex-col min-h-full max-md:px-6">
          {/* 로고 */}
          <div className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-8">
            <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center">
              <FiBox className="w-[18px] h-[18px] text-white" />
            </div>
            SKHUBOX
          </div>

          {/* 환영 메시지 */}
          <p className="text-[15px] font-semibold text-brand mb-2">환영합니다</p>
          {/*
           * text-4xl = font-size: 36px
           * tracking-tight = letter-spacing: -0.025em
           */}
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2.5">로그인</h1>

          {/* ===== 역할 미선택: 역할 선택 버튼 ===== */}
          {role === null && (
            <>
              <p className="text-sm text-gray-400 mb-7">로그인 유형을 선택해 주세요</p>

              <div className="flex flex-col gap-3 mb-1">
                {/* 역할 선택 카드 */}
                {/*
                 * hover:border-brand = 마우스 올리면 border 색상 변경
                 * hover:shadow-[...] = 마우스 올리면 box-shadow 변경
                 * text-left = text-align: left (button은 기본 center)
                 */}
                <button
                  className="
                    flex items-center gap-3.5 w-full
                    p-[18px] bg-white border border-gray-200 rounded-[14px]
                    cursor-pointer text-left font-sans
                    hover:border-brand hover:shadow-[0_2px_12px_rgba(74,140,102,0.1)]
                    transition-all duration-200
                  "
                  onClick={() => setRole("student")}
                >
                  <div className="w-11 h-11 bg-[#f0f7f2] rounded-xl flex items-center justify-center shrink-0">
                    <svg
                      className="w-[22px] h-[22px] text-brand"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1">
                    <span className="text-[15px] font-bold text-gray-900">학생으로 로그인</span>
                    <span className="text-xs text-gray-400">사물함 신청 및 관리</span>
                  </div>
                  <span className="text-lg text-gray-300 group-hover:text-brand transition-colors">→</span>
                </button>

                <button
                  className="
                    flex items-center gap-3.5 w-full
                    p-[18px] bg-white border border-gray-200 rounded-[14px]
                    cursor-pointer text-left font-sans
                    hover:border-brand hover:shadow-[0_2px_12px_rgba(74,140,102,0.1)]
                    transition-all duration-200
                  "
                  onClick={() => setRole("admin")}
                >
                  <div className="w-11 h-11 bg-[#f0f7f2] rounded-xl flex items-center justify-center shrink-0">
                    <svg
                      className="w-[22px] h-[22px] text-brand"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1">
                    <span className="text-[15px] font-bold text-gray-900">관리자로 로그인</span>
                    <span className="text-xs text-gray-400">사물함 현황 관리</span>
                  </div>
                  <span className="text-lg text-gray-300">→</span>
                </button>
              </div>

              {/* 구분선 — before/after를 flex + 가상요소 대신 직접 div로 */}
              <div className="flex items-center gap-4 my-7">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-[13px] text-gray-400">또는</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <p className="text-center text-sm text-gray-500">
                아직 계정이 없으신가요?{" "}
                <a href="/signup" className="font-bold text-brand no-underline hover:underline">
                  회원가입
                </a>
              </p>
            </>
          )}

          {/* ===== 역할 선택 후: 로그인 폼 ===== */}
          {role !== null && (
            <>
              <p className="text-sm text-gray-400 mb-7">{role === "student" ? "학생으" : "관리자"}로 로그인</p>

              {/* 선택된 역할 칩 */}
              <div className="flex items-center justify-between bg-[#f0f7f2] border border-[#d4e8da] rounded-[10px] px-4 py-2.5 mb-6">
                <span className="text-sm font-semibold text-green-700">
                  {role === "student" ? "🎓 학생" : "🔐 관리자"}
                </span>
                <button
                  className="text-[13px] font-semibold text-brand bg-transparent border-none cursor-pointer font-sans hover:underline"
                  onClick={() => setRole(null)}
                >
                  변경
                </button>
              </div>

              {/* 입력 필드 */}
              {/*
               * focus:border-brand = 포커스 시 테두리 색상 변경
               * outline-none = outline 제거
               * placeholder:text-gray-300 = placeholder 색상
               */}
              <div className="mb-5">
                <label htmlFor="studentId" className="block text-sm font-semibold text-gray-900 mb-2">
                  학번
                </label>
                <input
                  id="studentId"
                  type="text"
                  placeholder="202111111"
                  className="
                    w-full h-12 px-4 border border-gray-200 rounded-[10px]
                    text-sm text-gray-900 bg-white outline-none font-sans
                    focus:border-brand transition-colors
                    placeholder:text-gray-300
                  "
                />
              </div>

              <div className="mb-5">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                  비밀번호
                </label>
                <input
                  id="password"
                  type="password"
                  className="
                    w-full h-12 px-4 border border-gray-200 rounded-[10px]
                    text-sm text-gray-900 bg-white outline-none font-sans
                    focus:border-brand transition-colors
                    placeholder:text-gray-300
                  "
                />
              </div>

              {/* 비밀번호 찾기 */}
              <div className="flex justify-end mb-7">
                <a
                  href="/login/findpassword"
                  className="text-[13px] font-medium text-brand no-underline hover:underline"
                >
                  비밀번호 찾기
                </a>
              </div>

              {/* 로그인 버튼 */}
              {/*
               * bg-gradient-to-br = background: linear-gradient(to bottom right, ...)
               * from-[#3a7d5c] to-[#5cb882] = 시작색 → 끝색
               */}
              <button
                className="
                  w-full h-[52px] border-none rounded-xl
                  bg-gradient-to-br from-[#3a7d5c] to-[#5cb882]
                  text-white text-base font-bold font-sans
                  cursor-pointer hover:opacity-90 transition-opacity
                "
                onClick={() => {
                  document.cookie = `role=${role}; path=/`;
                  router.push(role === "admin" ? "/admindashboard" : "/dashboard");
                }}
              >
                로그인
              </button>

              {/* 구분선 */}
              <div className="flex items-center gap-4 my-7">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-[13px] text-gray-400">또는</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <p className="text-center text-sm text-gray-500">
                아직 계정이 없으신가요?{" "}
                <a href="/signup" className="font-bold text-brand no-underline hover:underline">
                  회원가입
                </a>
              </p>
            </>
          )}

          {/* 카피라이트 — mt-auto = margin-top: auto (하단 고정) */}
          <p className="mt-auto pt-[60px] text-xs text-gray-300">©2026 SKHUBOX 성공회대학교 사물함 예약 서비스</p>
        </div>
      </div>

      {/* 오른쪽 빈 영역 — max-md:hidden = 모바일에서 숨김 */}
      <div className="flex-1 bg-white max-md:hidden" />
    </div>
  );
}
