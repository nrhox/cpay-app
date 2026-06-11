import type { tPaymentCodeStatus } from "../../types/paymentCode";
import type { tTopupStatus } from "../../types/topup";
import type { tTransactionStatus } from "../../types/transaction";
import type { tUserStatus } from "../../types/user";
import type { tStatusWallet } from "../../types/wallet";

export function StatusTone(
  status:
    | tUserStatus
    | tStatusWallet
    | tTopupStatus
    | tPaymentCodeStatus
    | tTransactionStatus
    | tUserStatus,
) {
  if (status === "ACTIVE" || status === "PAID" || status === "SUCCESS")
    return "success";
  if (status === "PENDING" || status === "EXPIRED") return "warning";
  return "danger";
}

export function TopupTone(status: tTopupStatus) {
  if (status === "SUCCESS") return "success";
  if (status === "PENDING") return "warning";
  return "danger";
}
