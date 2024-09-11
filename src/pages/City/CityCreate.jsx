import React, { useEffect, useState } from "react";
import { Backdrop, Button, CircularProgress, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import Layout from "../../components/Layout";
import { languagesApi, citiesApi, regionsApi } from "../../dal/api";
import { useTranslation } from "react-i18next";
import { setSuccessCreate, setUnsuccessCreate } from "../../redux/regionListReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CityCreate = () => {
    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm();
    const [languages, setLanguages] = useState([]);
    const [regions, setRegions] = useState([]);
    const [loader, setLoader] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentLanguage = localStorage.getItem("i18nextLng");

    useEffect(() => {
        async function fetch() {
            const resultLang = await languagesApi.search();
            setLanguages(resultLang.data);

            const resultReg = await regionsApi.search();
            setRegions(resultReg.data);
        }

        fetch();
    }, []);

    useEffect(() => {
        if (regions.length > 0)
            setValue("region", regions[0].id);
    }, [regions, setValue])

    const onSubmit = async () => {
        const data = getValues();

        const translations = Object.keys(data).filter((fieldName) => fieldName.includes("name")).map((fieldName) => ({
            name: data[fieldName],
            language: languages.find(lang => fieldName.includes(lang.code))
        }));

        const result = {
            region: regions.find(region => data.region === region.id),
            latitude: 0.0,
            longitude: 0.0,
            translations
        };

        setLoader(true);

        try {
            const res = await citiesApi.create(result);

            console.log(res);

            if (res.status === 201) {
                setLoader(false);
                navigate("/cities");
                dispatch(setSuccessCreate(true));
            }
        } catch (e) {
            setLoader(false);
            navigate("/cities");
            dispatch(setUnsuccessCreate(true));
        }
    };

    return (
        <Layout>
            <Typography variant="h2" gutterBottom>
                {t('city_create.title')}
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Controller
                        control={control}
                        name="region"
                        rules={{
                            required: t('city_create.required_message')
                        }}
                        render={({ field }) => (
                            <FormControl fullWidth error={errors.region?.id}>
                                <InputLabel id="demo-simple-select-label">{t('city_create.region_field')}</InputLabel>
                                <Select
                                    {...field}
                                    labelId="demo-simple-select-label"
                                    label={t('city_create.region_field')}
                                    value={field.value || ""}
                                >
                                    {regions.map((item, index) => (
                                        <MenuItem key={item.id} value={item.id}>{item.translations.find(item => item.language.code === currentLanguage)?.name}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.region?.message}</FormHelperText>
                            </FormControl>
                            // <TextField variant="outlined" label={t('city_create.region_field')} sx={{ width: '60%' }} error={errors.code} helperText={errors.code?.message} {...field} />
                        )}
                    />
                </Grid>
                {languages.map((item, index) => (
                    <Grid key={item.id} item xs={12}>
                        <Controller
                            control={control}
                            name={`name_${item.code}`}
                            rules={{
                                required: t('city_create.required_message')
                            }}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    label={`${t('city_create.name_field')} (${item.name})`}
                                    sx={{ width: '50%' }}
                                    error={!!errors[`name_${item.code}`]}
                                    helperText={errors[`name_${item.code}`]?.message}
                                />
                            )}
                        />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Button type="submit" onClick={handleSubmit(onSubmit)} variant="contained">{t('city_create.save_button')}</Button>
                </Grid>
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Layout>
    )
}

export default CityCreate;