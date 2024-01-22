export function hasSearchInput(pathname: string): boolean {
  return !['/settings', '/favorities', '/me'].includes(pathname);
}

export function hasNavbar(pathname: string): boolean {
  return ![''].includes(pathname);
}
