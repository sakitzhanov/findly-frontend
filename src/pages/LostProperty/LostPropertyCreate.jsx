import React from "react";
import { Button, Grid, TextField, Typography } from '@mui/material';
import CitySelect from "../../components/CitySelect";
import CategorySelect from "../../components/CategorySelect";
import LocationSelect from "../../components/LocationSelect";
import Layout from "../../components/Layout";

const LostPropertyCreate = () => {
    return (
        <Layout>
            <Typography variant="h2" gutterBottom>
                Создать
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <TextField variant="outlined" label="Название" sx={{ width: '60%' }} />
                </Grid>
                <Grid item xs={12}>
                    <CategorySelect sx={{ width: '30%' }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" label="Описание" sx={{ width: '60%' }} multiline rows={6} maxRows={6} />
                </Grid>
                <Grid item xs={12}>
                    <CitySelect sx={{ width: '30%' }} />
                </Grid>
                <Grid item xs={12}>
                    <LocationSelect />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained">Опубликовать</Button>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default LostPropertyCreate;