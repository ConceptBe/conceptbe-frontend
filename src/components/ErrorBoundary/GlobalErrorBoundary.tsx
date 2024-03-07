import { Component, ReactNode } from 'react';

import ErrorFallback from './ErrorFallback';

interface Props {
  children: ReactNode;
}

interface State {
  error: null | unknown;
}

export default class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.initErrorBoundaryState();
  }

  initErrorBoundaryState() {
    return {
      error: null,
    };
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
      <ErrorFallback
        title="알 수 없는 오류가 발생했습니다."
        onClickRetry={() => this.setState(this.initErrorBoundaryState())}
        isGlobal
      >
        지금 이 서비스와 연결할 수 없습니다. <br />
        문제를 해결하기 위해 열심히 노력하고 있습니다. <br /> 잠시 후 다시 확인해주세요.
      </ErrorFallback>
    );
  }
}
