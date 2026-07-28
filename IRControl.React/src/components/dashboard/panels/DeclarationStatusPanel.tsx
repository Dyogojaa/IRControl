import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import DashboardPanel from "./DashboardPanel";

import type { DashboardResponse } from "@/types/dashboard";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import DeclarationSummary from "./DeclarationSummary";

interface Props {
    dashboard: DashboardResponse;
}

interface StatusRowProps {
    success: boolean;
    title: string;
    value?: string;
}



function StatusRow({
    success,
    title,
    value,
}: StatusRowProps) {

    return (

        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                }}
            >

                {success ? (
                    <CheckCircleIcon
                        color="success"
                        fontSize="small"
                    />
                ) : (
                    <ErrorIcon
                        color="error"
                        fontSize="small"
                    />
                )}

                <Typography variant="body2">
                    {title}
                </Typography>

            </Box>

            {value && (

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        fontWeight: 600,
                    }}
                >
                    {value}
                </Typography>

            )}

        </Box>

    );

}

export default function DeclarationStatusPanel({
    dashboard,
}: Props) {

    const navigate = useNavigate();

    const etapas = [
        dashboard.holerites.faltantes === 0,
        dashboard.dependentes.quantidade > 0,
        dashboard.informe.cadastrado,
        dashboard.despesasMedicas.quantidade > 0,
        dashboard.auditoria.declaracaoApta,
    ];

    const concluidas = etapas.filter(Boolean).length;
    const totalEtapas = etapas.length;
    const percentual = (concluidas / totalEtapas) * 100;
    const progressColor =
    percentual === 100
        ? "success"
        : percentual >= 80
            ? "primary"
            : percentual >= 50
                ? "warning"
                : "error";

    return (

        <DashboardPanel
            title="Situação da Declaração"
            subtitle="Resumo da preparação para envio."
        >

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}
            >

                <Box sx={{ mb: 3 }}>

                    <LinearProgress
                        variant="determinate"
                        value={percentual}
                        color={progressColor}
                        sx={{
                            height: 8,
                            borderRadius: 8,
                            mb: 1,
                        }}
                    />

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        {concluidas} de {totalEtapas} etapas concluídas
                    </Typography>


                    <DeclarationSummary
                        declaracaoApta={dashboard.auditoria.declaracaoApta}
                        totalErros={dashboard.auditoria.totalErros}
                    />

                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >

                    <StatusRow
                        success={dashboard.holerites.faltantes === 0}
                        title={`Holerites (${dashboard.holerites.cadastrados}/${dashboard.holerites.esperados})`}
                    />

                    <StatusRow
                        success={dashboard.dependentes.quantidade > 0}
                        title={`Dependentes (${dashboard.dependentes.quantidade})`}
                    />

                    <StatusRow
                        success={dashboard.informe.cadastrado}
                        title="Informe de Rendimentos"
                    />

                    <StatusRow
                        success={dashboard.despesasMedicas.quantidade > 0}
                        title={`Despesas Médicas (${dashboard.despesasMedicas.quantidade})`}
                    />

                    <StatusRow
                        success={dashboard.auditoria.declaracaoApta}
                        title={
                            dashboard.auditoria.declaracaoApta
                                ? "Auditoria concluída"
                                : `${dashboard.auditoria.totalErros} erro(s) encontrados`
                        }
                    />

                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Divider sx={{ my: 3 }} />

                <Button
                    fullWidth
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate("/auditoria")}
                    sx={{
                        mt: 2,
                        borderRadius: 2,
                        py: 1.2,
                    }}
                >
                    Abrir Auditoria
                </Button>

            </Box>

        </DashboardPanel>

    );

}

