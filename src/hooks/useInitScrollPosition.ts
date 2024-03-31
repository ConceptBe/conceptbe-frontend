import { useLayoutEffect } from 'react';

import useRouteMatched from './useRouteMatch';
import { useMobileViewRefContext } from '../layouts/contexts/MobileViewContext';

const getPageScrollPosition = (pageName: string) => {
  return JSON.parse(sessionStorage.getItem(pageName) || '{}');
};

const setPageScrollPosition = (pageName: string, position: number) => {
  sessionStorage.setItem(pageName, JSON.stringify(position));
};

const useInitScrollPosition = (pageName: string) => {
  const mobileViewRef = useMobileViewRefContext();
  const { hasMatched } = useRouteMatched();

  useLayoutEffect(() => {
    const mobileView = mobileViewRef.current;

    if (!mobileView) return;

    // 이전 스크롤 위치가 있다면 세션 스토리지에서 가져와 이전 스크롤 위치로 조정합니다.
    // 단, 글쓰기, 글쓰기 수정, 프로필 수정, 회원가입 페이지는 스크롤 위치를 기록하지 않고 0으로 초기화합니다.
    const prevScrollPosition = getPageScrollPosition(pageName) || 0;
    const isNotRecordScrollPosition = hasMatched('/write', '/write-edit', 'profile-edit', 'sign-up');

    mobileView.scroll({ top: prevScrollPosition, behavior: 'instant' });

    return () => {
      if (isNotRecordScrollPosition) return;

      setPageScrollPosition(pageName, mobileView.scrollTop);
    };
  }, [mobileViewRef, pageName, hasMatched]);
};

export default useInitScrollPosition;
