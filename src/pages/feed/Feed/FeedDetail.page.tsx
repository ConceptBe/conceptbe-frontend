import { Handler_logo, Handler_back } from './FeedDetail.style';
import HeaderLogo from '../../../assets/images/header_logo.png';
import { ReactComponent as Back } from '../../../assets/svg/back_24.svg';
import { Header } from '../../../components/Header/Header';

const FeedDetailPage = () => {
  return (
    <>
      <Header main>
        <Back />

        <Handler_logo src={HeaderLogo} />
      </Header>
      Feed.page
      <div>tstestets</div>
      {Array(100)
        .fill(100)
        .map((arr) => {
          return <div>{arr}</div>;
        })}
    </>
  );
};

export default FeedDetailPage;
