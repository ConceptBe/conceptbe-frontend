import { Spinner } from 'concept-be-design-system';
import { ReactNode, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import ApiErrorBoundary from './components/ErrorBoundary/ApiErrorBoundary';
import MobileView from './layouts/MobileView';
import Feed from './pages/Feed/Feed.page';
import FeedDetailPage from './pages/FeedDetail/FeedDetail.page';
import Agreement from './pages/Login/Agreement';
import Login from './pages/Login/Login';
import OauthRedirect from './pages/Login/OauthRedirect';
import NotFound from './pages/NotFound';
import More from './pages/Profile/More.page';
import Profile from './pages/Profile/Profile.page';
import ProfileEdit from './pages/ProfileEdit/ProfileEdit.page';
import SignUpPage from './pages/SignUp/SignUp.page';
import WritePage from './pages/Write/Write.page';
import WriteEditPage from './pages/WriteEdit/WriteEdit.page';

interface RouteElement {
  path: string;
  element: ReactNode;
  redirectPath?: string;
  errorElement?: ReactNode;
  children: { path: string; element: ReactNode }[];
}

const withAsyncBoundary = (children: ReactNode) => (
  <ApiErrorBoundary>
    <Suspense fallback={<Spinner />}>{children}</Suspense>
  </ApiErrorBoundary>
);

const routes: RouteElement[] = [
  {
    path: '/',
    element: <MobileView />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: withAsyncBoundary(<Feed />),
      },
      {
        path: '/feed/:id',
        element: withAsyncBoundary(<FeedDetailPage />),
      },
      {
        path: '/write',
        element: withAsyncBoundary(<WritePage />),
      },
      {
        path: '/write-edit',
        element: withAsyncBoundary(<WriteEditPage />),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/oauth/redirected/kakao',
        element: <OauthRedirect serverName="kakao" />,
      },
      {
        path: '/oauth/redirected/naver',
        element: <OauthRedirect serverName="naver" />,
      },
      {
        path: '/profile/:id',
        element: withAsyncBoundary(<Profile />),
      },
      {
        path: '/profile-edit',
        element: withAsyncBoundary(<ProfileEdit />),
      },
      {
        path: '/profile/:id/more',
        element: <More />,
      },
      {
        path: '/agreement',
        element: <Agreement />,
      },
      {
        path: '/sign-up',
        element: withAsyncBoundary(<SignUpPage />),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
