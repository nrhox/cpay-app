import type { IUser } from "./user";

export type tStatusWallet = "ACTIVE" | "SUSPENDED";

export interface IWalletWithUser {
  _id: string;
  user_id: string;
  name: string;
  account_number: string;
  balance: number;
  status: tStatusWallet;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
  user: IUser;
}

export interface IWallet {
  _id: string;
  user_id: string;
  name: string;
  account_number: string;
  balance: number;
  status: tStatusWallet;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}
