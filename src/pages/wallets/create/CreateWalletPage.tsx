import { useFormik } from "formik";
import { Wallet } from "lucide-react";
import { useNavigate } from "react-router";
import * as yup from "yup";
import FormInput from "../../../components/forms/FormInput";
import PinInput from "../../../components/transactions/PinInput";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/ui/PageHeader";
import { useCreateWallet } from "../../../feature/wallet";
import type { ICreateWalletRequest } from "../../../types/request";

const createWalletSchema = yup.object({
  wallet_name: yup
    .string()
    .required("wajib diisi")
    .max(100, "maksimal 100 huruf"),
  pin: yup.string().required("").length(6, `PIN harus ${6} digit`),
});

export default function CreateWalletPage() {
  const navigate = useNavigate();

  const { isPending, isSuccess, mutate } = useCreateWallet({
    onError: (err) => {
      if (err.response?.data.errors) {
        err.response.data.errors.forEach((err) => {
          setFieldError(err.field as "pin" | "wallet_name", err.message);
        });
      }
    },
    onSuccess: (data) => {
      navigate(`/wallets/${data.data?.account_number}`);
    },
  });

  const {
    values,
    touched,
    setFieldError,
    handleChange,
    setFieldValue,
    handleSubmit,
    errors,
  } = useFormik<ICreateWalletRequest>({
    initialValues: {
      pin: "",
      wallet_name: "",
    },
    validationSchema: createWalletSchema,
    onSubmit: (value) => {
      mutate(value);
    },
  });

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Buat rekening baru"
        description="Buat dombet sesuai kebutuhanmu."
      />
      <Card className="max-w-2xl">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <FormInput
            label="Nama dompet"
            name="wallet_name"
            value={values.wallet_name}
            onChange={handleChange}
            error={touched.wallet_name ? errors.wallet_name : undefined}
          />
          <div>
            <PinInput
              disabled={isPending || isSuccess}
              onComplete={(v) => setFieldValue("pin", v)}
            />
            {errors.pin && <p className="text-red-500">{errors.pin}</p>}
          </div>

          <Button type="submit">
            <Wallet size={18} />
            Buat
          </Button>
        </form>
      </Card>
    </div>
  );
}
