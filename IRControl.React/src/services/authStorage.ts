export interface AuthUser {
    id: string;
    login: string;
    nome: string;
}

export interface AuthStorageData {
    token: string;
    expiracao: string;
    usuario: AuthUser;
}

const STORAGE_KEY = "ircontrol.auth";

class AuthStorage {

    save(data: AuthStorageData): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    load(): AuthStorageData | null {
        const data = localStorage.getItem(STORAGE_KEY);

        if (!data)
            return null;

        return JSON.parse(data) as AuthStorageData;
    }

    clear(): void {
        localStorage.removeItem(STORAGE_KEY);
    }

    hasToken(): boolean {
        return this.load() !== null;
    }

    getToken(): string | null {
        return this.load()?.token ?? null;
    }

    getUser(): AuthUser | null {
        return this.load()?.usuario ?? null;
    }
}

export default new AuthStorage();