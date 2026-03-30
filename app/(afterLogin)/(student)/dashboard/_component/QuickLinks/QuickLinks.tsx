import Link from "next/link";
import styles from "./QuickLinks.module.css";

interface QuickLinkItem {
  label: string;
  desc: string;
  href: string;
  color: string;
}

const links: QuickLinkItem[] = [
  {
    label: "사물함 신청",
    desc: "빈 사물함 조회 및 신청",
    href: "/apply",
    color: "#4a8c66",
  },
  {
    label: "이용 현황",
    desc: "건물별 사물함 현황",
    href: "/status",
    color: "#2196f3",
  },
  {
    label: "FAQ",
    desc: "자주 묻는 질문",
    href: "/support",
    color: "#ef5350",
  },
  {
    label: "수리 요청",
    desc: "고장 및 파손 신고 접수",
    href: "/support",
    color: "#ff9800",
  },
];

export default function QuickLinks() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>바로가기</h3>
      <div className={styles.grid}>
        {links.map((link) => (
          <Link key={link.label} href={link.href} className={styles.item}>
            <div className={styles.dot} style={{ background: link.color }} />
            <div className={styles.itemText}>
              <span className={styles.itemLabel}>{link.label}</span>
              <span className={styles.itemDesc}>{link.desc}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
