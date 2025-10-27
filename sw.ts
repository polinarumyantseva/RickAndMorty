const staticCacheName = 'static-cache-v1';
const dynamicCacheName = 'dynamic-cache-v1';
const ASSETS = [
	'/',
	'/manifest.json',
	'/dist/index.html',
	'/favicon.ico',
	'/apple-touch-icon.png',
	'/dist/assets/index.css',
	'/dist/assets/index.js',
];

self.addEventListener('install', async () => {
	const cache = await caches.open(staticCacheName);
	await cache.addAll(ASSETS);
});

self.addEventListener('activate', async () => {
	const cachesKeysArr = await caches.keys();
	await Promise.all(
		cachesKeysArr
			.filter((key) => key !== staticCacheName && key !== dynamicCacheName)
			.map((key) => caches.delete(key))
	);
});

interface FetchEvent extends Event {
	readonly request: Request;
	respondWith(response: Promise<Response> | Response): void;
}

self.addEventListener('fetch', (event: Event) => {
	const fetchEvent = event as FetchEvent;

	fetchEvent.respondWith(cacheFirst(fetchEvent.request));
});

async function cacheFirst(request: Request) {
	const cached = await caches.match(request);
	try {
		if (cached) {
			return cached;
		}
		const response = await fetch(request);

		if (response.status === 200) {
			const cache = await caches.open(dynamicCacheName);
			await cache.put(request, response.clone());
		}

		return response;
	} catch (e) {
		console.log('error', e);
		return networkFirst(request);
	}
}

async function networkFirst(request: Request) {
	const cache = await caches.open(dynamicCacheName);
	try {
		const response = await fetch(request);
		await cache.put(request, response.clone());
		return response;
	} catch (e) {
		const cached = await cache.match(request);
		if (cached) {
			return cached;
		}
		return new Response(null, { status: 204 });
	}
}
