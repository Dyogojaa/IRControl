import api from "./api";

export interface LoginRequest {
    login: string;
    senha: string;
}

export interface LoginResponse {
    sucesso: boolean;
    mensagem: string;
    token: string;
    expiracao: string;
    usuarioId: string;
    nome: string;
    login: string;
    primeiroAcesso: boolean;
}

export interface CriarSenhaRequest {
    senha: string;
    confirmarSenha: string;
}

export interface AlterarSenhaRequest {
    senhaAtual: string;
    novaSenha: string;
    confirmacaoSenha: string;
}


class AuthApi {

    async login(
        request: LoginRequest
    ): Promise<LoginResponse> {

        const response =
            await api.post<LoginResponse>(
                "/auth/login",
                request
            );

        return response.data;
    }

    async criarSenha(
        request: CriarSenhaRequest
    ): Promise<void> {

        await api.post(
            "/auth/criar-senha",
            request
        );
    }

    async alterarSenha(
    request: AlterarSenhaRequest
    ): Promise<void> {

        await api.post(
            "/auth/alterar-senha",
            request
        );
    }


    async esqueciSenha(
    email: string
    ): Promise<void> {

        await api.post(
            "/auth/esqueci-senha",
            {
                email,
            }
        );
    }

    async redefinirSenha(
        email: string,
        codigo: string,
        novaSenha: string,
        confirmacaoSenha: string
    ): Promise<void> {

        await api.post(
            "/auth/redefinir-senha",
            {
                email,
                codigo,
                novaSenha,
                confirmacaoSenha,
            }
        );
    }
}

export default new AuthApi();