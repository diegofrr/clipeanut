export function streamStats(count: number) {
  if (count >= 1e9) {
    return (count / 1e9).toFixed(1).replace(/\.0$/, '') + 'bi';
  } else if (count >= 1e6) {
    return (Math.floor(count / 1e5) / 10).toFixed(1).replace(/\.0$/, '') + 'mi';
  } else if (count >= 1e3) {
    return (Math.floor(count / 1e2) / 10).toFixed(1).replace(/\.0$/, '') + 'k';
  } else {
    return count?.toString();
  }
}

export function streamViews(count: number) {
  return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
