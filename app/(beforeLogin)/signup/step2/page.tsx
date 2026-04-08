"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiBox } from "react-icons/fi";

export default function SignupStep2() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(272);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")} : ${String(s % 60).padStart(2, "0")}`;

  const handleCodeChange = (i: number, v: string) => {
    if (v.length > 1) return;
    const next = [...code];
    next[i] = v;
    setCode(next);
    if (v && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[i] && i > 0) inputRefs.current[i - 1]?.focus();
  };

  return (
    <div className="flex w-dvw h-dvh">
      <div className="flex flex-col items-center w-[540px] min-w-[540px] h-dvh bg-[#f8f8f8] overflow-y-auto max-md:w-full max-md:min-w-0">
        <div className="w-full max-w-[360px] py-9 flex flex-col min-h-full max-md:px-6 max-md:min-h-auto">
          <div className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-3.5">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
              <FiBox className="w-[18px] h-[18px] text-white" />
            </div>
            SKHUBOX
          </div>

          <div className="inline-flex items-center gap-1.5 w-fit text-[13px] font-semibold text-brand bg-green-50 border border-green-200 rounded-[20px] px-3 py-1 mb-4">
            <span className="w-2 h-2 bg-brand rounded-full" />
            STEP 2 / 3
          </div>

          <h1 className="text-[28px] font-black text-gray-900 tracking-tight mb-1.5">인증번호 입력</h1>
          <p className="text-[13px] text-gray-400 mb-6">학교 이메일로 전송된 6자리 인증코드를 입력해주세요.</p>

          {/* 이메일 안내 박스 */}
          <div className="flex items-start gap-3.5 bg-[#f0f7f2] border border-[#d4e8da] rounded-[14px] p-[18px] mb-7">
            <div className="w-9 h-9 bg-brand rounded-full flex items-center justify-center shrink-0">
              <svg className="w-[18px] h-[18px] fill-white" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-gray-900">202111111@office.skhu.ac.kr 로</span>
              <span className="text-[13px] text-gray-500 leading-relaxed">
                인증 번호를 전송했습니다.
                <br />
                메일함을 확인해 주세요.
              </span>
            </div>
          </div>

          {/* 인증코드 6칸 입력 */}
          <div className="mb-2">
            <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">인증 코드</label>
            <div className="flex gap-2.5">
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="
                    w-[52px] h-[60px] border border-gray-200 rounded-xl
                    text-[22px] font-bold text-center text-gray-900
                    bg-white outline-none font-sans
                    focus:border-brand transition-colors
                  "
                />
              ))}
            </div>
          </div>

          {/* 타이머 + 재발송 */}
          <div className="flex items-center justify-between mb-7">
            <span className="text-sm font-bold text-red-500">⏱ {formatTime(timeLeft)}</span>
            <button
              className="text-sm font-semibold text-brand bg-transparent border-none cursor-pointer font-sans hover:underline"
              onClick={() => {
                setTimeLeft(300);
                setCode(["", "", "", "", "", ""]);
                inputRefs.current[0]?.focus();
              }}
            >
              인증코드 재발송
            </button>
          </div>

          <button
            className="w-full h-[46px] min-h-[46px] shrink-0 rounded-xl bg-gradient-to-br from-[#3a7d5c] to-[#5cb882] text-white text-[15px] font-bold font-sans border-none cursor-pointer hover:opacity-90 transition-opacity mt-2"
            onClick={() => router.push("/signup/step3")}
          >
            인증 확인
          </button>

          <p className="text-center text-[13px] text-gray-500 mt-4">
            <button
              className="font-bold text-brand bg-transparent border-none cursor-pointer font-sans hover:underline"
              onClick={() => router.push("/signup/step1")}
            >
              이전 단계로 돌아가기
            </button>
          </p>

          <p className="mt-auto pt-8 text-[11px] text-gray-300">©2026 SKHUBOX 성공회대학교 사물함 예약 서비스</p>
        </div>
      </div>
      <div className="flex-1 bg-white max-md:hidden" />
    </div>
  );
}
