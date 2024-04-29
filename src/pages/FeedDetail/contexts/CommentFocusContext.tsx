import { useContext, useState, createContext, MutableRefObject, useRef, ReactNode } from 'react';

interface CommentFocusContextType {
  isFocusComment: boolean;
  openCommentTextarea: () => void;
  closeCommentTextarea: () => void;
  focusRecommentTextarea: () => void;
  initRecommentTextarea: () => void;
  focusEditCommentTextarea: () => void;
  initEditCommentTextarea: () => void;
  commentTextareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  recommentTextareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  editCommentTextareaRef: MutableRefObject<HTMLTextAreaElement | null>;
}

interface Props {
  children: ReactNode;
}

interface FocusUsingKeyboardHeightProps {
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
}

const CommentFocusContext = createContext<CommentFocusContextType | null>(null);

const focusUsingKeyboardHeight = ({ textareaRef }: FocusUsingKeyboardHeightProps) => {
  if (!textareaRef.current) return;

  textareaRef.current.focus();
};

const resetTextareaFocus = (textareaRef: MutableRefObject<HTMLTextAreaElement | null>) => {
  textareaRef.current = null;
};

export const CommentFocusProvider = ({ children }: Props) => {
  const [isFocusComment, setIsFocusComment] = useState<boolean>(false);
  const commentTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recommentTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const editCommentTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  /* --- 댓글 입력창 포커싱 및 초기화 --- */
  const openCommentTextarea = () => {
    setIsFocusComment(true);

    focusUsingKeyboardHeight({
      textareaRef: commentTextareaRef,
    });
    return;
  };

  const closeCommentTextarea = () => {
    setIsFocusComment(false);
  };

  /* --- 대댓글 입력창 포커싱 및 초기화 --- */
  const focusRecommentTextarea = () => {
    focusUsingKeyboardHeight({
      textareaRef: recommentTextareaRef,
    });
  };

  const initRecommentTextarea = () => {
    resetTextareaFocus(recommentTextareaRef);
  };

  /* --- 댓글 및 대댓글 수정 입력창 포커싱 및 초기화 --- */
  const focusEditCommentTextarea = () => {
    focusUsingKeyboardHeight({
      textareaRef: editCommentTextareaRef,
    });
  };

  const initEditCommentTextarea = () => {
    resetTextareaFocus(editCommentTextareaRef);
  };

  return (
    <CommentFocusContext.Provider
      value={{
        isFocusComment,
        openCommentTextarea,
        closeCommentTextarea,
        focusRecommentTextarea,
        initRecommentTextarea,
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
  const { focusRecommentTextarea, initRecommentTextarea, recommentTextareaRef } = context;
  return { focusRecommentTextarea, initRecommentTextarea, recommentTextareaRef };
};

export const useFocusEditCommentTextareaContext = () => {
  const context = useContext(CommentFocusContext);
  if (context === null) {
    throw new Error('useFocusComment 은 CommentFocusProvider 내부에서 호출해주세요.');
  }
  const { focusEditCommentTextarea, initEditCommentTextarea, editCommentTextareaRef } = context;
  return { focusEditCommentTextarea, initEditCommentTextarea, editCommentTextareaRef };
};
