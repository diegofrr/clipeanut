'use client';

import { ChangeEvent, useContext, useEffect, useState } from 'react';

import Main from '@/components/Main';
import Header from '@/components/Header';
import Content from '@/components/Content';
import CustomSpinner from '@/components/CustomSpinner';
import Icons from '@/icons';

import type { IPipedInstance } from '@/types';
import { fetchPipedInstancesData } from '@/services/actions/fetchPipedInstancesData';

import { PipedInstanceContext } from '@/contexts/pipedInstance';

import { useLocalStorageWithExpiration } from '@/hooks';
import { isFakeDataFetch } from '@/environments';
import { PIPED_VALUES } from '@/constants';

import { Select, SelectItem } from '@nextui-org/react';
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

  const handleChangeItem = (type: string, { target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    if (type === 'region') setRegion(value);
    else setInstance(instanceList?.find((i) => i.name === value) as IPipedInstance);
  };

  return (
    <Main>
      <Content>
        <Header.Root>
          <Header.Content className="flex flex-row justify-between items-center">
            <Header.Title icon={<Icons.Settings2 />}>Configurações</Header.Title>
          </Header.Content>
        </Header.Root>

        <div className="flex items-center justify-center flex-row gap-5">
          {!instanceList && <CustomSpinner />}
          {instanceList && (
            <>
              <Select
                onChange={(e) => handleChangeItem('instance', e)}
                className="w-full"
                label="Instância"
                defaultSelectedKeys={[instance.name]}
              >
                {instanceList.map((_instance) => (
                  <SelectItem
                    key={_instance.name}
                    value={_instance.name}
                    className={`${_instance.name === instance.name && 'hidden'}`}
                  >
                    {_instance.name}
                  </SelectItem>
                ))}
              </Select>

              <Select
                onChange={(e) => handleChangeItem('region', e)}
                className="w-full max-w-[100px] sm:max-w-[200px]"
                label="Região"
                defaultSelectedKeys={[region]}
              >
                {PIPED_VALUES.REGIONS.map((_region) => (
                  <SelectItem key={_region} value={_region} className={`${_region === region && 'hidden'}`}>
                    {_region}
                  </SelectItem>
                ))}
              </Select>
            </>
          )}
        </div>
      </Content>
    </Main>
  );
}
