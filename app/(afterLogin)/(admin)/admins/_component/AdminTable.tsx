import type { AdminItem } from "../type";

interface AdminTableProps {
  admins: AdminItem[];
  onToggleActive: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function AdminTable({ admins, onToggleActive, onDelete }: AdminTableProps) {
  return (
    <div className="bg-white rounded-2xl overflow-x-auto shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="py-3.5 px-5 text-left text-xs font-semibold text-gray-400 whitespace-nowrap">관리자</th>
            <th className="py-3.5 px-5 text-left text-xs font-semibold text-gray-400 whitespace-nowrap">학번</th>
            <th className="py-3.5 px-5 text-left text-xs font-semibold text-gray-400 whitespace-nowrap">학부</th>
            <th className="py-3.5 px-5 text-left text-xs font-semibold text-gray-400 whitespace-nowrap">등록일</th>
            <th className="py-3.5 px-5 text-left text-xs font-semibold text-gray-400 whitespace-nowrap">상태</th>
            <th className="py-3.5 px-5 text-left text-xs font-semibold text-gray-400 whitespace-nowrap">관리</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id} className="border-b border-gray-50 hover:bg-[#fafbfa] transition-colors">
              {/* 관리자 */}
              <td className="py-4 px-5 min-w-[180px]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1a1e23] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {admin.name.charAt(0)}
                  </div>
                  <div>
                    <span className="block text-[13px] font-bold text-gray-900">{admin.name}</span>
                    <span className="block text-[11px] text-gray-300">{admin.email}@office.skhu.ac.kr</span>
                  </div>
                </div>
              </td>

              {/* 학번 */}
              <td className="py-4 px-5 text-[13px] font-medium text-gray-900 whitespace-nowrap">{admin.studentId}</td>

              {/* 학부 */}
              <td className="py-4 px-5 text-[13px] text-gray-500 whitespace-nowrap">{admin.dept}</td>

              {/* 등록일 */}
              <td className="py-4 px-5 text-[13px] text-gray-500 whitespace-nowrap">{admin.joinDate}</td>

              {/* 상태 토글 */}
              <td className="py-4 px-5">
                <button
                  onClick={() => onToggleActive(admin.id)}
                  className={`
                    relative w-10 h-[22px] rounded-full border-none cursor-pointer transition-colors duration-200
                    ${admin.isActive ? "bg-brand" : "bg-gray-300"}
                  `}
                >
                  <span
                    className={`
                    absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-all duration-200
                    ${admin.isActive ? "left-[20px]" : "left-[2px]"}
                  `}
                  />
                </button>
              </td>

              {/* 관리 */}
              <td className="py-4 px-5 whitespace-nowrap">
                <button
                  onClick={() => onDelete(admin.id)}
                  className="text-xs font-semibold text-red-500 bg-transparent border border-red-500 rounded-lg px-3 py-1.5 cursor-pointer font-sans hover:bg-red-50 transition-colors"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
