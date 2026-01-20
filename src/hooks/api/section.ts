import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import {getSections} from '@/lib/actions/section';
import {BusinessSection} from '@/types/business';

export const useGetSections = (
  options?: Partial<UseQueryOptions<BusinessSection[], Error,  BusinessSection[], QueryKey>>
) => {
  return useQuery({
    queryKey: ['sections'],
    queryFn: async () => {
      const result = await getSections();
      return result.success ? result.data! : [];
    },
    ...options
  })
};



