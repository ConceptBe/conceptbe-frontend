import { useContext, useState, createContext, MutableRefObject, useRef } from 'react';

type CommentFocusContextType = {
  isFocusComment: boolean;
  openCommentTextarea: () => void;
  focusRecommentTextarea: () => void;
  closeCommentTextarea: () => void;
  initRecommentTextareaRef: () => void;
  commentTextareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  recommentTextareaRef: MutableRefObject<HTMLTextAreaElement | null>;
};

const CommentFocusContext = createContext<CommentFocusContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const CommentFocusProvider = ({ children }: Props) => {
  const [isFocusComment, setIsFocusComment] = useState<boolean>(false);
  const commentTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recommentTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const openCommentTextarea = () => {
    if (!commentTextareaRef.current) return;

    commentTextareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    commentTextareaRef.current.focus();

    setIsFocusComment(true);
  };

  const closeCommentTextarea = () => {
    setIsFocusComment(false);
  };

  const focusRecommentTextarea = () => {
    if (!recommentTextareaRef.current) return;

    recommentTextareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    recommentTextareaRef.current.focus();
  };

  const initRecommentTextareaRef = () => {
    recommentTextareaRef.current = null;
  };

  return (
    <CommentFocusContext.Provider
      value={{
        isFocusComment,
        openCommentTextarea,
        focusRecommentTextarea,
        closeCommentTextarea,
        initRecommentTextareaRef,
        commentTextareaRef,
        recommentTextareaRef,
      }}
    >
      {children}
    </CommentFocusContext.Provider>
  );
};

export const useFocusCommentTextareaContext = () => {
  const context = useContext(CommentFocusContext);
  if (context === null) {
    throw new Error('useFocusComment 은 CommentFocusProvider 내부에서 호출해주세요.');
  }
  const { isFocusComment, openCommentTextarea, closeCommentTextarea, commentTextareaRef } = context;
  return { isFocusComment, openCommentTextarea, closeCommentTextarea, commentTextareaRef };
};

export const useFocusRecommentTextareaContext = () => {
  const context = useContext(CommentFocusContext);
  if (context === null) {
    throw new Error('useFocusComment 은 CommentFocusProvider 내부에서 호출해주세요.');
  }
  const { focusRecommentTextarea, initRecommentTextareaRef, recommentTextareaRef } = context;
  return { focusRecommentTextarea, initRecommentTextareaRef, recommentTextareaRef };
};
