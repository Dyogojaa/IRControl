import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import type { SectionCardProps } from "./SectionCard.types";

export default function SectionCard({
    title,
    icon,
    collapsible = false,
    children,
}: SectionCardProps) {

    return (

        <Paper
            elevation={2}
            sx={{
                borderRadius: 3,
                overflow: "hidden",
                mb: 3,
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 3,
                    py: 2,
                    bgcolor: "grey.100",
                }}
            >

                {icon}

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                    }}
                >
                    {title}
                </Typography>

            </Box>

            <Divider />

            <Box
                sx={{
                    p: 3,
                }}
            >

                {children}

            </Box>

        </Paper>

    );

}