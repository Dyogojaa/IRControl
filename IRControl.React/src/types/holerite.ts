export interface HoleriteResponse {
    id: number;
    mes: number;
    ano: number;

    salarioBruto: number;
    inss: number;
    irrf: number;

    salarioLiquido: number;

    planoSaude: number;
    previdenciaPrivada: number;
    outrosDescontos: number;

    dataCadastro: string;
}

export interface HoleriteFiltro {
    pesquisa?: string;
}

export interface HoleriteCreateRequest {
    mes: number;
    ano: number;

    salarioBruto: number;
    inss: number;
    irrf: number;

    planoSaude: number;
    previdenciaPrivada: number;
    outrosDescontos: number;
}

export interface HoleriteUpdateRequest
    extends HoleriteCreateRequest {

    id: number;
}

