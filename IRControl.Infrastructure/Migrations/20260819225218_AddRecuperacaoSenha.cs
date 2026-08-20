using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IRControl.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddRecuperacaoSenha : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RecuperacaoSenha",
                columns: table => new
                {
                    Id = table.Column<Guid>(
                        type: "uniqueidentifier",
                        nullable: false),

                    UsuarioId = table.Column<Guid>(
                        type: "uniqueidentifier",
                        nullable: false),

                    Codigo = table.Column<string>(
                        type: "nvarchar(6)",
                        maxLength: 6,
                        nullable: false),

                    Expiracao = table.Column<DateTime>(
                        type: "datetime2",
                        nullable: false),

                    Utilizado = table.Column<bool>(
                        type: "bit",
                        nullable: false,
                        defaultValue: false),

                    DataCriacao = table.Column<DateTime>(
                        type: "datetime2",
                        nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey(
                        "PK_RecuperacaoSenha",
                        x => x.Id);

                    table.ForeignKey(
                        name: "FK_RecuperacaoSenha_Usuario_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RecuperacaoSenha_UsuarioId",
                table: "RecuperacaoSenha",
                column: "UsuarioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RecuperacaoSenha");
        }
    }
}