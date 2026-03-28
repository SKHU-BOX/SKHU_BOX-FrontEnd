"use client";

import { useRouter } from "next/navigation";
import { FiBox } from "react-icons/fi";
import styles from "../signup.module.css";
import Link from "next/link";

export default function SignupStep3() {
  const router = useRouter();

  const handleGoToLocker = () => {
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.formPanel}>
        <div className={styles.formInner}>
          {/* 로고 */}
          <Link href="/" className={styles.logoSection}>
            <div className={styles.logo}>
              <FiBox className={styles.logoIcon} />
            </div>
            SKHUBOX
          </Link>

          {/* 완료 섹션 */}
          <div className={styles.completeSection}>
            {/* 체크 아이콘 */}
            <div className={styles.checkIcon}>
              <svg viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h1 className={styles.completeTitle}>가입이 완료되었습니다!</h1>
            <p className={styles.completeSubtitle}>
              사용자님, 환영합니다.
              <br />
              지금 바로 사물함을 신청해 보세요.
            </p>

            {/* 정보 요약 테이블 */}
            <div className={styles.infoTable}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>이름</span>
                <span className={styles.infoValue}>사용자</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>학번</span>
                <span className={styles.infoValue}>202111111</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>학부</span>
                <span className={styles.infoValue}>IT융합자율학부</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>이메일</span>
                <span className={styles.infoValue}>test2026@office.skhu.ac.kr</span>
              </div>
            </div>
          </div>

          {/* 사물함 신청하러 가기 */}
          <button className={styles.primaryBtn} onClick={handleGoToLocker}>
            사물함 신청하러 가기
          </button>

          {/* 카피라이트 */}
          <p className={styles.copyright}>©2026 SKHUBOX 성공회대학교 사물함 예약 서비스</p>
        </div>
      </div>
      <div className={styles.rightPanel} />
    </div>
  );
}
