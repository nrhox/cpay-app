import { useFormik } from "formik";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router";
import * as yup from "yup";
import FormInput from "../../components/forms/FormInput";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useAuthStore } from "../../stores/auth.store";
import type { LoginForm } from "../../types";

const loginSchema = yup.object({
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: yup
    .string()
    .min(6, "Minimal 6 karakter")
    .required("Password wajib diisi"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const formik = useFormik<LoginForm>({
    initialValues: { email: "nadia@cpay.local", password: "password" },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login(values.email);
      navigate("/dashboard");
    },
  });

  return (
    <main className="bg-background grid min-h-screen place-items-center px-4">
      <Card className="w-full max-w-md">
        <h1 className="heading text-primary-700">CPay</h1>
        <p className="paragraph text-primary mt-2">
          Masuk ke digital wallet dan banking workspace Anda.
        </p>
        <form className="mt-6 grid gap-4" onSubmit={formik.handleSubmit}>
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email ? formik.errors.email : undefined}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password ? formik.errors.password : undefined}
          />
          <Button type="submit" className="w-full">
            <LogIn size={18} />
            Login
          </Button>
        </form>
      </Card>
    </main>
  );
}
