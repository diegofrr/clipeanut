'use client';

import { useContext, useEffect, useState } from 'react';

import { PIPED_VALUES } from '@/constants';
import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { Select, SelectItem } from '@nextui-org/react';
import IPipedInstance from '@/types/PipedInstance';
import { fetchPipedInstancesData } from '@/services/actions/fetchPipedInstancesData';
import { getStoragedInstances } from '@/services/actions/useLocalStorage';

export default function Settings() {
  const { instance, setInstance, region, setRegion } = useContext(PipedInstanceContext);

  const [instanceList, setInstanceList] = useState<IPipedInstance[] | null>(null);

  useEffect(() => {
    fetchPipedInstancesData({ options: { isFake: true } })
      .then((data) => {
        setInstanceList(data);
      })
      .catch(() => {
        const storagedInstances = getStoragedInstances();
        setInstanceList(storagedInstances);
      });
  }, []);

  const handleSelectionChangeInstance = (instance: IPipedInstance) => {
    setInstance(instance);
  };

  const handleSelectionChangeRegion = (region: string) => {
    setRegion(region);
  };

  return (
    <main className="w-full">
      <div className="max-w-7xl m-auto p-6">
        <header className="w-full mb-6">
          <h1 className="text-3xl font-bold">Configurações</h1>
        </header>

        <div className="flex items-center justify-center flex-row gap-5">
          {instanceList && (
            <Select className="w-full" label="Alterar instância" defaultSelectedKeys={[instance.name]}>
              {instanceList.map((_instance, index) => (
                <SelectItem
                  onClick={() => handleSelectionChangeInstance(_instance)}
                  key={index}
                  value={_instance.name}
                  className={`${_instance.name === instance.name && 'hidden'}`}
                >
                  {_instance.name}
                </SelectItem>
              ))}
            </Select>
          )}

          <Select className="w-full" label="Alterar região" defaultSelectedKeys={[region]}>
            {PIPED_VALUES.REGIONS.map((_region, index) => (
              <SelectItem
                onClick={() => handleSelectionChangeRegion(_region)}
                key={index}
                value={_region}
                className={`${_region === region && 'hidden'}`}
              >
                {_region}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </main>
  );
}
