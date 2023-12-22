import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MobileView from './layouts/MobileView';
import Agreement from './pages/Agreement.tsx';
import Auth from './pages/Auth.page.tsx';
import Components from './pages/Components.page.tsx';
import Feed from './pages/feed/Feed.page';
import Feeds from './pages/feed/Feeds.page';
import Login from './pages/Login.tsx';
import MainLanding from './pages/MainLanding.tsx';
import More from './pages/profile/More.page.tsx';
import Profile from './pages/profile/Profile.page.tsx';
import Setting from './pages/profile/Setting.page.tsx';
import TestPage from './pages/Test.page';
import Write from './pages/Write.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MobileView />}>
          <Route path="/landing" element={<MainLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="" element={<TestPage />} />
          <Route path="/feed" element={<Feeds />} />
          <Route path="/feed/:id" element={<Feed />} />
          <Route path="/write" element={<Write />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/agreement" element={<Agreement />} />
          <Route path="/profile/:id" element={<Setting />} />
          <Route path="/profile/:id/more" element={<More />} />
          <Route path="/components" element={<Components />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
