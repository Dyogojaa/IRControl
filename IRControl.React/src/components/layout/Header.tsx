import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";

import {
    DRAWER_WIDTH,
    HEADER_HEIGHT,
} from "@/config/layout";

function Header() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const { notifications } =
        useNotifications();

    const [anchorEl, setAnchorEl] =
        useState<null | HTMLElement>(null);

    const [notificationAnchor, setNotificationAnchor] =
        useState<HTMLElement | null>(null);

    const open = Boolean(anchorEl);

    const notificationOpen =
        Boolean(notificationAnchor);

    function handleOpenMenu(
        event: React.MouseEvent<HTMLElement>
    ) {

        setAnchorEl(event.currentTarget);

    }

    function handleCloseMenu() {

        setAnchorEl(null);

    }

    function handleLogout() {

        handleCloseMenu();

        logout();

        navigate("/login");

    }

    function handleConfiguracoes() {

        handleCloseMenu();

        navigate("/configuracoes");

    }

    function handleOpenNotifications(
        event: React.MouseEvent<HTMLElement>
    ) {

        setNotificationAnchor(event.currentTarget);

    }

    function handleCloseNotifications() {

        setNotificationAnchor(null);

    }

    function handleNotificationClick() {

        handleCloseNotifications();

        navigate("/auditoria");

    }

    function getNotificationIcon(tipo: string) {

        switch (tipo) {

            case "error":

                return (
                    <ErrorOutlineRoundedIcon
                        color="error"
                        fontSize="small"
                    />
                );

            case "warning":

                return (
                    <WarningAmberRoundedIcon
                        color="warning"
                        fontSize="small"
                    />
                );

            default:

                return (
                    <InfoOutlinedIcon
                        color="info"
                        fontSize="small"
                    />
                );

        }

    }

    function formatNotificationDescription(
        descricao: string
    ) {

        return descricao
            .replace(
                "inconsistência(s) encontrada(s)",
                "inconsistências encontradas"
            )
            .replace(
                "inconsistencia(s) encontrada(s)",
                "inconsistências encontradas"
            );

    }

    return (

        <AppBar
            position="fixed"
            elevation={1}
            color="inherit"
            sx={{
                height: HEADER_HEIGHT,
                width: `calc(100% - ${DRAWER_WIDTH}px)`,
                ml: `${DRAWER_WIDTH}px`,
                bgcolor: "background.paper",
                borderBottom: "1px solid",
                borderColor: "divider",
            }}
        >

            <Toolbar
                sx={{
                    height: HEADER_HEIGHT,
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                    }}
                />

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                    }}
                >

                    <IconButton
                        onClick={handleOpenNotifications}
                    >

                        <Badge
                            badgeContent={notifications.length}
                            color="error"
                        >

                            <NotificationsOutlinedIcon />

                        </Badge>

                    </IconButton>

                    <Box
                        onClick={handleOpenMenu}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            cursor: "pointer",
                            borderRadius: 2,
                            px: 1,
                            py: 0.5,
                            transition: ".2s",

                            "&:hover": {
                                backgroundColor: "action.hover",
                            },
                        }}
                    >

                        <Typography
                            sx={{
                                fontWeight: 500,
                            }}
                        >
                            {user?.nome ?? "Usuário"}
                        </Typography>

                        <Avatar
                            sx={{
                                width: 36,
                                height: 36,
                                bgcolor: "primary.main",
                            }}
                        >
                            {user?.nome?.charAt(0).toUpperCase() ?? "U"}
                        </Avatar>

                    </Box>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >

                        <MenuItem
                            onClick={handleCloseMenu}
                        >

                            <ListItemIcon>

                                <PersonOutlineRoundedIcon
                                    fontSize="small"
                                />

                            </ListItemIcon>

                            Meu Perfil

                        </MenuItem>

                        <MenuItem
                            onClick={handleConfiguracoes}
                        >

                            <ListItemIcon>

                                <SettingsOutlinedIcon
                                    fontSize="small"
                                />

                            </ListItemIcon>

                            Configurações

                        </MenuItem>

                        <Divider />

                        <MenuItem
                            onClick={handleLogout}
                        >

                            <ListItemIcon>

                                <LogoutRoundedIcon
                                    fontSize="small"
                                />

                            </ListItemIcon>

                            Sair

                        </MenuItem>

                    </Menu>

                    <Popover
                        open={notificationOpen}
                        anchorEl={notificationAnchor}
                        onClose={handleCloseNotifications}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        slotProps={{
                            paper: {
                                sx: {
                                    width: 360,
                                    borderRadius: 2,
                                },
                            },
                        }}
                    >

                        <Box
                            sx={{
                                p: 2,
                                borderBottom: "1px solid",
                                borderColor: "divider",
                            }}
                        >

                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 600,
                                }}
                            >
                                Notificações
                            </Typography>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Pendências da declaração
                            </Typography>

                        </Box>

                        {notifications.length === 0 ? (

                            <Box
                                sx={{
                                    p: 3,
                                    textAlign: "center",
                                }}
                            >

                                <Typography
                                    color="text.secondary"
                                >
                                    Nenhuma pendência encontrada.
                                </Typography>

                            </Box>

                        ) : (

                            <List
                                disablePadding
                            >

                                {notifications.map(
                                    (item, index) => (

                                        <ListItem
                                            disablePadding
                                            key={`${item.titulo}-${index}`}
                                        >

                                            <ListItemButton
                                                onClick={
                                                    handleNotificationClick
                                                }
                                            >

                                                <ListItemIcon>

                                                    {getNotificationIcon(
                                                        item.tipo
                                                    )}

                                                </ListItemIcon>

                                                <ListItemText
                                                    primary={
                                                        item.titulo
                                                    }
                                                    secondary={
                                                        formatNotificationDescription(
                                                            item.descricao
                                                        )
                                                    }
                                                />

                                            </ListItemButton>

                                        </ListItem>

                                    )
                                )}

                            </List>

                        )}

                    </Popover>

                </Box>

            </Toolbar>

        </AppBar>

    );
}

export default Header;