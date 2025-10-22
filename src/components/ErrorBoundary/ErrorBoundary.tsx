import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
		};
	}
	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		console.log('error', error.message);
		return {
			hasError: true,
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error('ErrorBoundary:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <p className='text-center'>Что-то пошло не так</p>;
		}

		return this.props.children;
	}
}
