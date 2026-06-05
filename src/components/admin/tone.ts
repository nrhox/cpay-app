import type {
  PaymentCode,
  TopupRequest,
  Transaction,
  UserStatus,
  WalletStatus,
} from "../../types";

export function StatusTone(
  status:
    | UserStatus
    | WalletStatus
    | TopupRequest["status"]
    | PaymentCode["status"]
    | Transaction["status"],
) {
  if (
    status === "ACTIVE" ||
    status === "APPROVED" ||
    status === "PAID" ||
    status === "SUCCESS"
  )
    return "success";
  if (status === "PENDING" || status === "EXPIRED") return "warning";
  return "danger";
}

export function TopupTone(status: TopupRequest["status"]) {
  if (status === "APPROVED") return "success";
  if (status === "PENDING") return "warning";
  return "danger";
}
