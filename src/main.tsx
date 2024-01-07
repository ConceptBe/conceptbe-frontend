import { ConceptBeProvider } from 'concept-be-design-system';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

import './styles/reset.css';

createRoot(document.getElementById('root')!).render(
  <ConceptBeProvider>
    <App />
  </ConceptBeProvider>,
);
