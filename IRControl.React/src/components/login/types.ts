export interface LoginCardProps {
    login: string;
    senha: string;
    lembrarMe: boolean;
    loading: boolean;
    erro?: string;

    onLoginChange: (value: string) => void;
    onSenhaChange: (value: string) => void;
    onLembrarMeChange: (value: boolean) => void;

    onEntrar: () => void;
    onEsqueceuSenha: () => void;
    onSolicitarAcesso: () => void;
}