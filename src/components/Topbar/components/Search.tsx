import { useState } from 'react';

import Icons from '@/icons';

import { Input } from '@nextui-org/react';

export default function Search() {
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();

  function fetchSuggestionsController({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(setTimeout(() => fetchSuggestions(target.value), 500));
  }

  function fetchSuggestions(searchValue: string) {
    console.log(searchValue);
  }

  return (
    <Input
      onChange={(e) => fetchSuggestionsController(e)}
      placeholder="Pesquisar..."
      isClearable
      startContent={<Icons.Search size={14} />}
      classNames={{
        base: 'sm:max-w-md lg:max-w-lg w-full h-10',
        mainWrapper: 'h-full',
        input: 'text-small',
        inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20'
      }}
      radius="full"
      type="search"
      size="sm"
    />
  );
}
