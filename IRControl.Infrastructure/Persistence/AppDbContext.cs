using Microsoft.EntityFrameworkCore;
using IRControl.Domain.Entities;

namespace IRControl.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Holerite> Holerites => Set<Holerite>();

    public DbSet<DespesaMedica> DespesasMedicas => Set<DespesaMedica>();

    public DbSet<Dependente> Dependentes => Set<Dependente>();

    public DbSet<InformeRendimento> InformesRendimento =>    Set<InformeRendimento>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

        base.OnModelCreating(modelBuilder);
    }

}