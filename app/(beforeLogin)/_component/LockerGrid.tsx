/*
 * ✅ Tailwind 핵심 패턴 — 조건부 스타일링
 *
 * CSS module에서는 styles[status] 처럼 동적 클래스를 사용했지만,
 * Tailwind에서는 객체 맵(Record)을 만들어서 status에 맞는 클래스를 가져와.
 */

type LockerStatus = "available" | "occupied" | "mine" | "broken";

interface LockerGridProps {
  statuses: LockerStatus[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
}

// status → Tailwind 클래스 매핑
const statusStyles: Record<LockerStatus, string> = {
  available: "bg-locker-available opacity-80 cursor-pointer hover:opacity-100",
  occupied: "bg-locker-occupied opacity-75",
  mine: "bg-locker-mine",
  broken: "bg-locker-broken opacity-50",
};

export default function LockerGrid({ statuses, selectedIndex, onSelect }: LockerGridProps) {
  return (
    <>
      {/*
       * grid grid-cols-6 = display: grid; grid-template-columns: repeat(6, 1fr)
       * gap-2 = gap: 8px
       * mb-4 = margin-bottom: 16px
       */}
      <div className="grid grid-cols-6 gap-2 mb-4">
        {statuses.map((status, i) => (
          <button
            key={i}
            onClick={() => status === "available" && onSelect?.(i)}
            className={`
              aspect-square rounded-[10px] text-[11px] font-semibold text-white
              flex items-center justify-center border-none
              transition-all duration-150
              ${statusStyles[status]}
              ${selectedIndex === i ? "ring-2 ring-brand-dark ring-offset-1" : ""}
            `}
            /*
             * aspect-square = aspect-ratio: 1 (정사각형)
             * rounded-[10px] = border-radius: 10px (기본값에 없으면 []로 커스텀)
             * ring-2 = outline 비슷한 효과, 요소 크기에 영향 안 줌
             * ring-offset-1 = ring과 요소 사이 1px 간격
             */
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </div>

      {/* 범례 */}
      <div className="flex gap-3.5 mb-4 justify-center">
        {[
          { bg: "bg-locker-available", label: "가능" },
          { bg: "bg-locker-occupied", label: "사용중" },
          { bg: "bg-locker-mine", label: "내 사물함" },
          { bg: "bg-locker-broken", label: "가능" },
        ].map(({ bg, label }) => (
          <div key={label + bg} className="flex items-center gap-1.5 text-[10px] text-gray-400">
            {/* w-2.5 h-2.5 = 10px × 10px */}
            <div className={`w-2.5 h-2.5 rounded-sm ${bg}`} />
            {label}
          </div>
        ))}
      </div>
    </>
  );
}
