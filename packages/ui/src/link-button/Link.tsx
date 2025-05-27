import { type JSX } from "react";
import NextLink from "next/link";
import styles from "./styles.module.css";
import { type LinkProps } from "./types";

export function Link({
  children,
  variant = "primary",
  size = "medium",
  className = "",
  disabled = false,
  href,
}: LinkProps): JSX.Element {
  const combinedClassName =
    `${styles.base} ${styles[variant]} ${styles[size]} ${className}`.trim();

  return (
    <NextLink
      href={href}
      className={combinedClassName}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      onClick={disabled ? (e) => e.preventDefault() : undefined}
    >
      {children}
    </NextLink>
  );
}
