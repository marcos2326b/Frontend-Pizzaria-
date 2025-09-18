"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from './style.module.scss'

export function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.inputWrapper}>
      <input
        type={showPassword ? "text" : "password"}
        required
        name="password"
        placeholder="***********"
        className={styles.input}
      />
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}
