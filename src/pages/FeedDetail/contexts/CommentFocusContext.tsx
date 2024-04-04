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

interface FocusUsingKeyboardHeightProps {
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  mobileViewRef: MutableRefObject<HTMLElement | null>;
  keyboardCurrent: number;
  isComment?: boolean;
}

const CommentFocusContext = createContext<CommentFocusContextType | null>(null);

const isIphone = /ip/i.test(navigator.userAgent.toLowerCase());
const INIT_KEYBOARD_HEIGHT = 280;
const FOCUSING_DIFFERENCE = 1.4;

const focusUsingKeyboardHeight = ({
  textareaRef,
  mobileViewRef,
  keyboardCurrent,
  isComment,
}: FocusUsingKeyboardHeightProps) => {
  if (!textareaRef.current || !mobileViewRef.current) return;

  const textareaRefCurrent = textareaRef.current;
  const mobileViewRefCurrent = mobileViewRef.current;
  const textareaRect = textareaRefCurrent.getBoundingClientRect();
  const innerHeight = window.innerHeight;
  const keyboardHeight = keyboardCurrent || INIT_KEYBOARD_HEIGHT;
  const elementAbsolutePosition = mobileViewRefCurrent.scrollTop + textareaRect.top;

  textareaRefCurrent.focus();

  // focus() 동작 완료 이후 포커싱 로직 동작토록 의도적으로 비동기 상황으로 수행
  const timerId = setTimeout(() => {
    clearTimeout(timerId);

    // 가상 키보드 내에 댓글 및 답글 입력창이 가려질 가능성이 있는 경우에만 포커싱 로직 동작
    if (innerHeight - textareaRect.top >= keyboardHeight) return;

    // 댓글 입력창 및 IOS 디바이스는 아래 포커싱 로직으로 동작
    if (isIphone && isComment) {
      mobileViewRefCurrent.scroll({
        top: elementAbsolutePosition - innerHeight + keyboardHeight * FOCUSING_DIFFERENCE,
        behavior: 'smooth',
      });
      return;
    }

    // 답글 입력창 및 IOS 외 모든 디바이스는 아래 포커싱 로직으로 동작
    textareaRefCurrent.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, 0);
};

const resetTextareaFocus = (textareaRef: MutableRefObject<HTMLTextAreaElement | null>) => {
  textareaRef.current = null;
};

export const CommentFocusProvider = ({ children }: Props) => {
  const { mobileViewRef, keyboardHeightRef } = useMobileViewRefContext();
  const [isFocusComment, setIsFocusComment] = useState<boolean>(false);
  const commentTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recommentTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const editCommentTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  /* --- 댓글 입력창 포커싱 및 초기화 --- */
  const openCommentTextarea = () => {
    setIsFocusComment(true);

    focusUsingKeyboardHeight({
      textareaRef: commentTextareaRef,
      mobileViewRef,
      keyboardCurrent: keyboardHeightRef.current,
      isComment: true,
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
      mobileViewRef,
      keyboardCurrent: keyboardHeightRef.current,
      isComment: false,
    });
  };

  const initRecommentTextarea = () => {
    resetTextareaFocus(recommentTextareaRef);
  };

  /* --- 댓글 및 대댓글 수정 입력창 포커싱 및 초기화 --- */
  const focusEditCommentTextarea = () => {
    focusUsingKeyboardHeight({
      textareaRef: editCommentTextareaRef,
      mobileViewRef,
      keyboardCurrent: keyboardHeightRef.current,
      isComment: false,
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
