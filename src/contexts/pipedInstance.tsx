'use client';

import { createContext, useState } from 'react';
import { PIPED_VALUES, LOCALSTORAGE_KEYS } from '@/constants';
import { useLocalStorage } from 'usehooks-ts';

import type { IPipedInstance } from '@/types';

interface IPipedInstanceContext {
  instance: IPipedInstance;
  region: string;
  setInstance: React.Dispatch<React.SetStateAction<IPipedInstance>>;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
}

const INITIAL_VALUE = {
  instance: PIPED_VALUES.DEFAULT_INSTANCE,
  region: PIPED_VALUES.DEFAULT_REGION,
  setInstance: () => {},
  setRegion: () => {}
};

export const PipedInstanceContext = createContext<IPipedInstanceContext>(INITIAL_VALUE);

export default function PipedInstanceProvider({ children }: { children: React.ReactNode }) {
  const [instance, setInstance] = useState<IPipedInstance>(INITIAL_VALUE.instance);
  const [region, setRegion] = useLocalStorage(LOCALSTORAGE_KEYS.CURRENT_REGION, 'BR');

  return (
    <PipedInstanceContext.Provider
      value={{
        instance,
        setInstance,
        region,
        setRegion
      }}
    >
      {children}
    </PipedInstanceContext.Provider>
  );
}
