import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "../../components/general/loading";
import TransactionList from "../../components/transfer/TransactionList";
import PageHeader from "../../components/ui/PageHeader";
import { useGetAllCurrentTransaction } from "../../feature/transaction";
import { useAuthStore } from "../../stores/auth.store";

export default function TransactionHistoryPage() {
  const { ref, inView } = useInView();
  const userId = useAuthStore((state) => state.currentUser?._id);
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
  } = useGetAllCurrentTransaction();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Riwayat transaksi"
        description="Riwayat transaksi wallet Anda."
      />
      {!isLoading &&
        data?.pages.map((group, i) => (
          <TransactionList
            key={i}
            userId={userId}
            transactions={group.data ?? []}
          />
        ))}
      {(hasNextPage || isFetching) && (
        <div ref={ref} className="h-5 w-full"></div>
      )}
      {isFetchingNextPage && <Loading />}
    </div>
  );
}
