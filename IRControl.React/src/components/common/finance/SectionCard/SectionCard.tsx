import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import type { SectionCardProps } from "./SectionCard.types";

export default function SectionCard({
    title,
    icon,
    collapsible = false,
    children,
}: SectionCardProps) {

    // TODO: Implementar suporte ao modo collapsible.
    void collapsible;

    return (

        <Paper
            elevation={1}
            sx={{
                width: "100%",
                borderRadius: 3,
                overflow: "hidden",
                bgcolor: "background.paper",
                transition: "all .2s ease",
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,

                    px: 3,
                    py: 1.75,

                    minHeight: 60,

                    bgcolor: "grey.50",

                    borderBottom: 1,
                    borderColor: "divider",
                }}
            >

                {icon && (

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                            color: "text.secondary",

                            "& svg": {
                                fontSize: 28,
                            },
                        }}
                    >
                        {icon}
                    </Box>

                )}

                <Typography
                    variant="h6"
                    sx={{
                        flex: 1,
                        fontWeight: 700,
                        fontSize: "1.25rem",
                        color: "text.primary",
                        letterSpacing: ".2px",
                    }}
                >
                    {title}
                </Typography>

            </Box>

            <Box
                sx={{
                    px: 3,
                    py: 2.5,
                    width: "100%",
                }}
            >

                {children}

            </Box>

        </Paper>

    );

}