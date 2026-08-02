import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { DRAWER_WIDTH, HEADER_HEIGHT } from "@/config/layout";

function Header() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

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
                borderColor: "divider"
            }}
        >

            <Toolbar
                sx={{
                    height: HEADER_HEIGHT,
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >

                    <IconButton>

                        <MenuRoundedIcon />

                    </IconButton>

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700
                        }}
                    >
                        Dashboard
                    </Typography>

                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >

                    <IconButton>

                        <Badge
                            badgeContent={2}
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
                            py: .5,
                            transition: ".2s",

                            "&:hover": {
                                backgroundColor: "action.hover"
                            }
                        }}
                    >

                        <Typography
                            sx={{
                                fontWeight: 500
                            }}
                        >
                            {user?.nome ?? "Usuário"}
                        </Typography>

                        <Avatar
                            sx={{
                                width: 36,
                                height: 36,
                                bgcolor: "primary.main"
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
                            horizontal: "right"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
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
                            onClick={handleCloseMenu}
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

                </Box>

            </Toolbar>

        </AppBar>

    );

}

export default Header;