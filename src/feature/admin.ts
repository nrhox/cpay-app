import type { IPaymentCode } from "../types/paymentCode";
import type { ITopupRequest } from "../types/topup";
import type { IUser } from "../types/user";
import type { IWalletWithUser } from "../types/wallet";
import {
  useFetchData,
  useFetchInfinite,
  useMutateData,
  type tFetchQueryParams,
  type tOptionMutate,
} from "./hooks";

export function useAdminGetAllUsers(param?: tFetchQueryParams) {
  return useFetchInfinite<IUser>(
    ["admin_get_all_users"],
    "/api/v1/admin/user",
    param,
  );
}

export function useAdminGetUserById(id?: string) {
  return useFetchData<IUser>(
    ["admin_get_user_" + id],
    "/api/v1/admin/user/" + (id ?? ""),
    { enabled: !!id },
  );
}

export function useAdminGetUserWallets(id?: string) {
  return useFetchData<IWalletWithUser[]>(
    ["admin_get_user_wallets_" + id],
    "/api/v1/admin/user/" + (id ?? "") + "/wallet",
    { enabled: !!id },
  );
}

export function useAdminSuspendUser(
  id: string,
  options?: tOptionMutate<void, null>,
) {
  return useMutateData<void, null>(
    "PUT",
    `/api/v1/admin/user/${id}/suspend`,
    ["suspend_user"],
    options,
  );
}

export function useAdminActiveUser(
  id: string,
  options?: tOptionMutate<void, null>,
) {
  return useMutateData<void, null>(
    "PUT",
    `/api/v1/admin/user/${id}/active`,
    ["set_active_user"],
    options,
  );
}

export function useAdminListAllTopups(params?: tFetchQueryParams) {
  return useFetchInfinite<ITopupRequest>(
    ["admin_list_all_topups"],
    "/api/v1/admin/top-up",
    params,
  );
}

export function useAdminGetTopup(id?: string) {
  return useFetchData<ITopupRequest>(
    ["admin_get_topup_" + id],
    "/api/v1/admin/top-up/" + (id ?? ""),
    { enabled: !!id },
  );
}

export function useAdminApproveTopup(
  id: string,
  options?: tOptionMutate<void, ITopupRequest>,
) {
  return useMutateData<void, ITopupRequest>(
    "PUT",
    `/api/v1/admin/top-up/${id}/approved`,
    ["set_approved_topup"],
    options,
  );
}

export function useAdminRejectTopup(
  id: string,
  options?: tOptionMutate<void, ITopupRequest>,
) {
  return useMutateData<void, ITopupRequest>(
    "PUT",
    `/api/v1/admin/top-up/${id}/reject`,
    ["set_reject_toptup"],
    options,
  );
}

export function useAdminListAllPaymentCodes(params?: tFetchQueryParams) {
  return useFetchInfinite<IPaymentCode>(
    ["admin_list_all_payment_codes"],
    "/api/v1/admin/payment-code",
    params,
  );
}

export function useAdminGetPaymentCode(id?: string) {
  return useFetchData<IPaymentCode>(
    ["admin_get_payment_code_" + id],
    "/api/v1/admin/payment-code/" + (id ?? ""),
    { enabled: !!id },
  );
}

export function useAdminListUserPaymentCodes(id?: string) {
  return useFetchInfinite<IPaymentCode>(
    ["admin_list_user_payment_codes_" + id],
    "/api/v1/admin/payment-code/user/" + (id ?? ""),
  );
}

export function useAdminCancelPaymentCode(
  id: string,
  options?: tOptionMutate<void, null>,
) {
  return useMutateData<void, null>(
    "DELETE",
    `/api/v1/admin/payment-code/${id}/cancel`,
    ["set_cancel_payment_code_admin"],
    options,
  );
}
