import { Component, ErrorInfo, ReactNode } from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };
  
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#121212] p-6">
          <div className="text-center max-w-md">
            <h1 className="text-6xl font-[Baskervville] text-[#E9C672] mb-4">
              Oops!
            </h1>
            <h2 className="text-2xl font-[Baskervville] text-white mb-6">
              Something went wrong
            </h2>
            <p className="text-gray-400 font-[Darker Grotesque] text-lg mb-8 leading-relaxed">
              We're sorry for the inconvenience. Please try refreshing the page or contact us if the problem persists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-[#E9C672] text-[#121212] font-[Darker Grotesque] font-semibold rounded-lg hover:bg-[#B097BE] transition-colors"
              >
                Refresh Page
              </button>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#E9C672] text-[#E9C672] font-[Darker Grotesque] font-semibold rounded-lg hover:bg-[#E9C672]/10 transition-colors"
              >
                <Home size={20} />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;


