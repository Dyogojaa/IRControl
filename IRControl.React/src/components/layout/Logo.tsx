import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Logo() {
    return (
        <Box
            sx={{
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    color: "#FFF",
                    fontWeight: 700,
                    letterSpacing: 1,
                }}
            >
                IRControl
            </Typography>
        </Box>
    );
}

export default Logo;