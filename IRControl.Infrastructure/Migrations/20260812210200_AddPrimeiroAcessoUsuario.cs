using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IRControl.Infrastructure.Migrations
{
    /// <inheritdoc />
    [Migration("20260812210200_AddPrimeiroAcessoUsuario")]
    public partial class AddPrimeiroAcessoUsuario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "PrimeiroAcesso",
                table: "Usuario",
                type: "bit",
                nullable: false,
                defaultValue: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PrimeiroAcesso",
                table: "Usuario");
        }
    }
}