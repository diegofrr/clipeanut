'use client';

import { createContext, useState } from 'react';
import { PIPED_VALUES } from '@/constants';

import type { IPipedInstance } from '@/types';

interface IPipedInstanceContext {
  instanceList: IPipedInstance[];
  instance: IPipedInstance;
  region: string;
  setInstanceList: React.Dispatch<React.SetStateAction<IPipedInstance[]>>;
  setInstance: React.Dispatch<React.SetStateAction<IPipedInstance>>;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
}

const INITIAL_VALUE = {
  instanceList: PIPED_VALUES.DEFAULT_INSTANCE_LIST,
  instance: PIPED_VALUES.DEFAULT_INSTANCE,
  region: PIPED_VALUES.DEFAULT_REGION,
  setInstanceList: () => {},
  setInstance: () => {},
  setRegion: () => {}
};

export const PipedInstanceContext = createContext<IPipedInstanceContext>(INITIAL_VALUE);

export default function PipedInstanceProvider({ children }: { children: React.ReactNode }) {
  const [instanceList, setInstanceList] = useState<IPipedInstance[]>(INITIAL_VALUE.instanceList);
  const [instance, setInstance] = useState<IPipedInstance>(INITIAL_VALUE.instance);
  const [region, setRegion] = useState<string>(INITIAL_VALUE.region);

  return (
    <PipedInstanceContext.Provider
      value={{
        setInstanceList,
        instanceList,
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
