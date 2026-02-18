import {
  QueryKey, useMutation,
  useQuery, useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import {PaginationRequest, ResultList, SortRequest, Product} from '@/types';
import {
  listProducts, updateStock, updateStocks
} from '@/lib/actions/product';
import {ImportProductsStockValues, ProductFormValues, ProductsFilterValues} from '@/lib/schemas/product';
import {createProduct, updateProduct} from '@/lib/actions/product';

export const useGetProducts = (
  filter: ProductsFilterValues & PaginationRequest & SortRequest,
  options?: Partial<UseQueryOptions<ResultList<Product>, Error, ResultList<Product>, QueryKey>>
) => {
  return useQuery({
    queryKey: ['products', filter],
    queryFn: async () => {
      const response = await listProducts(filter);
      return response.success ?  response.data! : { data: [] };
    },
    ...options
  })
};


export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: ProductFormValues) => {
      return await createProduct(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: Partial<ProductFormValues>) => {
      return await updateProduct(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateStock = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({serviceId, quantity}: {serviceId: string, quantity: number}) => {
      return await updateStock(serviceId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateStocks = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (params: ImportProductsStockValues) => {
        return await updateStocks(params);
    },
    onSuccess: (p, e) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

