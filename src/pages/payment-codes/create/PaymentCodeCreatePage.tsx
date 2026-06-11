import { useFormik } from "formik";
import { QrCode } from "lucide-react";
import { useNavigate } from "react-router";
import * as yup from "yup";
import FormInput from "../../../components/forms/FormInput";
import FormSelect from "../../../components/forms/FormSelect";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/ui/PageHeader";
import { useCreatePaymentCode } from "../../../feature/payment";
import { useGetAllWallet } from "../../../feature/wallet";
import type { ICreatePaymentCodeRequest } from "../../../types/request";

const createPaymentCodeSchema = yup.object({
  wallet_id: yup.string().required("Wallet wajib dipilih"),
  amount: yup
    .number()
    .min(1000, "Minimal Rp1.000")
    .required("Nominal wajib diisi"),
  note: yup.string().max(80, "Maksimal 80 karakter"),
});

export default function PaymentCodeCreatePage() {
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllWallet();

  const { mutate, isPending, isSuccess } = useCreatePaymentCode({
    onError: (err) => {
      (err.response?.data?.errors || []).forEach((error) => {
        setFieldError(error.field, error.message);
      });
    },
    onSuccess: (data) => {
      navigate("/payment-codes/" + data.data?.code);
    },
  });

  const { errors, touched, handleChange, handleSubmit, setFieldError, values } =
    useFormik<ICreatePaymentCodeRequest>({
      initialValues: {
        wallet_id: "",
        amount: 10000,
        note: "",
      },
      validationSchema: createPaymentCodeSchema,
      onSubmit: (values) => {
        mutate(values);
      },
    });

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Create Payment Code"
        description="Buat kode untuk dibayar note."
      />
      <Card className="max-w-2xl">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <FormSelect
            disabled={isLoading || isPending || isSuccess}
            label="Wallet"
            name="wallet_id"
            value={values.wallet_id}
            onChange={handleChange}
            options={(data?.data || []).map((wallet) => ({
              label: wallet.name,
              value: wallet._id,
            }))}
            error={touched.wallet_id ? errors.wallet_id : undefined}
          />
          <FormInput
            label="Amount"
            name="amount"
            disabled={isLoading || isPending || isSuccess}
            type="number"
            value={values.amount}
            onChange={handleChange}
            error={touched.amount ? errors.amount : undefined}
          />
          <FormInput
            label="Note"
            name="note"
            value={values.note}
            disabled={isLoading || isPending || isSuccess}
            onChange={handleChange}
            error={touched.note ? errors.note : undefined}
          />
          <Button type="submit" disabled={isLoading || isPending || isSuccess}>
            <QrCode size={18} />
            Buat kode
          </Button>
        </form>
      </Card>
    </div>
  );
}
