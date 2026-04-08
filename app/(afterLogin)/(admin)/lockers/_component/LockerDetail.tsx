"use client";

import { useState } from "react";
import type { LockerItem } from "./type";

interface LockerDetailProps {
  locker: LockerItem;
  onClose: () => void;
}

type StatusKey = "available" | "inUse" | "broken" | "expired";

const statusLabels: Record<StatusKey, string> = {
  available: "사용 가능",
  inUse: "사용중",
  broken: "고장",
  expired: "사용중",
};

const statusBgColors: Record<StatusKey, string> = {
  available: "bg-brand",
  inUse: "bg-red-500",
  broken: "bg-gray-400",
  expired: "bg-red-500",
};

/*
 * ✅ 상태 변경 버튼 — 활성/비활성 스타일 매핑
 * CSS module에서 .statusBtnActive, .statusBtnActiveInUse 등
 * 여러 클래스를 만들었던 걸 객체 맵으로 처리
 */
const statusBtnStyles: Record<StatusKey, string> = {
  available: "bg-green-50 border-brand text-green-800",
  inUse: "bg-red-50 border-red-500 text-red-800",
  broken: "bg-gray-100 border-gray-400 text-gray-600",
  expired: "bg-orange-50 border-orange-500 text-orange-800",
};

export default function LockerDetail({ locker, onClose }: LockerDetailProps) {
  const [currentStatus, setCurrentStatus] = useState<StatusKey>(locker.status);

  const infoRows = [
    { label: "건물", value: locker.building },
    { label: "위치", value: `${locker.floor} ${locker.zone}` },
    ...(locker.userName
      ? [
          { label: "사용자", value: `${locker.userName} · ${locker.userStudentId}` },
          { label: "학부", value: locker.userDept || "" },
        ]
      : []),
    ...(locker.period ? [{ label: "이용 기간", value: `${locker.period} (${locker.dDay})` }] : []),
  ];

  const statusButtons: { key: StatusKey; label: string }[] = [
    { key: "available", label: "사용 가능" },
    { key: "inUse", label: "사용중" },
    { key: "broken", label: "고장" },
    { key: "expired", label: "해제" },
  ];

  return (
    /*
     * sticky top-6 = 스크롤해도 상단에 고정
     * max-[1000px]:static = 1000px 이하에서는 고정 해제
     * max-[1000px]:w-full = 1000px 이하에서 전체 폭
     */
    <div
      className="
      w-[300px] min-w-[300px] bg-white rounded-2xl p-[22px]
      shadow-[0_1px_4px_rgba(0,0,0,0.04)]
      flex flex-col gap-[18px]
      sticky top-6
      max-[1000px]:static max-[1000px]:w-full max-[1000px]:min-w-0
    "
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-extrabold text-gray-900">사물함 상세</h3>
        <button
          onClick={onClose}
          className="w-7 h-7 border-none bg-gray-100 rounded-full cursor-pointer text-xs text-gray-400 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* 사물함 배지 */}
      <div
        className={`
        flex flex-col items-center justify-center gap-1.5
        py-7 px-5 rounded-2xl text-white
        ${statusBgColors[currentStatus]}
      `}
      >
        <svg
          className="w-8 h-8 stroke-white/70"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
        <span className="text-2xl font-black tracking-widest">{locker.id}</span>
        <span className="text-xs font-semibold bg-white/20 px-3 py-0.5 rounded-md">{statusLabels[currentStatus]}</span>
      </div>

      {/* 정보 테이블 */}
      <div className="flex flex-col divide-y divide-gray-50">
        {infoRows.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-2.5">
            <span className="text-[13px] text-gray-400">{row.label}</span>
            <span className="text-[13px] font-semibold text-gray-900 text-right">{row.value}</span>
          </div>
        ))}
      </div>

      {/* 상태 변경 */}
      <div className="flex flex-col gap-2.5">
        <span className="text-[13px] font-bold text-gray-900">상태 변경</span>
        <div className="flex gap-1.5">
          {statusButtons.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setCurrentStatus(key)}
              className={`
                flex-1 py-2 border rounded-lg
                text-xs font-semibold cursor-pointer font-sans
                transition-all duration-150
                ${
                  currentStatus === key
                    ? statusBtnStyles[key] /* 활성: 색상 배경 + 색상 테두리 */
                    : "bg-white border-gray-200 text-gray-400 hover:border-gray-300" /* 비활성 */
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex flex-col gap-2">
        <button
          className="
          w-full py-3 border-none rounded-xl
          bg-gradient-to-br from-[#3a7d5c] to-[#5cb882]
          text-white text-sm font-bold font-sans cursor-pointer
          hover:opacity-90 transition-opacity
        "
        >
          변경 사항 저장
        </button>
        <button
          className="
          w-full py-2.5 bg-white text-gray-900
          border border-gray-200 rounded-[10px]
          text-[13px] font-semibold font-sans cursor-pointer
          hover:bg-gray-50 transition-colors
        "
        >
          사용자 변경
        </button>
        <button
          className="
          w-full py-2.5 bg-white text-red-500
          border border-red-500 rounded-[10px]
          text-[13px] font-semibold font-sans cursor-pointer
          hover:bg-red-50 transition-colors
        "
        >
          강제 해제
        </button>
      </div>
    </div>
  );
}
