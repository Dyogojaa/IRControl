import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText
} from "@mui/material";

function RecentActivities() {
    return (
        <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Últimas Atualizações
                </Typography>

                <List>
                    <ListItem>
                        <ListItemText
                            primary="Holerite de Junho importado"
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemText
                            primary="Dependente atualizado"
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemText
                            primary="3 despesas aguardando classificação"
                        />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
}

export default RecentActivities;