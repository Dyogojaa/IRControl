export interface AuditoriaItem {

    categoria: string;

    severidade: number;

    severidadeDescricao: string;

    descricao: string;

}

export interface AuditoriaResponse {

    ano: number;

    totalErros: number;

    totalAlertas: number;

    totalInformacoes: number;

    declaracaoApta: boolean;

    itens: AuditoriaItem[];

}

export interface AuditoriaResumo {

    ano: number;

    declaracaoApta: boolean;

    totalErros: number;

    totalAlertas: number;

    totalInformacoes: number;

}