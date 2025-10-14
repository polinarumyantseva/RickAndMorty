import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import styles from './layout.module.scss';

export const Layout = () => {
	return (
		<div className={styles.layout}>
			<Header />
			<div className={styles.content}>
				<ErrorBoundary>
					<Outlet />
				</ErrorBoundary>
			</div>
		</div>
	);
};
