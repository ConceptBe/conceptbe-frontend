import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConceptBeProvider } from 'concept-be-design-system';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

import './styles/reset.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ConceptBeProvider>
      <App />
    </ConceptBeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);
