import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LocationProps } from '../modal/locations';
import { useAxios } from '@/shared/hooks';
import styles from './locationList.module.scss';

export const LocationList = () => {
	const [pageNumber, setPageNumber] = useState<number>(1);
	const { data, isLoading, error, hasMore } = useAxios('https://rickandmortyapi.com/api/location', pageNumber);
	const locations = data as LocationProps[];

	const observer = useRef<IntersectionObserver>(null);
	const lastNodeRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (isLoading) return;

			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber((pageNumber) => pageNumber + 1);
				}
			});

			if (node) {
				observer.current.observe(node);
			}
		},
		[isLoading, hasMore]
	);

	return (
		<>
			<h1 className='text-center'>Locations</h1>
			<div className={styles['card-list']}>
				{locations.map((location, index) => (
					<div
						ref={locations.length - 10 === index + 1 ? lastNodeRef : undefined}
						className={styles['card-item']}
						key={location.id}
					>
						<Link to={`/locations/${location.id}`}>
							<p className={styles['card-item-name']}>{location.name}</p>
						</Link>
					</div>
				))}
			</div>
			{isLoading && <div className={styles['loading']}>Loading...</div>}
			{error && <div className={styles['error']}>Error</div>}
		</>
	);
};
