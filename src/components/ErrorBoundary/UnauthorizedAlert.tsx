import { useOverlay } from '@toss/use-overlay';
import { useCallback, useEffect } from 'react';

import Alert from '../Modal/Alert';

interface OpenAlertProps {
  content: string;
  buttonContent?: string;
}

let isOpenAlert = false;

const UnauthorizedAlert = () => {
  const overlay = useOverlay({
    exitOnUnmount: false,
  });

  const openAlert = useCallback(
    ({ content, buttonContent }: OpenAlertProps) => {
      overlay.open(({ isOpen, close, exit }) => (
        <Alert
          isOpen={isOpen}
          onClose={() => {
            close();
            exit();
            isOpenAlert = false;
          }}
          content={content}
          buttonContent={buttonContent}
        />
      ));
    },
    [overlay],
  );

  useEffect(() => {
    if (isOpenAlert) return;

    openAlert({
      content: '인증 정보가 만료되었습니다. 다시 로그인해 주세요.',
    });

    isOpenAlert = true;
  }, [openAlert]);

  return <></>;
};

export default UnauthorizedAlert;
