import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Loading } from '../../components';
import type { EpisodeProps } from '../../types';
import styles from './episode.module.scss';

export const Episode = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [episodeItem, setEpisodeItem] = useState<EpisodeProps | null>(null);

	useEffect(() => {
		setIsLoading(true);
		axios({
			method: 'GET',
			url: `https://rickandmortyapi.com/api/episode/${id}`,
		})
			.then((res) => {
				setEpisodeItem(res.data);
				setIsLoading(false);
			})
			.catch(() => {
				navigate('/404', { replace: true });
			});
	}, [id]);

	return (
		<div className={styles['character']}>
			<Loading isLoading={isLoading}>
				<h1>
					<span className={styles['episode']}>{episodeItem?.episode}</span>
					{episodeItem?.name}
				</h1>
				<div className={styles['item-desc']}>
					<p className={styles['item-desc-prop']}>
						<span className={styles['item-desc-label']}>Air date:</span>
						{episodeItem?.air_date}
					</p>
					{episodeItem?.created && (
						<p className={styles['item-desc-prop']}>
							<span className={styles['item-desc-label']}>Created:</span>
							{new Date(episodeItem.created).toLocaleDateString()}
						</p>
					)}
				</div>
				{id && (
					<div className={styles['links-block']}>
						{Number(id) > 1 && (
							<Link to={`/episodes/${+id - 1}`} className={styles['item-nav-link']}>
								Previous episode
							</Link>
						)}
						{Number(id) && (
							<Link to={`/episodes/${+id + 1}`} className={styles['item-nav-link']}>
								Next episode
							</Link>
						)}
					</div>
				)}
			</Loading>
		</div>
	);
};
