import {
  QueryKey, useMutation,
  useQuery, useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import {PaginationRequest, ResultList, SortRequest, Service} from '@/types';
import {
  updateStatusService,
  listServices
} from '@/lib/actions/service';
import {ServiceFormValues, ServicesFilterValues} from '@/lib/schemas/service';
import {createService, deleteServices, updateService} from '@/lib/actions/service';

export const useGetServices = (
  filter: ServicesFilterValues & PaginationRequest & SortRequest,
  options?: Partial<UseQueryOptions<ResultList<Service>, Error, ResultList<Service>, QueryKey>>
) => {
  return useQuery({
    queryKey: ['services', filter],
    queryFn: async () => {
      const response = await listServices(filter);
      return response.success ?  response.data! : { data: [] };
    },
    ...options
  })
};


export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: ServiceFormValues) => {
      return await createService(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: Partial<ServiceFormValues>) => {
      return await updateService(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
};

export const useDeleteServices = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (ids: string[]) => {
      return await deleteServices(ids);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
};


export const useUpdateStatusService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({serviceId, active}: { serviceId: string; active: boolean }) => {
      return await updateStatusService(serviceId, active);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
};


