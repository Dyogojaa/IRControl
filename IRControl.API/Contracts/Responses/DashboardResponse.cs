namespace IRControl.API.Contracts.Responses
{
    public class DashboardResponse
    {
        public int Ano { get; set; }

        public int QuantidadeHolerites { get; set; }

        public int QuantidadeDependentes { get; set; }

        public int QuantidadeDespesasMedicas { get; set; }

        public decimal TotalSalarioBruto { get; set; }

        public decimal TotalInss { get; set; }

        public decimal TotalIrrf { get; set; }

        public decimal TotalPlanoSaude { get; set; }

        public decimal TotalDespesasMedicas { get; set; }

        public decimal TotalReembolsado { get; set; }

        public decimal TotalDedutivel { get; set; }

        public bool PossuiInformeRendimento { get; set; }

        public bool PossuiDivergencias { get; set; }
    }
}
