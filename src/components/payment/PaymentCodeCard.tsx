import { Check, Copy, Download, QrCode } from "lucide-react";
import { useId, useState } from "react";
import QRCode from "react-qr-code";
import type { IPaymentCode } from "../../types/paymentCode";
import { formatCurrency, formatDate } from "../../utils/format";
import Badge, { PaymentTone } from "../ui/Badge";
import Button from "../ui/Button";
import Card from "../ui/Card";

export default function PaymentCodeCard({
  paymentCode,
  copyIcon = false,
  symbol = "icon",
}: {
  symbol?: "qr_code" | "icon";
  paymentCode?: IPaymentCode;
  copyIcon?: boolean;
}) {
  const qrId = useId();
  const [isCopy, setIsCopy] = useState(false);

  function handleCopy(text: string) {
    if (text) {
      navigator.clipboard.writeText(text);
      setIsCopy(true);
      setTimeout(() => setIsCopy(false), 2000);
    }
  }

  const handleDownloadQr = () => {
    const svgElement = document.getElementById(qrId);
    if (!svgElement) return;

    const svgString = new XMLSerializer().serializeToString(svgElement);

    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.width = 500;
      canvas.height = 500;

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = `qr_${paymentCode?._id.toUpperCase()}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    image.src = blobURL;
  };

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        {symbol === "icon" && (
          <div className="bg-primary-soft text-primary grid h-11 w-11 place-items-center rounded-md">
            <QrCode size={22} />
          </div>
        )}
        {symbol === "qr_code" && paymentCode?.code && (
          <div className="w-full">
            <QRCode id={qrId} value={paymentCode?.code} viewBox="0 0 256 256" />
            <Button
              variant="primary"
              onClick={() => handleDownloadQr()}
              className="mt-3"
            >
              <Download size={22} />
              Unduh
            </Button>
          </div>
        )}
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
