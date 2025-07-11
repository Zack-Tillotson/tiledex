import React from "react";
import styles from "./button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

/**
 * Button component for actions and form submissions
 * @param children - Button content
 * @param type - Button type (button, submit, reset)
 * @param variant - Visual style variant
 * @param size - Button size
 * @param disabled - Whether the button is disabled
 * @param onClick - Click handler
 * @param className - Additional CSS classes
 */
export function Button({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
    >
      {children}
    </button>
  );
} 