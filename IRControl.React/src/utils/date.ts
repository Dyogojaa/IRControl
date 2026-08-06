export function formatarDataAtividade(data: string): string {

    const dt = new Date(data);

    const hoje = new Date();

    if (dt.toDateString() === hoje.toDateString()) {

        return `Hoje • ${dt.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        })}`;

    }

    const ontem = new Date();
    ontem.setDate(hoje.getDate() - 1);

    if (dt.toDateString() === ontem.toDateString()) {

        return `Ontem • ${dt.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        })}`;

    }

    return `${dt.toLocaleDateString("pt-BR")} • ${dt.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    })}`;

}