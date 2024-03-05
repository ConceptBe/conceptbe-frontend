import { ReactNode, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

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
import Setting from './pages/Profile/Setting.page';
import SignUpPage from './pages/SignUp/SignUp.page';
import Temp from './pages/Temp';
import WritePage from './pages/Write/Write.page';

interface RouteElement {
  path: string;
  element: ReactNode;
  isAuth: boolean;
  redirectPath?: string;
  errorElement?: ReactNode;
  children: { path: string; element: ReactNode; withAuth: boolean }[];
}

const routes: RouteElement[] = [
  {
    path: '/',
    element: <MobileView />,
    isAuth: false,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Feed />,
        withAuth: false,
      },
      {
        path: '/feed/:id',
        element: (
          <Suspense>
            <FeedDetailPage />
          </Suspense>
        ),
        withAuth: true,
      },
      {
        path: '/write',
        element: (
          <Suspense>
            <WritePage />
          </Suspense>
        ),
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
        path: '/profile',
        element: <Profile />,
        withAuth: true,
      },
      {
        path: '/profile/:id',
        element: <Setting />,
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
        element: (
          <Suspense>
            <SignUpPage />
          </Suspense>
        ),
        withAuth: false,
      },
      {
        path: '/temp',
        element: <Temp />,
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
