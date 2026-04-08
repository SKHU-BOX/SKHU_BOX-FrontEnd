export default function MyLocker() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <h3 className="text-[15px] font-extrabold text-gray-900 mb-3.5">내 사물함</h3>
      <div className="flex items-center gap-6 max-md:flex-col max-md:items-start">
        {/* 사물함 배지 */}
        <div className="w-[90px] h-[90px] bg-green-50 rounded-[14px] flex flex-col items-center justify-center gap-1.5 shrink-0">
          <svg
            className="w-[22px] h-[22px] text-brand"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          <span className="text-base font-extrabold text-brand tracking-wider">3A - 05</span>
        </div>

        {/* 정보 컬럼들 — flex-1로 균등 분배 */}
        <div className="flex items-center flex-1 max-md:flex-wrap max-md:gap-4">
          {[
            { label: "건물", value: "새천년관", sub: "3층 A구역 05번" },
            { label: "상태", value: "정상", sub: "사용중", valueColor: "text-brand" },
            { label: "사용 기간", value: "117일", sub: "03.02 ~ 05.20" },
            { label: "남은 기간", value: "97일", sub: "D - 97" },
          ].map((col, i, arr) => (
            <div key={col.label} className="flex items-center flex-1">
              {/* 구분선 (첫번째 제외) */}
              {i > 0 && <div className="w-px h-10 bg-gray-100 mr-5 max-md:hidden" />}
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] text-gray-400 font-medium">{col.label}</span>
                <span className={`text-base font-extrabold ${col.valueColor || "text-gray-900"}`}>{col.value}</span>
                <span className="text-[11px] text-gray-300">{col.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
