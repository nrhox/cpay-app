import { QrCode } from "lucide-react";
import type { PaymentCode } from "../../types";
import { formatCurrency, formatDate } from "../../utils/format";
import Badge, { PaymentTone } from "../ui/Badge";
import Card from "../ui/Card";

export default function PaymentCodeCard({
  paymentCode,
}: {
  paymentCode: PaymentCode;
}) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="bg-primary-50 text-primary-700 grid h-11 w-11 place-items-center rounded-md">
          <QrCode size={22} />
        </div>
        <Badge
          label={paymentCode.status}
          tone={PaymentTone(paymentCode.status)}
        />
      </div>
      <p className="subheading mt-4">{paymentCode.merchant}</p>
      <p className="caption text-primary mt-1">{paymentCode.code}</p>
      <p className="text-primary mt-3 font-bold">
        {formatCurrency(paymentCode.amount)}
      </p>
      <p className="caption text-primary mt-2">
        Expires {formatDate(paymentCode.expiresAt)}
      </p>
    </Card>
  );
}
