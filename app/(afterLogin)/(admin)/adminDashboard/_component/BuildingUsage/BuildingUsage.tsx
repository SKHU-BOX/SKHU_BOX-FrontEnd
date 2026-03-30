import styles from "./BuildingUsage.module.css";

interface BuildingItem {
  name: string;
  percent: number;
  used: number;
  total: number;
  color: string;
}

const buildings: BuildingItem[] = [
  { name: "일만관", percent: 70, used: 62, total: 88, color: "#ef5350" },
  { name: "미가엘관", percent: 81, used: 42, total: 52, color: "#ff9800" },
  { name: "새뮤엘관", percent: 50, used: 20, total: 40, color: "#4a8c66" },
];

export default function BuildingUsage() {
  const totalUsed = buildings.reduce((s, b) => s + b.used, 0);
  const totalAll = buildings.reduce((s, b) => s + b.total, 0);
  const totalPercent = Math.round((totalUsed / totalAll) * 100);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>건물별 사용률</h3>
        <button className={styles.viewAll}>상세 &gt;</button>
      </div>

      <div className={styles.list}>
        {buildings.map((b) => (
          <div key={b.name} className={styles.row}>
            <span className={styles.buildingName}>{b.name}</span>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: `${b.percent}%`, background: b.color }} />
            </div>
            <span className={styles.percent}>{b.percent}%</span>
            <span className={styles.count}>
              {b.used}/{b.total}개
            </span>
          </div>
        ))}

        <div className={`${styles.row} ${styles.totalRow}`}>
          <span className={styles.buildingName}>전체</span>
          <div className={styles.barTrack}>
            <div className={styles.barFill} style={{ width: `${totalPercent}%`, background: "#ff9800" }} />
          </div>
          <span className={styles.percent}>{totalPercent}%</span>
          <span className={styles.count}>
            {totalUsed}/{totalAll}개
          </span>
        </div>
      </div>
    </div>
  );
}
