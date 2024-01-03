'use client';

import { PIPED_VALUES } from '@/constants';
import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { Select, SelectItem, Button } from '@nextui-org/react';
import Link from 'next/link';
import { useContext } from 'react';

export default function Settings() {
  const { endpoint, instance, setInstance } = useContext(PipedInstanceContext);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInstance(e.target.value);
  };

  return (
    <div className="w-full p-5">
      <h1 className="text-white">{endpoint}</h1>
      <h1 className="text-2xl text-white mb-5">Configurações</h1>
      <div className="flex items-center justify-center flex-col">
        <Select
          className="w-full"
          label="Alterar instância"
          defaultSelectedKeys={[instance]}
          onChange={handleSelectionChange}
        >
          {PIPED_VALUES.INTANCES.map((instance) => (
            <SelectItem key={instance} value={instance}>
              {instance}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Button color="primary" radius="sm" className="mt-5">
        <Link href={'/'}>Go to Home</Link>
      </Button>
    </div>
  );
}
