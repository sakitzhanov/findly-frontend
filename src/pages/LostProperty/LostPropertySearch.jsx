import React from "react";
import { Button, Grid, Typography } from '@mui/material';
import CitySelect from "../../components/CitySelect";
import CategorySelect from "../../components/CategorySelect";
import Layout from "../../components/Layout";

const LostPropertyCreate = () => {
    return (
        <Layout>
            <Typography variant="h2" gutterBottom>
                Поиск
            </Typography>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={4}>
                    <CategorySelect />
                </Grid>
                <Grid item xs={4}>
                    <CitySelect />
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained">Искать</Button>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default LostPropertyCreate;