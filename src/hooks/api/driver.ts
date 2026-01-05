import { QueryKey, useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import {Driver, PaginationRequest, ResultList} from '@/types';
import { getDrivers } from '@/lib/actions/drivers';
import {DriverFiltersValues} from '@/lib/schemas/driver';

type TDataResultDriver = {
  pageParams: number[];
  pages: ResultList<Driver>[]
}

export const useInfinityDrivers = (
  params: DriverFiltersValues & PaginationRequest,
  options?: Partial<UseInfiniteQueryOptions<ResultList<Driver>, Error, TDataResultDriver, QueryKey, number>>
) => {
  return useInfiniteQuery({
    queryKey: ['drivers'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getDrivers(({...params, page: pageParam}));
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


