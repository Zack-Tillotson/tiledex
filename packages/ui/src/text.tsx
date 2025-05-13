import { type JSX } from "react";

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
  className,
  as: Component = "p",
}: TextProps): JSX.Element {
  const variantClasses = {
    body: "text-base",
    caption: "text-sm",
    label: "text-base font-medium",
    small: "text-xs",
  };

  const combinedClassName = `${variantClasses[variant]} ${className || ""}`.trim();

  return <Component className={combinedClassName}>{children}</Component>;
}
