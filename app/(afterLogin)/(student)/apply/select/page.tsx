"use client";

import { useState, useMemo } from "react";
import { buildings } from "../config";

type LockerStatus = "available" | "selected" | "occupied" | "broken" | "mine";

const statusConfig: Record<LockerStatus, { bg: string }> = {
  available: { bg: "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer" },
  selected: { bg: "bg-yellow-100 text-yellow-800 ring-2 ring-yellow-400 cursor-pointer" },
  occupied: { bg: "bg-red-100 text-red-700" },
  broken: { bg: "bg-gray-100 text-gray-400" },
  mine: { bg: "bg-blue-100 text-blue-700" },
};

const legendItems = [
  { label: "사용 가능", dotColor: "bg-green-400" },
  { label: "선택됨", dotColor: "bg-yellow-400" },
  { label: "사용중", dotColor: "bg-red-400" },
  { label: "고장", dotColor: "bg-gray-300" },
  { label: "내 사물함", dotColor: "bg-blue-400" },
];

// Mock 상태 생성
function generateLockerStatus(buildingId: string, floorNum: number, zoneName: string, index: number): LockerStatus {
  const seed = buildingId.charCodeAt(0) * 10000 + floorNum * 1000 + zoneName.charCodeAt(0) * 10 + index;
  if (seed % 11 === 0) return "broken";
  if (seed % 3 === 0) return "occupied";
  if (buildingId === "saecheonnyeon" && floorNum === 4 && zoneName === "복도 좌측" && index === 5) return "mine";
  return "available";
}

