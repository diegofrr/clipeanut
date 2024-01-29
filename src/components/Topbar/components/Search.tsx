import { useState } from 'react';

import Icons from '@/icons';

import { Input } from '@nextui-org/react';

export default function Search() {
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [searchValue, setSearchValue] = useState('');

  function fetchSuggestionsController({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(setTimeout(() => fetchSuggestions(target.value), 500));
  }

  function fetchSuggestions(search: string) {
    console.log(search);
  }

  return (
    <Input
      onChange={fetchSuggestionsController}
      value={searchValue}
      onValueChange={setSearchValue}
      placeholder="Pesquisar..."
      isClearable
      startContent={<Icons.Search size={14} />}
      classNames={{
        base: 'sm:max-w-md lg:max-w-lg w-full h-10',
        mainWrapper: 'h-full',
        input: 'text-small',
        inputWrapper:
          'h-full font-normal text-default-500 border-1 bg-neutral-100 dark:bg-neutral-900 border-1 border-neutral-200 dark:border-none'
      }}
      radius="full"
      type="search"
      size="sm"
    />
  );
}
