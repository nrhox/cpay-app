import { create } from "zustand";
import { topups as initialTopups } from "../dummy/topups";
import type { TopupForm, TopupRequest } from "../types";
import { makeId } from "../utils/format";

interface TopupState {
  topups: TopupRequest[];
  createTopup: (userId: string, form: TopupForm) => void;
  approveTopup: (id: string) => TopupRequest | undefined;
  cancelTopup: (id: string) => void;
}

export const useTopupStore = create<TopupState>((set, get) => ({
  topups: initialTopups,
  createTopup: (userId, form) =>
    set((state) => ({
      topups: [
        {
          id: makeId("top"),
          userId,
          walletId: form.walletId,
          amount: Number(form.amount),
          bankName: form.bankName,
          reference: form.reference,
          status: "PENDING",
          requestedAt: new Date().toISOString(),
        },
        ...state.topups,
      ],
    })),
  approveTopup: (id) => {
    const target = get().topups.find((topup) => topup.id === id);
    set((state) => ({
      topups: state.topups.map((topup) =>
        topup.id === id
          ? {
              ...topup,
              status: "APPROVED",
              reviewedAt: new Date().toISOString(),
            }
          : topup,
      ),
    }));
    return target;
  },
  cancelTopup: (id) =>
    set((state) => ({
      topups: state.topups.map((topup) =>
        topup.id === id
          ? {
              ...topup,
              status: "CANCELLED",
              reviewedAt: new Date().toISOString(),
            }
          : topup,
      ),
    })),
}));

export const selectTopups = (state: TopupState) => state.topups;
