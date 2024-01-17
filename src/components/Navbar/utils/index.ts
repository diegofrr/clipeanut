export function hasSearchInput(pathname: string): boolean {
  return !['/settings', '/favorities'].includes(pathname);
}
