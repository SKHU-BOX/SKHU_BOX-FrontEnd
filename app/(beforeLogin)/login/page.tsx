import styles from "./LoginPage.module.css";
import { FiBox } from "react-icons/fi";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <div className={styles.formInner}>
          {/* 로고 */}
          <Link href="/" className={styles.logoSection}>
            <div className={styles.logo}>
              <FiBox className={styles.logoIcon} />
            </div>
            SKHUBOX
          </Link>

          {/* 환영 메시지 */}
          <p className={styles.welcome}>환영합니다</p>
          <h1 className={styles.title}>로그인</h1>
          <p className={styles.subtitle}>학번으로 로그인하세요</p>

          {/* 입력 폼 */}
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="studentId">
              학번
            </label>
            <input id="studentId" className={styles.input} type="text" placeholder="202111111" />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">
              비밀번호
            </label>
            <input id="password" className={styles.input} type="password" />
          </div>

          {/* 비밀번호 찾기 */}
          <div className={styles.forgotRow}>
            <Link href="/login/findpassword" className={styles.forgotLink}>
              비밀번호 찾기
            </Link>
          </div>

          {/* 로그인 버튼 */}
          <button className={styles.loginBtn}>로그인</button>

          {/* 구분선 */}
          <div className={styles.divider}>
            <span className={styles.dividerText}>또는</span>
          </div>

          {/* 회원가입 */}
          <p className={styles.signupText}>
            아직 계정이 없으신가요?{" "}
            <Link href="/signup" className={styles.signupLink}>
              회원가입
            </Link>
          </p>

          {/* 하단 카피라이트 */}
          <p className={styles.copyright}>©2026 SKHUBOX 성공회대학교 사물함 예약 서비스</p>
        </div>
      </div>

      {/* 오른쪽 빈 영역 */}
      <div className={styles.rightPanel} />
    </div>
  );
}
