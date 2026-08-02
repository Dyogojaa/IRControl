import { useEffect, useState, type ReactNode } from "react";

import { AuthContext, type AuthUser } from "./AuthContext";

import authService from "@/services/auth.service";

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const currentUser = authService.getUser();

        if (currentUser) {
            setUser(currentUser);
        }

        setLoading(false);

    }, []);

    async function login(login: string, senha: string) {

        const response = await authService.login({
            login,
            senha
        });

        setUser({
            id: response.usuarioId,
            login: response.login,
            nome: response.nome
        });
    }

    function logout() {

        authService.logout();

        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: authService.isAuthenticated(),
                loading,
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}