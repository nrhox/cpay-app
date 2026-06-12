import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import AlertError from "../../../components/allert/AlertError";
import Loading from "../../../components/general/loading";
import PinInput from "../../../components/transactions/PinInput";
import TransactionReview from "../../../components/transactions/TransactionReview";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/ui/PageHeader";
import {
  useFindPaymentCodeDetails,
  usePayPaymentCode,
} from "../../../feature/payment";
import { useGetAllWallet } from "../../../feature/wallet";
import { formatCurrency, formatDate } from "../../../utils/format";

export default function PayPinPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setError] = useState("");

  const { data: dataPayCode, isLoading: isLoadingPay } =
    useFindPaymentCodeDetails(id);
  const { data: dataWallets, isLoading } = useGetAllWallet();
  const { mutate } = usePayPaymentCode({
    onSuccess: (data) => {
      navigate("/transactions/" + data.data?.reference);
    },
    onError: (res) => {
      const errs = res.response?.data.errors;
      const errMsg = res.response?.data.message;

      if (errs) {
        const err = errs.at(0);
        if (err) {
          setError(err?.message || "");
          return;
        }
      }
      setError(errMsg ?? "");
      return;
    },
  });

  if (isLoadingPay || isLoading) {
    return <Loading />;
  }

  if (!dataPayCode?.data && !isLoadingPay) {
    return <Navigate to="/pay" />;
  }

  const completePayment = (pin: string) => {
    mutate({
      payment_code: id ?? "",
      pin: pin,
      wallet_id: dataWallets?.data?.find((v) => v.is_primary)?._id ?? "",
    });
  };

  return (
    <div className="grid gap-5">
      <PageHeader
        title="PIN Pembayaran"
        description="Masukkan PIN 6 digit untuk menyelesaikan pembayaran."
      />
      <TransactionReview
        items={[
          { label: "Merchant", value: dataPayCode?.data?.merchant || "-" },
          { label: "Kode pembayaran", value: dataPayCode?.data?.code || "-" },
          {
            label: "Nominal",
            value: formatCurrency(dataPayCode?.data?.amount || 0),
          },
          {
            label: "Kadaluarsa",
            value: formatDate(dataPayCode?.data?.expires_at || ""),
          },
          { label: "Catatan", value: dataPayCode?.data?.note || "-" },
        ]}
      />
      <Card className="max-w-xl">
        {errorMessage !== "" && <AlertError message={errorMessage} />}
        <PinInput onComplete={completePayment} />
      </Card>
    </div>
  );
}
