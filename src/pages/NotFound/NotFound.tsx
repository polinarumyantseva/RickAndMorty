import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate('/');
		}, 3000);
	}, []);

	return <h1 className='text-center'>Page not found</h1>;
};
