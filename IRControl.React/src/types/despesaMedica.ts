export interface DespesaMedica {

    id: number;

    dataDespesa: string;

    dependenteId: number;

    dependenteNome: string;

    medicoClinica: string;

    cpfCnpj: string;

    especialidade: string;

    valor: number;

    valorReembolsado: number;

    valorDedutivel: number;

    observacao: string;

    dataCadastro: string;

}

export interface DespesaMedicaRequest {

    dataDespesa: string;

    dependenteId: number;

    medicoClinica: string;

    cpfCnpj: string;

    especialidade: string;

    valor: number;

    valorReembolsado: number;

    observacao: string;

}