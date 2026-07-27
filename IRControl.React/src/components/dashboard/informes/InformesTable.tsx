import { useMemo } from "react";

import type { GridColDef } from "@mui/x-data-grid";

import DataTable from "@/components/common/DataTable";
import ActionButtons from "@/components/common/ActionButtons";
import MoneyDisplay from "@/components/common/finance/MoneyDisplay";

import type {
    InformeRendimentoResponse,
} from "@/types/informeRendimento";

interface Props {

    data: InformeRendimentoResponse[];

    loading?: boolean;

    onVisualizar: (id: number) => void;

    onEditar: (id: number) => void;

    onExcluir: (id: number) => void;

}

export default function InformesTable({

    data,

    loading,

    onVisualizar,

    onEditar,

    onExcluir,

}: Props) {

    const columns = useMemo<GridColDef[]>(() => [

        {
            field: "ano",
            headerName: "Ano",
            width: 90,
            align: "center",
            headerAlign: "center",
        },

        {
            field: "empresa",
            headerName: "Empresa",
            flex: 1,
            minWidth: 250,
        },

        {
            field: "salarioBruto",
            headerName: "Salário Bruto",
            width: 170,
            align: "right",
            headerAlign: "right",

            renderCell: (params) => (

                <MoneyDisplay
                    value={params.row.salarioBruto}
                    bold
                />

            ),

        },

        {
            field: "inss",
            headerName: "INSS",
            width: 150,
            align: "right",
            headerAlign: "right",

            renderCell: (params) => (

                <MoneyDisplay
                    value={params.row.inss}
                />

            ),

        },

        {
            field: "irrf",
            headerName: "IRRF",
            width: 150,
            align: "right",
            headerAlign: "right",

            renderCell: (params) => (

                <MoneyDisplay
                    value={params.row.irrf}
                />

            ),

        },

        {
            field: "planoSaude",
            headerName: "Plano Saúde",
            width: 170,
            align: "right",
            headerAlign: "right",

            renderCell: (params) => (

                <MoneyDisplay
                    value={params.row.planoSaude}
                />

            ),

        },

        {
            field: "previdenciaPrivada",
            headerName: "Previdência",
            width: 170,
            align: "right",
            headerAlign: "right",

            renderCell: (params) => (

                <MoneyDisplay
                    value={
                        params.row.previdenciaPrivada
                    }
                />

            ),

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

    ], [

        onVisualizar,

        onEditar,

        onExcluir,

    ]);

    return (

        <DataTable
            rows={data}
            columns={columns}
            loading={loading}
        />

    );

}