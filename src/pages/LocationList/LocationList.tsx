import { Link } from 'react-router-dom';
import locationData from '../../data/location.json';
import type { LocationShortProps } from '../../types';
import styles from './locationList.module.scss';

export const LocationList = () => {
	const locations: LocationShortProps[] = locationData;

	return (
		<>
			<h1 className='text-center'>Locations</h1>
			<div className={styles['card-list']}>
				{locations.map((location) => (
					<div className={styles['card-item']} key={location.id}>
						<Link to={`/locations/${location.id}`}>
							<p className={styles['card-item-name']}>{location.name}</p>
						</Link>
					</div>
				))}
			</div>
		</>
	);
};
