import { ReactNode, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import ApiErrorBoundary from './components/ErrorBoundary/ApiErrorBoundary';
import Spinner from './components/Spinner/Spinner';
import MobileView from './layouts/MobileView';
import Feed from './pages/Feed/Feed.page';
import FeedDetailPage from './pages/FeedDetail/FeedDetail.page';
import Agreement from './pages/Login/Agreement';
import KakaoRedirect from './pages/Login/KakaoRedirect';
import Login from './pages/Login/Login';
import NeedAuth from './pages/NeedAuth';
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
  isAuth: boolean;
  redirectPath?: string;
  errorElement?: ReactNode;
  children: { path: string; element: ReactNode; withAuth: boolean }[];
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
    isAuth: false,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: withAsyncBoundary(<Feed />),
        withAuth: false,
      },
      {
        path: '/feed/:id',
        element: withAsyncBoundary(<FeedDetailPage />),
        withAuth: true,
      },
      {
        path: '/write',
        element: withAsyncBoundary(<WritePage />),
        withAuth: true,
      },
      {
        path: '/write-edit',
        element: withAsyncBoundary(<WriteEditPage />),
        withAuth: true,
      },
      {
        path: '/login',
        element: <Login />,
        withAuth: false,
      },
      {
        path: '/oauth/redirected/kakao',
        element: <KakaoRedirect />,
        withAuth: false,
      },
      {
        path: '/profile/:id',
        element: withAsyncBoundary(<Profile />),
        withAuth: true,
      },
      {
        path: '/profile-edit',
        element: withAsyncBoundary(<ProfileEdit />),
        withAuth: true,
      },
      {
        path: '/profile/:id/more',
        element: <More />,
        withAuth: true,
      },

      {
        path: '/agreement',
        element: <Agreement />,
        withAuth: false,
      },
      {
        path: '/sign-up',
        element: withAsyncBoundary(<SignUpPage />),
        withAuth: false,
      },
    ],
  },
];

const router = createBrowserRouter(
  routes.map((route) => {
    const childrenRoutes = route.children?.map((childRoute) => {
      if (childRoute.withAuth) {
        return {
          path: childRoute.path,
          element: <NeedAuth withAuth={childRoute.withAuth}>{childRoute.element}</NeedAuth>,
        };
      }

      return {
        path: childRoute.path,
        element: childRoute.element,
      };
    });

    return {
      ...route,
      children: childrenRoutes,
    };
  }),
);

export default router;
