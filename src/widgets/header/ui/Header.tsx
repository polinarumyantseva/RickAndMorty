import { NavLink } from 'react-router-dom';
import { Button } from '@mantine/core';
import { useAuth } from '@/app/Providers/AuthProvider';
import { Signout } from '@/features/signout';
import { Logo } from '@/entities/logo';
import { ColorSchemeToggle } from '@/features/colorSchemeToggle';
import styles from './header.module.scss';

export const Header = () => {
	const auth = useAuth();
	return (
		<>
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
				<div className={styles['button-container']}>
					<ColorSchemeToggle />

					{auth?.user === null ? (
						<NavLink to='/login'>
							<Button variant='filled' color='yellow'>
								Sign in
							</Button>
						</NavLink>
					) : (
						<Signout />
					)}
				</div>
			</div>
		</>
	);
};
