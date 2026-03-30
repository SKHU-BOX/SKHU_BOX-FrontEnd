import MyLocker from "./_component/MyLocker/MyLocker";
import StatsCards from "./_component/StatsCards/StatsCards";
import QuickLinks from "./_component/QuickLinks/QuickLinks";
import Notifications from "./_component/Notifications/Notifications";
import styles from "./page.module.css";

export default function DashboardPage() {
  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${String(today.getMonth() + 1).padStart(2, "0")}월 ${String(today.getDate()).padStart(2, "0")}일`;

  return (
    <div className={styles.dashboard}>
      {/* 헤더 */}
      <div className={styles.header}>
        <div>
          <p className={styles.greeting}>안녕하세요, 사용자님</p>
          <h1 className={styles.title}>대시보드</h1>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.date}>{dateStr}</span>
          <button className={styles.iconBtn}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </button>
          <button className={styles.iconBtn}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 내 사물함 */}
      <MyLocker />

      {/* 통계 카드 */}
      <StatsCards />

      {/* 바로가기 + 알림 */}
      <div className={styles.bottomRow}>
        <QuickLinks />
        <Notifications />
      </div>
    </div>
  );
}
