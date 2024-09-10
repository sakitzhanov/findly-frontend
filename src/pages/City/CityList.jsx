import { Box, Grid, Typography, Button, Snackbar, Alert } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useTranslation } from "react-i18next";
import { citiesApi } from "../../dal/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSuccessCreate, setSuccessDelete, setSuccessUpdate } from "../../redux/cityListReducer";
import { setUnsuccessCreate } from "../../redux/regionListReducer";

const CityList = () => {
    const { t } = useTranslation();
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();
    const { successCreate, unsuccessCreate, successUpdate, unsuccessUpdate, successDelete, unsuccessDelete,  } = useSelector((state) => state.cityList);
    const dispatch = useDispatch();
    const currentLanguage = localStorage.getItem("i18nextLng");

    useEffect(() => {
        async function fetch() {
            const res = await citiesApi.search();
            setCities(res.data);
        }

        fetch();
    }, [])

    return (
        <Layout>
            <Typography variant="h2" gutterBottom>
                {t('city_list.title')}
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t('city_list.name_column')}</TableCell>
                                    <TableCell align="right">{t('city_list.region_column')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cities.length !== 0 && cities.map(city => (
                                    <TableRow
                                        key={city.id}
                                        sx={{
                                            '&:last-child td, &:last-child th': {
                                                border: 0
                                            },
                                            cursor: 'pointer'
                                        }}
                                        hover
                                        onClick={() => navigate(`/cities/${city.id}`)}
                                    >
                                        <TableCell component="th" scope="row">
                                            {city.translations.find(item => item.language.code === currentLanguage).name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {city.region.translations.find(item => item.language.code === currentLanguage).name}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {cities.length === 0 && <TableRow>
                                    <TableCell colSpan={2} align="center">
                                        {t('no_data')}
                                    </TableCell>
                                </TableRow>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={() => navigate("/cities/create")}>{t('region_list.add_button')}</Button>
                </Grid>
            </Grid>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={successCreate} autoHideDuration={3000} onClose={() => dispatch(setSuccessCreate(false))}>
                <Alert
                    onClose={() => dispatch(setSuccessCreate(false))}
                    severity="success"
                    variant="standard"
                    sx={{ width: '100%' }}
                >
                    {t('success_create_message')}
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={unsuccessCreate} autoHideDuration={3000} onClose={() => dispatch(setUnsuccessCreate(false))}>
                <Alert
                    onClose={() => dispatch(setUnsuccessCreate(false))}
                    severity="error"
                    variant="standard"
                    sx={{ width: '100%' }}
                >
                    {t('unsuccess_create_message')}
                </Alert>
            </Snackbar>         
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={successUpdate} autoHideDuration={3000} onClose={() => dispatch(setSuccessUpdate(false))}>
                <Alert
                    onClose={() => dispatch(setSuccessUpdate(false))}
                    severity="success"
                    variant="standard"
                    sx={{ width: '100%' }}
                >
                    {t('success_create_message')}
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={successDelete} autoHideDuration={3000} onClose={() => dispatch(setSuccessDelete(false))}>
                <Alert
                    onClose={() => dispatch(setSuccessDelete(false))}
                    severity="success"
                    variant="standard"
                    sx={{ width: '100%' }}
                >
                    {t('success_delete_message')}
                </Alert>
            </Snackbar>
        </Layout>
    )
}

export default CityList;