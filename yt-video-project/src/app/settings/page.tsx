'use client';

import { PIPED_VALUES } from '@/constants';
import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { Select, SelectItem, Button } from '@nextui-org/react';
import Link from 'next/link';
import { useContext } from 'react';

export default function Settings() {
  const { endpoint, instance, setInstance, region, setRegion } = useContext(PipedInstanceContext);

  const handleSelectionChangeInstance = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInstance(e.target.value);
  };

  const handleSelectionChangeRegion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };

  return (
    <div className="w-full p-5 max-w-5xl m-auto">
      <h1 className="text-2xl text-white mb-5 font-bold">Configurações</h1>
      <div className="flex items-center justify-center flex-col gap-5">
        <Select
          className="w-full"
          label="Alterar instância"
          defaultSelectedKeys={[instance]}
          onChange={handleSelectionChangeInstance}
        >
          {PIPED_VALUES.INTANCES.map((_instance) => (
            <SelectItem key={_instance} value={_instance} className={`${_instance === instance && 'hidden'}`}>
              {_instance}
            </SelectItem>
          ))}
        </Select>

        <Select
          className="w-full"
          label="Alterar região"
          defaultSelectedKeys={[region]}
          onChange={handleSelectionChangeRegion}
        >
          {PIPED_VALUES.REGIONS.map((_region) => (
            <SelectItem key={_region} value={_region} className={`${_region === region && 'hidden'}`}>
              {_region}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Button as={Link} href={'/'} color="primary" radius="sm" className="mt-5">
        Go to Home
      </Button>
    </div>
  );
}
