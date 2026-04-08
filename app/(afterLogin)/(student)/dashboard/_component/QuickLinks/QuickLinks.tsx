import Link from "next/link";

const links = [
  { label: "사물함 신청", desc: "빈 사물함 조회 및 신청", href: "/apply", color: "bg-brand" },
  { label: "이용 현황", desc: "건물별 사물함 현황", href: "/status", color: "bg-blue-500" },
  { label: "FAQ", desc: "자주 묻는 질문", href: "/support", color: "bg-red-500" },
  { label: "수리 요청", desc: "고장 및 파손 신고 접수", href: "/support", color: "bg-orange-500" },
];

export default function QuickLinks() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <h3 className="text-[15px] font-extrabold text-gray-900 mb-3">바로가기</h3>
      <div className="grid grid-cols-2 gap-2 max-[600px]:grid-cols-1">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl no-underline hover:bg-[#f8f9f8] transition-colors"
          >
            <div className={`w-2.5 h-2.5 rounded-sm shrink-0 ${l.color}`} />
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-bold text-gray-900">{l.label}</span>
              <span className="text-[11px] text-gray-400">{l.desc}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
