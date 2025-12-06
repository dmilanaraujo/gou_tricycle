import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {PostgrestError} from '@supabase/supabase-js';
import {ActionError} from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * For production with a database like Supabase, it's more efficient to order randomly in the query itself.
 * Example with Supabase RPC: `await supabase.rpc('get_drivers_randomly', { p_province, p_municipality })`
 * where the SQL function would use `ORDER BY RANDOM()`.
 * @param array The array to shuffle.
 * @returns A new shuffled array.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export const formatSupabaseFunctionErrors = async (error: PostgrestError): Promise<ActionError[]> => {
  // if (error instanceof FunctionsHttpError) {
  //   const errorMessage = await error.context.json()
  //   console.log('Function returned an error', errorMessage)
  //   return [{ message: errorMessage }]
  // }
  // else if (error instanceof FunctionsRelayError) {
  //   return [{ message: 'customErrors.function_processing_error' }]
  // }
  // else if (error instanceof FunctionsFetchError) {
  //   return [{ message: 'customErrors.fetch_error' }]
  // }
  return [{ message: 'customErrors.unspecified_error' }]
}
