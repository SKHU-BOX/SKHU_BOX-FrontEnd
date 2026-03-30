import styles from "./MyLocker.module.css";

interface MyLockerProps {
  lockerId?: string;
  building?: string;
  location?: string;
  status?: string;
  statusLabel?: string;
  usagePeriod?: string;
  usageDates?: string;
  remainDays?: number;
}

export default function MyLocker({
  lockerId = "3A-05",
  building = "새천년관",
  location = "3층 A구역 05번",
  status = "정상",
  statusLabel = "사용중",
  usagePeriod = "117일",
  usageDates = "03.02 ~ 05.20",
  remainDays = 97,
}: MyLockerProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>내 사물함</h3>

      <div className={styles.content}>
        {/* 사물함 번호 */}
        <div className={styles.lockerBadge}>
          <div className={styles.lockerIcon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          </div>
          <span className={styles.lockerId}>{lockerId}</span>
        </div>

        {/* 정보 컬럼들 */}
        <div className={styles.infoColumns}>
          <div className={styles.infoCol}>
            <span className={styles.infoLabel}>건물</span>
            <span className={styles.infoValue}>{building}</span>
            <span className={styles.infoSub}>{location}</span>
          </div>

          <div className={styles.infoDivider} />

          <div className={styles.infoCol}>
            <span className={styles.infoLabel}>상태</span>
            <span className={`${styles.infoValue} ${styles.statusGreen}`}>{status}</span>
            <span className={styles.infoSub}>{statusLabel}</span>
          </div>

          <div className={styles.infoDivider} />

          <div className={styles.infoCol}>
            <span className={styles.infoLabel}>사용 기간</span>
            <span className={styles.infoValue}>{usagePeriod}</span>
            <span className={styles.infoSub}>{usageDates}</span>
          </div>

          <div className={styles.infoDivider} />

          <div className={styles.infoCol}>
            <span className={styles.infoLabel}>남은 기간</span>
            <span className={styles.infoValue}>{remainDays}일</span>
            <span className={styles.infoSub}>D - {remainDays}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
