import { createContext } from "react";

export type AuthContextType = {
    isAuthenticated: boolean;
    /** True only while the session is being restored from storage on first mount. */
    isLoading: boolean;
    token: string | null;
    /** Message from the last failed login, cleared when a new one starts. */
    error: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
};

/**
 * The context object lives here rather than beside <AuthProvider> so that
 * AuthContext.tsx exports components only - react-refresh cannot hot-reload a
 * module that mixes a component with a non-component export.
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
