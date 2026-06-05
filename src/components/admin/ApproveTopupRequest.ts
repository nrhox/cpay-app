import { useTopupStore } from "../../stores/topup.store";
import { useTransactionStore } from "../../stores/transaction.store";
import { useWalletStore } from "../../stores/wallet.store";
import type { TopupRequest } from "../../types";
import { makeId } from "../../utils/format";

export function ApproveTopupRequest(topup: TopupRequest) {
  const approveTopup = useTopupStore.getState().approveTopup;
  const adjustBalance = useWalletStore.getState().adjustBalance;
  const addTransaction = useTransactionStore.getState().addTransaction;
  const approvedTopup = approveTopup(topup.id);

  if (!approvedTopup) return;

  adjustBalance(approvedTopup.walletId, approvedTopup.amount);
  addTransaction({
    id: makeId("trx"),
    walletId: approvedTopup.walletId,
    userId: approvedTopup.userId,
    type: "TOPUP",
    title: "Top up approved",
    amount: approvedTopup.amount,
    direction: "IN",
    counterparty: approvedTopup.bankName,
    status: "SUCCESS",
    createdAt: new Date().toISOString(),
  });
}
