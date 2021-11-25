import qs from 'querystring';

export function createNavigation(newValues) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return qs.stringify({
    ...Object.fromEntries(urlSearchParams.entries()),
    ...newValues,
  });
}
