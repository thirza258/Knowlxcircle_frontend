import axios from "axios";
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { apiBaseUrl } from "../constants";
import type { ApiEnvelope } from "../types";

/** Single source of truth for where the JWT lives in `localStorage`. */
export const TOKEN_STORAGE_KEY = "jwtToken";

/**
 * `localStorage` throws rather than returning null in a few browser
 * configurations (Safari private mode, sandboxed iframes), so every access is
 * guarded - an unreadable store simply means "not logged in".
 */
export const getStoredToken = (): string | null => {
    try {
        const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
        // Normalise a blank entry to "no session" so callers can test for null alone.
        return stored !== null && stored.length > 0 ? stored : null;
    } catch {
        return null;
    }
};

export const setStoredToken = (token: string): void => {
    try {
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } catch {
        // Storage unavailable: the token stays in memory for this page only.
    }
};

export const clearStoredToken = (): void => {
    try {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch {
        // Nothing to clear if the store cannot be reached.
    }
};

const api: AxiosInstance = axios.create({
    baseURL: apiBaseUrl,
});

/**
 * Attach the JWT to every request. Reading it per request (instead of setting
 * `axios.defaults` once at login) is what keeps a reloaded page authenticated:
 * the token survives in `localStorage`, but an in-memory default header does not.
 */
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getStoredToken();
    if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
});

/** A rejected token is a dead token: drop it so the UI stops claiming a session. */
api.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            clearStoredToken();
        }
        return Promise.reject(error);
    },
);

/**
 * Peel the `{ status, message, response }` envelope off a request and resolve
 * with the payload alone.
 *
 * ```ts
 * const article = await unwrap(api.get<ApiEnvelope<ArticleResponse>>("v1/article/articles/1/"));
 * ```
 */
export const unwrap = async <T>(
    request: Promise<AxiosResponse<ApiEnvelope<T>>>,
): Promise<T> => {
    const { data } = await request;
    return data.response;
};

export default api;
