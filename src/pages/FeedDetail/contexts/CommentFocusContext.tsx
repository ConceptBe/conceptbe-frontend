import { useContext, useState, createContext, MutableRefObject, useRef } from 'react';

import { useMobileViewRefContext } from '../../../layouts/contexts/MobileViewContext';

type CommentFocusContextType = {
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
};

type Props = {
  children: React.ReactNode;
};

type FocusTextareaRefProps = {
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  mobileViewRef: MutableRefObject<HTMLDivElement | null>;
  isInComment: boolean;
};

const COMMENT_DIFF = 58;
const RECOMMENT_DIFF = 108;

const CommentFocusContext = createContext<CommentFocusContextType | null>(null);

const focusTextareaRef = ({ textareaRef, mobileViewRef, isInComment }: FocusTextareaRefProps) => {
  if (!textareaRef.current || !mobileViewRef.current) return;

  textareaRef.current.focus();

  const textareaRect = textareaRef.current.getBoundingClientRect();
  const difference = isInComment ? RECOMMENT_DIFF : COMMENT_DIFF;

  console.log(mobileViewRef.current.scrollTop + textareaRect.top - difference);

  mobileViewRef.current.scroll({
    top: mobileViewRef.current.scrollTop + textareaRect.top - difference,
    behavior: 'smooth',
  });
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
    focusTextareaRef({ textareaRef: commentTextareaRef, mobileViewRef, isInComment: false });

    setIsFocusComment(true);
  };

  const closeCommentTextarea = () => {
    setIsFocusComment(false);
  };

  const focusRecommentTextarea = () => {
    focusTextareaRef({ textareaRef: recommentTextareaRef, mobileViewRef, isInComment: true });
  };

  const initRecommentTextarea = () => {
    initTextareaRef(recommentTextareaRef);
  };

  const focusEditCommentTextarea = () => {
    focusTextareaRef({ textareaRef: editCommentTextareaRef, mobileViewRef, isInComment: true });
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
