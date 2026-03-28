"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiBox } from "react-icons/fi";
import styles from "./FindPassword.module.css";
import Link from "next/link";

type Phase = "email" | "verify" | "reset";

export default function FindPasswordPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("email");

  // Phase 1: 이메일
  const [email, setEmail] = useState("");

  // Phase 2: 인증코드
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Phase 3: 새 비밀번호
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  // 타이머
  useEffect(() => {
    if (phase !== "verify" || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

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
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSendCode = () => {
    setTimeLeft(300);
    setPhase("verify");
  };

  const handleVerify = () => {
    setPhase("reset");
  };

  const handleResend = () => {
    setTimeLeft(300);
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const handleResetPassword = () => {
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.formPanel}>
        <div className={styles.formInner}>
          {/* 로고 */}
          <div className={styles.logoSection}>
            <div className={styles.logo}>
              <FiBox className={styles.logoIcon} />
            </div>
            SKHUBOX
          </div>

          {/* ===== Phase 1: 이메일 입력 ===== */}
          {phase === "email" && (
            <>
              <h1 className={styles.title}>비밀번호 찾기</h1>
              <p className={styles.subtitle}>
                가입 시 등록한 학교 이메일을 입력해 주세요.
                <br />
                인증번호를 보내드립니다.
              </p>

              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="email">
                  학교 이메일
                </label>
                <div className={styles.emailWrapper}>
                  <input
                    id="email"
                    className={styles.input}
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="학번"
                  />
                  <span className={styles.emailSuffix}>@office.skhu.ac.kr</span>
                </div>
              </div>

              <button className={styles.primaryBtn} onClick={handleSendCode}>
                인증번호 발송
              </button>

              <p className={styles.bottomText}>
                <Link href="/login" className={styles.bottomLink}>
                  로그인으로 돌아가기
                </Link>
              </p>
            </>
          )}

          {/* ===== Phase 2: 인증코드 입력 ===== */}
          {phase === "verify" && (
            <>
              <h1 className={styles.title}>인증번호 입력</h1>
              <p className={styles.subtitle}>학교 이메일로 전송된 6자리 인증코드를 입력해주세요.</p>

              <div className={styles.emailNotice}>
                <div className={styles.emailNoticeIcon}>
                  <svg viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div className={styles.emailNoticeText}>
                  <span className={styles.emailNoticeAddr}>{email}@office.skhu.ac.kr 로</span>
                  <span className={styles.emailNoticeDesc}>
                    인증 번호를 전송했습니다.
                    <br />
                    메일함을 확인해 주세요.
                  </span>
                </div>
              </div>

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

              <div className={styles.codeActions}>
                <span className={styles.timer}>⏱ {formatTime(timeLeft)}</span>
                <button className={styles.resendBtn} onClick={handleResend}>
                  인증코드 재발송
                </button>
              </div>

              <button className={styles.primaryBtn} onClick={handleVerify}>
                인증 확인
              </button>

              <p className={styles.bottomText}>
                <button className={styles.bottomLink} onClick={() => setPhase("email")}>
                  이전 단계로 돌아가기
                </button>
              </p>
            </>
          )}

          {/* ===== Phase 3: 새 비밀번호 설정 ===== */}
          {phase === "reset" && (
            <>
              <h1 className={styles.title}>새 비밀번호 설정</h1>
              <p className={styles.subtitle}>새로운 비밀번호를 입력해 주세요.</p>

              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="newPassword">
                  새로운 비밀번호
                </label>
                <input
                  id="newPassword"
                  className={styles.input}
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="newPasswordConfirm">
                  새로운 비밀번호 확인
                </label>
                <input
                  id="newPasswordConfirm"
                  className={styles.input}
                  type="password"
                  value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                />
              </div>

              <button className={styles.primaryBtn} onClick={handleResetPassword}>
                비밀번호 변경
              </button>

              <p className={styles.bottomText}>
                <Link href="/login" className={styles.bottomLink}>
                  로그인으로 돌아가기
                </Link>
              </p>
            </>
          )}

          <p className={styles.copyright}>©2026 SKHUBOX 성공회대학교 사물함 예약 서비스</p>
        </div>
      </div>
      <div className={styles.rightPanel} />
    </div>
  );
}
