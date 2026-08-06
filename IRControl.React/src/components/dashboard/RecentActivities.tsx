import { useEffect, useState } from "react";

import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    Skeleton,
    Typography,
} from "@mui/material";

import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

import atividadeService from "@/services/AtividadeService";
import { TipoAtividade } from "@/types/atividade";
import type { Atividade } from "@/types/atividade";

import { formatarDataAtividade } from "@/utils/date";

function RecentActivities() {

    const [atividades, setAtividades] = useState<Atividade[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {

        try {

            const dados =
                await atividadeService.listar(3);

            setAtividades(dados);

        }
        finally {

            setLoading(false);

        }

    }

    function obterIcone(tipo: TipoAtividade) {

        switch (tipo) {

            case TipoAtividade.Login:
                return <LoginRoundedIcon fontSize="small" />;

            case TipoAtividade.Cadastro:
                return <PersonAddRoundedIcon fontSize="small" />;

            case TipoAtividade.Alteracao:
                return <EditRoundedIcon fontSize="small" />;

            case TipoAtividade.Exclusao:
                return <DeleteRoundedIcon fontSize="small" />;

            case TipoAtividade.Importacao:
                return <UploadRoundedIcon fontSize="small" />;

            case TipoAtividade.Exportacao:
                return <DownloadRoundedIcon fontSize="small" />;

            case TipoAtividade.Geracao:
                return <AutoAwesomeRoundedIcon fontSize="small" />;

            case TipoAtividade.Configuracao:
                return <SettingsRoundedIcon fontSize="small" />;

            default:
                return <SettingsRoundedIcon fontSize="small" />;

        }

    }

    function obterCor(tipo: TipoAtividade) {

        switch (tipo) {

            case TipoAtividade.Importacao:
                return "success.light";

            case TipoAtividade.Cadastro:
                return "info.light";

            case TipoAtividade.Alteracao:
                return "warning.light";

            case TipoAtividade.Exclusao:
                return "error.light";

            case TipoAtividade.Login:
                return "primary.light";

            case TipoAtividade.Exportacao:
                return "secondary.light";

            case TipoAtividade.Geracao:
                return "success.main";

            case TipoAtividade.Configuracao:
                return "grey.500";

            default:
                return "primary.light";

        }

    }

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
                    sx={{
                        mb: 3,
                    }}
                >
                    Atividades Recentes
                </Typography>

                {loading ? (

                    <>
                        <Skeleton height={70} />
                        <Skeleton height={70} />
                        <Skeleton height={70} />
                    </>

                ) : atividades.length === 0 ? (

                    <Typography
                        color="text.secondary"
                    >
                        Nenhuma atividade encontrada.
                    </Typography>

                ) : (

                    atividades.map((atividade, index) => (

                        <Box
                            key={atividade.id}
                        >

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                }}
                            >

                                <Avatar
                                    sx={{
                                        bgcolor: obterCor(atividade.tipo),
                                        width: 40,
                                        height: 40,
                                    }}
                                >
                                    {obterIcone(atividade.tipo)}
                                </Avatar>

                                <Box
                                    sx={{
                                        flex: 1,
                                    }}
                                >

                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                        }}
                                    >
                                        {atividade.titulo}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {atividade.descricao}
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {formatarDataAtividade(
                                            atividade.dataHora
                                        )}
                                    </Typography>

                                </Box>

                            </Box>

                            {index < atividades.length - 1 && (

                                <Divider
                                    sx={{
                                        my: 2,
                                    }}
                                />

                            )}

                        </Box>

                    ))

                )}

            </CardContent>

        </Card>

    );

}

export default RecentActivities;