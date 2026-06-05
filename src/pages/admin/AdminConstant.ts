import type { SortOption } from "../../components/admin/AdminListView";
import type { Transaction } from "../../types";
import { NewestFirst, TextCompare } from "../../utils/sort";

export const TransactionSortOptions: SortOption<Transaction>[] = [
  {
    label: "Transaksi terbaru",
    value: "created-desc",
    compare: (first, second) => NewestFirst(first.createdAt, second.createdAt),
  },
  {
    label: "Nominal terbesar",
    value: "amount-desc",
    compare: (first, second) => second.amount - first.amount,
  },
  {
    label: "Jenis",
    value: "type-asc",
    compare: (first, second) => TextCompare(first.type, second.type),
  },
];
