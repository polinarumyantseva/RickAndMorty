import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { EpisodeProps } from '../model/episode';
import { useAxios } from '@/shared/hooks';
import styles from './episodeList.module.scss';

export const EpisodeList = () => {
	const [pageNumber, setPageNumber] = useState<number>(1);
	const { data, isLoading, error, hasMore } = useAxios('https://rickandmortyapi.com/api/episode', pageNumber);
	const episodes = data as EpisodeProps[];

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
			<h1 className='text-center'>Episodes</h1>
			<div className={styles['card-list']}>
				{episodes.map((episode, index) => (
					<div
						ref={episodes.length - 10 === index + 1 ? lastNodeRef : undefined}
						className={styles['card-item']}
						key={episode.id}
					>
						<Link to={`/episodes/${episode.id}`}>
							<p className={styles['card-item-name']}>
								<span className={styles['card-item-episode']}>{episode.episode}</span>
								{episode.name}
							</p>
						</Link>
					</div>
				))}
			</div>
			{isLoading && <div className={styles['loading']}>Loading...</div>}
			{error && <div className={styles['error']}>Error</div>}
		</>
	);
};
