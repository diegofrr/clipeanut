export enum ActionTypes {
  SET_SEARCH_VALUE,
  SET_SUGGESTIONS,
  SET_IS_OPEN,
  SET_IS_SEND,
  SET_IS_FETCHING_SUGGESTIONS
}

export type SearchAction =
  | SetSearchValueAction
  | SetSuggestionsAction
  | SetIsOpenAction
  | SetIsSendAction
  | SetFetchingSuggestionsAction;

export interface SearchState {
  searchValue: string;
  suggestions: string[];
  isOpen: boolean;
  isSended: boolean;
  fetchingSuggestions: boolean;
}

export interface SetSearchValueAction {
  type: ActionTypes.SET_SEARCH_VALUE;
  payload: string;
}

export interface SetSuggestionsAction {
  type: ActionTypes.SET_SUGGESTIONS;
  payload: string[];
}

export interface SetIsOpenAction {
  type: ActionTypes.SET_IS_OPEN;
  payload: boolean;
}

export interface SetIsSendAction {
  type: ActionTypes.SET_IS_SEND;
  payload: boolean;
}

export interface SetFetchingSuggestionsAction {
  type: ActionTypes.SET_IS_FETCHING_SUGGESTIONS;
  payload: boolean;
}
