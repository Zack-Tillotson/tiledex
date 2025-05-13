import { type JSX } from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Header({
  title,
  subtitle,
  className,
  children,
}: HeaderProps): JSX.Element {
  return (
    <header className={className}>
      <h1>{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
      {children}
    </header>
  );
}
