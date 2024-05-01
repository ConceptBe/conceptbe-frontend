import { useOverlay } from '@toss/use-overlay';
import { Confirm } from 'concept-be-design-system';
import { useCallback } from 'react';

interface OpenConfirmProps {
  content: string;
  confirmButtonContent?: string;
  closeButtonContent?: string;
  onConfirm?: () => void;
}

const useConfirm = () => {
  const overlay = useOverlay();

  const openConfirm = useCallback(
    ({ content, confirmButtonContent, closeButtonContent, onConfirm }: OpenConfirmProps) => {
      return new Promise<boolean>((resolve) => {
        overlay.open(({ isOpen, close }) => (
          <Confirm
            content={content}
            isOpen={isOpen}
            confirmButtonContent={confirmButtonContent}
            closeButtonContent={closeButtonContent}
            onClose={() => {
              resolve(false);
              close();
            }}
            onConfirm={() => {
              resolve(true);
              if (onConfirm) onConfirm();
            }}
          />
        ));
      });
    },
    [overlay],
  );

  return openConfirm;
};

export default useConfirm;
