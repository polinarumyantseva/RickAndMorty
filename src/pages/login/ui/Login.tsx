import { Logo } from '@/entities/logo';
import { Signin } from '@/features/signin';
import styles from './login.module.scss';

export const Login = () => {
	return (
		<div className={styles['form-wrapper']}>
			<Logo />
			<div className={styles['form-inner']}>
				<h1>Login</h1>
				<Signin />
			</div>
		</div>
	);
};
