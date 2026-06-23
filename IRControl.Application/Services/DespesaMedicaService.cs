using IRControl.Application.DTOs.Requests;
using IRControl.Application.DTOs.Responses;
using IRControl.Application.Interfaces;
using IRControl.Application.Mappings;
using IRControl.Domain.Entities;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Services;

public class DespesaMedicaService : IDespesaMedicaService
{
    private readonly AppDbContext _context;

    public DespesaMedicaService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<DespesaMedicaResponse>> ObterTodosAsync()
    {
        var despesas = await _context.DespesasMedicas
            .Include(x => x.Dependente)
            .OrderByDescending(x => x.DataDespesa)
            .ToListAsync();

        return despesas.Select(x => x.ToResponse());
    }

    public async Task<DespesaMedicaResponse?> ObterPorIdAsync(int id)
    {
        var despesa = await _context.DespesasMedicas
            .Include(x => x.Dependente)
            .FirstOrDefaultAsync(x => x.Id == id);

        return despesa?.ToResponse();
    }

    public async Task<DespesaMedicaResponse> CriarAsync(
        CreateDespesaMedicaRequest request)
    {
        var dependenteExiste = await _context.Dependentes
            .AnyAsync(x => x.Id == request.DependenteId);

        if (!dependenteExiste)
            throw new Exception("Dependente não encontrado.");

        var despesa = new DespesaMedica
        {
            DataDespesa = request.DataDespesa,
            DependenteId = request.DependenteId,
            MedicoClinica = request.MedicoClinica,
            CpfCnpj = request.CpfCnpj,
            Especialidade = request.Especialidade,
            Valor = request.Valor,
            ValorReembolsado = request.ValorReembolsado,
            Observacao = request.Observacao,
            DataCadastro = DateTime.Now
        };

        _context.DespesasMedicas.Add(despesa);

        await _context.SaveChangesAsync();

        await _context.Entry(despesa)
            .Reference(x => x.Dependente)
            .LoadAsync();

        return despesa.ToResponse();
    }

    public async Task<DespesaMedicaResponse?> AtualizarAsync(
        int id,
        UpdateDespesaMedicaRequest request)
    {
        var despesa = await _context.DespesasMedicas
            .Include(x => x.Dependente)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (despesa is null)
            return null;

        despesa.DataDespesa = request.DataDespesa;
        despesa.DependenteId = request.DependenteId;
        despesa.MedicoClinica = request.MedicoClinica;
        despesa.CpfCnpj = request.CpfCnpj;
        despesa.Especialidade = request.Especialidade;
        despesa.Valor = request.Valor;
        despesa.ValorReembolsado = request.ValorReembolsado;
        despesa.Observacao = request.Observacao;

        await _context.SaveChangesAsync();

        return despesa.ToResponse();
    }

    public async Task<bool> ExcluirAsync(int id)
    {
        var despesa = await _context.DespesasMedicas
            .FirstOrDefaultAsync(x => x.Id == id);

        if (despesa is null)
            return false;

        _context.DespesasMedicas.Remove(despesa);

        await _context.SaveChangesAsync();

        return true;
    }
}