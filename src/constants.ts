const DEFAULT_API_BASE_URL = "http://localhost:8000/api/";

// An unset or empty VITE_API_BASE_URL both fall back to the local backend.
const configured = import.meta.env.VITE_API_BASE_URL?.trim();

/**
 * Root of the backend API, always terminated by exactly one slash so services
 * can hang relative paths off it (`v1/article/articles/`).
 *
 * Set `VITE_API_BASE_URL` at build time to point at a deployed backend.
 */
export const apiBaseUrl: string = `${(configured || DEFAULT_API_BASE_URL).replace(/\/+$/, "")}/`;
