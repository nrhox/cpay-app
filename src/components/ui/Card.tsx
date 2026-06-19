import clsx from "clsx";
import type { ReactNode } from "react";

export default function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={clsx(
        "border-neutral-muted bg-neutral-surface rounded-lg border p-4 shadow-sm",
        className,
      )}
    >
      {children}
    </section>
  );
}
