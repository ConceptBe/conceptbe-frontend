import { MutableRefObject, createContext, useContext } from 'react';

interface MobileViewMainContextProps {
  mobileViewRef: MutableRefObject<HTMLDivElement | null>;
}

export const MobileViewRefContext = createContext<MobileViewMainContextProps | null>(null);

const useMobileViewContext = () => {
  const context = useContext(MobileViewRefContext);
  if (!context) {
    throw new Error('MobileView 컴포넌트 내부에서만 사용 가능합니다.');
  }

  return context;
};

export const useMobileViewRefContext = () => {
  const context = useMobileViewContext();
  const { mobileViewRef } = context;

  return mobileViewRef;
};
