"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiBox } from "react-icons/fi";

export default function SignupStep1() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    studentId: "",
    department: "IT융합자율학부",
    role: "학생",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /*
   * ✅ 공통 Tailwind 클래스 패턴 (회원가입 전체에서 반복):
   *
   * 인풋: w-full h-[42px] px-4 border border-gray-200 rounded-[10px] text-sm
   *       text-gray-900 bg-white outline-none font-sans
   *       focus:border-brand transition-colors placeholder:text-gray-300
   *
   * 라벨: block text-[13px] font-semibold text-gray-900 mb-1.5
   *
   * 초록 버튼: w-full h-[46px] rounded-xl bg-gradient-to-br from-[#3a7d5c] to-[#5cb882]
   *           text-white text-[15px] font-bold font-sans border-none cursor-pointer
   *           hover:opacity-90 transition-opacity mt-2
   */

  // 반복되는 인풋 클래스를 변수로 추출 (DRY 원칙)
  const inputClass = `
    w-full h-[42px] px-4 border border-gray-200 rounded-[10px]
    text-sm text-gray-900 bg-white outline-none font-sans
    focus:border-brand transition-colors placeholder:text-gray-300
    min-h-[42px] shrink-0
  `;

  const selectClass = `
    w-full h-[42px] px-4 border border-gray-200 rounded-[10px]
    text-sm text-gray-900 bg-white outline-none font-sans
    focus:border-brand transition-colors cursor-pointer
    appearance-none bg-no-repeat bg-[right_10px_center]
    min-h-[42px] shrink-0
  `;

  return (
    <div className="flex w-dvw h-dvh">
      <div className="flex flex-col items-center w-[540px] min-w-[540px] h-dvh bg-[#f8f8f8] overflow-y-auto max-md:w-full max-md:min-w-0">
        <div className="w-full max-w-[360px] py-9 flex flex-col min-h-full max-md:px-6 max-md:min-h-auto">
          {/* 로고 */}
          <div className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-3.5">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
              <FiBox className="w-[18px] h-[18px] text-white" />
            </div>
            SKHUBOX
          </div>

          {/* 스텝 배지 */}
          <div
            className="
            inline-flex items-center gap-1.5 w-fit
            text-[13px] font-semibold text-brand
            bg-green-50 border border-green-200 rounded-[20px]
            px-3 py-1 mb-4
          "
          >
            <span className="w-2 h-2 bg-brand rounded-full" />
            STEP 1 / 3
          </div>

          <h1 className="text-[28px] font-black text-gray-900 tracking-tight mb-1.5">기본 정보 입력</h1>
          <p className="text-[13px] text-gray-400 mb-6 leading-relaxed">
            개인 정보와 로그인에 사용할 비밀번호를 입력해 주세요.
          </p>

          {/* 이름 / 학번 — 2열 배치: flex gap-3 */}
          <div className="flex gap-3">
            <div className="flex-1 mb-3.5">
              <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">이름</label>
              <input name="name" className={inputClass} value={form.name} onChange={handleChange} />
            </div>
            <div className="flex-1 mb-3.5">
              <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">학번</label>
              <input name="studentId" className={inputClass} value={form.studentId} onChange={handleChange} />
            </div>
          </div>

          {/* 학부 / 역할 */}
          <div className="flex gap-3">
            <div className="flex-1 mb-3.5">
              <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">학부</label>
              <select
                name="department"
                className={selectClass}
                value={form.department}
                onChange={handleChange}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                }}
              >
                <option>IT융합자율학부</option>
                <option>사회융합자율학부</option>
                <option>문화융합자율학부</option>
              </select>
            </div>
            <div className="flex-1 mb-3.5">
              <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">역할</label>
              <select
                name="role"
                className={selectClass}
                value={form.role}
                onChange={handleChange}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                }}
              >
                <option>학생</option>
                <option>관리자</option>
              </select>
            </div>
          </div>

          {/* 학교 이메일 — relative로 suffix 겹치기 */}
          <div className="mb-3.5">
            <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">학교 이메일</label>
            <div className="relative">
              <input name="email" className={inputClass} value={form.email} onChange={handleChange} />
              {/*
               * pointer-events-none = 클릭 무시 (뒤에 있는 input 클릭 가능)
               * right-4 = right: 16px
               * top-1/2 -translate-y-1/2 = 세로 중앙 정렬
               */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
                @office.skhu.ac.kr
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">해당 이메일로 인증번호가 전송됩니다.</p>
          </div>

          {/* 비밀번호 */}
          <div className="mb-3.5">
            <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">비밀번호</label>
            <input
              name="password"
              type="password"
              className={inputClass}
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3.5">
            <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">비밀번호 확인</label>
            <input
              name="passwordConfirm"
              type="password"
              className={inputClass}
              value={form.passwordConfirm}
              onChange={handleChange}
            />
          </div>

          {/* 다음 단계 버튼 */}
          <button
            className="
              w-full h-[46px] min-h-[46px] shrink-0 rounded-xl
              bg-gradient-to-br from-[#3a7d5c] to-[#5cb882]
              text-white text-[15px] font-bold font-sans border-none
              cursor-pointer hover:opacity-90 transition-opacity mt-2
            "
            onClick={() => router.push("/signup/step2")}
          >
            다음 단계
          </button>

          <p className="text-center text-[13px] text-gray-500 mt-4">
            이미 계정이 있으신가요?{" "}
            <a href="/login" className="font-bold text-brand no-underline hover:underline">
              로그인
            </a>
          </p>

          <p className="mt-auto pt-8 text-[11px] text-gray-300">©2026 SKHUBOX 성공회대학교 사물함 예약 서비스</p>
        </div>
      </div>
      <div className="flex-1 bg-white max-md:hidden" />
    </div>
  );
}
