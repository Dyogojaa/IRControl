import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SectionTitle from "@/components/common/SectionTitle";

export default function DashboardHeader() {
    return (
        <Box sx={{ mb: 5 }}>
            <SectionTitle
                title="Painel"
                subtitle="Visão geral do seu Imposto de Renda"
            />

            <Typography
                variant="body1"
                color="text.secondary"
            >
                Acompanhe rapidamente as informações mais importantes da sua
                declaração, documentos cadastrados e situação da auditoria.
            </Typography>
        </Box>
    );
}