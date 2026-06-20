import { Check, Copy, QrCode } from "lucide-react";
import { useState } from "react";
import type { IPaymentCode } from "../../types/paymentCode";
import { formatCurrency, formatDate } from "../../utils/format";
import Badge, { PaymentTone } from "../ui/Badge";
import Card from "../ui/Card";

export default function PaymentCodeCard({
  paymentCode,
  copyIcon = false,
}: {
  paymentCode?: IPaymentCode;
  copyIcon?: boolean;
}) {
  const [isCopy, setIsCopy] = useState(false);

  function handleCopy(text: string) {
    if (text) {
      navigator.clipboard.writeText(text);
      setIsCopy(true);
      setTimeout(() => setIsCopy(false), 2000);
    }
  }

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="bg-primary-soft text-primary grid h-11 w-11 place-items-center rounded-md">
          <QrCode size={22} />
        </div>
        <Badge
          label={paymentCode?.status ?? ""}
          tone={PaymentTone(paymentCode?.status ?? "EXPIRED")}
        />
      </div>
      <p className="subheading mt-4">{paymentCode?.merchant ?? "-"}</p>
      <p className="subheading text-neutral-text mt-1 flex items-center">
        <span>{paymentCode?.code ?? "-"}</span>
        {copyIcon && (
          <button
            onClick={() => handleCopy(paymentCode?.code || "")}
            className="hover:text-primary hover:bg-neutral-bg ml-1.5 rounded p-0.5 transition"
            title="Salin Referensi"
          >
            {isCopy ? (
              <Check className="text-success size-4" />
            ) : (
              <Copy className="size-4" />
            )}
          </button>
        )}
      </p>
      <p className="text-neutral-text mt-3 font-bold">
        {formatCurrency(paymentCode?.amount ?? 0)}
      </p>
      <p className="caption text-neutral-text mt-2">
        Expires {formatDate(paymentCode?.expires_at ?? "")}
      </p>
    </Card>
  );
}
