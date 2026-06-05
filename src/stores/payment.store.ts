import { create } from "zustand";
import { paymentCodes as initialPaymentCodes } from "../dummy/payment-codes";
import type { CreatePaymentCodeForm, PaymentCode } from "../types";
import { makeId, makePaymentCode } from "../utils/format";

interface PaymentState {
  paymentCodes: PaymentCode[];
  createPaymentCode: (userId: string, form: CreatePaymentCodeForm) => void;
  payPaymentCode: (code: string) => PaymentCode | undefined;
  closePaymentCode: (id: string) => void;
}

export const usePaymentStore = create<PaymentState>((set, get) => ({
  paymentCodes: initialPaymentCodes,
  createPaymentCode: (userId, form) =>
    set((state) => ({
      paymentCodes: [
        {
          id: makeId("pay"),
          userId,
          walletId: form.walletId,
          merchant: form.merchant,
          code: makePaymentCode(),
          amount: Number(form.amount),
          note: form.note,
          status: "ACTIVE",
          createdAt: new Date().toISOString(),
          expiresAt: new Date(
            Date.now() + 1000 * 60 * 60 * 24 * 3,
          ).toISOString(),
        },
        ...state.paymentCodes,
      ],
    })),
  payPaymentCode: (code) => {
    const target = get().paymentCodes.find(
      (paymentCode) =>
        paymentCode.code === code && paymentCode.status === "ACTIVE",
    );
    if (!target) return undefined;
    set((state) => ({
      paymentCodes: state.paymentCodes.map((paymentCode) =>
        paymentCode.id === target.id
          ? { ...paymentCode, status: "PAID" }
          : paymentCode,
      ),
    }));
    return target;
  },
  closePaymentCode: (id) =>
    set((state) => ({
      paymentCodes: state.paymentCodes.map((paymentCode) =>
        paymentCode.id === id
          ? { ...paymentCode, status: "CANCELLED" }
          : paymentCode,
      ),
    })),
}));

export const selectPaymentCodes = (state: PaymentState) => state.paymentCodes;
