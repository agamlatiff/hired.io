"use client";

import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
          <div className="glass-panel p-8 rounded-2xl text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-red-500 text-3xl">
                error
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: undefined });
                window.location.reload();
              }}
              className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold px-6 py-2.5 rounded-full transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Generic error display component
export function ErrorDisplay({
  title = "Error",
  message = "Something went wrong. Please try again.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="glass-panel p-8 rounded-2xl text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-red-500 text-3xl">
            error
          </span>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-400 text-sm mb-6">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold px-6 py-2.5 rounded-full transition-all"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

// Empty state display component
export function EmptyState({
  icon = "inbox",
  title = "No data",
  message = "There's nothing here yet.",
  action,
  actionLabel,
}: {
  icon?: string;
  title?: string;
  message?: string;
  action?: () => void;
  actionLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
        <span className="material-symbols-outlined text-gray-500 text-4xl">
          {icon}
        </span>
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-6 max-w-md">{message}</p>
      {action && actionLabel && (
        <button
          onClick={action}
          className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold px-6 py-2.5 rounded-full transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
