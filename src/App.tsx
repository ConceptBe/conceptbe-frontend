import { RouterProvider } from 'react-router-dom';

import { FilterProvider } from './pages/Feed/context/filterContext.tsx';
import router from './router.tsx';

localStorage.setItem('user', JSON.stringify({ id: 44, nickname: '세인', profileImageUrl: null }));
localStorage.setItem(
  'userToken',
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NCIsImlhdCI6MTczMDExOTc4MiwiZXhwIjoxNzMwNzI0NTgyfQ.YW0QmA5lPP_7rNOK9kDrwDXgrw85wjZLgTOsR_zi3oU',
);

function App() {
  return (
    <FilterProvider>
      <RouterProvider router={router} />
    </FilterProvider>
  );
}

export default App;
