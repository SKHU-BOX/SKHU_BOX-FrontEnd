"use client";

import { useState } from "react";

interface AdminRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (data: { name: string; studentId: string; dept: string; email: string }) => void;
}

const selectArrow = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
} as const;

const inputClass =
  "w-full h-[42px] px-4 border border-gray-200 rounded-[10px] text-sm text-gray-900 bg-white outline-none font-sans focus:border-brand transition-colors placeholder:text-gray-300";

export default function AdminRegisterModal({ isOpen, onClose, onRegister }: AdminRegisterModalProps) {
  const [form, setForm] = useState({ name: "", studentId: "", dept: "IT융합자율학부", email: "" });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.studentId || !form.email) return;
    onRegister(form);
    setForm({ name: "", studentId: "", dept: "IT융합자율학부", email: "" });
    onClose();
  };

  return (
    /* 배경 오버레이 */
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* 모달 본체 — onClick 전파 차단 */}
      <div
        className="bg-white rounded-2xl w-full max-w-[440px] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.15)] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-gray-900">관리자 등록</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 border-none bg-gray-100 rounded-full cursor-pointer text-sm text-gray-400 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>

        <p className="text-[13px] text-gray-400 mb-6">
          새로운 관리자의 정보를 입력해 주세요. 등록 후 해당 학교 이메일로 안내가 전송됩니다.
        </p>

        {/* 폼 */}
        <div className="flex flex-col gap-4">
          {/* 이름 */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">이름</label>
            <input name="name" className={inputClass} value={form.name} onChange={handleChange} placeholder="홍길동" />
          </div>

          {/* 학번 */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">학번</label>
            <input
              name="studentId"
              className={inputClass}
              value={form.studentId}
              onChange={handleChange}
              placeholder="202611111"
            />
          </div>

          {/* 학부 */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">학부</label>
            <select
              name="dept"
              className={`${inputClass} appearance-none cursor-pointer pr-10`}
              value={form.dept}
              onChange={handleChange}
              style={selectArrow}
            >
              <option>IT융합자율학부</option>
              <option>사회융합자율학부</option>
              <option>문화융합자율학부</option>
            </select>
          </div>

          {/* 이메일 */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">학교 이메일</label>
            <div className="relative">
              <input
                name="email"
                className={inputClass}
                value={form.email}
                onChange={handleChange}
                placeholder="@office.skhu.ac.kr"
              />
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 mt-7">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-200 rounded-xl text-[14px] font-semibold text-gray-500 bg-white cursor-pointer font-sans hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 border-none rounded-xl bg-gradient-to-br from-[#3a7d5c] to-[#5cb882] text-white text-[14px] font-bold cursor-pointer font-sans hover:opacity-90 transition-opacity"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
