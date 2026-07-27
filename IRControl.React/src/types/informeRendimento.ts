export interface InformeRendimentoResponse {

    id: number;

    ano: number;

    empresa: string;

    salarioBruto: number;

    inss: number;

    irrf: number;

    planoSaude: number;

    previdenciaPrivada: number;

}

export interface InformeRendimentoFiltro {

    pesquisa: string;

}

export interface InformeRendimentoCreateRequest {

    ano: number;

    empresa: string;

    salarioBruto: number;

    inss: number;

    irrf: number;

    planoSaude: number;

    previdenciaPrivada: number;

}

export interface InformeRendimentoUpdateRequest
    extends InformeRendimentoCreateRequest {

    id: number;

}