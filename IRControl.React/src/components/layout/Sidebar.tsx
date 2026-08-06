import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

import Logo from "./Logo";
import MenuItem from "./MenuItem";

import { DRAWER_WIDTH } from "@/config/layout";
import { brand } from "@/branding/brand";

function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: DRAWER_WIDTH,
                    boxSizing: "border-box",
                    border: 0,

                    bgcolor: "#69a56d",
                    color: "#FFF",

                    borderRight: "1px solid #94c998",

                    display: "flex",
                    flexDirection: "column",
                },
            }}
        >
            <Logo />

            <Divider
                sx={{
                    borderColor: "rgba(255,255,255,.15)",
                }}
            />

            <List sx={{ mt: 1 }}>
                <MenuItem
                    text="Painel"
                    icon={<DashboardRoundedIcon />}
                    path="/"
                />

                <MenuItem
                    text="Holerites"
                    icon={<ReceiptLongRoundedIcon />}
                    path="/holerites"
                />

                <MenuItem
                    text="Dependentes"
                    icon={<GroupsRoundedIcon />}
                    path="/dependentes"
                />

                <MenuItem
                    text="Despesas Médicas"
                    icon={<MedicalServicesRoundedIcon />}
                    path="/despesas"
                />

                <MenuItem
                    text="Informes"
                    icon={<DescriptionRoundedIcon />}
                    path="/informes"
                />

                <MenuItem
                    text="Auditoria"
                    icon={<FactCheckRoundedIcon />}
                    path="/auditoria"
                />
            </List>

            <Box sx={{ flexGrow: 1 }} />

            <Divider
                sx={{
                    borderColor: "rgba(255,255,255,.15)",
                }}
            />

            <List>
                <MenuItem
                    text="Configurações"
                    icon={<SettingsRoundedIcon />}
                    path="/configuracoes"
                />
            </List>

            <Box
                sx={{
                    px: 2.5,
                    pb: 2,
                    pt: 1.5,
                }}
            >
                <Typography
                    variant="caption"
                    sx={{
                        display: "block",
                        fontWeight: 700,
                        color: "rgba(255,255,255,.90)",
                    }}
                >
                    Versão {brand.application.version}
                </Typography>

                <Typography
                    variant="caption"
                    sx={{
                        display: "block",
                        mt: .5,
                        color: "rgba(255,255,255,.65)",
                    }}
                >
                    © 2026 {brand.company.name}
                </Typography>
            </Box>
        </Drawer>
    );
}

export default Sidebar;