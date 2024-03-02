import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  description: string;
}

const HelmetMeta = ({
  title = '컨셉비 - 당신의 상상이 현실로!',
  description = '자유롭고 안전한 아이디어 공유의 장',
}: Props) => {
  return (
    <Helmet>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

export default HelmetMeta;
