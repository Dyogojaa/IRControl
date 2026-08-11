import AddIcon from "@mui/icons-material/Add";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface Props {

    pesquisa: string;

    onPesquisaChange: (
        value: string
    ) => void;

    onNovo: () => void;

}

export default function DependentesToolbar({

    pesquisa,

    onPesquisaChange,

    onNovo,

}: Props) {

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                mb: 3,
            }}
        >

            <TextField
                label="Pesquisar"
                size="small"
                fullWidth
                value={pesquisa}
                onChange={(e) =>
                    onPesquisaChange(
                        e.target.value
                    )
                }
            />

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onNovo}
            >
                Novo Dependente
            </Button>

        </Box>

    );

}