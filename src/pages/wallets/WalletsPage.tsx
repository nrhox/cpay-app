import { Wallet } from "lucide-react";
import { Link } from "react-router";
import Loading from "../../components/general/loading";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import WalletCard from "../../components/wallet/WalletCard";
import { useGetAllWallet, useSetPrimaryWallet } from "../../feature/wallet";

export default function WalletsPage() {
  const { data, isLoading, refetch } = useGetAllWallet();
  const { isPending, mutate } = useSetPrimaryWallet({
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Dompet"
        description="Kelola wallet dan pilih wallet aktif untuk transaksi."
        actions={
          <Link to="/wallets/create">
            <Button type="button">
              <Wallet size={18} />
              Buat
            </Button>
          </Link>
        }
      />
      {isLoading && <Loading />}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {!isLoading &&
          (data?.data ?? []).map((wallet, i) => (
            <div key={i} className="grid gap-3">
              <Link to={`/wallets/${wallet.account_number}`}>
                <WalletCard
                  wallet={wallet}
                  active={wallet.status === "ACTIVE"}
                />
              </Link>
              <Button
                disabled={isPending}
                type="button"
                variant={wallet.is_primary ? "primary" : "secondary"}
                onClick={() => mutate({ wallet_id: wallet._id })}
              >
                {wallet.is_primary ? "Utama" : "Alternatif"}
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
