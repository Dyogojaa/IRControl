import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import Chip from "@mui/material/Chip";

import SeverityChip from "./SeverityChip";    

import type { AuditoriaItem } from "@/types/auditoria";

interface Props {

    itens: AuditoriaItem[];

    loading?: boolean;

}

export default function AuditoriaTable({

    itens,

    loading = false,

}: Props) {

    const columns: GridColDef<AuditoriaItem>[] = [

        {
            field: "severidade",
            headerName: "Severidade",
            width: 150,
            sortable: false,

            renderCell: ({ row }) => (

                <SeverityChip
                    severity={row.severidade}
                    label={row.severidadeDescricao}
                />

            ),
        },

        {
            field: "categoria",
            headerName: "Categoria",
            width: 180,

            renderCell: ({ value }) => (

                <Chip
                    label={value}
                    size="small"
                    variant="outlined"
                />

            ),
        },

        {
            field: "descricao",
            headerName: "Descrição",
            flex: 1,
            minWidth: 500,
        },

    ];

    return (

        <DataGrid

            rows={itens}

            columns={columns}

            loading={loading}

            disableRowSelectionOnClick

            pageSizeOptions={[10, 20, 50]}

            initialState={{

                pagination: {

                    paginationModel: {

                        pageSize: 10,

                        page: 0,

                    },

                },

            }}

            sx={{

                borderRadius: 2,

                "& .MuiDataGrid-columnHeaders": {

                    fontWeight: 700,

                },

            }}

        />

    );

}