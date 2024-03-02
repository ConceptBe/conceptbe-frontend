import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  description: string;
}

const HelmetMeta = ({ title, description }: Props) => {
  return (
    <Helmet>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

export default HelmetMeta;
