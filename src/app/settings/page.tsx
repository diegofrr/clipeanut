'use client';

import { ChangeEvent, useContext } from 'react';

import Main from '@/components/Main';
import Header from '@/components/Header';
import Content from '@/components/Content';

import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { Select, SelectItem } from '@nextui-org/react';

import { PIPED_VALUES } from '@/constants';

export default function Settings() {
  const { region, setRegion } = useContext(PipedInstanceContext);

  function handleChangeRegion({ target: { value } }: ChangeEvent<HTMLSelectElement>) {
    setRegion(value);
  }

  return (
    <Main>
      <Content>
        <Header.Root>
          <Header.Content className="flex flex-row justify-between items-center">
            <Header.Title>Configurações</Header.Title>
          </Header.Content>
        </Header.Root>

        <div className="flex items-center justify-start flex-row gap-5">
          <Select onChange={handleChangeRegion} label="Região" defaultSelectedKeys={[region]}>
            {PIPED_VALUES.REGIONS.map((_region) => (
              <SelectItem key={_region} value={_region} className={`${_region === region && 'hidden'}`}>
                {_region}
              </SelectItem>
            ))}
          </Select>
        </div>
      </Content>
    </Main>
  );
}
