import { ErrorProps } from 'next/error';
import React, { Component, PropsWithChildren } from 'react';
export declare type WiredErrorBoundaryProps = PropsWithChildren<{
    ErrorComponent?: React.ComponentType<ErrorProps>;
}>;
interface WiredErrorBoundaryState {
    hasError: boolean;
}
export declare class WiredErrorBoundary extends Component<WiredErrorBoundaryProps, WiredErrorBoundaryState> {
    static getDerivedStateFromError(): WiredErrorBoundaryState;
    state: {
        hasError: boolean;
    };
    render(): React.ReactNode;
}
export {};
