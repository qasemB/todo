import { QueryKey, QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery, UseQueryOptions } from "react-query";

export type useQueryOptionType =
  | Omit<UseQueryOptions<any, unknown, any, QueryKey>, "queryKey" | "queryFn">
  | undefined;

export type RefetchType = <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>

export const useReactQuery = (
  key: QueryKey,
  func: () => any,
  options?: useQueryOptionType
) => {
  const params = useQuery(key, func, {
    ...options,
    retry: 1,
  });

  return params;
};