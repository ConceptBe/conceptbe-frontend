import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Component, ReactElement, ReactNode } from 'react';

import ErrorFallback from './ErrorFallback';

interface FallbackProps {
  error: null | unknown | AxiosError;
  resetErrorBoundary: () => void;
}

interface Props {
  children: ReactNode;
  onResetQuery: () => void;
  fallback?: ReactElement<FallbackProps>;
}

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
      errorDetail: 'network';
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

      if (error.response?.status >= 400) {
        return {
          error,
          errorDetail: 'network',
        };
      }
    }

    return {
      error,
      errorDetail: null,
    };
  }

  render() {
    if (!this.state.error && !this.state.errorDetail) {
      return this.props.children;
    }

    if (this.state.errorDetail === 'network') {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback.type;
        const fallbackProps = {
          error: this.state.error,
          onResetQuery: () => this.resetErrorBoundary(),
        };
        return <FallbackComponent {...fallbackProps} />;
      }

      return (
        <ErrorFallback title="일시적인 오류입니다." onClickRetry={() => this.resetErrorBoundary()}>
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
