import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import PinInput from "../../../components/transactions/PinInput";
import TransactionReview from "../../../components/transactions/TransactionReview";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/ui/PageHeader";
import { useTransferBalance } from "../../../feature/transaction";
import type { iError } from "../../../types/response";
import { formatAccount, formatCurrency } from "../../../utils/format";
import type { ITransferBalanceRequest } from "../../../types/request";
import type { IWalletWithUser } from "../../../types/wallet";

interface TransferPinState {
  data: ITransferBalanceRequest;
  wallet: IWalletWithUser | null;
}

function onErroField(
  errors: iError[],
  field: string,
  action: (message: string) => void,
) {
  const err = errors.find((v) => v.field === field);
  if (err) {
    if (action) action(err.message);
    return true;
  }
  return false;
}

export default function TransferPinPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const transfer = location.state as TransferPinState | null;
  const [errorPin, setErrorPin] = useState("");

  const { mutate, isPending, isSuccess } = useTransferBalance({
    onSuccess: (data) => {
      navigate("/transactions/" + data.data?.reference || "", {
        replace: true,
      });
    },
    onError: (error) => {
      const resServer = error.response?.data;
      if (!resServer?.errors) {
        navigate("/transfer/summary", {
          replace: true,
          state: {
            error: resServer?.message ?? "",
            wallet: transfer?.wallet || null,
          },
        });
      } else {
        onErroField(resServer.errors, "pin", (msg) => setErrorPin(msg));

        onErroField(resServer.errors, "destionation", (msg) => {
          navigate("/transfer/summary", {
            replace: true,
            state: {
              error: msg,
              wallet: transfer?.wallet || null,
            },
          });
        });
      }
    },
  });

  if (!transfer?.data) return <Navigate to="/transfer" replace />;

  const completeTransfer = (pin: string) => {
    mutate({
      amount: transfer.data.amount,
      destination: transfer.data.destination,
      pin: pin,
      wallet_id: transfer.data.wallet_id,
      note: transfer.data.note,
    });
  };

  return (
    <div className="grid gap-5">
      <PageHeader
        title="PIN Transfer"
        description="Masukkan PIN 6 digit untuk menyelesaikan transfer."
      />
      <TransactionReview
        items={[
          { label: "Tujuan", value: transfer.wallet?.user?.full_name || "" },
          {
            label: "Wallet",
            value: formatAccount(transfer.wallet?.account_number ?? "") ?? "-",
          },
          {
            label: "Nominal",
            value: formatCurrency(Number(transfer.data.amount)),
          },
          { label: "Catatan", value: transfer.data.note || "-" },
        ]}
      />
      <Card className="max-w-xl">
        <PinInput
          disabled={isPending || isSuccess}
          onComplete={completeTransfer}
        />
        {errorPin !== "" && <p className="text-danger">{errorPin}</p>}
      </Card>
    </div>
  );
}
