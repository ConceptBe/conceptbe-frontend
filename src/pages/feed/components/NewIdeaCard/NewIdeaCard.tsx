import styled from '@emotion/styled';
import { theme } from 'concept-be-design-system';
import { PropsWithChildren, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Content from './compound/Content';
import Footer from './compound/Footer';
import Profile from './compound/Profile';

interface NewIdeaCardContext {
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

export const newIdeaCardContext = createContext<NewIdeaCardContext | null>(null);

export interface Props extends NewIdeaCardContext {
  id: number;
}

const NewIdeaCard = ({ id, profile, content, footer, children }: PropsWithChildren<Props>) => {
  const navigate = useNavigate();

  return (
    <newIdeaCardContext.Provider value={{ profile, content, footer }}>
      <CardContainer onClick={() => navigate(`/feed/${id}`)}>{children}</CardContainer>
    </newIdeaCardContext.Provider>
  );
};

NewIdeaCard.Profile = Profile;
NewIdeaCard.Content = Content;
NewIdeaCard.Footer = Footer;

export default NewIdeaCard;

export const CardContainer = styled.div`
  padding: 30px 20px;
  border-radius: 8px;
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.08);
  background-color: ${theme.color.w1};
  cursor: pointer;
`;
