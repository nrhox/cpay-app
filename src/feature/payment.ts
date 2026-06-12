import type { IPaymentCode } from "../types/paymentCode";
import type {
  ICreatePayingTransactionRequest,
  ICreatePaymentCodeRequest,
} from "../types/request";
import type { ITransaction } from "../types/transaction";
import {
  useFetchData,
  useFetchInfinite,
  useMutateData,
  type tOptionMutate,
  type tOptionQuery,
} from "./hooks";

export function useGetMyPaymentCodes() {
  return useFetchInfinite<IPaymentCode>(
    ["get_my_payment_codes"],
    "/api/v1/payment",
  );
}

export function usePayPaymentCode(
  options?: tOptionMutate<ICreatePayingTransactionRequest, ITransaction>,
) {
  return useMutateData<ICreatePayingTransactionRequest, ITransaction>(
    "POST",
    "/api/v1/payment",
    ["pay_paying_code"],
    options,
  );
}

export function useCreatePaymentCode(
  options?: tOptionMutate<ICreatePaymentCodeRequest, IPaymentCode>,
) {
  return useMutateData<ICreatePaymentCodeRequest, IPaymentCode>(
    "POST",
    "/api/v1/payment/create",
    ["paying_pay_code"],
    options,
  );
}

export function useFindPaymentCodeDetails(
  code?: string,
  options?: tOptionQuery<IPaymentCode>,
) {
  return useFetchData<IPaymentCode>(
    ["get_payment_code_details_" + code],
    "/api/v1/payment/" + (code ?? ""),
    { enabled: !!code, ...options },
  );
}

export function useCancelPaymentCode(
  code: string,
  options?: tOptionMutate<void, null>,
) {
  return useMutateData<void, null>(
    "DELETE",
    `/api/v1/payment/${code}/cancel`,
    ["cancel_payment"],
    options,
  );
}
