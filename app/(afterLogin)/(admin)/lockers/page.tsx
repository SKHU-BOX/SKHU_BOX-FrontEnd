"use client";

import { useState } from "react";
import type { LockerItem } from "./_component/type";
import LockerFilter from "./_component/LockerFilter";
import LockerTable from "./_component/LockerTable";
import LockerDetail from "./_component/LockerDetail";

const MOCK_LOCKERS: LockerItem[] = [
  { id: "3A-01", building: "새천년관", floor: "3층", zone: "A구역", status: "available" },
  {
    id: "3A-02",
    building: "새천년관",
    floor: "3층",
    zone: "A구역",
    userName: "김도현",
    userDept: "IT융합자율학부",
    userStudentId: "20220134",
    status: "inUse",
    period: "03.02 ~ 06.30",
    dDay: "D-97",
  },
  { id: "3A-03", building: "새천년관", floor: "3층", zone: "A구역", status: "available" },
  {
    id: "3A-04",
    building: "새천년관",
    floor: "3층",
    zone: "A구역",
    userName: "박서연",
    userDept: "소프트웨어공학과",
    userStudentId: "20230466",
    status: "expired",
    period: "03.02 ~ 04.01",
    dDay: "D-7 만료임박",
  },
  {
    id: "3A-05",
    building: "새천년관",
    floor: "3층",
    zone: "A구역",
    userName: "이병주",
    userDept: "소프트웨어공학과",
    userStudentId: "20211234",
    status: "inUse",
    period: "03.02 ~ 06.30",
    dDay: "D-97",
  },
  { id: "3A-06", building: "새천년관", floor: "3층", zone: "A구역", status: "available" },
  {
    id: "3A-07",
    building: "새천년관",
    floor: "3층",
    zone: "A구역",
    userName: "정하늘",
    userDept: "글로벌융합학부",
    userStudentId: "20241789",
    status: "inUse",
    period: "03.05 ~ 06.30",
    dDay: "D-97",
  },
  { id: "3A-08", building: "새천년관", floor: "3층", zone: "A구역", status: "broken" },
  {
    id: "3A-09",
    building: "새천년관",
    floor: "3층",
    zone: "A구역",
    userName: "송민지",
    userDept: "영어학과",
    userStudentId: "20211567",
    status: "inUse",
    period: "03.02 ~ 06.30",
    dDay: "D-97",
  },
  { id: "3A-10", building: "새천년관", floor: "3층", zone: "A구역", status: "available" },
];

export default function LockerManagementPage() {
  const [selectedId, setSelectedId] = useState<string | null>("3A-05");
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set(["3A-05"]));

  const selectedLocker = MOCK_LOCKERS.find((l) => l.id === selectedId) || null;

  const handleCheck = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCheckAll = () => {
    if (checkedIds.size === MOCK_LOCKERS.length) setCheckedIds(new Set());
    else setCheckedIds(new Set(MOCK_LOCKERS.map((l) => l.id)));
  };

  const stats = {
    available: MOCK_LOCKERS.filter((l) => l.status === "available").length,
    inUse: MOCK_LOCKERS.filter((l) => l.status === "inUse" || l.status === "expired").length,
    broken: MOCK_LOCKERS.filter((l) => l.status === "broken").length,
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* 헤더 */}
      <div className="flex items-start justify-between max-md:flex-col max-md:gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-1.5">사물함 관리</h1>
          <p className="text-[13px] text-gray-400">
            새천년관·정보과학관의 사물함 상태를 관리하고, 사용자를 조회·변경할 수 있습니다.
          </p>
        </div>
        <button
          className="
          flex items-center gap-1.5
          bg-brand-dark text-white text-[13px] font-bold
          px-5 py-2.5 rounded-[10px] border-none
          cursor-pointer font-sans whitespace-nowrap
          hover:bg-[#155a32] transition-colors
        "
        >
          + 사물함 추가
        </button>
      </div>

      {/* 필터 */}
      <LockerFilter stats={stats} />

      {/* 테이블 + 디테일 패널 */}
      <div className="flex gap-5 items-start max-[1000px]:flex-col">
        {/* 왼쪽: 테이블 + 하단 바 */}
        <div className="flex-1 min-w-0 flex flex-col">
          <LockerTable
            lockers={MOCK_LOCKERS}
            selectedId={selectedId}
            checkedIds={checkedIds}
            onSelect={setSelectedId}
            onCheck={handleCheck}
            onCheckAll={handleCheckAll}
          />

          {/* 하단 일괄 작업 바 */}
          <div
            className="
            flex items-center justify-between
            bg-white rounded-b-2xl border-t border-gray-100
            px-5 py-3
          "
          >
            <span className="text-[13px] font-semibold text-gray-500">{checkedIds.size}개 선택됨</span>
            <div className="flex gap-2 flex-wrap">
              {[
                { label: "✓ 일괄 활성화", danger: false },
                { label: "🔧 일괄 고장 처리", danger: false },
                { label: "✕ 일괄 강제 해제", danger: true },
                { label: "📋 선택 내보내기", danger: false },
              ].map((btn) => (
                <button
                  key={btn.label}
                  className={`
                    text-xs font-semibold px-3.5 py-1.5
                    border rounded-lg bg-transparent
                    cursor-pointer font-sans whitespace-nowrap
                    transition-colors
                    ${
                      btn.danger
                        ? "text-red-500 border-red-500 hover:bg-red-50"
                        : "text-gray-500 border-gray-200 hover:bg-gray-50"
                    }
                  `}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽: 디테일 패널 */}
        {selectedLocker && <LockerDetail locker={selectedLocker} onClose={() => setSelectedId(null)} />}
      </div>
    </div>
  );
}
