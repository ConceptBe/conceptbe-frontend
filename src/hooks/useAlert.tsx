import { useOverlay } from '@toss/use-overlay';
import { Alert } from 'concept-be-design-system';
import { useCallback } from 'react';

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
