import authApi, { type LoginRequest, type LoginResponse } from "@/api/authApi";
import authStorage, { type AuthStorageData } from "./authStorage";

class AuthService {

    async login(request: LoginRequest): Promise<LoginResponse> {

        const response = await authApi.login(request);

        if (!response.sucesso) {
            throw new Error(response.mensagem);
        }

        const authData: AuthStorageData = {
            token: response.token,
            expiracao: response.expiracao,
            usuario: {
                id: response.usuarioId,
                login: response.login,
                nome: response.nome
            }
        };

        authStorage.save(authData);

        return response;
    }

    logout(): void {
        authStorage.clear();
    }

    isAuthenticated(): boolean {
        return authStorage.hasToken();
    }

    getToken(): string | null {
        return authStorage.getToken();
    }

    getUser() {
        return authStorage.getUser();
    }
}

export default new AuthService();