export default function LockerSelectPage() {
  const [selectedBuildingIdx, setSelectedBuildingIdx] = useState(0);
  const [selectedFloorIdx, setSelectedFloorIdx] = useState(0);
  const [selectedZoneIdx, setSelectedZoneIdx] = useState(0);
  const [selectedLocker, setSelectedLocker] = useState<string | null>(null);

  const currentBuilding = buildings[selectedBuildingIdx];
  const currentFloor = currentBuilding.floors[selectedFloorIdx];
  const currentZone = currentFloor.zones[selectedZoneIdx];

  // 사물함 생성
  const lockers = useMemo(() => {
    const total = currentZone.rows * currentZone.cols;
    return Array.from({ length: total }, (_, i) => {
      const num = String(i + 1).padStart(2, "0");
      const id = `${currentFloor.number}${currentZone.name.charAt(0)}-${num}`;
      const status = generateLockerStatus(currentBuilding.id, currentFloor.number, currentZone.name, i);
      return { id, num, status };
    });
  }, [currentBuilding.id, currentFloor.number, currentZone]);

  // 건물별 전체 잔여석
  const buildingAvailableCounts = useMemo(() => {
    return buildings.map((b) => {
      let count = 0;
      b.floors.forEach((f) => {
        f.zones.forEach((z) => {
          const total = z.rows * z.cols;
          for (let i = 0; i < total; i++) {
            if (generateLockerStatus(b.id, f.number, z.name, i) === "available") count++;
          }
        });
      });
      return count;
    });
  }, []);

  // 층별 잔여석
  const floorAvailableCounts = useMemo(() => {
    return currentBuilding.floors.map((floor) => {
      let count = 0;
      floor.zones.forEach((zone) => {
        const total = zone.rows * zone.cols;
        for (let i = 0; i < total; i++) {
          if (generateLockerStatus(currentBuilding.id, floor.number, zone.name, i) === "available") count++;
        }
      });
      return count;
    });
  }, [currentBuilding]);

  const handleBuildingChange = (idx: number) => {
    setSelectedBuildingIdx(idx);
    setSelectedFloorIdx(0);
    setSelectedZoneIdx(0);
    setSelectedLocker(null);
  };

  const handleFloorChange = (idx: number) => {
    setSelectedFloorIdx(idx);
    setSelectedZoneIdx(0);
    setSelectedLocker(null);
  };

  const handleZoneChange = (idx: number) => {
    setSelectedZoneIdx(idx);
    setSelectedLocker(null);
  };

  const handleLockerClick = (id: string, status: LockerStatus) => {
    if (status === "available") {
      setSelectedLocker(selectedLocker === id ? null : id);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-1">사물함 신청</h1>
        <p className="text-[13px] text-gray-400">원하는 층과 구역을 선택한 뒤, 사물함을 골라주세요</p>
      </div>

      <div className="flex gap-4 items-start max-[900px]:flex-col">
        {/* ===== 좌측: 건물 탭 + 층 선택 ===== */}
        <div className="w-[260px] min-w-[260px] flex flex-col gap-2.5 max-[900px]:w-full max-[900px]:min-w-0">
          {/* 건물 선택 탭 */}
          {buildings.map((b, idx) => {
            const isActive = selectedBuildingIdx === idx;
            return (
              <button
                key={b.id}
                onClick={() => handleBuildingChange(idx)}
                className={`
                  w-full flex items-center gap-3 p-4 rounded-xl
                  border-2 text-left cursor-pointer font-sans transition-all duration-200
                  ${
                    isActive
                      ? "bg-white border-brand shadow-[0_2px_12px_rgba(74,140,102,0.1)]"
                      : "bg-white border-transparent shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:border-gray-200"
                  }
                `}
              >
                <div
                  className={`
                  w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                  ${isActive ? "bg-green-50" : "bg-gray-50"}
                `}
                >
                  <svg
                    className={`w-5 h-5 ${isActive ? "text-brand" : "text-gray-400"}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <path d="M9 22v-4h6v4" />
                    <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01" />
                  </svg>
                </div>
                <div className="flex-1">
                  <span className={`block text-sm font-extrabold ${isActive ? "text-gray-900" : "text-gray-500"}`}>
                    {b.name}
                  </span>
                  <span className="block text-[11px] text-gray-400">
                    {b.floors.length}개 층 {b.floors.reduce((a, f) => a + f.zones.length, 0)}개 구역
                  </span>
                </div>
                <div className="text-right">
                  <span className={`block text-lg font-black ${isActive ? "text-brand" : "text-gray-400"}`}>
                    {buildingAvailableCounts[idx]}
                  </span>
                  <span className="block text-[10px] text-gray-300">잔여석</span>
                </div>
              </button>
            );
          })}

          {/* 선택된 건물의 층 리스트 */}
          <div className="border-t border-gray-100 pt-2.5 mt-1">
            {currentBuilding.floors.map((floor, idx) => {
              const isSelected = selectedFloorIdx === idx;
              return (
                <button
                  key={floor.number}
                  onClick={() => handleFloorChange(idx)}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-xl mb-1
                    border-2 text-left cursor-pointer font-sans transition-all duration-200
                    ${
                      isSelected ? "bg-white border-brand/50 shadow-sm" : "bg-white border-transparent hover:bg-gray-50"
                    }
                  `}
                >
                  <div
                    className={`
                    w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-sm font-black
                    ${isSelected ? "bg-brand text-white" : "bg-gray-100 text-gray-400"}
                  `}
                  >
                    {floor.number}F
                  </div>
                  <div className="flex-1">
                    <span className={`block text-[13px] font-bold ${isSelected ? "text-gray-900" : "text-gray-500"}`}>
                      {floor.label}
                    </span>
                    <span className="block text-[11px] text-gray-300">
                      {floor.zones.map((z) => z.name).join(" / ")}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`block text-sm font-black ${isSelected ? "text-brand" : "text-gray-400"}`}>
                      {floorAvailableCounts[idx]}
                    </span>
                    <span className="block text-[10px] text-gray-300">잔여석</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===== 우측: 사물함 그리드 ===== */}
        <div className="flex-1 min-w-0 bg-white rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <h2 className="text-lg font-extrabold text-gray-900 mb-3">사물함 선택</h2>

          {/* 구역 탭 */}
          <div className="flex gap-2 mb-3">
            {currentFloor.zones.map((zone, idx) => {
              const isActive = selectedZoneIdx === idx;
              const total = zone.rows * zone.cols;
              let avail = 0;
              for (let i = 0; i < total; i++) {
                if (generateLockerStatus(currentBuilding.id, currentFloor.number, zone.name, i) === "available")
                  avail++;
              }
              return (
                <button
                  key={zone.name}
                  onClick={() => handleZoneChange(idx)}
                  className={`
                    flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg
                    text-[13px] font-semibold border cursor-pointer font-sans transition-colors duration-150
                    ${
                      isActive
                        ? "bg-brand text-white border-brand"
                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                    }
                  `}
                >
                  {zone.name}
                  <span
                    className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full
                    ${isActive ? "bg-white/25" : "bg-gray-100 text-gray-400"}`}
                  >
                    {avail}석
                  </span>
                </button>
              );
            })}
          </div>

          {/* 범례 */}
          <div className="flex gap-3.5 mb-3 flex-wrap">
            {legendItems.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 text-[11px] text-gray-400">
                <div className={`w-2.5 h-2.5 rounded-sm ${item.dotColor}`} />
                {item.label}
              </div>
            ))}
          </div>

          <p className="text-[12px] text-gray-400 mb-2.5">
            {currentFloor.label} {currentZone.name} 총 {currentZone.rows * currentZone.cols}칸
          </p>

          {/* 사물함 그리드 */}
          <div
            className="grid gap-1.5 mb-2 justify-center"
            style={{
              gridTemplateColumns: `repeat(${currentZone.cols}, 88px)`,
            }}
          >
            {lockers.map((locker) => {
              const isSelected = selectedLocker === locker.id;
              const displayStatus = isSelected ? "selected" : locker.status;
              const cfg = statusConfig[displayStatus];
              const isClickable = locker.status === "available" || isSelected;
              return (
                <button
                  key={locker.id}
                  onClick={() => handleLockerClick(locker.id, locker.status)}
                  disabled={!isClickable}
                  className={`
                    aspect-square rounded-lg flex flex-col items-center justify-center
                    gap-0.5 border-none font-sans transition-all duration-150
                    ${cfg.bg} ${!isClickable ? "cursor-not-allowed" : ""}
                  `}
                >
                  <span className="text-[12px] font-bold">{locker.num}</span>
                  {isSelected && <span className="text-[8px] font-semibold">선택됨</span>}
                  {locker.status === "occupied" && <span className="text-[8px]">사용중</span>}
                  {locker.status === "available" && !isSelected && <span className="text-[8px]">사용 가능</span>}
                  {locker.status === "mine" && <span className="text-[8px]">내 사물함</span>}
                </button>
              );
            })}
          </div>

          {/* 하단 */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-3.5 flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-[13px] text-gray-400">선택한 사물함</span>
              {selectedLocker ? (
                <>
                  <span className="text-sm font-bold text-brand bg-green-50 px-3 py-1 rounded-lg">
                    {selectedLocker}
                  </span>
                  <span className="text-[12px] text-gray-400">
                    {currentBuilding.name} {currentFloor.label} {currentZone.name}
                  </span>
                </>
              ) : (
                <span className="text-[13px] text-gray-300">사물함을 선택해 주세요</span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedLocker(null)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-500 bg-white cursor-pointer font-sans hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                disabled={!selectedLocker}
                className={`
                  px-5 py-2 border-none rounded-lg text-[13px] font-bold font-sans transition-all duration-200
                  ${
                    selectedLocker
                      ? "bg-brand text-white cursor-pointer hover:bg-brand-dark"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                이 사물함 신청하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
