import { useContext } from "react";
import { AuthContext } from "./auth-context";
import type { AuthContextType } from "./auth-context";

/**
 * Access the auth session. Lives in its own module so `AuthContext.tsx` keeps
 * exporting components only, which is what react-refresh needs.
 */
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used inside an <AuthProvider>");
    }
    return context;
};
