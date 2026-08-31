import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Unhandled error in component tree:", error, errorInfo.componentStack);
  }

  render(): ReactNode {
    const { error } = this.state;

    if (error) {
      return (
        <div className="mt-20 text-center">
          <h1 className="primary-header title">Something went wrong</h1>
          <p className="primary-nav mt-5">
            The page could not be displayed. Please reload and try again.
          </p>
          <button
            className="btn-primary text-black bg-white mt-5"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
