export interface CharactersShortProps {
	id: number;
	name: string;
	image: string;
}

export interface CharactersProps extends CharactersShortProps {
	status: string;
	species: string;
	type: string;
	gender: string;
	created: string;
}
