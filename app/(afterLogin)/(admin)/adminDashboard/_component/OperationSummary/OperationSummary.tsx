import styles from "./OperationSummary.module.css";

interface SummaryItem {
  icon: string;
  iconColor: string;
  label: string;
  value: number;
}

const summaryItems: SummaryItem[] = [
  { icon: "✓", iconColor: "#4a8c66", label: "오늘 자동 배정", value: 18 },
  { icon: "▲", iconColor: "#ff9800", label: "고장 사물함", value: 8 },
  { icon: "◉", iconColor: "#ef5350", label: "만료 임박 (7일)", value: 23 },
  { icon: "■", iconColor: "#2196f3", label: "이번 주 신규 가입", value: 34 },
];

export default function OperationSummary() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>운영 요약</h3>
      <ul className={styles.list}>
        {summaryItems.map((item, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.itemIcon} style={{ color: item.iconColor }}>
              {item.icon}
            </span>
            <span className={styles.itemLabel}>{item.label}</span>
            <span className={styles.itemValue}>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
