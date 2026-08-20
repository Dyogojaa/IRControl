using IRControl.Domain.Entities;
using IRControl.Infrastructure.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;

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
    
    public DbSet<Usuario> Usuarios => Set<Usuario>();

    public DbSet<Atividade> Atividades => Set<Atividade>();

    public DbSet<RecuperacaoSenha> RecuperacoesSenha  => Set<RecuperacaoSenha>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        
        base.OnModelCreating(modelBuilder);
    }

}