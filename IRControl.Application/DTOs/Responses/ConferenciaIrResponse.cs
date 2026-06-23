namespace IRControl.Application.DTOs.Responses
{
    public class ConferenciaIrResponse
    {
        public int Ano { get; set; }

        public decimal HoleriteSalarioBruto { get; set; }

        public decimal InformeSalarioBruto { get; set; }

        public decimal DiferencaSalarioBruto { get; set; }

        public decimal HoleriteInss { get; set; }

        public decimal InformeInss { get; set; }

        public decimal DiferencaInss { get; set; }

        public decimal HoleriteIrrf { get; set; }

        public decimal InformeIrrf { get; set; }

        public decimal DiferencaIrrf { get; set; }
    }
}
