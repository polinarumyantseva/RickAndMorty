import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Loading } from '../../components';
import type { LocationProps } from '../../types';
import styles from './location.module.scss';

export const Location = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [locationItem, setLocationItem] = useState<LocationProps | null>(null);

	useEffect(() => {
		setIsLoading(true);
		axios({
			method: 'GET',
			url: `https://rickandmortyapi.com/api/location/${id}`,
		})
			.then((res) => {
				setLocationItem(res.data);
				setIsLoading(false);
			})
			.catch(() => {
				navigate('/404', { replace: true });
			});
	}, [id]);

	return (
		<div className={styles['character']}>
			<Loading isLoading={isLoading}>
				<h1>{locationItem?.name}</h1>
				<div className={styles['item-desc']}>
					<p className={styles['item-desc-prop']}>
						<span className={styles['item-desc-label']}>Type:</span>
						{locationItem?.type}
					</p>
					<p className={styles['item-desc-prop']}>
						<span className={styles['item-desc-label']}>Dimension:</span>
						{locationItem?.dimension}
					</p>
					{locationItem?.created && (
						<p className={styles['item-desc-prop']}>
							<span className={styles['item-desc-label']}>Created:</span>
							{new Date(locationItem.created).toLocaleDateString()}
						</p>
					)}
				</div>
				{id && (
					<div className={styles['links-block']}>
						{Number(id) > 1 && <Link to={`/locations/${+id - 1}`}>Previous location</Link>}
						{Number(id) && <Link to={`/locations/${+id + 1}`}>Next location</Link>}
					</div>
				)}
			</Loading>
		</div>
	);
};
