"use client";

interface LockerFilterProps {
  stats: { available: number; inUse: number; broken: number };
}

const selectArrow = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
} as const;

const selectClass = `
  h-[38px] px-3 pr-8 border border-gray-200 rounded-[10px]
  text-[13px] font-semibold text-gray-900 bg-white
  appearance-none outline-none font-sans
  focus:border-brand transition-colors cursor-pointer
`;

export default function LockerFilter({ stats }: LockerFilterProps) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      {/* 필터 드롭다운 + 검색 */}
      <div className="flex gap-2 items-center flex-wrap">
        <select className={selectClass} style={selectArrow}>
          <option>새천년관</option>
          <option>정보과학관</option>
        </select>
        <select className={selectClass} style={selectArrow}>
          <option>3층</option>
          <option>2층</option>
          <option>1층</option>
        </select>
        <select className={selectClass} style={selectArrow}>
          <option>전체 상태</option>
          <option>사용 가능</option>
          <option>사용중</option>
          <option>고장</option>
        </select>

        {/* 검색 — relative로 아이콘 겹치기 */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px]">🔍</span>
          <input
            type="text"
            placeholder="사물함 번호 또는 학생 이름을 검색..."
            className="
              h-[38px] w-[260px] pl-9 pr-3
              border border-gray-200 rounded-[10px]
              text-[13px] text-gray-900 bg-white
              outline-none font-sans
              focus:border-brand transition-colors
              placeholder:text-gray-300
              max-md:w-full
            "
          />
        </div>
      </div>

      {/* 통계 도트 */}
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-brand" />
        <span className="text-xs font-semibold text-gray-500 mr-2">가능 {stats.available}</span>
        <span className="w-2 h-2 rounded-full bg-red-500" />
        <span className="text-xs font-semibold text-gray-500 mr-2">사용중 {stats.inUse}</span>
        <span className="w-2 h-2 rounded-full bg-orange-500" />
        <span className="text-xs font-semibold text-gray-500">고장 {stats.broken}</span>
      </div>
    </div>
  );
}
