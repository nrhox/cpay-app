import clsx from "clsx";
import type { tPaymentCodeStatus } from "../../types/paymentCode";

export const PaymentTone = (status: tPaymentCodeStatus) => {
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
        "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold",
        tone === "neutral" && "bg-primary-soft text-primary border-primary/20",
        tone === "success" && "bg-success/10 text-success border-success/20",
        tone === "warning" && "bg-warning/10 text-warning border-warning/20",
        tone === "danger" && "bg-danger/10 text-danger border-danger/20",
      )}
    >
      {label}
    </span>
  );
}
