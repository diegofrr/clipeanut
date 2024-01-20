import { Tabs, Tab } from '@nextui-org/react';

import { useWindowSize } from 'usehooks-ts';
import { IconDeviceGamepad2, IconMusic, IconVideo } from '@tabler/icons-react';

type TypeTabsProps = React.HTMLAttributes<HTMLElement> & {
  tab: string | number;
  setTab: React.Dispatch<React.SetStateAction<string | number>>;
};

export default function TrendingTabs({ tab, setTab, ...props }: TypeTabsProps) {
  const { width } = useWindowSize();

  const TABS = [
    {
      key: 'videos',
      title: 'Vídeos',
      icon: <IconVideo size={18} />
    },
    {
      key: 'musics',
      title: 'Músicas',
      icon: <IconMusic size={18} />
    },
    {
      key: 'games',
      title: 'Jogos',
      icon: <IconDeviceGamepad2 size={18} />
    }
  ];

  return (
    <Tabs
      {...props}
      size="sm"
      selectedKey={tab}
      onSelectionChange={setTab}
      aria-label="Options"
      variant="bordered"
      radius="full"
      color="warning"
      className={`${props.className || ''}`}
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
  );
}
