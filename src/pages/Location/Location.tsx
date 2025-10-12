import { Link, Navigate, useParams } from 'react-router-dom';
import locationData from '../../data/location.json';
import type { LocationProps } from '../../types';
import styles from './location.module.scss';

export const Location = () => {
	const { id } = useParams();
	const location: LocationProps[] = locationData.filter((item) => item.id === Number(id));
	const locationItem: LocationProps = location[0];

	if (!id || !location.length) {
		return <Navigate to='/404' replace />;
	}

	return (
		<div className={styles['character']}>
			<h1>{locationItem.name}</h1>
			<div className={styles['item-desc']}>
				<p className={styles['item-desc-prop']}>
					<span className={styles['item-desc-label']}>Type:</span>
					{locationItem.type}
				</p>
				<p className={styles['item-desc-prop']}>
					<span className={styles['item-desc-label']}>Dimension:</span>
					{locationItem.dimension}
				</p>
				<p className={styles['item-desc-prop']}>
					<span className={styles['item-desc-label']}>Created:</span>
					{new Date(locationItem.created).toLocaleDateString()}
				</p>
			</div>
			{id && (
				<div className={styles['links-block']}>
					{Number(id) > 1 && <Link to={`/locations/${+id - 1}`}>Previous location</Link>}
					{Number(id) < locationData.length && <Link to={`/locations/${+id + 1}`}>Next location</Link>}
				</div>
			)}
		</div>
	);
};
