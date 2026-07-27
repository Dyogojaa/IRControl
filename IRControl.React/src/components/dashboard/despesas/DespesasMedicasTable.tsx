import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from "@mui/material";

import type { DespesaMedica } from "@/types/despesaMedica";

interface Props {

    despesasMedicas: DespesaMedica[];

    loading: boolean;

    onView: (item: DespesaMedica) => void;

    onEdit: (item: DespesaMedica) => void;

    onDelete: (item: DespesaMedica) => void;

}

const moeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

function formatarData(data: string): string {

    return new Date(data).toLocaleDateString("pt-BR");

}

export default function DespesasMedicasTable({

    despesasMedicas,

    loading,

    onView,

    onEdit,

    onDelete,

}: Props) {

    if (loading) {

        return <CircularProgress />;

    }

    return (

        <TableContainer component={Paper}>

            <Table>

                <TableHead>

                    <TableRow>

                        <TableCell>Data</TableCell>

                        <TableCell>Dependente</TableCell>

                        <TableCell>Médico / Clínica</TableCell>

                        <TableCell>Especialidade</TableCell>

                        <TableCell align="right">
                            Valor
                        </TableCell>

                        <TableCell align="right">
                            Reembolso
                        </TableCell>

                        <TableCell align="right">
                            Dedutível
                        </TableCell>

                        <TableCell align="center">
                            Ações
                        </TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {despesasMedicas.map((item) => (

                        <TableRow
                            key={item.id}
                            hover
                        >

                            <TableCell>
                                {formatarData(item.dataDespesa)}
                            </TableCell>

                            <TableCell>
                                {item.dependenteNome}
                            </TableCell>

                            <TableCell>
                                {item.medicoClinica}
                            </TableCell>

                            <TableCell>
                                {item.especialidade}
                            </TableCell>

                            <TableCell align="right">
                                {moeda.format(item.valor)}
                            </TableCell>

                            <TableCell align="right">
                                {moeda.format(item.valorReembolsado)}
                            </TableCell>

                            <TableCell align="right">
                                {moeda.format(item.valorDedutivel)}
                            </TableCell>

                            <TableCell align="center">

                                <Tooltip title="Visualizar">

                                    <IconButton
                                        color="info"
                                        onClick={() => onView(item)}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>

                                </Tooltip>

                                <Tooltip title="Editar">

                                    <IconButton
                                        color="primary"
                                        onClick={() => onEdit(item)}
                                    >
                                        <EditIcon />
                                    </IconButton>

                                </Tooltip>

                                <Tooltip title="Excluir">

                                    <IconButton
                                        color="error"
                                        onClick={() => onDelete(item)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>

                                </Tooltip>

                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>

        </TableContainer>

    );

}