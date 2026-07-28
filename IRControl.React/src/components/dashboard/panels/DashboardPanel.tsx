import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import type { ReactNode } from "react";

interface DashboardPanelProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
}

export default function DashboardPanel({
    title,
    subtitle,
    children,
}: DashboardPanelProps) {
    return (
        <Paper
            elevation={0}
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",

                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                p: 3,

                transition: ".2s",

                "&:hover": {
                    boxShadow: 3,
                },
            }}
        >

            <Box sx={{ mb: 3 }}>

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                    }}
                >
                    {title}
                </Typography>

                {subtitle && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {subtitle}
                    </Typography>
                )}

            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                }}
            >
                {children}
            </Box>

        </Paper>
    );
}