import styles from "./Notifications.module.css";

interface NoticeItem {
  text: string;
  date: string;
  author: string;
  badge: string;
  badgeColor: string;
}

const notices: NoticeItem[] = [
  {
    text: "1학기 사물함 신청이 시작되었습니다.",
    date: "2026.03.01",
    author: "관리팀",
    badge: "공지",
    badgeColor: "#4a8c66",
  },
  {
    text: "일만관 2층 B구역 사물함 점검 안내 (3/28-29)",
    date: "2026.03.20",
    author: "학생팀",
    badge: "안내",
    badgeColor: "#ff9800",
  },
  {
    text: "수리요청 #0312 처리 완료되었습니다.",
    date: "2026.03.18",
    author: "관리팀",
    badge: "완료",
    badgeColor: "#2196f3",
  },
];

export default function Notifications() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>알림 및 공지</h3>
        <button className={styles.viewAll}>전체보기</button>
      </div>

      <ul className={styles.list}>
        {notices.map((notice, i) => (
          <li key={i} className={styles.item}>
            <div className={styles.itemLeft}>
              <span className={styles.itemDot} />
              <div className={styles.itemContent}>
                <span className={styles.itemText}>{notice.text}</span>
                <span className={styles.itemMeta}>
                  {notice.date} · {notice.author}
                </span>
              </div>
            </div>
            <span className={styles.badge} style={{ background: notice.badgeColor }}>
              {notice.badge}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
