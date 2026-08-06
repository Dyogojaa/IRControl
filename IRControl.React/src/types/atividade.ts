export enum TipoAtividade {
    Login = 1,
    Cadastro = 2,
    Alteracao = 3,
    Exclusao = 4,
    Importacao = 5,
    Exportacao = 6,
    Geracao = 7,
    Configuracao = 8
}

export interface Atividade {
    id: string;
    origem: string;
    titulo: string;
    descricao: string;
    tipo: TipoAtividade;
    dataHora: string;
}