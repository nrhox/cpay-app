import type { ITransferBalanceRequest } from "../types/request";
import type { ITransaction } from "../types/transaction";
import {
  useFetchData,
  useFetchInfinite,
  useMutateData,
  type tOptionMutate,
} from "./hooks";

export function useGetAllCurrentTransaction() {
  return useFetchInfinite<ITransaction>(
    ["get_all_transaction"],
    "/api/v1/transaction",
  );
}

export function useGetOneTransaction(refCode?: string) {
  return useFetchData<ITransaction>(
    ["get_transaction_" + refCode],
    "/api/v1/transaction/" + (refCode ?? ""),
  );
}

export function useGetWalletTransactions(accountNumber: string) {
  return useFetchInfinite<ITransaction>(
    ["get_wallet_transactions_" + accountNumber],
    `/api/v1/transaction/wallet/${accountNumber}`,
  );
}

export function useTransferBalance(
  options?: tOptionMutate<ITransferBalanceRequest, ITransaction>,
) {
  return useMutateData<ITransferBalanceRequest, ITransaction>(
    "POST",
    "/api/v1/transfer",
    ["transfer"],
    options,
  );
}
