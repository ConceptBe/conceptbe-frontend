import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Component, ReactElement, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import ErrorFallback from './ErrorFallback';
import StayDuringRoutingAlert from './StayDuringRoutingAlert';

interface FallbackProps {
  error: AxiosError;
  resetErrorBoundary: () => void;
}

interface Props {
  children: ReactNode;
  onResetQuery: () => void;
  fallback?: ReactElement<FallbackProps>;
}

type AxiosErrorDetailType = 'auth-expired' | 'unauthorized' | 'not-found' | 'server';

type State =
  | {
      error: null;
      errorDetail: null;
    }
  | {
      error: unknown;
      errorDetail: null;
    }
  | {
      error: AxiosError;
      errorDetail: AxiosErrorDetailType;
    };

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.initErrorBoundaryState();
  }

  initErrorBoundaryState() {
    return {
      error: null,
      errorDetail: null,
    };
  }

  resetErrorBoundary() {
    this.props.onResetQuery();
    this.setState(this.initErrorBoundaryState());
  }

  static getDerivedStateFromError(error: unknown): State {
    if (error instanceof AxiosError) {
      if (!error.response) {
        return {
          error,
          errorDetail: null,
        };
      }

      if (error.response?.status === 404) {
        return {
          error,
          errorDetail: 'not-found',
        };
      }

      if (error.response?.status === 401) {
        if (!localStorage.getItem('userToken')) {
          return {
            error,
            errorDetail: 'unauthorized',
          };
        }

        return {
          error,
          errorDetail: 'auth-expired',
        };
      }

      if (error.response?.status >= 400) {
        return {
          error,
          errorDetail: 'server',
        };
      }
    }

    return {
      error,
      errorDetail: null,
    };
  }

  componentDidCatch(): void {
    const { errorDetail } = this.state;

    if (errorDetail === 'auth-expired') {
      localStorage.removeItem('userToken');
      localStorage.removeItem('user');

      return;
    }
  }

  render() {
    if (!this.state.error && !this.state.errorDetail) {
      return this.props.children;
    }

    if (this.state.errorDetail === 'not-found') {
      return (
        <>
          <StayDuringRoutingAlert content="삭제되었거나 존재하지 않는 페이지입니다." />
          <Navigate to="/" />;
        </>
      );
    }

    if (this.state.errorDetail === 'unauthorized') {
      return <Navigate to="/login" />;
    }

    if (this.state.errorDetail === 'auth-expired') {
      return (
        <>
          <StayDuringRoutingAlert content="인증 정보가 만료되었습니다. 다시 로그인해 주세요." />
          <Navigate to="/login" />
        </>
      );
    }

    if (this.state.errorDetail === 'server') {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback.type;
        const fallbackProps = {
          error: this.state.error,
          resetErrorBoundary: () => this.resetErrorBoundary(),
        };
        return <FallbackComponent {...fallbackProps} />;
      }

      return (
        <ErrorFallback
          title="일시적인 오류입니다."
          resetErrorBoundary={() => this.resetErrorBoundary()}
          isInApiErrorBoundary
        >
          지금 이 서비스와 연결할 수 없습니다. <br />
          문제를 해결하기 위해 열심히 노력하고 있습니다. <br /> 잠시 후 다시 확인해주세요.
        </ErrorFallback>
      );
    }

    throw new Error('Unknown Error');
  }
}

export default function ApiErrorBoundary({ children, fallback }: Omit<Props, 'onResetQuery'>) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onResetQuery={reset} fallback={fallback}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
