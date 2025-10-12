import { Link } from 'react-router-dom';
import charactersData from '../../data/characters.json';
import type { CharactersShortProps } from '../../types';
import styles from './charactersList.module.scss';

export const CharactersList = () => {
	const characters: CharactersShortProps[] = charactersData;

	return (
		<>
			<h1 className='text-center'>Characters</h1>
			<div className={styles['card-list']}>
				{characters.map((character) => (
					<div className={styles['card-item']} key={character.id}>
						<Link to={`/characters/${character.id}`}>
							<div className={styles['card-item-image']}>
								<img src={character.image} alt={character.name} className={styles['image']} />
							</div>
							<h3 className={styles['card-item-name']}>{character.name}</h3>
						</Link>
					</div>
				))}
			</div>
		</>
	);
};
