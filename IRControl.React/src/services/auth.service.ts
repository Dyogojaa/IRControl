import authApi, {
    type LoginRequest,
    type LoginResponse,
    type CriarSenhaRequest,
} from "@/api/authApi";

import authStorage, {
    type AuthStorageData,
} from "./authStorage";

class AuthService {

    async login(
        request: LoginRequest
    ): Promise<LoginResponse> {

        const response =
            await authApi.login(request);

        if (!response.sucesso) {
            throw new Error(
                response.mensagem
            );
        }

        const authData: AuthStorageData = {

            token: response.token,

            expiracao: response.expiracao,

            primeiroAcesso:
                response.primeiroAcesso,

            usuario: {

                id: response.usuarioId,

                login: response.login,

                nome: response.nome,

            },
        };

        authStorage.save(authData);

        return response;
    }

    async criarSenha(
        senha: string,
        confirmarSenha: string
    ): Promise<void> {

        const request: CriarSenhaRequest = {

            senha,

            confirmarSenha,

        };

        await authApi.criarSenha(request);

        authStorage.concluirPrimeiroAcesso();
    }


    async esqueciSenha(
        email: string
    ): Promise<void> {

        await authApi.esqueciSenha(email);

    }

    async redefinirSenha(
        email: string,
        codigo: string,
        novaSenha: string,
        confirmacaoSenha: string
    ): Promise<void> {

        await authApi.redefinirSenha(
            email,
            codigo,
            novaSenha,
            confirmacaoSenha
        );

    }


    async alterarSenha(
    senhaAtual: string,
    novaSenha: string,
    confirmacaoSenha: string
    ): Promise<void> {

        await authApi.alterarSenha({
            senhaAtual,
            novaSenha,
            confirmacaoSenha,
        });
    }

    logout(): void {

        authStorage.clear();

    }

    isAuthenticated(): boolean {

        return authStorage.hasToken();

    }

    isPrimeiroAcesso(): boolean {

        return authStorage.isPrimeiroAcesso();

    }

    getToken(): string | null {

        return authStorage.getToken();

    }

    getUser() {

        return authStorage.getUser();

    }
}

export default new AuthService();