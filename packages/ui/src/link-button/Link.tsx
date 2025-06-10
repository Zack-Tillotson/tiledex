"use client";

import React, { type ReactNode } from "react";
import NextLink from "next/link";
import { type CustomLinkProps } from "./types";
import styles from "./styles.module.css";

export function Link({
  href,
  children,
  className = "",
  disabled = false,
  onClick,
  variant = "primary",
  size = "medium",
}: CustomLinkProps) {
  
  const classes = `${styles.base} ${styles[variant]} ${styles[size]} ${className}`.trim();

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
