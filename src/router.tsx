import { ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Profile from './components/Profile';
import MobileView from './layouts/MobileView';
import Feed from './pages/Feed/Feed.page';
import FeedDetail from './pages/Feed/FeedDetail.page';
import Agreement from './pages/Login/Agreement';
import KakaoRedirect from './pages/Login/KakaoRedirect';
import Login from './pages/Login/Login';
import SignUp from './pages/Login/SignUp';
import NeedAuth from './pages/NeedAuth';
import NotFound from './pages/NotFound';
import More from './pages/profile/More.page';
import Setting from './pages/profile/Setting.page';
import Temp from './pages/Temp';
import Write from './pages/Write';

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
        withAuth: true,
      },
      {
        path: '/feed/:id',
        element: <FeedDetail />,
        withAuth: true,
      },
      {
        path: '/write',
        element: <Write />,
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
        element: <SignUp />,
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
