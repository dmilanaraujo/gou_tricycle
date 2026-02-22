'use server';
import {
  LoginSchema, SignUpSchema, ForgotPasswordFormValues, ForgotPasswordSchema,
  UpdatePasswordSchema,
  UpdatePasswordValues,
  SignUpFormValues
} from '@/lib/schemas/auth';
import {createAdminClient, createClient} from '@/lib/supabase/server';
import {SignInWithPasswordCredentials, User} from '@supabase/auth-js';
import {ActionResponse} from '@/types';
import {formatSupabaseAuthErrors, formatZodErrors} from '../utils';
import {redirect} from 'next/navigation';

export const login = async (params: unknown): Promise<ActionResponse<User>> => {
  const validatedFields = LoginSchema.safeParse(params);
  if (!validatedFields.success) {
    const errors = formatZodErrors(validatedFields.error);
    return { success: false, errors };
  }
  try{
    const { phone, password } = validatedFields.data;
    const body: SignInWithPasswordCredentials = {
      phone: phone!,
      password,
    };
    
    const supabase = await createClient();
    const { error, data } = await supabase.auth.signInWithPassword(body);
    if (error) {
      console.log('auth error', error);
      const errors = formatSupabaseAuthErrors(error);
      return { success: false, errors }
    }
    return { success: true, data: data.user! };
  } catch (error) {
    console.log('Unexpected error in login:', error);
    throw new Error('Ha ocurrido un error no especificado');
  }
};

export const logout = async (): Promise<ActionResponse<void>> => {
  try{
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      const errors = formatSupabaseAuthErrors(error);
      return { success: false, errors }
    }
    return { success: true };
  } catch (error) {
    console.log('Unexpected error in logout:', error);
    throw new Error('Ha ocurrido un error no especificado');
  }
}

export const createUser = async (params: SignUpFormValues): Promise<ActionResponse<User>> => {
  const validatedFields = SignUpSchema.safeParse(params);
  if (!validatedFields.success) {
    const errors = formatZodErrors(validatedFields.error);
    return { success: false, errors };
  }
  try {
    const { phone, password, name } = validatedFields.data;

    const supabaseAdmin = await createAdminClient();
    const { error: errorCreateUser } = await supabaseAdmin.auth.admin.createUser({
      phone,
      phone_confirm: true,
      password,
      user_metadata: {
        name,
        role: 'business_admin',
      },
    });
    if (errorCreateUser) {
      return { success: false, errors: formatSupabaseAuthErrors(errorCreateUser) }
    }
    const supabase = await createClient();
    const { error: errorAuth, data } = await supabase.auth.signInWithPassword({
      phone,
      password
    });
    if (errorAuth) {
      redirect('/sign-in');
    }
    
    return { success: true, data: data.user! };
  } catch (error) {
    console.log('Unexpected error in createUser:', error);
    throw new Error('Ha ocurrido un error no especificado');
  }
};

export const updatePassword = async (params: UpdatePasswordValues): Promise<ActionResponse<User>> => {
  const validatedFields = UpdatePasswordSchema.safeParse(params);
  if (!validatedFields.success) {
    // const errors = formatZodErrors(validatedFields.error);
    return { success: false, errors: [] };
  }
  try {
    const { password } = validatedFields.data;
    const supabase = await createClient();
    const { error, data } = await supabase.auth.updateUser({ password });
    if (error) {
      const errors = formatSupabaseAuthErrors(error);
      return { success: false, errors }
    }
    return { success: true, data: data.user };
  } catch (error) {
    console.log('Unexpected error in updatePassword:', error);
    throw new Error('Ha ocurrido un error no especificado');
  }
};

export const forgotPassword = async (params: ForgotPasswordFormValues, redirectTo: string): Promise<ActionResponse<void>> => {
  const validatedFields = ForgotPasswordSchema.safeParse(params);
  if (!validatedFields.success) {
    // const errors = formatZodErrors(validatedFields.error);
    return { success: false, errors: [] };
  }
  try{
    const { phone } = validatedFields.data;
    // const verifyCaptchaRes = await verifyCaptchaToken(captcha_token!);
    // if (!verifyCaptchaRes.success) {
    //   return { success: false, errors: [{ message: 'customErrors.captcha_error' }] };
    // }
    
    const supabase = await createClient();
    // const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // captchaToken: captcha_token,
    //   redirectTo
    // });
    // if (error) {
    //   return { success: false, errors: [{ message: error.message }] }
    // }
    return { success: true };
  } catch (error) {
    console.log('Unexpected error in forgotPassword:', error);
    throw new Error('Ha ocurrido un error no especificado');
  }
};

