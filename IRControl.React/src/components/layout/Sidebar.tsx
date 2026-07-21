import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";

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

function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: DRAWER_WIDTH,
                    border: 0,
                    bgcolor: "secondary.main",
                    color: "#FFF",
                    boxSizing: "border-box",
                },
            }}
        >
            <Logo />

            <Divider
                sx={{
                    borderColor: "rgba(255,255,255,.08)",
                }}
            />

            <List sx={{ mt: 1 }}>

                <MenuItem
                    text="Dashboard"
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
                    borderColor: "rgba(255,255,255,.08)",
                }}
            />

            <List>

                <MenuItem
                    text="Configurações"
                    icon={<SettingsRoundedIcon />}
                    path="/configuracoes"
                />

            </List>

        </Drawer>
    );
}

export default Sidebar;