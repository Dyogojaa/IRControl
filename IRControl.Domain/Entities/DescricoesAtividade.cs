using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IRControl.Domain.Entities
{
    public static class DescricoesAtividade
    {
        public static string Login(string login)
            => $"Usuário '{login}' realizou login com sucesso.";

        public static string DependenteCadastrado(string nome)
            => $"Dependente '{nome}' cadastrado.";

        public static string DependenteAlterado(string nome)
            => $"Dependente '{nome}' alterado.";

        public static string DependenteExcluido(string nome)
            => $"Dependente '{nome}' excluído.";

        public static string HoleriteImportado(int quantidade)
            => $"{quantidade} holerite(s) importado(s).";

        public static string InformeImportado(string empresa)
            => $"Informe de rendimentos da empresa '{empresa}' importado.";

        public static string DespesaMedicaCadastrada(string descricao)
            => $"Despesa médica '{descricao}' cadastrada.";

        public static string DeclaracaoGerada(int ano)
            => $"Declaração do ano-base {ano} gerada.";

        public static string HoleriteCadastrado(int mes, int ano)
    => $"Holerite da competência {mes:D2}/{ano} cadastrado.";

        public static string HoleriteAlterado(int mes, int ano)
    => $"Holerite da competência {mes:D2}/{ano} alterado.";

        public static string HoleriteExcluido(int mes, int ano)
    => $"Holerite da competência {mes:D2}/{ano} excluído.";


        public static string InformeCadastrado(string fontePagadora)
    => $"Informe de rendimentos da fonte pagadora '{fontePagadora}' cadastrado.";

        public static string InformeAlterado(string fontePagadora)
            => $"Informe de rendimentos da fonte pagadora '{fontePagadora}' alterado.";

        public static string InformeExcluido(string fontePagadora)
            => $"Informe de rendimentos da fonte pagadora '{fontePagadora}' excluído.";


        public static string DespesaMedicaAlterada(string descricao)
            => $"Despesa médica '{descricao}' alterada.";

        public static string DespesaMedicaExcluida(string descricao)
            => $"Despesa médica '{descricao}' excluída.";

    }
}
