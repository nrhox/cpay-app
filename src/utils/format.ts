export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

export const makeId = (prefix: string) =>
  `${prefix}-${crypto.randomUUID().slice(0, 8)}`;

export const makePaymentCode = () =>
  `CP-${Math.floor(100000 + Math.random() * 900000).toString()}`;
