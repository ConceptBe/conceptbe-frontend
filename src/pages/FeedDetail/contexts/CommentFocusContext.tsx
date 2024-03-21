import { useContext, useState, createContext, MutableRefObject, useRef, ReactNode } from 'react';

import { useMobileViewRefContext } from '../../../layouts/contexts/MobileViewContext';

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

interface FocusTextareaRefProps {
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  mobileViewRef: MutableRefObject<HTMLElement | null>;
}

const CommentFocusContext = createContext<CommentFocusContextType | null>(null);
const RATIO = window.innerHeight / window.innerWidth;

const focusTextareaRef = ({ textareaRef, mobileViewRef }: FocusTextareaRefProps) => {
  if (!textareaRef.current) return;

  textareaRef.current.focus();

  if (!mobileViewRef.current || !window.visualViewport) return;

  const textareaRect = textareaRef.current.getBoundingClientRect();
  const mobileViewHeight = mobileViewRef.current.getBoundingClientRect().height;
  const currentRatioDiff = window.innerHeight / window.innerWidth - RATIO;
  const keyboardHeight = window.innerHeight * currentRatioDiff;

  console.log(keyboardHeight);
  console.log(currentRatioDiff > 0 && mobileViewHeight - textareaRect.y < keyboardHeight);

  if (currentRatioDiff > 0 && mobileViewHeight - textareaRect.y < keyboardHeight) {
    textareaRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
};

const initTextareaRef = (textareaRef: MutableRefObject<HTMLTextAreaElement | null>) => {
  textareaRef.current = null;
};

export const CommentFocusProvider = ({ children }: Props) => {
  const mobileViewRef = useMobileViewRefContext();
  const [isFocusComment, setIsFocusComment] = useState<boolean>(false);
  const commentTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recommentTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const editCommentTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const openCommentTextarea = () => {
    focusTextareaRef({ textareaRef: commentTextareaRef, mobileViewRef });

    setIsFocusComment(true);
  };

  const closeCommentTextarea = () => {
    setIsFocusComment(false);
  };

  const focusRecommentTextarea = () => {
    focusTextareaRef({ textareaRef: recommentTextareaRef, mobileViewRef });
  };

  const initRecommentTextarea = () => {
    initTextareaRef(recommentTextareaRef);
  };

  const focusEditCommentTextarea = () => {
    focusTextareaRef({ textareaRef: editCommentTextareaRef, mobileViewRef });
  };

  const initEditCommentTextarea = () => {
    initTextareaRef(editCommentTextareaRef);
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
