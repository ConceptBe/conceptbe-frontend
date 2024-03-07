import { AxiosError } from 'axios';
import { Component, ReactNode } from 'react';

import ErrorFallback from './ErrorFallback';

interface Props {
  children: ReactNode;
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

export default class ApiErrorBoundary extends Component<Props, State> {
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
      return (
        <ErrorFallback title="일시적인 오류입니다." onClickRetry={() => this.setState(this.initErrorBoundaryState())}>
          지금 이 서비스와 연결할 수 없습니다. <br />
          문제를 해결하기 위해 열심히 노력하고 있습니다. <br /> 잠시 후 다시 확인해주세요.
        </ErrorFallback>
      );
    }

    throw new Error('Unknown Error');
  }
}
