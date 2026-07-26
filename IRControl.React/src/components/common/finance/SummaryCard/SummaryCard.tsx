import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { SummaryCardProps } from "./SummaryCard.types";
import MoneyDisplay from "../MoneyDisplay/MoneyDisplay";

export default function SummaryCard({
    title,
    icon,
    items,
}: SummaryCardProps) {

    

    return (

        <Paper
            elevation={2}
            sx={{
                borderRadius: 3,
                overflow: "hidden",
                height: "100%",
            }}
        >

            <Box
                sx={{
                    px: 3,
                    py: 2,
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                }}
            >

                <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
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

            </Box>

            <Stack
                spacing={0}
            >

                {items.map((item, index) => (

                    <Box key={item.label}>

                        <Box
                            sx={{
                                px: 3,
                                py: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {item.label}
                            </Typography>

                        <MoneyDisplay
                            value={item.value}
                            variant={item.highlight ? "h6" : "body1"}
                            color={item.highlight ? "success.main" : "text.primary"}
                            bold
                        />

                        </Box>

                        {index < items.length - 1 && (
                            <Divider />
                        )}

                    </Box>

                ))}

            </Stack>

        </Paper>

    );

}