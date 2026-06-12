import type { ReactNode } from "react";

export default function EmptyState({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-light-gray rounded-lg border border-dashed bg-white p-6 text-center">
      <p className="subheading">{title}</p>
      {children ? (
        <div className="paragraph text-primary mt-2">{children}</div>
      ) : null}
    </div>
  );
}
