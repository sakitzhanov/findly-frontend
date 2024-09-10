import { Box, Typography } from "@mui/material";
import React from "react";
import Layout from "../components/Layout";
import { useTranslation } from "react-i18next";

const Home = () => {
    const { t } = useTranslation();

    return (
        <Layout>
            <Box>
                <Typography variant="h3">{t('home.title', { count: 50 })}</Typography>
            </Box>
        </Layout>
    )
}

export default Home;