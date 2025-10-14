import { lazy } from 'react';

export function createLazy(componentName: string) {
	return lazy(() =>
		import(`../pages/${componentName}/${componentName}`).then((module) => ({
			default: module[componentName],
		}))
	);
}

export const Lazy = {
	Home: createLazy('Home'),
	CharactersList: createLazy('CharactersList'),
	Character: createLazy('Character'),
	LocationList: createLazy('LocationList'),
	Location: createLazy('Location'),
	EpisodeList: createLazy('EpisodeList'),
	Episode: createLazy('Episode'),
	NotFound: createLazy('NotFound'),
	Signin: createLazy('Signin'),
};
