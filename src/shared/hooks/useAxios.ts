import { useEffect, useState } from 'react';
import axios, { type Canceler } from 'axios';

export function useAxios<T>(url: string, pageNumber: number) {
	const [data, setData] = useState<T[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setIsLoading(true);
		setError(null);
		let cancel: Canceler;
		axios({
			method: 'GET',
			url,
			params: pageNumber ? { page: pageNumber } : {},
			cancelToken: new axios.CancelToken((c) => (cancel = c)),
		})
			.then((res) => {
				setData((prevState) => {
					return [...new Set([...prevState, ...res.data.results])];
				});

				setHasMore(res.data.info.pages > pageNumber);
				setIsLoading(false);
			})
			.catch((e) => {
				if (axios.isCancel(e)) {
					return;
				}
				console.log(e);
				setError(e);
			});

		return () => cancel();
	}, [url, pageNumber]);

	return {
		data,
		isLoading,
		error,
		hasMore,
	};
}
