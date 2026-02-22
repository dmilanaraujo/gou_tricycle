import {QueryKey, useInfiniteQuery, UseInfiniteQueryOptions, useMutation, useQuery, useQueryClient, UseQueryOptions} from '@tanstack/react-query';
import {BusinessCategory, BusinessDiscount, PaginationRequest, ResultList} from '@/types';
import {Business} from "@/types/business";
import {
  createBusiness,
  createBusinessCategory,
  createBusinessDiscount, deleteBusiness,
  deleteBusinessCategories, deleteBusinessDiscount,
  getBusinessCategories,
  getBusinessDiscounts,
  getBusinesses, updateBusiness,
  updateBusinessCategory, updateBusinessDiscount, updateStatusBusiness
} from '@/lib/actions/business';
import {
  BusinessCategoryValues,
  BusinessDiscountValues,
  BusinessFiltersValues,
  BusinessFormValues,
  BusinessSettingsCatalogValues,
  UpdateBusinessValues
} from '@/lib/schemas/business';
import {updateSettingsCatalog} from '@/lib/actions/business';

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
      const response = await getBusinesses(({...params, is_active: true, page: pageParam}));
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

export const useGetMyBusinesses = (
    options?: Partial<UseQueryOptions<ResultList<Business>, Error, ResultList<Business>, QueryKey>>
) => {
  return useQuery({
    queryKey: ['businesses'],
    queryFn: async () => {
      const response = await getBusinesses({ only_logged_user: true, page: 0, limit: 100 });
      return response.success ?  response.data! : { data: [] };
    },
    ...options
  })
};

export const useCreateBusiness = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: BusinessFormValues) => {
      return await createBusiness(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
    },
  });
};

export const useUpdateBusiness = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: UpdateBusinessValues) => {
      return await updateBusiness(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
    },
  });
};

export const useDeleteBusiness = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteBusiness(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
    },
  });
};

export const useUpdateStatusBusiness = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({businessId, active}: { businessId: string; active: boolean }) => {
      return await updateStatusBusiness(businessId, active);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
    },
  });
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
