interface IExpireOptions {
  seconds?: number;
  minutes?: number;
  days?: number;
}

interface IStoragedItem<T> {
  value: T;
  expirationTime?: number;
}

type UseLocalStoragedWithExpiration = {
  getStoragedItem: <T>(key: string) => IStoragedItem<T> | null;
  getStoragedValue: <T>(key: string) => T | null;
  setStoragedItem: <T>(key: string, value: T, expireOptions: IExpireOptions) => void;
  removeStoragedItem: (key: string) => void;
  isExpiredItem: (key: string) => boolean;
  isExistsItem: (key: string) => boolean;
};

export function useLocalStorageWithExpiration(): UseLocalStoragedWithExpiration {
  const getStoragedItem = <T>(key: string): IStoragedItem<T> | null => {
    const storagedItem = JSON.parse(localStorage.getItem(key) || 'null') as IStoragedItem<T>;

    if (!storagedItem) return null;
    else if (!storagedItem.expirationTime || !isExpiredTime(storagedItem.expirationTime)) return storagedItem;
    else {
      removeStoragedItem(key);
      return null;
    }
  };

  const getStoragedValue = <T>(key: string): T | null => {
    return getStoragedItem<T>(key)?.value || null;
  };

  const setStoragedItem = <T>(key: string, value: T, expireOptions: IExpireOptions) => {
    const { seconds, minutes, days } = expireOptions;
    let expirationTime;

    if (seconds) expirationTime = new Date().getTime() + seconds * 1000;
    else if (minutes) expirationTime = new Date().getTime() + minutes * 60 * 1000;
    else if (days) expirationTime = new Date().getTime() + days * 24 * 60 * 60 * 1000;

    localStorage.setItem(key, JSON.stringify({ value, expirationTime }));
  };

  const removeStoragedItem = (key: string) => {
    localStorage.removeItem(key);
  };

  const isExpiredItem = (key: string): boolean => {
    const storagedValue = getStoragedItem(key);

    if (!storagedValue) return false;
    else if (!storagedValue.expirationTime) return false;
    else return isExpiredTime(storagedValue.expirationTime);
  };

  const isExistsItem = (key: string): boolean => {
    return !!localStorage.getItem(key);
  };

  const isExpiredTime = (expirationTime: number): boolean => {
    return new Date().getTime() > expirationTime;
  };

  return { getStoragedItem, getStoragedValue, setStoragedItem, removeStoragedItem, isExpiredItem, isExistsItem };
}
