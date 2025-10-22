import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import styles from './logo.module.scss';

export const Logo = () => {
	return (
		<NavLink to='/'>
			<img src={logo} alt='logo' className={styles.logo} />
		</NavLink>
	);
};
