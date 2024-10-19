import { RouterProvider } from 'react-router-dom';

import { FilterProvider } from './pages/Feed/context/filterContext.tsx';
import router from './router.tsx';

localStorage.setItem('user', JSON.stringify({ id: 44, nickname: '세인', profileImageUrl: null }));
localStorage.setItem(
  'userToken',
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NCIsImlhdCI6MTcyOTMxNTM3NiwiZXhwIjoxNzI5OTIwMTc2fQ.oTkyZa6T15wO0lL-yrb2BheWug_HoenQmLZfvgx1cNc',
);

function App() {
  return (
    <FilterProvider>
      <RouterProvider router={router} />
    </FilterProvider>
  );
}

export default App;
