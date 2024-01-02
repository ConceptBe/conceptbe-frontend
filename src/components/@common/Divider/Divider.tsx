import { Wrapper } from './Divider.style';
import { ColorKeyType } from '../../../styles/theme';

interface Props {
  top?: number;
  bottom?: number;
  color?: ColorKeyType;
  height?: number;
}

const Divider = ({ top = 0, bottom = 0, color = 'b', height = 1 }: Props) => {
  return <Wrapper top={top} bottom={bottom} divideColor={color} height={height} />;
};

export default Divider;
