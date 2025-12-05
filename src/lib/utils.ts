import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
