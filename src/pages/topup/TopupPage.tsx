import { useFormik } from "formik";
import { Banknote } from "lucide-react";
import { Link } from "react-router";
import * as yup from "yup";
import FormInput from "../../components/forms/FormInput";
import FormSelect from "../../components/forms/FormSelect";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import { selectCurrentUser, useAuthStore } from "../../stores/auth.store";
import { useTopupStore } from "../../stores/topup.store";
import {
  selectActiveWalletId,
  selectWallets,
  useWalletStore,
} from "../../stores/wallet.store";
import type { TopupForm } from "../../types";

const topupSchema = yup.object({
  walletId: yup.string().required("Wallet wajib dipilih"),
  amount: yup
    .number()
    .min(50000, "Minimal Rp50.000")
    .required("Nominal wajib diisi"),
  bankName: yup.string().required("Bank wajib dipilih"),
  reference: yup.string().required("Referensi wajib diisi"),
});

export default function TopupPage() {
  const currentUser = useAuthStore(selectCurrentUser);
  const activeWalletId = useWalletStore(selectActiveWalletId);
  const wallets = useWalletStore(selectWallets).filter(
    (wallet) => wallet.userId === currentUser.id,
  );
  const createTopup = useTopupStore((state) => state.createTopup);
  const formik = useFormik<TopupForm>({
    initialValues: {
      walletId: activeWalletId,
      amount: 50000,
      bankName: "BCA",
      reference: "",
    },
    validationSchema: topupSchema,
    onSubmit: (values, helpers) => {
      createTopup(currentUser.id, values);
      helpers.resetForm({
        values: { ...values, amount: 50000, reference: "" },
      });
    },
  });

  return (
    <div className="grid gap-5">
      <PageHeader
        title="Top Up Request"
        description="Ajukan top up untuk direview admin."
        actions={
          <Link to="/topup/history">
            <Button type="button" variant="secondary">
              History
            </Button>
          </Link>
        }
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
            label="Amount"
            name="amount"
            type="number"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount ? formik.errors.amount : undefined}
          />
          <FormSelect
            label="Bank"
            name="bankName"
            value={formik.values.bankName}
            onChange={formik.handleChange}
            options={["BCA", "Mandiri", "BNI", "BRI"].map((bank) => ({
              label: bank,
              value: bank,
            }))}
            error={formik.touched.bankName ? formik.errors.bankName : undefined}
          />
          <FormInput
            label="Transfer reference"
            name="reference"
            value={formik.values.reference}
            onChange={formik.handleChange}
            error={
              formik.touched.reference ? formik.errors.reference : undefined
            }
          />
          <Button type="submit">
            <Banknote size={18} />
            Create Request
          </Button>
        </form>
      </Card>
    </div>
  );
}
