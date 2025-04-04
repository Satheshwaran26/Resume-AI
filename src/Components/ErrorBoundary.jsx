import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
    
    // Log to console for debugging
    console.error('React Error Details:', { error, errorInfo });
  }

  handleReload = () => {
    // Clear error state and reload page
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  }

  handleGoHome = () => {
    // Clear error state and navigate to home
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 max-w-lg bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-6">We're sorry, but there was an error loading this page.</p>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={this.handleReload}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Reload Page
              </button>
              <button
                onClick={this.handleGoHome}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Go to Homepage
              </button>
            </div>
            
            {/* Show error details in development mode */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-8 text-left p-4 bg-gray-100 rounded-md overflow-auto text-sm">
                <p className="font-medium text-red-600">{this.state.error.toString()}</p>
                <pre className="mt-2 text-gray-700">
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;