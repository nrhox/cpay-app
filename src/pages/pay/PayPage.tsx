import { ArrowRight } from "lucide-react";
import { useEffect, useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import FormInput from "../../components/forms/FormInput";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import { useFindPaymentCodeDetails } from "../../feature/payment";

export default function PayPage() {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [paymentCode, setPaymentCode] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const { isLoading, error, isSuccess, data } = useFindPaymentCodeDetails(
    paymentCode,
    {
      enabled: isSubmit,
    },
  );

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

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Bayar menggunakan kode"
        description="Masukkan kode pembayaran aktif."
      />
      <Card className="max-w-xl">
        <form className="grid gap-4" onSubmit={(e) => handleSubmit(e)}>
          <FormInput
            label="Kode pembayaran"
            name="code"
            value={paymentCode}
            onChange={(e) => {
              setPaymentCode(e.target.value);
              setPaymentError("");
              setIsSubmit(false);
            }}
            disabled={isLoading}
            error={error?.response?.data.message || paymentError}
          />
          <Button type="submit" disabled={isLoading}>
            Berikutnya
            <ArrowRight size={18} />
          </Button>
        </form>
      </Card>
    </div>
  );
}
