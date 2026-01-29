import {QueryKey, useInfiniteQuery, UseInfiniteQueryOptions, useMutation, useQuery, useQueryClient, UseQueryOptions} from '@tanstack/react-query';
import {BusinessCategory, PaginationRequest, ResultList} from '@/types';
import {Business} from "@/types/business";
import {createBusinessCategory, deleteBusinessCategories, getBusinessCategories, getBusinesses, updateBusinessCategory} from '@/lib/actions/business';
import {BusinessCategoryValues, BusinessFiltersValues} from '@/lib/schemas/business';

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


export const useGetBusinessCategories = (
    businessId?: string,
    options?: Partial<UseQueryOptions< BusinessCategory[], Error,  BusinessCategory[], QueryKey>>
) => {
  return useQuery({
    queryKey: ['business-categories', businessId],
    queryFn: async () => {
      const response = await getBusinessCategories(businessId);
      return response.success ?  response.data! : [];
    },
    ...options
  })
};


export const useCreateBusinessCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: BusinessCategoryValues) => {
      return await createBusinessCategory(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-categories'] });
    },
  });
};

export const useUpdateBusinessCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: Partial<BusinessCategoryValues>) => {
      return await updateBusinessCategory(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-categories'] });
    },
  });
};

export const useDeleteBusinessCategories = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (ids: number[]) => {
      return await deleteBusinessCategories(ids);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-categories'] });
    },
  });
};
