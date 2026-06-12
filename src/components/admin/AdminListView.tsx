// import {
//   Listbox,
//   ListboxButton,
//   ListboxOption,
//   ListboxOptions,
// } from "@headlessui/react";
// import { Check, ChevronsUpDown, Search } from "lucide-react";
// import type { ReactNode } from "react";
// import { useEffect, useMemo, useState } from "react";
// import { useSearchParams } from "react-router";
// import Input from "../forms/Input";
// import EmptyState from "../ui/EmptyState";
// export interface SortOption<T> {
//   label: string;
//   value: string;
//   compare: (first: T, second: T) => number;
// }

// interface AdminListViewProps<T> {
//   items: T[];
//   searchPlaceholder?: string;
//   searchText: (item: T) => string;
//   sortOptions: SortOption<T>[];
//   renderItem: (item: T) => ReactNode;
//   emptyTitle?: string;
// }

// export default function AdminListView<T>({
//   items,
//   searchPlaceholder = "Cari data",
//   searchText,
//   sortOptions,
//   renderItem,
//   emptyTitle = "Data tidak ditemukan",
// }: AdminListViewProps<T>) {
//   // 1. Ambil dan atur URL Search Params
//   const [searchParams, setSearchParams] = useSearchParams();

//   const searchParamKey = "search";
//   const sortParamKey = "sort";

//   const currentSearchQuery = searchParams.get(searchParamKey) || "";
//   const currentSortValue = searchParams.get(sortParamKey) || sortOptions[0]?.value || "";

//   // Local state untuk input teks agar ketikan user terasa mulus (tidak lag karena nunggu URL sync)
//   const [localSearch, setLocalSearch] = useState(currentSearchQuery);
//   const [prevSearchQuery, setPrevSearchQuery] = useState(currentSearchQuery);

//   // 2. Efek Debounce: Sinkronisasi ketikan ke URL setelah 300ms
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setSearchParams((prev) => {
//         if (localSearch.trim()) {
//           prev.set(searchParamKey, localSearch.trim());
//         } else {
//           prev.delete(searchParamKey);
//         }
//         return prev;
//       });
//     }, 300);

//     return () => clearTimeout(handler);
//   }, [localSearch, setSearchParams]);

//   const handleSortChange = (value: string) => {
//     setSearchParams((prev) => {
//       prev.set(sortParamKey, value);
//       return prev;
//     });
//   };

//   const selectedSort =
//     sortOptions.find((option) => option.value === currentSortValue) ||
//     sortOptions[0];

//   const visibleItems = useMemo(() => {
//     const normalizedQuery = currentSearchQuery.trim().toLowerCase();
//     const filteredItems = normalizedQuery
//       ? items.filter((item) =>
//         searchText(item).toLowerCase().includes(normalizedQuery),
//       )
//       : items;

//     return [...filteredItems].sort(selectedSort?.compare);
//   }, [items, currentSearchQuery, searchText, selectedSort]);

//   if (currentSearchQuery !== prevSearchQuery) {
//     setLocalSearch(currentSearchQuery);
//     setPrevSearchQuery(currentSearchQuery);
//   }

//   return (
//     <div className="grid gap-4">
//       <div className="grid gap-3 md:grid-cols-[1fr_240px]">
//         <label className="relative block">
//           <Search
//             className="text-primary pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
//             size={17}
//           />
//           <Input
//             className="border-light-gray focus:border-primary-500 focus:ring-primary-500 w-full rounded-md pl-10 text-sm"
//             placeholder={searchPlaceholder}
//             value={localSearch}
//             onChange={(event) => setLocalSearch(event.target.value)}
//           />
//         </label>

//         <Listbox value={currentSortValue} onChange={handleSortChange}>
//           <div className="relative">
//             <ListboxButton className="border-light-gray text-primary flex min-h-10 w-full items-center justify-between rounded-md border bg-white px-3 text-left text-sm">
//               <span>{selectedSort?.label ?? "Sort"}</span>
//               <ChevronsUpDown size={17} />
//             </ListboxButton>
//             <ListboxOptions className="border-light-gray absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-md border bg-white p-1 shadow-lg">
//               {sortOptions.map((option) => (
//                 <ListboxOption
//                   key={option.value}
//                   value={option.value}
//                   className="text-primary data-focus:bg-primary-50 flex cursor-default items-center justify-between rounded-md px-3 py-2 text-sm"
//                 >
//                   {option.label}
//                   {currentSortValue === option.value ? (
//                     <Check size={16} />
//                   ) : null}
//                 </ListboxOption>
//               ))}
//             </ListboxOptions>
//           </div>
//         </Listbox>
//       </div>

//       {visibleItems.length === 0 ? (
//         <EmptyState title={emptyTitle} />
//       ) : (
//         <div className="divide-light-gray border-light-gray divide-y rounded-lg border bg-white">
//           {visibleItems.map(renderItem)}
//         </div>
//       )}
//     </div>
//   );
// }

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
import EmptyState from "../ui/EmptyState";

export interface SortOption<T extends object> {
  label: string;
  sortBy: Extract<keyof T, string>;
  sort: "asc" | "desc";
}

interface AdminListViewProps<T extends object> {
  items: T[];
  searchPlaceholder?: string;
  sortOptions: SortOption<T>[];
  renderItem: (item: T) => ReactNode;
  emptyTitle?: string;
}

export default function AdminListView<T extends object>({
  items,
  searchPlaceholder = "Cari data",
  sortOptions,
  renderItem,
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
            className="text-primary pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
            size={17}
          />
          <Input
            className="border-light-gray focus:border-primary-500 focus:ring-primary-500 w-full rounded-md pl-10 text-sm"
            placeholder={searchPlaceholder}
            value={localSearch}
            onChange={(event) => setLocalSearch(event.target.value)}
          />
        </label>

        <Listbox value={activeSortIndex} onChange={handleSortChange}>
          <div className="relative">
            <ListboxButton className="border-light-gray text-primary flex min-h-10 w-full items-center justify-between rounded-md border bg-white px-3 text-left text-sm">
              <span>{selectedSortLabel}</span>
              <ChevronsUpDown size={17} />
            </ListboxButton>
            <ListboxOptions className="border-light-gray absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-md border bg-white p-1 shadow-lg">
              {sortOptions.map((option, index) => (
                <ListboxOption
                  key={`${option.sortBy}-${option.sort}`}
                  value={index}
                  className="text-primary data-focus:bg-primary-50 flex cursor-default items-center justify-between rounded-md px-3 py-2 text-sm"
                >
                  {option.label}
                  {activeSortIndex === index ? <Check size={16} /> : null}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>

      {items.length === 0 ? (
        <EmptyState title={emptyTitle} />
      ) : (
        <div className="divide-light-gray border-light-gray divide-y rounded-lg border bg-white">
          {items.map(renderItem)}
        </div>
      )}
    </div>
  );
}
