using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IRControl.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddInformeRendimento : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InformesRendimento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ano = table.Column<int>(type: "int", nullable: false),
                    Empresa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SalarioBruto = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Inss = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Irrf = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PlanoSaude = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PrevidenciaPrivada = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DataCadastro = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InformesRendimento", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InformesRendimento");
        }
    }
}
