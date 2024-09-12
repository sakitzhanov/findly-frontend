import React, { useEffect, useState } from "react";
import { Backdrop, Button, CircularProgress, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useForm, Controller, useWatch } from "react-hook-form";
import Layout from "../../components/Layout";
import { languagesApi, subcategoriesApi, categoriesApi } from "../../dal/api";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import DialogWindow from "../../components/DialogWindow";
import { useDispatch } from "react-redux";
import { setSuccessUpdate, setSuccessDelete } from "../../redux/cityListReducer";

const SubcategoryDetails = () => {
    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm();
    const [languages, setLanguages] = useState([]);
    const [categories, setCategories] = useState([]);
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

            const resultReg = await categoriesApi.search();
            setCategories(resultReg.data);

            const resultData = await subcategoriesApi.get(id);
            setData(resultData.data);
        }

        fetch();
    }, [id]);

    useEffect(() => {
        if (data) {
            const isChanged = fields.code !== data.code ||
                data.translations.some(item => fields[`name_${item.language.code}`] !== item.name) ||
                fields.category !== data.category.id;
            setUpdateEnabled(isChanged);
        }

    }, [fields]);

    useEffect(() => {
        if (data) {
            setValue("category", data.category.id);
        }
    }, [data]);

    const handleUpdateSubmit = async () => {
        const submitData = getValues();

        const translations = Object.keys(submitData).filter((fieldName) => fieldName.includes("name")).map((fieldName) => ({
            name: submitData[fieldName],
            language: languages.find(lang => fieldName.includes(lang.code))
        }));

        console.log(submitData.category);

        const result = {
            id: id,
            category: categories.find(category => submitData.category === category.id),
            translations
        };

        setLoader(true);

        try {
            const res = await subcategoriesApi.update(result);

            if (res.status === 200) {
                setLoader(false);
                navigate("/subcategories");
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
            const res = await subcategoriesApi.delete(id);

            if (res.status === 200) {
                setLoader(false);
                navigate("/subcategories");
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
                {data &&
                    <Grid item xs={6}>
                        <Controller
                            control={control}
                            name="category"
                            rules={{
                                required: t('subcategory_details.required_message')
                            }}
                            render={({ field }) => (
                                <FormControl fullWidth error={errors.category?.id}>
                                    <InputLabel id="demo-simple-select-label">{t('subcategory_details.category_field')}</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="demo-simple-select-label"
                                        label={t('subcategory_details.category_field')}
                                        value={field.value || ""}
                                    >
                                        {categories.map((item, index) => (
                                            <MenuItem key={item.id} value={item.id}>{item.translations.find(item => item.language.code === currentLanguage)?.name}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errors.category?.message}</FormHelperText>
                                </FormControl>
                                // <TextField variant="outlined" label={t('city_create.category_field')} sx={{ width: '60%' }} error={errors.code} helperText={errors.code?.message} {...field} />
                            )}
                        />
                    </Grid>
                }
                {data && data.translations.map((item, index) => (
                    <Grid key={index} item xs={12}>
                        <Controller
                            control={control}
                            name={`name_${item.language.code}`}
                            rules={{
                                required: t('subcategory_details.required_message'),
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
                                    label={`${t('region_details.name_field')} (${item.language.name})`}
                                    sx={{ width: '60%' }}
                                    error={errors[`name_${item.language.code}`]}
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
                                {t('region_details.update_button')}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                type="submit"
                                onClick={() => setOpenDeleteDialog(true)}
                                variant="contained"
                                color="error"
                            >
                                {t('region_details.delete_button')}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <DialogWindow
                open={openUpdateDialog}
                handleSubmit={handleSubmit(handleUpdateSubmit)}
                handleClose={() => setOpenUpdateDialog(false)}
                content={t('region_details.update_dialog_content')}
            />
            <DialogWindow
                open={openDeleteDialog}
                handleSubmit={() => { handleDeleteSubmit(id) }}
                handleClose={() => setOpenDeleteDialog(false)}
                content={t('region_details.delete_dialog_content')}
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

export default SubcategoryDetails;