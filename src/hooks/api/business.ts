import { QueryKey, useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import {PaginationRequest, ResultList} from '@/types';
import {Business} from "@/types/business";
import {getBusinesses} from "@/lib/actions/business";
import {BusinessFiltersValues} from "@/lib/schemas/business";

type TDataResultBusiness = {
  pageParams: number[];
  pages: ResultList<Business>[]
}

export const useInfinityBusinesses = (
  params: BusinessFiltersValues & PaginationRequest,
  options?: Partial<UseInfiniteQueryOptions<ResultList<Business>, Error, TDataResultBusiness, QueryKey, number>>
) => {

  return useInfiniteQuery({
    queryKey: ['businesses', params],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getBusinesses(({...params, page: pageParam}));
      return response.success ?  response.data! : { data: [] };
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.pagination?.hasMore) return undefined
      return pages.length
    },
    initialPageParam: 0,
    ...options
  })
};


