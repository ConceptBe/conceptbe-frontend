import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MobileView from './layouts/MobileView';
import Feed from './pages/Feed/Feed.page.tsx';
import FeedDetail from './pages/Feed/FeedDetail.page.tsx';
import Agreement from './pages/Login/Agreement.tsx';
import KakaoRedirect from './pages/Login/KakaoRedirect.tsx';
import Login from './pages/Login/Login.tsx';
import SignUp from './pages/Login/SignUp.tsx';
import More from './pages/profile/More.page.tsx';
import Profile from './pages/profile/Profile.page.tsx';
import Setting from './pages/profile/Setting.page.tsx';
import Write from './pages/Write.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MobileView />}>
          <Route path="/login" element={<Login />} />
          <Route path="/oauth/redirected/kakao" element={<KakaoRedirect />} />
          <Route path="/" element={<Feed />} />
          <Route path="/feed/:id" element={<FeedDetail />} />
          <Route path="/write" element={<Write />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/agreement" element={<Agreement />} />
          <Route path="/profile/:id" element={<Setting />} />
          <Route path="/profile/:id/more" element={<More />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
