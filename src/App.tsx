import { RouterProvider } from 'react-router-dom';

import { FilterProvider } from './pages/Feed/context/filterContext.tsx';
import router from './router.tsx';

function App() {
  return (
    <FilterProvider>
      <RouterProvider router={router} />
    </FilterProvider>
  );
}

export default App;
