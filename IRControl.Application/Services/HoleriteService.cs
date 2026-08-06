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

public class HoleriteService : IHoleriteService
{
    private readonly AppDbContext _context;
    private readonly IAtividadeService _atividadeService;
    private readonly IUserContext _userContext;

    public HoleriteService(AppDbContext context, IAtividadeService atividadeService, IUserContext userContext)
    {
        _context = context;
        _atividadeService = atividadeService;
        _userContext = userContext;
    }

    public async Task<IEnumerable<HoleriteResponse>> ObterTodosAsync(
    ListarHoleritesRequest request)
    {
        var query =
            _context.Holerites.AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.Pesquisa))
        {
            var pesquisa = request.Pesquisa.Trim();

            query = query.Where(x =>

                x.Ano.ToString().Contains(pesquisa)

                ||

                x.Mes.ToString().Contains(pesquisa)

                ||

                x.SalarioBruto.ToString().Contains(pesquisa)

                ||

                x.Inss.ToString().Contains(pesquisa)

                ||

                x.Irrf.ToString().Contains(pesquisa)

                ||

                x.SalarioLiquido.ToString().Contains(pesquisa)

            );
        }

        var holerites =
            await query
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
            SalarioLiquido = CalcularSalarioLiquido(request),
            PlanoSaude = request.PlanoSaude,
            PrevidenciaPrivada = request.PrevidenciaPrivada,
            OutrosDescontos = request.OutrosDescontos,
            DataCadastro = DateTime.Now
        };

        _context.Holerites.Add(holerite);

        await _context.SaveChangesAsync();

        await _atividadeService.RegistrarAsync(TipoAtividade.Cadastro, OrigensAtividade.Holerites, TitulosAtividade.HoleriteCadastrado, DescricoesAtividade.HoleriteCadastrado(holerite.Mes, holerite.Ano), _userContext.UsuarioId, _userContext.Login);

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

        await _atividadeService.RegistrarAsync(TipoAtividade.Exclusao, OrigensAtividade.Holerites, TitulosAtividade.HoleriteExcluido, DescricoesAtividade.HoleriteExcluido(holerite.Mes, holerite.Ano), _userContext.UsuarioId, _userContext.Login);

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
        holerite.SalarioLiquido = CalcularSalarioLiquido(request);
        holerite.PlanoSaude = request.PlanoSaude;
        holerite.PrevidenciaPrivada = request.PrevidenciaPrivada;
        holerite.OutrosDescontos = request.OutrosDescontos;

        await _context.SaveChangesAsync();

        await _atividadeService.RegistrarAsync(TipoAtividade.Alteracao, OrigensAtividade.Holerites, TitulosAtividade.HoleriteAlterado, DescricoesAtividade.HoleriteAlterado(holerite.Mes, holerite.Ano), _userContext.UsuarioId, _userContext.Login);

        return holerite.ToResponse();
    }


    private static decimal CalcularSalarioLiquido(CreateHoleriteRequest request)
    {
#pragma warning disable CS8629 // O tipo de valor de nulidade pode ser nulo.
        return (decimal)(request.SalarioBruto
             - request.Inss
             - request.Irrf
             - request.PlanoSaude
             - request.PrevidenciaPrivada
             - request.OutrosDescontos);
#pragma warning restore CS8629 // O tipo de valor de nulidade pode ser nulo.
    }
}