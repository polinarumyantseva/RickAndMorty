import { useLocation, useNavigate } from 'react-router-dom';
import { Button, TextInput } from '@mantine/core';
import '@mantine/core/styles/Input.css';
import { useForm } from '@mantine/form';
import { Logo } from '../../components';
import type { UserProps } from '../../types';
import { useAuth } from '../../context';
import styles from './signin.module.scss';

export const Signin = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const auth = useAuth();

	const form = useForm<UserProps>({
		mode: 'uncontrolled',
		initialValues: {
			email: '',
			password: '',
		},

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
		},
	});

	const handleSubmit = (values: typeof form.values) => {
		auth?.signin(values, () => {
			navigate(location.state?.from || '/', {
				replace: true,
			});
		});
	};

	return (
		<div className={styles['form-wrapper']}>
			<Logo />
			<div className={styles['form-inner']}>
				<h1>Login</h1>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput
						classNames={{
							root: styles['input-container'],
							input: styles.input,
							label: styles.label,
						}}
						size='md'
						withAsterisk
						label='Email'
						placeholder='your@email.com'
						key={form.key('email')}
						{...form.getInputProps('email')}
					/>
					<TextInput
						classNames={{
							root: styles['input-container'],
							input: styles.input,
							label: styles.label,
						}}
						size='md'
						type='password'
						withAsterisk
						label='Password'
						placeholder='Password'
						key={form.key('password')}
						{...form.getInputProps('password')}
					/>

					<Button type='submit' variant='filled' size='md' color='yellow'>
						Войти
					</Button>
				</form>
			</div>
		</div>
	);
};
