"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiBox } from "react-icons/fi";
import styles from "./Sidebar.module.css";

interface MenuItem {
  label: string;
  href: string;
  badge?: number;
  icon: React.ReactNode;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const studentMenus: MenuGroup[] = [
  {
    title: "MENU",
    items: [
      {
        label: "대시보드",
        href: "/dashboard",
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        ),
      },
      {
        label: "사물함 신청",
        href: "/apply",
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
            <path d="M12 8v8M8 12h8" />
          </svg>
        ),
      },
      {
        label: "이용 현황",
        href: "/status",
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "SUPPORT",
    items: [
      {
        label: "고객센터",
        href: "/support",
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        ),
      },
      {
        label: "마이페이지",
        href: "/mypage",
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        ),
      },
    ],
  },
];

const adminMenus: MenuGroup[] = [
  {
    title: "Overview",
    items: [
      {
        label: "대시보드",
        href: "/admindashboard",
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        label: "사물함 관리",
        href: "/admin/lockers",
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
      },
      {
        label: "민원 관리",
        href: "/admin/complaints",
        badge: 3,
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        ),
      },
      {
        label: "학생 관리",
        href: "/admin/students",
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
      },
    ],
  },
  {
    title: "Analytics",
    items: [
      {
        label: "데이터/통계",
        href: "/admin/analytics",
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
      },
      {
        label: "설정",
        href: "/admin/settings",
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" />
          </svg>
        ),
      },
    ],
  },
];

interface SidebarProps {
  role: "student" | "admin";
  userName?: string;
  userDept?: string;
}

export default function Sidebar({ role, userName = "사용자", userDept = "IT융합자율학부" }: SidebarProps) {
  const pathname = usePathname();
  const menus = role === "student" ? studentMenus : adminMenus;
  const allItems = menus.flatMap((group) => group.items);
  const isDark = role === "admin";

  const isActive = (href: string) => {
    if (href === "/dashboard" || href === "/admindashboard") {
      return pathname === href || pathname.endsWith(href.replace("/", ""));
    }
    return pathname.includes(href);
  };

  return (
    <>
      {/* ===== 모바일 상단 로고 바 ===== */}
      <header className={`${styles.mobileHeader} ${isDark ? styles.dark : ""}`}>
        <div className={styles.mobileLogoWrap}>
          <div className={styles.logo}>
            <FiBox className={styles.logoIcon} />
          </div>
          <span className={styles.logoText}>SKHUBox</span>
        </div>
      </header>

      {/* ===== 데스크탑 사이드바 ===== */}
      <aside className={`${styles.sidebar} ${isDark ? styles.dark : ""}`}>
        {/* 로고 + 역할 배지 */}
        <div className={styles.logoSection}>
          <div className={styles.logoRow}>
            <div className={styles.logo}>
              <FiBox className={styles.logoIcon} />
            </div>
            <span className={styles.logoText}>SKHUBox</span>
          </div>
          {isDark && <span className={styles.adminBadge}>ADMIN</span>}
        </div>

        {/* 메뉴 */}
        <nav className={styles.nav}>
          {menus.map((group) => (
            <div key={group.title} className={styles.menuGroup}>
              <span className={styles.menuGroupTitle}>{group.title}</span>
              <ul className={styles.menuList}>
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={`${styles.menuItem} ${isActive(item.href) ? styles.active : ""}`}>
                      <span className={styles.menuIcon}>{item.icon}</span>
                      <span className={styles.menuLabel}>{item.label}</span>
                      {item.badge && <span className={styles.menuBadge}>{item.badge}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* 유저 정보 */}
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>{userName.charAt(0)}</div>
          <div className={styles.userText}>
            <span className={styles.userName}>{userName}</span>
            <span className={styles.userDept}>{userDept}</span>
          </div>
        </div>
      </aside>

      {/* ===== 모바일 하단 탭바 ===== */}
      <nav className={`${styles.bottomTab} ${isDark ? styles.dark : ""}`}>
        {allItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.tabItem} ${isActive(item.href) ? styles.tabActive : ""}`}
          >
            <span className={styles.tabIcon}>{item.icon}</span>
            <span className={styles.tabLabel}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
