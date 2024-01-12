'use client';

import { useContext, useEffect, useState } from 'react';

import CustomSpinner from '@/components/CustomSpinner';

import type { IPipedInstance } from '@/types';
import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { Select, SelectItem } from '@nextui-org/react';
import { fetchPipedInstancesData } from '@/services/actions/fetchPipedInstancesData';
import { isFakeDataFetch } from '@/environments';
import { useLocalStorageWithExpiration } from '@/hooks';

import { PIPED_VALUES } from '@/constants';
const { LOCAL_STORAGE_KEYS } = PIPED_VALUES;

export default function Settings() {
  const { instance, setInstance, region, setRegion } = useContext(PipedInstanceContext);
  const { getStoragedItem, setStoragedItem, isExistsItem } = useLocalStorageWithExpiration();

  const [instanceList, setInstanceList] = useState<IPipedInstance[] | null>(null);

  useEffect(() => {
    if (isExistsItem(LOCAL_STORAGE_KEYS.STORAGED_INSTANCES)) {
      const storagedInstances = getStoragedItem<IPipedInstance[]>(LOCAL_STORAGE_KEYS.STORAGED_INSTANCES);
      if (storagedInstances) setInstanceList(storagedInstances.value);
    } else {
      fetchPipedInstancesData({ options: { isFake: isFakeDataFetch, delay: 1 } })
        .then((data) => {
          setInstanceList(data);
          setStoragedItem(LOCAL_STORAGE_KEYS.STORAGED_INSTANCES, data, { minutes: 60 });
        })
        .catch(() => setInstanceList([PIPED_VALUES.DEFAULT_INSTANCE]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {!instanceList && <CustomSpinner />}
          {instanceList && (
            <>
              <Select className="w-full" label="Alterar instância" defaultSelectedKeys={[instance.name]}>
                {instanceList.map((_instance) => (
                  <SelectItem
                    onClick={() => handleSelectionChangeInstance(_instance)}
                    key={_instance.name}
                    value={_instance.name}
                    className={`${_instance.name === instance.name && 'hidden'}`}
                  >
                    {_instance.name}
                  </SelectItem>
                ))}
              </Select>

              <Select className="w-full" label="Alterar região" defaultSelectedKeys={[region]}>
                {PIPED_VALUES.REGIONS.map((_region) => (
                  <SelectItem
                    onClick={() => handleSelectionChangeRegion(_region)}
                    key={_region}
                    value={_region}
                    className={`${_region === region && 'hidden'}`}
                  >
                    {_region}
                  </SelectItem>
                ))}
              </Select>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
