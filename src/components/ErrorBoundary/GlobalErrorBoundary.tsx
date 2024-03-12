import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Component, ReactNode } from 'react';

import ErrorFallback from './ErrorFallback';

interface Props {
  children: ReactNode;
  onResetQuery: () => void;
}

interface State {
  error: null | unknown;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.initErrorBoundaryState();
  }

  initErrorBoundaryState() {
    return {
      error: null,
    };
  }

  resetErrorBoundary() {
    this.props.onResetQuery();
    this.setState(this.initErrorBoundaryState());
  }

  static getDerivedStateFromError(error: unknown): State {
    return {
      error,
    };
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <ErrorFallback title="알 수 없는 오류가 발생했습니다." resetErrorBoundary={() => this.resetErrorBoundary()}>
        지금 이 서비스와 연결할 수 없습니다. <br />
        문제를 해결하기 위해 열심히 노력하고 있습니다. <br /> 잠시 후 다시 확인해주세요.
      </ErrorFallback>
    );
  }
}

export default function GlobalErrorBoundary({ children }: Omit<Props, 'onResetQuery'>) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => <ErrorBoundary onResetQuery={reset}>{children}</ErrorBoundary>}
    </QueryErrorResetBoundary>
  );
}
