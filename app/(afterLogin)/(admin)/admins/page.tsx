"use client";

import { useState } from "react";
import type { AdminItem } from "./type";
import AdminTable from "./_component/AdminTable";
import AdminRegisterModal from "./_component/AdminRegisterModal";

const MOCK_ADMINS: AdminItem[] = [
  {
    id: "1",
    name: "김민수",
    studentId: "20210001",
    dept: "IT융합자율학부",
    email: "20210001",
    joinDate: "2025.09.01",
    isActive: true,
  },
  {
    id: "2",
    name: "이수진",
    studentId: "20220234",
    dept: "사회융합자율학부",
    email: "20220234",
    joinDate: "2026.03.01",
    isActive: true,
  },
  {
    id: "3",
    name: "박준혁",
    studentId: "20230456",
    dept: "IT융합자율학부",
    email: "20230456",
    joinDate: "2026.03.01",
    isActive: true,
  },
  {
    id: "4",
    name: "최예린",
    studentId: "20210789",
    dept: "사회융합자율학부",
    email: "20210789",
    joinDate: "2025.09.01",
    isActive: false,
  },
];

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState(MOCK_ADMINS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeCount = admins.filter((a) => a.isActive).length;
  const inactiveCount = admins.filter((a) => !a.isActive).length;

  const handleRegister = (data: { name: string; studentId: string; dept: string; email: string }) => {
    const newAdmin: AdminItem = {
      id: String(Date.now()),
      name: data.name,
      studentId: data.studentId,
      dept: data.dept,
      email: data.email,
      joinDate: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
      isActive: true,
    };
    setAdmins((prev) => [...prev, newAdmin]);
  };

  const handleToggleActive = (id: string) => {
    setAdmins((prev) => prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a)));
  };

  const handleDelete = (id: string) => {
    if (!confirm("정말 이 관리자를 삭제하시겠습니까?")) return;
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* 헤더 */}
      <div className="flex items-start justify-between max-md:flex-col max-md:gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-1.5">관리자 관리</h1>
          <p className="text-[13px] text-gray-400">
            학생회 관리자를 등록·관리합니다. 학기 변경 시 새 관리자를 추가하거나 기존 관리자를 비활성화할 수 있습니다.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="
            flex items-center gap-1.5
            bg-brand-dark text-white text-[13px] font-bold
            px-5 py-2.5 rounded-[10px] border-none
            cursor-pointer font-sans whitespace-nowrap
            hover:bg-[#155a32] transition-colors
          "
        >
          + 관리자 등록
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-3 gap-3.5 max-[700px]:grid-cols-1">
        <div className="bg-white rounded-2xl p-[18px] flex flex-col gap-2 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <span className="w-9 h-9 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-base">
            👥
          </span>
          <span className="text-[26px] font-black text-gray-900 tracking-tight">{admins.length}</span>
          <span className="text-[11px] text-gray-400 font-medium">전체 관리자</span>
        </div>
        <div className="bg-white rounded-2xl p-[18px] flex flex-col gap-2 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <span className="w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-base">
            ✓
          </span>
          <span className="text-[26px] font-black text-gray-900 tracking-tight">{activeCount}</span>
          <span className="text-[11px] text-gray-400 font-medium">활성 관리자</span>
        </div>
        <div className="bg-white rounded-2xl p-[18px] flex flex-col gap-2 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <span className="w-9 h-9 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-base">
            ⏸
          </span>
          <span className="text-[26px] font-black text-gray-900 tracking-tight">{inactiveCount}</span>
          <span className="text-[11px] text-gray-400 font-medium">비활성 관리자</span>
        </div>
      </div>

      {/* 테이블 */}
      <AdminTable admins={admins} onToggleActive={handleToggleActive} onDelete={handleDelete} />

      {/* 등록 모달 */}
      <AdminRegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onRegister={handleRegister} />
    </div>
  );
}
