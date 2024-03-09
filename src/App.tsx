import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import Spinner from './components/Spinner/Spinner.tsx';
import { FilterProvider } from './pages/Feed/context/filterContext.tsx';
import router from './router.tsx';

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <FilterProvider>
        <RouterProvider router={router} />
      </FilterProvider>
    </Suspense>
  );
}

export default App;
