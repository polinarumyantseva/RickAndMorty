import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { useAuth } from '../../context';
import { Logo } from '../Logo/Logo';
import styles from './header.module.scss';

export const Header = () => {
	const [opened, { open, close }] = useDisclosure(false);
	const navigate = useNavigate();
	const auth = useAuth();

	const handleSignOut = () => {
		auth?.signout(() => {
			navigate('/');
		});
	};

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
						<Button onClick={open} variant='outline' color='yellow'>
							Sign out
						</Button>
					)}
				</div>
			</div>

			<Modal opened={opened} onClose={close} title='Are you sure you want to sign out?'>
				<div className={styles['button-container']}>
					<Button onClick={close} variant='outline' color='yellow'>
						No
					</Button>
					<Button onClick={handleSignOut} variant='filled' color='yellow'>
						Yes
					</Button>
				</div>
			</Modal>
		</>
	);
};
