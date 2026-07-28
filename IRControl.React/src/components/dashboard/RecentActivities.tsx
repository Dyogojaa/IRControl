import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    Typography,
} from "@mui/material";

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PersonIcon from "@mui/icons-material/Person";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

function RecentActivities() {
    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                height: "100%",
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    sx={{ mb: 3 }}
                >
                    Últimas Atualizações
                </Typography>

                {/* Holerite */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: "success.light",
                            width: 40,
                            height: 40,
                        }}
                    >
                        <TaskAltIcon fontSize="small" />
                    </Avatar>

                    <Box>
                        <Typography
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            Holerite de Junho importado
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Arquivo processado com sucesso.
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Hoje • 14:35
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Dependente */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                        }}
                    >
                    <Avatar
                        sx={{
                            bgcolor: "info.light",
                            width: 40,
                            height: 40,
                        }}
                    >
                        <PersonIcon fontSize="small" />
                    </Avatar>

                    <Box>
                        <Typography
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            Dependente atualizado
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Cadastro alterado com sucesso.
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Hoje • 13:20
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Auditoria */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                        }}
                    >
                    <Avatar
                        sx={{
                            bgcolor: "warning.light",
                            width: 40,
                            height: 40,
                        }}
                    >
                        <WarningAmberIcon fontSize="small" />
                    </Avatar>

                    <Box>
                        <Typography
                            sx={{
                                fontWeight: 600,
                            }}
                    >
                            Auditoria encontrou inconsistências
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Existem 3 pendências para revisão.
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Hoje • 11:05
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default RecentActivities;