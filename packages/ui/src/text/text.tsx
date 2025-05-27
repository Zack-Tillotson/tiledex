import { type JSX } from "react";
import styles from "./text.module.css";

type TextVariant = "body" | "caption" | "label" | "small";

interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function Text({
  children,
  variant = "body",
  className = "",
  as: Component = "p",
}: TextProps): JSX.Element {
  const combinedClassName =
    `${styles.text} ${styles[variant]} ${className}`.trim();

  return <Component className={combinedClassName}>{children}</Component>;
}
