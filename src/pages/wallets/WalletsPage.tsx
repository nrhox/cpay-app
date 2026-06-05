import { Wallet } from "lucide-react";
import { Link } from "react-router";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import WalletCard from "../../components/wallet/WalletCard";
import { selectCurrentUser, useAuthStore } from "../../stores/auth.store";
import {
  selectActiveWalletId,
  selectWallets,
  useWalletStore,
} from "../../stores/wallet.store";

export default function WalletsPage() {
  const currentUser = useAuthStore(selectCurrentUser);
  const wallets = useWalletStore(selectWallets).filter(
    (wallet) => wallet.userId === currentUser.id,
  );
  const activeWalletId = useWalletStore(selectActiveWalletId);
  const setActiveWallet = useWalletStore((state) => state.setActiveWallet);

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Wallets"
        description="Kelola wallet dan pilih wallet aktif untuk transaksi."
        actions={
          <Link to="/wallets/create">
            <Button type="button">
              <Wallet size={18} />
              Create
            </Button>
          </Link>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="grid gap-3">
            <Link to={`/wallets/${wallet.id}`}>
              <WalletCard
                wallet={wallet}
                active={wallet.id === activeWalletId}
              />
            </Link>
            <Button
              type="button"
              variant={wallet.id === activeWalletId ? "primary" : "secondary"}
              onClick={() => setActiveWallet(wallet.id)}
            >
              Set Active Wallet
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
