import { useContext, useState, createContext, MutableRefObject, useRef } from 'react';

type CommentFocusContextType = {
  isFocusComment: boolean;
  openCommentTextarea: () => void;
  focusRecommentTextarea: () => void;
  closeCommentTextarea: () => void;
  initRecommentTextareaRef: () => void;
  focusEditCommentTextarea: () => void;
  initEditCommentTextarea: () => void;
  commentTextareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  recommentTextareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  editCommentTextareaRef: MutableRefObject<HTMLTextAreaElement | null>;
};

type Props = {
  children: React.ReactNode;
};

const CommentFocusContext = createContext<CommentFocusContextType | null>(null);

const focusTextareaRef = (textareaRef: MutableRefObject<HTMLTextAreaElement | null>) => {
  if (!textareaRef.current) return;

  textareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  textareaRef.current.focus();
};

const initTextareaRef = (textareaRef: MutableRefObject<HTMLTextAreaElement | null>) => {
  textareaRef.current = null;
};

export const CommentFocusProvider = ({ children }: Props) => {
  const [isFocusComment, setIsFocusComment] = useState<boolean>(false);
  const commentTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recommentTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const editCommentTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const openCommentTextarea = () => {
    focusTextareaRef(commentTextareaRef);

    setIsFocusComment(true);
  };

  const closeCommentTextarea = () => {
    setIsFocusComment(false);
  };

  const focusRecommentTextarea = () => {
    focusTextareaRef(recommentTextareaRef);
  };

  const initRecommentTextareaRef = () => {
    initTextareaRef(recommentTextareaRef);
  };

  const focusEditCommentTextarea = () => {
    focusTextareaRef(editCommentTextareaRef);
  };

  const initEditCommentTextarea = () => {
    initTextareaRef(editCommentTextareaRef);
  };

  return (
    <CommentFocusContext.Provider
      value={{
        isFocusComment,
        openCommentTextarea,
        focusRecommentTextarea,
        closeCommentTextarea,
        initRecommentTextareaRef,
        focusEditCommentTextarea,
        initEditCommentTextarea,
        commentTextareaRef,
        recommentTextareaRef,
        editCommentTextareaRef,
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

export const useFocusEditCommentTextareaContext = () => {
  const context = useContext(CommentFocusContext);
  if (context === null) {
    throw new Error('useFocusComment 은 CommentFocusProvider 내부에서 호출해주세요.');
  }
  const { focusEditCommentTextarea, initEditCommentTextarea, editCommentTextareaRef } = context;
  return { focusEditCommentTextarea, initEditCommentTextarea, editCommentTextareaRef };
};
