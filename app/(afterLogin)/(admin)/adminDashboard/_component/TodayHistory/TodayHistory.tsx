"use client";

import { useState } from "react";
import styles from "./TodayHistory.module.css";

type Tab = "전체" | "신청" | "반납" | "기타";

interface HistoryItem {
  type: Tab;
  icon: string;
  iconColor: string;
  text: string;
  dept: string;
  studentId: string;
  time: string;
  badge: string;
  badgeColor: string;
}

const items: HistoryItem[] = [
  {
    type: "신청",
    icon: "✓",
    iconColor: "#4a8c66",
    text: "이서현님 → 일만관 3A-12 자동 배정",
    dept: "1 · 소프트웨어공학과 · 20231045",
    studentId: "",
    time: "2분 전",
    badge: "자동",
    badgeColor: "#4a8c66",
  },
  {
    type: "신청",
    icon: "✓",
    iconColor: "#4a8c66",
    text: "박준혁님 → 미가엘관 M2A-06 자동 배정",
    dept: "1 · 사회복지학과 · 20240312",
    studentId: "",
    time: "15분 전",
    badge: "자동",
    badgeColor: "#4a8c66",
  },
  {
    type: "반납",
    icon: "↩",
    iconColor: "#2196f3",
    text: "송민지님 → 일만관 2B-11 반납 처리",
    dept: "1 · 영어학과 · 20211567",
    studentId: "",
    time: "32분 전",
    badge: "수동",
    badgeColor: "#ff9800",
  },
  {
    type: "신청",
    icon: "✓",
    iconColor: "#4a8c66",
    text: "김지은님 → 일만관 2B-03 자동 배정",
    dept: "1 · IT융합자율학부 · 20220876",
    studentId: "",
    time: "1시간 전",
    badge: "자동",
    badgeColor: "#4a8c66",
  },
  {
    type: "기타",
    icon: "⚠",
    iconColor: "#ff9800",
    text: "새뮤엘관 S1A-03 이용기간 만료 자동 해제",
    dept: "",
    studentId: "",
    time: "2시간 전",
    badge: "자동",
    badgeColor: "#4a8c66",
  },
];

const tabs: { label: Tab; count: number }[] = [
  { label: "전체", count: 27 },
  { label: "신청", count: 18 },
  { label: "반납", count: 6 },
  { label: "기타", count: 3 },
];

export default function TodayHistory() {
  const [activeTab, setActiveTab] = useState<Tab>("전체");

  const filtered = activeTab === "전체" ? items : items.filter((item) => item.type === activeTab);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>오늘의 처리 내역</h3>
        <button className={styles.viewAll}>전체보기 &gt;</button>
      </div>

      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`${styles.tab} ${activeTab === tab.label ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <ul className={styles.list}>
        {filtered.map((item, i) => (
          <li key={i} className={styles.item}>
            <div className={styles.itemLeft}>
              <span className={styles.itemIcon} style={{ color: item.iconColor }}>
                {item.icon}
              </span>
              <div className={styles.itemContent}>
                <span className={styles.itemText}>{item.text}</span>
                {item.dept && <span className={styles.itemMeta}>{item.dept}</span>}
              </div>
            </div>
            <div className={styles.itemRight}>
              <span className={styles.itemTime}>{item.time}</span>
              <span className={styles.badge} style={{ color: item.badgeColor }}>
                {item.badge}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
