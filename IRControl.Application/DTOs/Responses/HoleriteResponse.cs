namespace IRControl.Application.DTOs.Responses
{
    public class HoleriteResponse
    {
        public int Id { get; set; }

        public int Mes { get; set; }

        public int Ano { get; set; }

        public decimal SalarioBruto { get; set; }

        public decimal Inss { get; set; }

        public decimal Irrf { get; set; }

        public decimal SalarioLiquido { get; set; }

        public decimal? PlanoSaude { get; set; }

        public decimal? PrevidenciaPrivada { get; set; }

        public decimal? OutrosDescontos { get; set; }

        public DateTime DataCadastro { get; set; }
    }
}
