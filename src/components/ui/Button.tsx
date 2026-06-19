import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  children: ReactNode;
}

export default function Button({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition disabled:opacity-50",
        variant === "primary" &&
          "bg-primary hover:bg-primary-hover text-primary-contrast",
        variant === "secondary" &&
          "border-neutral-muted bg-neutral-surface text-neutral-text hover:bg-primary-soft hover:text-neutral-text border",
        variant === "danger" &&
          "bg-danger text-primary-contrast hover:opacity-90",
        variant === "ghost" && "text-neutral-text hover:bg-primary-soft",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
