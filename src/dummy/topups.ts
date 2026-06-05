import type { TopupRequest } from "../types";

export const topups: TopupRequest[] = [
  {
    id: "top-1",
    userId: "usr-1",
    walletId: "wal-1",
    amount: 2500000,
    bankName: "BCA",
    reference: "BCA-982011",
    status: "APPROVED",
    requestedAt: "2026-05-28T06:10:00.000Z",
    reviewedAt: "2026-05-28T06:30:00.000Z",
  },
  {
    id: "top-2",
    userId: "usr-1",
    walletId: "wal-2",
    amount: 1000000,
    bankName: "Mandiri",
    reference: "MDR-442902",
    status: "PENDING",
    requestedAt: "2026-06-02T08:40:00.000Z",
  },
  {
    id: "top-3",
    userId: "usr-2",
    walletId: "wal-3",
    amount: 3000000,
    bankName: "BNI",
    reference: "BNI-119001",
    status: "PENDING",
    requestedAt: "2026-06-02T11:00:00.000Z",
  },
];
