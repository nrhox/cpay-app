import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import Loading from "../components/general/loading";
import AppLayout from "./layouts/AppLayout";

// Auth Pages
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const IncomplatePage = lazy(() => import("../pages/auth/IncomplateLoginPage"));

// Dashboard & Profile
const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));

// Pay Pages
const PayPage = lazy(() => import("../pages/pay/PayPage"));
const DetailPayPage = lazy(() => import("../pages/pay/detail/DetailPayPage"));
const PayPinPage = lazy(() => import("../pages/pay/pin/PayPinPage"));

// Payment Codes Pages
const PaymentCodesPage = lazy(
  () => import("../pages/payment-codes/PaymentCodesPage"),
);
const PaymentCodeCreatePage = lazy(
  () => import("../pages/payment-codes/create/PaymentCodeCreatePage"),
);
const PaymentCodeDetailPage = lazy(
  () => import("../pages/payment-codes/detail/PaymentCodeDetailPage"),
);

// Topup Pages
const TopupPage = lazy(() => import("../pages/topup/TopupPage"));

// Transfer Pages
const TransferPage = lazy(() => import("../pages/transfer/TransferPage"));
const TransferSummaryPage = lazy(
  () => import("../pages/transfer/summary/TransferSummaryPage"),
);
const TransferPinPage = lazy(
  () => import("../pages/transfer/pin/TransferPinPage"),
);
const TransferDetailPage = lazy(
  () => import("../pages/transfer/TransferDetailPage"),
);
const TransactionHistoryPage = lazy(
  () => import("../pages/transfer/TransactionHistoryPage"),
);

// Wallets Pages
const WalletsPage = lazy(() => import("../pages/wallets/WalletsPage"));
const CreateWalletPage = lazy(
  () => import("../pages/wallets/create/CreateWalletPage"),
);
const WalletDetailPage = lazy(
  () => import("../pages/wallets/detail/WalletDetailPage"),
);

const LegalPage = lazy(() => import("../pages/legal/LegalPage"));

// Admin Pages
const AdminDashboardPage = lazy(
  () => import("../pages/admin/AdminDashboardPage"),
);
const AdminUsersPage = lazy(
  () => import("../pages/admin/users/AdminUsersPage"),
);
const AdminUserDetailPage = lazy(
  () => import("../pages/admin/users/AdminUserDetailPage"),
);
const AdminTopupsPage = lazy(
  () => import("../pages/admin/topups/AdminTopupsPage"),
);
const AdminTopupDetailPage = lazy(
  () => import("../pages/admin/topups/AdminTopupDetailPage"),
);
const AdminPaymentCodesPage = lazy(
  () => import("../pages/admin/payment-codes/AdminPaymentCodesPage"),
);
const AdminPaymentCodeDetailPage = lazy(
  () => import("../pages/admin/payment-codes/AdminPaymentCodeDetailPage"),
);

export default function AppRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/login/incomplate" element={<IncomplatePage />} />
        <Route path="/legal" element={<LegalPage />} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/wallets" element={<WalletsPage />} />
          <Route path="/wallets/create" element={<CreateWalletPage />} />
          <Route path="/wallets/:id" element={<WalletDetailPage />} />
          <Route path="/topup" element={<TopupPage />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/transfer/summary" element={<TransferSummaryPage />} />
          <Route path="/transfer/pin" element={<TransferPinPage />} />
          <Route path="/transactions" element={<TransactionHistoryPage />} />
          <Route path="/transactions/:id" element={<TransferDetailPage />} />
          <Route path="/payment-codes" element={<PaymentCodesPage />} />
          <Route
            path="/payment-codes/create"
            element={<PaymentCodeCreatePage />}
          />
          <Route
            path="/payment-codes/:id"
            element={<PaymentCodeDetailPage />}
          />
          <Route path="/pay" element={<PayPage />} />
          <Route path="/pay/:id" element={<DetailPayPage />} />
          <Route path="/pay/:id/pin" element={<PayPinPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/users/:id" element={<AdminUserDetailPage />} />
          <Route path="/admin/topups" element={<AdminTopupsPage />} />
          <Route path="/admin/topups/:id" element={<AdminTopupDetailPage />} />
          <Route
            path="/admin/payment-codes"
            element={<AdminPaymentCodesPage />}
          />
          <Route
            path="/admin/payment-codes/:id"
            element={<AdminPaymentCodeDetailPage />}
          />
          <Route path="/admin/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
