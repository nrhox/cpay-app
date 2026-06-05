import { Navigate, Route, Routes } from "react-router";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminPaymentCodeDetailPage from "../pages/admin/payment-codes/AdminPaymentCodeDetailPage";
import AdminPaymentCodesPage from "../pages/admin/payment-codes/AdminPaymentCodesPage";
import AdminTopupDetailPage from "../pages/admin/topups/AdminTopupDetailPage";
import AdminTopupsPage from "../pages/admin/topups/AdminTopupsPage";
import AdminTransactionDetailPage from "../pages/admin/transactions/AdminTransactionDetailPage";
import AdminTransactionsPage from "../pages/admin/transactions/AdminTransactionsPage";
import AdminUserDetailPage from "../pages/admin/users/AdminUserDetailPage";
import AdminUsersPage from "../pages/admin/users/AdminUsersPage";
import AdminWalletDetailPage from "../pages/admin/wallets/AdminWalletDetailPage";
import AdminWalletsPage from "../pages/admin/wallets/AdminWalletsPage";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import PayPage from "../pages/pay/PayPage";
import DetailPayPage from "../pages/pay/detail/DetailPayPage";
import PayPinPage from "../pages/pay/pin/PayPinPage";
import PaymentCodesPage from "../pages/payment-codes/PaymentCodesPage";
import PaymentCodeCreatePage from "../pages/payment-codes/create/PaymentCodeCreatePage";
import PaymentCodeDetailPage from "../pages/payment-codes/detail/PaymentCodeDetailPage";
import ProfilePage from "../pages/profile/ProfilePage";
import TopupPage from "../pages/topup/TopupPage";
import TopupHistoryPage from "../pages/topup/history/TopupHistoryPage";
import TransactionHistoryPage from "../pages/transfer/TransactionHistoryPage";
import TransferDetailPage from "../pages/transfer/TransferDetailPage";
import TransferPage from "../pages/transfer/TransferPage";
import TransferPinPage from "../pages/transfer/pin/TransferPinPage";
import TransferSummaryPage from "../pages/transfer/summary/TransferSummaryPage";
import WalletsPage from "../pages/wallets/WalletsPage";
import CreateWalletPage from "../pages/wallets/create/CreateWalletPage";
import WalletDetailPage from "../pages/wallets/detail/WalletDetailPage";
import AppLayout from "./layouts/AppLayout";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/wallets" element={<WalletsPage />} />
        <Route path="/wallets/create" element={<CreateWalletPage />} />
        <Route path="/wallets/:id" element={<WalletDetailPage />} />
        <Route path="/topup" element={<TopupPage />} />
        <Route path="/topup/history" element={<TopupHistoryPage />} />
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
        <Route path="/payment-codes/:id" element={<PaymentCodeDetailPage />} />
        <Route path="/pay" element={<PayPage />} />
        <Route path="/pay/:id" element={<DetailPayPage />} />
        <Route path="/pay/:id/pin" element={<PayPinPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/users/:id" element={<AdminUserDetailPage />} />
        <Route path="/admin/wallets" element={<AdminWalletsPage />} />
        <Route path="/admin/wallets/:id" element={<AdminWalletDetailPage />} />
        <Route path="/admin/topups" element={<AdminTopupsPage />} />
        <Route path="/admin/topups/:id" element={<AdminTopupDetailPage />} />
        <Route path="/admin/transactions" element={<AdminTransactionsPage />} />
        <Route
          path="/admin/transactions/:id"
          element={<AdminTransactionDetailPage />}
        />
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
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
