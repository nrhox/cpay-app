import clsx from "clsx";
import type { PaymentCode } from "../../types";

export const PaymentTone = (status: PaymentCode["status"]) => {
  if (status === "ACTIVE") return "success";
  if (status === "PAID") return "neutral";
  if (status === "EXPIRED") return "warning";
  return "danger";
};

export default function Badge({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "success" | "warning" | "danger";
}) {
  return (
    <span
      className={clsx(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
        tone === "neutral" && "bg-primary-50 text-primary-700",
        tone === "success" && "bg-emerald-50 text-emerald-700",
        tone === "warning" && "bg-amber-50 text-amber-700",
        tone === "danger" && "bg-red-50 text-red-700",
      )}
    >
      {label}
    </span>
  );
}
