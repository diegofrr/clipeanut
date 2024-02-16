import { useState } from 'react';

import Icons from '@/icons';
import ReactCountryFlag from 'react-country-flag';

import { useWindowSize, useIsClient, useLocalStorage } from 'usehooks-ts';
import { Tabs, Tab, Button, Select, SelectItem } from '@nextui-org/react';
import { CommonUtils } from '@/utils';

import { COUNTRIES, LOCALSTORAGE_KEYS } from '@/constants';

type TypeTabsProps = React.HTMLAttributes<HTMLElement> & {
  tab: string | number;
  setTab: React.Dispatch<React.SetStateAction<string | number>>;
};

export default function TrendingTabs({ tab, setTab, ...props }: TypeTabsProps) {
  const { width } = useWindowSize();
  const isClient = useIsClient();

  const [region, setRegion] = useLocalStorage(LOCALSTORAGE_KEYS.CURRENT_REGION, 'BR');
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  const isMobile = () => width <= 640;

  const TABS = [
    {
      key: 'videos',
      title: 'Vídeos',
      icon: <Icons.Videos size={18} />
    },
    {
      key: 'musics',
      title: 'Músicas',
      icon: <Icons.Musics size={18} />
    },
    {
      key: 'games',
      title: 'Jogos',
      icon: <Icons.Gamepad size={18} />
    }
  ];

  return (
    <div className="flex flex-row justify-between items-center w-full h-10 relative px-6 sm:px-0">
      <Tabs
        {...props}
        isDisabled={isSelectOpen}
        size={isMobile() ? 'sm' : 'md'}
        selectedKey={tab}
        onSelectionChange={setTab}
        aria-label="Options"
        variant="light"
        radius="full"
        color="warning"
        className={`z-10 ${props.className || ''}`}
      >
        {TABS.map((tab) => (
          <Tab
            key={tab.key}
            title={
              <div className="flex items-center space-x-2">
                {tab.icon}
                {width > 480 && <span>{tab.title}</span>}
              </div>
            }
          />
        ))}
      </Tabs>

      {isClient && (
        <>
          <Select
            onOpenChange={(open) => setIsSelectOpen(open)}
            onChange={(e) => setRegion(e.target.value)}
            isOpen={isSelectOpen}
            aria-label="Selecionar região"
            className={`absolute right-0 top-0 ${isMobile() ? 'max-w-[calc(100%-32px)]' : 'max-w-xs'}`}
            classNames={{ trigger: 'invisible' }}
          >
            {COUNTRIES.sort((a, b) => a.name.localeCompare(b.name)).map((country) => (
              <SelectItem
                isDisabled={country.flag === region}
                key={country.flag}
                variant="light"
                className={`font-bold rounded-full hover:bg-foreground-100 ${country.flag === region && 'hidden'}`}
                startContent={<ReactCountryFlag countryCode={country.flag} style={{ fontSize: 20 }} />}
              >
                {country.name}
              </SelectItem>
            ))}
          </Select>
          <Button
            isDisabled={isSelectOpen}
            onClick={() => setIsSelectOpen(!isSelectOpen)}
            variant="light"
            radius="full"
            className="text-sm"
            style={{ outline: 'none' }}
            startContent={<ReactCountryFlag countryCode={region} style={{ fontSize: 20 }} />}
          >
            {isMobile() ? region : CommonUtils.getCountryName(region)}
          </Button>
        </>
      )}
    </div>
  );
}
