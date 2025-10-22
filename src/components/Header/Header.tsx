import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { Button } from '../Button/Button';
import { Logo } from '../Logo/Logo';
import styles from './header.module.scss';

export const Header = () => {
	const navigate = useNavigate();
	const auth = useAuth();

	const handleSignOut = () => {
		auth?.signout(() => {
			navigate('/');
		});
	};

	return (
		<div className={styles.header}>
			<Logo />

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
			{auth?.user === null ? (
				<NavLink to='/login'>
					<Button buttonType='primary'>Sign in</Button>
				</NavLink>
			) : (
				<Button onClick={handleSignOut} buttonType='secondary'>
					Sign out
				</Button>
			)}
		</div>
	);
};
