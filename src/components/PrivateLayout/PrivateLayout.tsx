import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

interface PrivateLayoutProps {
	children?: React.ReactNode;
}

export const PrivateLayout = ({ children }: PrivateLayoutProps) => {
	const auth = useAuth();
	const location = useLocation();

	if (auth?.user === null) {
		return <Navigate to='/login' state={{ from: location.pathname }} replace />;
	}

	return <ErrorBoundary>{children ? <>{children}</> : <Outlet />}</ErrorBoundary>;
};
