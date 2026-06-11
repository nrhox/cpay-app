import type {
  ICreateWalletRequest,
  ISetPrimaryWalletRequest,
} from "../types/request";
import type { IWallet, IWalletWithUser } from "../types/wallet";
import {
  useFetchData,
  useMutateData,
  type tOptionMutate,
  type tOptionQuery,
} from "./hooks";

export function useGetAllWallet() {
  return useFetchData<IWallet[]>(["get_all_wallet"], "/api/v1/wallet");
}

export function useGetOneWallet(
  id?: string,
  option?: tOptionQuery<IWalletWithUser>,
) {
  return useFetchData<IWalletWithUser>(
    ["get_wallet_" + id],
    "/api/v1/wallet/" + (id ?? ""),
    option,
  );
}

export function useCreateWallet(
  options?: tOptionMutate<ICreateWalletRequest, IWallet>,
) {
  return useMutateData<ICreateWalletRequest, IWallet>(
    "POST",
    "/api/v1/wallet",
    ["create_wallet"],
    options,
  );
}

export function useSetPrimaryWallet(
  options?: tOptionMutate<ISetPrimaryWalletRequest, null>,
) {
  return useMutateData<ISetPrimaryWalletRequest, null>(
    "PUT",
    "/api/v1/wallet",
    ["set_primary_wallet"],
    options,
  );
}
