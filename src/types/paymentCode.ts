export type tPaymentCodeStatus = "ACTIVE" | "PAID" | "CANCELLED" | "EXPIRED";

export interface IPaymentCode {
  _id: string;
  user_id: string;
  wallet_id: string;
  merchant: string;
  code: string;
  amount: number;
  note: string;
  status: tPaymentCodeStatus;
  expires_at: string;
  created_at: string;
}
