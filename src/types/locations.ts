export interface LocationShortProps {
	id: number;
	name: string;
}

export interface LocationProps extends LocationShortProps {
	type: string;
	dimension: string;
	created: string;
}
