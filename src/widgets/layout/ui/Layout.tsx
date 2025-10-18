import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from '@/shared/ui';
import { Header } from '@/widgets/header';
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
