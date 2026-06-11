import type { ITransaction } from "../types/transaction";

export type TransactionDirection = "IN" | "OUT";

export function getTransactionDirection(
  transaction: ITransaction,
  currentUserId: string,
): TransactionDirection {
  if (transaction.type === "TOPUP") {
    return "IN";
  }

  if (transaction.source?.user_id === currentUserId) {
    return "OUT";
  }

  if (transaction.destination?.user_id === currentUserId) {
    return "IN";
  }

  return "IN";
}
