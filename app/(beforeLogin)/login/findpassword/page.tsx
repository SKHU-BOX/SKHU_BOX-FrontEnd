"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiBox } from "react-icons/fi";

type Phase = "email" | "verify" | "reset";

export default function FindPasswordPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (phase !== "verify" || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

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

  // 반복 클래스 변수
  const inputClass =
    "w-full h-[42px] min-h-[42px] shrink-0 px-4 border border-gray-200 rounded-[10px] text-sm text-gray-900 bg-white outline-none font-sans focus:border-brand transition-colors placeholder:text-gray-300";
  const btnClass =
    "w-full h-[46px] min-h-[46px] shrink-0 rounded-xl bg-gradient-to-br from-[#3a7d5c] to-[#5cb882] text-white text-[15px] font-bold font-sans border-none cursor-pointer hover:opacity-90 transition-opacity mt-2";

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

          {/* ===== Phase 1: 이메일 ===== */}
          {phase === "email" && (
            <>
              <h1 className="text-[28px] font-black text-gray-900 tracking-tight mb-1.5">비밀번호 찾기</h1>
              <p className="text-[13px] text-gray-400 mb-6 leading-relaxed">
                가입 시 등록한 학교 이메일을 입력해 주세요.
                <br />
                인증번호를 보내드립니다.
              </p>

              <div className="mb-3.5">
                <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">학교 이메일</label>
                <div className="relative">
                  <input
                    className={inputClass}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="학번"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
                    @office.skhu.ac.kr
                  </span>
                </div>
              </div>

              <button
                className={btnClass}
                onClick={() => {
                  setTimeLeft(300);
                  setPhase("verify");
                }}
              >
                인증번호 발송
              </button>

              <p className="text-center text-[13px] text-gray-500 mt-4">
                <a href="/login" className="font-bold text-brand no-underline hover:underline">
                  로그인으로 돌아가기
                </a>
              </p>
            </>
          )}

          {/* ===== Phase 2: 인증코드 ===== */}
          {phase === "verify" && (
            <>
              <h1 className="text-[28px] font-black text-gray-900 tracking-tight mb-1.5">인증번호 입력</h1>
              <p className="text-[13px] text-gray-400 mb-6">학교 이메일로 전송된 6자리 인증코드를 입력해주세요.</p>

              <div className="flex items-start gap-3.5 bg-[#f0f7f2] border border-[#d4e8da] rounded-[14px] p-[18px] mb-7">
                <div className="w-9 h-9 bg-brand rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-[18px] h-[18px] fill-white" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-gray-900">{email}@office.skhu.ac.kr 로</span>
                  <span className="text-[13px] text-gray-500 leading-relaxed">
                    인증 번호를 전송했습니다.
                    <br />
                    메일함을 확인해 주세요.
                  </span>
                </div>
              </div>

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
                      className="w-[52px] h-[60px] border border-gray-200 rounded-xl text-[22px] font-bold text-center text-gray-900 bg-white outline-none font-sans focus:border-brand transition-colors"
                    />
                  ))}
                </div>
              </div>

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

              <button className={btnClass} onClick={() => setPhase("reset")}>
                인증 확인
              </button>

              <p className="text-center text-[13px] text-gray-500 mt-4">
                <button
                  className="font-bold text-brand bg-transparent border-none cursor-pointer font-sans hover:underline"
                  onClick={() => setPhase("email")}
                >
                  이전 단계로 돌아가기
                </button>
              </p>
            </>
          )}

          {/* ===== Phase 3: 새 비밀번호 ===== */}
          {phase === "reset" && (
            <>
              <h1 className="text-[28px] font-black text-gray-900 tracking-tight mb-1.5">새 비밀번호 설정</h1>
              <p className="text-[13px] text-gray-400 mb-6">새로운 비밀번호를 입력해 주세요.</p>

              <div className="mb-3.5">
                <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">새로운 비밀번호</label>
                <input
                  type="password"
                  className={inputClass}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="mb-3.5">
                <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">새로운 비밀번호 확인</label>
                <input
                  type="password"
                  className={inputClass}
                  value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                />
              </div>

              <button className={btnClass} onClick={() => router.push("/login")}>
                비밀번호 변경
              </button>

              <p className="text-center text-[13px] text-gray-500 mt-4">
                <a href="/login" className="font-bold text-brand no-underline hover:underline">
                  로그인으로 돌아가기
                </a>
              </p>
            </>
          )}

          <p className="mt-auto pt-8 text-[11px] text-gray-300">©2026 SKHUBOX 성공회대학교 사물함 예약 서비스</p>
        </div>
      </div>
      <div className="flex-1 bg-white max-md:hidden" />
    </div>
  );
}
