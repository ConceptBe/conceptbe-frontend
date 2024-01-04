import { useLocation, matchPath } from 'react-router-dom';

const useRouteMatched = () => {
  const location = useLocation();

  const hasMatched = (...paths: string[]) => {
    const isMatched = paths.some((path) => {
      const match = matchPath(path, location.pathname);
      return match !== null;
    });

    return isMatched;
  };

  return { hasMatched };
};

export default useRouteMatched;
