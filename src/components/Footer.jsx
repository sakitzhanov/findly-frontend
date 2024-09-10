import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import React from "react";

const Footer = ({ className }) => {
    return (
        <Box className={className}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="body2">
                        Footer
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Footer;