import { useOverlay } from '@toss/use-overlay';
import { Alert } from 'concept-be-design-system';
import { useCallback, useEffect } from 'react';

interface OpenAlertProps {
  content: string;
  buttonContent?: string;
}

interface Props {
  content: string;
}

let isOpenAlert = false;

const StayDuringRoutingAlert = ({ content }: Props) => {
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
      content,
    });

    isOpenAlert = true;
  }, [openAlert, content]);

  return <></>;
};

export default StayDuringRoutingAlert;
