import IPipedInstance from '@/types/PipedInstance';

import { PIPED_VALUES } from '@/constants';
const { LOCAL_STORAGE_KEYS } = PIPED_VALUES;

export function getStoragedInstances(): IPipedInstance[] {
  const value = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.STORAGED_INSTANCES) || '[]') as IPipedInstance[];
  return value ? value : [PIPED_VALUES.DEFAULT_INSTANCE];
}

export function getCurrentInstance(): IPipedInstance {
  const value = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_INSTANCE) || '') as IPipedInstance;
  return value ? value : PIPED_VALUES.DEFAULT_INSTANCE;
}
