import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Link as RouterLink, useLocation } from "react-router-dom";

import type { ReactNode } from "react";

interface MenuItemProps {
    text: string;
    icon: ReactNode;
    path: string;
}

function MenuItem({ text, icon, path }: MenuItemProps) {

    const location = useLocation();

    const selected = location.pathname === path;

    return (

        <ListItemButton
            component={RouterLink}
            to={path}
            selected={selected}
            sx={{

                mx: 1,
                mb: .5,
                borderRadius: 2,

                color: "#FFF",

                "& .MuiListItemIcon-root": {
                    color: "#FFF",
                },

                "&.Mui-selected": {
                    bgcolor: "primary.main",
                },

                "&.Mui-selected:hover": {
                    bgcolor: "primary.dark",
                },

                "&:hover": {
                    bgcolor: "rgba(255,255,255,.08)",
                },

            }}
        >

            <ListItemIcon>

                {icon}

            </ListItemIcon>

            <ListItemText primary={text} />

        </ListItemButton>

    );

}

export default MenuItem;