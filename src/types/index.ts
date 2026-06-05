export type Role = "USER" | "ADMIN";

export type TransactionType = "TOPUP" | "TRANSFER" | "PAYMENT";
export type UserStatus = "ACTIVE" | "SUSPENDED";
export type WalletStatus = "ACTIVE" | "SUSPENDED";
export type TopupStatus = "PENDING" | "APPROVED" | "CANCELLED";
export type PaymentCodeStatus = "ACTIVE" | "PAID" | "CANCELLED" | "EXPIRED";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  status: UserStatus;
  createdAt: string;
}

export interface Wallet {
  id: string;
  userId: string;
  name: string;
  accountNumber: string;
  balance: number;
  currency: "IDR";
  status: WalletStatus;
  isPrimary: boolean;
  createdAt: string;
}

export interface CreateWallet {
  name: string;
}

export interface Transaction {
  id: string;
  walletId: string;
  userId: string;
  type: TransactionType;
  title: string;
  amount: number;
  direction: "IN" | "OUT";
  counterparty: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
  createdAt: string;
}

export interface TopupRequest {
  id: string;
  userId: string;
  walletId: string;
  amount: number;
  bankName: string;
  reference: string;
  status: TopupStatus;
  requestedAt: string;
  reviewedAt?: string;
}

export interface PaymentCode {
  id: string;
  userId: string;
  walletId: string;
  merchant: string;
  code: string;
  amount: number;
  note: string;
  status: PaymentCodeStatus;
  expiresAt: string;
  createdAt: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface TransferForm {
  fromWalletId: string;
  destinationAccount: string;
  amount: number;
  note: string;
}

export interface TopupForm {
  walletId: string;
  amount: number;
  bankName: string;
  reference: string;
}

export interface CreatePaymentCodeForm {
  walletId: string;
  merchant: string;
  amount: number;
  note: string;
}
