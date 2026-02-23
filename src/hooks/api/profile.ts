import { useMutation, useQueryClient } from '@tanstack/react-query';
import {ProfileFormValues, UpdatePhoneFormValues} from '@/lib/schemas/auth';
import {updateProfile} from '@/lib/actions/profile';
import {updatePhone} from '@/lib/actions/auth';

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

