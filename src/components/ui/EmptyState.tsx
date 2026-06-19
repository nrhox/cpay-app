import type { ReactNode } from "react";

export default function EmptyState({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-neutral-muted bg-neutral-surface rounded-lg border border-dashed p-6 text-center">
      <p className="subheading">{title}</p>
      {children ? (
        <div className="paragraph text-neutral-muted mt-2">{children}</div>
      ) : null}
    </div>
  );
}
