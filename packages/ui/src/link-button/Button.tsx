import React from "react";
import { type JSX } from "react";
import styles from "./styles.module.css";
import { type ButtonProps } from "./types";

export function Button({
  children,
  variant = "primary",
  size = "medium",
  className = "",
  onClick,
  disabled = false,
  type = "button",
}: ButtonProps): JSX.Element {
  const combinedClassName =
    `${styles.base} ${styles[variant]} ${styles[size]} ${className}`.trim();

  return (
    <button
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
