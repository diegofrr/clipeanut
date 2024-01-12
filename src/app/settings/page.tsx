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
import { Header } from '@/components/Header';
import { IconSettings } from '@tabler/icons-react';
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
        <Header.Root>
          <Header.Content>
            <Header.Title>
              <IconSettings size={24} /> <h1 className="text-2xl font-bold">Configurações</h1>
            </Header.Title>
          </Header.Content>
        </Header.Root>

        <div className="flex items-center justify-center flex-row gap-5">
          {!instanceList && <CustomSpinner />}
          {instanceList && (
            <>
              <Select className="w-full" label="Instância" defaultSelectedKeys={[instance.name]}>
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

              <Select className="w-full max-w-[100px]" label="Região" defaultSelectedKeys={[region]}>
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
