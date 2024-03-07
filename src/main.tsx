import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { OverlayProvider } from '@toss/use-overlay';
import { ConceptBeProvider } from 'concept-be-design-system';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

import './styles/reset.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ConceptBeProvider>
      <OverlayProvider>
        <App />
      </OverlayProvider>
    </ConceptBeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);
