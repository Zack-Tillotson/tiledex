export type ButtonVariant = "primary" | "secondary" | "outline" | "text";
export type ButtonSize = "small" | "medium" | "large";

export interface BaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
}

export interface ButtonProps extends BaseProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export interface LinkProps extends BaseProps {
  href: string;
}
