import { createContext, useState } from 'react';

type PropsPipedInstanceContext = {
  endpoint: string;
  region: string;
  setEndpoint: React.Dispatch<React.SetStateAction<string>>;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
};

const DEFAULT_VALUE = {
  endpoint: 'test',
  region: 'BR',
  setEndpoint: () => {},
  setRegion: () => {}
};

export const PipedInstanceContext =
  createContext<PropsPipedInstanceContext>(DEFAULT_VALUE);

export default function PipedInstanceProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [endpoint, setEndpoint] = useState<string>(DEFAULT_VALUE.endpoint);
  const [region, setRegion] = useState<string>(DEFAULT_VALUE.region);

  return (
    <PipedInstanceContext.Provider
      value={{
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
