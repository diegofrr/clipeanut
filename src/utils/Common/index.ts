import { COUNTRIES } from '@/constants';

export function getCountryName(flag: string) {
  return COUNTRIES.find((item) => item.flag === flag)?.name;
}
