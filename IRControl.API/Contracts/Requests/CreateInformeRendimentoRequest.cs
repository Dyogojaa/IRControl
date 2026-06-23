namespace IRControl.API.Contracts.Requests
{
    public class CreateInformeRendimentoRequest
    {
        public int Ano { get; set; }

        public string Empresa { get; set; } = string.Empty;

        public decimal SalarioBruto { get; set; }

        public decimal Inss { get; set; }

        public decimal Irrf { get; set; }

        public decimal PlanoSaude { get; set; }

        public decimal PrevidenciaPrivada { get; set; }
    }
}
