import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MobileView from './layouts/MobileView';
import Components from './pages/Components.page.tsx';
import FeedDetailContainer from './pages/feed/Feed/FeedDetail.container.tsx';
import Feeds from './pages/feed/Feeds.page';
import TestPage from './pages/Test.page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MobileView />}>
          <Route path="" element={<TestPage />} />
          <Route path="/feed" element={<Feeds />} />
          <Route path="/feed/:id" element={<FeedDetailContainer />} />
          <Route path="/components" element={<Components />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
