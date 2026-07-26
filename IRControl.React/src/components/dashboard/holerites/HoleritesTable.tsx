import { useMemo } from "react";

import type { GridColDef } from "@mui/x-data-grid";

import DataTable from "@/components/common/DataTable";
import ActionButtons from "@/components/common/ActionButtons";

import type { HoleriteResponse } from "@/types/holerite";

interface Props {
    data: HoleriteResponse[];
    loading?: boolean;

    onVisualizar: (id: number) => void;

    onEditar: (id: number) => void;

    onExcluir: (id: number) => void;
}

export default function HoleritesTable({
    data,
    loading,
    onVisualizar,
    onEditar,
    onExcluir,
}: Props) {

    const columns = useMemo<GridColDef[]>(() => [

        {
            field: "mes",
            headerName: "Mês",
            width: 90,
            align: "center",
            headerAlign: "center",
        },

        {
            field: "ano",
            headerName: "Ano",
            width: 90,
            align: "center",
            headerAlign: "center",
        },

        {
            field: "salarioBruto",
            headerName: "Salário Bruto",
            flex: 1,
            align: "right",
            headerAlign: "right",

            valueFormatter: (value) =>
                Number(value).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }),
        },

        {
            field: "inss",
            headerName: "INSS",
            width: 150,
            flex: 1,
            align: "right",
            headerAlign: "right",

            valueFormatter: (value) =>
                Number(value).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }),
        },

        {
            field: "irrf",
            headerName: "IRRF",
            width: 150,
            flex: 1,
            align: "right",
            headerAlign: "right",

            valueFormatter: (value) =>
                Number(value).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }),
        },

        {
            field: "salarioLiquido",
            headerName: "Salário Líquido",
            flex: 1,
            align: "right",
            headerAlign: "right",

            valueFormatter: (value) =>
                Number(value).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }),
        },

        {
            field: "acoes",

            headerName: "Ações",

            sortable: false,

            filterable: false,

            disableColumnMenu: true,

            align: "center",

            headerAlign: "center",

            width: 150,

            renderCell: (params) => (

                <ActionButtons

                    onView={() =>
                        onVisualizar(params.row.id)
                    }

                    onEdit={() =>
                        onEditar(params.row.id)
                    }

                    onDelete={() =>
                        onExcluir(params.row.id)
                    }

                />

            ),
        },

    ], [onVisualizar, onEditar, onExcluir]);

    return (
        <DataTable
            rows={data}
            columns={columns}
            loading={loading}
        />
    );

}