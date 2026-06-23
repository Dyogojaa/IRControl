using IRControl.Application.DTOs.Requests;
using IRControl.Application.DTOs.Responses;
using IRControl.Application.Interfaces;
using IRControl.Application.Mappings;
using IRControl.Domain.Entities;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Services;

public class DependenteService : IDependenteService
{
    private readonly AppDbContext _context;

    public DependenteService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<DependenteResponse>> ObterTodosAsync()
    {
        var dependentes = await _context.Dependentes
            .OrderBy(x => x.Nome)
            .ToListAsync();

        return dependentes.Select(x => x.ToResponse());
    }

    public async Task<DependenteResponse?> ObterPorIdAsync(int id)
    {
        var dependente = await _context.Dependentes
            .FirstOrDefaultAsync(x => x.Id == id);

        return dependente?.ToResponse();
    }

    public async Task<DependenteResponse> CriarAsync(
        CreateDependenteRequest request)
    {
        var dependente = new Dependente
        {
            Nome = request.Nome,
            Cpf = request.Cpf,
            DataNascimento = request.DataNascimento,
            Parentesco = request.Parentesco,
            DataCadastro = DateTime.Now
        };

        _context.Dependentes.Add(dependente);

        await _context.SaveChangesAsync();

        return dependente.ToResponse();
    }

    public async Task<DependenteResponse?> AtualizarAsync(
        int id,
        UpdateDependenteRequest request)
    {
        var dependente = await _context.Dependentes
            .FirstOrDefaultAsync(x => x.Id == id);

        if (dependente is null)
            return null;

        dependente.Nome = request.Nome;
        dependente.Cpf = request.Cpf;
        dependente.DataNascimento = request.DataNascimento;
        dependente.Parentesco = request.Parentesco;

        await _context.SaveChangesAsync();

        return dependente.ToResponse();
    }

    public async Task<bool> ExcluirAsync(int id)
    {
        var dependente = await _context.Dependentes
            .FirstOrDefaultAsync(x => x.Id == id);

        if (dependente is null)
            return false;

        _context.Dependentes.Remove(dependente);

        await _context.SaveChangesAsync();

        return true;
    }
}