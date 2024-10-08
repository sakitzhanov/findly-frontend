import React, { useEffect, useState } from "react";
import { Backdrop, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { useForm, Controller, useWatch } from "react-hook-form";
import Layout from "../../components/Layout";
import { languagesApi, categoriesApi } from "../../dal/api";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import DialogWindow from "../../components/DialogWindow";
import { useDispatch } from "react-redux";
import { setSuccessDelete, setSuccessUpdate } from "../../redux/regionListReducer";

const CategoryDetails = () => {
    const { control,  handleSubmit, formState: { errors }, getValues } = useForm();
    const [languages, setLanguages] = useState([]);
    const [data, setData] = useState(null);
    const [loader, setLoader] = useState(false);
    const [updateEnabled, setUpdateEnabled] = useState(false);
    const currentLanguage = localStorage.getItem("i18nextLng");
    const { id } = useParams();
    const { t } = useTranslation();
    const fields = useWatch({
        control
    });
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetch() {            
            const resultLang = await languagesApi.search();
            setLanguages(resultLang.data);

            const resultData = await categoriesApi.get(id);
            setData(resultData.data);
        }

        fetch();
    }, [id]);

    useEffect(() => {
        if (data) {
            const isChanged = data.translations.some(item => fields[`name_${item.language.code}`] !== item.name);
            setUpdateEnabled(isChanged);
        }

    }, [fields]);

    const handleUpdateSubmit = async () => {
        const submitData = getValues();
        const translations = Object.keys(submitData).filter((fieldName) => fieldName.includes("name")).map((fieldName) => ({
            name: submitData[fieldName],
            language: languages.find(lang => fieldName.includes(lang.code))
        }));

        const result = {
            id: id,
            translations
        };

        setLoader(true);

        try {
            const res = await categoriesApi.update(result);

            if (res.status === 200) {
                setLoader(false);
                navigate("/categories");
                dispatch(setSuccessUpdate(true));
            }
        } catch (e) {
            console.log(e);
            setLoader(false);
        }
    }

    const handleDeleteSubmit = async (id) => {
        setOpenDeleteDialog(false);
        setLoader(true);

        try {
            const res = await categoriesApi.delete(id);

            if (res.status === 200) {
                setLoader(false);
                navigate("/categories");
                dispatch(setSuccessDelete(true));
            }
        } catch (e) {
            console.log(e);
            setLoader(false);
        }
    }

    return (
        <Layout>
            <Typography variant="h2" gutterBottom>
                {data && data.translations.find(item => item.language.code === currentLanguage).name}
            </Typography>
            <Grid container spacing={4}>
                {data && data.translations.map((item, index) => (
                    <Grid key={index} item xs={12}>
                        <Controller
                            control={control}
                            name={`name_${item.language.code}`}
                            rules={{
                                required: t('category_details.required_message'),
                                // minLength: {
                                //     value: 7,
                                //     message: t('region_create_min', { count: 7 })
                                // }
                            }}
                            defaultValue={item.name}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    label={`${t('category_details.name_field')} (${item.language.name})`}
                                    sx={{ width: '60%' }}
                                    error={!!errors[`name_${item.language.code}`]}
                                    helperText={errors[`name_${item.language.code}`]?.message}
                                />
                            )}
                        />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button
                                type="submit"
                                onClick={() => setOpenUpdateDialog(true)}
                                variant="contained"
                                disabled={!updateEnabled}
                            >
                                {t('category_details.update_button')}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                type="submit"
                                onClick={() => setOpenDeleteDialog(true)}
                                variant="contained"
                                color="error"
                            >
                                {t('category_details.delete_button')}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <DialogWindow
                open={openUpdateDialog}
                handleSubmit={handleSubmit(handleUpdateSubmit)}
                handleClose={() => setOpenUpdateDialog(false)}
                content={t('category_details.update_dialog_content')}
            />
            <DialogWindow
                open={openDeleteDialog}
                handleSubmit={() => { handleDeleteSubmit(id) }}
                handleClose={() => setOpenDeleteDialog(false)}
                content={t('category_details.delete_dialog_content')}
            />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Layout>
    )
}

export default CategoryDetails;