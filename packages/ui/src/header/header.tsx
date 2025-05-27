import { type JSX } from "react";
import styles from "./header.module.css";

interface HeaderProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5;
  className?: string;
}

export function Header({
  children,
  level = 1,
  className = "",
}: HeaderProps): JSX.Element {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  const combinedClassName =
    `${styles.header} ${styles[`level${level}`]} ${className}`.trim();

  return <Component className={combinedClassName}>{children}</Component>;
}
