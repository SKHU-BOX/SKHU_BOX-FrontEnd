import styles from "./RecentActivity.module.css";

interface ActivityItem {
  color: string;
  text: string;
  time: string;
}

const activities: ActivityItem[] = [
  { color: "#4a8c66", text: "이서현님 3A-12 자동 배정", time: "2분 전" },
  { color: "#4a8c66", text: "송민지님 2B-11 반납 처리", time: "32분 전" },
  { color: "#ff9800", text: "이병주님 수리 요청 #0325 접수", time: "1시간 전" },
  { color: "#ef5350", text: "M1B-06 고장 자동 전환", time: "3시간 전" },
];

export default function RecentActivity() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>최근 활동</h3>
      <ul className={styles.list}>
        {activities.map((item, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.dot} style={{ background: item.color }} />
            <div className={styles.itemContent}>
              <span className={styles.itemText}>{item.text}</span>
              <span className={styles.itemTime}>{item.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
