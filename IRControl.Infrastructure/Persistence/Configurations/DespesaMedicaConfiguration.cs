using IRControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IRControl.Infrastructure.Persistence.Configurations;

public class DespesaMedicaConfiguration : IEntityTypeConfiguration<DespesaMedica>
{
    public void Configure(EntityTypeBuilder<DespesaMedica> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.MedicoClinica)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.CpfCnpj)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(x => x.Especialidade)
            .HasMaxLength(100);

        builder.Property(x => x.Valor)
            .HasPrecision(18, 2);

        builder.Property(x => x.ValorReembolsado)
            .HasPrecision(18, 2);

        builder.HasOne(x => x.Dependente)
            .WithMany(x => x.DespesasMedicas)
            .HasForeignKey(x => x.DependenteId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}