import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { FilterProvider } from './pages/Feed/context/filterContext.tsx';
import router from './router.tsx';

function App() {
  const clearSessionStorage = () => {
    sessionStorage.clear();
  };

  // 새로고침 시 세션 스토리지에 기록된 페이지 스크롤 위치를 모두 삭제합니다.
  // Safari 대응을 위해 load 대신 pagehide 이벤트 사용합니다.
  useEffect(() => {
    window.addEventListener('pagehide', clearSessionStorage);

    return () => window.removeEventListener('pagehide', clearSessionStorage);
  }, []);

  return (
    <FilterProvider>
      <RouterProvider router={router} />
    </FilterProvider>
  );
}

export default App;
