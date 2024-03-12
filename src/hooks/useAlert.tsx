import { useOverlay } from '@toss/use-overlay';

import Alert from '../components/Modal/Alert';

interface OpenAlertProps {
  content: string;
  buttonContent?: string;
}

const useAlert = () => {
  const overlay = useOverlay();

  const openAlert = ({ content, buttonContent }: OpenAlertProps) => {
    overlay.open(({ isOpen, close }) => (
      <Alert isOpen={isOpen} onClose={close} content={content} buttonContent={buttonContent} />
    ));
  };

  return openAlert;
};

export default useAlert;
