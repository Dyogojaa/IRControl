import {
    Box,
    Divider,
    Typography,
} from "@mui/material";

import type { SectionTitleProps } from "./SectionTitle.types";

export default function SectionTitle({
    title,
    subtitle,
    action,
}: SectionTitleProps) {

    return (
        <Box sx={{ mb: 3 }}>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                }}
            >
                <Box>

                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 600 }}
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

                {action}

            </Box>

            <Divider />

        </Box>
    );
}