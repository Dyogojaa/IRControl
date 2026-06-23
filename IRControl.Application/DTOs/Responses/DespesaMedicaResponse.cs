namespace IRControl.Application.DTOs.Responses
{
    public class DespesaMedicaResponse
    {
        public int Id { get; set; }

        public DateTime DataDespesa { get; set; }

        public int DependenteId { get; set; }

        public string DependenteNome { get; set; } = string.Empty;

        public string MedicoClinica { get; set; } = string.Empty;

        public string CpfCnpj { get; set; } = string.Empty;

        public string Especialidade { get; set; } = string.Empty;

        public decimal Valor { get; set; }

        public decimal ValorReembolsado { get; set; }

        public decimal ValorDedutivel { get; set; }

        public string? Observacao { get; set; }

        public DateTime DataCadastro { get; set; }
    }
}
