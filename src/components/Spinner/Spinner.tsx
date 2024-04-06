import styled from '@emotion/styled';

type Props = {
  backdrop?: boolean;
};

const Spinner = ({ backdrop = false }: Props) => (
  <>
    {backdrop && <Backdrop />}
    <Position>
      <SpinnerContainer />
    </Position>
  </>
);

export default Spinner;

const Position = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SpinnerContainer = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: spin 900ms linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
`;
