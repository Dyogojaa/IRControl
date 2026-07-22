import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "light",

        primary: {
            main: "#1976D2",
        },

        secondary: {
            main: "#0F172A",
        },

        background: {
            default: "#F5F7FA",
            paper: "#FFFFFF",
        },
    },

    // ADICIONE ESTE BLOCO
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#E8F5E9",
                    borderRight: "1px solid #C8E6C9",
                },
            },
        },
    },

    shape: {
        borderRadius: 12,
    },

    typography: {
        fontFamily: [
            "Inter",
            "Segoe UI",
            "Roboto",
            "Arial",
            "sans-serif",
        ].join(","),

        h4: {
            fontWeight: 700,
        },

        h5: {
            fontWeight: 600,
        },

        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },
});