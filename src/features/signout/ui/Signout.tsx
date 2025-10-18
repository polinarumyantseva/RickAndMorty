import { useNavigate } from 'react-router-dom';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuth } from '@/app/Providers/AuthProvider';
import styles from './signout.module.scss';

export const Signout = () => {
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
			<Button onClick={open} variant='outline' color='yellow'>
				Sign out
			</Button>
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
