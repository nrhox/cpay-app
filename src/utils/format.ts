export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export const formatDate = (value: string) => {
  let date: Date;

  if (value === "") {
    date = new Date();
  } else {
    try {
      date = new Date(value);
    } catch {
      date = new Date();
    }
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const makeId = (prefix: string) =>
  `${prefix}-${crypto.randomUUID().slice(0, 8)}`;

export const makePaymentCode = () =>
  `CP-${Math.floor(100000 + Math.random() * 900000).toString()}`;

export function formatAccount(
  value: string | number,
  delimiter: string = " ",
  chunkSizes: number[] = [4, 4, 4, 4],
): string {
  const cleanNumber: string = value?.toString()?.replace(/\D/g, "") || "";

  const chunks: string[] = [];
  let startIndex = 0;

  for (const size of chunkSizes) {
    if (startIndex >= cleanNumber.length) break;

    chunks.push(cleanNumber.substring(startIndex, startIndex + size));
    startIndex += size;
  }

  if (startIndex < cleanNumber.length) {
    chunks.push(cleanNumber.substring(startIndex));
  }

  return chunks.join(delimiter);
}
