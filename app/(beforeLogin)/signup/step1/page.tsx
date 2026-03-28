"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiBox } from "react-icons/fi";
import styles from "../signup.module.css";
import Link from "next/link";

export default function SignupStep1() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    studentId: "",
    department: "IT융합자율학부",
    role: "학생",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    router.push("/signup/step2");
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
            STEP 1 / 3
          </div>

          {/* 타이틀 */}
          <h1 className={styles.title}>기본 정보 입력</h1>
          <p className={styles.subtitle}>개인 정보와 로그인에 사용할 비밀번호를 입력해 주세요.</p>

          {/* 이름 / 학번 */}
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="name">
                이름
              </label>
              <input
                id="name"
                name="name"
                className={styles.input}
                type="text"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="studentId">
                학번
              </label>
              <input
                id="studentId"
                name="studentId"
                className={styles.input}
                type="text"
                value={form.studentId}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 학부 / 역할 */}
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="department">
                학부
              </label>
              <select
                id="department"
                name="department"
                className={styles.select}
                value={form.department}
                onChange={handleChange}
              >
                <option>인문융합콘텐츠학부</option>
                <option>경영학부</option>
                <option>사회융합학부</option>
                <option>미디어콘텐츠융합학부</option>
                <option>미래융합학부</option>
                <option>소프트웨어융합학부</option>
                <option>국제학부</option>
                <option>인문융합자율학부</option>
                <option>사회융합자율학부</option>
                <option>미디어콘텐츠융합자율학부</option>
                <option>IT융합자율학부</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="role">
                역할
              </label>
              <select id="role" name="role" className={styles.select} value={form.role} onChange={handleChange}>
                <option>학생</option>
                <option>관리자</option>
              </select>
            </div>
          </div>

          {/* 학교 이메일 */}
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">
              학교 이메일
            </label>
            <div className={styles.emailWrapper}>
              <input
                id="email"
                name="email"
                className={styles.input}
                type="text"
                value={form.email}
                onChange={handleChange}
              />
              <span className={styles.emailSuffix}>@office.skhu.ac.kr</span>
            </div>
            <p className={styles.inputHint}>해당 이메일로 인증번호가 전송됩니다.</p>
          </div>

          {/* 비밀번호 */}
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              className={styles.input}
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="passwordConfirm">
              비밀번호 확인
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              className={styles.input}
              type="password"
              value={form.passwordConfirm}
              onChange={handleChange}
            />
          </div>

          {/* 다음 단계 버튼 */}
          <button className={styles.primaryBtn} onClick={handleNext}>
            다음 단계
          </button>

          {/* 로그인 링크 */}
          <p className={styles.bottomText}>
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className={styles.bottomLink}>
              로그인
            </Link>
          </p>

          {/* 카피라이트 */}
          <p className={styles.copyright}>©2026 SKHUBOX 성공회대학교 사물함 예약 서비스</p>
        </div>
      </div>
      <div className={styles.rightPanel} />
    </div>
  );
}
