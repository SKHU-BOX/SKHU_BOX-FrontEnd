import Sidebar from "./_component/Sidebar";
import styles from "./layout.module.css";

// TODO: 실제로는 세션/쿠키에서 role을 가져와야 함
// 지금은 MVP니까 하드코딩
const MOCK_USER = {
  role: "student" as const,
  name: "사용자",
  dept: "IT융합자율학부",
};

export default function AfterLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <Sidebar role={MOCK_USER.role} userName={MOCK_USER.name} userDept={MOCK_USER.dept} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
