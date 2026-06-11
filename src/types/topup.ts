export type tTopupStatus = "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";

export interface ITopupRequest {
  _id: string;
  user_id: string;
  wallet_id: string;
  amount: number;
  reference: string;
  status: tTopupStatus;
  requested_at: string;
}
