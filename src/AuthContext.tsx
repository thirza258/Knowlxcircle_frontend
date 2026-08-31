import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import LoginService from "./services/LoginService";
import { AuthContext } from "./auth-context";
import type { AuthContextType } from "./auth-context";

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    // Read synchronously: restoring the token in an effect would render one
    // logged-out frame first, which is exactly the flash we want to avoid.
    const [token, setToken] = useState<string | null>(() => LoginService.getToken());
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const value = useMemo<AuthContextType>(
        () => ({
            isAuthenticated: token !== null,
            isLoading,
            token,
            error,
            login: async (username: string, password: string): Promise<void> => {
                setError(null);
                try {
                    const { access } = await LoginService.login(username, password);
                    setToken(access);
                } catch (loginError) {
                    setToken(null);
                    setError("Login failed. Please check your username and password.");
                    throw loginError;
                }
            },
            logout: (): void => {
                LoginService.logout();
                setToken(null);
                setError(null);
            },
        }),
        [token, isLoading, error],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
