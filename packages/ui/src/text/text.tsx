import React, { type JSX } from "react";
import textStyles from "./text.module.css";

/**
 * Available text variants for styling and semantic meaning
 */
export type TextVariant = "body" | "caption" | "label" | "small" | "lead";

/**
 * Text component for consistent typography across the application
 * @param children - The content to render
 * @param variant - The style variant to apply
 * @param className - Additional CSS class to apply
 * @param as - The HTML element to render as
 */
interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const styles = textStyles as {
  text: string;
  body: string;
  caption: string;
  label: string;
  small: string;
  lead: string;
};

export function Text({
  children,
  variant = "body",
  className = "",
  as: Component = "p",
}: TextProps): JSX.Element {
  const combinedClassName = `${styles.text} ${styles[variant]} ${className}`.trim();

  return <Component className={combinedClassName}>{children}</Component>;
}

export default Text;
