import { ActionTypes, type SearchAction, type SearchState } from './types';

export const initialSearchState: SearchState = {
  searchValue: '',
  suggestions: [],
  isOpen: false,
  isSended: false,
  fetchingSuggestions: false
};

export const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case ActionTypes.SET_SEARCH_VALUE:
      return { ...state, searchValue: action.payload };
    case ActionTypes.SET_SUGGESTIONS:
      return { ...state, suggestions: action.payload };
    case ActionTypes.SET_IS_OPEN:
      return { ...state, isOpen: action.payload };
    case ActionTypes.SET_IS_SEND:
      return { ...state, isSended: action.payload };
    case ActionTypes.SET_IS_FETCHING_SUGGESTIONS:
      return { ...state, fetchingSuggestions: action.payload };
    default:
      return state;
  }
};
