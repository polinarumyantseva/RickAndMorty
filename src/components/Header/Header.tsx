import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import styles from './header.module.scss';

export const Header = () => {
	return (
		<div className={styles.header}>
			<NavLink to='/'>
				<img src={logo} alt='logo' className={styles.logo} />
			</NavLink>

			<ul className={styles['nav']}>
				<li className={styles['nav-item']}>
					<NavLink className={styles['nav-link']} to='/characters'>
						Characters
					</NavLink>
				</li>
				<li className={styles['nav-item']}>
					<NavLink className={styles['nav-link']} to='/locations'>
						Locations
					</NavLink>
				</li>
				<li className={styles['nav-item']}>
					<NavLink className={styles['nav-link']} to='/episodes'>
						Episodes
					</NavLink>
				</li>
			</ul>
		</div>
	);
};
