import { useOverlay } from '@toss/use-overlay';
import { useCallback } from 'react';

import Alert from '../components/Modal/Alert';

interface OpenAlertProps {
  content: string;
  buttonContent?: string;
}

const useAlert = () => {
  const overlay = useOverlay();

  const openAlert = useCallback(
    ({ content, buttonContent }: OpenAlertProps) => {
      overlay.open(({ isOpen, close }) => (
        <Alert isOpen={isOpen} onClose={close} content={content} buttonContent={buttonContent} />
      ));
    },
    [overlay],
  );

  return openAlert;
};

export default useAlert;
