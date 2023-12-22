import { useLocation, matchPath } from 'react-router-dom';

const useRouteMatched = (...paths) => {
  const location = useLocation();

  // 현재 경로가 주어진 경로들 중 하나와 일치하는지 확인
  const isMatched = paths.some((path) => {
    const match = matchPath(path, location.pathname);
    return match !== null;
  });
  return isMatched;
};

export default useRouteMatched;
