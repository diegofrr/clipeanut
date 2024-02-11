import { ActionTypes, type SearchAction, type SearchState } from './types';

export const initialSearchState: SearchState = {
  searchValue: '',
  suggestions: [],
  history: [],
  isOpen: false,
  isFocused: false,
  isSended: false,
  isHistory: true,
  isValidSuggestion: false,
  fetchingSuggestions: false
};

export const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case ActionTypes.SET_SEARCH_VALUE: {
      const searchValue = action.payload;
      const isValid = isValidSuggestion(searchValue);

      return { ...state, searchValue, isSended: false, isValidSuggestion: isValid, isHistory: !isValid };
    }

    case ActionTypes.SET_SUGGESTIONS: {
      const suggestions = action.payload;
      return { ...state, suggestions, isOpen: !!suggestions.length };
    }

    case ActionTypes.SET_IS_OPEN: {
      return { ...state, isOpen: action.payload };
    }

    case ActionTypes.SET_IS_SENDED: {
      const isSended = action.payload;
      return { ...state, isSended, isOpen: !isSended };
    }

    case ActionTypes.SET_IS_FETCHING_SUGGESTIONS: {
      return { ...state, fetchingSuggestions: action.payload };
    }

    case ActionTypes.SET_IS_FOCUSED: {
      return { ...state, isFocused: true };
    }

    default: {
      return state;
    }
  }
};

function isValidSuggestion(suggestion: string): boolean {
  suggestion = suggestion.replace(/\s/g, '');
  return !!suggestion && suggestion.length >= 3;
}
