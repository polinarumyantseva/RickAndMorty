import type { ChangeEvent, ReactNode } from 'react';
import styles from './input.module.scss';

type InputTypes = 'text' | 'radio' | 'checkbox' | 'email' | 'password';
type SizeTypes = 'small' | 'medium' | 'large';
type VariantTypes = 'default' | 'filled' | 'unstyled';
type InputRadiusTypes = 'default' | 'rounded' | 'square';

interface InputProps {
	label?: string;
	description?: string;
	error?: string;
	name: string;
	inputType?: InputTypes;
	placeholder?: string;
	icon?: ReactNode;
	required?: boolean;
	value?: string;
	size?: SizeTypes;
	inputVariant?: VariantTypes;
	inputRadius?: InputRadiusTypes;
	options?: { value: string; label: string }[];
	onChange?: (value: string) => void;
}

export const Input = ({
	label,
	description,
	error,
	name,
	inputType = 'text',
	placeholder,
	icon,
	required = false,
	value,
	size = 'medium',
	inputVariant = 'default',
	inputRadius = 'default',
	options,
	onChange,
}: InputProps) => {
	const labelClassName = required ? `${styles.label} ${styles[`required`]}` : styles.label;
	const inputComponentClassName = `${styles['input-container']} ${size}`;
	const inputClassName = icon
		? `${styles.input} ${inputVariant} ${inputRadius} ${styles['input-with-icon']}`
		: `${styles.input} ${inputVariant} ${inputRadius}`;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	};

	return (
		<div className={inputComponentClassName}>
			{label && <label className={labelClassName}>{label}</label>}
			{description && <p className={styles['input-description']}>{description}</p>}
			{options && (inputType === 'radio' || inputType === 'checkbox') ? (
				<div className='radio-group'>
					{options.map((option) => (
						<label key={option.value} className='radio-label'>
							<input
								type={inputType}
								name={name}
								value={option.value}
								checked={value === option.value}
								onChange={handleChange}
							/>
							{option.label}
						</label>
					))}
				</div>
			) : (
				<div className={styles['input-block']}>
					<input
						className={inputClassName}
						type={inputType}
						name={name}
						placeholder={placeholder}
						value={value}
						onChange={handleChange}
					/>
					{icon && <span className={styles['input-icon']}>{icon}</span>}
				</div>
			)}

			{error && <p className={styles['input-error']}>{error}</p>}
		</div>
	);
};
