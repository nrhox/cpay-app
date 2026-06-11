import type { IRequestTopupRequest } from "../types/request";
import type { ITopupRequest } from "../types/topup";
import { useMutateData, type tOptionMutate } from "./hooks";

export function useRequestTopup(
  options?: tOptionMutate<IRequestTopupRequest, ITopupRequest>,
) {
  return useMutateData<IRequestTopupRequest, ITopupRequest>(
    "POST",
    "/api/v1/top-up",
    ["top_up"],
    options,
  );
}
