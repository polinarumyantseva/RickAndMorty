import { useEffect } from 'react';

export const useServiceWorker = () => {
	useEffect(() => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker
				.register('/sw.js')
				.then((reg) => console.log('registered', reg))
				.catch((err) => console.log(err));
		}
	}, []);
};
