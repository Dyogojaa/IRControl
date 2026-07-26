using IRControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Infrastructure.Persistence;

public static class SeedData
{
    private static readonly int AnoBase = DateTime.Now.Year;

    private const decimal SalarioBrutoMensal = 15000m;
    private const decimal InssMensal = 1650m;
    private const decimal IrrfMensal = 1850m;
    private const decimal PlanoSaudeMensal = 650m;
    private const decimal PrevidenciaMensal = 500m;
    private const decimal OutrosDescontosMensal = 200m;
    private const decimal SalarioLiquidoMensal = 10150m;

    public static async Task InitializeAsync(AppDbContext context)
    {
        await context.Database.MigrateAsync();

        if (await PossuiDadosAsync(context))
            return;

        var agora = DateTime.UtcNow;

        var dependentes = CriarDependentes(agora);

        await context.Dependentes.AddRangeAsync(dependentes);

        var holerites = CriarHolerites(agora);
        await context.Holerites.AddRangeAsync(holerites);

        var informe = CriarInforme(agora);
        await context.InformesRendimento.AddAsync(informe);

        await context.SaveChangesAsync();

        var despesas = CriarDespesas(dependentes, agora);

        await context.DespesasMedicas.AddRangeAsync(despesas);

        await context.SaveChangesAsync();
    }

    private static async Task<bool> PossuiDadosAsync(AppDbContext context)
    {
        return await context.Holerites.AnyAsync()
            || await context.Dependentes.AnyAsync()
            || await context.InformesRendimento.AnyAsync()
            || await context.DespesasMedicas.AnyAsync();
    }

    private static List<Holerite> CriarHolerites(DateTime dataCadastro)
    {
        var lista = new List<Holerite>();

        for (var mes = 1; mes <= 12; mes++)
        {
            lista.Add(new Holerite
            {
                Mes = mes,
                Ano = AnoBase,
                SalarioBruto = SalarioBrutoMensal,
                Inss = InssMensal,
                Irrf = IrrfMensal,
                PlanoSaude = PlanoSaudeMensal,
                PrevidenciaPrivada = PrevidenciaMensal,
                OutrosDescontos = OutrosDescontosMensal,
                SalarioLiquido = SalarioLiquidoMensal,
                DataCadastro = dataCadastro
            });
        }

        return lista;
    }

    private static InformeRendimento CriarInforme(DateTime dataCadastro)
    {
        return new InformeRendimento
        {
            Ano = AnoBase,
            Empresa = "Empresa Exemplo LTDA",

            SalarioBruto = SalarioBrutoMensal * 12,
            Inss = InssMensal * 12,
            Irrf = IrrfMensal * 12,
            PlanoSaude = PlanoSaudeMensal * 12,
            PrevidenciaPrivada = PrevidenciaMensal * 12,

            DataCadastro = dataCadastro
        };
    }

    private static List<Dependente> CriarDependentes(DateTime dataCadastro)
    {
        return
        [
            new()
            {
                Nome = "Maria Almeida",
                Cpf = "11122233344",
                DataNascimento = new DateTime(2015, 03, 12),
                Parentesco = "Filha",
                DataCadastro = dataCadastro
            },

            new()
            {
                Nome = "Pedro Almeida",
                Cpf = "55566677788",
                DataNascimento = new DateTime(2018, 07, 22),
                Parentesco = "Filho",
                DataCadastro = dataCadastro
            },

            new()
            {
                Nome = "Ana Almeida",
                Cpf = "99988877766",
                DataNascimento = new DateTime(1988, 11, 10),
                Parentesco = "Cônjuge",
                DataCadastro = dataCadastro
            }
        ];
    }

    private static List<DespesaMedica> CriarDespesas(
        List<Dependente> dependentes,
        DateTime dataCadastro)
    {
        return
        [
            new()
            {
                Dependente = dependentes[0],
                DataDespesa = new DateTime(AnoBase, 2, 15),
                MedicoClinica = "Hospital Infantil Vida",
                CpfCnpj = "12345678000199",
                Especialidade = "Pediatria",
                Valor = 450m,
                ValorReembolsado = 100m,
                Observacao = "Consulta Pediátrica",
                DataCadastro = dataCadastro
            },

            new()
            {
                Dependente = dependentes[0],
                DataDespesa = new DateTime(AnoBase, 5, 20),
                MedicoClinica = "Clínica Vacinar",
                CpfCnpj = "22233344000111",
                Especialidade = "Vacinação",
                Valor = 600m,
                ValorReembolsado = 0m,
                Observacao = "Vacinação",
                DataCadastro = dataCadastro
            },

            new()
            {
                Dependente = dependentes[1],
                DataDespesa = new DateTime(AnoBase, 6, 5),
                MedicoClinica = "Odonto Kids",
                CpfCnpj = "33344455000122",
                Especialidade = "Odontologia",
                Valor = 1200m,
                ValorReembolsado = 250m,
                Observacao = "Tratamento Odontológico",
                DataCadastro = dataCadastro
            },

            new()
            {
                Dependente = dependentes[2],
                DataDespesa = new DateTime(AnoBase, 4, 8),
                MedicoClinica = "Hospital São Lucas",
                CpfCnpj = "44455566000133",
                Especialidade = "Cardiologia",
                Valor = 850m,
                ValorReembolsado = 300m,
                Observacao = "Consulta Cardiológica",
                DataCadastro = dataCadastro
            },

            new()
            {
                Dependente = dependentes[2],
                DataDespesa = new DateTime(AnoBase, 9, 12),
                MedicoClinica = "Laboratório Vida",
                CpfCnpj = "55566677000144",
                Especialidade = "Exames",
                Valor = 350m,
                ValorReembolsado = 0m,
                Observacao = "Exames Laboratoriais",
                DataCadastro = dataCadastro
            }
        ];
    }
}