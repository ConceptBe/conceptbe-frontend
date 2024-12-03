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

  const parsedObject = Object.entries(searchParamsObject).reduce(
    (acc, [key, value]) => {
      try {
        acc[key] = JSON.parse(value);
      } catch {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, any>,
  );

  return parsedObject as T;
};
