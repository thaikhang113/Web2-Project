import axios from "axios";
import { useAuthStore } from "../hooks/useAuthStore.js";

const resolveBaseURL = () => {
	if (import.meta.env.DEV) return "/api";

	return (
		import.meta.env.VITE_API_BASE_URL ||
		import.meta.env.VITE_API_URL ||
		"/api"
	);
};

export const api = axios.create({
	baseURL: resolveBaseURL(),
});

// Request interceptor
api.interceptors.request.use((cfg) => {
	const { token } = useAuthStore.getState();
	const apiKey = import.meta.env.VITE_API_KEY;

	if (apiKey) {
		cfg.headers = {
			...cfg.headers,
			"x-api-key": apiKey,
		};
	}

	if (token) {
		cfg.headers = {
			...cfg.headers,
			Authorization: `Bearer ${token}`,
		};
	}

	return cfg;
});

// Response interceptor
api.interceptors.response.use(
	(res) => res,
	(err) => {
		const status = err?.response?.status;

		if (status === 401) {
			const { logout } = useAuthStore.getState();
			logout();

			if (
				typeof window !== "undefined" &&
				!["/login", "/register"].some((path) =>
					window.location.pathname.startsWith(path),
				)
			) {
				window.location.assign("/login");
			}
		}

		return Promise.reject(err);
	},
);
