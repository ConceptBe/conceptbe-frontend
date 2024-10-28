export const generateQueryString = (params: Record<string, any>) => {
  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&');
};

export const parseQueryString = <T extends Record<string, any>>() => {
  const searchParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(searchParams.entries()) as T;
};
