using IRControl.Application.DTOs.Requests;
using IRControl.Application.DTOs.Responses;
using IRControl.Application.Interfaces;
using IRControl.Application.Mappings;
using IRControl.Domain.Entities;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Services;

public class HoleriteService : IHoleriteService
{
    private readonly AppDbContext _context;

    public HoleriteService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<HoleriteResponse>> ObterTodosAsync()
    {
        var holerites = await _context.Holerites
            .OrderByDescending(x => x.Ano)
            .ThenByDescending(x => x.Mes)
            .ToListAsync();

        return holerites.Select(x => x.ToResponse());
    }

    public async Task<HoleriteResponse?> ObterPorIdAsync(int id)
    {
        var holerite = await _context.Holerites
            .FirstOrDefaultAsync(x => x.Id == id);

        return holerite?.ToResponse();
    }

    public async Task<HoleriteResponse> CriarAsync(
        CreateHoleriteRequest request)
    {
        var holerite = new Holerite
        {
            Mes = request.Mes,
            Ano = request.Ano,
            SalarioBruto = request.SalarioBruto,
            Inss = request.Inss,
            Irrf = request.Irrf,
            SalarioLiquido = request.SalarioLiquido,
            PlanoSaude = request.PlanoSaude,
            PrevidenciaPrivada = request.PrevidenciaPrivada,
            OutrosDescontos = request.OutrosDescontos,
            DataCadastro = DateTime.Now
        };

        _context.Holerites.Add(holerite);

        await _context.SaveChangesAsync();

        return holerite.ToResponse();
    }

    public async Task<bool> ExcluirAsync(int id)
    {
        var holerite = await _context.Holerites
            .FirstOrDefaultAsync(x => x.Id == id);

        if (holerite is null)
            return false;

        _context.Holerites.Remove(holerite);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<HoleriteResponse?> AtualizarAsync(int id, CreateHoleriteRequest request)
    {
        var holerite = await _context.Holerites
            .FirstOrDefaultAsync(x => x.Id == id);

        if (holerite is null)
            return null;

        holerite.Mes = request.Mes;
        holerite.Ano = request.Ano;
        holerite.SalarioBruto = request.SalarioBruto;
        holerite.Inss = request.Inss;
        holerite.Irrf = request.Irrf;
        holerite.SalarioLiquido = request.SalarioLiquido;
        holerite.PlanoSaude = request.PlanoSaude;
        holerite.PrevidenciaPrivada = request.PrevidenciaPrivada;
        holerite.OutrosDescontos = request.OutrosDescontos;

        await _context.SaveChangesAsync();

        return holerite.ToResponse();
    }
}