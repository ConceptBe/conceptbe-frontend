import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  description: string;
}

const SEOMeta = ({ title, description }: Props) => {
  return (
    <Helmet>
      <title>{title}</title>
      {/* TODO: SEO Meta Dynamic 적용이 불가한 오류로 인해 아래 태그가 중복되는 걸 방지합니다. */}
      {/* <meta property="og:title" content={title} />
      <meta property="og:description" content={description} /> */}
    </Helmet>
  );
};

export default SEOMeta;
