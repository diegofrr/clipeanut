export function hasTopbar(pathname: string): boolean {
  return ![''].includes(pathname);
}

export function hasSearchInput(pathname: string): boolean {
  return !['/settings', '/favorities', '/me'].includes(pathname);
}

export function formatSuggestionToQuery(suggestion: string) {
  return suggestion.split(' ').join('+').toLowerCase();
}
