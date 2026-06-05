import { create } from "zustand";
import { wallets as initialWallets } from "../dummy/wallets";
import type { Wallet } from "../types";

interface WalletState {
  wallets: Wallet[];
  activeWalletId: string;
  setActiveWallet: (walletId: string) => void;
  adjustBalance: (walletId: string, amount: number) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  wallets: initialWallets,
  activeWalletId:
    initialWallets.find((wallet) => wallet.isPrimary)?.id ??
    initialWallets[0].id,
  setActiveWallet: (walletId) => set({ activeWalletId: walletId }),
  adjustBalance: (walletId, amount) =>
    set((state) => ({
      wallets: state.wallets.map((wallet) =>
        wallet.id === walletId
          ? { ...wallet, balance: wallet.balance + amount }
          : wallet,
      ),
    })),
}));

export const selectWallets = (state: WalletState) => state.wallets;
export const selectActiveWalletId = (state: WalletState) =>
  state.activeWalletId;
