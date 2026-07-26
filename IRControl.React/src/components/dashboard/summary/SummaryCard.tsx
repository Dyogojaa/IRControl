import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export interface SummaryCardProps {
    title: string;
    value: string;
    subtitle?: string;
    icon?: React.ReactNode;
}

export default function SummaryCard({
    title,
    value,
    subtitle,
    icon,
}: SummaryCardProps) {

    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                transition: "all .25s ease",

                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                },
            }}
        >
            <Box
                sx={{
                    height: 5,
                    bgcolor: "primary.main",
                }}
            />

            <CardContent>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {title}
                    </Typography>

                    <Box
                        sx={{
                            color: "primary.main",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {icon ?? <TrendingUpIcon fontSize="small" />}
                    </Box>

                </Box>

                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        lineHeight: 1,
                        mb: 2,
                    }}
                >
                    {value}
                </Typography>

                <Divider sx={{ mb: 1.5 }} />

                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    {subtitle ?? "Atualizado em tempo real"}
                </Typography>

            </CardContent>

        </Card>
    );
}