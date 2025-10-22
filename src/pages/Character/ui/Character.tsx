import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Loading } from '@/shared/ui';
import { CharactersProps } from '../model/characters';
import styles from './character.module.scss';

export const Character = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [characterItem, setCharacterItem] = useState<CharactersProps | null>(null);

	useEffect(() => {
		setIsLoading(true);
		axios({
			method: 'GET',
			url: `https://rickandmortyapi.com/api/character/${id}`,
		})
			.then((res) => {
				setCharacterItem(res.data);
				setIsLoading(false);
			})
			.catch(() => {
				navigate('/404', { replace: true });
			});
	}, []);

	return (
		<div className={styles['character']}>
			<Loading isLoading={isLoading}>
				<h1>{characterItem?.name}</h1>
				<div className={styles['item']}>
					<img src={characterItem?.image} alt={characterItem?.name} />
					<div className={styles['item-desc']}>
						<p className={styles['item-desc-prop']}>
							<span className={styles['item-desc-label']}>Status:</span>
							{characterItem?.status}
						</p>
						<p className={styles['item-desc-prop']}>
							<span className={styles['item-desc-label']}>Species:</span>
							{characterItem?.species}
						</p>
						<p className={styles['item-desc-prop']}>
							<span className={styles['item-desc-label']}>Type:</span>
							{characterItem?.type ? characterItem?.type : 'unknown'}
						</p>
						<p className={styles['item-desc-prop']}>
							<span className={styles['item-desc-label']}>Gender:</span>
							{characterItem?.gender}
						</p>
						{characterItem?.created && (
							<p className={styles['item-desc-prop']}>
								<span className={styles['item-desc-label']}>Created:</span>
								{new Date(characterItem.created).toLocaleDateString()}
							</p>
						)}
					</div>
				</div>
			</Loading>
		</div>
	);
};
