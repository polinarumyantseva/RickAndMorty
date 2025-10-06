import { Link, Navigate, useParams } from 'react-router-dom';
import episodeData from '../../data/episode.json';
import type { EpisodeProps } from '../../types';
import styles from './episode.module.scss';

export const Episode = () => {
	const { id } = useParams();
	const episode: EpisodeProps[] = episodeData.filter((item) => item.id === Number(id));
	const episodeItem: EpisodeProps = episode[0];

	if (!id || !episode.length) {
		return <Navigate to='/404' replace />;
	}

	return (
		<div className={styles['character']}>
			<h1>
				<span className={styles['episode']}>{episodeItem.episode}</span>
				{episodeItem.name}
			</h1>
			<div className={styles['item-desc']}>
				<p className={styles['item-desc-prop']}>
					<span className={styles['item-desc-label']}>Air date:</span>
					{episodeItem.air_date}
				</p>
				<p className={styles['item-desc-prop']}>
					<span className={styles['item-desc-label']}>Created:</span>
					{new Date(episodeItem.created).toLocaleDateString()}
				</p>
			</div>
			{id && (
				<div className={styles['links-block']}>
					{Number(id) > 1 && <Link to={`/episodes/${+id - 1}`}>Previous episode</Link>}
					{Number(id) < episodeData.length && <Link to={`/episodes/${+id + 1}`}>Next episode</Link>}
				</div>
			)}
		</div>
	);
};
