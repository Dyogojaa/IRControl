import RefreshIcon from "@mui/icons-material/Refresh";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface Props {

    ano: number;

    loading?: boolean;

    onAnoChange: (ano: number) => void;

    onAtualizar: () => void;

}

export default function AuditoriaToolbar({

    ano,

    loading = false,

    onAnoChange,

    onAtualizar,

}: Props) {

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                gap: 2,
                flexWrap: "wrap",
            }}
        >

            <TextField
                label="Ano"
                type="number"
                value={ano}
                onChange={(e) => onAnoChange(Number(e.target.value))}
                sx={{ width: 140 }}
            />

            <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={onAtualizar}
                disabled={loading}
            >
                Atualizar
            </Button>

        </Box>

    );

}