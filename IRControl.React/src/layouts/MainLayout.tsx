import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                bgcolor: "background.default",
            }}
        >
            <Header />

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                }}
            >
                <Toolbar />

                <Outlet />
            </Box>
        </Box>
    );
}

export default MainLayout;