using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IRControl.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RelacionarDespesaMedicaDependente : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Beneficiario",
                table: "DespesasMedicas");

            migrationBuilder.AlterColumn<string>(
                name: "MedicoClinica",
                table: "DespesasMedicas",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Especialidade",
                table: "DespesasMedicas",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "CpfCnpj",
                table: "DespesasMedicas",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<DateTime>(
                name: "DataCadastro",
                table: "DespesasMedicas",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "DependenteId",
                table: "DespesasMedicas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataCadastro",
                table: "Dependentes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Parentesco",
                table: "Dependentes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DespesasMedicas_DependenteId",
                table: "DespesasMedicas",
                column: "DependenteId");

            migrationBuilder.AddForeignKey(
                name: "FK_DespesasMedicas_Dependentes_DependenteId",
                table: "DespesasMedicas",
                column: "DependenteId",
                principalTable: "Dependentes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DespesasMedicas_Dependentes_DependenteId",
                table: "DespesasMedicas");

            migrationBuilder.DropIndex(
                name: "IX_DespesasMedicas_DependenteId",
                table: "DespesasMedicas");

            migrationBuilder.DropColumn(
                name: "DataCadastro",
                table: "DespesasMedicas");

            migrationBuilder.DropColumn(
                name: "DependenteId",
                table: "DespesasMedicas");

            migrationBuilder.DropColumn(
                name: "DataCadastro",
                table: "Dependentes");

            migrationBuilder.DropColumn(
                name: "Parentesco",
                table: "Dependentes");

            migrationBuilder.AlterColumn<string>(
                name: "MedicoClinica",
                table: "DespesasMedicas",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AlterColumn<string>(
                name: "Especialidade",
                table: "DespesasMedicas",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "CpfCnpj",
                table: "DespesasMedicas",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AddColumn<string>(
                name: "Beneficiario",
                table: "DespesasMedicas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
