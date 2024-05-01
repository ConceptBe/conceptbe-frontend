import { Spinner } from 'concept-be-design-system';
import { ReactNode, Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import ApiErrorBoundary from './components/ErrorBoundary/ApiErrorBoundary';
import MobileView from './layouts/MobileView';
import More from './pages/Profile/More.page';

const Feed = lazy(() => import('./pages/Feed/Feed.page'));
const FeedDetailPage = lazy(() => import('./pages/FeedDetail/FeedDetail.page'));
const WritePage = lazy(() => import('./pages/Write/Write.page'));
const WriteEditPage = lazy(() => import('./pages/WriteEdit/WriteEdit.page'));
const Agreement = lazy(() => import('./pages/Login/Agreement'));
const OauthRedirect = lazy(() => import('./pages/Login/OauthRedirect'));
const Login = lazy(() => import('./pages/Login/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Profile = lazy(() => import('./pages/Profile/Profile.page'));
const ProfileEdit = lazy(() => import('./pages/ProfileEdit/ProfileEdit.page'));
const SignUpPage = lazy(() => import('./pages/SignUp/SignUp.page'));

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
