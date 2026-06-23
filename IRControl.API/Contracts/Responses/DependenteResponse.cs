namespace IRControl.API.Contracts.Responses
{
    public class DependenteResponse
    {
        public int Id { get; set; }

        public string Nome { get; set; } = string.Empty;

        public string Cpf { get; set; } = string.Empty;

        public DateTime DataNascimento { get; set; }

        public string? Parentesco { get; set; }

        public DateTime DataCadastro { get; set; }
    }
}
