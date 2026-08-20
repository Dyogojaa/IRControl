import { createContext } from "react";

export interface AuthUser {
    id: string;
    login: string;
    nome: string;
}

export interface AuthContextData {

    isAuthenticated: boolean;

    loading: boolean;

    user: AuthUser | null;

    primeiroAcesso: boolean;

    login(
        login: string,
        senha: string
    ): Promise<boolean>;

    criarSenha(
        senha: string,
        confirmarSenha: string
    ): Promise<void>;

    logout(): void;
}

export const AuthContext =
    createContext<AuthContextData>(
        {} as AuthContextData
    );