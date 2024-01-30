'use client';

import { createRef, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

import Icons from '@/icons';

import { FetchSuggestionsOptionsType, fetchSuggestions } from '@/services/actions/fetchSuggestionsData';
import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { formatSuggestionToQuery } from '../utils';
import { isFakeDataFetch } from '@/environments';
import { useWindowSize } from 'usehooks-ts';
import { Button, Input } from '@nextui-org/react';

export default function Search() {
  const router = useRouter();
  const inputRef = createRef<HTMLInputElement>();

  const { instance } = useContext(PipedInstanceContext);
  const { width } = useWindowSize();

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function getSuggestionsController({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (!isValidSuggestion(target.value)) return;
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(setTimeout(() => getSuggestions(target.value), 200));
  }

  function handleClearSuggestions() {
    setSuggestions([]);
    if (!isExpandedSearch()) setIsOpen(false);
  }

  function resetState() {
    setIsOpen(false);
    removeInputFocus();
  }

  function removeInputFocus() {
    inputRef?.current?.blur();
  }

  function handleCloseSuggestions() {
    if (!isExpandedSearch()) setIsOpen(false);
  }

  function handleClickSuggestion(suggestion: string) {
    resetState();

    const query = formatSuggestionToQuery(suggestion);
    router.push(`/results?query=${query}`);
  }

  function isValidSuggestion(suggestion: string): boolean {
    suggestion = suggestion.replace(/\s/g, '');
    return !!suggestion && suggestion.length >= 3;
  }

  function isExpandedSearch() {
    return isOpen && width < 768;
  }

  function handleClickSearch() {
    if (isExpandedSearch()) return;
    setIsOpen(true);

    if (width < 768) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }

  async function getSuggestions(search: string) {
    if (!isValidSuggestion(search)) return setIsOpen(false);

    const query = formatSuggestionToQuery(search);
    const options = { instance, query, isFake: isFakeDataFetch, delay: 1 } as FetchSuggestionsOptionsType;

    try {
      const data = await fetchSuggestions({ options });
      if (!data || !isValidSuggestion(search)) return setIsOpen(false);
      setSuggestions(data[1]);
      setIsOpen(true);
    } catch (err) {
      setIsOpen(false);
      console.error(err);
    }
  }

  return (
    <>
      <div
        onClick={handleClickSearch}
        className={`w-full md:max-w-xl h-10 z-30
      ${isExpandedSearch() ? 'fixed p-3 left-0 top-0' : 'relative'}`}
      >
        <Input
          ref={inputRef}
          onChange={getSuggestionsController}
          value={searchValue}
          onClear={handleClearSuggestions}
          onValueChange={setSearchValue}
          placeholder="Pesquisar..."
          isClearable
          startContent={<Icons.Search size={14} />}
          classNames={{
            mainWrapper: `h-10 ${isExpandedSearch() ? 'ml-[68px] w-[calc(100%-80px)]' : 'w-full'}`,
            input: 'text-small h-10',
            inputWrapper:
              'h-10 font-normal text-default-500 border-1 bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-none'
          }}
          radius="full"
          type="search"
          size="md"
        />

        {isExpandedSearch() && (
          <Button
            title="Voltar"
            onClick={resetState}
            radius="full"
            className="bg-transparent hover:bg-neutral-200 hover:dark:bg-neutral-800 absolute top-0 left-0 m-3 ml-6"
            isIconOnly
          >
            <Icons.ArrowLeftIcon />
          </Button>
        )}

        {isOpen && (suggestions?.length > 0 || isExpandedSearch()) && (
          <div
            className={`w-full rounded-lg border-1 dark:border-none bg-neutral-100 dark:bg-neutral-900 
          ${
            isExpandedSearch()
              ? 'bg-transparent dark:bg-transparent border-none px-0 fixed top-0 overflow-auto left-0 flex flex-col h-full mt-16 pb-20 p-0'
              : 'overflow-hidden mt-2 p-2'
          }`}
          >
            <ul className={`${isExpandedSearch() ? 'px-4' : 'px-0'}`}>
              {suggestions?.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleClickSuggestion(suggestion)}
                  className={`cursor-pointer flex flex-row items-center justify-between py-2 rounded-lg px-4 hover:bg-neutral-200 dark:hover:bg-neutral-800 
                  ${isExpandedSearch() ? 'hover:bg-neutral-100' : ''}`}
                >
                  {suggestion}
                  <Icons.ArrowRightUpIcon opacity={0.5} size={16} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {isOpen && (suggestions?.length > 0 || isExpandedSearch()) && (
        <span
          onClick={handleCloseSuggestions}
          className={`fixed top-0 left-0 right-0 bottom-0 z-10 ${
            isExpandedSearch() ? 'bg-white dark:bg-neutral-950' : 'opacity-40 bg-black'
          }`}
        />
      )}
    </>
  );
}
