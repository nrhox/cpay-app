import { QrCode } from "lucide-react";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";
import Loading from "../../components/general/loading";
import PaymentCodeCard from "../../components/payment/PaymentCodeCard";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import { useGetMyPaymentCodes } from "../../feature/payment";

export default function PaymentCodesPage() {
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
  } = useGetMyPaymentCodes();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Kode Pembayaran"
        description="Kode pembayaran yang dibuat untuk merchant."
        actions={
          <Link to="/payment-codes/create">
            <Button type="button">
              <QrCode size={18} />
              Buat
            </Button>
          </Link>
        }
      />
      {!isLoading && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data?.pages.map((group, i) => (
            <Fragment key={i}>
              {group.data?.map((paymentCode, i) => (
                <Link
                  key={paymentCode._id + i}
                  to={`/payment-codes/${paymentCode.code}`}
                >
                  <PaymentCodeCard paymentCode={paymentCode} />
                </Link>
              ))}
            </Fragment>
          ))}
        </div>
      )}
      {(hasNextPage || isFetching) && (
        <div ref={ref} className="h-5 w-full"></div>
      )}
      {isFetchingNextPage && <Loading />}
    </div>
  );
}
