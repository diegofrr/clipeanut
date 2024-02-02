import { COUNTRIES } from '@/constants';

export function getCountryName(flag: string) {
  return COUNTRIES[flag];
}
