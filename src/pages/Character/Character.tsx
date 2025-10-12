import { Navigate, useParams } from 'react-router-dom';
import charactersData from '../../data/characters.json';
import type { CharactersProps } from '../../types';
import styles from './character.module.scss';

export const Character = () => {
	const { id } = useParams();
	const character: CharactersProps[] = charactersData.filter((item) => item.id === Number(id));
	const characterItem: CharactersProps = character[0];

	if (!id || !character.length) {
		return <Navigate to='/404' replace />;
	}

	return (
		<div className={styles['character']}>
			<h1>{characterItem.name}</h1>
			<div className={styles['item']}>
				<img src={characterItem.image} alt={characterItem.name} />
				<div className={styles['item-desc']}>
					<p className={styles['item-desc-prop']}>
						<span className={styles['item-desc-label']}>Status:</span>
						{characterItem.status}
					</p>
					<p className={styles['item-desc-prop']}>
						<span className={styles['item-desc-label']}>Species:</span>
						{characterItem.species}
					</p>
					<p className={styles['item-desc-prop']}>
						<span className={styles['item-desc-label']}>Type:</span>
						{characterItem.type ? characterItem.type : 'unknown'}
					</p>
					<p className={styles['item-desc-prop']}>
						<span className={styles['item-desc-label']}>Gender:</span>
						{characterItem.gender}
					</p>
					<p className={styles['item-desc-prop']}>
						<span className={styles['item-desc-label']}>Created:</span>
						{new Date(characterItem.created).toLocaleDateString()}
					</p>
				</div>
			</div>
		</div>
	);
};
