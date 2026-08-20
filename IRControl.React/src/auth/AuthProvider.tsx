import {
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    AuthContext,
    type AuthUser,
} from "./AuthContext";

import authService from "@/services/auth.service";

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {

    const [user, setUser] =
        useState<AuthUser | null>(null);

    const [primeiroAcesso, setPrimeiroAcesso] =
        useState(false);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const currentUser =
            authService.getUser();

        if (currentUser) {

            setUser(currentUser);

            setPrimeiroAcesso(
                authService.isPrimeiroAcesso()
            );
        }

        setLoading(false);

    }, []);

    async function login(
        login: string,
        senha: string
    ): Promise<boolean> {

        const response =
            await authService.login({
                login,
                senha,
            });

        setUser({

            id: response.usuarioId,

            login: response.login,

            nome: response.nome,

        });

        setPrimeiroAcesso(
            response.primeiroAcesso
        );

        return response.primeiroAcesso;
    }

    async function criarSenha(
        senha: string,
        confirmarSenha: string
    ): Promise<void> {

        await authService.criarSenha(
            senha,
            confirmarSenha
        );

        setPrimeiroAcesso(false);
    }

    function logout() {

        authService.logout();

        setUser(null);

        setPrimeiroAcesso(false);
    }

    return (

        <AuthContext.Provider
            value={{

                isAuthenticated:
                    authService.isAuthenticated(),

                loading,

                user,

                primeiroAcesso,

                login,

                criarSenha,

                logout,

            }}
        >

            {children}

        </AuthContext.Provider>
    );
}