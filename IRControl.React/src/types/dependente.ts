export interface Dependente {
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: string;
    parentesco: string;
    dataCadastro: string;
}

export interface DependenteRequest {
    nome: string;
    cpf: string;
    dataNascimento: string;
    parentesco: string;
}