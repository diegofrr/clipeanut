export enum ActionTypes {
  SET_SEARCH_VALUE,
  SET_SUGGESTIONS,
  SET_HISTORY,
  SET_IS_HISTORY,
  SET_IS_OPEN,
  SET_IS_FOCUSED,
  SET_IS_SENDED,
  SET_IS_VALID_SUGGESTION,
  SET_IS_FETCHING_SUGGESTIONS
}

export type SearchAction =
  | SetSearchValueAction
  | SetSuggestionsAction
  | SetHistoryAction
  | SetIsHistoryAction
  | SetIsOpenAction
  | SetIsSendAction
  | SetIsFocused
  | SetIsValidSuggestion
  | SetFetchingSuggestionsAction;

export interface SearchState {
  searchValue: string;
  suggestions: string[];
  history: string[];
  isHistory: boolean;
  isFocused: boolean;
  isOpen: boolean;
  isSended: boolean;
  isValidSuggestion: boolean;
  fetchingSuggestions: boolean;
}

export interface SetIsValidSuggestion {
  type: ActionTypes.SET_IS_VALID_SUGGESTION;
  payload: boolean;
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

export interface SetHistoryAction {
  type: ActionTypes.SET_HISTORY;
  payload: string[];
}

export interface SetIsHistoryAction {
  type: ActionTypes.SET_IS_HISTORY;
  payload: boolean;
}

export interface SetIsFocused {
  type: ActionTypes.SET_IS_FOCUSED;
}

export interface SetIsSendAction {
  type: ActionTypes.SET_IS_SENDED;
  payload: boolean;
}

export interface SetFetchingSuggestionsAction {
  type: ActionTypes.SET_IS_FETCHING_SUGGESTIONS;
  payload: boolean;
}
