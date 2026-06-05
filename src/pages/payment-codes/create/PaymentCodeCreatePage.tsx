import { useFormik } from "formik";
import { QrCode } from "lucide-react";
import * as yup from "yup";
import FormInput from "../../../components/forms/FormInput";
import FormSelect from "../../../components/forms/FormSelect";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/ui/PageHeader";
import { selectCurrentUser, useAuthStore } from "../../../stores/auth.store";
import { usePaymentStore } from "../../../stores/payment.store";
import {
  selectActiveWalletId,
  selectWallets,
  useWalletStore,
} from "../../../stores/wallet.store";
import type { CreatePaymentCodeForm } from "../../../types";

const createPaymentCodeSchema = yup.object({
  walletId: yup.string().required("Wallet wajib dipilih"),
  merchant: yup.string().required("Merchant wajib diisi"),
  amount: yup
    .number()
    .min(10000, "Minimal Rp10.000")
    .required("Nominal wajib diisi"),
  note: yup.string().max(80, "Maksimal 80 karakter"),
});

export default function PaymentCodeCreatePage() {
  const currentUser = useAuthStore(selectCurrentUser);
  const activeWalletId = useWalletStore(selectActiveWalletId);
  const wallets = useWalletStore(selectWallets).filter(
    (wallet) => wallet.userId === currentUser.id,
  );
  const createPaymentCode = usePaymentStore((state) => state.createPaymentCode);
  const formik = useFormik<CreatePaymentCodeForm>({
    initialValues: {
      walletId: activeWalletId,
      merchant: "",
      amount: 10000,
      note: "",
    },
    validationSchema: createPaymentCodeSchema,
    onSubmit: (values, helpers) => {
      createPaymentCode(currentUser.id, values);
      helpers.resetForm({
        values: { ...values, merchant: "", amount: 10000, note: "" },
      });
    },
  });

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Create Payment Code"
        description="Buat kode untuk dibayar merchant."
      />
      <Card className="max-w-2xl">
        <form className="grid gap-4" onSubmit={formik.handleSubmit}>
          <FormSelect
            label="Wallet"
            name="walletId"
            value={formik.values.walletId}
            onChange={formik.handleChange}
            options={wallets.map((wallet) => ({
              label: wallet.name,
              value: wallet.id,
            }))}
            error={formik.touched.walletId ? formik.errors.walletId : undefined}
          />
          <FormInput
            label="Merchant"
            name="merchant"
            value={formik.values.merchant}
            onChange={formik.handleChange}
            error={formik.touched.merchant ? formik.errors.merchant : undefined}
          />
          <FormInput
            label="Amount"
            name="amount"
            type="number"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount ? formik.errors.amount : undefined}
          />
          <FormInput
            label="Note"
            name="note"
            value={formik.values.note}
            onChange={formik.handleChange}
            error={formik.touched.note ? formik.errors.note : undefined}
          />
          <Button type="submit">
            <QrCode size={18} />
            Create Code
          </Button>
        </form>
      </Card>
    </div>
  );
}
