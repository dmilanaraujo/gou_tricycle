import {
  QueryKey, useMutation,
  useQuery, useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { BusinessCategory } from '@/types/business';
import {createCategory, deleteCategories, listCategories, updateCategory} from '@/lib/actions/system_category';
import {CategoryFormValues} from '@/lib/schemas/category';

export const useGetCategories = (
    sectionId?: string,
    options?: Partial<UseQueryOptions< BusinessCategory[], Error,  BusinessCategory[], QueryKey>>
) => {
  return useQuery({
    queryKey: ['categories', sectionId],
    queryFn: async () => {
      const response = await listCategories(sectionId);
      return response.success ?  response.data! : [];
    },
    ...options
  })
};


export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CategoryFormValues) => {
      return await createCategory(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: Partial<CategoryFormValues>) => {
      return await updateCategory(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useDeleteCategories = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (ids: number[]) => {
      return await deleteCategories(ids);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

