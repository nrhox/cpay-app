import type { Wallet } from "../types";

export const wallets: Wallet[] = [
  {
    id: "wal-1",
    userId: "usr-1",
    name: "Main Wallet",
    accountNumber: "8800 1000 1290",
    balance: 18450000,
    currency: "IDR",
    status: "ACTIVE",
    isPrimary: true,
    createdAt: "2026-01-12T08:40:00.000Z",
  },
  {
    id: "wal-2",
    userId: "usr-1",
    name: "Travel Wallet",
    accountNumber: "8800 1000 7721",
    balance: 4200000,
    currency: "IDR",
    status: "ACTIVE",
    isPrimary: false,
    createdAt: "2026-03-01T09:00:00.000Z",
  },
  {
    id: "wal-3",
    userId: "usr-2",
    name: "Business Wallet",
    accountNumber: "8800 1000 3131",
    balance: 12890000,
    currency: "IDR",
    status: "ACTIVE",
    isPrimary: true,
    createdAt: "2026-02-04T10:20:00.000Z",
  },
];
