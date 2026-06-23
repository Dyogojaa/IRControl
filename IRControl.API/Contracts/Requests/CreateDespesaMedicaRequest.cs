namespace IRControl.API.Contracts.Requests
{
    public class CreateDespesaMedicaRequest
    {
        public DateTime DataDespesa { get; set; }

        public int DependenteId { get; set; }

        public string MedicoClinica { get; set; } = string.Empty;

        public string CpfCnpj { get; set; } = string.Empty;

        public string Especialidade { get; set; } = string.Empty;

        public decimal Valor { get; set; }

        public decimal ValorReembolsado { get; set; }

        public string? Observacao { get; set; }
    }
}
