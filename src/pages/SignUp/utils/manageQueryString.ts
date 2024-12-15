export const setSessionData = (key: string, data: Record<string, any>) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const getSessionData = <T extends Record<string, any>>(key: string): T | undefined => {
  const data = sessionStorage.getItem(key);
  if (!data) {
    return undefined;
  }

  try {
    return JSON.parse(data);
  } catch {
    return undefined;
  }
};

export const clearSessionData = (key: string) => {
  sessionStorage.removeItem(key);
};
