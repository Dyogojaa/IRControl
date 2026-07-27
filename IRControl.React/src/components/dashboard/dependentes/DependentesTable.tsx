import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
    IconButton,
    Stack,
    Tooltip,
} from "@mui/material";
import {
    DataGrid,
    type GridColDef,
} from "@mui/x-data-grid";

import type { Dependente } from "@/types/dependente";

interface Props {
    loading: boolean;
    dependentes: Dependente[];

    onView: (dependente: Dependente) => void;
    onEdit: (dependente: Dependente) => void;
    onDelete: (dependente: Dependente) => void;
}

export default function DependentesTable({
    dependentes,
    loading,
    onView,
    onEdit,
    onDelete,
}: Props) {

    const columns: GridColDef<Dependente>[] = [
        {
            field: "nome",
            headerName: "Nome",
            flex: 2,
            minWidth: 220,
        },
        {
            field: "cpf",
            headerName: "CPF",
            flex: 1,
            minWidth: 150,
        },
        {
            field: "dataNascimento",
            headerName: "Nascimento",
            flex: 1,
            minWidth: 140,
            valueFormatter: (value) => {
                if (!value) return "";

                return new Date(value).toLocaleDateString("pt-BR");
            },
        },
        {
            field: "parentesco",
            headerName: "Parentesco",
            flex: 1,
            minWidth: 180,
        },
        {
            field: "acoes",
            headerName: "Ações",
            sortable: false,
            filterable: false,
            align: "center",
            headerAlign: "center",
            width: 150,

            renderCell: (params) => (
                <Stack direction="row" spacing={0.5}>

                    <Tooltip title="Visualizar">
                        <IconButton
                            size="small"
                            onClick={() => onView(params.row)}
                        >
                            <VisibilityIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Editar">
                        <IconButton
                            size="small"
                            onClick={() => onEdit(params.row)}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Excluir">
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => onDelete(params.row)}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                </Stack>
            ),
        },
    ];

    return (
        <DataGrid
            rows={dependentes}
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
            autoHeight
        />
    );
}