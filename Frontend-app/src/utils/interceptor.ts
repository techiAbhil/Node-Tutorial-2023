import axios from 'axios';

const imageHandlingAPIRoutes: string[] = ['/update-profile-pic'];
axios.interceptors.request.use((req: any) => {
	req.baseURL = import.meta.env.VITE_PUBLIC_BASE_URL;
	req.headers = {
		// 'access-control-allow-headers': '*',
		'Access-Control-Allow-Origin': '*',
		'content-type': 'application/json',
		// 'Access-Control-Allow-Methods': 'GET, OPTIONS, POST, PUT',
	};

	if (!req.url.startsWith('/auth/')) {
		const token = localStorage.getItem('AUTH_TOKEN');
		// req.headers.Authorization = `Bearer ${token}`;
	}
	return req;
});

axios.interceptors.response.use(
	(res) => {
		return res.data;
	},
	(error) => {
		if (error?.response?.status === 401) {
			localStorage.clear();
			return Promise.reject('Session timeout!');
		}
		return Promise.reject(error?.response?.data ?? error);
	}
);
