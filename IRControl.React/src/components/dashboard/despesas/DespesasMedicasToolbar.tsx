import AddIcon from "@mui/icons-material/Add";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface Props {

    onNovo: () => void;

}

export default function DespesasMedicasToolbar({

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
            />

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onNovo}
            >
                Nova Despesa Médica
            </Button>

        </Box>

    );

}