'use client';

import { createContext, useEffect, useState } from 'react';
import { DEFAULT_VALUES } from '@/constants';

type PropsPipedInstanceContext = {
  instance: string;
  endpoint: string;
  region: string;
  setInstance: React.Dispatch<React.SetStateAction<string>>;
  setEndpoint: React.Dispatch<React.SetStateAction<string>>;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
};

const INITIAL_VALUE = {
  instance: DEFAULT_VALUES.PIPED_INSTANCE,
  endpoint: DEFAULT_VALUES.PIPED_BASE + DEFAULT_VALUES.PIPED_INSTANCE,
  region: DEFAULT_VALUES.PIPED_REGION,
  setEndpoint: () => {},
  setInstance: () => {},
  setRegion: () => {}
};

export const PipedInstanceContext = createContext<PropsPipedInstanceContext>(INITIAL_VALUE);

export default function PipedInstanceProvider({ children }: { children: React.ReactNode }) {
  const [endpoint, setEndpoint] = useState<string>(INITIAL_VALUE.endpoint);
  const [instance, setInstance] = useState<string>(INITIAL_VALUE.instance);
  const [region, setRegion] = useState<string>(INITIAL_VALUE.region);

  useEffect(() => {
    setEndpoint(DEFAULT_VALUES.PIPED_BASE + instance);
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
