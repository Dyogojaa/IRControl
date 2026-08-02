import {
    Box,
    Divider,
    Stack,
    Typography
} from "@mui/material";

import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

import { brand } from "@/branding/brand";

const itens = [
    {
        icon: <FolderOutlinedIcon />,
        texto: "Centralize documentos e informações fiscais"
    },
    {
        icon: <AssignmentTurnedInOutlinedIcon />,
        texto: "Acompanhe pendências e organize sua declaração"
    },
    {
        icon: <ShieldOutlinedIcon />,
        texto: "Proteção e armazenamento seguro dos seus dados"
    },
    {
        icon: <VerifiedUserOutlinedIcon />,
        texto: "Plataforma desenvolvida para crescer com seu negócio"
    }
];

export default function LoginHero() {

    return (

        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                px: 6,
                py: 5,
                color: "white",
                overflow: "hidden",
                background:
                    "linear-gradient(180deg,#0F5132 0%,#198754 100%)"
            }}
        >

            <Stack
                sx={{
                    gap: 4
                }}
            >

                {/* Logo do Produto */}

                <Box
                    component="img"
                    src={brand.application.logo}
                    alt={brand.application.name}
                    sx={{
                        width: 340,
                        height: "auto",
                        objectFit: "contain"
                    }}
                />

                <Typography
                    variant="h6"
                    sx={{
                        opacity: .95,
                        fontWeight: 500,
                        mt: -1
                    }}
                >
                    {brand.application.slogan}
                </Typography>

                <Typography
                    sx={{
                        opacity: .85,
                        maxWidth: 520,
                        lineHeight: 1.8
                    }}
                >
                    Organize informações, acompanhe pendências e tenha
                    controle completo da sua declaração de Imposto de Renda
                    em uma plataforma moderna, segura e preparada para o futuro.
                </Typography>

                <Divider
                    sx={{
                        borderColor: "rgba(255,255,255,.15)"
                    }}
                />

                <Stack
                    sx={{
                        gap: 2.5
                    }}
                >

                    {itens.map(item => (

                        <Stack
                            key={item.texto}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 2
                            }}
                        >

                            {item.icon}

                            <Typography
                                sx={{
                                    fontSize: 16
                                }}
                            >
                                {item.texto}
                            </Typography>

                        </Stack>

                    ))}

                </Stack>

            </Stack>

            {/* Rodapé */}

            <Box
                sx={{
                    mt: "auto",
                    pt: 5
                }}
            >

                <Divider
                    sx={{
                        mb: 3,
                        borderColor: "rgba(255,255,255,.15)"
                    }}
                />

                <Typography
                    variant="caption"
                    sx={{
                        opacity: .75,
                        display: "block",
                        mb: 1
                    }}
                >
                    Powered by
                </Typography>

                <Box
                    component="img"
                    src={brand.company.logo}
                    alt={brand.company.name}
                    sx={{
                        width: 150,
                        height: "auto",
                        objectFit: "contain",
                        mb: 2
                    }}
                />

                <Typography
                    variant="body2"
                    sx={{
                        opacity: .75
                    }}
                >
                    {brand.company.slogan}
                </Typography>

                <Typography
                    variant="caption"
                    sx={{
                        opacity: .6,
                        display: "block",
                        mt: 1
                    }}
                >
                    Versão {brand.application.version} • © 2026 {brand.company.name}
                </Typography>

            </Box>

        </Box>

    );

}