'use client';

import Link from 'next/link';
import { useContext } from 'react';

import { PIPED_VALUES } from '@/constants';
import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { Select, SelectItem, Button } from '@nextui-org/react';
import NavBar from '@/components/Navbar';

export default function Settings() {
  const { instance, setInstance, region, setRegion } = useContext(PipedInstanceContext);

  const handleSelectionChangeInstance = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInstance(e.target.value);
  };

  const handleSelectionChangeRegion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };

  return (
    <>
      <NavBar />
      <main className="w-full">
        <div className="max-w-7xl m-auto p-6">
          <header className="w-full mb-6">
            <h1 className="text-3xl font-bold">Configurações</h1>
          </header>

          <div className="flex items-center justify-center flex-col gap-5">
            <Select
              className="w-full"
              label="Alterar instância"
              defaultSelectedKeys={[instance]}
              onChange={handleSelectionChangeInstance}
            >
              {PIPED_VALUES.INSTANCES.map((_instance) => (
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
      </main>
    </>
  );
}
