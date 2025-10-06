export interface EpisodeShortProps {
	id: number;
	name: string;
	episode: string;
}

export interface EpisodeProps extends EpisodeShortProps {
	air_date: string;
	created: string;
}
