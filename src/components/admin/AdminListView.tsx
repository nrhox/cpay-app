import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Input from "../forms/Input";
import EmptyState from "../ui/EmptyState";

export interface SortOption<T> {
  label: string;
  value: string;
  compare: (first: T, second: T) => number;
}

interface AdminListViewProps<T> {
  items: T[];
  searchPlaceholder?: string;
  searchText: (item: T) => string;
  sortOptions: SortOption<T>[];
  renderItem: (item: T) => ReactNode;
  emptyTitle?: string;
}

export default function AdminListView<T>({
  items,
  searchPlaceholder = "Cari data",
  searchText,
  sortOptions,
  renderItem,
  emptyTitle = "Data tidak ditemukan",
}: AdminListViewProps<T>) {
  const [query, setQuery] = useState("");
  const [selectedSortValue, setSelectedSortValue] = useState(
    sortOptions[0]?.value ?? "",
  );
  const selectedSort =
    sortOptions.find((option) => option.value === selectedSortValue) ??
    sortOptions[0];

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filteredItems = normalizedQuery
      ? items.filter((item) =>
          searchText(item).toLowerCase().includes(normalizedQuery),
        )
      : items;

    return [...filteredItems].sort(selectedSort?.compare);
  }, [items, query, searchText, selectedSort]);

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-[1fr_240px]">
        <label className="relative block">
          <Search
            className="text-primary pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
            size={17}
          />
          <Input
            className="border-light-gray focus:border-primary-500 focus:ring-primary-500 w-full rounded-md pl-10 text-sm"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <Listbox value={selectedSortValue} onChange={setSelectedSortValue}>
          <div className="relative">
            <ListboxButton className="border-light-gray text-primary flex min-h-10 w-full items-center justify-between rounded-md border bg-white px-3 text-left text-sm">
              <span>{selectedSort?.label ?? "Sort"}</span>
              <ChevronsUpDown size={17} />
            </ListboxButton>
            <ListboxOptions className="border-light-gray absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-md border bg-white p-1 shadow-lg">
              {sortOptions.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option.value}
                  className="text-primary data-focus:bg-primary-50 flex cursor-default items-center justify-between rounded-md px-3 py-2 text-sm"
                >
                  {option.label}
                  {selectedSortValue === option.value ? (
                    <Check size={16} />
                  ) : null}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>

      {visibleItems.length === 0 ? (
        <EmptyState title={emptyTitle} />
      ) : (
        <div className="divide-light-gray border-light-gray divide-y rounded-lg border bg-white">
          {visibleItems.map(renderItem)}
        </div>
      )}
    </div>
  );
}
