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
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
          "bg-primary-600 hover:bg-primary-700 text-white",
        variant === "secondary" &&
          "border-light-gray text-primary hover:bg-primary-50 border bg-white",
        variant === "danger" && "bg-danger text-white hover:brightness-95",
        variant === "ghost" && "text-primary hover:bg-primary-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
