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
}

class AuthApi {

    async login(request: LoginRequest): Promise<LoginResponse> {

        const response = await api.post<LoginResponse>(
            "/auth/login",
            request
        );

        return response.data;
    }

}

export default new AuthApi();