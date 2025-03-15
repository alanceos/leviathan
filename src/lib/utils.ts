import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wineColors = {
  red: 'bg-burgundy-600',
  rose: 'bg-rose-300',
  white: 'bg-amber-50'
};