import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Input from "../forms/Input";
import Loading from "../general/loading";
import EmptyState from "../ui/EmptyState";

export interface SortOption<T extends object> {
  label: string;
  sortBy: Extract<keyof T, string>;
  sort: "asc" | "desc";
}

interface AdminListViewProps<T extends object> {
  items: T[];
  searchPlaceholder?: string;
  isLoading?: boolean;
  sortOptions: SortOption<T>[];
  renderItem: (item: T) => ReactNode;
  emptyTitle?: string;
}

export default function AdminListView<T extends object>({
  items,
  searchPlaceholder = "Cari data",
  sortOptions,
  renderItem,
  isLoading = false,
  emptyTitle = "Data tidak ditemukan",
}: AdminListViewProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentQ = searchParams.get("q") || "";
  const currentSortBy =
    searchParams.get("sort_by") || sortOptions[0]?.sortBy || "";
  const currentSort = searchParams.get("sort") || sortOptions[0]?.sort || "asc";

  const [localSearch, setLocalSearch] = useState(currentQ);

  const [prevQ, setPrevQ] = useState(currentQ);
  if (currentQ !== prevQ) {
    setLocalSearch(currentQ);
    setPrevQ(currentQ);
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchParams((prev) => {
        if (localSearch.trim()) {
          prev.set("q", localSearch.trim());
        } else {
          prev.delete("q");
        }
        return prev;
      });
    }, 300);

    return () => clearTimeout(handler);
  }, [localSearch, setSearchParams]);

  const handleSortChange = (selectedIndex: number) => {
    const selectedOption = sortOptions[selectedIndex];
    if (!selectedOption) return;

    setSearchParams((prev) => {
      prev.set("sort_by", selectedOption.sortBy);
      prev.set("sort", selectedOption.sort);
      return prev;
    });
  };

  const activeSortIndex = Math.max(
    0,
    sortOptions.findIndex(
      (opt) => opt.sortBy === currentSortBy && opt.sort === currentSort,
    ),
  );

  const selectedSortLabel = sortOptions[activeSortIndex]?.label || "Sort";

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-[1fr_240px]">
        <label className="relative block">
          <Search
            className="text-neutral-text pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
            size={17}
          />
          <Input
            className="border-neutral-muted focus:border-primary focus:ring-primary w-full rounded-md pl-10 text-sm"
            placeholder={searchPlaceholder}
            value={localSearch}
            onChange={(event) => setLocalSearch(event.target.value)}
          />
        </label>

        <Listbox value={activeSortIndex} onChange={handleSortChange}>
          <div className="relative">
            <ListboxButton className="border-neutral-muted text-neutral-text bg-neutral-surface flex min-h-10 w-full items-center justify-between rounded-md border px-3 text-left text-sm">
              <span>{selectedSortLabel}</span>
              <ChevronsUpDown size={17} />
            </ListboxButton>
            <ListboxOptions className="border-neutral-muted bg-neutral-surface absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-md border p-1 shadow-lg">
              {sortOptions.map((option, index) => (
                <ListboxOption
                  key={`${option.sortBy}-${option.sort}`}
                  value={index}
                  className="text-neutral-text data-focus:bg-primary-soft flex cursor-default items-center justify-between rounded-md px-3 py-2 text-sm"
                >
                  {option.label}
                  {activeSortIndex === index ? <Check size={16} /> : null}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>
      {items.length !== 0 && (
        <div className="divide-neutral-muted border-neutral-muted bg-neutral-surface divide-y rounded-lg border">
          {items.map(renderItem)}
        </div>
      )}

      {items.length === 0 && !isLoading && <EmptyState title={emptyTitle} />}

      {isLoading && <Loading />}
    </div>
  );
}
