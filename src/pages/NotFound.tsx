import ErrorFallback from '../components/ErrorBoundary/ErrorFallback';

const NotFound = () => {
  return (
    <ErrorFallback title="페이지를 찾을 수 없습니다." resetErrorBoundary={() => {}}>
      지금 입력하신 주소의 페이지는 <br /> 사라졌거나 다른페이지로 변경되었습니다. <br /> 주소를 다시 확인해주세요.
    </ErrorFallback>
  );
};

export default NotFound;
