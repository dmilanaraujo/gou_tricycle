import {QueryKey, useMutation, useQuery, useQueryClient, UseQueryOptions} from '@tanstack/react-query';
import {ProfileFormValues, ProfilesFilterValues, UpdateEmailFormValues, UpdatePhoneFormValues} from '@/lib/schemas/auth';
import {getProfiles, updateProfile} from '@/lib/actions/profile';
import {updateEmail, updatePhone} from '@/lib/actions/auth';
import {Profile} from '@/types';

export const useGetProfiles = (
    filter: ProfilesFilterValues,
    includeBusiness: boolean = false,
    options?: Partial<UseQueryOptions<Profile[], Error, Profile[], QueryKey>>
) => {
  return useQuery({
    queryKey: ['profiles', filter, includeBusiness],
    queryFn: async () => {
      const response = await getProfiles(filter, includeBusiness);
      return response.success ?  response.data! : [];
    },
    ...options
  })
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: ProfileFormValues) => {
      return await updateProfile(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useUpdatePhoneProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: UpdatePhoneFormValues) => {
      return await updatePhone(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useUpdateEmailProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: UpdateEmailFormValues) => {
      return await updateEmail(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

