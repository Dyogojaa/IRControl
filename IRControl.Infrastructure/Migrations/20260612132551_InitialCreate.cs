using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IRControl.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DespesasMedicas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataDespesa = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Beneficiario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MedicoClinica = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CpfCnpj = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Especialidade = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Valor = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ValorReembolsado = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Observacao = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DespesasMedicas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Holerites",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Mes = table.Column<int>(type: "int", nullable: false),
                    Ano = table.Column<int>(type: "int", nullable: false),
                    SalarioBruto = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Inss = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Irrf = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SalarioLiquido = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PlanoSaude = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    PrevidenciaPrivada = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    OutrosDescontos = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    DataCadastro = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Holerites", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DespesasMedicas");

            migrationBuilder.DropTable(
                name: "Holerites");
        }
    }
}
