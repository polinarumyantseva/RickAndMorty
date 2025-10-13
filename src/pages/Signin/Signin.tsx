import { useRef, useState, type FormEvent } from 'react';
import { Button, Input, Logo } from '../../components';
import type { UserProps } from '../../types';
import { useAuth } from '../../context';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './signin.module.scss';

export const Signin = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const auth = useAuth();
	const formRef = useRef<HTMLFormElement>(null);
	const [formData, setFormData] = useState<UserProps>({
		email: '',
		password: '',
	});

	const handleInputChange = (name: keyof UserProps) => {
		return (value: string) => {
			setFormData((prevState) => {
				return {
					...prevState,
					[name]: value,
				};
			});
		};
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		auth?.signin(formData, () => {
			navigate(location.state?.from || '/', {
				replace: true,
			});
		});
		formRef.current?.reset();
	};

	const handleReset = () => {
		setFormData({
			email: '',
			password: '',
		});
	};

	return (
		<div className={styles['form-wrapper']}>
			<Logo />
			<div className={styles['form-inner']}>
				<h1>Login</h1>
				<form onSubmit={handleSubmit} onReset={handleReset} ref={formRef}>
					<Input
						label='Email'
						description='Пример: test@test.ru'
						inputType='email'
						name='email'
						placeholder='Введите email'
						required
						value={formData.email}
						onChange={handleInputChange('email')}
					/>
					<Input
						label='Пароль'
						inputType='password'
						required
						name='password'
						placeholder='Введите пароль'
						value={formData.password}
						onChange={handleInputChange('password')}
					/>
					<div className={styles['buttons-container']}>
						<Button type='submit' buttonType='primary'>
							Войти
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
