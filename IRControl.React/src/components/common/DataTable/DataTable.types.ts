import type {
    GridColDef,
    GridRowsProp,
} from "@mui/x-data-grid";

export interface DataTableProps {
    rows: GridRowsProp;
    columns: GridColDef[];
    loading?: boolean;
}