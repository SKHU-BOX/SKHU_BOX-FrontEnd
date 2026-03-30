import AdminStatsCards from "./_component/AdminStatsCards/AdminStatsCard";
import TodayHistory from "./_component/TodayHistory/TodayHistory";
import BuildingUsage from "./_component/BuildingUsage/BuildingUsage";
import RecentActivity from "./_component/RecentActivity/RecentActivity";
import PendingComplaints from "./_component/PendingComplaints/PendingComplaints";
import OperationSummary from "./_component/OperationSummary/OperationSummary";
import styles from "./page.module.css";

export default function AdminDashboardPage() {
  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 화요일`;

  return (
    <div className={styles.dashboard}>
      {/* 헤더 */}
      <div className={styles.header}>
        <div>
          <p className={styles.greeting}>관리자 대시보드</p>
          <h1 className={styles.title}>운영 현황</h1>
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
        </div>
      </div>

      {/* 통계 카드 5개 */}
      <AdminStatsCards />

      {/* 처리 내역 + 건물별 사용률 */}
      <div className={styles.middleRow}>
        <TodayHistory />
        <BuildingUsage />
      </div>

      {/* 최근 활동 + 미처리 민원 + 운영 요약 */}
      <div className={styles.bottomRow}>
        <RecentActivity />
        <PendingComplaints />
        <OperationSummary />
      </div>
    </div>
  );
}
