using IRControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IRControl.Infrastructure.Persistence.Configurations;

public class AtividadeConfiguration : IEntityTypeConfiguration<Atividade>
{
    public void Configure(EntityTypeBuilder<Atividade> builder)
    {
        builder.ToTable("Atividades");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .ValueGeneratedNever();

        builder.Property(x => x.Origem)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(x => x.Titulo)
            .IsRequired()
            .HasMaxLength(150);

        builder.Property(x => x.Descricao)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.Tipo)
            .IsRequired();

        builder.Property(x => x.DataHora)
            .IsRequired();

        builder.HasIndex(x => x.DataHora);
    }
}