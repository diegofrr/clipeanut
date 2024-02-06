'use client';

import { createRef, useState, useReducer } from 'react';
import { useRouter } from 'next/navigation';

import { ActionTypes, type SearchAction, type SearchState } from './reducer/types';

import Icons from '@/icons';

import { initialSearchState, searchReducer } from './reducer';
import { FetchSuggestionsOptionsType, fetchSuggestions } from '@/services/actions/fetchSuggestionsData';
import { formatSuggestionToQuery } from '../../utils';
import { isFakeDataFetch } from '@/environments';
import { Button, Input } from '@nextui-org/react';

import { PIPED_VALUES } from '@/constants';
import { useWindowSize } from 'usehooks-ts';
const { DEFAULT_INSTANCE_LIST } = PIPED_VALUES;

export default function Search() {
  const router = useRouter();
  const inputRef = createRef<HTMLInputElement>();
  const { width } = useWindowSize();

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [state, dispatch] = useReducer<React.Reducer<SearchState, SearchAction>>(searchReducer, initialSearchState);

  let oldInstanceList = DEFAULT_INSTANCE_LIST;

  const setSearchValue = (value: string) => dispatch({ type: ActionTypes.SET_SEARCH_VALUE, payload: value });
  const setSuggestions = (value: string[]) => dispatch({ type: ActionTypes.SET_SUGGESTIONS, payload: value });
  const setIsFetching = (value: boolean) => dispatch({ type: ActionTypes.SET_IS_FETCHING_SUGGESTIONS, payload: value });
  const setIsOpen = (value: boolean) => dispatch({ type: ActionTypes.SET_IS_OPEN, payload: value });
  const setIsSended = (value: boolean) => dispatch({ type: ActionTypes.SET_IS_SENDED, payload: value });
  const isMobile = () => width <= 640;

  function retryGetSuggestions(search: string) {
    if (oldInstanceList.length === 0) oldInstanceList = DEFAULT_INSTANCE_LIST;
    oldInstanceList = oldInstanceList.slice(1);

    getSuggestions(search);
  }

  async function getSuggestions(search: string) {
    if (state.fetchingSuggestions) return;
    if (!isValidSuggestion(search)) return setIsOpen(false);

    const instance = oldInstanceList[0];
    const query = formatSuggestionToQuery(search);
    const options = { instance, query, isFake: isFakeDataFetch, delay: 1 } as FetchSuggestionsOptionsType;

    try {
      setIsFetching(true);
      const data = await fetchSuggestions({ options });
      if (!data || !data[1] || !isValidSuggestion(search)) return retryGetSuggestions(search);

      setSuggestions(data[1]);
    } catch {
      setIsOpen(false);
      retryGetSuggestions(search);
    } finally {
      setIsFetching(false);
    }
  }

  function getSuggestionsController({ target }: React.ChangeEvent<HTMLInputElement>) {
    setIsSended(false);

    if (!isValidSuggestion(target.value)) return setSuggestions([]);
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(setTimeout(() => getSuggestions(target.value), 200));
  }

  function handleFetchSuggestion(suggestion: string) {
    setIsSended(true);
    setSearchValue(suggestion);

    const query = formatSuggestionToQuery(suggestion);
    router.push(`/search?q=${query}`);
  }

  function isValidSuggestion(suggestion: string): boolean {
    suggestion = suggestion.replace(/\s/g, '');
    return !!suggestion && suggestion.length >= 3;
  }

  function handleClickSearch() {
    if (!state.isOpen) setIsOpen(true);
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') handleFetchSuggestion(state.searchValue);
  }

  return (
    <>
      <div
        onClick={handleClickSearch}
        className={`w-full md:max-w-xl h-10 z-30 sm:relative transition-all ${
          state.isOpen && isMobile() && 'fixed max-w-[calc(100vw-32px)] left-4'
        }`}
      >
        <Input
          onClick={() => setIsOpen(true)}
          ref={inputRef}
          onChange={getSuggestionsController}
          value={state.searchValue}
          onKeyUp={handleKeyUp}
          onValueChange={setSearchValue}
          placeholder="Pesquisar..."
          endContent={
            <Button
              title="Pesquisar"
              size="sm"
              color="warning"
              radius="full"
              className={`h-8 w-8 absolute right-1 top-1/2 -translate-y-1/2 
              ${!isValidSuggestion(state.searchValue) ? 'hidden' : ''}`}
              isIconOnly
              onClick={() => handleFetchSuggestion(state.searchValue)}
            >
              <Icons.Search strokeWidth={2} size={16} />
            </Button>
          }
          classNames={{
            mainWrapper: 'h-10 flex w-full',
            input: 'text-small h-10 mr-6',
            inputWrapper:
              'h-10 font-normal text-default-500 border-1 bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-none'
          }}
          radius="full"
          type="search"
          size="md"
        />

        {state.isOpen && !state.isSended && state.suggestions?.length > 0 && (
          <div className="rounded-lg overflow-hidden border-1 dark:border-none bg-neutral-100 dark:bg-neutral-900 h-auto mt-2">
            <div className="w-full overflow-auto max-h-[80vh] sm:max-h-[40vh] p-2">
              <ul>
                {state.suggestions?.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleFetchSuggestion(suggestion)}
                    className="cursor-pointer flex flex-row items-center gap-2 py-2 rounded-full px-4 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                  >
                    <Icons.Search opacity={0.5} strokeWidth={2} size={14} />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      {state.isOpen && !state.isSended && state.suggestions?.length > 0 && (
        <span
          onClick={() => setIsOpen(false)}
          className="fixed top-0 left-0 right-0 bottom-0 z-10 opacity-40 bg-black"
        />
      )}
    </>
  );
}
