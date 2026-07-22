import {
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";
import type { ReactNode } from "react";

interface DashboardCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: ReactNode;
}

function DashboardCard({
    title,
    value,
    subtitle,
    icon
}: DashboardCardProps) {
    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                height: "100%"
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mt: 1,
                            }}
                        >
                            {value}
                        </Typography>

                        {subtitle && (
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {subtitle}
                            </Typography>
                        )}
                    </Box>

                    <Box
                        sx={{
                            fontSize: 42
                        }}
                    >
                        {icon}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default DashboardCard;