import { useContext, useState, createContext, MutableRefObject, useRef } from 'react';

type CommentFocusContextType = {
  isFocusComment: boolean;
  openCommentTextarea: () => void;
  closeCommentTextarea: () => void;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
};

const CommentFocusContext = createContext<CommentFocusContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const CommentFocusProvider = ({ children }: Props) => {
  const [isFocusComment, setIsFocusComment] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const openCommentTextarea = () => {
    if (!textareaRef.current) return;

    textareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    textareaRef.current.focus();

    setIsFocusComment(true);
  };

  const closeCommentTextarea = () => {
    setIsFocusComment(false);
  };

  return (
    <CommentFocusContext.Provider
      value={{
        isFocusComment,
        openCommentTextarea,
        closeCommentTextarea,
        textareaRef,
      }}
    >
      {children}
    </CommentFocusContext.Provider>
  );
};

export const useFocusComment = () => {
  const context = useContext(CommentFocusContext);
  if (context === null) {
    throw new Error('useFocusComment 은 CommentFocusProvider 내부에서 호출해주세요.');
  }
  return context;
};
