import styles from "./AdminStatsCard.module.css";

interface StatItem {
  icon: React.ReactNode;
  iconBg: string;
  value: string;
  label: string;
  change?: string;
  changeColor?: string;
}

const stats: StatItem[] = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
    iconBg: "#4a8c66",
    value: "180",
    label: "전체 사물함",
    change: "+12",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    iconBg: "#2196f3",
    value: "156",
    label: "전체 이용자",
    change: "+8",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    iconBg: "#ff9800",
    value: "27",
    label: "오늘 처리 건",
    change: "+14",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    iconBg: "#ef5350",
    value: "8",
    label: "미처리 민원",
    change: "+3",
    changeColor: "#ef5350",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    iconBg: "#2196f3",
    value: "72%",
    label: "전체 사용률",
    change: "↑ 5%",
  },
];

export default function AdminStatsCards() {
  return (
    <div className={styles.grid}>
      {stats.map((stat, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.iconWrapper} style={{ color: stat.iconBg }}>
              {stat.icon}
            </div>
            {stat.change && (
              <span className={styles.change} style={{ color: stat.changeColor || "#4a8c66" }}>
                {stat.change}
              </span>
            )}
          </div>
          <span className={styles.value}>{stat.value}</span>
          <span className={styles.label}>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
