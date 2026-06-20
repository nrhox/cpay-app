// import { ArrowRight } from "lucide-react";
// import { useEffect, useState, type SubmitEvent } from "react";
// import { useNavigate } from "react-router";
// import FormInput from "../../components/forms/FormInput";
// import Button from "../../components/ui/Button";
// import Card from "../../components/ui/Card";
// import PageHeader from "../../components/ui/PageHeader";
// import { useFindPaymentCodeDetails } from "../../feature/payment";

// export default function PayPage() {
//   const navigate = useNavigate();
//   const [isSubmit, setIsSubmit] = useState(false);
//   const [paymentCode, setPaymentCode] = useState("");
//   const [paymentError, setPaymentError] = useState("");

//   const { isLoading, error, isSuccess, data } = useFindPaymentCodeDetails(
//     paymentCode,
//     {
//       enabled: isSubmit,
//     },
//   );

//   useEffect(() => {
//     if (isSuccess && paymentCode.trim() !== "" && data.data) {
//       navigate("/pay/" + data.data.code);
//     }
//   }, [data?.data, paymentCode, isSuccess, navigate]);

//   const handleSubmit = (event: SubmitEvent) => {
//     if (!isLoading) {
//       event.preventDefault();
//       const payment = paymentCode.trim();

//       if (payment.length !== 14) {
//         setPaymentError("kode pembayaran tidak ada");
//         return;
//       }

//       setIsSubmit(true);
//     }
//   };

//   return (
//     <div className="grid gap-5">
//       <PageHeader
//         title="Bayar menggunakan kode"
//         description="Masukkan kode pembayaran aktif."
//       />
//       <Card className="max-w-xl">
//         <form className="grid gap-4" onSubmit={(e) => handleSubmit(e)}>
//           <FormInput
//             label="Kode pembayaran"
//             name="code"
//             value={paymentCode}
//             onChange={(e) => {
//               setPaymentCode(e.target.value);
//               setPaymentError("");
//               setIsSubmit(false);
//             }}
//             disabled={isLoading}
//             error={error?.response?.data.message || paymentError}
//           />
//           <Button type="submit" disabled={isLoading}>
//             Berikutnya
//             <ArrowRight size={18} />
//           </Button>
//         </form>
//       </Card>
//     </div>
//   );
// }
import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner";
import jsQR from "jsqr";
import { ArrowRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from "react";
import { useNavigate } from "react-router";
import AlertError from "../../components/allert/AlertError";
import FormInput from "../../components/forms/FormInput";
import Input from "../../components/forms/Input";
import Loading from "../../components/general/loading";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import { useFindPaymentCodeDetails } from "../../feature/payment";

function ScannerQrCode({
  onScan,
  handleManualInput,
  onError,
}: {
  onScan?: (code: string) => void;
  handleManualInput?: () => void;
  onError?: (message: string) => void;
}) {
  const [withImage, setWithImage] = useState(false);

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0) {
      if (onScan) onScan(detectedCodes[0].rawValue ?? "");
    }
  };

  const handleImageUpload = async (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const file = event.target.files?.item(0);
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) return;

      const image = new Image();
      image.src = e.target.result as string;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) return;

        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        );

        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          if (onScan) return onScan(code.data.trim());
        } else {
          if (onError) onError("qr tidak ada");
        }
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {!withImage && (
        <div className="relative aspect-square w-full">
          <Scanner
            onScan={handleScan}
            sound={false}
            constraints={{
              frameRate: { ideal: 30 },
              width: { ideal: 1280 },
              height: { ideal: 720 },
            }}
            formats={["qr_code"]}
            scanDelay={50}
            onError={(error) => console.log(error?.message)}
          />
        </div>
      )}

      {withImage && (
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border-neutral-muted focus:outline-primary-hover focus:ring-primary-hover focus:border-primary-hover rounded-lg border px-4 py-2"
        />
      )}

      <div className="mt-5 space-x-2">
        <Button onClick={() => handleManualInput && handleManualInput()}>
          Ketik manual
        </Button>
        <Button onClick={() => setWithImage((prev) => !prev)}>
          {withImage ? "Scan barcode" : "Unggah kode"}
        </Button>
      </div>
    </>
  );
}

export default function PayPage() {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [paymentCode, setPaymentCode] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [isScanner, setIsScanner] = useState(false);

  const { isLoading, error, isSuccess, data, isFetched, isFetching } =
    useFindPaymentCodeDetails(paymentCode, {
      enabled: isSubmit,
    });

  useEffect(() => {
    if (isSuccess && paymentCode.trim() !== "" && data.data) {
      navigate("/pay/" + data.data.code);
    }
  }, [data?.data, paymentCode, isSuccess, navigate]);

  const handleSubmit = (event: SubmitEvent) => {
    if (!isLoading) {
      event.preventDefault();
      const payment = paymentCode.trim();

      if (payment.length !== 14) {
        setPaymentError("kode pembayaran tidak ada");
        return;
      }

      setIsSubmit(true);
    }
  };

  const handleScan = useCallback(
    (code: string) => {
      if (!isLoading) {
        const payment = code.trim();

        if (payment.length !== 14) {
          setPaymentError("kode pembayaran tidak ada");
          return;
        }

        setIsSubmit(true);
      }
    },
    [isLoading],
  );

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Bayar menggunakan kode"
        description="Masukkan kode pembayaran aktif."
      />
      <div className="relative h-fit overflow-hidden">
        {(isLoading || isSuccess || isFetched || isFetching) && (
          <div className="bg-neutral-surface/80 absolute inset-x-0 z-10 flex h-full w-full items-center">
            <Loading />
          </div>
        )}
        <Card className="max-w-xl">
          {(error?.response?.data.message || paymentError) && (
            <AlertError
              message={error?.response?.data.message || paymentError}
            />
          )}

          {isScanner ? (
            <ScannerQrCode
              onScan={(c) => {
                setIsSubmit(false);
                setPaymentCode(c);
                handleScan(c);
              }}
              onError={(msg) => setPaymentError(msg)}
              handleManualInput={() => setIsScanner(false)}
            />
          ) : (
            <>
              <form className="grid gap-4" onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <FormInput
                    label="Kode pembayaran"
                    name="code"
                    value={paymentCode}
                    onChange={(e) => {
                      setIsSubmit(false);
                      setPaymentCode(e.target.value);
                      setPaymentError("");
                    }}
                    disabled={isLoading}
                  />
                  <div>
                    <button
                      onClick={() => setIsScanner(true)}
                      type="button"
                      className="text-primary text-sm font-semibold"
                    >
                      Scan barcode
                    </button>
                  </div>
                </div>

                <Button type="submit" disabled={isLoading}>
                  Berikutnya
                  <ArrowRight size={18} />
                </Button>
              </form>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
