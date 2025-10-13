import { Route, Routes } from 'react-router-dom';
import {
	Home,
	CharactersList,
	Character,
	NotFound,
	LocationList,
	Location,
	EpisodeList,
	Episode,
	Signin,
} from './pages';
import { Layout, PrivateLayout } from './components';
import { AuthProvider } from './context';
import './App.css';

export const App = () => {
	return (
		<AuthProvider>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route element={<PrivateLayout />}>
						<Route path='/characters'>
							<Route index element={<CharactersList />} />
							<Route path=':id' element={<Character />} />
						</Route>
						<Route path='/locations'>
							<Route index element={<LocationList />} />
							<Route path=':id' element={<Location />} />
						</Route>
						<Route path='/episodes'>
							<Route index element={<EpisodeList />} />
							<Route path=':id' element={<Episode />} />
						</Route>
					</Route>

					<Route path='*' element={<NotFound />} />
				</Route>
				<Route path='/login' element={<Signin />} />
			</Routes>
		</AuthProvider>
	);
};
