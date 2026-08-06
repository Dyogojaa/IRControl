import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { brand } from "@/branding/brand";

function Logo() {

    return (
            <Box
                sx={{
                    height: 140,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    pt: 2,
                    pb: 2
                }}
            >

            <Box
                component="img"
                src={brand.application.logo}
                alt={brand.application.name}
                sx={{
                    width: 150,
                    height: "auto",
                    objectFit: "contain"
                }}
            />

            <Typography
                variant="caption"
                sx={{
                    mt: .3,
                    ml: .5,
                    color: "rgba(255,255,255,.70)",
                    letterSpacing: .8,
                    fontWeight: 500
                }}
            >
                by {brand.company.name}
            </Typography>

        </Box>

    );

}

export default Logo;