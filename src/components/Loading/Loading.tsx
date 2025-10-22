import type { ReactNode } from 'react';

interface LoadingProps {
	isLoading: boolean;
	children: ReactNode;
	fallback?: ReactNode;
}

export const Loading = ({ isLoading, children, fallback = <div>Loading...</div> }: LoadingProps) => {
	return isLoading ? <>{fallback}</> : <>{children}</>;
};
