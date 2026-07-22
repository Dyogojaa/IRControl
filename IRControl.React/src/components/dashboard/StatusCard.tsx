import {
    Card,
    CardContent,
    Typography,
    Chip,
    Stack
} from "@mui/material";

function StatusCard() {
    return (
        <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h6">
                    Situação da Declaração
                </Typography>

                <Stack
                    sx={{
                        mt: 3,
                    }}
                >
                    <Chip
                        color="success"
                        label="Tudo em dia"
                    />
                </Stack>
            </CardContent>
        </Card>
    );
}

export default StatusCard;