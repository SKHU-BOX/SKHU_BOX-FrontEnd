import { cookies } from "next/headers";
import Sidebar from "./_component/Sidebar";

export default async function AfterLoginLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const role = (cookieStore.get("role")?.value as "student" | "admin") || "student";

  return (
    /*
     * ✅ layout.module.css → Tailwind 변환:
     * .layout { display:flex; min-height:100dvh; background:#f5f6f8 }
     * → flex min-h-dvh bg-[#f5f6f8]
     */
    <div className="flex min-h-dvh bg-[#f5f6f8]">
      <Sidebar
        role={role}
        userName={role === "admin" ? "김민수" : "사용자"}
        userDept={role === "admin" ? "학생회 · 관리자" : "IT융합자율학부"}
      />
      {/*
       * margin-left: 220px → ml-[220px] (사이드바 너비만큼)
       * 모바일에서는 사이드바가 사라지고 상단/하단 바가 나오므로
       * max-md:ml-0 max-md:pt-[72px] max-md:pb-[80px]
       */}
      <main
        className="
        flex-1 ml-[220px] p-[24px_48px]
        min-h-dvh overflow-y-auto
        max-md:ml-0 max-md:pt-[72px] max-md:pb-[80px] max-md:px-5
      "
      >
        {children}
      </main>
    </div>
  );
}
