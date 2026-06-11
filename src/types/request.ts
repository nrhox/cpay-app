export interface ICreateWalletRequest {
  wallet_name: string;
  pin: string;
}

export interface ISetPrimaryWalletRequest {
  wallet_id: string;
}

export interface ITransferBalanceRequest {
  wallet_id: string;
  destination: string;
  amount: number;
  note?: string;
  pin: string;
}

export interface IRequestTopupRequest {
  wallet_number: string;
  amount: number;
}

export interface ICreatePaymentCodeRequest {
  wallet_id: string;
  amount: number;
  note?: string;
}

export interface ICreatePayingTransactionRequest {
  wallet_id: string;
  payment_code: string;
  pin: string;
}
