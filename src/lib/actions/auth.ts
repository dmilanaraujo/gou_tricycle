'use server';
import {
  LoginSchema, SignUpSchema, ForgotPasswordFormValues, ForgotPasswordSchema,
  UpdatePasswordSchema,
  UpdatePasswordValues,
  VerifyOtpFormValues, VerifyOtpSchema
} from '@/lib/schemas/auth';
import {createClient} from '@/lib/supabase/server';
import {SignInWithPasswordCredentials, SignUpWithPasswordCredentials, User, UserAttributes} from '@supabase/auth-js';
import {ActionResponse} from '@/types';
// import {formatZodErrors} from '@/lib/utils';
import {cache} from 'react';
import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';
import { formatSupabaseAuthErrors } from '../utils';

const createCookieConfirmSignup = async (phone: string) => {
  const cookieStore = await cookies();
  cookieStore.set('confirm-signup', phone, {
    path: '/',
    // maxAge: 60 * 5 * 1000, // Cookie válida por 5 min
    httpOnly: true,
  })
}

export const login = async (params: unknown): Promise<ActionResponse<User>> => {
  // const schema = createLogInSchema(type);
  const validatedFields = LoginSchema.safeParse(params);
  if (!validatedFields.success) {
    // const errors = formatZodErrors(validatedFields.error);
    return { success: false, errors: [] };
  }
  try{
    const { phone, password } = validatedFields.data;
    // const verifyCaptchaRes = await verifyCaptchaToken(captcha_token!);
    // if (!verifyCaptchaRes.success) {
    //   return { success: false, errors: [{ message: 'customErrors.captcha_error' }] };
    // }
    const body: SignInWithPasswordCredentials = {
      phone: phone!,
      password,
      options: {
        // captchaToken: captcha_token
      }
    };
    
    const supabase = await createClient();
    const { error, data } = await supabase.auth.signInWithPassword(body);
    if (error) {
      if (error.code == 'phone_not_confirmed') {
        await createCookieConfirmSignup(phone);
      }
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

export const signUp = async (params: unknown, emailRedirectTo = ''): Promise<ActionResponse<User>> => {
  // const schema = createSignUpSchema(type);
  const validatedFields = SignUpSchema.safeParse(params);
  if (!validatedFields.success) {
    // const errors = formatZodErrors(validatedFields.error);
    return { success: false, errors: [] };
  }
  try {
    const { phone, password } = validatedFields.data;
    // const verifyCaptchaRes = await verifyCaptchaToken(captcha_token!);
    // if (!verifyCaptchaRes.success) {
    //   return { success: false, errors: [{ message: 'customErrors.captcha_error' }] };
    // }
    const body: SignUpWithPasswordCredentials = {
      phone: phone!,
      password,
      options: {
        channel: 'whatsapp',
        // captchaToken: captcha_token,
        data: {
          role: 'driver'
        }
      }
    };

    const supabase = await createClient();
    const { error, data } = await supabase.auth.signUp(body);
    if (error) {
      const errors = formatSupabaseAuthErrors(error);
      return { success: false, errors }
    }
    
    await createCookieConfirmSignup(phone);
    
    return { success: true, data: data.user! };
  } catch (error) {
    console.log('Unexpected error in signUp:', error);
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

export const verifyOtpSms = async (params: VerifyOtpFormValues): Promise<ActionResponse<void>> => {
  const validatedFields = VerifyOtpSchema.safeParse(params);
  if (!validatedFields.success) {
    // const errors = formatZodErrors(validatedFields.error);
    return { success: false, errors: [] };
  }
  try{
    const { phone, otp: token } = validatedFields.data;
    
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms'})
    
    if (error) {
      const errors = formatSupabaseAuthErrors(error);
      return { success: false, errors }
    }
    const cookieStore = await cookies();
    cookieStore.delete('confirm-signup');
    cookieStore.set('sign-up-success', 'true', {
      path: '/',
      maxAge: 60, // Cookie válida por 60 segundos
      httpOnly: true,
    })
    return { success: true };
  } catch (error) {
    console.log('Unexpected error in verifyOtpSms:', error);
    throw new Error('Ha ocurrido un error no especificado');
  }
};

export const resendOtpSms = async (phone: string): Promise<ActionResponse<void>> => {
  if (!phone) {
    return { success: false, errors: [{ message: 'Teléfono inválido' }] };
  }
  try{
    const supabase = await createClient();
    const { error } = await supabase.auth.resend({
      type: 'sms',
      phone
    })
    if (error) {
      const errors = formatSupabaseAuthErrors(error);
      return { success: false, errors }
    }
    return { success: true };
  } catch (error) {
    console.log('Unexpected error in resendOtpSms:', error);
    throw new Error('Ha ocurrido un error no especificado');
  }
};
