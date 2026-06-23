using IRControl.Application.DTOs.Requests;
using IRControl.Application.DTOs.Responses;
using IRControl.Application.Interfaces;
using IRControl.Application.Mappings;
using IRControl.Domain.Entities;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Services;

public class InformeRendimentoService : IInformeRendimentoService
{
    private readonly AppDbContext _context;

    public InformeRendimentoService(
        AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<InformeRendimentoResponse>> ObterTodosAsync()
    {
        var informes = await _context.InformesRendimento
            .OrderByDescending(x => x.Ano)
            .ToListAsync();

        return informes.Select(x => x.ToResponse());
    }

    public async Task<InformeRendimentoResponse?> ObterPorIdAsync(int id)
    {
        var informe = await _context.InformesRendimento
            .FirstOrDefaultAsync(x => x.Id == id);

        return informe?.ToResponse();
    }

    public async Task<InformeRendimentoResponse> CriarAsync(
        CreateInformeRendimentoRequest request)
    {
        var informe = new InformeRendimento
        {
            Ano = request.Ano,
            Empresa = request.Empresa,
            SalarioBruto = request.SalarioBruto,
            Inss = request.Inss,
            Irrf = request.Irrf,
            PlanoSaude = request.PlanoSaude,
            PrevidenciaPrivada = request.PrevidenciaPrivada,
            DataCadastro = DateTime.Now
        };

        _context.InformesRendimento.Add(informe);

        await _context.SaveChangesAsync();

        return informe.ToResponse();
    }

    public async Task<InformeRendimentoResponse?> AtualizarAsync(
        int id,
        CreateInformeRendimentoRequest request)
    {
        var informe = await _context.InformesRendimento
            .FirstOrDefaultAsync(x => x.Id == id);

        if (informe is null)
            return null;

        informe.Ano = request.Ano;
        informe.Empresa = request.Empresa;
        informe.SalarioBruto = request.SalarioBruto;
        informe.Inss = request.Inss;
        informe.Irrf = request.Irrf;
        informe.PlanoSaude = request.PlanoSaude;
        informe.PrevidenciaPrivada = request.PrevidenciaPrivada;

        await _context.SaveChangesAsync();

        return informe.ToResponse();
    }

    public async Task<bool> ExcluirAsync(int id)
    {
        var informe = await _context.InformesRendimento
            .FirstOrDefaultAsync(x => x.Id == id);

        if (informe is null)
            return false;

        _context.InformesRendimento.Remove(informe);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<ConferenciaIrResponse?> ConferenciaAsync(int ano)
    {
        var informe = await _context.InformesRendimento
            .FirstOrDefaultAsync(x => x.Ano == ano);

        if (informe is null)
            return null;

        var holerites = await _context.Holerites
            .Where(x => x.Ano == ano)
            .ToListAsync();

        var totalSalarioBruto = holerites.Sum(x => x.SalarioBruto);
        var totalInss = holerites.Sum(x => x.Inss);
        var totalIrrf = holerites.Sum(x => x.Irrf);

        return new ConferenciaIrResponse
        {
            Ano = ano,

            HoleriteSalarioBruto = totalSalarioBruto,
            InformeSalarioBruto = informe.SalarioBruto,
            DiferencaSalarioBruto = totalSalarioBruto - informe.SalarioBruto,

            HoleriteInss = totalInss,
            InformeInss = informe.Inss,
            DiferencaInss = totalInss - informe.Inss,

            HoleriteIrrf = totalIrrf,
            InformeIrrf = informe.Irrf,
            DiferencaIrrf = totalIrrf - informe.Irrf
        };
    }
}