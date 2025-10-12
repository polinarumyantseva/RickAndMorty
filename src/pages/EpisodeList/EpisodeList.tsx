import { Link } from 'react-router-dom';
import episodeData from '../../data/episode.json';
import type { EpisodeShortProps } from '../../types';
import styles from './episodeList.module.scss';

export const EpisodeList = () => {
	const episodes: EpisodeShortProps[] = episodeData;

	return (
		<>
			<h1 className='text-center'>Episodes</h1>
			<div className={styles['card-list']}>
				{episodes.map((episode) => (
					<div className={styles['card-item']} key={episode.id}>
						<Link to={`/episodes/${episode.id}`}>
							<p className={styles['card-item-name']}>
								<span className={styles['card-item-episode']}>{episode.episode}</span>
								{episode.name}
							</p>
						</Link>
					</div>
				))}
			</div>
		</>
	);
};
