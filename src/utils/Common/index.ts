import { COUNTRIES } from '@/constants';

export function getCountryName(flag: string) {
  return COUNTRIES.find((item) => item.flag === flag)?.name;
}

export function debugConsole(text: string, color?: string) {
  console.log(`%c${text}`, `color: ${color || '#FFFFFF'}; font-weight: bold; font-size: 24px`);
}
