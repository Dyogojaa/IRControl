namespace IRControl.API.Contracts.Requests
{
    public class UpdateDependenteRequest
    {
        public string Nome { get; set; } = string.Empty;

        public string Cpf { get; set; } = string.Empty;

        public DateTime DataNascimento { get; set; }

        public string? Parentesco { get; set; }
    }
}
