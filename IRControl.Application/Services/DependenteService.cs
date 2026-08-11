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

public class DependenteService : IDependenteService
{
    private readonly AppDbContext _context;
    private readonly IAtividadeService _atividadeService;
    private readonly IUserContext _userContext;

    public DependenteService(AppDbContext context, IAtividadeService atividadeService, IUserContext userContext)
    {
        _context = context;
        _atividadeService = atividadeService;
        _userContext = userContext;
    }

    public async Task<IEnumerable<DependenteResponse>> ObterTodosAsync(
        ListarDependentesRequest request)
    {
        var query =
            _context.Dependentes.AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.Pesquisa))
        {
            var pesquisa =
                request.Pesquisa.Trim();

            query = query.Where(x =>
                x.Nome.Contains(pesquisa) ||
                x.Cpf.Contains(pesquisa) ||
                x.Parentesco.Contains(pesquisa)
            );
        }

        var dependentes =
            await query
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

        await _atividadeService.RegistrarAsync(TipoAtividade.Cadastro, OrigensAtividade.Dependentes, TitulosAtividade.DependenteCadastrado, DescricoesAtividade.DependenteCadastrado(dependente.Nome), _userContext.UsuarioId,   _userContext.Login);


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

        await _atividadeService.RegistrarAsync(TipoAtividade.Alteracao, OrigensAtividade.Dependentes, TitulosAtividade.DependenteAlterado, DescricoesAtividade.DependenteAlterado(dependente.Nome), _userContext.UsuarioId, _userContext.Login);

        return dependente.ToResponse();
    }

    public async Task<bool> ExcluirAsync(int id)
    {
        var dependente = await _context.Dependentes
            .FirstOrDefaultAsync(x => x.Id == id);

        if (dependente is null)
            return false;

        _context.Dependentes.Remove(dependente);

        await _atividadeService.RegistrarAsync( TipoAtividade.Exclusao, OrigensAtividade.Dependentes,  TitulosAtividade.DependenteExcluido,  DescricoesAtividade.DependenteExcluido(dependente.Nome), _userContext.UsuarioId, _userContext.Login);

        await _context.SaveChangesAsync();

        return true;
    }
}