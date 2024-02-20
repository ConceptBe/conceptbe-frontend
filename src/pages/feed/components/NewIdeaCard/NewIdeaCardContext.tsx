import { createContext, useContext } from 'react';

export interface NewIdeaCardContextType {
  id: number;
  profile?: {
    nickname: string;
    skills: string[];
    isBookmarked: boolean;
    createdAt: Date;
  };
  content: {
    branches: string[];
    title: string;
    introduce: string;
    teamRecruitments: string[];
  };
  footer: {
    hitsCount: number;
    commentsCount: number;
    likesCount: number;
    bookmarksCount: number;
  };
}

export const NewIdeaCardContext = createContext<NewIdeaCardContextType | null>(null);

const useNewIdeaCardContext = () => {
  const context = useContext(NewIdeaCardContext);
  if (!context) {
    throw new Error('NewIdeaCard 컴포넌트 내부에서만 사용 가능합니다.');
  }

  return context;
};

export const useIdeaId = () => {
  const context = useNewIdeaCardContext();
  const { id } = context;

  return id;
};

export const useProfileContext = () => {
  const context = useNewIdeaCardContext();
  const { profile } = context;

  if (!profile) {
    throw new Error('NewIdeaCard 컴포넌트 prop에 profile이 필요합니다.');
  }

  return profile;
};

export const useContentContext = () => {
  const context = useNewIdeaCardContext();
  const { content } = context;

  return content;
};

export const useFooterContext = () => {
  const context = useNewIdeaCardContext();
  const { footer } = context;

  return footer;
};
