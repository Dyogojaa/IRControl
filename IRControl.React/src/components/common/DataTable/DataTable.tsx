import Paper from "@mui/material/Paper";

import {
    DataGrid,
    GridToolbar,
} from "@mui/x-data-grid";

import type { DataTableProps } from "./DataTable.types";

export default function DataTable({
    rows,
    columns,
    loading = false,
}: DataTableProps) {
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                autoHeight
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                            page: 0,
                        },
                    },
                }}
                slots={{
                    toolbar: GridToolbar,
                }}
            />
        </Paper>
    );
}