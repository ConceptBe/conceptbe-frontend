export const generateQueryString = (params: Record<string, any>) => {
  return Object.keys(params)
    .map((key) => {
      if (typeof params[key] === 'object') {
        return `${key}=${JSON.stringify(params[key])}`;
      }

      return `${key}=${params[key]}`;
    })
    .join('&');
};

export const parseQueryString = <T extends Record<string, any>>() => {
  const searchParams = new URLSearchParams(window.location.search);
  const searchParamsObject = Object.fromEntries(searchParams.entries());

  Object.keys(searchParamsObject).forEach((key) => {
    if (key === 'skills') {
      searchParamsObject[key] = JSON.parse(searchParamsObject[key]);
    }
  });

  return Object.fromEntries(searchParams.entries()) as T;
};
