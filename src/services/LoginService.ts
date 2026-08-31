import api, { clearStoredToken, getStoredToken, setStoredToken, unwrap } from "./apiClient";
import type { ApiEnvelope, LoginResponse, RegisterEnvelope } from "../types";

/**
 * Exchanges credentials for a JWT pair and persists the access token, which the
 * apiClient request interceptor then attaches to every later request - including
 * ones made after a page reload.
 */
const login = async (username: string, password: string): Promise<LoginResponse> => {
    // A stale token would otherwise be attached to the login request itself.
    clearStoredToken();
    const tokens = await unwrap(
        api.post<ApiEnvelope<LoginResponse>>("v1/auth/login/", {
            username: username,
            password: password,
        }),
    );
    setStoredToken(tokens.access);
    return tokens;
};

const logout = (): void => {
    clearStoredToken();
};

const getToken = (): string | null => getStoredToken();

/**
 * Rejects with the underlying AxiosError when registration fails - it used to
 * swallow every error into a `console.log` and resolve with `undefined`, which
 * made a failed registration indistinguishable from a successful one.
 *
 * Resolves with the whole envelope: the backend's `response` payload here is not
 * stably serialised, so only `status` and `message` are worth reading.
 */
const register = async (
    username: string,
    password: string,
    email: string,
    occupation: string,
    bio: string,
): Promise<RegisterEnvelope> => {
    const { data } = await api.post<RegisterEnvelope>("v1/auth/register-member/", {
        username: username,
        password: password,
        email: email,
        occupation: occupation,
        bio: bio,
    });
    return data;
};

const LoginService = {
    login,
    logout,
    getToken,
    register,
};

export default LoginService;
