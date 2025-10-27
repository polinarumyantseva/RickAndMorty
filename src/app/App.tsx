import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { resolver, theme } from './theme';
import { AuthProvider } from './Providers/AuthProvider';
import { Lazy } from '../shared/utils';
import { Layout } from '@/widgets/layout';
import { PrivateLayout } from '@/widgets/privateLayout';
import { useServiceWorker } from '@/shared/hooks';
import './App.css';
import '@mantine/core/styles.css';

export const App = () => {
	useServiceWorker();

	return (
		<MantineProvider theme={theme} cssVariablesResolver={resolver} defaultColorScheme='dark'>
			<AuthProvider>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route
							index
							element={
								<Suspense fallback='Loading...'>
									<Lazy.Home />
								</Suspense>
							}
						/>
						<Route element={<PrivateLayout />}>
							<Route path='/characters'>
								<Route
									index
									element={
										<Suspense fallback='Loading...'>
											<Lazy.CharactersList />
										</Suspense>
									}
								/>
								<Route
									path=':id'
									element={
										<Suspense fallback='Loading...'>
											<Lazy.Character />
										</Suspense>
									}
								/>
							</Route>
							<Route path='/locations'>
								<Route
									index
									element={
										<Suspense fallback='Loading...'>
											<Lazy.LocationList />
										</Suspense>
									}
								/>
								<Route
									path=':id'
									element={
										<Suspense fallback='Loading...'>
											<Lazy.Location />
										</Suspense>
									}
								/>
							</Route>
							<Route path='/episodes'>
								<Route
									index
									element={
										<Suspense fallback='Loading...'>
											<Lazy.EpisodeList />
										</Suspense>
									}
								/>
								<Route
									path=':id'
									element={
										<Suspense fallback='Loading...'>
											<Lazy.Episode />
										</Suspense>
									}
								/>
							</Route>
						</Route>
						<Route
							path='*'
							element={
								<Suspense fallback='Loading...'>
									<Lazy.NotFound />
								</Suspense>
							}
						/>
					</Route>
					<Route
						path='/login'
						element={
							<Suspense fallback='Loading...'>
								<Lazy.Login />
							</Suspense>
						}
					/>
				</Routes>
			</AuthProvider>
		</MantineProvider>
	);
};
