import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import { HEADER_HEIGHT, DRAWER_WIDTH } from "@/config/layout";

function Header() {
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
                >
                    <IconButton>
                        <MenuRoundedIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        Dashboard
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <IconButton>
                        <Badge badgeContent={2} color="error">
                            <NotificationsOutlinedIcon />
                        </Badge>
                    </IconButton>

                    <Typography
                        sx={{
                            fontWeight: 500,
                        }}
                    >
                        Dyogo
                    </Typography>

                    <Avatar
                        sx={{
                            width: 36,
                            height: 36,
                            bgcolor: "primary.main",
                        }}
                    >
                        D
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;