import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import styles from './layout.module.scss';

export const Layout = () => {
	return (
		<div className={styles.layout}>
			<Header />
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
};
