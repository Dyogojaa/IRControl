using IRControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IRControl.Infrastructure.Persistence.Configurations
{
    public class RecuperacaoSenhaConfiguration
    : IEntityTypeConfiguration<RecuperacaoSenha>
    {
        public void Configure(
            EntityTypeBuilder<RecuperacaoSenha> builder)
        {
            builder.ToTable("RecuperacaoSenha");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Codigo)
                .IsRequired()
                .HasMaxLength(6);

            builder.Property(x => x.Expiracao)
                .IsRequired();

            builder.Property(x => x.Utilizado)
                .HasDefaultValue(false);

            builder.Property(x => x.DataCriacao)
                .IsRequired();

            builder.HasOne(x => x.Usuario)
                .WithMany()
                .HasForeignKey(x => x.UsuarioId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
