import type { LockerItem } from "./type";

interface LockerTableProps {
  lockers: LockerItem[];
  selectedId: string | null;
  checkedIds: Set<string>;
  onSelect: (id: string) => void;
  onCheck: (id: string) => void;
  onCheckAll: () => void;
}

/*
 * ✅ 상태별 배지 스타일 매핑
 * CSS module: .statusAvailable { background:#e8f5e9; color:#2e7d32 }
 * Tailwind: "bg-green-50 text-green-800"
 */
const statusConfig = {
  available: { label: "가능", style: "bg-green-50 text-green-800" },
  inUse: { label: "사용중", style: "bg-red-50 text-red-800" },
  broken: { label: "고장", style: "bg-gray-100 text-gray-500" },
  expired: { label: "사용중", style: "bg-red-50 text-red-800" },
} as const;

export default function LockerTable({
  lockers,
  selectedId,
  checkedIds,
  onSelect,
  onCheck,
  onCheckAll,
}: LockerTableProps) {
  const allChecked = checkedIds.size === lockers.length;

  return (
    <div className="bg-white rounded-t-2xl overflow-x-auto shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          {/*
           * border-b border-gray-100 = 하단 테두리
           * text-left = text-align: left
           * whitespace-nowrap = white-space: nowrap
           */}
          <tr className="border-b border-gray-100">
            <th className="w-11 text-center py-3.5 px-4">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={onCheckAll}
                className="w-4 h-4 accent-brand cursor-pointer"
                /* accent-brand = 체크박스 색상을 brand로 */
              />
            </th>
            <th className="py-3.5 px-4 text-left text-xs font-semibold text-gray-400 whitespace-nowrap">번호</th>
            <th className="py-3.5 px-4 text-left text-xs font-semibold text-gray-400 whitespace-nowrap">위치</th>
            <th className="py-3.5 px-4 text-left text-xs font-semibold text-gray-400 whitespace-nowrap">사용자</th>
            <th className="py-3.5 px-4 text-left text-xs font-semibold text-gray-400 whitespace-nowrap">상태</th>
            <th className="py-3.5 px-4 text-left text-xs font-semibold text-gray-400 whitespace-nowrap">이용 기간</th>
            <th className="py-3.5 px-4 text-left text-xs font-semibold text-gray-400 whitespace-nowrap">관리</th>
          </tr>
        </thead>
        <tbody>
          {lockers.map((locker) => {
            const cfg = statusConfig[locker.status];
            const isSelected = selectedId === locker.id;

            return (
              <tr
                key={locker.id}
                onClick={() => onSelect(locker.id)}
                className={`
                  cursor-pointer transition-colors duration-100
                  border-b border-gray-50
                  ${isSelected ? "bg-[#f0f7f2]" : "hover:bg-[#fafbfa]"}
                `}
              >
                {/* 체크박스 — e.stopPropagation()으로 행 클릭과 분리 */}
                <td className="w-11 text-center py-3.5 px-4">
                  <input
                    type="checkbox"
                    checked={checkedIds.has(locker.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      onCheck(locker.id);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-4 h-4 accent-brand cursor-pointer"
                  />
                </td>

                {/* 번호 */}
                <td className="py-3.5 px-4 font-bold text-gray-900 whitespace-nowrap">{locker.id}</td>

                {/* 위치 */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className="block text-[13px] font-semibold text-gray-900">
                    {locker.building} {locker.floor}
                  </span>
                  <span className="block text-[11px] text-gray-300">{locker.zone}</span>
                </td>

                {/* 사용자 */}
                <td className="py-3.5 px-4 min-w-[140px]">
                  {locker.userName ? (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-brand shrink-0" />
                      <div>
                        <span className="block text-[13px] font-semibold text-gray-900">{locker.userName}</span>
                        <span className="block text-[11px] text-gray-300">
                          {locker.userDept} · {locker.userStudentId}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-[13px] text-gray-300">미사용</span>
                  )}
                </td>

                {/* 상태 배지 */}
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap ${cfg.style}`}
                  >
                    {cfg.label}
                  </span>
                </td>

                {/* 이용 기간 */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  {locker.period ? (
                    <div>
                      <span className="block text-[13px] font-medium text-gray-900">{locker.period}</span>
                      <span
                        className={`block text-[11px] ${locker.dDay?.includes("만료") ? "text-red-500 font-semibold" : "text-gray-300"}`}
                      >
                        {locker.dDay}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[13px] text-gray-300">—</span>
                  )}
                </td>

                {/* 관리 버튼 */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <button
                    className="w-[30px] h-[30px] border-none bg-transparent rounded-md cursor-pointer text-[13px] hover:bg-gray-100 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    ✏️
                  </button>
                  <button
                    className="w-[30px] h-[30px] border-none bg-transparent rounded-md cursor-pointer text-[13px] hover:bg-red-50 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    ✕
                  </button>
                  {locker.status === "broken" && (
                    <button
                      className="w-[30px] h-[30px] border-none bg-transparent rounded-md cursor-pointer text-[13px] hover:bg-yellow-50 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      🔧
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
