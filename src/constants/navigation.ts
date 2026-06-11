import {
  Banknote,
  ClipboardList,
  CreditCard,
  History,
  Home,
  QrCode,
  Send,
  ShieldCheck,
  User,
  Users,
  Wallet,
} from "lucide-react";

export const userNavigation = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Wallets", href: "/wallets", icon: Wallet },
  { label: "Top Up", href: "/topup", icon: Banknote },
  { label: "Transfer", href: "/transfer", icon: Send },
  { label: "Payment Codes", href: "/payment-codes", icon: QrCode },
  { label: "Pay", href: "/pay", icon: CreditCard },
  { label: "Transactions", href: "/transactions", icon: History },
  { label: "Profile", href: "/profile", icon: User },
];

export const adminNavigation = [
  { label: "Admin", href: "/admin", icon: ShieldCheck },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Topups", href: "/admin/topups", icon: ClipboardList },
  { label: "Payment Codes", href: "/admin/payment-codes", icon: QrCode },
  { label: "Profile", href: "/admin/profile", icon: User },
];
