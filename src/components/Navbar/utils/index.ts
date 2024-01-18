export function hasSearchInput(pathname: string): boolean {
  return !['/settings', '/favorities'].includes(pathname);
}

export function hasNavbar(pathname: string): boolean {
  return ![''].includes(pathname);
}
