import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import React from "react";
import Header from "./Header";
import Footer from "./Footer"

const Layout = (props) => {
    return (
        <Box className="App">
            <CssBaseline />                
            <Header />
            <Box>
                <Toolbar />
                <Container>
                    {props.children}
                </Container>
            </Box>
            <Footer className="Footer" />
        </Box>
    )
}

export default Layout;