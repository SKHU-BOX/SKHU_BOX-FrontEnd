import styles from "./PendingComplaints.module.css";

interface ComplaintItem {
  icon: string;
  title: string;
  location: string;
  time: string;
  badge: string;
  badgeColor: string;
}

const complaints: ComplaintItem[] = [
  {
    icon: "🔧",
    title: "잠금장치 고장 · 이병주",
    location: "일만관 3A-05 · 1일 전",
    time: "",
    badge: "대기",
    badgeColor: "#ff9800",
  },
  {
    icon: "↔",
    title: "자리 이동 요청 · 김지은",
    location: "일만관 2B → 2A · 3일 전",
    time: "",
    badge: "대기",
    badgeColor: "#ff9800",
  },
  {
    icon: "🚪",
    title: "문 경첩 파손 · 정하늘",
    location: "미가엘관 M2A-11 · 5일 전",
    time: "",
    badge: "처리중",
    badgeColor: "#2196f3",
  },
];

export default function PendingComplaints() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>미처리 민원</h3>
        <button className={styles.viewAll}>전체보기 &gt;</button>
      </div>

      <ul className={styles.list}>
        {complaints.map((item, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.itemIcon}>{item.icon}</span>
            <div className={styles.itemContent}>
              <span className={styles.itemTitle}>{item.title}</span>
              <span className={styles.itemLocation}>{item.location}</span>
            </div>
            <span className={styles.badge} style={{ background: item.badgeColor }}>
              {item.badge}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
