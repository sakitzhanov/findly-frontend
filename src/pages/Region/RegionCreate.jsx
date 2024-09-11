import React, { useEffect, useState } from "react";
import { Backdrop, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import Layout from "../../components/Layout";
import { languagesApi, regionsApi } from "../../dal/api";
import { useTranslation } from "react-i18next";
import { setSuccessCreate } from "../../redux/regionListReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegionCreate = () => {
    const { control, handleSubmit, formState: { errors }, getValues } = useForm();
    const [languages, setLanguages] = useState([]);
    const [loader, setLoader] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetch() {
            const res = await languagesApi.search();
            setLanguages(res.data);
        }

        fetch();
    }, [])

    const onSubmit = async () => {
        const data = getValues();
        const translations = Object.keys(data).filter((fieldName) => fieldName.includes("name")).map((fieldName) => ({
            name: data[fieldName],
            language: languages.find(lang => fieldName.includes(lang.code))
        }));

        const result = {
            code: data.code,
            translations
        };

        console.log(JSON.stringify(result));

        setLoader(true);

        try {
            const res = await regionsApi.create(result);

            console.log(res);

            if (res.status === 201) {
                setLoader(false);
                navigate("/regions");
                dispatch(setSuccessCreate(true));
            }
        } catch (e) {
            console.log(e);
            setLoader(false);
        }
    };

    return (
        <Layout>
            <Typography variant="h2" gutterBottom>
                {t('region_create.title')}
            </Typography>
            <Grid container spacing={4}>
                {languages.map((item, index) => (
                    <Grid key={index} item xs={12}>
                        <Controller
                            control={control}
                            name={`name_${item.code}`}
                            rules={{
                                required: t('region_create.required_message')
                            }}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    label={`${t('region_create.name_field')} (${item.name})`}
                                    sx={{ width: '50%' }}
                                    error={!!errors[`name_${item.code}`]}
                                    helperText={errors[`name_${item.code}`]?.message}
                                />
                            )}
                        />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name="code"
                        rules={{
                            required: t('region_create.required_message')
                        }}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                label={t('region_create.code_field')}
                                sx={{ width: '50%' }}
                                error={!!errors.code}
                                helperText={errors.code?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" onClick={handleSubmit(onSubmit)} variant="contained">{t('region_create.save_button')}</Button>
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

export default RegionCreate;