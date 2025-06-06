"use client";

import { type ReactNode } from "react";
import NextLink from "next/link";
import { type LinkProps as NextLinkProps } from "next/link";
import styles from "./styles.module.css";
import { type CustomLinkProps } from "./types";

export function Link({
  href,
  children,
  className = "",
  disabled = false,
  onClick,
}: CustomLinkProps) {
  const baseClasses = "inline-flex items-center justify-center";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  const classes = `${baseClasses} ${disabledClasses} ${className}`.trim();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  return (
    <NextLink href={href} className={classes} onClick={handleClick}>
      {children}
    </NextLink>
  );
}
