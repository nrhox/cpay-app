export interface ITransactionParty {
  user_id: string;
  username: string;
  wallet_id: string;
  wallet_name: string;
  account_number: string;

  balance_before: number;
  balance_after?: number;
}

export type tTransactionType = "TOPUP" | "TRANSFER" | "PAYMENT";

export type tTransactionStatus = "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";

export interface ITransaction {
  _id: string;
  reference: string;
  type: tTransactionType;
  note?: string;

  amount: number;
  currency: string;
  status: tTransactionStatus;

  source?: ITransactionParty;
  destination?: ITransactionParty;

  created_at: string;
}
