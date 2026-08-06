export interface DashboardResponse {
    pendencias: Pendencia[];
    ano: number;
    status: string;
    ultimaAtualizacao: string;
    holerites: DashboardHolerites;
    informe: DashboardInforme;
    dependentes: DashboardDependentes;
    despesasMedicas: DashboardDespesasMedicas;
    auditoria: DashboardAuditoria;
    
}

export interface DashboardHolerites {
    esperados: number;
    cadastrados: number;
    faltantes: number;
    salarioBruto: number;
    inss: number;
    irrf: number;
    planoSaude: number;
    previdenciaPrivada: number;
}

export interface DashboardInforme {
    cadastrado: boolean;
    empresa: string;
    salarioBruto: number;
    inss: number;
    irrf: number;
}

export interface DashboardDependentes {
    quantidade: number;
    comCpf: number;
    semCpf: number;
}

export interface DashboardDespesasMedicas {
    quantidade: number;
    valorTotal: number;
    valorReembolsado: number;
    valorDedutivel: number;
}

export interface DashboardAuditoria {
    totalErros: number;
    totalAlertas: number;
    totalInformacoes: number;
    declaracaoApta: boolean;
}

export interface Pendencia {
    titulo: string;
    descricao: string;
    tipo: string;
}