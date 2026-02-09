import {QueryKey, useInfiniteQuery, UseInfiniteQueryOptions, useMutation, useQuery, useQueryClient, UseQueryOptions} from '@tanstack/react-query';
import {BusinessCategory, BusinessDiscount, PaginationRequest, ResultList} from '@/types';
import {Business} from "@/types/business";
import {
  createBusinessCategory,
  createBusinessDiscount,
  deleteBusinessCategories, deleteBusinessDiscount,
  getBusinessCategories,
  getBusinessDiscounts,
  getBusinesses,
  updateBusinessCategory, updateBusinessDiscount
} from '@/lib/actions/business';
import {BusinessCategoryValues, BusinessDiscountValues, BusinessFiltersValues, BusinessSettingsCatalogValues} from '@/lib/schemas/business';
import {updateSettingsCatalog} from '@/lib/actions/profile';

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
    mutationFn: async (ids: string[]) => {
      return await deleteBusinessCategories(ids);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-categories'] });
    },
  });
};

export const useGetBusinessDiscounts = (
    businessId?: string,
    options?: Partial<UseQueryOptions< BusinessDiscount[], Error,  BusinessDiscount[], QueryKey>>
) => {
  return useQuery({
    queryKey: ['business-discounts', businessId],
    queryFn: async () => {
      const response = await getBusinessDiscounts(businessId);
      return response.success ?  response.data! : [];
    },
    ...options
  })
};

export const useCreateBusinessDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: BusinessDiscountValues) => {
      return await createBusinessDiscount(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-discounts'] });
    },
  });
};

export const useUpdateBusinessDiscount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: Partial<BusinessDiscountValues>) => {
      return await updateBusinessDiscount(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-discounts'] });
    },
  });
};

export const useDeleteBusinessDiscounts = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (ids: string[]) => {
      return await deleteBusinessDiscount(ids);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-discounts'] });
    },
  });
};

export const useUpdateSettingsCatalog = () => {
  return useMutation({
    mutationFn: async ({ businessId, params }: { businessId: string, params: BusinessSettingsCatalogValues}) => {
      return await updateSettingsCatalog(businessId, params);
    }
  });
};
