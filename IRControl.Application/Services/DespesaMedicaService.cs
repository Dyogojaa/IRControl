using IRControl.Application.Business.Atividades.Interface;
using IRControl.Application.Common.Constants;
using IRControl.Application.DTOs.Requests;
using IRControl.Application.DTOs.Responses;
using IRControl.Application.Interfaces;
using IRControl.Application.Mappings;
using IRControl.Domain.Entities;
using IRControl.Infrastructure.Authentication.Interface;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Services;

public class DespesaMedicaService : IDespesaMedicaService
{
    private readonly AppDbContext _context;
    private readonly IAtividadeService _atividadeService;
    private readonly IUserContext _userContext;

    public DespesaMedicaService(AppDbContext context, IAtividadeService atividadeService, IUserContext userContext)
    {
        _context = context;
        _atividadeService = atividadeService;
        _userContext = userContext;
    }


    public async Task<IEnumerable<DespesaMedicaResponse>> ObterTodosAsync(
    ListarDespesasMedicasRequest request)
    {
        var query =
            _context.DespesasMedicas.AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.Pesquisa))
        {
            var pesquisa =
                request.Pesquisa.Trim();

            query = query.Where(x =>
                x.MedicoClinica.Contains(pesquisa) ||
                x.CpfCnpj.Contains(pesquisa) ||
                x.Especialidade.Contains(pesquisa)
            );
        }

        var despesasMedicas =
            await query
                .OrderByDescending(x => x.DataDespesa)
                .ToListAsync();

        return despesasMedicas.Select(x => x.ToResponse());
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

        await _atividadeService.RegistrarAsync(TipoAtividade.Cadastro, OrigensAtividade.DespesasMedicas, TitulosAtividade.DespesaMedicaCadastrada, DescricoesAtividade.DespesaMedicaCadastrada(despesa.MedicoClinica), _userContext.UsuarioId, _userContext.Login);

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

        await _atividadeService.RegistrarAsync(TipoAtividade.Alteracao, OrigensAtividade.DespesasMedicas, TitulosAtividade.DespesaMedicaAlterada, DescricoesAtividade.DespesaMedicaAlterada(despesa.MedicoClinica), _userContext.UsuarioId, _userContext.Login);

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

        await _atividadeService.RegistrarAsync(TipoAtividade.Exclusao, OrigensAtividade.DespesasMedicas, TitulosAtividade.DespesaMedicaExcluida, DescricoesAtividade.DespesaMedicaExcluida(despesa.MedicoClinica), _userContext.UsuarioId, _userContext.Login);

        return true;
    }
}