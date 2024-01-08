'use client';

import { createContext, useEffect, useState } from 'react';
import { PIPED_VALUES } from '@/constants';

interface IPipedInstanceContext {
  instance: string;
  endpoint: string;
  region: string;
  setInstance: React.Dispatch<React.SetStateAction<string>>;
  setEndpoint: React.Dispatch<React.SetStateAction<string>>;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
}

const INITIAL_VALUE = {
  instance: PIPED_VALUES.DEFAULT_INSTANCE,
  endpoint: PIPED_VALUES.PIPED_BASE + PIPED_VALUES.DEFAULT_INSTANCE,
  region: PIPED_VALUES.DEFAULT_REGION,
  setEndpoint: () => {},
  setInstance: () => {},
  setRegion: () => {}
};

export const PipedInstanceContext = createContext<IPipedInstanceContext>(INITIAL_VALUE);

export default function PipedInstanceProvider({ children }: { children: React.ReactNode }) {
  const [endpoint, setEndpoint] = useState<string>(INITIAL_VALUE.endpoint);
  const [instance, setInstance] = useState<string>(INITIAL_VALUE.instance);
  const [region, setRegion] = useState<string>(INITIAL_VALUE.region);

  useEffect(() => {
    setEndpoint(PIPED_VALUES.PIPED_BASE + instance);
  }, [instance]);

  return (
    <PipedInstanceContext.Provider
      value={{
        instance,
        setInstance,
        endpoint,
        setEndpoint,
        region,
        setRegion
      }}
    >
      {children}
    </PipedInstanceContext.Provider>
  );
}
