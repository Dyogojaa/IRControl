using AutoMapper;
using AutoMapper.QueryableExtensions;
using IRControl.Application.Business.Atividades.DTOs;
using IRControl.Application.Business.Atividades.Interface;
using IRControl.Domain.Entities;
using IRControl.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IRControl.Application.Atividades.Services;

public class AtividadeService : IAtividadeService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public AtividadeService(
        AppDbContext context,
        IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<AtividadeResponse>> ObterRecentesAsync(int quantidade = 3)
    {
        var atividades = await _context.Atividades
            .AsNoTracking()
            .OrderByDescending(x => x.DataHora)
            .ToListAsync();

        var resultado = atividades
            .GroupBy(x => new
            {
                x.Tipo,
                x.Origem
            })
            .Select(g => g.First())
            .OrderByDescending(x => x.DataHora)
            .Take(quantidade)
            .ToList();

        return _mapper.Map<List<AtividadeResponse>>(resultado);
    }

    public async Task RegistrarAsync(RegistrarAtividadeRequest request)
    {
        var atividade = _mapper.Map<Atividade>(request);

        atividade.Id = Guid.NewGuid();
        atividade.DataHora = DateTime.UtcNow;

        _context.Atividades.Add(atividade);

        await _context.SaveChangesAsync();
    }

    public async Task RegistrarAsync(
        TipoAtividade tipo,
        string origem,
        string titulo,
        string descricao,
        Guid? usuarioId = null,
        string? usuarioLogin = null)
    {
        await RegistrarAsync(new RegistrarAtividadeRequest
        {
            Tipo = tipo,
            Origem = origem,
            Titulo = titulo,
            Descricao = descricao,
            UsuarioId = usuarioId,
            UsuarioLogin = usuarioLogin
        });
    }
}