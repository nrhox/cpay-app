import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link, useParams } from "react-router";
import Loading from "../../../components/general/loading";
import TransactionList from "../../../components/transfer/TransactionList";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import EmptyState from "../../../components/ui/EmptyState";
import PageHeader from "../../../components/ui/PageHeader";
import WalletCard from "../../../components/wallet/WalletCard";
import { useGetWalletTransactions } from "../../../feature/transaction";
import { useGetOneWallet } from "../../../feature/wallet";
import { useAuthStore } from "../../../stores/auth.store";
import { formatAccount, formatDate } from "../../../utils/format";

export default function WalletDetailPage() {
  const { id } = useParams();
  const { ref, inView } = useInView();
  const userId = useAuthStore((state) => state.currentUser?._id);

  const { data: dataWallet, isLoading: isLoadingWallet } = useGetOneWallet(id);
  const {
    data: dataTransaction,
    isLoading: isLoadingTransaction,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
  } = useGetWalletTransactions(id ?? "");

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  if (isLoadingWallet) return <Loading />;
  if (!isLoadingWallet && !dataWallet?.data)
    return <EmptyState title="Wallet tidak ditemukan" />;

  return (
    <div className="grid gap-5">
      <PageHeader
        title={dataWallet?.data?.name || "-"}
        description={formatAccount(dataWallet?.data?.account_number ?? "")}
        actions={
          <Link to="/wallets">
            <Button type="button" variant="secondary">
              Kembali
            </Button>
          </Link>
        }
      />
      <WalletCard wallet={dataWallet?.data} />
      <Card>
        <h2 className="subheading">Rincian rekening</h2>
        <div className="text-neutral-text mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <p>Status: {dataWallet?.data?.status}</p>
          <p>Dibuat pada: {formatDate(dataWallet?.data?.created_at ?? "")}</p>
          <p>Mata Uang: IDR</p>
          <p>Jenis: {dataWallet?.data?.is_primary ? "Utama" : "Alternatif"}</p>
        </div>
      </Card>
      <Card>
        <h2 className="subheading mb-3">Transaksi</h2>
        {!isLoadingTransaction &&
          dataTransaction?.pages?.map((group, i) => (
            <TransactionList
              key={i}
              userId={userId}
              transactions={group?.data ?? []}
            />
          ))}
        {(hasNextPage || isFetching) && (
          <div ref={ref} className="h-5 w-full"></div>
        )}
        {isFetchingNextPage && <Loading />}
      </Card>
    </div>
  );
}
