using IRControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IRControl.Infrastructure.Persistence.Configurations;

public class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
{
    public void Configure(EntityTypeBuilder<Usuario> builder)
    {
        builder.ToTable("Usuario");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Nome)
            .IsRequired()
            .HasMaxLength(150);

        builder.Property(x => x.Email)
            .IsRequired()
            .HasMaxLength(150);

        builder.Property(x => x.Login)
            .IsRequired()
            .HasMaxLength(50);

        builder.HasIndex(x => x.Login)
            .IsUnique();

        builder.Property(x => x.SenhaHash)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.Ativo)
            .HasDefaultValue(true);

        builder.Property(x => x.DataCriacao)
            .IsRequired();

        builder.Property(x => x.DataUltimoLogin);
    }
}