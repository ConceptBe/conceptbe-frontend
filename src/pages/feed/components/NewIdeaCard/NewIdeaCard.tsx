import styled from '@emotion/styled';
import { theme } from 'concept-be-design-system';
import { PropsWithChildren, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Content from './compound/Content';
import Footer from './compound/Footer';
import Profile from './compound/Profile';
import { NewIdeaCardContextType, NewIdeaCardContext } from './NewIdeaCardContext';

export interface Props extends NewIdeaCardContextType {}

const NewIdeaCard = ({ id, profile, content, footer, children }: PropsWithChildren<Props>) => {
  const navigate = useNavigate();

  return (
    <NewIdeaCardContext.Provider value={{ id, profile, content, footer }}>
      <CardContainer onClick={() => navigate(`/feed/${id}`)}>{children}</CardContainer>
    </NewIdeaCardContext.Provider>
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
