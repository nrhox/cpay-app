import { useFormik } from "formik";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import FormInput from "../../components/forms/FormInput";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import { usePaymentStore } from "../../stores/payment.store";

export default function PayPage() {
  const paymentCodes = usePaymentStore((state) => state.paymentCodes);
  const navigate = useNavigate();

  const formik = useFormik<{ code: string }>({
    initialValues: { code: "CP-581240" },
    onSubmit: (values) => {
      const paid = paymentCodes.find(
        (paymentCode) =>
          paymentCode.code === values.code && paymentCode.status === "ACTIVE",
      );
      if (!paid) return;

      navigate(`/pay/${values.code}`);
    },
  });

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Pay Using Code"
        description="Masukkan kode pembayaran aktif."
      />
      <Card className="max-w-xl">
        <form className="grid gap-4" onSubmit={formik.handleSubmit}>
          <FormInput
            label="Payment code"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
          />
          <Button type="submit">
            Berikutnya
            <ArrowRight size={18} />
          </Button>
        </form>
      </Card>
    </div>
  );
}
