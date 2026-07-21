import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface SummaryCardProps {
    title: string;
    value: string | number;
}

function SummaryCard({ title, value }: SummaryCardProps) {
    return (
        <Card elevation={3}>
            <CardContent>
                <Typography
                    variant="subtitle2"
                    color="text.secondary"
                >
                    {title}
                </Typography>

                <Typography
                    variant="h4"
                    sx={{ mt: 1 }}
                >
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default SummaryCard;