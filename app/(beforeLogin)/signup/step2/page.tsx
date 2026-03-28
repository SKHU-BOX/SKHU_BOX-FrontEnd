"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiBox } from "react-icons/fi";
import styles from "../signup.module.css";
import Link from "next/link";

export default function SignupStep2() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(272); // 4:32
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 타이머
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m} : ${s}`;
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // 자동 포커스 이동
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    router.push("/signup/step3");
  };

  const handleResend = () => {
    setTimeLeft(300);
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const handleBack = () => {
    router.push("/signup/step1");
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

          {/* 스텝 배지 */}
          <div className={styles.stepBadge}>
            <span className={styles.stepDot} />
            STEP 2 / 3
          </div>

          {/* 타이틀 */}
          <h1 className={styles.title}>인증번호 입력</h1>
          <p className={styles.subtitle}>학교 이메일로 전송된 6자리 인증코드를 입력해주세요.</p>

          {/* 이메일 안내 박스 */}
          <div className={styles.emailNotice}>
            <div className={styles.emailNoticeIcon}>
              <svg viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <div className={styles.emailNoticeText}>
              <span className={styles.emailNoticeAddr}>202111111@office.skhu.ac.kr 로</span>
              <span className={styles.emailNoticeDesc}>
                인증 번호를 전송했습니다.
                <br />
                메일함을 확인해 주세요.
              </span>
            </div>
          </div>

          {/* 인증 코드 입력 */}
          <div className={styles.codeGroup}>
            <label className={styles.label}>인증 코드</label>
            <div className={styles.codeInputs}>
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  className={styles.codeInput}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                />
              ))}
            </div>
          </div>

          {/* 타이머 + 재발송 */}
          <div className={styles.codeActions}>
            <span className={styles.timer}>⏱ {formatTime(timeLeft)}</span>
            <button className={styles.resendBtn} onClick={handleResend}>
              인증코드 재발송
            </button>
          </div>

          {/* 인증 확인 버튼 */}
          <button className={styles.primaryBtn} onClick={handleVerify}>
            인증 확인
          </button>

          {/* 이전 단계로 */}
          <p className={styles.bottomText}>
            <button className={styles.bottomLink} onClick={handleBack}>
              이전 단계로 돌아가기
            </button>
          </p>

          {/* 카피라이트 */}
          <p className={styles.copyright}>©2026 SKHUBOX 성공회대학교 사물함 예약 서비스</p>
        </div>
      </div>
      <div className={styles.rightPanel} />
    </div>
  );
}
