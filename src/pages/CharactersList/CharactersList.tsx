import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { CharactersProps } from '../../types';
import { useAxios } from '../../hooks';
import styles from './charactersList.module.scss';

export const CharactersList = () => {
	const [pageNumber, setPageNumber] = useState<number>(1);
	const { data, isLoading, error, hasMore } = useAxios('https://rickandmortyapi.com/api/character', pageNumber);
	const characters = data as CharactersProps[];

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
			<h1 className='text-center'>Characters</h1>
			<div className={styles['card-list']}>
				{characters.map((character, index) => (
					<div
						ref={characters.length === index + 1 ? lastNodeRef : undefined}
						className={styles['card-item']}
						key={character.id}
					>
						<Link to={`/characters/${character.id}`}>
							<div className={styles['card-item-image']}>
								<img src={character.image} alt={character.name} className={styles['image']} />
							</div>
							<h3 className={styles['card-item-name']}>{character.name}</h3>
						</Link>
					</div>
				))}
			</div>
			{isLoading && <div className={styles['loading']}>Loading...</div>}
			{error && <div className={styles['error']}>Error</div>}
		</>
	);
};
